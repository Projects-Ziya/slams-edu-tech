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

  if (!data) return <div>Internship not found</div>;

  return (
    <div className="bg-black text-white px-6 py-10 space-y-16">
      <ScrollToTop />

      {/* HERO SECTION */}
      <div className=" mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 text-[18px] gap-2"
          >
            <ChevronLeft className="pb-1"/>
            Back to all Programs
          </button>

          <h1 className="text-4xl font-medium">{data.title}</h1>

          <p className="text-[#BFBFBF] text-[20px] leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#2F2F2F] flex items-center gap-2 text-[16px] px-4 py-2 rounded-lg">
              <Clock className="text-blue-400" />
              6 Months
            </button>

            <button className="bg-[#2F2F2F] flex items-center gap-2 text-[16px] px-4 py-2 rounded-lg">
              <Users className="text-blue-400" />
              Hybrid/Remote
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-gray-400 pt-4">
            <div>
              <p className="text-white text-[24px] font-medium">500+</p>
              <span>Students Trained</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-gray-600"></div>

            <div>
              <p className="text-white text-[24px] font-medium">95%</p>
              <span>Success Rate</span>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-gray-600"></div>

            <div>
              <p className="text-white text-[24px] font-medium">4.9/5</p>
              <span>Student Rating</span>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full max-w-[700px] h-[450px] mx-auto pt-10">
          <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <clipPath id="customClip2" clipPathUnits="objectBoundingBox">
                <path d="
                  M 0.14 0
                  L 0.69 0
                  Q 0.7 0 0.705 0.01
                  L 0.78 0.11
                  Q 0.785 0.11 0.79 0.11
                  L 1 0.11
                  L 1 0.83
                  Q 1 0.835 0.995 0.84
                  L 0.88 1
                  L 0 1
                  L 0 0.18
                  Q 0 0.175 0.01 0.17
                  L 0.14 0
                  Z
                " />
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
              d="
                M 0.14 0
                L 0.69 0
                Q 0.7 0 0.705 0.01
                L 0.78 0.11
                Q 0.785 0.11 0.79 0.11
                L 1 0.11
                L 1 0.83
                Q 1 0.835 0.995 0.84
                L 0.88 1
                L 0 1
                L 0 0.18
                Q 0 0.175 0.01 0.17
                L 0.14 0
                Z
              "
              fill="none"
              stroke="white"
              strokeWidth="0.008"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      {/* DURATION */}
      <div className=" mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-[32px] font-medium">Internship Duration</p>
          <p className="text-[#BFBFBF] text-[18px]">
            Choose a timeline that fits your schedule • Flexible timings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.duration.map((item, i) => (
            <div key={i} className="border border-gray-700 p-6 rounded-xl space-y-4">
              <Clock size={28} className="text-blue-400" />
              <p className="text-[24px]">{item.title}</p>

              <p className="text-[#BCBCBC] text-[16px]">
                {data.carddetail[i]}
              </p>

              <ul className="space-y-3">
                {item.points.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-[16px]">
                    <CircleCheck className="text-blue-400 mt-1" size={18} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT YOU'LL LEARN */}
      <div className=" mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-center">What You'll Learn</h2>

        <div className="border border-gray-700 rounded-xl p-10 grid md:grid-cols-2 gap-8">
          {data.learn.map((item, i) => (
            <div key={i} className="flex gap-3 text-[18px]">
              <CircleCheck className="text-blue-400 mt-1" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* BENEFITS */}
      <div className=" mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">What You'll Get</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {data.benefits.map((item, i) => {
            const Icon = item.img;
            return (
              <div key={i} className="border border-gray-700 p-6 rounded-xl space-y-4">
                <div className="bg-[#4E4E4E] w-10 h-10 flex items-center justify-center rounded-md">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-[20px]">{item.title}</h3>
                <p className="text-gray-400 text-[16px]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-[1900px] mx-auto border border-[#7C7C7C] rounded-xl p-10 space-y-6">
        <p className="text-[28px] font-medium">Apply for this Internship</p>
        <p className="text-[18px] text-gray-400">All fields marked with * are required</p>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input className="bg-black border p-3 rounded-xl" placeholder="First Name*" />
            <input className="bg-black border p-3 rounded-xl" placeholder="Last Name*" />
            <input className="bg-black border p-3 rounded-xl" placeholder="Phone*" />
            <input className="bg-black border p-3 rounded-xl" placeholder="Email*" />
          </div>

          <textarea className="w-full bg-black border p-3 rounded-xl" placeholder="Message" />

          <input type="file" onChange={handleFileChange} />

          <button className="w-full bg-white text-black py-3 rounded hover:bg-gray-200">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}