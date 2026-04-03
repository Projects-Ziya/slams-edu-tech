import { useState, useEffect } from "react";
import AboutCard from "../../components/AboutCard"
import { Gem, Users, CircleCheck, Lightbulb } from "lucide-react"
import ab1 from "../../assets/about/about1.webp"
import ab2 from "../../assets/about/about2.jpg"
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Section3D = lazy(() => import("../../components/Section3D"));

const About = () => {
   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="about" className="relative px-0 md:px-6 pt-[32px] pb-10 min-h-[500px]">
    {isLargeScreen && (
  <Suspense fallback={<div className="text-white">Loading 3D...</div>}>
    <Section3D />
  </Suspense>
)}


      {/* MAIN GRID */}
<motion.div
 className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pl-5"
   initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} 
 viewport={{ once: true, amount: 0.2 }}>
  
        <div className="pb-16">
          <p className="font-medium text-[18px] sm:text-[20px] md:text-[24px] text-gray-400">
            / About Slams
          </p>

          <div className="flex flex-col justify-between pr-3">
            <p className="pt-4 font-extrabold  font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Your Partner in <br />
              <span className="text-blue-400">
                Digital Transformation
              </span>
            </p>

            <p className="pt-4 text-[#f1eded] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[20px] font-[150] tracking-wide font-outfit max-w-[800px]">
              SLAMS EDUTECH is an IT and EdTech company providing innovative digital solutions in software development, UI/UX design, digital marketing, and web and mobile apps, along with AI & ML, cybersecurity, and IT training. Our mission is to bridge education and industry through practical, skill-based learning and value-driven technology services that help individuals and businesses grow in a digital world.
            </p>
          </div>
        </div>

       <div className=" gap-3 pt-10 pr-4">
        <div className="flex gap-6 ">

  <AboutCard icon={<Gem className="w-6 h-6 text-[#70A9FF]" />} title="Custom Solutions" text="Tailored software and digital solutions built for your unique business need." />
  <AboutCard icon={<Users className="w-6 h-6 text-[#70A9FF]" />} title="Expert Team" text="SSkilled developers, designers, and strategists delivering excellence." />

</div>
        <div className="flex gap-6 pt-6">

  <AboutCard icon={<CircleCheck className="w-6 h-6 text-[#70A9FF]" />} title="Proven Results" text="STrack record of successful projects and satisfied clients worldwide." />

  <AboutCard icon={<Lightbulb className="w-6 h-6 text-[#70A9FF]" />} title="Innovation-Driven" text="Leveraging cutting-edge technologies to keep you ahead of competition." />

</div>

</div>

      </motion.div>



{/* big card */}
<motion.section 
className="flex flex-col xl:flex-row pt-16 gap-12 justify-between px-4 md:px-6 xl:px-10 pb-6"
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} 
viewport={{ once: true, amount: 0.2 }}
>

{/* LEFT CARD */}
<div className="pt-0 w-full">

<div className="relative w-full max-w-[850px] aspect-[850/700] mx-auto">

<svg width="0" height="0">
<defs>
<clipPath id="missionClipLarge" clipPathUnits="objectBoundingBox">
<path
transform="scale(0.00117647,0.00142857)"
d="
M 45 0
H 408
Q 430 0 448 18
L 544 105
Q 561 122 589 122
H 805
Q 850 122 850 169
V 653
Q 850 700 805 700
H 45
Q 0 700 0 653
V 47
Q 0 0 45 0
Z
"
/>
</clipPath>
</defs>
</svg>

<img
alt="img"
src={ab2}
className="absolute inset-0 w-full h-full object-cover"
style={{ clipPath: "url(#missionClipLarge)" }}
/>

<div className="absolute inset-0 bg-black/30"></div>

<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 xl:p-10 text-white">
<div className="max-w-[90%] md:max-w-[500px] pt-4">

<h2 className=" text-xl sm:text-2xl md:text-3xl xl:text-4xl font-heading font-bold">
Our Mission
</h2>

<p className="mt-2 md:mt-4 text-xs sm:text-sm md:text-base xl:text-lg leading-relaxed">
We strive to deliver innovative digital solutions that empower
businesses and create meaningful user experiences through
technology and design.
</p>

</div>
</div>

<svg
viewBox="0 0 850 700"
className="absolute inset-0 w-full h-full pointer-events-none"
preserveAspectRatio="none"
>
<path d="M 45 0 H 408 Q 430 0 448 18 L 544 105 Q 561 122 589 122 H 805 Q 850 122 850 169 V 653 Q 850 700 805 700 H 45 Q 0 700 0 653 V 47 Q 0 0 45 0 Z"
fill="none"
stroke="#ffffff"
strokeWidth="1"
/>
</svg>

</div>
</div>

<div className="pt-0 xl:pt-[115px] w-full">

  <div className="relative w-full max-w-[850px] aspect-[850/700] mx-auto">

    <svg width="0" height="0">
      <defs>
        <clipPath id="missionClipMirrorUpsideLarge" clipPathUnits="objectBoundingBox">
          <path
            transform="translate(1,1) scale(-1,-1) scale(0.00117647,0.00142857)"
            d="
            M 45 0
            H 408
            Q 430 0 448 18
            L 544 105
            Q 561 122 589 122
            H 805
            Q 850 122 850 169
            V 653
            Q 850 700 805 700
            H 45
            Q 0 700 0 653
            V 47
            Q 0 0 45 0
            Z
            "
          />
        </clipPath>
      </defs>
    </svg>

    <img
      alt="img"
      src={ab1}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ clipPath: "url(#missionClipMirrorUpsideLarge)" }}
    />

    <div
      className="absolute inset-0 bg-black/30"
      style={{ clipPath: "url(#missionClipMirrorUpsideLarge)" }}
    ></div>

<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 xl:p-10 text-white pt-12 md:pt-0">
<div className="max-w-[90%] md:max-w-[500px] pb-6 md:pb-[116px]">

<h2 className="text-2xl md:text-3xl xl:text-4xl font-heading font-bold">
Our Vision
</h2>

<p className="mt-2 md:mt-4 text-sm md:text-base xl:text-lg leading-relaxed">
We aim to be a trusted IT and training partner, empowering businesses and individuals with innovative technology and industry-ready skills for meaningful digital experiences .
</p>

</div>
</div>

<svg
viewBox="0 0 850 700"
className="absolute inset-0 w-full h-full pointer-events-none"
preserveAspectRatio="none"
>
<path
transform="translate(850,700) scale(-1,-1)"
d="M 45 0 H 408 Q 430 0 448 18 L 544 105 Q 561 122 589 122 H 805 Q 850 122 850 169 V 653 Q 850 700 805 700 H 45 Q 0 700 0 653 V 47 Q 0 0 45 0 Z"
fill="none"
stroke="white"
strokeWidth="1"
/>
</svg>

  </div>
</div>

</motion.section>

    </section>
  )
}

export default About