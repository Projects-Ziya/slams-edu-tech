import { useEffect, useRef } from "react";

const NotFound = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface Star {
      x: number; y: number; r: number; o: number; flicker: number; speed: number;
    }
    interface Particle {
      x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number;
    }

    let W = 0, H = 0;
    let stars: Star[] = [];
    let particles: Particle[] = [];

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function initStars() {
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.6 + 0.1,
        flicker: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
      }));
    }

    function initParticles() {
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.5 ? "#579AFF" : "#345D99",
        alpha: Math.random() * 0.4 + 0.1,
      }));
    }

    function draw() {
      ctx!.fillStyle = "#080810";
      ctx!.fillRect(0, 0, W, H);

      // Grid
      ctx!.strokeStyle = "rgba(255,255,255,0.025)";
      ctx!.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < W; x += gridSize) {
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, H); ctx!.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(W, y); ctx!.stroke();
      }

      // Stars
      stars.forEach((s) => {
        s.flicker += s.speed;
        const opacity = s.o * (0.6 + 0.4 * Math.sin(s.flicker));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(240,238,255,${opacity})`;
        ctx!.fill();
      });

      // Particles
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      });

      // Occasional noise scanline
      if (Math.random() > 0.96) {
        const ly = Math.random() * H;
        ctx!.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx!.fillRect(0, ly, W, Math.random() * 3 + 1);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    initParticles();
    draw();

    const handleResize = () => { resize(); initStars(); initParticles(); };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        .nf-wrapper {
          min-height: 100vh;
          background: #080810;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          font-family: 'Space Mono', monospace;
        }

        .nf-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .nf-scanline {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #579AFF 30%, #345D99 70%, transparent);
          opacity: 0.5;
          animation: nf-scan 4s linear infinite;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        @keyframes nf-scan {
          0%   { top: -2px; }
          100% { top: 100%; }
        }

        .nf-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .nf-glitch-wrap {
          position: relative;
          line-height: 1;
        }

        .nf-404 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 22vw, 200px);
          color: #f0eeff;
          letter-spacing: 0.04em;
          position: relative;
          display: block;
          animation: nf-float 6s ease-in-out infinite;
        }

        .nf-404::before,
        .nf-404::after {
          content: '404';
          position: absolute;
          top: 0; left: 0; right: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit;
          letter-spacing: inherit;
        }

        .nf-404::before {
          color: #579AFF;
          animation: nf-glitch-1 3.5s infinite steps(1);
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }

        .nf-404::after {
          color: #345D99;
          animation: nf-glitch-2 3.5s infinite steps(1);
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }

        @keyframes nf-glitch-1 {
          0%, 100% { transform: translate(0); opacity: 0; }
          8%  { transform: translate(-4px, 2px); opacity: 1; }
          10% { transform: translate(4px, -2px); opacity: 1; }
          12% { opacity: 0; }
          48% { opacity: 0; transform: translate(0); }
          50% { transform: translate(3px, 1px); opacity: 1; }
          52% { transform: translate(-3px, -1px); opacity: 1; }
          54% { opacity: 0; }
          76% { opacity: 0; transform: translate(0); }
          78% { transform: translate(-6px, 0); opacity: 1; }
          80% { transform: translate(6px, 0); opacity: 1; }
          82% { opacity: 0; }
        }

        @keyframes nf-glitch-2 {
          0%, 100% { transform: translate(0); opacity: 0; }
          8%  { transform: translate(4px, -2px); opacity: 1; }
          10% { transform: translate(-4px, 2px); opacity: 1; }
          12% { opacity: 0; }
          48% { opacity: 0; transform: translate(0); }
          50% { transform: translate(-3px, -1px); opacity: 1; }
          52% { transform: translate(3px, 1px); opacity: 1; }
          54% { opacity: 0; }
          76% { opacity: 0; transform: translate(0); }
          78% { transform: translate(6px, 0); opacity: 1; }
          80% { transform: translate(-6px, 0); opacity: 1; }
          82% { opacity: 0; }
        }

        @keyframes nf-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        .nf-subtitle {
          font-size: 13px;
          color: #888;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          animation: nf-fadeup 1s ease 0.4s both;
        }

        .nf-message {
          font-size: 15px;
          color: #ccc;
          max-width: 380px;
          line-height: 1.7;
          animation: nf-fadeup 1s ease 0.6s both;
        }

        .nf-message em {
          color: #579AFF;
          font-style: normal;
        }

        .nf-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border: 1px solid #1a2a44;
          color: #f0eeff;
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: transparent;
          animation: nf-fadeup 1s ease 0.8s both;
          transition: border-color 0.3s, color 0.3s;
        }

        .nf-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #579AFF 0%, #345D99 100%);
          transform: translateX(-110%) skewX(-12deg);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.18, 1);
          z-index: 0;
        }

        .nf-btn:hover::before { transform: translateX(0) skewX(-12deg); }
        .nf-btn:hover { border-color: transparent; }

        .nf-btn span {
          position: relative;
          z-index: 1;
        }

        .nf-btn .nf-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s;
          display: inline-block;
        }

        .nf-btn:hover .nf-arrow { transform: translateX(4px); }

        .nf-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: #1e3a5f;
          border-style: solid;
          opacity: 0.7;
        }
        .nf-corner.tl { top: 8px;    left: 8px;  border-width: 1px 0 0 1px; }
        .nf-corner.tr { top: 8px;    right: 8px; border-width: 1px 1px 0 0; }
        .nf-corner.bl { bottom: 8px; left: 8px;  border-width: 0 0 1px 1px; }
        .nf-corner.br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

        .nf-code {
          font-size: 11px;
          color: #444;
          letter-spacing: 0.05em;
          animation: nf-fadeup 1s ease 1s both;
          font-family: 'Space Mono', monospace;
        }

        .nf-code span { color: #579AFF; }

        @keyframes nf-fadeup {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="nf-wrapper">
        <canvas ref={canvasRef} className="nf-canvas" />
        <div className="nf-scanline" />

        <div className="nf-content">
          <div className="nf-glitch-wrap">
            <span className="nf-404">404</span>
          </div>

          <p className="nf-subtitle">signal lost · page not found</p>

          <p className="nf-message">
            The page you were looking for drifted into the void.
            <br />
            It either <em>never existed</em> or got lost in&nbsp;transit.
          </p>

          <a href="/" className="nf-btn">
            <div className="nf-corner tl" />
            <div className="nf-corner tr" />
            <div className="nf-corner bl" />
            <div className="nf-corner br" />
            <span>Return to base</span>
            <span className="nf-arrow">→</span>
          </a>

          <p className="nf-code">
            ERR_<span>PAGE</span>_NOT_FOUND · 0x0000_404
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
