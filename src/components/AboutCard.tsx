import { ArrowUpRight } from "lucide-react";

export default function AboutCard({
  title,
  text,
  icon,
  buttonLink = "#",
}) {
  return (
    <div className="w-full max-w-[480px] aspect-[380/240] relative group">

      {/* GLOBAL CLIP PATH (used for blur) */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="cardClip" clipPathUnits="userSpaceOnUse">
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
      </svg>

      {/* ✅ BLUR LAYER (NOW SHAPE-CORRECT) */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-white/5 z-0"
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
        {/* CLIP FOR CONTENT */}
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
            <div className="absolute bottom-12 left-7 text-white">
              <div>{icon}</div>

              <div className="text-[26px] font-outfit font-[300] tracking-wide pt-4 pb-2">
                {title}
              </div>

              <div className="text-[16px] text-[#CFCFCF] max-w-[320px]">
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