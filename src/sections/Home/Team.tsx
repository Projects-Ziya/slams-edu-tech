import TeamCircle from "../../components/TeamCircle";
import flowerBg from "../../assets/meetourteambg.svg";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface TeamMember {
  name: string;
  role: string;
}

const TOTAL_GROUPS = 3;

const Team = () => {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [groupIndex, setGroupIndex] = useState(0);
  const [rotate, setRotate] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  // ✅ CORRECT: hook at top level
  const isInView = useInView(sectionRef, {
    amount: 0.7, // 70% visible
  });

  // ✅ MAIN SCROLL LOGIC
  useEffect(() => {
  const el = sectionRef.current;
  if (!el) return;

  // ✅ Disable on mobile
  if (window.innerWidth < 768) return;

  let isThrottled = false;

  const handleWheel = (e: WheelEvent) => {
    if (!isInView) return;

    const isAtTop = groupIndex === 0;
    const isAtBottom = groupIndex === TOTAL_GROUPS - 1;

    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = "hidden";

    if (isThrottled) return;

    e.preventDefault();
    isThrottled = true;

    setRotate(e.deltaY > 0 ? 30 : -30);

    setTimeout(() => setRotate(0), 400);

    setTimeout(() => {
      setGroupIndex(prev =>
        e.deltaY > 0 ? prev + 1 : prev - 1
      );
    }, 500);

    setTimeout(() => {
      isThrottled = false;
    }, 900);
  };

  el.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    el.removeEventListener("wheel", handleWheel);
    document.body.style.overflow = "auto";
  };
}, [groupIndex, isInView]);
  // ✅ AUTO CENTER SECTION (smooth UX)
  useEffect(() => {
    if (isInView) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-10 font-outfit overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-evenly gap-20">

        {/* LEFT - CIRCLE */}
        <div className="relative flex-shrink-0 z-20 -translate-x-14">
          <TeamCircle
            setActiveMember={setActiveMember}
            groupIndex={groupIndex}
            rotate={rotate}
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
                key={activeMember ? activeMember.name : "default"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                className="text-5xl text-white"
              >
                {activeMember ? activeMember.name : "Meet Our Team"}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeMember ? activeMember.role : "default-role"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-6 text-gray-400"
              >
                {activeMember
                  ? activeMember.role
                  : "A team of experienced professionals delivering reliable and scalable digital solutions."}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;