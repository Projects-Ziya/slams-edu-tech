import { useParams } from "react-router-dom";
import { services } from "../data/service";
import { HashLink } from "react-router-hash-link";
import ScrollToTop from "./ScrollToTop";
import SEO from "./SEO";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICE DETAILS
═══════════════════════════════════════════════════════════════════════════ */
const ServiceDetails = () => {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const service = services.find((item: any) => item.id === id);

  // --- Scroll animations for CTA ---
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start start", "end end"],
  });
  const ctaInset     = useTransform(ctaScroll, [0, 1], [6, 0]);
  const ctaRadius    = useTransform(ctaScroll, [0, 1], [32, 0]);
  const ctaClipPath  = useMotionTemplate`inset(${ctaInset}% round ${ctaRadius}px)`;
  const ctaTextScale = useTransform(ctaScroll, [0, 1], [1, 1.25]);

  // Black overlay fades in during the last 35% of CTA scroll — animated bg-to-black
  const ctaBlackOpacity = useTransform(ctaScroll, [0.65, 1], [0, 1]);

  if (!service) {
    return <><SEO title="Service not found | Slams Tech" description="The requested service could not be found." noindex /><div className="text-white p-6">Service not found</div></>;
  }

  const typingVariants = {
    hidden:  { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const charVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="w-full bg-black text-white relative">
      <SEO title={`${service.title} Services | Slams Tech`} description={service.text} keywords={`${service.title}, software development company Kochi`} image={service.image} />
      <ScrollToTop />

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <div className="sticky top-0 w-full h-[100svh] flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12">
        <section className="mx-auto w-full max-w-[1440px] flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-16 pt-20">

          {/* Left: Text */}
          <div className="flex-1">
            <motion.h1
              variants={typingVariants}
              initial="hidden"
              animate="visible"
              className="pt-4 font-bold font-outfit text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl tracking-tight leading-tight mb-6"
            >
              {service.title.split("").map((char: string, i: number) => (
                <motion.span key={`title-${i}`} variants={charVariants}>{char}</motion.span>
              ))}
              <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,_#579AFF_0%,_#345D99_100%)]">
                {"Solutions".split("").map((char: string, i: number) => (
                  <motion.span key={`high-${i}`} variants={charVariants}>{char}</motion.span>
                ))}
              </span>
              <motion.span variants={charVariants}> </motion.span>
              {"for Your".split("").map((char: string, i: number) => (
                <motion.span key={`foryour-${i}`} variants={charVariants}>{char}</motion.span>
              ))}
              <br className="hidden sm:block" />
              {"Business".split("").map((char: string, i: number) => (
                <motion.span key={`biz-${i}`} variants={charVariants}>{char}</motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-sm sm:text-base md:text-lg max-w-[650px] mb-8 text-gray-300"
            >
              {service.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <HashLink
                smooth
                to="/#contact"
                scroll={(el) => el.scrollIntoView({ behavior: "smooth", block: "start" })}
                onClick={() => setMenuOpen(false)}
              >
                <button className="border-2 border-blue-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all duration-300 hover:scale-105 hover:text-blue-500 hover:border-white">
                  Start Your Project
                </button>
              </HashLink>
            </motion.div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.5 }}
              src={service.image}
              alt={service.title}
              className="rounded-2xl w-full max-w-[320px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px]
                         h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </section>
      </div>

      {/* ════════════════════════════════════════════════
          OVERLAPPING CONTENT CONTAINER
      ════════════════════════════════════════════════ */}
      <div className="relative z-10 bg-black w-full px-4 sm:px-6 md:px-10 lg:px-12 pt-10 pb-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-gray-900 overflow-hidden">

        {/* ── ABOUT ── */}
        <SectionReveal>
          <section className="relative mx-auto py-10 sm:py-12 md:py-16">
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] md:w-[110%] h-[180%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0%,rgba(30,58,138,0.06)_40%,transparent_70%)] blur-[100px] pointer-events-none -z-10 transform -rotate-6" />
            <div className="absolute top-[60%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] blur-[120px] pointer-events-none -z-10 transform rotate-12" />
            <div className="relative z-10">
              <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400 font-outfit tracking-wider uppercase mb-2">
                / Detail
              </p>
              <h2 className="pt-4 font-bold font-outfit text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight tracking-tight text-white mb-6 md:mb-8">
                About The Service
              </h2>
              <p className="pt-2 text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] font-outfit font-light leading-relaxed tracking-wide max-w-[1100px]">
                {service.about}
              </p>
            </div>
          </section>
        </SectionReveal>

        {/* ── WHAT WE OFFER ── */}
        <SectionReveal>
          <section className="mx-auto py-10 sm:py-12 md:py-16">
            <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400 font-outfit tracking-wider uppercase mb-2">
              / Offerings
            </p>
            <h2 className="pt-4 font-bold font-outfit text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight tracking-tight text-white mb-10 md:mb-14">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {service.offers?.map((item: any, index: number) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="border border-gray-700 p-5 sm:p-6 md:p-8 rounded-xl min-h-[200px] hover:border-blue-500 hover:bg-[#0a0a1a] transition-colors duration-300"
                  >
                    <Icon className="mb-4 text-blue-400" />
                    <p className="mb-2 font-medium text-base sm:text-lg md:text-xl leading-tight">{item.title}</p>
                    <p className="text-gray-400 text-sm sm:text-base">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </SectionReveal>

        {/* ── TECHNOLOGIES ── */}
        <SectionReveal>
          <section className="relative bg-black text-white py-10 sm:py-12 md:py-16 overflow-hidden">

            {/* Subtle blue round gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[150%] h-[200%] md:h-[150%] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,rgba(30,58,138,0.04)_30%,transparent_60%)] blur-[100px] pointer-events-none z-0" />

            <div className="relative z-10 mx-auto">
              <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400 font-outfit tracking-wider uppercase mb-2">
                / Tech Stack
              </p>
              <h2 className="pt-4 font-bold font-outfit text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight tracking-tight text-white mb-12 md:mb-16">
                Technologies we use
              </h2>
              {/* Desktop */}
              <div className="relative hidden md:block">
                <div className="absolute top-2 left-0 w-full border-t border-dotted border-gray-500" />
                <div className="flex justify-between items-start relative">
                  {service.technologies.map((tech: string, index: number) => (
                    <div key={index} className="flex flex-col items-center w-full">
                      <div className="w-px h-16 md:h-20 bg-gray-500 mt-2" />
                      <div className="w-2 h-2 bg-white rounded-full z-10" />
                      <p className="mt-2 text-gray-300 text-sm sm:text-base md:text-lg font-medium text-center">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
                {service.technologies.map((tech: string, index: number) => (
                  <div key={index} className="border border-gray-700 rounded-lg p-3 sm:p-4 text-center text-gray-300 text-sm sm:text-base">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ── OUR PROCESS ── */}
        <SectionReveal>
          <section className="bg-[#151515] text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="mx-auto max-w-[1100px]">
              <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400 font-outfit tracking-wider uppercase mb-2">
                / Methodology
              </p>
              <h2 className="pt-4 font-bold font-outfit text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight tracking-tight text-white mb-12 md:mb-16 text-left">
                Our Process
              </h2>

              {/* Desktop Waterfall */}
              <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-10">
                <div className="flex flex-col gap-16 lg:gap-24">
                  {service.steps.filter((s: any) => s.position === "left").map((step: any, index: number) => (
                    <ProcessCard key={`col1-${index}`} step={step} />
                  ))}
                </div>
                <div className="flex flex-col gap-16 lg:gap-24 pt-24 lg:pt-32">
                  {service.steps.filter((s: any) => s.position === "center").map((step: any, index: number) => (
                    <ProcessCard key={`col2-${index}`} step={step} />
                  ))}
                </div>
                <div className="flex flex-col gap-16 lg:gap-24 pt-48 lg:pt-64">
                  {service.steps.filter((s: any) => s.position === "right").map((step: any, index: number) => (
                    <ProcessCard key={`col3-${index}`} step={step} />
                  ))}
                </div>
              </div>

              {/* Mobile */}
              <div className="flex flex-col items-center gap-10 md:hidden">
                {service.steps.map((step: any, index: number) => (
                  <ProcessCard key={`mob-${index}`} step={step} />
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      </div>

      {/* ════════════════════════════════════════════════
          CTA — clip-path expands, then bg fades to black
      ════════════════════════════════════════════════ */}
      <section ref={ctaRef} className="relative h-[190vh] w-full bg-black">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div
            style={{
              clipPath: ctaClipPath,
              background: "linear-gradient(135deg, #001A3D 0%, #002863 100%)",
              boxShadow:
                "inset 0 2px 0 0 #1E2939, inset 0 -2px 0 0 #05080d, inset 2px 0 0 0 #111827, inset -2px 0 0 0 #111827",
              position: "relative",
            }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {/* ── Animated black overlay — fades in as section fills viewport ── */}
            <motion.div
              style={{ opacity: ctaBlackOpacity }}
              className="absolute inset-0 bg-black pointer-events-none"
              aria-hidden="true"
            />

            {/* Content sits above the overlay */}
            <motion.h2
              style={{ scale: ctaTextScale, position: "relative", zIndex: 1 }}
              className="font-bold font-outfit text-4xl md:text-6xl lg:text-7xl text-white mb-6 text-center leading-tight tracking-tight px-4"
            >
              Ready to Start Your Project?
            </motion.h2>
            <p
              className="text-gray-300 mb-10 text-lg md:text-xl font-outfit font-light tracking-wide text-center px-4"
              style={{ position: "relative", zIndex: 1 }}
            >
              Let's discuss how we can help bring your vision to life
            </p>
            <div style={{ position: "relative", zIndex: 1 }}>
              <HashLink
                smooth
                to="/#contact"
                scroll={(el) => el.scrollIntoView({ behavior: "smooth", block: "start" })}
                onClick={() => setMenuOpen(false)}
              >
                <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                  Get a Quote
                </button>
              </HashLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   SectionReveal — unchanged from your original
─────────────────────────────────────────────────────────────────────────── */
const SectionReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`sd-section-reveal ${visible ? "sd-in-view" : ""}`}>
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   ProcessCard — unchanged from your original
─────────────────────────────────────────────────────────────────────────── */
const ProcessCard = ({ step }: { step: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="group border-t border-r border-[#333] hover:border-blue-500 transition-colors duration-500 pt-10 pr-8 pb-16 w-full max-w-[260px] cursor-pointer"
  >
    <div className="flex items-center gap-4 mb-4">
      <span className="text-4xl md:text-5xl font-semibold text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
        {step.number}
      </span>
      <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
        {step.title}
      </h3>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed max-w-[220px] group-hover:text-blue-200 transition-colors duration-300">
      {step.text}
    </p>
  </motion.div>
);

export default ServiceDetails;