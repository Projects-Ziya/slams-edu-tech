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
        <div className="w-full aspect-square overflow-hidden rounded-[20px] 3xl:rounded-[30px] border border-gray-500">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="pt-4 3xl:pt-6 space-y-2 3xl:space-y-4">

          <h3 className="font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] 3xl:text-[28px] leading-tight">
            {title}
          </h3>

          <p className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px] text-gray-300 leading-relaxed">
            {text}
          </p>

          <div className="flex items-center gap-1 text-blue-500 text-[15px] md:text-[16px] 3xl:text-[20px] font-medium">
            {btn}
            <ArrowUpRight
              className="w-[18px] h-[18px] 3xl:w-[24px] 3xl:h-[24px] transition-transform duration-500 group-hover:rotate-45"
            />
          </div>

        </div>
      </div>
    </Link>
  );
}
