// import vid from "../../assets/robovid.mp4"
// import AnimatedLinkButton from "../../components/AnimatedLinkButton";

// export default function HeroPage() {
//   return (
//     <section id="hero" className="relative w-full h-screen overflow-hidden px-6">

//       {/* SVG clipPath responsive */}
//       <svg width="0" height="0">
//         <defs>
//           <clipPath id="heroClip" clipPathUnits="objectBoundingBox">

//             {/* 30px ≈ 0.025 in normalized units */}
//             <path d="
//               M0.025,0
//               H0.975
//               A0.025,0.025 0 0 1 1,0.025
//               V0.975
//               A0.025,0.025 0 0 1 0.975,1
//               H0.45
//               L0.25,0.87
//               L0.025,0.87
//               A0.025,0.025 0 0 1 0,0.845
//               V0.025
//               A0.025,0.025 0 0 1 0.025,0
//               Z
//             "/>

//           </clipPath>
//         </defs>
//       </svg>

//       {/* Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover pt-2 px-3 pb-12"
//         style={{
//           clipPath: "url(#heroClip)"
//         }}
//       >
//         <source src={vid} type="video/mp4" />
//       </video>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/20 pointer-events-none" />
// <div className="absolute z-10 bottom-48 left-12 text-white ">        <p className="text-6xl px-12  font-bold uppercase leading-[60px]">Innovative <span className="text-6xl ">IT </span> Solutions <br /> for a Digital World</p>
//         <p className="text-[20px] leading-[20px] pl-12 pt-4 font-medium max-w-[840px]">Slams Edu Tech delivers smart, scalable technology solutions that help businesses  grow faster, operate more efficiently, and stay ahead through continuous innovation.</p>
       

// <div className="flex gap-4 pt-6 pl-12">
//   <AnimatedLinkButton to="/service">
//     Discover Our Services
//   </AnimatedLinkButton>

//   <AnimatedLinkButton to="/internship">
//     Apply for Internship
//   </AnimatedLinkButton>
// </div>

//       </div>
//     </section>
//   )
// }





import img1 from "../../assets/works/works2.webp"
import img2 from "../../assets/works/works2.webp"
import img3 from "../../assets/works/works3.webp"

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
    <section id="hero" className="relative w-full h-screen overflow-hidden px-6">

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
        <source src="/robovid.mp4" type="video/mp4" />
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
      <div className="absolute z-10 bottom-28 md:bottom-48 left-6 md:left-12 text-white max-w-[925px]">

        <p className="text-3xl md:text-[66px] font-[500] tracking-tight font-heading uppercase leading-tight md:leading-[60px] md:px-12">
          Innovative <span>IT </span> Solutions <br /> for a Digital World
        </p>

        <p className="text-[18px] font-outfit font-[200] md:text-[22px] tracking-wide leading-[22px] md:leading-[24px] md:pl-12 pt-4 font-medium max-w-[840px]">
          Slams Edu Tech delivers smart, scalable technology solutions that help businesses
          grow faster, operate more efficiently, and stay ahead through continuous innovation.
        </p>

        <div className="flex flex-col md:flex-row gap-4 pt-6 md:pl-10 pr-6">

          <AnimatedLinkButton to="/service">
            Discover Our Services
          </AnimatedLinkButton>

         <AnimatedLinkButton to="/careers#internships">
  Apply for Internship
</AnimatedLinkButton>

        </div>

      </div>

    </section>
  )
}