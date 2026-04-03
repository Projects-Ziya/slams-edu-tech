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

  <div className="w-full max-w-[340px] flex flex-col gap-6 relative">

    {/* ================= OUTSIDE SPARKS ================= */}
    <span className="absolute top-2 left-4 w-[3px] h-[3px] bg-blue-400 rounded-full blur-[1px] animate-sparkle"></span>
    <span className="absolute top-10 right-6 w-[2px] h-[2px] bg-blue-300 rounded-full blur-[1px] animate-sparkle delay-200"></span>
    <span className="absolute bottom-6 left-10 w-[3px] h-[3px] bg-blue-500 rounded-full blur-[1px] animate-sparkle delay-500"></span>
    <span className="absolute bottom-2 right-8 w-[2px] h-[2px] bg-blue-400 rounded-full blur-[1px] animate-sparkle delay-700"></span>

    {/* CARD 1 */}
    <div className="relative group rounded-2xl p-[1px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600">

      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl blur-md opacity-30 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 group-hover:opacity-50 transition duration-500"></div>

      {/* Card Content */}
      <div className="relative rounded-2xl bg-black p-6 flex flex-col items-center justify-center overflow-hidden">

        {/* ================= INSIDE SPARKS ================= */}
        <span className="absolute top-4 left-6 w-[2px] h-[2px] bg-blue-400 rounded-full blur-[1px] animate-sparkle"></span>
        <span className="absolute bottom-6 right-8 w-[3px] h-[3px] bg-blue-500 rounded-full blur-[1px] animate-sparkle delay-300"></span>
        <span className="absolute top-1/2 left-10 w-[2px] h-[2px] bg-blue-300 rounded-full blur-[1px] animate-sparkle delay-700"></span>

        {/* Icon */}
        <div className="mb-3 text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17l6-6 4 4 8-8" />
          </svg>
        </div>

        {/* Number */}
        <p className="text-[28px] font-bold text-white">
          <CountUp from={0} to={50} duration={0.5} />+
        </p>

        {/* Label */}
        <p className="text-sm text-[#A0AEC0]">
          Live Projects
        </p>

      </div>
    </div>

    {/* CARD 2 */}
    <div className="relative group rounded-2xl p-[1px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600">

      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl blur-md opacity-30 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 group-hover:opacity-50 transition duration-500"></div>

      {/* Card Content */}
      <div className="relative rounded-2xl bg-black p-6 flex flex-col items-center justify-center overflow-hidden">

        {/* ================= INSIDE SPARKS ================= */}
        <span className="absolute top-5 right-6 w-[2px] h-[2px] bg-blue-400 rounded-full blur-[1px] animate-sparkle"></span>
        <span className="absolute bottom-5 left-8 w-[3px] h-[3px] bg-blue-500 rounded-full blur-[1px] animate-sparkle delay-500"></span>
        <span className="absolute top-1/2 right-10 w-[2px] h-[2px] bg-blue-300 rounded-full blur-[1px] animate-sparkle delay-700"></span>

        {/* Icon */}
        <div className="mb-3 text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Number */}
        <p className="text-[28px] font-bold text-white">
          <CountUp from={0} to={100} duration={1} />%
        </p>

        {/* Label */}
        <p className="text-sm text-[#A0AEC0]">
          Client Satisfaction
        </p>

      </div>
    </div>

  </div>
</div>

    </div>
  );
};

export default Robo;