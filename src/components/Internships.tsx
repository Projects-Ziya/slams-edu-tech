// import { Link } from "react-router-dom";
import InternshipCard from "./InternshipCard";
import { internship } from "@/data/internship";

export default function Internships() {
  return (
    <section className="font-outfit pb-12 md:pb-16 3xl:pb-24 pt-2 px-2 sm:px-0">

      <h2 className="mt-4 md:mt-6 3xl:mt-10 max-w-[1120px] text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight text-white">
Ready to Start Your IT Career?      </h2>

      <p className="pt-6 mb-8 md:mb-10 3xl:mb-14 max-w-[900px] text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] font-light leading-relaxed tracking-wide">
        Looking for the best IT internship and job career opportunities? Get in touch with us and take your first step toward a successful future in technology.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 3xl:gap-12">
        {internship.map((item) => (
          <InternshipCard
            key={item.id}
            image={item.image}
            title={item.title}
            text={item.text}
            btn={item.btn}
            buttonLink={`/internship/${item.id}`}
          />
        ))}
      </div>

    </section>
  );
}
