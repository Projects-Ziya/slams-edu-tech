import { useId } from "react";

type WorksCardProps = {
  image: string;
  name: string;
  stack: string;
};

export default function WorksCard({
  image,
  name,
  stack,
}:WorksCardProps) {

  const clipId = useId();

  return (
    <div className="w-full max-w-[390px] mx-auto relative group">

      {/* CARD SHAPE */}
      <div className="w-full aspect-[390/396]">

        <svg
          viewBox="0 0 390 396"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >

          {/* Clip path */}
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path
                d="M319.8 0
                L390 71.28
                V366
                A30 30 0 0 1 360 396
                H30
                A30 30 0 0 1 0 366
                V30
                A30 30 0 0 1 30 0
                H319.8
                Z"
              />
            </clipPath>
          </defs>

          {/* Content */}
          <foreignObject
            x="0"
            y="0"
            width="390"
            height="396"
            clipPath={`url(#${clipId})`}
          >

            <div className="w-full h-full relative ">

              {/* Image */}
              <img
              alt="img"
                src={image}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0"></div>

            </div>

          </foreignObject>

          {/* Border */}
          <path
            d="M319.8 0
            L390 71.28
            V366
            A30 30 0 0 1 360 396
            H30
            A30 30 0 0 1 0 366
            V30
            A30 30 0 0 1 30 0
            H319.8
            Z"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

        </svg>

      </div>

      {/* TEXT SECTION */}

      <div className="pt-4 sm:pt-6 md:pt-8">

        <p className="font-bold text-[18px] font-outfit sm:text-[20px] md:text-[22px] lg:text-[24px] leading-tight group-hover:text-blue-400 transition ">
          {name}
        </p>

        <p className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-gray-300 pt-1 pb-6">
          {stack}
        </p>

      </div>

    </div>
  );
}