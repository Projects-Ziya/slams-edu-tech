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
<div className="px-0 py-4 sm:p-6 md:p-8 lg:p-10 2xl:p-12 mt-5 ">
      {/* SVG */}
      <svg width="0" height="0" className="absolute">
        <defs>
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


    </div>
  );
};

export default Robo;








