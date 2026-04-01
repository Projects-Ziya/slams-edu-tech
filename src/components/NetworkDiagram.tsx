import { motion } from "framer-motion";
import { useState } from "react";

const NetworkDiagram = () => {
  const nodes = [
    { x: 300, y: 160 },
    { x: 220, y: 150 },
    { x: 375, y: 170 },
    { x: 390, y: 245 },
    { x: 380, y: 337 },
    { x: 210, y: 254 },
    { x: 300, y: 340 },
    { x: 220, y: 355 },
  ];

  /* ✅ CARD CONFIG */
  const cards = [
    {
      id: "top",
      title: "Scalable Solutions",
      text: "Track record of successful projects and satisfied clients worldwide.",
      className: "top-6 left-1/2 translate-y-[-25px] -translate-x-1/2",
    },
    {
      id: "right",
      title: "Security-Focused",
      text: "We follow best practices to keep your data and systems protected.",
      className: "right-0 translate-x-[36%] top-1/2 -translate-y-1/2",
      gradient: false,
    },
    {
      id: "left",
      title: "Cross-Platform",
      text: "One solution for multiple platforms across web and mobile experiences.",
      className: "left-0 -translate-x-[36%] top-1/2 -translate-y-1/2",
    },
    {
      id: "bottom",
      title: "Quality Obsessed",
      text: "Every feature is tested for performance, stability, and UX.",
      className: "bottom-6 left-1/2 translate-y-[30px] -translate-x-1/2",
    },
  ];

  const pathMap = {
    top: {
      transform: "",
      left: "M285 230 L285 200 L270 190 L270 165 L285 145 L285 105",
      right:
        "M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105",
    },

    left: {
      transform: "rotate(-90 300 250)",
      left: "M285 230 L285 200 L270 190 L270 165 L285 145 L285 105",
      right:
        "M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105",
    },

    right: {
      transform: "rotate(90 300 250)",
      left: "M285 230 L285 200 L270 190 L270 165 L285 145 L285 105",
      right:
        "M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105",
    },

    bottom: {
      transform: "rotate(180 300 250)",
      left: "M285 230 L285 200 L270 190 L270 165 L285 145 L285 105",
      right:
        "M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105",
    },
  };

  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center bg-black">
      {/* SVG */}
      <svg viewBox="0 0 600 500" className="absolute w-full h-full">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {/* (ALL YOUR PATHS — unchanged) */}
        <path
          d="M300 250 L300 225"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 6"
        />

        <path
          d="M300 225 L300 205 L300 185 L300 165"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* BASE PATH */}
        <path
          d="M285 230 L285 200 L270 190 L270 165 L285 145 L285 105"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* 🔥 ANIMATED LEFT PATH */}
        <motion.path
          d="M285 230 L285 200 L270 190 L270 165 L285 145 L285 105"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: activeCard === "top" ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          style={{
            filter:
              activeCard === "top" ? "drop-shadow(0 0 6px #3b82f6)" : "none",
          }}
        />

        {/* BASE RIGHT */}
        <path
          d="M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* 🔥 ANIMATED RIGHT PATH */}
        <motion.path
          d="M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: activeCard === "top" ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            delay: 0.1, // 👈 slight delay for realism
          }}
          style={{
            filter:
              activeCard === "top" ? "drop-shadow(0 0 6px #3b82f6)" : "none",
          }}
        />
        <path
          d="M270 225 L265 205 L245 195 L245 170 L245 165 L220 150"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        <path
          d="M330 225 L350 205 L355 175 L375 170"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Bottom  */}
        <path
          d="M300 275 L300 295 L300 315 L300 335"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />
        {/* BOTTOM INNER LEFT */}
        <path
          d="M285 270 L285 300 L270 310 L270 335 L285 355 L285 395"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        <motion.path
          d="M285 270 L285 300 L270 310 L270 335 L285 355 L285 395"
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: activeCard === "bottom" ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* BOTTOM INNER RIGHT */}
        <path
          d="M315 270 L315 300 L330 310 L330 335 L315 335 L315 355 L330 355 L330 370 L315 380 L315 395"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        <motion.path
          d="M315 270 L315 300 L330 310 L330 335 L315 335 L315 355 L330 355 L330 370 L315 380 L315 395"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: activeCard === "bottom" ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        <path
          d="M270 275 L265 295 L245 305 L245 335 L245 340 L220 355"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        <path
          d="M330 275 L350 295 L355 325 L375 335"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Left  */}

        <g transform="rotate(-90 300 250)">
          <path
            d="M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105"
            stroke="white"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />

          <motion.path
            d="M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: activeCard === "left" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <path
            d="M295 230 L295 200 L295 185 L295 165"
            stroke="white"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M275 230 L275 200 L260 190 L260 165 L275 145 L275 105"
            stroke="white"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <motion.path
            d="M275 230 L275 200 L260 190 L260 165 L275 145 L275 105"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: activeCard === "left" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </g>

        <g transform="rotate(90 300 250)">
          <path
            d="M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105"
            stroke="white"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <motion.path
            d="M315 230 L315 200 L330 190 L330 165 L315 165 L315 145 L330 145 L330 130 L315 120 L315 105"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: activeCard === "right" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <path
            d="M295 230 L295 200 L295 185 L295 165"
            stroke="white"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M275 230 L275 200 L260 190 L260 165 L275 145 L275 105"
            stroke="white"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <motion.path
            d="M275 230 L275 200 L260 190 L260 165 L275 145 L275 105"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: activeCard === "right" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </g>

        {/* NODES */}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="5" fill="white" />
        ))}
      </svg>

      {/* CENTER CHIP */}
      <div className="absolute w-[70px] h-[70px] bg-black border border-gray-700 rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.7)]">
        <span className="text-white text-2xl">?</span>
      </div>

      {/* ✅ RENDER CARDS */}
      {cards.map((card) => (
        <div
          key={card.id}
          className={`absolute w-[260px] ${card.className}`}
          onMouseEnter={() => setActiveCard(card.id)}
          onMouseLeave={() => setActiveCard(null)}
        >
          <NetworkCard {...card} activeCard={activeCard} />
        </div>
      ))}
    </div>
  );
};

