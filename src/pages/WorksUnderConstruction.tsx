import Works from "./Works";
import constructionGif from "../assets/construction.png";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const WorksUnderConstruction = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Works Page */}
      <div className="pointer-events-none select-none blur-lg scale-[1.02]">
        <Works />
      </div>

      {/* Premium Overlay */}
<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">        <div
          className="
            relative
            w-full
            max-w-4xl
            rounded-[32px]
            border border-white/10
            bg-white/5
            backdrop-blur-2xl
            shadow-[0_0_80px_rgba(59,130,246,0.25)]
            p-10 md:p-16
            overflow-hidden
          "
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* GIF */}
            <img
              src={constructionGif}
              alt="Under Construction"
              className="w-56 md:w-80 lg:w-96 object-contain"
            />

            {/* Title */}
            <h1
              className="
                mt-6
                text-4xl
                md:text-6xl
                font-extrabold
                bg-gradient-to-r
                from-blue-400
                via-cyan-300
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              Under Construction
            </h1>

            {/* Subtitle */}
            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                md:text-xl
                text-gray-200
                leading-relaxed
              "
            >
              We're currently rebuilding this section to deliver a
              better experience with enhanced projects, visuals,
              and case studies.
            </p>

            {/* Status Badge */}
          <Link
  to="/"
  className="
    mt-8
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-gray-400/30
    bg-gray-500/10
    hover:bg-gray-500/20
    px-8
    py-3
    text-cyan-300
    text-sm
    md:text-base
    font-medium
    transition-all
    duration-300
  "
>
  <ArrowLeft size={18} />
  Back to Home
</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksUnderConstruction;