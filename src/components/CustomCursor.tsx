import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Setup Motion Values for fast performance (bypasses standard React rendering on mousemove)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, floaty springs for the outer ring trailing effect (even smoother, less bouncy)
  const outerSpringConfig = { stiffness: 90, damping: 25, mass: 0.6 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  // Snappy, organic springs for the inner dot
  const innerSpringConfig = { stiffness: 600, damping: 30 };
  const innerX = useSpring(mouseX, innerSpringConfig);
  const innerY = useSpring(mouseY, innerSpringConfig);

  useEffect(() => {
    // 1. Mobile & Touch Screen Guard
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      setIsMobile(!finePointer || hasTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // 2. Mouse Movement Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Make cursor visible on first move
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    // 3. Screen Boundary Checking (Hide when mouse leaves window)
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    // 4. Click Tracking
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // 5. Clickable Hover Tracking (Global Delegation)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find if cursor is over a link, button, input, or any element styled with pointer
      const clickableElement =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".interactive-hover") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!clickableElement);
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    // Add .custom-cursor-active class to document element to hide native cursor
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  // If it's a mobile/touch device, don't render the custom cursor
  if (isMobile) return null;

  return (
    <>
      {/* Outer Glowing Trailing Halo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          width: 22,
          height: 22,
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.35 : 1,
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.20)" : "rgba(59, 130, 246, 0.08)",
          borderColor: isHovered ? "#3B82F6" : "rgba(59, 130, 246, 0.85)",
          borderWidth: isHovered ? "2px" : "1.2px",
          borderStyle: "solid",
          boxShadow: isHovered
            ? "0 0 20px rgba(59, 130, 246, 0.85), inset 0 0 8px rgba(59, 130, 246, 0.45)"
            : "0 0 12px rgba(59, 130, 246, 0.60), inset 0 0 4px rgba(59, 130, 246, 0.25)",
          borderRadius: isHovered 
            ? ["50%", "48% 52% 52% 48% / 50% 50% 50% 50%", "52% 48% 50% 50% / 48% 52% 48% 52%", "50%"]
            : ["50%", "49% 51% 51% 49% / 50% 50% 50% 50%", "51% 49% 50% 50% / 49% 51% 49% 51%", "50%"],
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 250, damping: 28 },
          opacity: { duration: 0.15 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
          borderRadius: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 5,
            ease: "easeInOut"
          }
        }}
      />

      {/* Snappy Inner Solid Core */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] will-change-transform"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 0.8 : 1,
          backgroundColor: isHovered ? "#3B82F6" : "#ffffff", // blue-500 when hovered, white otherwise
          boxShadow: isHovered
            ? "0 0 8px rgba(59, 130, 246, 0.8)"
            : "0 0 4px rgba(255, 255, 255, 0.4)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 450, damping: 25 },
          opacity: { duration: 0.15 },
          backgroundColor: { duration: 0.15 },
        }}
      />
    </>
  );
}