/* ✅ REUSABLE CARD */
const NetworkCard = ({
  id,
  title,
  text,
  gradient,
  activeCard,
}: {
  id: "top" | "right" | "bottom" | "left";
  title: string;
  text: string;
  gradient?: boolean;
  activeCard: string | null;
}) => {
  const clipId = `${id}CardClip`;
  const gradientId = `${id}Gradient`;

  const offsetMap = {
    top: 0.41,
    right: 0.15,
    bottom: 0.86,
    left: 0.5,
  };

  return (
    <svg viewBox="0 0 254 198" className="w-full h-full">
      <defs>
        <clipPath id={clipId}>
          <path d="M28.171 4.82974L4.95743 27.7655C2.10524 30.5836 0.5 34.4262 0.5 38.4358V182.236C0.5 190.52 7.21574 197.236 15.5 197.236H212.651C216.448 197.236 220.103 195.796 222.88 193.207L248.269 169.534C251.312 166.697 253.04 162.724 253.04 158.563V33.2542C253.04 24.9699 246.325 18.2542 238.04 18.2542H198.124C193.546 18.2542 189.218 16.1632 186.372 12.5764L181.297 6.17782C178.451 2.59097 174.124 0.5 169.545 0.5H38.7136C34.7666 0.5 30.9787 2.05566 28.171 4.82974Z" />
        </clipPath>

        {gradient && (
          <linearGradient id={gradientId} x1="0" y1="0" x2="254" y2="198">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        )}
      </defs>

      <foreignObject
        x="0"
        y="0"
        width="254"
        height="198"
        clipPath={`url(#${clipId})`}
      >
        <div
          className=" relative overflow-hidden w-full h-full bg-black p-5 text-white flex flex-col justify-center"
          style={{
            color: activeCard === id ? "#e0e7ff" : "#ffffff", // 👈 soft bluish white
          boxShadow:
  activeCard === id
    ? `
      0 0 10px rgba(59,130,246,0.7),
      0 0 40px rgba(59,130,246,0.5),
      0 0 60px rgba(168,85,247,0.5),
      0 0 80px rgba(168,85,247,0.4)
    `
    : "none",
            transitionDelay: activeCard === id ? "0.6s" : "0s", // 👈 AFTER border
          }}
        >
          <motion.div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.25), rgba(168,85,247,0.15), transparent 70%)",
  }}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{
    opacity: activeCard === id ? 1 : 0,
    scale: activeCard === id ? 1.2 : 0.8,
  }}
  transition={{
    duration: 0.6,
    delay: 0.6, // AFTER border animation
    ease: "easeOut",
  }}
