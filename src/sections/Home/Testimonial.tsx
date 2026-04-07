

import { useState } from "react";
import { motion } from "framer-motion";
import Sreekutty from "../../assets/Sreekutti.webp";
import Anoop from "../../assets/Anoop.webp";
import Hr from "../../assets/HR.webp";
import Cinda from "../../assets/Cinda.webp";

const testimonials = [
  {
    id: 1,
    name: "Sreekutty PJ",
    role: "Operation Head",
    text: "Working here has been an incredible journey. The team is supportive, and every day brings new learning opportunities.",
    image: Sreekutty,
  },
  {
    id: 2,
    name: "Anoop",
    role: "Backend Developer",
    text: "Every project challenges me and improves my skills. It's the perfect place for growth.",
    image: Anoop,
  },
  {
    id: 3,
    name: "Rahul",
    role: "Frontend Developer",
    text: "Amazing culture and strong mentorship. I’ve learned more here than anywhere else.",
    image: Hr,
  },
  {
    id: 4,
    name: "Cinda",
    role: "UI/UX Designer",
    text: "Designing here has been inspiring. The team values creativity and innovation at every step.",
    image: Cinda,
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(1);

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-black text-white w-full py-16 px-4 sm:px-8 lg:px-20 overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#70A9FF] to-[#345D99] bg-clip-text text-transparent">
          Our Team Speaks
        </h2>
        <p className="text-gray-400 mt-4 text-[18px] sm:text-base  leading-relaxed">
          We build simple, smart tech solutions that help businesses grow and keep things moving. From idea to launch, we turn concepts into easy-to-use digital products using modern tech, creative thinking, and a practical, hands-on approach that just works.
        </p> 
      </div>

      {/* CAROUSEL */}
      <div className="relative w-full max-w-[1400px] mx-auto">

        <div className="relative h-[320px] sm:h-[360px] lg:h-[400px] flex items-center justify-center">

          {testimonials.map((item, index) => {
            const position = index - active;
            const isActive = position === 0;

            let x = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;

            if (position === 0) {
              x = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (position === -1 || position === testimonials.length - 1) {
              x = "-50%";
              scale = 0.85;
              opacity = 0.5;
              zIndex = 20;
            } else if (position === 1 || position === -(testimonials.length - 1)) {
              x = "50%";
              scale = 0.85;
              opacity = 0.5;
              zIndex = 20;
            } else {
              x = 0;
              scale = 0.7;
              opacity = 0;
              zIndex = 0;
            }

            return (
            <motion.div
  key={item.id}
  className="absolute"
  animate={{
    x,
    scale,
    opacity,
    zIndex,
    rotateY: position === 0 ? 0 : position > 0 ? -8 : 8,
  }}
  transition={{
    type: "spring",
    stiffness: 220,
    damping: 20,
    mass: 0.6,
  }}
  style={{
    transformPerspective: 1000,
  }}
>
  <div
  className={`
    relative
    w-full
    max-w-[clamp(280px,50vw,700px)]
    h-[clamp(200px,22vw,260px)]
    rounded-2xl
    border border-white/10
    flex items-center justify-between
    p-5 sm:p-6
    overflow-hidden

    transition-all duration-200 ease-out

    ${isActive 
      ? "bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(112,169,255,0.25)]" 
      : "bg-white/5 backdrop-blur-sm opacity-60"
    }
  `}
>

                  {/* ✨ LIGHT SWEEP EFFECT
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      style={{
                        background:
                          "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                      }}
                    />
                  )} */}

                  {/* LABEL */}
                  <div className="absolute top-3 left-5 text-[10px] sm:text-xs text-blue-300 uppercase tracking-wider">
                    Life of Slams
                  </div>

                  

                  {/* TEXT */}
                  <div className="flex-1 pr-4 mt-6">
                    <p className="text-[18px] sm:text-md font-outfit text-gray-300 leading-relaxed">
                      {item.text}
                    </p>

                    <div className="mt-5">
                      <p className="text-white text-md font-outfit  font-bold">
                        {item.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="w-[120px] sm:w-[180px] lg:w-[220px] h-full rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}