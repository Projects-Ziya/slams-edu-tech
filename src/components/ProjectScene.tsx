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
  orange: "linear-gradient(135deg, rgba(249,115,22,0.3) 0%, transparent 80%)",
  violet: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, transparent 80%)",
  cyan: "linear-gradient(135deg, rgba(6,182,212,0.3) 0%, transparent 80%)",
  emerald: "linear-gradient(135deg, rgba(16,185,129,0.3) 0%, transparent 80%)",
  default: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 80%)",
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
  const img2X = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const img2Rotate = useTransform(scrollYProgress, [0, 1], [0, -15]);

  // Right Card
  const img3X = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const img3Y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const img3Rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-[200vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: gradientMap[gradientColor] }}
      />

      <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1536px] w-full px-4 sm:px-6 lg:px-8 2xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-20 2xl:gap-40 lg:items-center">
        
        {/* TEXT CONTENT 1: Title (Always rendered, only shows title on mobile, both on desktop) */}
        <div className={`flex flex-col justify-center order-1 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold text-[#70A9FF] uppercase tracking-[0.2em]"
          >
            Project {index + 1}
          </motion.span>
          
          {/* Animated Heading sliding in from bottom */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 lg:mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {title}
          </motion.h2>
          
          {/* DESKTOP ONLY: Description & Link */}
          <div className="hidden lg:block mt-6">
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
            className="hidden lg:block mt-8"
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

        {/* IMAGE CONTENT */}
        <div className={`relative w-full py-4 lg:py-0 lg:aspect-[4/3] flex items-center justify-center order-2 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          
          {/* Main Image (Center Card) */}
          <motion.div
            style={isMobile ? {} : { y: img1Y, transformOrigin: "bottom center" }}
            className="relative lg:absolute z-30 w-[65%] sm:w-[50%] lg:w-[55%] aspect-[3/4] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden border border-white/10"
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
            className="hidden lg:block absolute z-20 w-[55%] sm:w-[50%] aspect-[3/4] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden border border-white/10"
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
            className="hidden lg:block absolute z-10 w-[55%] sm:w-[50%] aspect-[3/4] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden border border-white/10"
          >
            <img
              src={images[2]}
              alt={`${title} Tertiary`}
              className="w-full h-full object-cover bg-[#111]"
            />
          </motion.div>
        </div>

        {/* MOBILE ONLY: Description Content */}
        <div className={`flex flex-col justify-center order-3 lg:hidden`}>
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