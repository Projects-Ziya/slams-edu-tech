import { useEffect, useRef, useState } from "react";

import robot     from "../../assets/robot.png";
import spaceship from "../../assets/spaceship.png";
import globe     from "../../assets/globe.png";
import bgFar     from "../../assets/bggg.jpg";
import bgMid     from "../../assets/techspacebg2.png";

import img1 from "../../assets/works/works2.webp";
import img2 from "../../assets/works/works2.webp";
import img3 from "../../assets/works/works3.webp";

import AnimatedLinkButton from "../../components/AnimatedLinkButton";

// ── lerp ──────────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ── Per-breakpoint scale multipliers for foreground assets ───────────────────
// md  = 768–1279   xl  = 1280–1535   2xl = 1536+
function getScale(w: number) {
  if (w >= 1536) return 1.28;   // 2xl  — monitor
  if (w >= 1280) return 1.10;   // xl   — large laptop
  return 1.0;                   // md   — base
}

// ── Robot CSS size per breakpoint ─────────────────────────────────────────────
function getRobotWidth(w: number) {
  if (w >= 1536) return "1080px";
  if (w >= 1280) return "950px";
  return "820px";
}

// ── Spaceship CSS width per breakpoint ───────────────────────────────────────
function getShipWidth(w: number) {
  if (w >= 1536) return "240px";
  if (w >= 1280) return "210px";
  return "180px";
}

// ── Small globe CSS width per breakpoint ─────────────────────────────────────
function getGlobeWidth(w: number) {
  if (w >= 1536) return "185px";
  if (w >= 1280) return "162px";
  return "140px";
}

// ── Hand offset per breakpoint (to keep globe on robot's palm) ───────────────
function getHandOffset(w: number): [number, number] {
  if (w >= 1536) return [-570, -325];
  if (w >= 1280) return [-505, -290];
  return [-450, -260];
}

