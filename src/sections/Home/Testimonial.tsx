

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sreekutty from "../../assets/sreekutty.webp";
import Akshay from "../../assets/Akshay-ui.webp"
import Hr from "../../assets/anoop.webp";
import Cinda from "../../assets/cinda.webp"
import Anurag from "../../assets/member1.webp"
import { ChevronLeft, ChevronRight } from "lucide-react";
import staricon from "../../assets/carbon_star-review.svg"


const testimonials = [
  {
    id: 1,
    name: "Sreekutty PJ",
    role: "Operation Head",
    text: "Working here has been an incredible journey. The team is supportive, and every day brings new learning opportunities.",
    image: Sreekutty,
    imgStyle: {
    scale: 1.2,
    objectPosition: "top", // 🔥 useful for faces
  }
  },
  {
    id: 2,
    name: "Akshay Aravind",
    role: "UI/UX Designer",
    text: "Designing here has been inspiring. The team values creativity and innovation at every step.Working here has been an incredible journey",
    image: Akshay ,
    imgStyle: {
    scale: 1.2,
    objectPosition: "top", // 🔥 useful for faces
  }
  },
  {
    id: 3,
    name: "Anoop ",
    role: "Python Developer",
    text: "Building reliable backend systems here has been a rewarding experience.The team focuses on scalability, performance, and clean architecture.. I’ve learned more here than anywhere else.",
    image: Hr,
     imgStyle: {
    scale: 1,
    objectPosition: "top", // 🔥 useful for faces
  }
  },
  {
    id: 4,
    name: "Cinda Sibichan",
    role: "Python Developer",
    text: "Every project challenges me and improves my skills.Developing secure and scalable backend services has been a great journey here.The collaborative environment helps me grow and improve every day.",
    image: Cinda,
  },
  {
    id: 5,
    name: "Anurag Sivadasan",
    role: "React Developer",
    text: "Building scalable interfaces here has been a great experience.The focus on performance and clean architecture pushes me to grow every day.",
    image: Anurag,
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(1);
  const [direction, setDirection] = useState(0);

  const next = () => {
  setDirection(1); // moving right
  setActive((prev) => (prev + 1) % testimonials.length);
};

const prev = () => {
  setDirection(-1); // moving left
  setActive((prev) =>
    prev === 0 ? testimonials.length - 1 : prev - 1
  );
};

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      next();
    }
    if (e.key === "ArrowLeft") {
      prev();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);


  return (
    <section className="bg-black text-white w-full py-16 px-4 sm:px-8 lg:px-20 overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-xl sm:text-xl md:text-[26px] xl:text-[34px] 2xl:text-[40px] font-bold bg-gradient-to-r from-[#70A9FF] to-[#345D99] bg-clip-text text-transparent mb-4 pb-3">
          Our Team Speaks
        </h2>
        <p className="text-white mt-4 text-[14px] font-outfit sm:text-[14px] md:text-[16px] xl:text-[20px]  2xl:text-[22px] leading-8 font-[200]">
          We build simple, smart tech solutions that help businesses grow and keep things moving. From idea to launch, we turn concepts into easy-to-use digital products using modern tech, creative thinking, and a practical, hands-on approach that just works.
        </p> 
      </div>

      {/* CAROUSEL */}
      <div className="relative w-full max-w-[1400px] mx-auto">

        <div className="relative h-[320px] sm:h-[360px] lg:h-[400px] flex items-center justify-center">

          {testimonials.map((item, index) => {
           const total = testimonials.length;

let position = index - active;

if (position < -total / 2) position += total;
if (position > total / 2) position -= total;
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
  className="absolute will-change-transform"
  initial={{
    x: direction > 0 ? "40%" : "-40%", // 🔥 reduced distance
    opacity: 0,
    scale: 0.92,
  }}
  animate={{
    x,
    scale,
    opacity,
    zIndex,
    rotateY: isActive ? 0 : position < 0 ? 8 : -8, // 🔥 reduced tilt
  }}
  transition={{
    x: { type: "spring", stiffness: 180, damping: 20 },
    scale: { type: "spring", stiffness: 180, damping: 20 },

    // ⚡ instant feel properties
    opacity: { duration: 0.25, ease: "easeOut" },
    rotateY: { duration: 0.3, ease: "easeOut" },
  }}
  style={{
    transformStyle: "preserve-3d",
    perspective: 1000,
  }}
>


 <div className="
  relative
  w-full
  max-w-[clamp(280px,50vw,700px)]
  h-[clamp(200px,22vw,260px)]
  rounded-2xl
  border border-white/10
  overflow-hidden
  flex items-center justify-between
  p-5 sm:p-6

  bg-gradient-to-br from-white/10 via-white/5 to-transparent
  backdrop-blur-lg

  shadow-[0_10px_40px_rgba(0,0,0,0.6)]
">

  {/* ✨ subtle top light */}
  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />

  {/* ✨ active glow */}
  {isActive && (
    <div className="absolute inset-0 rounded-2xl border border-[#70A9FF]/40 shadow-[0_0_40px_rgba(112,169,255,0.25)] pointer-events-none" />
  )}

  {/* LABEL */}
  <div className="absolute flex items-center gap-2 top-3 left-5 text-[10px] md:text-[11px] xl:text-[12px] 2xl:text-[14px] text-white uppercase tracking-wider">
    <img src={staricon} alt="" />
    Life of Slams
  </div>

  {/* TEXT */}
  <div className="flex-1 pr-4 mt-20 z-10">
    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
      {item.text}
    </p>

    <div className="mt-5">
      <p className="text-white text-sm sm:text-base font-semibold">
        {item.name}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        {item.role}
      </p>
    </div>
  </div>

  {/* IMAGE */}
  <div className="relative w-[120px] sm:w-[180px] lg:w-[220px] h-full rounded-xl overflow-hidden">
    
    {/* image */}
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover"
    style={{
    transform: `scale(${item.imgStyle?.scale || 1})`,
    objectPosition: item.imgStyle?.objectPosition || "center",}}
    />

    {/* ✨ image fade overlay */}
    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
  </div>

</div>
              </motion.div>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-4 mt-2 relative z-50">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronLeft/>
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronRight />
          </button>
        </div>

      </div>
    </section>
  );
}