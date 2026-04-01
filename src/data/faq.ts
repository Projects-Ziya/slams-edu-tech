// src/data/faq.ts

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "What services does SLAMS EDUTECH provide?",
    answer:
      "We offer IT services including web and mobile app development, UI/UX design, digital marketing, AI & ML solutions, cyber security, game development, graphic design, CCTV solutions, and mobile repair services, along with industry-oriented IT training programs.",
  },
  {
    question: "Do you provide internships and training programs?",
     answer:
      "Yes, we provide practical, project-based training and internships designed to help students and professionals gain real-world experience and industry-relevant skills.",
  },
  {
    question: "Are your services suitable for startups and small businesses?",
    answer:
      "Absolutely. Our services are customized to suit startups, small businesses, and enterprises, focusing on scalability, affordability, and business growth.",
  },
  {
    question: "Do you offer customized software solutions?",
    answer:
      "Yes, we provide customized software, websites, and applications tailored to your business needs. We design scalable, user-friendly solutions aligned with your goals, ensuring seamless integration, performance, and long-term growth support.",
  },
  {
    question: "How do you ensure quality and security in your projects?",
   answer:
      "We follow structured development processes, quality testing, and security best practices to ensure reliable, secure, and high-performing solutions.",
  },
  {
    question: "Do you provide post-project support and maintenance?",
   answer:
      "Yes, we offer ongoing support, maintenance, regular updates, and performance optimization after project delivery, ensuring your system remains secure, up-to-date, efficient, and aligned with evolving business needs and growth objectives.",
  },
  {
    question: "Can I get both services and training from SLAMS EDUTECH?",
    answer:
      "Yes, we uniquely combine IT services and education, allowing clients and learners to benefit from both professional solutions and skill development.",
  },
];