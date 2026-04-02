import { motion } from "framer-motion";
import logo from "../assets/logo.webp"

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="text-center">
        
        {/* Company Name Animation */}
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-white tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* SLAMS EDUTECH */}
          <img src={logo} alt="" />
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          className="h-[3px] mt-3 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Dots Loader */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 rounded-full bg-cyan-400"
              animate={{
                y: ["0%", "-50%", "0%"],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-400 mt-4">
          Building Future Tech...
        </p>
      </div>
    </div>
  );
};

export default Loader;