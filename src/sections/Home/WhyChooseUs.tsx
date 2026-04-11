import NetworkDiagram from "../../components/NetworkDiagram"
import globe from "../../assets/globe.mp4"

const WhyChooseSection = () => {
  return (
<section className="w-full bg-black text-white py-2 md:py-20 px-4 md:px-6">
      <div className="max-w-full">

        {/* Heading */}
        <div className="mb-12">
          <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400">
            / Why Choose Us
          </p>

          <p className="pt-5 font-extrabold font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            More than services —
            <span className="text-blue-500"> we create success stories.</span>
          </p>

          <p className="text-gray-400 mt-6 max-w-xl text-sm md:text-base leading-relaxed">
            We deliver digital solutions and practical training that drive real
            growth for businesses and future-ready skills for professionals.
          </p>
        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="lg:hidden grid grid-cols-2 gap-4">

          {/* Card 1 */}
          <div className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Custom Solutions</p>
            <p className="text-sm text-gray-400">
              Tailored software and digital solutions built for your business.
            </p>
          </div>

          {/* Card 2 */}
          <div className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Expert Team</p>
            <p className="text-sm text-gray-400">
              Skilled developers and designers delivering quality work.
            </p>
          </div>

          {/* Card 3 */}
          <div className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Proven Results</p>
            <p className="text-sm text-gray-400">
              Successful projects with measurable outcomes.
            </p>
          </div>

          {/* Card 4 */}
          <div className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Innovation Driven</p>
            <p className="text-sm text-gray-400">
              We use modern technologies to stay ahead of competition.
            </p>
          </div>

        </div>

        {/* ================= DESKTOP / TABLET ================= */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 items-center gap-0">

          {/* 🌍 LEFT — VIDEO */}
          <div className="flex justify-center items-center h-[600px] overflow-hidden">

            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="w-[1000px] max-w-none opacity-80 pointer-events-none"
            >
              <source src={globe} type="video/mp4" />
            </video>

          </div>

          {/* 🧠 RIGHT — DIAGRAM */}
          <div className="relative flex justify-start items-center h-[600px]">

            <div className="relative z-10 -ml-20">

              <div className="relative w-[600px] h-[650px] scale-[0.9] origin-center">
                <NetworkDiagram />
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default WhyChooseSection