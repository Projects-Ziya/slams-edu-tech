import { Sparkles } from "lucide-react"
import CountUp from "../../components/CountUp";

const Build = () => {
  return (
    <div className="">

      <div className="lg:hidden w-full flex items-center justify-center -mt-5">

        <div className="
          w-full
          h-[120px]
          flex
          justify-center
          items-center
          gap-8 sm:gap-12 md:gap-16
          bg-[#353535]
          px-6 sm:px-10 md:px-16
        ">

          {/* LEFT */}
          <div className="text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              <CountUp from={0} to={50} duration={0.5} />+
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#A0AEC0]">
              Live Projects
            </p>
          </div>

          {/* RIGHT */}
          <div className="text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              <CountUp from={0} to={100} duration={1} />%
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#A0AEC0] whitespace-nowrap">
              Client Satisfaction
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Build