import { useState, useRef } from "react";

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

function BackspaceText({
  text,
  scrollProgress,
  startProgress = 0.05,
  endProgress = 0.3,
}: {
  text: string;
  scrollProgress: number;
  startProgress?: number;
  endProgress?: number;
}) {
  const chars = text.split("");
  const total = chars.length;

  return (
    <>
      {chars.map((char, i) => {
        const charEnd   = startProgress + (endProgress - startProgress) * (1 - i / Math.max(1, total - 1));
        const charStart = charEnd - 0.08;

        let opacity = 1;
        if (scrollProgress >= charEnd) {
          opacity = 0;
        } else if (scrollProgress >= charStart) {
          opacity = 1 - (scrollProgress - charStart) / (charEnd - charStart);
        }

        return (
          <span
            key={i}
            style={{
              opacity,
              display: "inline-block",
              whiteSpace: "pre",
              transition: "opacity 0.05s linear",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

const paragraphText = "Join a team obsessed with craft, velocity, and ideas that matter. Browse our open roles or apply for an internship.";

const pVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.015 },
  },
};
const charVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function Careers() {
  const [activeTab, setActiveTab] = useState<"openings" | "internships">(() =>
    window.location.hash === "#internships" ? "internships" : "openings"
  );

  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const headingVisibility = useTransform(scrollYProgress, (v) =>
    v > 0.31 ? "hidden" : "visible"
  );
  const underlineScaleX = useTransform(scrollYProgress, [0.05, 0.3], [1, 0]);

  const [scrollNum, setScrollNum] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollNum(v);
    const shouldType = v > 0.3;
    if (shouldType !== typingStarted) setTypingStarted(shouldType);
  });

  const bgY      = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const tabClass = (tab: "openings" | "internships") => `
    w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] xl:max-w-[600px] 3xl:max-w-[700px]
    py-4 px-4 3xl:py-6 rounded-full
    text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] 3xl:text-[23px]
    font-medium transition-all duration-300 border
    ${
      activeTab === tab
        ? "border-blue-400 text-blue-400 shadow-[0_0_16px_2px_rgba(59,130,246,0.4)]"
        : "border-white/20 text-white hover:border-white/50"
    }
  `;

  return (
    <main className="relative text-white" style={{ background: "#000000" }}>
      <SEO title="Careers" description="Join our team" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STICKY HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div ref={heroRef} style={{ height: "300vh" }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

          {/* ── BACKGROUND ── */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: bgOpacity,
                background: "linear-gradient(160deg, #0a0f1e 0%, #0d1527 50%, #080d1a 100%)",
              }}
            />
          </motion.div>

          {/* ── HERO CONTENT
              Both heading and subheading are position:absolute, top:50%, left:50%,
              transform:translate(-50%,-50%) — independently centered at the exact
              same viewport midpoint. No stacking = no combined-height offset.
              zIndex:20 keeps them above the bottom gradient (zIndex:10).
          ── */}
          <div className="absolute inset-0 px-4" style={{ zIndex: 20 }}>

            {/* Blue radial orb */}
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

            {/* ── HEADING — absolutely centered at 50% / 50% ── */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: "1400px",
                textAlign: "center",
                // visibility driven by scroll (unchanged)
                visibility: headingVisibility,
                // once heading is gone, pull out of pointer-event flow
                pointerEvents: typingStarted ? "none" : "auto",
              }}
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
                <BackspaceText text="Build what's " scrollProgress={scrollNum} />

                <span className="relative inline-block">
                  <span
                    className="relative z-10"
                    style={{ animation: "colorPulse 3s ease-in-out infinite" }}
                  >
                    <BackspaceText text="next" scrollProgress={scrollNum} />
                  </span>

                  {/* Glowing underline */}
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: "-6px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      transformOrigin: "left center",
                      scaleX: underlineScaleX,
                    }}
                  >
                    <motion.span
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        transformOrigin: "left center",
                        background:
                          "linear-gradient(to right, transparent 0%, #60a5fa 30%, #93c5fd 70%, transparent 100%)",
                        borderRadius: "2px",
                        filter:
                          "drop-shadow(0 0 6px #60a5fa) drop-shadow(0 0 18px rgba(96,165,250,0.6))",
                      }}
                    />
                  </motion.span>
                </span>

                <br />
                <BackspaceText text="with us." scrollProgress={scrollNum} />
              </motion.h1>
            </motion.div>

            {/* ── SUBHEADING — absolutely centered at the exact same 50% / 50% ──
                Appears at the same point the heading was → seamless position swap.
                All animation variants unchanged.
            ── */}
            <motion.p
              variants={pVariants}
              initial="hidden"
              animate={typingStarted ? "show" : "hidden"}
              className="leading-relaxed text-center 3xl:max-w-5xl"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: "56rem",     /* max-w-4xl equivalent */
                fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)",
                color: "#ffffff",
                margin: 0,
                padding: "0 1rem",
              }}
            >
              {paragraphText.split("").map((char, i) => (
                <motion.span key={i} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.p>

          </div>

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
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TABS + CONTENT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ background: "#000000", position: "relative", zIndex: 20 }}>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-16 sm:pb-24"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button onClick={() => setActiveTab("openings")} className={tabClass("openings")}>
              Currently Opening Positions
            </button>
            <button onClick={() => setActiveTab("internships")} className={tabClass("internships")}>
              Internships
            </button>
          </div>

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
        @keyframes colorPulse {
          0%   { color: #ffffff; }
          28%  { color: #ffffff; }
          52%  { color: #7ec8ff; }
          76%  { color: #7ec8ff; }
          100% { color: #ffffff; }
        }
        @keyframes shineSweep {
          0%   { background-position: -100% 0; }
          40%  { background-position: -100% 0; }
          75%  { background-position:  200% 0; }
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
