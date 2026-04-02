import NetworkDiagram from "../../components/NetworkDiagram"

const WhyChooseSection = () => {
  return (
    <section className="w-full bg-black text-white py-32 px-6">

      <div className="max-w-full px-6">

        {/* Heading */}
        <div className="mb-12">
          <p className="text-gray-400 text-sm mb-3">
            / Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold font-heading tracking-tight leading-tight max-w-4xl">
            More than services —
            <span className="text-blue-500"> we create success stories.</span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-xl text-sm leading-relaxed">
            We deliver digital solutions and practical training that drive real
            growth for businesses and future-ready skills for professionals.
          </p>
        </div>

        {/* Layout */}
<div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-0">

  {/* 🌍 LEFT SIDE — GLOBE */}
  <div className="relative flex justify-center items-center h-[600px] overflow-hidden">

    <video
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className="
        w-[1000px]
        max-w-none
        opacity-80
        pointer-events-none
        
      "
    >
      <source src="/public/globe.mp4" type="video/mp4" />
    </video>

  </div>

  {/* 🧠 RIGHT SIDE — DIAGRAM */}
  <div className="relative flex justify-start items-center h-[600px]">

    {/* slight overlap */}
    <div className="relative z-10 -ml-20">

  {/* ✅ FIXED CANVAS FOR DIAGRAM */}
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