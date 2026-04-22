import TeamGrid from "../../components/TeamGrid";
import flowerBg from "../../assets/meetourteambg.svg";
import { motion, useInView } from "framer-motion";
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
    { id: 2, name: "Athulya Jinu", role: "UI/UX Designer", image: member5 },
    { id: 3, name: "Ashvin Kunnirikkal", role: "AI/ML Developer", image: member3 },
    { id: 4, name: "Akshay", role: "Frontend Developer", image: member4 },
    { id: 5, name: "Jesna", role: "Finance Head", image: member2 },
    { id: 6, name: "Cinda Sibichan", role: "Python Developer", image: member6 },
  ],
  [
    { id: 7, name: "Fayas", role: "HR", image: hr },
    { id: 8, name: "Sreekutty", role: "Operation Head", image: sreekutty },
    { id: 9, name: "Alfread", role: "Digital Marketing", image: alfread },
    { id: 10, name: "Anoop", role: "Python", image: anoop },
    { id: 11, name: "Noufal", role: "UI/UX", image: noufal },
    { id: 12, name: "Akshay", role: "UI/UX", image: akshay },
  ],
];

const Team = () => {
  const flatMembers = teamGroups.flat();

  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [groupIndex, setGroupIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const TOTAL_GROUPS = teamGroups.length;
  const isInView = useInView(sectionRef, { amount: 0.5 });

  const loopMembers = [...flatMembers, ...flatMembers];

  // DESKTOP AUTO
  useEffect(() => {
    if (!isInView || isPaused) return;

    const interval = setInterval(() => {
      setGroupIndex((prev) => (prev + 1) % TOTAL_GROUPS);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  // ✅ START FROM MIDDLE
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstCard = slider.children[0] as HTMLElement;
    if (!firstCard) return;

    const gap = 16;
    const cardWidth = firstCard.offsetWidth + gap;

    slider.scrollLeft = cardWidth * flatMembers.length;
  }, []);

  // ✅ TRUE INFINITE RIGHT LOOP (NO REVERSE EFFECT)
  useEffect(() => {
    if (!isInView) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const firstCard = slider.children[0] as HTMLElement;
      if (!firstCard) return;

      const gap = 16;
      const cardWidth = firstCard.offsetWidth + gap;

      // move right
      slider.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });

      const halfWidth = slider.scrollWidth / 2;

      // 🔥 seamless reset (no visible jump)
      if (slider.scrollLeft >= halfWidth) {
        setTimeout(() => {
          slider.style.scrollBehavior = "auto";
          slider.scrollLeft = slider.scrollLeft - halfWidth;
          slider.style.scrollBehavior = "smooth";
        }, 300);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  // ACTIVE MEMBER
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const children = Array.from(slider.children) as HTMLElement[];

      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const screenCenter = window.innerWidth / 2;

        const distance = Math.abs(screenCenter - center);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveMember(flatMembers[closestIndex % flatMembers.length]);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-10 md:py-32 px-4 md:px-10 font-outfit overflow-hidden bg-black"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-10 md:gap-20">

        {/* LEFT GRID */}
        <div
          className="hidden md:block relative flex-shrink-0 z-20 xl:-translate-x-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setActiveMember(null);
          }}
        >
          <TeamGrid
            members={teamGroups[groupIndex]}
            setActiveMember={setActiveMember}
          />
        </div>

        {/* MOBILE TITLE */}
        <div className="md:hidden text-center w-full">
          <h2 className="text-3xl text-white">Meet Our Team</h2>
        </div>

        {/* MOBILE SLIDER */}
        <div
          ref={sliderRef}
          className="hide-scrollbar  md:hidden w-full overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4 px-[10%] scroll-smooth"
        >
          {loopMembers.map((member, index) => (
            <div
              key={index}
              className="min-w-[80%] snap-center flex flex-col items-center"
            >
              <div className="relative w-44 h-44">
                <svg viewBox="0 0 1 1" className="absolute inset-0 w-full h-full z-0">
                  <path d="M 0.12 0 H 0.82 L 1 0.18 V 0.96 Q 1 1 0.96 1 H 0.30 L 0.08 0.82 V 0.04 Q 0.08 0 0.12 0 Z" fill="#1F2937" />
                </svg>

                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover relative z-10"
                  style={{
                    clipPath: `polygon(12% 0%,82% 0%,100% 18%,100% 96%,96% 100%,30% 100%,8% 82%,8% 4%)`,
                  }}
                />

                <svg viewBox="0 0 1 1" className="absolute inset-0 w-full h-full z-20">
                  <path
                    d="M 0.12 0 H 0.82 L 1 0.18 V 0.96 Q 1 1 0.96 1 H 0.30 L 0.08 0.82 V 0.04 Q 0.08 0 0.12 0 Z"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="0.010"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="w-full max-w-[520px] text-left md:mt-10">
          <motion.img
            initial={{ y: "-50%" }}
            animate={{ y: ["-50%", "-56%", "-50%"] }}
            transition={{ duration: 10, repeat: Infinity }}
            src={flowerBg}
            className="hidden xl:block absolute xl:right-10 right-1/2 translate-x-1/2 xl:translate-x-0 top-1/2 w-full max-w-[720px] pointer-events-none"
          />

          <div className="relative z-10 text-center xl:text-center">
            <h2 className="text-4xl lg:text-5xl text-white">
              {activeMember?.name || "Meet Our Team"}
            </h2>

            <p className="mt-6 text-gray-400">
              {activeMember?.role ||
                "A team of experienced professionals delivering reliable and scalable digital solutions."}
            </p>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default Team;