import { useParams } from "react-router-dom"
import { projects } from "../data/projects"
import { useEffect, useState } from "react"
import ScrollToTop from "./ScrollToTop"
import { motion } from "framer-motion"

export default function ProjectDetail() {

  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  )

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!project) {
    return <div className="p-10 text-xl text-white font-outfit">Project not found</div>
  }

  // ── Existing fade-up (unchanged everywhere else) ──────────────────────────
  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.30, 1] },
    },
  }

  // ── Separate variant for images — GPU-composited, no y movement ──────────
  // Images are heavy paint targets. Moving them on y causes the browser to
  // repaint the layer on every frame → roughness/jank.
  // Solution: animate ONLY opacity (compositor-only, zero repaints) and
  // add willChange + translateZ(0) to promote to its own GPU layer before
  // the animation even starts, so the compositor handles it entirely.
  const fadeImage = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.30, 1] },
    },
  }

  // ── NEW: slide-from-right variants for the head2 list ────────────────────
  // Parent container — triggers whileInView once, then staggers children
  const listContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,   // each item starts 180ms after the previous
        delayChildren: 0.05,
      },
    },
  }

  // Each item slides in from the right and fades in
  // x: 60 gives a noticeable but not dramatic rightward origin
  const slideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],   // expo-out — fast arrival, soft landing
      },
    },
  }

  // The hr line gets its own variant — slides in from right slightly later
  // and has a clip-path reveal so it "draws" left-to-right
  const lineReveal = {
    hidden: { opacity: 0, scaleX: 0, originX: 1 },   // originX:1 = starts from right
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.12,   // slight lag after the heading text arrives
      },
    },
  }

  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 md:py-20 max-w-full mx-auto overflow-hidden">
      <ScrollToTop />

      {/* SVG clipPaths */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="heroClip" clipPathUnits="objectBoundingBox">
            <path d="M0.44,0.13 L0.56,0 H0.98 A0.02,0.02 0 0 1 1,0.02 V0.98 A0.02,0.02 0 0 1 0.98,1 H0.02 A0.02,0.02 0 0 1 0,0.98 V0.15 A0.02,0.02 0 0 1 0.02,0.13 Z"/>
          </clipPath>
          <clipPath id="cardClip" clipPathUnits="objectBoundingBox">
            <path d="M0.44,0.13 A0.015,0 0 0 1 0.455,0.115 L0.545,0.015 A0.0,0 0 0 1 0.56,0 H0.98 A0.02,0.02 0 0 1 1,0.02 V0.98 A0.02,0.02 0 0 1 0.98,1 H0.02 A0.02,0.02 0 0 1 0,0.98 V0.15 A0.02,0.02 0 0 1 0.02,0.13 Z"/>
          </clipPath>
          <clipPath id="cardClip2" clipPathUnits="objectBoundingBox">
            <path d="M0.45,0 A0.015,0 0 0 1 0.465,0.01 L0.555,0.12 A0.015,0 0 0 1 0.57,0.13 H0.98 A0.02,0.02 0 0 1 1,0.15 V0.98 A0.02,0.02 0 0 1 0.98,1 H0.02 A0.02,0.02 0 0 1 0,0.98 V0.02 A0.02,0.02 0 0 1 0.02,0 H0.45 Z"/>
          </clipPath>
          <clipPath id="showcaseClip" clipPathUnits="objectBoundingBox">
            <path d="M0.02,0 H0.98 A0.02,0.02 0 0 1 1,0.02 V0.98 A0.02,0.02 0 0 1 0.98,1 H0.02 A0.02,0.02 0 0 1 0,0.98 V0.02 A0.02,0.02 0 0 1 0.02,0 Z"/>
          </clipPath>
        </defs>
      </svg>

      {/* Title */}
      <motion.div
        className="mb-10 lg:mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400 font-outfit tracking-wider uppercase mb-4">
          / {project.subtitle}
        </p>
        <h1 className="font-bold font-outfit text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight tracking-tight text-[#579AFF] mb-6">
          {project.title}
        </h1>
      </motion.div>

      {/* Hero Image */}
      <motion.img
        variants={fadeImage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        src={project.images.heroImage}
        alt={project.title}
        style={{ willChange: "opacity", transform: "translateZ(0)" }}
        className="w-full max-h-[400px] sm:max-h-[500px] md:max-h-[800px] mb-12 lg:mb-20 object-cover rounded-[20px]"
      />

      {/* Description */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 lg:mb-24"
      >
        <h2 className="font-bold font-outfit text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-6">About</h2>
        <p className="text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] font-outfit font-light leading-relaxed tracking-wide">
          {project.description}
        </p>
      </motion.div>

      {/* Image Grid */}
      <div className="flex flex-col md:flex-row items-center mb-16 lg:mb-24 gap-8">
        <motion.div
          className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]"
          variants={fadeImage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          style={{ willChange: "opacity", transform: "translateZ(0)" }}
        >
          <img src={project.images.laptop} alt="Laptop view" style={{ clipPath: "url(#cardClip2)" }} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          className="flex md:flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300 mx-2 md:my-2"></div>
          <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]"
          variants={fadeImage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          style={{ willChange: "opacity", transform: "translateZ(0)" }}
        >
          <img src={project.images.mobile} alt="Mobile view" style={{ clipPath: "url(#cardClip)" }} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* ── Heading Section ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-16 lg:mb-24 gap-8 md:gap-12 lg:gap-16">

        {/* Left: main head — unchanged fade-up */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-bold font-outfit text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-white">
            {project.head}
          </h2>
        </motion.div>

        {/* ── Right: head2 list — slides from right, one by one ── */}
        {/*
          The outer motion.div is the stagger CONTAINER.
          It fires whileInView once when the column enters the viewport,
          then cascades `visible` down to every child via staggerChildren.

          Each child (slideRight) animates independently:
            heading text  → slides + fades in
            hr line       → draws left-to-right via scaleX (originX: 1 = right anchor)
            paragraph     → slides + fades in (slightly after line via its own delay)
        */}
        <motion.div
          variants={listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {project.head2.map((heading, index) => (
            <motion.div
              key={index}
              className="mb-8"
              variants={slideRight}
            >
              {/* Heading text */}
              <h3 className="font-medium text-[20px] md:text-[24px] lg:text-[28px] text-white font-outfit mb-4">
                {heading}
              </h3>

              {/* Divider — draws in from right */}
              <motion.hr
                variants={lineReveal}
                className="my-4 border-gray-400/50"
                style={{ transformOrigin: "right" }}
              />

              {/* Body text */}
              <p className="text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] font-outfit font-light leading-relaxed tracking-wide">
                {project.sub[index]}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Second Image Grid */}
      <div className="flex flex-col md:flex-row items-center mb-16 lg:mb-24 gap-8">
        <motion.div
          className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]"
          variants={fadeImage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          style={{ willChange: "opacity", transform: "translateZ(0)" }}
        >
          <img src={project.images.showcase1} alt="Laptop view" style={{ clipPath: "url(#cardClip2)" }} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          className="flex md:flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300 mx-2 md:my-2"></div>
          <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]"
          variants={fadeImage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          style={{ willChange: "opacity", transform: "translateZ(0)" }}
        >
          <img src={project.images.showcase2} alt="Mobile view" style={{ clipPath: "url(#cardClip)" }} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Showcase */}
      <motion.img
        variants={fadeImage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        src={project.images.showcase}
        alt="Project showcase"
        style={{ clipPath: "url(#showcaseClip)", willChange: "opacity", transform: "translateZ(0)" }}
        className="w-full max-h-[350px] sm:max-h-[500px] md:max-h-[800px] mb-8 object-cover"
      />

      {isLargeScreen && (
        <motion.div
          className="w-full flex justify-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <svg viewBox="0 0 600 260" className="w-full max-w-[700px] h-auto" fill="none" stroke="#d1d5db" strokeWidth="2">
            <line x1="300" y1="0" x2="300" y2="100" />
            <line x1="280" y1="140" x2="100" y2="270" />
            <line x1="340" y1="160" x2="550" y2="270" />
            <circle cx="300" cy="120" r="16" fill="#d1d5db" />
            <circle cx="270" cy="150" r="16" fill="#d1d5db" />
            <circle cx="330" cy="150" r="16" fill="#d1d5db" />
          </svg>
        </motion.div>
      )}

      {/* Challenge + Features */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16 lg:mb-24 ${isLargeScreen ? "" : "pt-6"}`}>
        <motion.div
          className="border border-neutral-700/60 bg-neutral-900/20 backdrop-blur-sm rounded-2xl p-6 md:p-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="font-bold font-outfit text-2xl md:text-3xl lg:text-4xl text-white mb-6">Challenge</h3>
          <ul className="space-y-4 text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] font-outfit font-light leading-relaxed tracking-wide">
            {project.challenge.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#70A9FF] mt-1 text-lg">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="border border-neutral-700/60 bg-neutral-900/20 backdrop-blur-sm rounded-2xl p-6 md:p-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="font-bold font-outfit text-2xl md:text-3xl lg:text-4xl text-white mb-6">Key Features</h3>
          <ul className="space-y-4 text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] font-outfit font-light leading-relaxed tracking-wide">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#70A9FF] mt-1 text-lg">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="rounded-[20px] overflow-hidden py-6"
        variants={fadeImage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        style={{ willChange: "opacity", transform: "translateZ(0)" }}
      >
        <img
          src={project.images.lastimg}
          alt="showcase"
          style={{ clipPath: "url(#showcaseClip)" }}
          className="w-full max-h-[350px] sm:max-h-[500px] md:max-h-[800px] object-cover"
        />
      </motion.div>

    </section>
  )
}