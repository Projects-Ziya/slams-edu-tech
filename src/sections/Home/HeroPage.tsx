import img1 from "../../assets/works/works2.webp"
import img2 from "../../assets/works/works2.webp"
import img3 from "../../assets/works/works3.webp"
import herovid from "../../assets/robovid.mp4"

import AnimatedLinkButton from "../../components/AnimatedLinkButton";
import { useState, useEffect } from "react";

export default function HeroPage() {

  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden px-4 sm:px-6">

      {/* SVG clipPath (desktop only) */}
      <svg width="0" height="0" className="hidden md:block">
        <defs>
          <clipPath id="heroClip" clipPathUnits="objectBoundingBox">
            <path d="
              M0.025,0
              H0.975
              A0.025,0.025 0 0 1 1,0.025
              V0.975
              A0.025,0.025 0 0 1 0.975,1
              H0.45
              L0.25,0.87
              L0.025,0.87
              A0.025,0.025 0 0 1 0,0.845
              V0.025
              A0.025,0.025 0 0 1 0.025,0
              Z
            "/>
          </clipPath>
        </defs>
      </svg>

      {/* Desktop / Laptop VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-fallback.jpg"
        className="hidden md:block absolute inset-0 w-full h-full object-cover pt-2 px-3 pb-12"
        style={{ clipPath: "url(#heroClip)" }}
      >
        <source src={herovid} type="video/mp4" />
      </video>

      {/* MOBILE IMAGE CAROUSEL */}
      <div className="md:hidden absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="hero"
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Text Content */}
      <div className="absolute z-10 bottom-20 sm:bottom-24 md:bottom-48 left-4 sm:left-6 md:left-12 text-white w-full max-w-[95%] sm:max-w-[90%] md:max-w-[925px]">

        <p className="text-[28px] sm:text-[34px] md:text-[52px] lg:text-[66px] font-[500] tracking-tight font-heading uppercase leading-tight md:leading-[60px] md:px-8 lg:px-12">
          IT Solutions for a Smarter Digital World
        </p>

        <p className="text-[15px] sm:text-[16px] md:text-[20px] lg:text-[22px] font-outfit font-[300] tracking-wide leading-6 md:leading-7 md:pl-8 lg:pl-12 pt-4 max-w-[100%] sm:max-w-[95%] md:max-w-[840px]">
          Slams EduTech is a best IT company in Kochi offering web development, mobile app development, AI solutions, and industry-focused internships. We help businesses grow faster with scalable technology and practical digital solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 md:pl-6 lg:pl-10 pr-4 sm:pr-6">

          <AnimatedLinkButton to="/service">
            Discover Our Services
          </AnimatedLinkButton>

          <AnimatedLinkButton to="/careers#internships">
            Apply for Internship
          </AnimatedLinkButton>

        </div>

      </div>
        <p className="text-black">Best IT Company in Kochi for Smart Digital Solutions & Internships
</p>

    </section>
  )
}