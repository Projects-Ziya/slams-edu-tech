// src/components/FAQ.tsx

import { useState } from "react";
import { faqs } from "../../data/faq";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="w-full bg-black text-white md:py-16 px-6 flex flex-col items-center">
      
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-blue-400 mb-10">
        FAQ’s
      </h2>

      {/* FAQ List */}
      <motion.div
        className="max-w-4xl flex flex-col gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              layout // ✅ smooth push animation
              className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-base md:text-lg font-medium pr-2">
                  {faq.question}
                </span>

                <motion.div
                  layout
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black"
                >
                  {isActive ? <Minus size={18} /> : <Plus size={18} />}
                </motion.div>
              </button>

              {/* Divider */}
              <motion.div
                layout
                className="h-[1px] bg-white/20 mx-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
              />

              {/* Answer (SPRING BASED) */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="content"
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      transition: {
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      },
                    }}
                    className="px-6 overflow-hidden"
                  >
                    <p className="py-4 text-sm md:text-base text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Faq;