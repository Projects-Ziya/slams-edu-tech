// src/pages/Service.tsx (or your file path)
import { services } from "@/data/service";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import SEO from "../components/SEO";

const CustomShapeCard = lazy(() => import("../components/CustomShapedCard"));

// Animation variants for staggered entrance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic for smooth premium feel
    },
  },
};

const Service = () => {
  return (
    <section className="px-5 sm:px-6 md:px-12 2xl:px-16 font-outfit pb-16 pt-[116px]">
      <SEO
        title="Best Software Development Company | Custom services"
        description="Best Software Development Company Offering Custom Software, Web, and Mobile app Development Services to Help Your Business Grow Faster"
        keywords="Best Software Development Company"
      />

      <ScrollToTop />

      {/* Animated text group */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="font-medium text-[24px] text-[#70A9FF]"
        >
          Services
        </motion.p>

        <div className="flex justify-between">
          <motion.p
            variants={itemVariants}
           className="pt-4 font-bold font-outfit text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl tracking-tight">
  <span className="block mb-2">Best Software Development Company for</span>
  <span className="block bg-[linear-gradient(90deg,_#579AFF_0%,_#345D99_100%)] bg-clip-text text-transparent">
    Your Business Growth
  </span>
          </motion.p>
          <div className="pt-4" />
        </div>

        <motion.p
          variants={itemVariants}
          className="pt-4 text-[#ADADAD] text-sm sm:text-base md:text-lg font-outfit max-w-[1400px]"
        >
          Slams Tech delivers custom web, mobile, and business software designed to scale.
          As a trusted software development company, we work with startups and growing businesses
          to turn ideas into reliable, high-performance digital products.
        </motion.p>
      </motion.div>

      {/* Cards grid with staggered animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="justify-between items-end pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8"
      >
        <Suspense
          fallback={
            <div className="col-span-full flex justify-center">
              <Loader />
            </div>
          }
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <CustomShapeCard
                image={service.image}
                title={service.title}
                text={service.text}
                buttonLink={`/service/${service.id}`}
              />
            </motion.div>
          ))}
        </Suspense>
      </motion.div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes svcColorPulse {
          0%   { color: #ffffff; }
          28%  { color: #ffffff; }
          52%  { color: #70A9FF; }
          76%  { color: #70A9FF; }
          100% { color: #ffffff; }
        }
      `}</style>
    </section>
  );
};

export default Service;