// src/pages/Service.tsx
import { services } from "@/data/service";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import SEO from "../components/SEO";

const CustomShapeCard = lazy(() => import("../components/CustomShapedCard"));

// Scroll-based card entrance variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Section entrance
const sectionVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const Service = () => {
  return (
    <section className="relative px-5 sm:px-6 md:px-12 2xl:px-16 font-outfit pb-16 pt-[116px] overflow-hidden">
      <SEO
        title="Best Software Development Company | Custom services"
        description="Best Software Development Company Offering Custom Software, Web, and Mobile app Development Services to Help Your Business Grow Faster"
        keywords="Best Software Development Company"
      />

      {/* Ambient background with grain */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-950 to-slate-950" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        />
        {/* Floating light orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <ScrollToTop />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={sectionVariants}
      >
        <motion.div variants={sectionVariants}>
          <motion.p
            variants={cardVariants}
            className="font-medium text-[24px] text-[#70A9FF]"
          >
            Services
          </motion.p>
          <motion.div variants={cardVariants} className="flex justify-between">
            <p className="pt-4 font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl">
              Best Software Development Company <br /> for your
              <span className="text-blue-400"> Business Growth </span>
            </p>
            <div className="pt-4" />
          </motion.div>
          <motion.p
            variants={cardVariants}
            className="pt-4 text-[#ADADAD] text-sm sm:text-base md:text-lg font-outfit max-w-[1400px]"
          >
            Slams EduTech delivers custom web, mobile, and business software designed to scale.
            As a trusted software development company, we work with startups and growing businesses
            to turn ideas into reliable, high-performance digital products.
          </motion.p>
        </motion.div>

        <motion.div
          className="justify-between items-end pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8"
          variants={sectionVariants}
        >
          <Suspense
            fallback={
              <div className="col-span-full flex justify-center">
                <Loader />
              </div>
            }
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15 }}
              >
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
      </motion.div>
    </section>
  );
};

export default Service;