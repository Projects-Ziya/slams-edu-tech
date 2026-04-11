import TeamGrid from "../../components/TeamGrid";
import flowerBg from "../../assets/meetourteambg.svg";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import member1 from "../../assets/member1.webp";
import member2 from "../../assets/member2.webp";
import member3 from "../../assets/member3.webp";
import member4 from "../../assets/member4.webp";
import member5 from "../../assets/member5.webp";
import member6 from "../../assets/member6.webp";

import sreekutty from "../../assets/sreekutty.webp";
import alfread from "../../assets/alfred.webp";
import hr from "../../assets/HR.webp";
import anoop from "../../assets/anoop.webp";
import noufal from "../../assets/noufal.webp";
import akshay from "../../assets/Akshay-ui.webp";

interface TeamMember {
  name: string;
  role: string;
  id: number;
  image: string;
}

const teamGroups: TeamMember[][] = [
  [
    { id: 1, name: "Anugrah Sivadasan", role: "Frontend Developer", image: member1 },
    { id: 2, name: "Jesna", role: "Finance Head", image: member2 },
    { id: 3, name: "Ashvin Kunnirikkal", role: "AI/ML Developer", image: member3 },
    { id: 4, name: "Akshay", role: "Frontend Developer", image: member4 },
    { id: 5, name: "Athulya Jinu", role: "UI/UX Developer", image: member5 },
    { id: 6, name: "Cinda Sibichan", role: "Python Developer", image: member6 },
  ],
  [
    { id: 7, name: "Sreekutty", role: "Operation Head", image: sreekutty },
    { id: 8, name: "Fayas", role: "HR", image: hr },
    { id: 9, name: "Alfread", role: "Digital Market", image: alfread },
    { id: 10, name: "Anoop", role: "Python", image: anoop },
    { id: 11, name: "Noufal", role: "UI/UX", image: noufal },
    { id: 12, name: "Akshay", role: "UI/UX", image: akshay },
  ],
];

const Team = () => {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [groupIndex, setGroupIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const TOTAL_GROUPS = teamGroups.length;
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    amount: 0.5,
  });

 useEffect(() => {
  if (!isInView || isPaused) return;

  const interval = setInterval(() => {
    setGroupIndex((prev) => (prev + 1) % TOTAL_GROUPS);
  }, 3000);

  return () => clearInterval(interval);
}, [isInView, isPaused, TOTAL_GROUPS]);

  

  const [hasStarted, setHasStarted] = useState(false);

useEffect(() => {
  if (isInView) {
    setHasStarted(true);
  }
}, [isInView]);




  return (
    <motion.section
      ref={sectionRef}
      className="relative py-2 md:py-32 px-10 font-outfit overflow-hidden bg-black"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.26, 0.1, 0.26, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-evenly gap-20">

        {/* LEFT - GRID */}
        <div
          className="relative flex-shrink-0 z-20 -translate-x-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() =>{
             setIsPaused(false)
            setActiveMember(null); }}
        >
          <TeamGrid
            members={teamGroups[groupIndex]}
            setActiveMember={setActiveMember}
          />
        </div>

        {/* RIGHT - CONTENT */}
        <div className="relative w-[520px] flex-shrink-0">

          <motion.img
            initial={{ y: "-50%" }}
            animate={{ y: ["-50%", "-56%", "-50%"] }}
            transition={{ duration: 10, repeat: Infinity }}
            src={flowerBg}
            className="absolute right-20 top-1/2 max-w-[752px] h-[750px]"
          />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeMember?.name || "Meet Our Team"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                className="text-5xl text-white"
              >
                {activeMember?.name || "Meet Our Team"}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeMember?.role || "default-role"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-6 text-gray-400"
              >
                {activeMember?.role ||
                  "A team of experienced professionals delivering reliable and scalable digital solutions."}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Team;