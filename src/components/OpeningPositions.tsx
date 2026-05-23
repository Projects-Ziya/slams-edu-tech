import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import career from "../assets/career.webp";
import { openings } from "@/data/openings";

export default function OpeningPositions() {
  return (
    <div id="positions" className="font-outfit">
      <div className="space-y-8 ">
        <h2 className="mt-2 sm:mt-14 md:mt-6 3xl:mt-12 mb-12 sm:mb-14 md:mb-16  3xl:mb-20 max-w-[1120px] text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-10 tracking-normal text-white">
          Join our team that values innovation,
          
          learning, and real-world impact.
        </h2>

        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <img
            src={career}
            alt="career"
            className="w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[375px] 3xl:h-[480px] 4xl:h-[550px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <p className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 3xl:bottom-8 3xl:left-10 max-w-[720px] 3xl:max-w-[900px] text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] font-light leading-relaxed tracking-wide text-gray-100">
            Join Slams Tech and explore the best IT internship and job career opportunities designed for real-world learning, innovation, and long-term growth. Build your skills, gain practical experience, and move confidently toward your future in tech.
          </p>
        </div>

        {/* Jobs */}
        {openings.map((job) => (
          <Link key={job.id} to={`/careers/${job.id}`}>
            <div className="relative group">
              <div className="flex items-center justify-between pb-8 sm:pb-10 md:pb-12 pt-8 sm:pt-10 md:pt-12">
                <div>
                  <h3 className="font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[30px] 3xl:text-[34px] leading-6 group-hover:text-blue-300 transition-colors">
                    {job.title}
                  </h3>
                  <p className="font-medium text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] 3xl:text-[18px] text-gray-400 mt-2">
                    {job.type}
                  </p>
                </div>

                <button
                  title="button"
                  className="rounded-full text-blue-600 bg-white px-3 py-3 sm:px-4 sm:py-4 3xl:px-6 3xl:py-6 group-hover:bg-blue-300 transition"
                >
                  <ArrowUpRight
                    size={20}
                    className="sm:w-6 sm:h-6 3xl:w-8 3xl:h-8 transition-transform duration-500 group-hover:rotate-45 group-hover:text-white"
                  />
                </button>
              </div>

              <span className="absolute bottom-[18px] left-0 h-[1px] w-full bg-gray-500 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 3xl:mt-24 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 sm:p-7 md:p-8 3xl:p-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 pb-6 sm:pb-7 md:pb-8">
          <h3 className="text-[20px] md:text-[22px] lg:text-[24px] 3xl:text-[28px] font-semibold leading-tight">
            Ready to Start Your IT Career?          </h3>

          <Link to="/#contact">
            <button className="bg-white text-black text-sm md:text-base 3xl:text-lg px-4 sm:px-5 py-2 3xl:px-8 3xl:py-3.5 rounded transition-all duration-300 
  hover:-translate-y-1 hover:bg-gray-200">
              Contact us
            </button>
          </Link>
        </div>

        <hr className="py-3" />

        <p className="text-gray-200 text-[15px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] font-light leading-relaxed tracking-wide max-w-3xl 3xl:max-w-4xl">
         Looking for the best IT internship and job career opportunities? Get in touch with us and take your first step toward a successful future in technology.

        </p>
      </div>
    </div>
  );
}
