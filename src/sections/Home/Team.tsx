import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import member1 from "../../assets/member1.webp";
import member2 from "../../assets/member2.webp";
import member3 from "../../assets/member3.webp";
import member4 from "../../assets/member4.webp";
import member5 from "../../assets/member5.webp";
import member6 from "../../assets/member6.webp";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const members: TeamMember[] = [
  { id: 1, name: "Anugrah Sivadasan", role: "Frontend Developer", image: member1 },
  { id: 2, name: "Jesna", role: "Finance Head", image: member2 },
  { id: 3, name: "Ashvin", role: "AI/ML Developer", image: member3 },
  { id: 4, name: "Akshay", role: "UI/UX Developer", image: member4 },
  { id: 5, name: "Athulya", role: "Designer", image: member5 },
  { id: 6, name: "Cinda", role: "Python Developer", image: member6 },
];

const Team = () => {
  const [active, setActive] = useState<TeamMember | null>(null);

  return (
    <section className="relative bg-black py-32 overflow-hidden">

      {/* 🔥 RIGHT SIDE WAVE */}
      <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,_rgba(139,69,19,0.35)_0%,_transparent_70%)] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 gap-20">

        {/* ================= LEFT SVG ================= */}
       <div className="relative w-[560px] h-[420px]">

  {/* ================= SVG LINES (MASTER GRID) ================= */}
  <svg viewBox="0 0 560 420" className="absolute inset-0 w-full h-full">

    {/* HORIZONTAL */}
    <line x1="0" y1="260" x2="420" y2="260" stroke="white" strokeOpacity="0.35"/>
    <line x1="140" y1="180" x2="520" y2="180" stroke="white" strokeOpacity="0.35"/>

    {/* VERTICAL */}
    <line x1="80" y1="140" x2="80" y2="360" stroke="white" strokeOpacity="0.35"/>
    <line x1="220" y1="60" x2="220" y2="260" stroke="white" strokeOpacity="0.35"/>
    <line x1="360" y1="180" x2="360" y2="400" stroke="white" strokeOpacity="0.35"/>

  </svg>

  {/* ================= IMAGES (LOCKED TO LINE ENDS) ================= */}

  {/* bottom-left small (touching horizontal line) */}
  <img
    src={members[0].image}
    onMouseEnter={() => setActive(members[0])}
    onMouseLeave={() => setActive(null)}
    className="absolute left-[0px] top-[260px] w-[80px] -translate-y-full grayscale hover:grayscale-0 transition"
  />

  {/* small above it */}
  <img
    src={members[1].image}
    onMouseEnter={() => setActive(members[1])}
    onMouseLeave={() => setActive(null)}
    className="absolute left-[80px] top-[260px] w-[90px] -translate-y-full grayscale hover:grayscale-0 transition"
  />

  {/* tall portrait (left column) */}
  <img
    src={members[2].image}
    onMouseEnter={() => setActive(members[2])}
    onMouseLeave={() => setActive(null)}
    className="absolute left-[10px] top-[180px] w-[110px] -translate-y-full grayscale hover:grayscale-0 transition"
  />

  {/* BIG CENTER (main focus) */}
  <img
    src={members[3].image}
    onMouseEnter={() => setActive(members[3])}
    onMouseLeave={() => setActive(null)}
    className="absolute left-[240px] top-[260px] w-[150px] -translate-y-full grayscale hover:grayscale-0 transition"
  />

  {/* right mid */}
  <img
    src={members[4].image}
    onMouseEnter={() => setActive(members[4])}
    onMouseLeave={() => setActive(null)}
    className="absolute left-[400px] top-[260px] w-[95px] -translate-y-full grayscale hover:grayscale-0 transition"
  />

  {/* top center */}
  <img
    src={members[5].image}
    onMouseEnter={() => setActive(members[5])}
    onMouseLeave={() => setActive(null)}
    className="absolute left-[240px] top-[180px] w-[120px] -translate-y-full grayscale hover:grayscale-0 transition"
  />

  {/* bottom hanging */}
  <img
    src={members[5].image}
    onMouseEnter={() => setActive(members[5])}
    onMouseLeave={() => setActive(null)}
    className="absolute left-[360px] top-[260px] w-[90px] grayscale hover:grayscale-0 transition"
  />

</div>
        {/* ================= RIGHT ================= */}
        <div className="w-[500px]">

          <AnimatePresence mode="wait">
            <motion.h2
              key={active ? active.name : "default"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="text-5xl text-white"
            >
              {active ? active.name : "Meet Our Team"}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={active ? active.role : "default-role"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mt-6 text-gray-400"
            >
              {active
                ? active.role
                : "A team of experienced professionals delivering reliable and scalable digital solutions."}
            </motion.p>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Team;