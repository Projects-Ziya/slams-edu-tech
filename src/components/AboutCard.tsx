import { ArrowUpRight } from "lucide-react";

export default function AboutCard({
  title,
  text,
  icon,
  buttonLink = "#",
}) {
  return (
    <div className="w-full max-w-[370px]  aspect-[370/220] relative group ">
      <svg
        viewBox="0 0 370 220"
        className="w-full h-full "
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* Clip path */}
        <defs>
          <clipPath id="customClip" clipPathUnits="userSpaceOnUse">
            <path
              d="
                M 199 0
                Q 210 0 222 11
                L 241 29
                Q 251 32 266 33
                L 370 33
                Q 370 42 370 50
                L 370 220
                Q 362 220 351 220
                L 19 220
                Q 0 220 0 208
                L 0 134
                Q 0 20 0 0
                L 199 0
                Z
              "
            />
          </clipPath>
        </defs>

        {/* Content */}
        <foreignObject
  x="0"
  y="0"
  width="370"
  height="220"
  clipPath="url(#customClip)"
>
  {/* THIS div gets blur and is clipped */}
  <div className="w-full h-full  bg-white/5 relative">   
  {/* backdrop-blur-lg */}

    {/* Text */}
    <div className="absolute  bottom-20 left-5 text-white">
      <div>{icon}</div>
      <div className="font-sm text-[20px] pt-4">{title}</div>
      <div className="text-[16px] text-[#CFCFCF] max-w-[300px]">
        {text}
      </div>
    </div>

  </div>
</foreignObject>

        {/* Border */}
        <path
          d="
            M 199 0
            Q 210 0 222 11
            L 241 29
            Q 251 32 266 33
            L 370 33
            Q 370 42 370 50
            L 370 220
            Q 362 220 351 220
            L 19 220
            Q 0 220 0 208
            L 0 134
            L 0 11
            Q 0 0 19 0
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