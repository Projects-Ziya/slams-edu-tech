import { useState, useRef } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import OpeningPositions from "../components/OpeningPositions";
import Internships from "../components/Internships";
import SEO from "../components/SEO";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

export default function Careers() {
  const [activeTab, setActiveTab] = useState<"openings" | "internships">(() =>
    window.location.hash === "#internships" ? "internships" : "openings"
  );

  // ── Scroll tracking ────────────────────────────────────────────────────────
  // We track scroll inside the outer container so we can derive per-element
  // transforms without any layout thrash.
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Hero fades out over the first 60vh of scroll
  const heroOpacity   = useTransform(scrollY, [0, window.innerHeight * 0.55], [1, 0]);
  const heroScale     = useTransform(scrollY, [0, window.innerHeight * 0.55], [1, 0.92]);
  const heroY         = useTransform(scrollY, [0, window.innerHeight * 0.55], [0, -60]);
  const heroBlur      = useTransform(scrollY, [0, window.innerHeight * 0.45], [0, 8]);

  // Background parallax — moves slower than text
  const bgY           = useTransform(scrollY, [0, window.innerHeight], [0, 120]);

  // Blue → black transition: bg opacity fades over first 80vh
  const bgOpacity     = useTransform(scrollY, [0, window.innerHeight * 0.80], [1, 0]);

  // Tabs appear after hero has mostly faded (after 50vh of scroll)
  const tabsOpacity   = useTransform(scrollY, [window.innerHeight * 0.45, window.innerHeight * 0.70], [0, 1]);
  const tabsY         = useTransform(scrollY, [window.innerHeight * 0.45, window.innerHeight * 0.70], [40, 0]);

  // Track whether tabs are "visible" to control pointer-events
  const [tabsVisible, setTabsVisible] = useState(false);
  useMotionValueEvent(tabsOpacity, "change", (v) => setTabsVisible(v > 0.05));

  const tabClass = (tab: "openings" | "internships") => `
    w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] xl:max-w-[600px]
    py-4 px-4 rounded-full
    text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px]
    font-medium transition-all duration-300 border
    ${activeTab === tab
      ? "border-blue-400 text-blue-400 shadow-[0_0_16px_2px_rgba(59,130,246,0.4)]"
      : "border-white/20 text-white hover:border-white/50"
    }
  `;

  return (
    <main
      ref={containerRef}
      className="relative text-white"
      style={{ background: "#000000" }}
    >
      <SEO title="Careers" description="Join our team" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STICKY HERO — stays fixed while user scrolls through the "scroll space"
          The outer div is 200vh tall (100vh hero + 100vh transition runway).
          The inner sticky panel pins to viewport, so the hero text sits still
          while scroll progress drives all transforms.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ height: "100vh" }}>
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: "100vh" }}
        > 

          {/* ── BACKGROUND LAYERS (parallax + fade) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: bgY }}
          >
            {/* Dark navy base — scales with bgY so it moves slower than text */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: bgOpacity,
                background: "linear-gradient(160deg, #0a0f1e 0%, #0d1527 50%, #080d1a 100%)",
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
            {/* Blue radial orb — sits behind the heading text */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -60%)",
                width: "min(700px, 90vw)",
                height: "500px",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, rgba(56,108,220,0.10) 0%, rgba(30,64,175,0.04) 50%, transparent 70%)",
                filter: "blur(50px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
              className="text-center w-full max-w-[1400px] mx-auto"
            >

              {/* ── We're Hiring badge ── */}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8
                  text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-sm"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full animate-ping"
                    style={{ background: "#60a5fa", opacity: 0.6 }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ background: "#60a5fa", boxShadow: "0 0 8px #60a5fa" }}
                  />
                </span>
                We're hiring
              </motion.span>

              {/* ── Main heading ── */}
              {/*
                Font scales with clamp():
                  min  = 2.8rem  (mobile ~375px)
                  mid  = 8.5vw   (fluid scaling)
                  max  = 7.5rem  (cap — prevents overflow on 4K but still large)
                On 4K (3840px wide) 8.5vw ≈ 326px which hits the 7.5rem = 120px cap.
                Adjust max upward (e.g. 10rem) if you want even bigger on 4K.
              */}
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
                Build what's{" "}

                {/* ── "next" — color pulse + sweep shine + glowing underline ── */}
                <span className="relative inline-block">

                  {/*
                    Two layered effects on "next":
                    1. colorPulse   — whole word breathes white ↔ sky-blue
                    2. shineSweep   — a bright highlight scans left→right over it
                                      (positioned absolutely, pointer-events:none)
                  */}
                  <span
                    className="relative z-10"
                    style={{ animation: "colorPulse 3s ease-in-out infinite" }}
                  >
                    next

                    {/* Shine sweep overlay — spans the word, clips to text shape
                        via a semi-transparent white gradient moving L→R */}
                    
                  </span>

                  {/* Glowing underline — draws in from left once, stays */}
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

                <br />with us.
              </motion.h1>

              {/* ── Subheading ── */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
                }}
                className="mx-auto mt-7 max-w-xl leading-relaxed"
                style={{
                  fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
                  color: "rgba(255,255,255,0.52)",
                }}
              >
                Join a team obsessed with craft, velocity, and ideas that matter.
                Browse our open roles or apply for an internship.
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
          {/* This gradient sits at the very bottom of the sticky hero and
              creates the seamless blue→black bleed into the content section */}
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
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TABS + CONTENT — pure black background, fades in as hero fades out
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ background: "#000000", position: "relative", zIndex: 20 }}>
        <motion.section
          className="w-full px-4 sm:px-8 lg:px-16 pt-16 pb-16 sm:pb-24"
          style={{
            opacity: tabsOpacity,
            y: tabsY,
            pointerEvents: tabsVisible ? "auto" : "none",
          }}
        >
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button onClick={() => setActiveTab("openings")} className={tabClass("openings")}>
              Currently Opening Positions
            </button>
            <button onClick={() => setActiveTab("internships")} className={tabClass("internships")}>
              Internships
            </button>
          </div>

          {/* Content */}
          <div className="mt-12 sm:mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTab === "openings" ? <OpeningPositions /> : <Internships />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>
      </div>

      {/* ── KEYFRAMES ── */}
      <style>{`

        /* "next" — whole word breathes white ↔ sky-blue */
        @keyframes colorPulse {
          0%   { color: #ffffff; }
          28%  { color: #ffffff; }
          52%  { color: #7ec8ff; }
          76%  { color: #7ec8ff; }
          100% { color: #ffffff; }
        }

        /* Shine sweep — a highlight scans left→right across "next"
           synced to the same 3s cycle as colorPulse */
        @keyframes shineSweep {
          0%   { background-position: -100% 0; }
          40%  { background-position: -100% 0; }   /* hold off-left while at white */
          75%  { background-position:  200% 0; }   /* sweep through while blue */
          100% { background-position:  200% 0; }
        }

      `}</style>
    </main>
  );
} 



// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const tabs = [
//   {
//     id: "fulltime",
//     label: "Open Positions",
//     title: "Build the future with us",
//     description:
//       "Join our core team and work on real-world products using modern technologies. We value ownership, creativity, and impact.",
//     roles: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
//   },
//   {
//     id: "intern",
//     label: "Internships",
//     title: "Start your journey",
//     description:
//       "Kickstart your career by working alongside experienced developers and designers. Learn, build, and grow with us.",
//     roles: ["Frontend Intern", "Backend Intern", "Design Intern"],
//   },
// ];

// const CareersSection = () => {
//   const [activeTab, setActiveTab] = useState("fulltime");

//   const current = tabs.find((t) => t.id === activeTab);

//   return (
//     <section className="bg-black text-white py-24 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-16">
//           <h2 className="text-4xl md:text-5xl font-semibold">
//             Join Our Team
//           </h2>
//           <p className="text-gray-400 mt-4 max-w-xl">
//             Explore opportunities and become part of a team that values innovation,
//             learning, and real-world impact.
//           </p>
//         </div>

//         <div className="grid grid-cols-12 gap-10 items-start">

//           {/* LEFT TABS */}
//           <div className="col-span-12 md:col-span-4 space-y-4">
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab.id;

//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`
//                     w-full text-left px-6 py-4 rounded-xl transition
//                     border 
//                     ${isActive
//                       ? "bg-white text-black border-white"
//                       : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"}
//                   `}
//                 >
//                   <span className="text-lg font-medium">
//                     {tab.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="col-span-12 md:col-span-8">

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={current?.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
//                 className="relative p-8 md:p-12 rounded-3xl border border-white/10 
//                            bg-white/5 backdrop-blur-xl overflow-hidden"
//               >

//                 {/* subtle glow */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

//                 <div className="relative z-10">

//                   {/* TITLE */}
//                   <h3 className="text-3xl md:text-4xl font-semibold">
//                     {current?.title}
//                   </h3>

//                   {/* DESCRIPTION */}
//                   <p className="mt-4 text-gray-400 max-w-lg leading-relaxed">
//                     {current?.description}
//                   </p>

//                   {/* ROLES */}
//                   <div className="mt-8 flex flex-wrap gap-3">
//                     {current?.roles.map((role, i) => (
//                       <motion.span
//                         key={role}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className="px-4 py-2 rounded-full text-sm 
//                                    bg-white/10 border border-white/10"
//                       >
//                         {role}
//                       </motion.span>
//                     ))}
//                   </div>

//                   {/* CTA */}
//                   <div className="mt-10">
//                     <button className="px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition">
//                       Apply Now
//                     </button>
//                   </div>

//                 </div>
//               </motion.div>
//             </AnimatePresence>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareersSection;