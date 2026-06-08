import NetworkDiagram from "../../components/NetworkDiagram"
import globe from "../../assets/globe.mp4"
import { motion } from "framer-motion"

const WhyChooseSection = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const headingVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045 } }
  };

  const headingWordVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };



  return (
<section className="w-full bg-black text-white py-2 md:py-20 px-4 md:px-10 mt-20">
      <div className="max-w-full">

        {/* Heading */}
        <motion.div 
          className="mb-12 flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={itemVariants} className="self-start text-left font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400 font-outfit tracking-wider uppercase">
            / Why Choose Us
          </motion.p>

          <motion.h1 variants={headingVariants} className="mt-8 md:mt-12 pt-4 font-bold font-outfit text-4xl md:text-5xl lg:text-8xl 2xl:text-8xl leading-tight tracking-tight text-white flex flex-col items-center">
            <span className="flex flex-wrap justify-center gap-x-[0.25em]">
              {["More", "than", "services", "—"].map((word, i) => (
                <motion.span key={`l1-${i}`} variants={headingWordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-[0.25em] mt-2">
              {["we  create success stories."].map((word, i) => (
                <motion.span key={`l2-${i}`} variants={headingWordVariants} className="inline-block pb-2 bg-[linear-gradient(90deg,_#579AFF_0%,_#345D99_100%)] bg-clip-text text-transparent">
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="pt-6 text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] font-outfit font-light leading-relaxed tracking-wide max-w-[900px]">
            We deliver digital solutions and practical training that drive real
            growth for businesses and future-ready skills for professionals.
          </motion.p>
        </motion.div>

        {/* ================= MOBILE VIEW ================= */}
        <motion.div 
          className="lg:hidden grid grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Custom Solutions</p>
            <p className="text-sm text-gray-400">
              Tailored software and digital solutions built for your business.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Expert Team</p>
            <p className="text-sm text-gray-400">
              Skilled developers and designers delivering quality work.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Proven Results</p>
            <p className="text-sm text-gray-400">
              Successful projects with measurable outcomes.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={itemVariants} className=" border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-lg font-semibold mb-1">Innovation Driven</p>
            <p className="text-sm text-gray-400">
              We use modern technologies to stay ahead of competition.
            </p>
          </motion.div>
        </motion.div>

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
