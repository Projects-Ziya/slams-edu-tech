import robo from "../../assets/roboo.webp";
import CountUp from "../../components/CountUp";
import { useEffect, useState, lazy, Suspense } from "react";

const Particles = lazy(() => import("../../components/Robobg"));

const Robo = () => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">

      {/* SVG */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="videoClip" clipPathUnits="userSpaceOnUse">
            <path
              transform="scale(1.2,1)"
              d="M408.559 70.5H30.5C13.9315 70.5 0.5 83.9315 0.5 100.5V660.5C0.5 677.069 13.9315 690.5 30.5 690.5H405.561C414.969 690.5 423.833 686.086 429.502 678.578L485.498 604.422C491.167 596.914 500.031 592.5 509.439 592.5H1132.5C1149.07 592.5 1162.5 579.069 1162.5 562.5V30.5C1162.5 13.9315 1149.07 0.5 1132.5 0.5H506.441C498.773 0.5 491.396 3.43638 485.825 8.70596L429.175 62.2941C423.604 67.5636 416.227 70.5 408.559 70.5Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden lg:block relative w-full aspect-[1920/700] overflow-hidden">

        {/* PARTICLES */}
        {showParticles && (
          <Suspense fallback={null}>
            <Particles
              gradientColors={["#3e3f41", "#74C3F1"]}
              angle={0}
              noise={0.3}
              blindCount={72}
              blindMinWidth={20}
              spotlightRadius={0.5}
              spotlightSoftness={0.5}
              spotlightOpacity={0.6}
              mouseDampening={0.15}
              distortAmount={0}
              shineDirection="left"
              mixBlendMode="lighten"
            />
          </Suspense>
        )}

        {/* ROBOT */}
        <img
          src={robo}
          alt="robot"
          className="
            absolute
            left-[2%] sm:left-[3%] md:left-[4%]
            top-0
            h-[80%] sm:h-[85%] md:h-[90%] lg:h-[94%]
            object-contain
            z-10 pointer-events-none
          "
        />

        {/* CARD */}
        <div
          className="
            absolute z-10
            flex flex-col sm:flex-row
            items-center
            justify-center
            gap-3 sm:gap-5
            p-4 sm:p-6
            bg-white/10
            backdrop-blur-sm
            border border-white/20
            rounded-2xl
            shadow-lg
            w-[90%] sm:w-auto
            max-w-[320px] sm:max-w-none
          "
          style={{
            left: "50%",
            top: "32%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="text-center flex-1">
            <p className="text-[40px] text-white font-medium">
              <CountUp from={0} to={50} duration={0.5} />+
            </p>
            <p className="text-[#ACACAC] text-[24px]">
              Live Projects
            </p>
          </div>

          <div className="text-center flex-1">
            <p className="text-[40px] text-white font-medium">
              <CountUp from={0} to={100} duration={1} />%
            </p>
            <p className="text-[#ACACAC] text-[24px] whitespace-nowrap">
              Client Satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABLET + MOBILE (MINIMAL) ================= */}
      <div className="lg:hidden w-full flex items-center justify-center py-10">

        <div className="w-full max-w-[340px] flex flex-col gap-5 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">

          <div className="text-center">
            <p className="text-[26px] text-white font-semibold">
              <CountUp from={0} to={50} duration={0.5} />+
            </p>
            <p className="text-sm text-[#ACACAC]">
              Live Projects
            </p>
          </div>

          <div className="text-center">
            <p className="text-[26px] text-white font-semibold">
              <CountUp from={0} to={100} duration={1} />%
            </p>
            <p className="text-sm text-[#ACACAC]">
              Client Satisfaction
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Robo;