export default function HeroPage() {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // Viewport-driven CSS sizes — updated on resize, used in JSX
  const [vw, setVw]         = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  const robotWidth          = getRobotWidth(vw);
  const shipWidth           = getShipWidth(vw);
  const globeSmallWidth     = getGlobeWidth(vw);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Mobile image carousel
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const bgFarRef      = useRef<HTMLDivElement>(null);
  const bgMidRef      = useRef<HTMLDivElement>(null);
  const starsRef      = useRef<HTMLDivElement>(null);
  const globeBigRef   = useRef<HTMLImageElement>(null);
  const shipRef       = useRef<HTMLImageElement>(null);
  const robotRef      = useRef<HTMLImageElement>(null);
  const globeSmallRef = useRef<HTMLImageElement>(null);
  const textRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── State vars (all live in closure, never trigger re-render) ─────────────
    let rawMX = 0, rawMY = 0;
    let spX = 0, spY = 0, vX = 0, vY = 0;
    const K = 0.055, D = 0.80;   // spring stiffness / damping

    let time = 0;
    let rawScrollY = 0, smoothScrollY = 0;

    // Spaceship state machine
    type Phase = "entering" | "floating" | "exiting";
    let phase: Phase = "entering";
    let shipProg = 0;
    let shipBX = 0, shipBY = 0;
    // Smoothed ship position for floating (prevents snap on phase transition)
    let shipSmoothX = 0, shipSmoothY = 0;

    // Small globe entry
    let globeProg = 0;
    const GLOBE_SPD = 0.004;

    // ── Listeners ─────────────────────────────────────────────────────────────
    const onMouse  = (e: MouseEvent) => {
      rawMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      rawMY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { rawScrollY = window.scrollY; };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll",    onScroll, { passive: true });

    // ── Starfield canvas ──────────────────────────────────────────────────────
    const canvas = document.createElement("canvas");
    const ctx    = canvas.getContext("2d");
    type Star = { x: number; y: number; r: number; b: number; tw: number };
    const stars: Star[] = [];

    if (ctx && starsRef.current) {
      Object.assign(canvas.style, {
        position: "absolute", top: "0", left: "0",
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: "1",
      });
      starsRef.current.appendChild(canvas);

      for (let i = 0; i < 230; i++) {
        stars.push({
          x: Math.random(), y: Math.random(),
          r: Math.random() * 1.7 + 0.3,
          b: Math.random() * 0.5  + 0.2,
          tw: Math.random() * Math.PI * 2,
        });
      }

      const resize = () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", resize);
      resize();
    }

    // ── RAF loop ──────────────────────────────────────────────────────────────
    let raf: number;

    const tick = () => {
      time += 0.01;

      // Lerped scroll
      smoothScrollY = lerp(smoothScrollY, rawScrollY, 0.06);
      const sp = Math.min(smoothScrollY / window.innerHeight, 1); // scroll progress 0→1

      // Spring mouse
      vX = (vX + (rawMX - spX) * K) * D;
      vY = (vY + (rawMY - spY) * K) * D;
      spX += vX;
      spY += vY;

      // Ambient sinusoidal idle (different freqs = organic, never loops obviously)
      const ambX = Math.sin(time * 0.27) * 0.11;
      const ambY = Math.cos(time * 0.21) * 0.09;
      const px = spX + ambX;
      const py = spY + ambY;

      // Live scale at this tick (cheap — no state)
      const sc = getScale(window.innerWidth);

      // ── BG FAR ─────────────────────────────────────────────────────────────
      if (bgFarRef.current) {
        bgFarRef.current.style.transform =
          `translate3d(${px * 6}px,${smoothScrollY * 0.10 + py * 5}px,0) scale(1.07)`;
      }

      // ── BG MID ─────────────────────────────────────────────────────────────
      if (bgMidRef.current) {
        bgMidRef.current.style.transform =
          `translate3d(${px * 13}px,${smoothScrollY * 0.16 + py * 9}px,0) scale(1.09)`;
      }

      // ── STARS ──────────────────────────────────────────────────────────────
      if (ctx && canvas.width > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const sOX = px * 5;
        const sOY = smoothScrollY * 0.09 + py * 4;
        for (const s of stars) {
          const tw = s.b + Math.sin(time * 1.35 + s.tw) * 0.14;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, tw))})`;
          ctx.arc(s.x * canvas.width + sOX, s.y * canvas.height + sOY, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── BIG GLOBE ──────────────────────────────────────────────────────────
      // Pinned to top-left corner: CSS sets left:0 top:0, translate(-50%,-50%)
      // so only bottom-right quarter shows. Here we add a very tiny parallax
      // nudge so it barely breathes — not enough to reveal/hide more of the circle.
      if (globeBigRef.current) {
        globeBigRef.current.style.transform =
          `translate(-50%,-50%) translate3d(${px * 5}px,${py * 4 + sp * 25}px,0) rotate(${time * 3}deg)`;
      }

      // ── SPACESHIP ──────────────────────────────────────────────────────────
      if (shipRef.current) {
        // Resolve text-relative resting target each frame
        // (getBoundingClientRect is cheap when called once per frame)
        let tX = window.innerWidth  * 0.63;
        let tY = window.innerHeight * 0.20;
        if (textRef.current) {
          const r = textRef.current.getBoundingClientRect();
          tX = r.left + r.width  * 0.70;
          tY = r.top  - 55;
        }

        if (phase === "entering") {
          shipProg = Math.min(shipProg + 0.0055, 1);

          if (shipProg >= 1) {
            phase   = "floating";
            shipBX  = tX;
            shipBY  = tY;
            // Seed smooth vars at resting position so no snap
            shipSmoothX = tX;
            shipSmoothY = tY;
          }

          const ease = 1 - Math.pow(1 - shipProg, 3);
          const sX   = window.innerWidth + 240;
          const sY   = -140;
          const arc  = Math.sin(ease * Math.PI) * 95;

          const cx = sX + (tX - sX) * ease;
          const cy = sY + (tY - sY) * ease + arc;

          shipRef.current.style.transform =
            `translate3d(${cx}px,${cy}px,0) scale(${(0.42 + ease * 0.58) * sc}) rotate(${-28 + ease * 22}deg)`;
          shipRef.current.style.opacity   = `${0.15 + ease * 0.85}`;

        } else if (phase === "floating") {
          // Soft ambient drift around resting base
          const dX = Math.sin(time * 0.72) * 8  + px * 20;
          const dY = Math.cos(time * 0.88) * 6  + py * 15;

          // Target for this frame
          const wantX = shipBX + dX;
          const wantY = shipBY + dY;

          // Lerp toward target — this is what makes the hover feel buttery
          shipSmoothX = lerp(shipSmoothX, wantX, 0.045);
          shipSmoothY = lerp(shipSmoothY, wantY, 0.045);

          if (sp > 0.04) phase = "exiting";

          shipRef.current.style.transform =
            `translate3d(${shipSmoothX}px,${shipSmoothY}px,0) scale(${sc}) rotate(${Math.sin(time * 0.42) * 3.5}deg)`;
          shipRef.current.style.opacity   = "1";

        } else {
          // Exiting — scroll-driven exit toward bottom-left, fades out
          const eX = shipBX - sp * window.innerWidth  * 0.72;
          const eY = shipBY + sp * window.innerHeight * 0.90;
          const dX = Math.sin(time * 0.78) * 5 + px * 20;
          const dY = Math.cos(time * 0.88) * 5 + py * 15;

          shipRef.current.style.transform =
            `translate3d(${eX + dX}px,${eY + dY}px,0) scale(${sc}) rotate(${Math.sin(time * 0.48) * 5}deg)`;
          shipRef.current.style.opacity   = `${Math.max(0, 1 - sp * 2.2)}`;
        }
      }

      // ── ROBOT ──────────────────────────────────────────────────────────────
      if (robotRef.current) {
        robotRef.current.style.transform =
          `translate3d(${px * 32}px,${-sp * 145 + py * 27}px,0)`;
      }

      // ── SMALL GLOBE ────────────────────────────────────────────────────────
      if (globeSmallRef.current) {
        if (globeProg < 1) globeProg = Math.min(globeProg + GLOBE_SPD, 1);
        const eI = 1 - Math.pow(1 - globeProg, 3);

        const rBX = px * 32;
        const rBY = -sp * 145 + py * 27;

        const [hX, hY] = getHandOffset(window.innerWidth);

        const gFX = eI * Math.sin(time * 0.83) * 6;
        const gFY = eI * Math.cos(time * 1.02) * 5;

        globeSmallRef.current.style.transform =
          `translate3d(${rBX + hX * eI + gFX}px,${rBY + hY * eI + gFY}px,0) scale(${eI})`;
        globeSmallRef.current.style.opacity = `${eI}`;
      }

      // ── TEXT ───────────────────────────────────────────────────────────────
      if (textRef.current) {
        textRef.current.style.transform =
          `translate3d(${px * -9}px,${py * -6 + rawScrollY * 0.028}px,0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",    onScroll);
      canvas.remove();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* ── LAYER 0: FAR BG ── */}
      <div
        ref={bgFarRef}
        className="hidden md:block absolute inset-0 will-change-transform"
        style={{
          backgroundImage:    `url(${bgFar})`,
          backgroundSize:     "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* ── LAYER 1: MID BG — full opacity, sharp, no blur ── */}
      {/*
          mixBlendMode:screen composites additively so dark areas become transparent.
          opacity:1 + brightness(1.5) + contrast(1.1) makes it vivid and sharp.
          If bgMid has mostly dark/black pixels the screen blend won't wash out bgFar.
      */}
      <div
        ref={bgMidRef}
        className="hidden md:block absolute inset-0 will-change-transform"
        style={{
          backgroundImage:    `url(${bgMid})`,
          backgroundSize:     "cover",
          backgroundPosition: "center",
          zIndex:       1,
          mixBlendMode: "screen",
          opacity:      1,
          filter:       "brightness(1.55) contrast(1.12) saturate(1.15)",
        }}
      />

      {/* ── STARFIELD ── */}
      <div ref={starsRef} className="hidden md:block absolute inset-0" style={{ zIndex: 2 }} />

      {/* ── BIG GLOBE — center at top-left corner, only bottom-right quarter visible ── */}
      {/*
          left:0 top:0 + CSS translate(-50%,-50%) = center of image at (0,0).
          overflow:hidden on section clips the rest.
          JS rAF stacks translate3d on top via style.transform override.
          clamp() keeps it proportional: smaller on md, larger on 2xl.
      */}
      <img
        ref={globeBigRef}
        src={globe}
        className="hidden md:block absolute will-change-transform"
        style={{
          width:   "clamp(680px, 52vw, 1020px)",
          left:    0,
          top:     0,
          zIndex:  3,
          opacity: 0.52,
          filter:  "blur(0.5px)",
          // Base transform — rAF appends translate3d + rotate on top
          transform: "translate(-50%,-50%)",
        }}
      />

      {/* ── SPACESHIP ── */}
      <img
        ref={shipRef}
        src={spaceship}
        className="hidden md:block absolute will-change-transform"
        style={{
          width:   shipWidth,
          left:    0,
          top:     0,
          opacity: 0,
          zIndex:  4,
          filter:  "drop-shadow(0 0 20px rgba(100,210,255,0.38))",
        }}
      />

      {/* ── ROBOT ── */}
      <img
        ref={robotRef}
        src={robot}
        className="hidden md:block absolute will-change-transform"
        style={{
          width:  robotWidth,
          right:  "-5%",
          bottom: "-8%",
          zIndex: 5,
        }}
      />

      {/* ── SMALL GLOBE ── */}
      <img
        ref={globeSmallRef}
        src={globe}
        className="hidden md:block absolute will-change-transform"
        style={{
          width:           globeSmallWidth,
          right:           "-5%",
          bottom:          "-8%",
          zIndex:          6,
          opacity:         0,
          transformOrigin: "center center",
          filter:          "drop-shadow(0 0 14px rgba(100,210,255,0.58))",
        }}
      />

      {/* ── MOBILE FALLBACK ── */}
      <div className="md:hidden absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* ── GRADIENT OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 7,
          background: `
            radial-gradient(ellipse 130% 90% at 50% 50%, transparent 28%, rgba(0,0,0,0.42) 100%),
            linear-gradient(to bottom,
              rgba(0,0,0,0.10) 0%,
              transparent 30%,
              transparent 52%,
              rgba(0,0,0,0.68) 100%
            )
          `,
        }}
      />

      {/* ── TEXT ── */}
      <div
        ref={textRef}
        className="absolute z-10 bottom-24 md:bottom-28 xl:bottom-32 left-6 md:left-10 xl:left-14 text-white max-w-[560px] md:max-w-[700px] xl:max-w-[860px] 2xl:max-w-[980px] will-change-transform"
        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.65)" }}
      >
        <h1 className="
          font-heading uppercase leading-tight tracking-tight
          text-[32px]
          md:text-[54px]
          lg:text-[64px]
          xl:text-[72px]
          2xl:text-[82px]
        ">
          IT Solutions for a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
            Smarter Digital World
          </span>
        </h1>

        <p className="
          mt-5 text-gray-200 leading-relaxed bg-black/40 p-4 rounded-2xl
          text-[15px]
          md:text-[18px]
          xl:text-[20px]
          2xl:text-[22px]
          max-w-[520px] md:max-w-[600px] xl:max-w-[700px]
        ">
          Slams EduTech is a leading IT company in Kochi offering web development,
          mobile app development, AI solutions, and industry-focused internships.
          We help businesses grow faster with scalable technology.
        </p>

        <div className="flex gap-4 md:gap-5 mt-7 md:mt-8">
          <AnimatedLinkButton to="/service">
            Discover Our Services
          </AnimatedLinkButton>
          <AnimatedLinkButton to="/careers#internships">
            Apply for Internship
          </AnimatedLinkButton>
        </div>
      </div>

      <style>{`
        .will-change-transform { will-change: transform; }
      `}</style>
    </section>
  );
}