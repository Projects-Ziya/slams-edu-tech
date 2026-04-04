import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ConnectorShape = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Blue line progress
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Light head length (small glowing segment)
  const headLength = useTransform(scrollYProgress, [0, 1], [0.008, 0.02]);

  // End dot color change
  const dotColor = useTransform(
    scrollYProgress,
    [0.95, 1],
    ["#6B7280", "#3B82F6"]
  );

  return (
    <div ref={ref} className="absolute inset-0">
      <svg
        className="absolute left-[-10px] top-[-50px] w-[1200px] h-[450px] pointer-events-none"
        viewBox="0 0 1200 720"
        fill="none"
      >
        {/* Glow filter */}
        <defs>
          <defs>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    {/* soft outer glow */}
    <feGaussianBlur stdDeviation="6" result="blur1" />

    {/* inner glow */}
    <feGaussianBlur stdDeviation="2" result="blur2" />

    {/* merge both */}
    <feMerge>
      <feMergeNode in="blur1" />
      <feMergeNode in="blur2" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
        </defs>

        {/* 1️⃣ BASE GREY DASHED LINE */}
        <path
          d="
            M 0 80
            H 770 
            L 895 240
            V 480
            H 1190
            V 350
            H 1050 
            V 700
            H 1200
          "
          stroke="#6B7280"
          strokeWidth="1.7"
          strokeDasharray="5 6"
        />

        {/* 2️⃣ BLUE PROGRESS LINE */}
        <motion.path
          d="
            M 0 80
            H 770 
            L 895 240
            V 480
            H 1190
            V 350
            H 1050 
            V 700
            H 1200
          "
          stroke="#3B82F6"
          strokeWidth="1.8"
          strokeDasharray="5 6"
          style={{ pathLength }}
          opacity={0.9}
        />

        {/* 3️⃣ WHITE LIGHT HEAD (FLOW EFFECT) */}
        <motion.path
          d="
            M 0 80
            H 770 
            L 895 240
            V 480
            H 1190
            V 350
            H 1050 
            V 700
            H 1200
          "
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{
            pathLength: headLength,
            pathOffset: pathLength,
          }}
          filter="url(#glow)"
        />
        <motion.path
  d="..."
  stroke="#60A5FA"
  strokeWidth="6"
  strokeLinecap="round"
  style={{
    pathLength: headLength,
    pathOffset: pathLength,
  }}
  opacity={0.25}
/>

        {/* 4️⃣ START DOT */}
        <circle cx="0" cy="80" r="4" fill="#6B7280" />

        {/* 5️⃣ END DOT (ANIMATED) */}
        <motion.circle
          cx="1200"
          cy="699"
          r="4"
          style={{ fill: dotColor }}
        />
      </svg>
    </div>
  );
};

export default ConnectorShape;