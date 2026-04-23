import { useEffect, useRef, useState } from "react";

import robot from "../../assets/robot.png";
import spaceship from "../../assets/spaceship.png";
import cosmic from "../../assets/cosmic.png";
import globe from "../../assets/globe.png";
import bg from "../../assets/techspacebg.png";

import img1 from "../../assets/works/works2.webp";
import img2 from "../../assets/works/works2.webp";
import img3 from "../../assets/works/works3.webp";

import AnimatedLinkButton from "../../components/AnimatedLinkButton";

export default function HeroPage() {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Refs for all parallax layers
  const bgRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const globeBigRef = useRef<HTMLImageElement>(null);
  const cosmicRef = useRef<HTMLImageElement>(null); // cosmic ray — layer 3
  const shipRef = useRef<HTMLImageElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const globeSmallRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ----- SPRING PHYSICS STATE -----
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    const springStrength = 0.08;
    const friction = 0.82;

    // ----- SCROLL & TIME -----
    let scrollY = 0;
    let time = 0;

    // ----- SPACESHIP ENTRY STATE -----
    let shipProgress = 0;
    let shipEntered = false;
    let shipBaseX = 0;
    let shipBaseY = 0;

    // ----- SMALL GLOBE ENTRY STATE -----
    let globeProgress = 0;
    const GLOBE_ENTRY_SPEED = 0.004;

    // ----- MOUSE & SCROLL HANDLERS -----
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);

    // ----- GENERATE STARFIELD -----
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx && starsRef.current) {
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "1";
      starsRef.current.appendChild(canvas);

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawStars();
      };

      const stars: { x: number; y: number; radius: number; brightness: number }[] = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          radius: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.5 + 0.3,
        });
      }

      const drawStars = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
          ctx.arc(
            star.x * canvas.width,
            star.y * canvas.height,
            star.radius,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
    }

    // ----- ANIMATION LOOP -----
    const animate = () => {
      time += 0.01;
      const scrollProgress = Math.min(scrollY / window.innerHeight, 1);

      // Spring update
      const forceX = (mouseX - currentX) * springStrength;
      const forceY = (mouseY - currentY) * springStrength;
      velocityX = (velocityX + forceX) * friction;
      velocityY = (velocityY + forceY) * friction;
      currentX += velocityX;
      currentY += velocityY;

      // Ambient float
      const ambientX = Math.sin(time * 0.3) * 0.15;
      const ambientY = Math.cos(time * 0.25) * 0.15;

      const parallaxX = currentX + ambientX;
      const parallaxY = currentY + ambientY;

      // ========== LAYER 0: DEEP BACKGROUND ==========
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${parallaxX * 8}px, ${
          scrollY * 0.2 + parallaxY * 6
        }px, 0)`;
      }

      // ========== LAYER 1: STARFIELD ==========
      if (canvas) {
        canvas.style.transform = `translate3d(${parallaxX * 6}px, ${
          scrollY * 0.15 + parallaxY * 3
        }px, 0)`;
      }

      // ========== LAYER 2: BIG GLOBE ==========
      if (globeBigRef.current) {
        const globeScrollOffset = scrollProgress * 180;
        globeBigRef.current.style.transform = `
          translate3d(
            ${parallaxX * -12}px,
            ${parallaxY * -8 + globeScrollOffset}px,
            0
          )
          rotate(${time * 6}deg)
        `;
      }

      

      // ========== LAYER 4: SPACESHIP ==========
      if (shipRef.current) {
        let targetX = window.innerWidth * 0.65;
        let targetY = window.innerHeight * 0.25;
        if (textRef.current) {
          const rect = textRef.current.getBoundingClientRect();
          targetX = rect.left + rect.width * 0.72;
          targetY = rect.top - 55;
        }

        if (!shipEntered) {
          shipProgress += 0.007;
          if (shipProgress >= 1) {
            shipProgress = 1;
            shipEntered = true;
            shipBaseX = targetX;
            shipBaseY = targetY;
          }

          const ease = 1 - Math.pow(1 - shipProgress, 3);
          const startX = window.innerWidth + 200;
          const startY = -100;
          const arcHeight = Math.sin(ease * Math.PI) * 80;
          const currentX = startX + (targetX - startX) * ease;
          const currentY = startY + (targetY - startY) * ease + arcHeight;

          shipRef.current.style.transform = `
            translate3d(${currentX}px, ${currentY}px, 0)
            scale(${0.5 + ease * 0.5})
            rotate(${-30 + ease * 25}deg)
          `;
          shipRef.current.style.opacity = `${0.3 + ease * 0.7}`;
        } else {
          const exitOffsetX = scrollProgress * window.innerWidth * 0.7;
          const exitOffsetY = scrollProgress * window.innerHeight * 0.9;
          const driftX = Math.sin(time * 0.8) * 6 + parallaxX * 22;
          const driftY = Math.cos(time * 0.9) * 6 + parallaxY * 18;

          shipRef.current.style.transform = `
            translate3d(
              ${shipBaseX - exitOffsetX + driftX}px,
              ${shipBaseY + exitOffsetY + driftY}px,
              0
            )
            rotate(${Math.sin(time * 0.5) * 5}deg)
          `;
          shipRef.current.style.opacity = "1";
        }
      }

      // ========== LAYER 5: ROBOT ==========
      if (robotRef.current) {
        const robotScrollOffset = -scrollProgress * 140;
        robotRef.current.style.transform = `
          translate3d(
            ${parallaxX * 34}px,
            ${robotScrollOffset + parallaxY * 28}px,
            0
          )
        `;
      }

      // ========== LAYER 6: SMALL GLOBE (zoom-in to robot hand) ==========
      if (globeSmallRef.current) {
        if (globeProgress < 1) {
          globeProgress = Math.min(globeProgress + GLOBE_ENTRY_SPEED, 1);
        }

        const easeIn = 1 - Math.pow(1 - globeProgress, 3);

        const robotParallaxX = parallaxX * 34;
        const robotScrollOffset = -scrollProgress * 140;
        const robotParallaxY = robotScrollOffset + parallaxY * 28;

        const handOffsetX = -450;
        const handOffsetY = -260;

        const floatX = easeIn * Math.sin(time * 0.9) * 6;
        const floatY = easeIn * Math.cos(time * 1.1) * 5;

        const scale = easeIn;
        const opacity = easeIn;

        globeSmallRef.current.style.transform = `
          translate3d(
            ${robotParallaxX + handOffsetX * easeIn + floatX}px,
            ${robotParallaxY + handOffsetY * easeIn + floatY}px,
            0
          )
          scale(${scale})
        `;
        globeSmallRef.current.style.opacity = `${opacity}`;
      }

      // ========== TEXT PARALLAX ==========
      if (textRef.current) {
        const textParallaxX = parallaxX * -8;
        const textParallaxY = parallaxY * -6 + scrollY * 0.04;
        textRef.current.style.transform = `translate3d(${textParallaxX}px, ${textParallaxY}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      if (canvas) canvas.remove();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* DEEP BACKGROUND LAYER */}
      <div
        ref={bgRef}
        className="hidden md:block absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* STARFIELD LAYER */}
      <div ref={starsRef} className="hidden md:block absolute inset-0" />

      {/* BIG GLOBE */}
      <img
        ref={globeBigRef}
        src={globe}
        className="hidden md:block  absolute w-[900px] opacity-30 blur-[4px] will-change-transform"
        style={{ left: "-12%", top: "-95%", zIndex: 2 }}
      />

      

      {/* SPACESHIP */}
      <img
        ref={shipRef}
        src={spaceship}
        className="hidden md:block absolute w-[180px] will-change-transform"
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          zIndex: 4,
          filter: "drop-shadow(0 0 20px rgba(100,200,255,0.3))",
        }}
      />

      {/* ROBOT */}
      <img
        ref={robotRef}
        src={robot}
        className="hidden md:block absolute w-[850px] will-change-transform"
        style={{ right: "-5%", bottom: "-8%", zIndex: 5 }}
      />

      {/* SMALL GLOBE — starts invisible at scale 0, zooms into robot's hand */}
      <img
        ref={globeSmallRef}
        src={globe}
        className="hidden md:block absolute w-[140px] will-change-transform"
        style={{
          right: "-5%",
          bottom: "-8%",
          zIndex: 6,
          opacity: 0,
          transformOrigin: "center center",
          filter: "drop-shadow(0 0 12px rgba(100,200,255,0.5))",
        }}
      />

      {/* MOBILE FALLBACK */}
      <div className="md:hidden absolute inset-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* GRADIENT OVERLAY */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black backdrop-blur-[2px]" />      {/* TEXT CONTENT */}
      <div
        ref={textRef}
        className="absolute z-10 bottom-24 md:bottom-32 left-6 md:left-12 text-white max-w-[900px] will-change-transform"
        style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
      >
        <h1 className="text-[36px] md:text-[72px] font-heading uppercase leading-tight tracking-tight">
          IT Solutions for a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
            Smarter Digital World
          </span>
        </h1>

        <h1 className="mt-6 text-[18px] md:text-[24px] text-gray-200 leading-relaxed max-w-2xl backdrop-blur-sm bg-black/20 p-4 rounded-2xl">
          Slams EduTech is a best IT company in Kochi offering web development,
          mobile app development, AI solutions, and industry-focused internships.
          We help businesses grow faster with scalable technology.
        </h1>

        <div className="flex gap-5 mt-8">
          <AnimatedLinkButton to="/service">
            Discover Our Services
          </AnimatedLinkButton>

          <AnimatedLinkButton to="/careers#internships">
            Apply for Internship
          </AnimatedLinkButton>
        </div>
      </div>

      <style>{`
        @keyframes floatGlobe {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}