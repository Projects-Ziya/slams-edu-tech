import { useState, useEffect } from "react";
import AboutCard from "../../components/AboutCard"
import { Gem, Users, CircleCheck, Lightbulb } from "lucide-react"
import ab1 from "../../assets/about/about1.webp"
import ab2 from "../../assets/about/about2.jpg"
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";

const Section3D = lazy(() => import("../../components/Section3D"));

const About = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const cardsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  let timeout: any;

  const handleResize = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsLargeScreen(window.innerWidth >= 768);
    }, 200);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []); 

  const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

  return (
<section
  id="about"
  className="relative px-4 md:px-4 pt-[60px] md:pt-[100px] pb-10 min-h-[500px]"
>
    {isLargeScreen && (
       <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
      <Suspense fallback={<div className="text-white">Loading 3D...</div>}>
        <Section3D  targetRef={cardsRef} />
      </Suspense>
      </div>
    )}

{/* ================= MAIN GRID ================= */}
<motion.div
 className="relative z-10 grid md:grid-cols-[1fr_1.4fr] gap-16 items-center px-1 md:px-6"
 initial={{ opacity: 0, y: 60 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} 
 viewport={{ once: true, amount: 0.2 }}
>
  
  
  <div className="lg:pb-[160px]">
    <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400">
      / About Slams
    </p>

    <div className="flex flex-col justify-between pr-3">
      <h1 className="pt-5 font-extrabold font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
        Your Partner in
<br />
        <span className="text-blue-400 pt-2">
Digital Transformation        </span>
      </h1>

      <p className="pt-8 sm:pt-4 font-outfit text-[#f1eded] leading-2 lg:leading-6 xl:leading-10 text-[14px] sm:text-[13px] md:text-[15px] xl:text-[20px] 2xl:text-[22px] font-[150] tracking-wider  max-w-[700px]">
Slams EduTech is a growing IT and EdTech company based in Kochi, Kerala, delivering innovative digital solutions and industry-focused training. We specialize in web development, mobile app development, digital marketing, UI/UX design, and AI-powered solutions. <br />
As one of the emerging IT companies in Kochi, we focus on building scalable, cost-effective solutions for startups and businesses. We also provide internship programs that bridge the gap between education and real-world industry experience.

      </p>
    </div>
  </div>

  <div ref={cardsRef} className="gap-3 pt-2 pr- lg:pb-32 xl:pb-8">

    <div className="flex flex-col md:flex-row gap-6 ">
      <AboutCard icon={<Gem className="w-6 h-6 text-[#70A9FF]" />} title="Custom Solutions" text="Tailored software and digital solutions built for your unique business need." />
      <AboutCard icon={<Users className="w-6 h-6 text-[#70A9FF]" />} title="Expert Team" text="Skilled developers, designers, and strategists delivering excellence." />
    </div>

    <div className="flex flex-col md:flex-row gap-6 pt-6">
      <AboutCard icon={<CircleCheck className="w-6 h-6 text-[#70A9FF]" />} title="Proven Results" text="Track record of successful projects and satisfied clients worldwide." />
      <AboutCard icon={<Lightbulb className="w-6 h-6 text-[#70A9FF]" />} title="Innovation-Driven" text="Leveraging cutting-edge technologies to keep you ahead of competition." />
    </div>

  </div>
</motion.div>

{/* ================= BIG CARDS ================= */}
<motion.section 
className="flex flex-col xl:flex-row pt-20 gap-12 justify-between px-1 sm:px-4 md:px-6 xl:px-10 pb-6"
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
viewport={{ once: true, amount: 0.2 }}
>

<motion.div
  className="w-full pt-4"
  variants={slideLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
<div className="relative w-full max-w-[850px] aspect-[850/700] mx-auto 
  rounded-2xl overflow-hidden border border-gray-700 md:border-0">

{/* clip only desktop */}
{isLargeScreen && (
<svg width="0" height="0">
<defs>
<clipPath id="missionClipLarge" clipPathUnits="objectBoundingBox">
<path transform="scale(0.00117647,0.00142857)"
d="M 45 0 H 408 Q 430 0 448 18 L 544 105 Q 561 122 589 122 H 805 Q 850 122 850 169 V 653 Q 850 700 805 700 H 45 Q 0 700 0 653 V 47 Q 0 0 45 0 Z"/>
</clipPath>
</defs>
</svg>
)}

<img
src={ab2}
className="absolute inset-0 w-full h-full object-cover"
style={{ clipPath: isLargeScreen ? "url(#missionClipLarge)" : "none" }}
/>

<div className="absolute inset-0 bg-black/30"></div>

<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 xl:p-10 text-white">
<div className="max-w-[90%] md:max-w-[500px] pt-4">

<h2 className="text-xl sm:text-2xl md:text-3xl xl:text-3xl font-heading font-bold">
Our Mission
</h2>

<p className="mt-2 md:mt-4 text-xs sm:text-sm md:text-base xl:text-lg leading-relaxed">
To deliver high-quality IT services and internship opportunities that help businesses scale and individuals build industry-ready skills.</p>

</div>
</div>

{/* desktop border */}
{isLargeScreen && (
<svg viewBox="0 0 850 700" className="absolute inset-0 w-full h-full pointer-events-none">
<path d="M 45 0 H 408 Q 430 0 448 18 L 544 105 Q 561 122 589 122 H 805 Q 850 122 850 169 V 653 Q 850 700 805 700 H 45 Q 0 700 0 653 V 47 Q 0 0 45 0 Z"
fill="none" stroke="#ffffff" strokeWidth="1"/>
</svg>
)}

</div>
</motion.div>

{/* RIGHT CARD */}
<motion.div
  className="w-full lg:pt-32 sm:pt-2"
  variants={slideRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
<div className="relative w-full max-w-[850px] aspect-[850/700] mx-auto 
  rounded-2xl overflow-hidden border border-gray-700 md:border-0">

{isLargeScreen && (
<svg width="0" height="0">
<defs>
<clipPath id="missionClipMirrorUpsideLarge" clipPathUnits="objectBoundingBox">
<path transform="translate(1,1) scale(-1,-1) scale(0.00117647,0.00142857)"
d="M 45 0 H 408 Q 430 0 448 18 L 544 105 Q 561 122 589 122 H 805 Q 850 122 850 169 V 653 Q 850 700 805 700 H 45 Q 0 700 0 653 V 47 Q 0 0 45 0 Z"/>
</clipPath>
</defs>
</svg>
)}

<img
src={ab1}
className="absolute inset-0 w-full h-full object-cover"
style={{ clipPath: isLargeScreen ? "url(#missionClipMirrorUpsideLarge)" : "none" }}
/>

<div className="absolute inset-0 bg-black/30"></div>

<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 xl:p-10 text-white pt-12 md:pt-0">
<div className="max-w-[90%] md:max-w-[500px] pb-6 md:pb-[116px]">

<h2 className="text-2xl md:text-3xl xl:text-3xl font-heading font-bold">
Our Vision
</h2>

<p className="mt-2 md:mt-4 text-sm md:text-base xl:text-lg leading-relaxed">
We aim to be a trusted IT and training partner, empowering businesses and individuals with innovative technology and industry-ready skills for meaningful digital experiences and growth. 
</p>
</div>
</div>

{isLargeScreen && (
<svg viewBox="0 0 850 700" className="absolute inset-0 w-full h-full pointer-events-none">
<path transform="translate(850,700) scale(-1,-1)"
d="M 45 0 H 408 Q 430 0 448 18 L 544 105 Q 561 122 589 122 H 805 Q 850 122 850 169 V 653 Q 850 700 805 700 H 45 Q 0 700 0 653 V 47 Q 0 0 45 0 Z"
fill="none" stroke="white" strokeWidth="1"/>
</svg>
)}

</div>
</motion.div>

</motion.section>

</section>
  )
}

export default About;