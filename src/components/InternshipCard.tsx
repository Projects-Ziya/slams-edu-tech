import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type InternshipCardProps = {
  image: string;
  title: string;
  text: string;
  btn: string;
  buttonLink?: string;
};

export default function InternshipCard({
  image,
  title,
  text,
  btn,
  buttonLink = "#",
}: InternshipCardProps) {
  return (
    <Link to={buttonLink} className="block w-full">
      <div className="group w-full">

        {/* Square Image */}
        <div className="w-full aspect-square overflow-hidden rounded-[20px] border border-gray-500">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="pt-4 space-y-2">

          <h3 className="text-[20px] md:text-[22px] font-semibold leading-snug">
            {title}
          </h3>

          <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed">
            {text}
          </p>

          <div className="flex items-center gap-1 text-blue-500 text-[16px] font-medium">
            {btn}
            <ArrowUpRight
              size={18}
              className="transition-transform duration-500 group-hover:rotate-45"
            />
          </div>

        </div>
      </div>
    </Link>
  );
}