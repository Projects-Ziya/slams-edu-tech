import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type CustomShapeCardProps = {
  image: string;
  title: string;
  text: string;
  buttonLink?: string;
};

export default function CustomShapeCard({
  image,
  title,
  text,
  buttonLink = "#",
}: CustomShapeCardProps) {
  const clipId = `cardClip-${title.replace(/\s+/g, "")}`;

  return (
    <Link to={buttonLink} className="block w-full max-w-[390px]">
      <div className="w-full aspect-[390/396] relative group">

        <svg
          viewBox="0 0 390 396"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={clipId}>
              <path d="M30 0 H360 Q390 0 390 30 V366 Q390 396 360 396 H207 Q195 396 185 385 L160 350 Q150 340 135 340 H30 Q0 340 0 310 V30 Q0 0 30 0 Z" />
            </clipPath>
          </defs>

          {/* 🔥 CLIPPED CONTAINER */}
          <g clipPath={`url(#${clipId})`}>

            {/* 🔥 IMAGE ZOOM INSIDE */}
            <image
              href={image}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              className="transition duration-700 ease-out group-hover:scale-110 origin-center"
            />

            {/* Overlay */}
            <rect
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.3)"
            />

          </g>

          {/* ✅ BORDER (fixed, clean) */}
          <path
            d="M30 0 H360 Q390 0 390 30 V366 Q390 396 360 396 H207 Q195 396 185 385 L160 350 Q150 340 135 340 H30 Q0 340 0 310 V30 Q0 0 30 0 Z"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
        </svg>

        {/* TEXT */}
        <div className="absolute bottom-[18%] left-[5%] right-[5%] text-white z-10">
          <h3 className="font-bold leading-tight text-[clamp(14px,2.5vw,22px)] mb-1">
            {title}
          </h3>

          <p className="leading-snug text-[clamp(11px,2vw,14px)] max-w-[90%] line-clamp-2">
            {text}
          </p>
        </div>

        {/* BUTTON */}
        <button
          className="absolute bottom-[5%] right-[5%] z-10 rounded-full text-blue-600 bg-white p-[clamp(8px,1.5vw,14px)] group-hover:bg-blue-300 group-hover:text-white transition"
          aria-label="Open project"
        >
          <ArrowUpRight
            size={18}
            className="transition-transform duration-500 group-hover:rotate-45"
          />
        </button>

      </div>
    </Link>
  );
}