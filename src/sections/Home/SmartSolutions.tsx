import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const floatingPoints = [
  "left-[8%] top-[22%]",
  "left-[22%] bottom-[16%]",
  "right-[28%] top-[18%]",
  "right-[10%] bottom-[24%]",
];

const SmartSolutions = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black py-6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative w-full overflow-hidden border-y border-blue-400/30 bg-[#020816] px-4 py-8 shadow-[0_0_60px_rgba(59,130,246,0.16)] sm:px-8 md:py-10 lg:px-14"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.24),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(59,130,246,0.22),transparent_32%),linear-gradient(120deg,#020816_0%,#06204b_48%,#03112b_100%)]" />

        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["0%", "430%"] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        {floatingPoints.map((position, index) => (
          <motion.span
            key={position}
            aria-hidden="true"
            className={`absolute ${position} h-2 w-2 bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.9)]`}
            animate={{
              opacity: [0.25, 1, 0.25],
              scale: [0.85, 1.35, 0.85],
              y: [0, index % 2 === 0 ? -10 : 10, 0],
            }}
            transition={{
              duration: 3.2 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <motion.div
            className="inline-flex items-center gap-3 border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] text-blue-100"
            animate={{
              borderColor: [
                "rgba(59,130,246,0.3)",
                "rgba(96,165,250,0.75)",
                "rgba(59,130,246,0.3)",
              ],
            }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-4 w-4 text-blue-400" />
            Building future-ready teams
          </motion.div>

          <h2
            className="font-bold font-outfit text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight tracking-tight text-white"
          >
            Building smart digital solutions and skilled professionals.
          </h2>
        </div>
      </motion.div>
    </section>
  );
};

export default SmartSolutions;