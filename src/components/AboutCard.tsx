import { ArrowUpRight } from "lucide-react";

export default function AboutCard({
  title,
  text,
  icon,
  buttonLink = "#",
}) {
  return (
    <div className="w-full max-w-[480px] aspect-[380/240] relative group">

      {/* ✅ RESPONSIVE CLIP PATH */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="cardClip" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0.523 0
              Q 0.552 0 0.584 0.046
              L 0.631 0.112
              Q 0.629 0.112 0.655 0.133
              L 0.921 0.137
              Q 0.974 0.125 0.974 0.229
              L 0.974 0.833
              Q 0.974 0.917 0.921 0.917
              L 0.079 0.917
              Q 0 0.917 0 0.833
              L 0 0.083
              Q 0 0 0.079 0
              L 0.523 0
              Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* ✅ REAL BLUR (WORKING PERFECTLY) */}
      <div
        className="absolute inset-0 backdrop-blur-[3px] bg-white/5 z-0"
        style={{
          clipPath: "url(#cardClip)",
        }}
      />

      {/* MAIN SVG */}
      <svg
        viewBox="0 0 380 240"
        className="w-full h-full relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* CONTENT CLIP */}
        <defs>
          <clipPath id="contentClip" clipPathUnits="userSpaceOnUse">
            <path
              d="
                M 199 0
                Q 210 0 222 11
                L 240 27
                Q 239 27 249 32
                L 350 33
                Q 370 30 370 55
                L 370 200
                Q 370 220 350 220
                L 30 220
                Q 0 220 0 200
                L 0 20
                Q 0 0 30 0
                L 199 0
                Z
              "
            />
          </clipPath>
        </defs>

        {/* CONTENT */}
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath="url(#contentClip)"
        >
          <div className="w-full h-full relative">
            <div className="absolute bottom-8 sm:bottom-12 left-5 sm:left-7 text-white">

              <div>{icon}</div>

              <div className="text-lg sm:text-xl md:text-[26px] font-outfit font-[300] tracking-wide pt-3 sm:pt-4 pb-1 sm:pb-2">
                {title}
              </div>

              <div className="text-xs sm:text-sm md:text-[16px] text-[#CFCFCF] max-w-[260px] sm:max-w-[320px]">
                {text}
              </div>
            </div>
          </div>
        </foreignObject>

        {/* BORDER */}
        <path
          d="
            M 199 0
            Q 210 0 222 11
            L 240 27
            Q 239 27 249 32
            L 350 33
            Q 370 30 370 55
            L 370 200
            Q 370 220 350 220
            L 30 220
            Q 0 220 0 200
            L 0 20
            Q 0 0 30 0
            L 199 0
            Z
          "
          fill="none"
          stroke="#70A9FF"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}