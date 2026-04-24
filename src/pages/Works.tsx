// src/pages/Works.tsx
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from "../components/SEO";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Loader } from 'lucide-react';

const WorksCard = lazy(() => import('../components/WorksCard'));

// Variants for staggered entrance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
    },
  },
};

const Works = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 pt-[112px]">
      <SEO
        title="Web & App Development Company in Kochi | Expert Solutions"
        description="Choose a Leading Web & App Development Company in Kochi Offering Custom Websites, Mobile Apps, and Scalable Digital Solutions. Contact us Today Slams Edutech"
        keywords="Web Development Company in Kochi"
      />
      <ScrollToTop />

      {/* Animated text block */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="font-medium text-[24px] text-[#70A9FF]"
        >
          Works
        </motion.p>

        <div className="flex justify-between">
          <motion.h1
            variants={itemVariants}
            className="pt-4 font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl"
          >
            Smart Solutions for a{" "}
            <span className="text-blue-400">Digital World</span>
          </motion.h1>
          <div className="pt-4" />
        </div>

        <motion.p
          variants={itemVariants}
          className="pt-4 text-[#ADADAD] text-[20px] text-sm sm:text-base md:text-lg font-outfit max-w-[1100px]"
        >
          As a leading web development company in Kochi, Slams EduTech delivers
          high-quality websites and mobile applications for startups and
          businesses. Explore our work and see how we turn ideas into real
          digital solutions.
        </motion.p>
      </motion.div>

      {/* Cards grid with stagger */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="justify-between items-end pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8"
      >
        <Suspense
          fallback={
            <div className="col-span-full flex justify-center text-white">
              <Loader />
            </div>
          }
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Link to={`/project/${project.id}`}>
                <WorksCard
                  image={project.coverImage}
                  name={project.title}
                  stack={project.subtitle}
                />
              </Link>
            </motion.div>
          ))}
        </Suspense>
      </motion.div>
    </section>
  );
};

export default Works;