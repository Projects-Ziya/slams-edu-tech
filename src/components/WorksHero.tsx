import { motion, useScroll, useTransform } from "framer-motion";

const WorksHero = () => {
  const { scrollY } = useScroll();

  // Hero fades out over the first 55% of viewport scroll
  const heroOpacity = useTransform(scrollY, [0, window.innerHeight * 0.55], [1, 0]);
  const heroScale = useTransform(scrollY, [0, window.innerHeight * 0.55], [1, 0.92]);
  const heroY = useTransform(scrollY, [0, window.innerHeight * 0.55], [0, -60]);
  const heroBlur = useTransform(scrollY, [0, window.innerHeight * 0.45], [0, 8]);

  // Background parallax — moves slower than text
  const bgY = useTransform(scrollY, [0, window.innerHeight], [0, 120]);

  // Blue → black transition: bg opacity fades over first 80%
  const bgOpacity = useTransform(scrollY, [0, window.innerHeight * 0.80], [1, 0]);

  return (
    <div style={{ height: "100vh", background: "#000000" }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* ── BACKGROUND LAYERS (parallax + fade) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: bgY, opacity: bgOpacity }}
        >
          {/* Dark navy base */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #0a0f1e 0%, #0d1527 50%, #080d1a 100%)",
            }}
          />

          {/* Centered blue radial orb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            style={{
              position: "absolute",
              top: "-80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(900px, 100vw)",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(56,108,220,0.24) 0%, rgba(30,64,175,0.10) 50%, transparent 72%)",
              filter: "blur(40px)",
            }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.04,
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* ── HERO CONTENT (fades / scales / blurs on scroll) ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
          }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
            className="text-center w-full max-w-[1400px] mx-auto z-10"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: [0.44, 1, 0.56, 1] },
                },
              }}
              className="font-semibold tracking-tighter text-white leading-[0.95]"
              style={{
                fontSize: "clamp(2.8rem, 8.5vw, 8.5rem)",
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}
            >
              Where craftsmanship meets {" "}
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{ animation: "colorPulse 3s ease-in-out infinite" }}
                >
                  impact
                </span>
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: 0,
                    width: "100%",
                    height: "3px",
                    transformOrigin: "left center",
                    background:
                      "linear-gradient(to right, transparent 0%, #60a5fa 30%, #93c5fd 70%, transparent 100%)",
                    borderRadius: "2px",
                    filter:
                      "drop-shadow(0 0 6px #60a5fa) drop-shadow(0 0 18px rgba(96,165,250,0.6))",
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
              }}
              className="mt-8 mx-auto max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
                color: "rgba(255,255,255,0.52)",
              }}
            >
              Smart solutions for a digital world — crafted with precision and
              care.
            </motion.p>

            {/* Scroll hint — fades out quickly on scroll */}
            <motion.div
              style={{ opacity: heroOpacity }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span
                className="text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "1px",
                  height: "32px",
                  background:
                    "linear-gradient(to bottom, rgba(96,165,250,0.6), transparent)",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Bottom gradient fade: blue bg → pure black ── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "35%",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(8,13,26,0.6) 50%, #000000 100%)",
            zIndex: 10,
          }}
        />
      </div>

      <style>{`
        @keyframes colorPulse {
          0%   { color: #ffffff; }
          28%  { color: #ffffff; }
          52%  { color: #7ec8ff; }
          76%  { color: #7ec8ff; }
          100% { color: #ffffff; }
        }
      `}</style>
    </div>
  );
};

export default WorksHero;
