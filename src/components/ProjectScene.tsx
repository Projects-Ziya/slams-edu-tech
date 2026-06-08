import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollTextReveal from "./ScrollTextReveal";

interface ProjectSceneProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  gradientColor: "orange" | "violet" | "cyan" | "emerald" | "default";
  index: number;
}

const gradientMap: Record<ProjectSceneProps["gradientColor"], string> = {
  orange: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
  violet: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
  cyan: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
  emerald: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
  default: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
};

const ProjectScene = ({
  id,
  title,
  description,
  images,
  gradientColor,
  index,
}: ProjectSceneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Map progress to the text reveal
  // Give it a bit of padding at start and end
  const textProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  // Image animations (Rummy Cards Holding Style)
  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -20]);
  
  // Left Card
  const img2X = useTransform(scrollYProgress, [0, 1], ["0vw", "-8.5vw"]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const img2Rotate = useTransform(scrollYProgress, [0, 1], [0, -15]);

  // Right Card
  const img3X = useTransform(scrollYProgress, [0, 1], ["0vw", "8.5vw"]);
  const img3Y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const img3Rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      className="relative z-10 w-full h-[200vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-black">

      <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1780px] w-full px-4 sm:px-6 lg:px-8 2xl:px-20 3xl:px-28 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-20 2xl:gap-40 3xl:gap-56 lg:items-center">
        
        {/* TEXT CONTENT 1: Title (Always rendered, only shows title on mobile, both on desktop) */}
        <div className={`relative flex flex-col justify-center items-start text-left order-1 w-full lg:max-w-md 2xl:max-w-lg 3xl:max-w-2xl ${isEven ? "lg:order-1 lg:ml-auto lg:mr-16 2xl:mr-32 3xl:mr-44 lg:text-right lg:items-end" : "lg:order-2 lg:mr-auto lg:ml-16 2xl:ml-32 3xl:ml-44 lg:items-start"}`}>
          {/* Subtle Background Gradient behind text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] sm:w-[200%] lg:w-[150%] aspect-square pointer-events-none z-[-1]"
            style={{ background: gradientMap[gradientColor] }}
          />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="text-sm 3xl:text-base font-semibold text-[#70A9FF] uppercase tracking-[0.2em]"
          >
            Project {index + 1}
          </motion.span>
          
          {/* Animated Heading sliding in from bottom */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 lg:mt-4 3xl:mt-6 text-4xl sm:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold text-white leading-tight"
          >
            {title}
          </motion.h2>
          
          {/* DESKTOP ONLY: Description & Link */}
          <div className="hidden lg:block mt-6 3xl:mt-8">
            <ScrollTextReveal
              text={description}
              progress={textProgress}
              className="text-lg 3xl:text-xl 4xl:text-2xl text-white font-medium leading-relaxed"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block mt-8 3xl:mt-12"
          >
            <Link
              to={`/project/${id}`}
              className="inline-flex items-center gap-2 text-white border-b-2 border-[#70A9FF] pb-1 3xl:pb-2 text-base 3xl:text-xl hover:text-[#70A9FF] transition-colors"
            >
              View Project
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* IMAGE CONTENT */}
        <div className={`relative w-full py-4 lg:py-0 lg:aspect-[4/3] flex items-center justify-center order-2 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          
          {/* Main Image (Center Card) */}
          <motion.div
            style={isMobile ? {} : { y: img1Y, transformOrigin: "bottom center" }}
            className="relative lg:absolute z-30 w-[65%] sm:w-[50%] lg:w-[55%] 3xl:w-[60%] aspect-[3/4] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden border border-white/10"
          >
            <img
              src={images[0]}
              alt={`${title} Main`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Secondary Image (Left Card) - HIDDEN ON MOBILE */}
          <motion.div
            style={isMobile ? {} : { x: img2X, y: img2Y, rotate: img2Rotate, transformOrigin: "bottom center" }}
            className="hidden lg:block absolute z-20 w-[55%] sm:w-[50%] 3xl:w-[58%] aspect-[3/4] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden border border-white/10"
          >
            <img
              src={images[1]}
              alt={`${title} Secondary`}
              className="w-full h-full object-cover bg-[#111]"
            />
          </motion.div>

          {/* Tertiary Image (Right Card) - HIDDEN ON MOBILE */}
          <motion.div
            style={isMobile ? {} : { x: img3X, y: img3Y, rotate: img3Rotate, transformOrigin: "bottom center" }}
            className="hidden lg:block absolute z-10 w-[55%] sm:w-[50%] 3xl:w-[58%] aspect-[3/4] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden border border-white/10"
          >
            <img
              src={images[2]}
              alt={`${title} Tertiary`}
              className="w-full h-full object-cover bg-[#111]"
            />
          </motion.div>
        </div>

        {/* MOBILE ONLY: Description Content */}
        <div className={`relative flex flex-col justify-center order-3 lg:hidden`}>
          {/* Subtle Background Gradient behind text (Mobile) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] aspect-square pointer-events-none z-[-1]"
            style={{ background: gradientMap[gradientColor] }}
          />
          <div className="mt-2">
            <ScrollTextReveal
              text={description}
              progress={textProgress}
              className="text-lg text-white font-medium max-w-md leading-relaxed"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6"
          >
            <Link
              to={`/project/${id}`}
              className="inline-flex items-center gap-2 text-white border-b-2 border-[#70A9FF] pb-1 hover:text-[#70A9FF] transition-colors"
            >
              View Project
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

      </div>
      </div>
    </motion.section>
  );
};

export default ProjectScene;