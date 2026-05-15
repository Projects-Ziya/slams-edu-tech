/**
 * HeroPage.tsx — Premium Parallax Hero
 * Stack: React 18, Tailwind CSS, GSAP + ScrollTrigger
 *
 * Install dep if not present:
 *   npm install gsap
 *
 * Asset paths are identical to the original component:
 *   ../../assets/robot.png
 *   ../../assets/spaceship.png
 *   ../../assets/globe.png
 *   ../../assets/works/works2.webp  (×2)
 *   ../../assets/works/works3.webp
 *
 * Background is now pure CSS deep-space — no image file required.
 * Bebas Neue is loaded from Google Fonts for the headline.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import robot     from "../../assets/robot.png";
import spaceship from "../../assets/spaceship.png";
import globe     from "../../assets/globe.png";

import img1 from "../../assets/works/works2.webp";
import img2 from "../../assets/works/works2.webp";
import img3 from "../../assets/works/works3.webp";

import AnimatedLinkButton from "../../components/AnimatedLinkButton";

gsap.registerPlugin(ScrollTrigger);

// ── tiny helpers ──────────────────────────────────────────────────────────────
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ── breakpoint helpers (same logic as original) ───────────────────────────────
const getScale      = (w: number) => w >= 1536 ? 1.28 : w >= 1280 ? 1.10 : 1.0;
const getRobotW     = (w: number) => w >= 1536 ? "1080px" : w >= 1280 ? "950px"  : "820px";
const getShipW      = (w: number) => w >= 1536 ? "240px"  : w >= 1280 ? "210px"  : "180px";
const getGlobeSmW   = (w: number) => w >= 1536 ? "185px"  : w >= 1280 ? "162px"  : "140px";
const getHandOff    = (w: number): [number, number] =>
  w >= 1536 ? [-570, -325] : w >= 1280 ? [-505, -290] : [-450, -260];

// ── wrap heading words for per-word GSAP stagger ──────────────────────────────
function HeadingWords({ text, accent }: { text: string; accent: string }) {
  const accentWords = new Set(
    accent.toLowerCase().split(" ").map(w => w.replace(/[^a-z]/g, ""))
  );
  return (
    <>
      {text.split(" ").map((word, i) => {
        const key  = word.toLowerCase().replace(/[^a-z]/g, "");
        const isAc = accentWords.has(key);
        return (
          <span
            key={i}
            className="hero-word"
            style={{ display: "inline-block", overflow: "hidden", perspective: "600px" }}
          >
            <span
              style={{
                display: "inline-block",
                ...(isAc
                  ? {
                      background: "linear-gradient(90deg,#93c5fd,#67e8f9)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : {}),
              }}
            >
              {word}
              {i < text.split(" ").length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </>
  );
}

export default function HeroPage() {
  const images  = [img1, img2, img3];
  const [current, setCurrent] = useState(0);
  const [vw, setVw]           = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  // derived sizes (re-computed on resize, avoids re-render mid-animation)
  const robotWidth     = getRobotW(vw);
  const shipWidth      = getShipW(vw);
  const globeSmWidth   = getGlobeSmW(vw);

  useEffect(() => {
    const onR = () => setVw(window.innerWidth);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  // mobile image carousel
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);

  // ── refs ──────────────────────────────────────────────────────────────────
  const sectionRef    = useRef<HTMLElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const robotRef      = useRef<HTMLImageElement>(null);
  const shipRef       = useRef<HTMLImageElement>(null);
  const globeBigRef   = useRef<HTMLImageElement>(null);
  const globeSmRef    = useRef<HTMLImageElement>(null);
  const textRef       = useRef<HTMLDivElement>(null);
  const h1Ref         = useRef<HTMLHeadingElement>(null);
  const paraRef       = useRef<HTMLParagraphElement>(null);
  const btnsRef       = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const badgesRef     = useRef<HTMLDivElement>(null);
  const eyebrowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── GSAP entrance ──────────────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (eyebrowRef.current)
      tl.fromTo(eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      );

    if (h1Ref.current) {
      const words = h1Ref.current.querySelectorAll(".hero-word");
      tl.fromTo(words,
        { y: 70, opacity: 0, rotateX: -25 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.055 },
        0.4
      );
    }

    if (paraRef.current)
      tl.fromTo(paraRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        0.9
      );

    if (btnsRef.current) {
      const btns = btnsRef.current.children;
      tl.fromTo(Array.from(btns),
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
        1.1
      );
    }

    if (lineRef.current)
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        0.55
      );

    if (badgesRef.current) {
      const badges = badgesRef.current.children;
      tl.fromTo(Array.from(badges),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 },
        1.35
      );
    }

    // ── Starfield canvas ───────────────────────────────────────────────────
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext("2d");

    type Star = { x: number; y: number; r: number; b: number; tw: number; sp: number };
    const stars: Star[] = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (ctx) {
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random(), y: Math.random(),
          r: Math.random() * 1.8 + 0.2,
          b: Math.random() * 0.55 + 0.2,
          tw: Math.random() * Math.PI * 2,
          sp: Math.random() * 0.4 + 0.05,
        });
      }
    }

    // ── Mouse spring ───────────────────────────────────────────────────────
    let rawMX = 0, rawMY = 0;
    let spX = 0, spY = 0, vX = 0, vY = 0;
    const K = 0.05, D = 0.81;

    // Spaceship FSM
    type Phase = "entering" | "floating" | "exiting";
    let phase: Phase = "entering";
    let shipProg = 0, shipBX = 0, shipBY = 0;
    let shipSX = 0, shipSY = 0;

    let globeProg = 0;

    let time = 0, rawScrollY = 0, smoothScroll = 0;

    const onMouse  = (e: MouseEvent) => {
      rawMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      rawMY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { rawScrollY = window.scrollY; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll",    onScroll, { passive: true });

    // ── RAF loop ───────────────────────────────────────────────────────────
    let raf: number;
    const tick = () => {
      time += 0.01;
      smoothScroll = lerp(smoothScroll, rawScrollY, 0.06);
      const sp = clamp(smoothScroll / window.innerHeight, 0, 1);

      vX = (vX + (rawMX - spX) * K) * D;
      vY = (vY + (rawMY - spY) * K) * D;
      spX += vX; spY += vY;

      const ambX = Math.sin(time * 0.27) * 0.10;
      const ambY = Math.cos(time * 0.21) * 0.08;
      const px   = spX + ambX;
      const py   = spY + ambY;
      const w    = window.innerWidth;
      const h    = window.innerHeight;

      // Stars
      if (ctx && canvas && canvas.width > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const ox = px * 6, oy = smoothScroll * 0.08 + py * 4;
        for (const s of stars) {
          const alpha = clamp(s.b + Math.sin(time * s.sp + s.tw) * 0.20, 0, 1);
          ctx.beginPath();
          ctx.fillStyle = `rgba(160,210,255,${alpha})`;
          ctx.arc(s.x * canvas.width + ox, s.y * canvas.height + oy, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Big globe
      if (globeBigRef.current) {
        globeBigRef.current.style.transform =
          `translate(-50%,-50%) translate3d(${px * 6}px,${py * 5 + sp * 30}px,0) rotate(${time * 2.5}deg)`;
      }

      // Spaceship
      if (shipRef.current) {
        let tX = w * 0.62, tY = h * 0.19;
        if (textRef.current) {
          const r = textRef.current.getBoundingClientRect();
          tX = r.left + r.width  * 0.72;
          tY = r.top  - 60;
        }
        const sc = getScale(w);

        if (phase === "entering") {
          shipProg = Math.min(shipProg + 0.005, 1);
          if (shipProg >= 1) {
            phase = "floating";
            shipBX = tX; shipBY = tY;
            shipSX = tX; shipSY = tY;
          }
          const ease = 1 - Math.pow(1 - shipProg, 3);
          const sX = w + 260, sY = -160;
          const arc = Math.sin(ease * Math.PI) * 100;
          shipRef.current.style.transform =
            `translate3d(${sX + (tX - sX) * ease}px,${sY + (tY - sY) * ease + arc}px,0) scale(${(0.35 + ease * 0.65) * sc}) rotate(${-30 + ease * 24}deg)`;
          shipRef.current.style.opacity = `${0.1 + ease * 0.9}`;

        } else if (phase === "floating") {
          const dX = Math.sin(time * 0.68) * 9 + px * 22;
          const dY = Math.cos(time * 0.85) * 7 + py * 17;
          shipSX = lerp(shipSX, shipBX + dX, 0.04);
          shipSY = lerp(shipSY, shipBY + dY, 0.04);
          if (sp > 0.03) phase = "exiting";
          shipRef.current.style.transform =
            `translate3d(${shipSX}px,${shipSY}px,0) scale(${sc}) rotate(${Math.sin(time * 0.4) * 4}deg)`;
          shipRef.current.style.opacity = "1";

        } else {
          const eX = shipBX - sp * w * 0.7;
          const eY = shipBY + sp * h * 0.88;
          const dX = Math.sin(time * 0.75) * 5 + px * 20;
          const dY = Math.cos(time * 0.85) * 5 + py * 15;
          shipRef.current.style.transform =
            `translate3d(${eX + dX}px,${eY + dY}px,0) scale(${sc}) rotate(${Math.sin(time * 0.48) * 5}deg)`;
          shipRef.current.style.opacity = `${clamp(1 - sp * 2.4, 0, 1)}`;
        }
      }

      // Robot
      if (robotRef.current)
        robotRef.current.style.transform = `translate3d(${px * 34}px,${-sp * 150 + py * 28}px,0)`;

      // Small globe
      if (globeSmRef.current) {
        globeProg = Math.min(globeProg + 0.003, 1);
        const eI = 1 - Math.pow(1 - globeProg, 3);
        const rBX = px * 34, rBY = -sp * 150 + py * 28;
        const [hX, hY] = getHandOff(w);
        const gFX = eI * Math.sin(time * 0.82) * 6;
        const gFY = eI * Math.cos(time * 1.0)  * 5;
        globeSmRef.current.style.transform =
          `translate3d(${rBX + hX * eI + gFX}px,${rBY + hY * eI + gFY}px,0) scale(${eI})`;
        globeSmRef.current.style.opacity = `${eI}`;
      }

      // Text
      if (textRef.current)
        textRef.current.style.transform =
          `translate3d(${px * -10}px,${py * -7 + smoothScroll * 0.03}px,0)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#020816" }}
    >

      {/* ── DEEP-SPACE CSS BACKGROUND ── */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 15% 50%, rgba(10,30,80,0.9) 0%, transparent 70%),
            radial-gradient(ellipse 60% 70% at 80% 20%, rgba(5,20,55,0.8) 0%, transparent 65%),
            radial-gradient(ellipse 100% 100% at 50% 50%, #030d24 0%, #020816 100%)
          `,
        }}
      />

      {/* ── NEBULA GLOWS ── */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(ellipse 55% 35% at 72% 58%, rgba(30,90,200,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 40% 28% at 22% 72%, rgba(0,180,200,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 30% 20% at 60% 10%, rgba(80,140,255,0.10) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── TECH GRID LINES ── */}
      {/* <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(40,100,200,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40,100,200,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      /> */}

      {/* ── STARFIELD ── */}
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* ── ANIMATED SCAN LINE ── */}
      <div
        className="hidden md:block absolute inset-x-0 pointer-events-none"
        style={{
          zIndex: 2,
          height: "1px",
          background: "linear-gradient(90deg,transparent 0%,rgba(56,189,248,0.22) 40%,rgba(56,189,248,0.22) 60%,transparent 100%)",
          animation: "heroScan 9s ease-in-out infinite",
        }}
      />

      {/* ── BIG GLOBE (top-left corner — only bottom-right quarter visible) ── */}
      <img
        ref={globeBigRef}
        src={globe}
        alt=""
        className="hidden md:block absolute pointer-events-none"
        style={{
          width:     "clamp(680px,52vw,1020px)",
          left:      0, top: 0,
          zIndex:    3,
          opacity:   0.38,
          filter:    "blur(0.5px) saturate(1.4) hue-rotate(8deg)",
          transform: "translate(-50%,-50%)",
          willChange: "transform",
        }}
      />

      {/* ── SPACESHIP ── */}
      <img
        ref={shipRef}
        src={spaceship}
        alt=""
        className="hidden md:block absolute pointer-events-none"
        style={{
          width:   shipWidth,
          left:    0, top: 0,
          opacity: 0,
          zIndex:  4,
          filter:  "drop-shadow(0 0 30px rgba(56,189,248,0.60)) drop-shadow(0 0 8px rgba(56,189,248,0.3))",
          willChange: "transform, opacity",
        }}
      />

      {/* ── ROBOT ── */}
      <img
        ref={robotRef}
        src={robot}
        alt=""
        className="hidden md:block absolute pointer-events-none"
        style={{
          width:   robotWidth,
          right:   "-5%",
          bottom:  "-8%",
          zIndex:  5,
          filter:  "drop-shadow(0 0 40px rgba(30,80,200,0.30))",
          willChange: "transform",
        }}
      />

      {/* ── SMALL GLOBE (robot palm) ── */}
      <img
        ref={globeSmRef}
        src={globe}
        alt=""
        className="hidden md:block absolute pointer-events-none"
        style={{
          width:           globeSmWidth,
          right:           "-5%",
          bottom:          "-8%",
          zIndex:          6,
          opacity:         0,
          transformOrigin: "center center",
          filter:          "drop-shadow(0 0 20px rgba(56,189,248,0.7)) saturate(1.5)",
          willChange:      "transform, opacity",
        }}
      />

      {/* ── MOBILE FALLBACK ── */}
      <div className="md:hidden absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(2,8,22,0.6) 0%, rgba(2,8,22,0.3) 40%, rgba(2,8,22,0.88) 100%)",
          }}
        />
      </div>

      {/* ── VIGNETTE + BOTTOM FADE ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 7,
          background: `
            radial-gradient(ellipse 130% 90% at 50% 50%, transparent 25%, rgba(2,8,22,0.52) 100%),
            linear-gradient(to bottom,
              rgba(2,8,22,0.18) 0%,
              transparent 28%,
              transparent 50%,
              rgba(2,8,22,0.85) 100%
            )
          `,
        }}
      />

      {/* ── HORIZONTAL ACCENT LINE ── */}
      {/* <div
        ref={lineRef}
        className="hidden md:block absolute pointer-events-none"
        style={{
          zIndex:          8,
          left:            "3.5%", right: "3.5%",
          bottom:          "20%",
          height:          "1px",
          transformOrigin: "left center",
          background:      "linear-gradient(90deg,rgba(56,189,248,0.55) 0%,rgba(147,197,253,0.18) 55%,transparent 100%)",
        }}
      /> */}

      {/* ── TEXT BLOCK ── */}
      <div
        ref={textRef}
        className="absolute z-10 will-change-transform"
        style={{
          bottom:     "clamp(4.5rem,6.5vw,8.5rem)",
          left:       "clamp(1.4rem,3.5vw,3.5rem)",
          maxWidth:   "clamp(340px,54vw,860px)",
          textShadow: "0 4px 28px rgba(0,0,0,0.7)",
        }}
      >

        {/* ── eyebrow ── */}
        <div ref={eyebrowRef} className="hidden md:flex items-center gap-3 mb-5">
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(147,197,253,0.88)",
            border: "1px solid rgba(56,189,248,0.28)",
            borderRadius: "999px", padding: "4px 16px",
            background: "rgba(56,189,248,0.07)",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#38bdf8",
              boxShadow: "0 0 8px #38bdf8",
              animation: "heroPulse 2s ease-in-out infinite",
              display: "inline-block",
            }} />
            Kochi&apos;s Leading IT Company
          </span>
        </div>

        {/* ── heading ── */}
        <h1
          ref={h1Ref}
          className="text-white uppercase"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
            fontSize:   "clamp(32px,5.2vw,82px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            fontWeight: 400,
          }}
        >
          <HeadingWords
            text="IT Solutions for a Smarter Digital World"
            accent="Smarter Digital World"
          />
        </h1>

        {/* ── paragraph ── */}
        <p
          ref={paraRef}
          style={{
            marginTop: "clamp(14px,1.2vw,20px)",
            fontSize:  "clamp(14px,1.3vw,20px)",
            lineHeight: 1.65,
            color:     "#ffffff",
            maxWidth:  "clamp(300px,44vw,640px)",
          }}
        >
          Slams Tech is a leading IT company in Kochi offering web development,
          mobile app development, AI solutions, and industry-focused internships.
          We help businesses grow faster with scalable technology.
        </p>

        {/* ── CTAs ── */}
        <div ref={btnsRef} className="flex flex-wrap gap-4 md:gap-5 mt-7 md:mt-8">
          <AnimatedLinkButton to="/service">
            Discover Our Services
          </AnimatedLinkButton>
          <AnimatedLinkButton to="/careers#internships">
            Apply for Internship
          </AnimatedLinkButton>
        </div>

        {/* ── stat badges ── */}
        <div
          ref={badgesRef}
          className="hidden md:flex flex-wrap gap-4 mt-8"
        >
          {[
            { val: "200+", label: "Projects Delivered"   },
            { val: "50+",  label: "Expert Engineers"     },
            { val: "98%",  label: "Client Satisfaction"  },
          ].map(({ val, label }) => (
            <div
              key={label}
              style={{
                background: "rgba(2,8,22,0.68)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(56,189,248,0.20)",
                borderRadius: "12px",
                padding: "10px 22px",
                display: "flex", flexDirection: "column", gap: "3px",
              }}
            >
              <span style={{
                fontSize: "clamp(20px,1.8vw,28px)",
                fontWeight: 700,
                color: "#e0f2fe",
                lineHeight: 1.1,
              }}>
                {val}
              </span>
              <span style={{
                fontSize: "clamp(10px,0.72vw,12px)",
                color: "rgba(147,197,253,0.68)",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .will-change-transform { will-change: transform; }

        @keyframes heroPulse {
          0%,100% { opacity:1; box-shadow:0 0 8px #38bdf8; }
          50%      { opacity:0.45; box-shadow:0 0 3px #38bdf8; }
        }

        @keyframes heroScan {
          0%   { top:12%; opacity:0; }
          8%   { opacity:1; }
          92%  { opacity:1; }
          100% { top:88%; opacity:0; }
        }
      `}</style>
    </section>
  );
}