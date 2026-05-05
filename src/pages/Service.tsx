import { services } from "@/data/service";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import SEO from "../components/SEO";

const CustomShapeCard = lazy(() => import("../components/CustomShapedCard"));

/*
  ── ANIMATION TIMELINE ────────────────────────────────────────────────────────
  t = 0.05s  → badge label fades in
  t = 0.16s  → heading zooms in  (duration 0.9s → settles at ~1.06s)
  t = 1.10s  → paragraph slides up  (appears just as heading finishes)
  t = 1.50s  → cards stagger in one by one  (paragraph readable before cards appear)
  ─────────────────────────────────────────────────────────────────────────────
*/

// Heading group — label + h1 stagger tightly together
const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

// Paragraph — independent, fires after heading settles
const paragraphVariant = {
  hidden:   { opacity: 0, y: 26 },
  visible:  {
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: 1.10, ease: [0.22, 1, 0.36, 1] },
  },
};

// Cards grid container — stagger starts after paragraph appears
const cardsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 1.50 } },
};

const cardItem = {
  hidden:   { opacity: 0, y: 36, scale: 0.95 },
  visible:  {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Service = () => {
  return (
    <section className="relative px-5 sm:px-6 md:px-12 2xl:px-16 font-outfit pb-16 pt-[116px] overflow-hidden">

      <SEO
        title="Best Software Development Company | Custom services"
        description="Best Software Development Company Offering Custom Software, Web, and Mobile app Development Services to Help Your Business Grow Faster"
        keywords="Best Software Development Company"
      />
      <ScrollToTop />

      {/* ── Ambient blue orb ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[650px] h-[550px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(56,108,220,0.13) 0%, rgba(30,64,175,0.05) 50%, transparent 72%)",
          filter: "blur(55px)",
        }}
      />

      {/* ── Subtle circuit grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(to right, rgba(112,169,255,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(112,169,255,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 25% 15%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 45% at 25% 15%, black 0%, transparent 100%)",
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PHASE 1 — HEADING (appears first, immediately)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headingContainer}
      >
        {/* Badge label */}
        <motion.div
          variants={{
            hidden:  { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full animate-ping"
              style={{ background: "#70A9FF", opacity: 0.55 }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: "#70A9FF", boxShadow: "0 0 7px #70A9FF" }}
            />
          </span>
          <p className="font-medium text-[15px] md:text-[17px] text-[#70A9FF] tracking-wide">
            Services
          </p>
        </motion.div>

        {/* Main heading — zoom-in */}
        <motion.div
          variants={{
            hidden:  { opacity: 0, scale: 0.93, y: 28 },
            visible: {
              opacity: 1, scale: 1, y: 0,
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="flex justify-between items-end"
        >
          <h1
            className="pt-4 font-bold leading-[1.08] tracking-tight mb-20"
            style={{
              fontSize:   "clamp(1.8rem, 4vw, 6rem)",
              textShadow: "0 2px 30px rgba(0,0,0,0.3)",
            }}
          >
            Best Software Development Company
            <br className="hidden sm:block" /> for your{" "}

            {/* "Business" — static gradient */}
            <span
              className="inline-block mr-[0.2em] bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #70A9FF 0%, #345D99 100%)" }}
            >
              Business
            </span>

            {/* "Growth" — color pulse + glowing underline */}
            <span
              className="relative inline-block"
              style={{ animation: "svcColorPulse 3s ease-in-out infinite" }}
            >
              Growth
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
                style={{
                  position:        "absolute",
                  bottom:          "-4px",
                  left:            0,
                  width:           "100%",
                  height:          "2.5px",
                  transformOrigin: "left center",
                  background:
                    "linear-gradient(to right, transparent 0%, #70A9FF 30%, #93c5fd 70%, transparent 100%)",
                  borderRadius: "2px",
                  filter:
                    "drop-shadow(0 0 5px #70A9FF) drop-shadow(0 0 14px rgba(112,169,255,0.55))",
                }}
              />
            </span>
          </h1>
        </motion.div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PHASE 2 — PARAGRAPH (slides in after heading settles)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.p
        initial="hidden"
        animate="visible"
        variants={paragraphVariant}
        className="pt-5 text-[#ADADAD] text-sm sm:text-base md:text-lg font-outfit max-w-[1400px] leading-relaxed"
      >
        Slams EduTech delivers custom web, mobile, and business software designed to scale.
        As a trusted software development company, we work with startups and growing businesses
        to turn ideas into reliable, high-performance digital products.
      </motion.p>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PHASE 3 — CARDS (stagger in after paragraph appears)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardsContainer}
        className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8"
      >
        <Suspense
          fallback={
            <div className="col-span-full flex justify-center">
              <Loader />
            </div>
          }
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={cardItem}>
              <CustomShapeCard
                image={service.image}
                title={service.title}
                text={service.text}
                buttonLink={`/service/${service.id}`}
              />
            </motion.div>
          ))}
        </Suspense>
      </motion.div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes svcColorPulse {
          0%   { color: #ffffff; }
          28%  { color: #ffffff; }
          52%  { color: #70A9FF; }
          76%  { color: #70A9FF; }
          100% { color: #ffffff; }
        }
      `}</style>
    </section>
  );
};

export default Service;