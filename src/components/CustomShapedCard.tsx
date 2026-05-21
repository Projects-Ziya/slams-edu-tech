// src/components/CustomShapedCard.tsx

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type CustomShapeCardProps = {
  image: string;
  title: string;
  text: string;
  buttonLink?: string;
};

export default function CustomShapeCard({
  image,
  title,
  text,
  buttonLink = "#",
}: CustomShapeCardProps) {
  const clipId = `cardClip-${title.replace(/\s+/g, "")}`;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const MotionLink = motion(Link);

  // Mouse tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 300, damping: 20 };

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  const translateY = useSpring(0, springConfig);

  // Convert to percentage
  const mouseXPercent = useTransform(mouseX, (v) => `${v * 100}%`);
  const mouseYPercent = useTransform(mouseY, (v) => `${v * 100}%`);

  // ✅ FIXED spotlight gradient (Motion-safe)
  const spotlight = useMotionTemplate`
    radial-gradient(circle at ${mouseXPercent} ${mouseYPercent}, rgba(59,130,246,0.25), transparent 70%)
  `;

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  // Hover animations
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);

    rotateX.set((y - 0.5) * -15);
    rotateY.set((x - 0.5) * 15);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
    translateY.set(-8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    translateY.set(0);
  };

  const transform = useMotionTemplate`
    perspective(800px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(${translateY}px)
    scale(${scale})
  `;

  return (
    <MotionLink
      ref={cardRef}
      to={buttonLink}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="block w-full max-w-[390px] mx-auto relative group"
      style={{ transform, willChange: "transform" }}
    >
      {/* ✅ FIXED Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-40"
        // style={{ background: spotlight }}
      />

      {/* Shimmer */}
      {/* <motion.div
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100"
        animate={
          isHovered
            ? {
                backgroundPosition: ["200% 0", "-200% 0"],
              }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          mixBlendMode: "overlay",
        }}
      /> */}

      <div className="w-full aspect-[390/396] relative">
        <svg viewBox="0 0 390 396" className="w-full h-full">
          <defs>
            <clipPath id={clipId}>
              <path d="M30 0 H360 Q390 0 390 30 V366 Q390 396 360 396 H207 Q195 396 185 385 L160 350 Q150 340 135 340 H30 Q0 340 0 310 V30 Q0 0 30 0 Z" />
            </clipPath>

            <linearGradient id={`overlay-${clipId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
            </linearGradient>
          </defs>

          <g clipPath={`url(#${clipId})`}>
            <motion.g style={{ y: imageParallaxY }}>
              <image
                href={image}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                className="transition duration-700 scale-105 group-hover:scale-100"
              />
              <rect width="100%" height="100%" fill={`url(#overlay-${clipId})`} />
            </motion.g>
          </g>

          <path
            d="M30 0 H360 Q390 0 390 30 V366 Q390 396 360 396 H207 Q195 396 185 385 L160 350 Q150 340 135 340 H30 Q0 340 0 310 V30 Q0 0 30 0 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>

        {/* Text */}
        <div className="absolute bottom-[18%] left-[5%] right-[5%] z-20">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <p className="text-white/80 text-sm line-clamp-2">{text}</p>
        </div>

        {/* Button */}
        <motion.button
          className="absolute bottom-[5%] right-[5%] z-20 rounded-full bg-white text-blue-600 p-3 group-hover:bg-blue-400"
          // whileHover={{ scale: 1.15 }}
        >
          <ArrowUpRight className="group-hover:rotate-45 group-hover:text-white transition" />
        </motion.button>
      </div>
    </MotionLink>
  );
}