/>
          <h3
            className="font-semibold text-lg"
            style={{
              color: activeCard === id ? "#ffffff" : "#d1d5db",
            }}
          >
            {title}
          </h3>

          <p
            className="text-sm text-gray-400 mt-2"
            style={{
              color: activeCard === id ? "#c7d2fe" : "#9ca3af",
            }}
          >
            {text}
          </p>

          {activeCard === id && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(120deg, transparent 60%, rgba(255,255,255,0.25), transparent 70%)",
              }}
            />
          )}
        </div>
      </foreignObject>

      <path
        d="M28.171 4.82974L4.95743 27.7655C2.10524 30.5836 0.5 34.4262 0.5 38.4358V182.236C0.5 190.52 7.21574 197.236 15.5 197.236H212.651C216.448 197.236 220.103 195.796 222.88 193.207L248.269 169.534C251.312 166.697 253.04 162.724 253.04 158.563V33.2542C253.04 24.9699 246.325 18.2542 238.04 18.2542H198.124C193.546 18.2542 189.218 16.1632 186.372 12.5764L181.297 6.17782C178.451 2.59097 174.124 0.5 169.545 0.5H38.7136C34.7666 0.5 30.9787 2.05566 28.171 4.82974Z"
        fill="none"
        stroke={gradient ? `url(#${gradientId})` : "rgba(255,255,255,0.3)"}
        strokeWidth="1.5"
      />
      <motion.path
        d="M28.171 4.82974L4.95743 27.7655C2.10524 30.5836 0.5 34.4262 0.5 38.4358V182.236C0.5 190.52 7.21574 197.236 15.5 197.236H212.651C216.448 197.236 220.103 195.796 222.88 193.207L248.269 169.534C251.312 166.697 253.04 162.724 253.04 158.563V33.2542C253.04 24.9699 246.325 18.2542 238.04 18.2542H198.124C193.546 18.2542 189.218 16.1632 186.372 12.5764L181.297 6.17782C178.451 2.59097 174.124 0.5 169.545 0.5H38.7136C34.7666 0.5 30.9787 2.05566 28.171 4.82974Z"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        strokeDasharray="40 200" // 👈 small visible segment
        style={{
  filter: activeCard === id
    ? "drop-shadow(0 0 8px #3b82f6) drop-shadow(0 0 16px #3b82f6) drop-shadow(0 0 24px #a855f7)"
    : "none",
}}
        initial={{
          pathLength: 0,
          pathOffset: offsetMap[id], // 👈 THIS IS THE MAGIC
        }}
        animate={
          activeCard === id
            ? {
                pathLength: [0, 0.4, 1],
                pathOffset: [offsetMap[id], offsetMap[id], 0],
              }
            : {
                pathLength: 0,
                pathOffset: offsetMap[id],
              }
        }
        transition={{
          duration: 0.6,
          delay: 0.7, // AFTER circuit finishes
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};

export default NetworkDiagram;
