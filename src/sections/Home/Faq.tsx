// src/components/FAQ.tsx

import { useState } from "react";
import { faqs } from "../../data/faq";
import { Plus, Minus } from "lucide-react";

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-black text-white py-16 px-16 flex flex-col items-center">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-blue-400 mb-10">
        FAQ’s
      </h2>

      {/* FAQ List */}
      <div className="w-full  flex flex-col gap-8">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] overflow-hidden transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-base md:text-lg font-medium">
                  {faq.question}
                </span>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black">
                  {isActive ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              {/* Divider */}
              <div
                className={`h-[1px] bg-white/20 mx-6 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Answer with smooth animation */}
              <div
                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  isActive ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;