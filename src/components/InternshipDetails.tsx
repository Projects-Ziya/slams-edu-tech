import { useParams } from "react-router-dom";
import { internship } from "@/data/internship";
import { useNavigate } from "react-router-dom";
import { Clock, CircleCheck, Users, ChevronLeft } from "lucide-react";
import ScrollToTop from "./ScrollToTop";

export default function InternshipDetails() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File size must be less than 10MB");
      e.target.value = "";
      return;
    }

    console.log("Valid file:", file);
  };

  const { id } = useParams();
  const data = internship.find((item) => item.id === id);
  const navigate = useNavigate();

  if (!data) return <div className="text-white p-6">Internship not found</div>;

  return (
    <div className="w-full mx-auto text-white  px-4 sm:px-6 md:px-12 font-medium text-base sm:text-lg md:text-[20px]">
      <ScrollToTop />

      {/* HERO */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        <div className="space-y-5 sm:space-y-6">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#A7A7A7] text-sm sm:text-base md:text-[20px] mb-6 pt-4"
          >
            <ChevronLeft />
            Back to all Programs
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">
            {data.title}
          </h1>

          <p className="text-[#BFBFBF] text-sm sm:text-base md:text-[18px] leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="bg-[#2F2F2F] flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-lg">
              <Clock className="text-blue-400" size={18} />
              6 Months
            </button>

            <button className="bg-[#2F2F2F] flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-lg">
              <Users className="text-blue-400" size={18} />
              Hybrid/Remote
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-gray-400 pt-4">

            <div>
              <p className="text-white text-lg sm:text-xl md:text-[22px] font-medium">500+</p>
              <span className="text-xs sm:text-sm">Students Trained</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-gray-600"></div>

            <div>
              <p className="text-white text-lg sm:text-xl md:text-[22px] font-medium">95%</p>
              <span className="text-xs sm:text-sm">Success Rate</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-gray-600"></div>

            <div>
              <p className="text-white text-lg sm:text-xl md:text-[22px] font-medium">4.9/5</p>
              <span className="text-xs sm:text-sm">Student Rating</span>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full max-w-[700px] h-[250px] sm:h-[320px] md:h-[550px] md:pt-24 mx-auto">
          <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <clipPath id="customClip2" clipPathUnits="objectBoundingBox">
                <path d="M 0.14 0 L 0.69 0 Q 0.7 0 0.705 0.01 L 0.78 0.11 Q 0.785 0.11 0.79 0.11 L 1 0.11 L 1 0.83 Q 1 0.835 0.995 0.84 L 0.88 1 L 0 1 L 0 0.18 Q 0 0.175 0.01 0.17 L 0.14 0 Z" />
              </clipPath>
            </defs>

            <image
              href={data.image}
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#customClip2)"
            />

            <path
              d="M 0.14 0 L 0.69 0 Q 0.7 0 0.705 0.01 L 0.78 0.11 Q 0.785 0.11 0.79 0.11 L 1 0.11 L 1 0.83 Q 1 0.835 0.995 0.84 L 0.88 1 L 0 1 L 0 0.18 Q 0 0.175 0.01 0.17 L 0.14 0 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.008"
            />
          </svg>
        </div>
      </div>

      {/* DURATION */}
      <div className="mx-auto space-y-6 sm:space-y-8">

        <div>
          <p className="text-xl sm:text-2xl md:text-[30px] font-medium">
            Internship Duration
          </p>
          <p className="text-[#BFBFBF] text-sm sm:text-base">
            Choose a timeline that fits your schedule • Flexible timings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {data.duration.map((item, i) => (
            <div key={i} className="border border-gray-700 p-4 sm:p-6 rounded-xl space-y-3 sm:space-y-4">
              <Clock size={24} className="text-blue-400" />

              <p className="text-lg sm:text-xl">{item.title}</p>

              <p className="text-[#BCBCBC] text-sm">
                {data.carddetail[i]}
              </p>

              <ul className="space-y-2">
                {item.points.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CircleCheck className="text-blue-400 mt-1" size={16} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* LEARN */}
      <div className="mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          What You'll Learn
        </h2>

        <div className="border border-gray-700 rounded-xl p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {data.learn.map((item, i) => (
            <div key={i} className="flex gap-3 text-sm sm:text-base">
              <CircleCheck className="text-blue-400 mt-1" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* BENEFITS */}
      <div className="mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold">
          What You'll Get
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {data.benefits.map((item, i) => {
            const Icon = item.img;
            return (
              <div key={i} className="border border-gray-700 p-5 sm:p-6 rounded-xl space-y-3 sm:space-y-4">
                <div className="bg-[#4E4E4E] w-10 h-10 flex items-center justify-center rounded-md">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-base sm:text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-[1900px] mx-auto border border-[#7C7C7C] rounded-xl p-5 sm:p-8 space-y-5 sm:space-y-6">
        <p className="text-xl sm:text-2xl font-medium">
          Apply for this Internship
        </p>

        <p className="text-sm sm:text-base text-gray-400">
          All fields marked with * are required
        </p>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <input className="bg-black border p-3 rounded-xl text-sm sm:text-base" placeholder="First Name*" />
            <input className="bg-black border p-3 rounded-xl text-sm sm:text-base" placeholder="Last Name*" />
            <input className="bg-black border p-3 rounded-xl text-sm sm:text-base" placeholder="Phone*" />
            <input className="bg-black border p-3 rounded-xl text-sm sm:text-base" placeholder="Email*" />
          </div>

          <textarea className="w-full bg-black border p-3 rounded-xl text-sm sm:text-base" placeholder="Message" />

          <input title="internship" type="file" onChange={handleFileChange} className="text-sm" />

          <button className="w-full bg-white text-black py-3 rounded hover:bg-gray-200 text-sm sm:text-base">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}