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
  return (
    <Link to={buttonLink} className="block w-full max-w-[390px]">

    <div className="w-full max-w-[390px] aspect-[390/396] relative group">

      <svg
        viewBox="0 0 390 396"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* Clip path */}
        <defs>
          <clipPath id="cardClip">
            <path d="M30 0 H360 Q390 0 390 30 V366 Q390 396 360 396 H207 Q195 396 185 385 L160 350 Q150 340 135 340 H30 Q0 340 0 310 V30 Q0 0 30 0 Z"/>
          </clipPath>
        </defs>

        {/* Content */}
        <foreignObject
          x="0"
          y="0"
          width="390"
          height="396"
          clipPath="url(#cardClip)"
        >
          <div className="w-full h-full relative">

            {/* Image */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover scale-125 -translate-y-12 transition duration-700 group-hover:scale-150 group-hover:-translate-y-20"
            />
 
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Text */}
            <div className="absolute bottom-20 left-5 text-white ">
              <div className="font-bold text-[24px]">{title}</div> 
              <div className="text-medium text-[14px] max-w-[300px]">{text}</div>
            </div>

            {/* Button */}
          <button
  className="absolute bottom-5 right-5 rounded-full text-blue-600 bg-white px-4 py-4 group-hover:bg-blue-300 group-hover:text-white transition"
  aria-label="Open project"
>
  <ArrowUpRight
    size={24}
    className="transition-transform duration-500 group-hover:rotate-45"
  />
</button>

          </div>
        </foreignObject>

        {/* Border */}
        <path
          d="M30 0 H360 Q390 0 390 30 V366 Q390 396 360 396 H207 Q195 396 185 385 L160 350 Q150 340 135 340 H30 Q0 340 0 310 V30 Q0 0 30 0 Z"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />

      </svg>

    </div>
    </Link>
  );
}