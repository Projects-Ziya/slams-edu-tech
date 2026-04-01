// import { Link } from "react-router-dom";
import InternshipCard from "./InternshipCard";
import { internship } from "@/data/internship";

export default function Internships() {
  return (
    <section className="font-outfit pb-16 pt-2">

      <h2 className="text-[32px] md:text-[40px] mt-16 font-medium leading-snug">
        Join a team that values innovation, learning, and real-world impact.
      </h2>

      <p className="text-[14px] md:text-[16px] mb-8 max-w-[700px]">
        Join our team or kickstart your career with our internship programs.
        We offer real-world projects, expert mentorship, and growth opportunities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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