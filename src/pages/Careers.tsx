import { useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import OpeningPositions from "../components/OpeningPositions";
import Internships from "../components/Internships";
import SEO from "../components/SEO"; 
import { AnimatePresence, motion } from "framer-motion";

export default function Careers() {
  const [activeTab, setActiveTab] = useState<"openings" | "internships">(() =>
    window.location.hash === "#internships" ? "internships" : "openings"
  );

  const tabClass = (tab: "openings" | "internships") => `
    w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] xl:max-w-[600px]
    py-4 px-4
    rounded-full
    text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px]
    font-medium
    transition-all duration-300
    border
    ${
      activeTab === tab
        ? "border-blue-400 text-blue-400 shadow-[0_0_16px_2px_rgba(59,110,232,0.35)]"
        : "border-white/25 text-white hover:border-white/50"
    }
  `;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--brand-blue)]/20 blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 70%)",
          }}
        />
      </div>

      {/* ── HERO — keeps max-w-6xl as before ── */}
      <section className="relative mx-auto max-w-6xl pt-24 pb-10 sm:pt-32 sm:pb-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          className="text-center"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-blue-glow)] shadow-[0_0_8px_var(--brand-blue-glow)]" />
            We're hiring
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mt-6 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white"
          >
            Build what's{" "}
            <span className="bg-gradient-to-r from-white via-[var(--brand-blue-glow)] to-white bg-clip-text text-transparent">
              next
            </span>
            <br className="hidden sm:block" /> with us.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-white/60"
          >
            Join a team obsessed with craft, velocity, and ideas that matter.
            Browse our open roles or apply for an internship.
          </motion.p>
        </motion.div>
      </section>

      {/* ── TABS + CONTENT — full width, own horizontal padding ── */}
      <section className="relative w-full px-4 sm:px-8 lg:px-16 pb-16 sm:pb-24">

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button onClick={() => setActiveTab("openings")} className={tabClass("openings")}>
            Currently Opening Positions
          </button>
          <button onClick={() => setActiveTab("internships")} className={tabClass("internships")}>
            Internships
          </button>
        </motion.div>

        {/* Animated content */}
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
      </section>
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