import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Sreekutty from "../../assets/sreekutty.webp";
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
    text: "Working here has been an incredible journey. The team is supportive, and every day brings new learning opportunities.",
    image: Sreekutty,
    imgStyle: { scale: 1.2, objectPosition: "top" },
  },
  {
    id: 2,
    name: "Akshay Aravind",
    role: "UI/UX Designer",
    text: "Designing here has been inspiring. The team values creativity and innovation at every step.",
    image: Akshay,
    imgStyle: { scale: 1.2, objectPosition: "top" },
  },
  {
    id: 3,
    name: "Anoop",
    role: "Python Developer",
    text: "Building reliable backend systems here has been a rewarding experience. The team focuses on scalability, performance, and clean architecture.",
    image: Hr,
    imgStyle: { scale: 1, objectPosition: "top" },
  },
  {
    id: 4,
    name: "Cinda Sibichan",
    role: "Python Developer",
    text: "Every project challenges me and improves my skills. The collaborative environment helps me grow and improve every day.",
    image: Cinda,
  },
  {
    id: 5,
    name: "Anugrah Sivadasan",
    role: "React Developer",
    text: "Building scalable interfaces here has been a great experience. The focus on performance pushes me to grow every day.",
    image: Anugrah,
  },
  {
    id: 6,
    name: "Athulya",
    role: "UI/UX Designer",
    text: "Working here has strengthened my design thinking and creativity. Every project is an opportunity to craft meaningful experiences.",
    image: Athulya,
    imgStyle: { scale: 1.2, objectPosition: "top" },
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(1);
  const [direction, setDirection] = useState(0);

  // Touch swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-slide — reduced to 3.5s for snappier feel
  useEffect(() => {
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Horizontal mouse-wheel scroll (trackpad swipe on desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 50) next();
        if (e.deltaX < -50) prev();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="bg-black text-white w-full py-16 px-4 sm:px-8 lg:px-20 overflow-hidden">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-xl sm:text-xl md:text-[26px] xl:text-[34px] 2xl:text-[40px] font-bold bg-gradient-to-r from-[#70A9FF] to-[#345D99] bg-clip-text text-transparent mb-4 pb-3">
          Our Team Speaks
        </h2>
        <p className="text-white mt-4 text-[14px] sm:text-[14px] md:text-[16px] xl:text-[20px] 2xl:text-[22px] leading-8 font-[200]">
          We build simple, smart tech solutions that help businesses grow and keep things moving. From idea to launch, we turn concepts into easy-to-use digital products using modern tech, creative thinking, and a practical, hands-on approach that just works.
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative w-full max-w-[1600px] mx-auto">

        <div className="relative
          min-h-[340px]
          sm:h-[360px]
          md:h-[300px]
          lg:h-[380px]
          2xl:h-[440px]
          flex items-center justify-center
        ">
          {testimonials.map((item, index) => {
            const total = testimonials.length;
            let position = index - active;
            if (position < -total / 2) position += total;
            if (position > total / 2) position -= total;
            const isActive = position === 0;

            const w = typeof window !== "undefined" ? window.innerWidth : 1024;
            const sideX =
              w < 640  ? "0%"  :
              w < 1024 ? "54%" :
              w < 1536 ? "52%" : "50%";
            const hideSideOnMobile = w < 640;

            let x: string | number = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;

            if (position === 0) {
              x = 0; scale = 1; opacity = 1; zIndex = 30;
            } else if (position === -1 || position === total - 1) {
              x = `-${sideX}`;
              scale = w < 640 ? 0.7 : w < 1024 ? 0.82 : 0.85;
              opacity = hideSideOnMobile ? 0 : 0.5;
              zIndex = 20;
            } else if (position === 1 || position === -(total - 1)) {
              x = sideX;
              scale = w < 640 ? 0.7 : w < 1024 ? 0.82 : 0.85;
              opacity = hideSideOnMobile ? 0 : 0.5;
              zIndex = 20;
            } else {
              x = 0; scale = 0.7; opacity = 0; zIndex = 0;
            }

            return (
              <motion.div
                key={item.id}
                className="absolute will-change-transform"

                // ── Touch swipe (mobile) ──
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                  touchStartY.current = e.touches[0].clientY;
                }}
                onTouchEnd={(e) => {
                  const diffX = touchStartX.current - e.changedTouches[0].clientX;
                  const diffY = touchStartY.current - e.changedTouches[0].clientY;
                  // Only trigger if horizontal swipe is dominant (avoids scroll conflicts)
                  if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX > 40) next();
                    if (diffX < -40) prev();
                  }
                }}

                // ── Framer drag (optional fallback for pointer devices) ──
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) next();
                  if (info.offset.x > 50) prev();
                }}

                initial={{
                  x: direction > 0 ? "35%" : "-35%",
                  opacity: 0,
                  scale: 0.94,
                }}
                animate={{
                  x,
                  scale,
                  opacity,
                  zIndex,
                  rotateY: isActive ? 0 : position < 0 ? 8 : -8,
                }}
                transition={{
                  // Snappier spring: higher stiffness, lower damping = faster settle
                  x:       { type: "spring", stiffness: 260, damping: 24 },
                  scale:   { type: "spring", stiffness: 260, damping: 24 },
                  // Faster fade — cards appear/disappear quickly
                  opacity: { duration: 0.18, ease: "easeOut" },
                  rotateY: { duration: 0.22, ease: "easeOut" },
                }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              >
                <div
                  className="
                    relative rounded-2xl overflow-hidden
                    bg-gradient-to-br from-white/10 via-white/5 to-transparent
                    backdrop-blur-lg
                    shadow-[0_10px_40px_rgba(0,0,0,0.6)]

                    flex flex-col
                    w-[260px] p-4

                    sm:flex-row sm:items-center sm:justify-between
                    sm:w-[380px] sm:h-[220px] sm:p-5
                    md:w-[480px] md:h-[240px] md:p-5
                    lg:w-[580px] lg:h-[250px] lg:p-6
                    xl:w-[640px] xl:h-[260px]
                    2xl:w-[720px] 2xl:h-[300px]
                  "
                  style={{
                    border: isActive
                      ? "1px solid rgba(112,169,255,0.6)"
                      : "1px solid rgba(255,255,255,0.1)",
                    transition: "border 0.35s ease, box-shadow 0.35s ease",
                    boxShadow: isActive
                      ? "0 0 40px rgba(112,169,255,0.15), 0 10px 40px rgba(0,0,0,0.6)"
                      : "0 10px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* subtle top light */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />

                  {/* active glow overlay */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(112,169,255,0.08)] pointer-events-none" />
                  )}

                  {/* LABEL */}
                  <div className="absolute flex items-center gap-2 top-3 left-4 text-[9px] sm:text-[10px] md:text-[11px] xl:text-[12px] 2xl:text-[13px] text-white uppercase tracking-wider z-10">
                    <img src={staricon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                    Life of Slams
                  </div>

                  {/* IMAGE */}
                  <div className="
                    relative overflow-hidden rounded-xl flex-shrink-0
                    mx-auto mt-7 mb-3
                    w-[90px] h-[90px]
                    sm:mx-0 sm:mt-0 sm:mb-0
                    sm:w-[110px] sm:h-full sm:order-last
                    md:w-[140px]
                    lg:w-[180px]
                    xl:w-[200px]
                    2xl:w-[230px]
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
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/40 hidden sm:block" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 sm:hidden" />
                  </div>

                  {/* TEXT */}
                  <div className="
                    flex-1 z-10 text-center
                    sm:text-left sm:pr-3 sm:mt-8
                    md:pr-4 md:mt-10
                  ">
                    <p className="
                      text-gray-300 leading-relaxed
                      text-[11px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base
                    ">
                      {item.text}
                    </p>
                    <div className="mt-2 sm:mt-4 lg:mt-5">
                      <p className="text-white font-semibold text-xs sm:text-sm lg:text-sm xl:text-base 2xl:text-base">
                        {item.name}
                      </p>
                      <p className="text-gray-500 mt-0.5 text-[10px] sm:text-xs 2xl:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CONTROLS — hidden on mobile, visible sm+ */}
        <div className="hidden sm:flex justify-center gap-4 mt-2 relative z-50">
          <button
            onClick={prev}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={next}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* MOBILE ONLY — swipe hint dots */}
        <div className="flex sm:hidden justify-center gap-1.5 mt-4">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === active ? "18px" : "5px",
                height: "5px",
                background: i === active
                  ? "rgba(112,169,255,0.9)"
                  : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}