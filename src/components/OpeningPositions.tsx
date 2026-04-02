import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import career from "../assets/career.webp";
import { openings } from "@/data/openings";


export default function OpeningPositions() {
  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-[40px] mt-16 mb-16 font-medium leading-snug">
          Join a team that values innovation,
          <br />
          learning, and real-world impact.
        </h2>

        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <img
            src={career}
            alt="career"
            className="w-full h-[375px] object-cover"
          />

          <p className="absolute bottom-5 left-6 text-xs text-gray-200 max-w-md">
            Be part of a workplace where ideas turn into action and skills turn
            into careers.
          </p>
        </div>

        {/* Jobs */}
        {openings.map((job) => (
<Link key={job.id} to={`/careers/${job.id}`}>            <div className="relative group">
              <div className="flex items-center justify-between pb-12 pt-12">
                <div>
                  <h3 className="text-[30px] font-medium group-hover:text-blue-300">{job.title}</h3>
                  <p className="text-gray-400 text-[24px] mt-1">{job.type}</p>
                </div>

                <button title="button" className="rounded-full text-blue-600 bg-white px-4 py-4 group-hover:bg-blue-300  transition">
                  <ArrowUpRight
                    size={24}
                    className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-white"
                  />
                </button>
              </div>

              <span className="absolute bottom-[18px] left-0 h-[1px] w-full bg-gray-500 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-8">
        <div className="flex justify-between items-center pb-8">
          <h3 className="text-lg font-medium">
            Ready to start your next project?
          </h3>

          <Link to="/#contact">
            <button className="bg-white text-black text-sm px-5 py-2 rounded transition-all duration-300 
  hover:-translate-y-1 hover:bg-gray-200">
              Contact us
            </button>
          </Link>
        </div>

        <hr className="py-3" />

        <p className="text-gray-200 text-sm max-w-xl">
          We're a team of passionate creators who turn ideas into powerful
          digital experiences, helping tech-driven brands grow with smart
          design and innovation.
        </p>
      </div>
    </div>
  );
}