import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sreekutty from "../../assets/sreekutty.webp";
import Ashvin from "../../assets/member3.webp";
import Akshay from "../../assets/Akshay-ui.webp";
import Hr from "../../assets/anoop.webp";
import Cinda from "../../assets/member6.webp";
import Anugrah from "../../assets/member1.webp";
import Athulya from "../../assets/member5.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import staricon from "../../assets/carbon_star-review.svg";

const testimonials = [
  {
    id: 1,
    name: "Sreekutty PJ",
    role: "Operation Head",
    text: "Working here is a great journey with a supportive team and constant learning.",
    image: Sreekutty,
    imgStyle: { scale: 1.2, objectPosition: "top" }
  },
  {
    id: 7,
    name: "Ashvin",
    role: "AI/ML Developer",
    text: "Building AI solutions here is exciting with real-world impact and continuous growth.",
    image: Ashvin,
    imgStyle: { scale: 1.2, objectPosition: "top" }
  },
  {
    id: 2,
    name: "Akshay Aravind",
    role: "UI/UX Designer",
    text: "Designing here is inspiring. The team values creativity and innovation at every step.",
    image: Akshay,
    imgStyle: { scale: 1.2, objectPosition: "top" }
  },
  {
    id: 3,
    name: "Anoop ",
    role: "Python Developer",
    text: "Building backend systems here is rewarding with a focus on performance and scalability.",
    image: Hr,
    imgStyle: { scale: 1, objectPosition: "top" }
  },
  {
    id: 4,
    name: "Cinda Sibichan",
    role: "Python Developer",
    text: "Every project improves my skills in a collaborative and growth-focused environment.",
    image: Cinda,
  },
  {
    id: 5,
    name: "Anugrah Sivadasan",
    role: "React Developer",
    text: "Building scalable interfaces here is a great experience with focus on performance.",
    image: Anugrah,
  },
  {
    id: 6,
    name: "Athulya",
    role: "UI/UX Designer",
    text: "Working here enhances my creativity and design thinking through meaningful projects.",
    image: Athulya,
    imgStyle: { scale: 1.2, objectPosition: "top" }
  },
];
export default function Testimonial() {
  const [active, setActive] = useState(1);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="bg-black text-white w-full py-16 px-4 sm:px-8 lg:px-20 overflow-hidden">

      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="pt-5 font-extrabold font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight bg-gradient-to-r from-[#70A9FF] to-[#345D99] bg-clip-text text-transparent">
          Our Team Speaks
        </h1>
        <p className="text-white mt-4 text-[14px] sm:text-[14px] md:text-[16px] xl:text-[20px] 2xl:text-[22px] leading-8 font-[200]">
          We build simple, smart tech solutions that help businesses grow and keep things moving.
        </p>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto">

        <div className="relative h-[320px] sm:h-[360px] lg:h-[400px] flex items-center justify-center">

          {testimonials.map((item, index) => {
            const total = testimonials.length;

            let position = index - active;
            if (position < -total / 2) position += total;
            if (position > total / 2) position -= total;

            const isActive = position === 0;

            let x = 0, scale = 1, opacity = 1, zIndex = 10;

            if (position === 0) {
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
              scale = 0.7;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <motion.div
                key={item.id}
                className="absolute will-change-transform transform-gpu"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) next();
                  if (info.offset.x > 50) prev();
                }}
                initial={{ x: direction > 0 ? "40%" : "-40%", opacity: 0, scale: 0.92 }}
                animate={{ x, scale, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                style={{ transform: "translateZ(0)" }}
              >

           <div className="
  relative w-full
  max-w-[clamp(280px,50vw,700px)]
  h-[220px] sm:h-[clamp(200px,22vw,260px)]   /* ✅ FIXED HEIGHT ON MOBILE */
  rounded-2xl border border-white/10 overflow-hidden
  flex flex-col sm:flex-row items-center justify-between
  p-3 sm:p-5 md:p-6
">

  {/* BASE */}
  <div className="absolute inset-0 bg-black/90 pointer-events-none" />
  <div className="absolute inset-0 backdrop-blur-md pointer-events-none" />
  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />

  {/* CONTENT */}
  <div className="relative z-10 flex flex-col sm:flex-row items-center w-full h-full">

    {/* IMAGE */}
    <div className="
      relative
      w-[clamp(70px,20vw,220px)]
      h-[80px] sm:h-full        /* ✅ FIX IMAGE HEIGHT ON MOBILE */
      rounded-xl overflow-hidden flex-shrink-0
    ">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
        style={{
          transform: `scale(${item.imgStyle?.scale || 1})`,
          objectPosition: item.imgStyle?.objectPosition || "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
    </div>

    {/* TEXT */}
     <div className="">
     <div className="
      absolute flex items-center top-0 pl-4 gap-1 sm:gap-2 
      text-[7px] sm:text-[9px] md:text-[11px]
      text-white uppercase tracking-wider
    ">
      <img src={staricon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
      Life of Slams
    </div>
    <div className="flex-1 text-center sm:text-left mt-2  pl-4">
     

      <p className="
        text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px]
        text-gray-300
        leading-[1.4] sm:leading-[1.5] md:leading-relaxed
        line-clamp-3 sm:line-clamp-none
      ">
        {item.text}
      </p>

      <div className="mt-2 sm:mt-3">
        <p className="
          text-white 
          text-[11px] sm:text-xs md:text-sm lg:text-base
          font-semibold
        ">
          {item.name}
        </p>

        <p className="
          text-gray-500 
          text-[10px] sm:text-[10px] md:text-xs lg:text-sm
          mt-1
        ">
          {item.role}
        </p>
      </div>
    </div>
    </div>

  </div>
</div>
              </motion.div>
            );
          })}
        </div>

       <div className="hidden md:flex justify-center gap-4 mt-2">
  <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10">
    <ChevronLeft />
  </button>
  <button onClick={next} className="w-10 h-10 rounded-full bg-white/10">
    <ChevronRight />
  </button>
</div>
      </div>
    </section>
  );
}