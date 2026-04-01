import LogoLoop from './LogoScroll';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

import { Link } from "react-router-dom";
import img7 from "../../assets/works/works7.webp"
import img2 from "../../assets/works/works2.webp"
import img3 from "../../assets/works/works3.webp"
import img4 from "../../assets/works/works4.webp"
import img5 from "../../assets/works/works5.webp"
import img6 from "../../assets/works/works6.webp"
import img8 from "../../assets/works/works8.webp"
import img9 from "../../assets/works/works9.webp"
import img10 from "../../assets/works/works10.webp"

// const techLogos = [
//   { node: <SiReact />, title: "React", href: "https://react.dev" },
//   { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
//   { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
//   { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
// ];

// Alternative with image sources
const imageLogos = [
  { id: "1", src: img7, alt: "Company 1", link: "/project/learn-mate" },
  { id: "2", src: img2, alt: "Company 2", link: "/project/ziya-academy" },
  { id: "3", src: img3, alt: "Company 3", link: "/project/slams-hunt" },
  { id: "4", src: img4, alt: "Company 4", link: "/project/juggle-laundry" },
  { id: "5", src: img5, alt: "Company 5", link: "/project/Slams-Ride" },
  { id: "6", src: img6, alt: "Company 6", link: "/project/Ziya-Global-Ventures" },
  { id: "8", src: img8, alt: "Company 8", link: "/project/pro-hire" },
  { id: "9", src: img9, alt: "Company 9", link: "/project/Direct-share" },
  { id: "10", src: img10, alt: "Company 10", link: "/project/Slams-grow" },
];

function Loop() {
  return (
    <div className='relative h-[70px] overflow-hidden' >
      {/* Basic horizontal loop */}
     
      
      {/* Vertical loop with deceleration on hover */}
  <LogoLoop
  logos={imageLogos}
  speed={100}
  direction="left"
  logoHeight={60}
  gap={60}
  hoverSpeed={0}
  fadeOut
  renderItem={(logo) => (
    <Link to={logo.link}>
      <div className="h-[60px] w-[60px] min-w-[60px] overflow-hidden rounded-md bg-white flex items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  )}
/>
    </div>
  );
}
export default Loop;