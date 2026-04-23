// import img1 from "../../assets/robo.jpg";
// import CustomShapeCard from "../../components/CustomShapedCard";
// import img2 from "../../assets/service2.jpg"
// import img3 from "../../assets/service3.jpg"
// import img4 from "../../assets/service4.jpg"
// import StarBorder from "../../components/StarBorder";
// import { Link } from "react-router-dom";
// const Service = () => {
//   return (
//     <section id="service" className="px-10 font-outfit pb-16 pt-10">
//       <p className="font-medium text-[24px] text-gray-400">/service we offer</p>
//       <div className="flex justify-between">
//       <p className="pt-4 font-medium text-5xl">Complete IT Solutions for <br />
//       <span className="text-blue-400"> Your Business Growth </span></p>
//       <div className="pt-4">
//        {/* <button className="px-6 py-2.5 h-10 border rounded-[50px] border-white text-white text-[15px] font-medium hover:bg-white hover:text-black transition-all">
//             View more
//           </button> */}

//           <StarBorder
//   as={Link} to="/service"
//   className="custom-class"
//   color="cyan"
//   speed="2s"
//    c1="from-black"
//   c2="via-black"
//   c3="to-gray-800"
// >
//    View more
// </StarBorder>


//           </div>
//         </div>
//       <p className="pt-4 text-[#ADADAD] text-[20px] font-outfit max-w-[1100px]">We build simple, smart tech solutions that help businesses grow and keep things moving. From idea to launch, we turn concepts into easy-to-use digital products using modern tech, creative thinking, and a practical, hands-on approach that just works. </p>
//     {/* cards */}

//         <div className="flex justify-between gap-3 items-end pt-10">

//    <CustomShapeCard
//         image={img3}
//         title="Web Development"
//         text="Static & dynamic websites, e-commerce solutions, and custom web applications built with modern technologies"
//         buttonLink="/project/slams"
//       />


//     <CustomShapeCard
//         image={img1}
//         title="AI & Machine Learning"
//         text="Intelligent solutions powered by machine learning, data analytics, and predictive modeling."
//         buttonLink="/project/slams"
//       />
//     <CustomShapeCard
//         image={img2}
//         title="App Development"
//         text="Cross-platform mobile apps for Android & iOS using Flutter and React Native with seamless UX."
//         buttonLink="/project/slams"
//       />
    
//     <CustomShapeCard
//         image={img4}
//         title="Cyber Security"
//         text="Protect your digital assets with vulnerability assessments, penetration testing, and security audits."
//         buttonLink="/project/slams"
//       />
   
//       </div>

//   </section> 
//   )}

// export default Service





import { services } from "@/data/service";
import CustomShapeCard from "@/components/CustomShapedCard";
import { Link } from "react-router-dom";
import ViewMoreButton from "../../components/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Derive visibleCount and grid cols from a single source of truth
function getLayout(width: number): { count: number; cols: string } {
  if (width < 768)  return { count: 2, cols: "grid-cols-1" };
  if (width < 1536) return { count: 3, cols: "grid-cols-3" }; // md, lg, xl — laptop
  return              { count: 4, cols: "grid-cols-4" };       // 2xl — monitor
}

const Service = () => {
  // Start with null so we never flash the wrong count on first render
  const [layout, setLayout] = useState<{ count: number; cols: string } | null>(null);

  useEffect(() => {
    const update = () => setLayout(getLayout(window.innerWidth));
    update(); // run immediately on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Don't render cards until we know the real viewport width
  if (!layout) return null;

  const { count: visibleCount, cols } = layout;

  return (
    <section id="service" className="px-5 md:px-12 2xl:px-16 font-outfit pb-32 pt-10">
      <p className="font-medium text-[20px] md:text-[24px] text-gray-400">
        /service we offer
      </p>

      <motion.div
        className="flex flex-col md:flex-row md:justify-between gap-6"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h1 className="pt-4 font-bold font-outfit text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-tight tracking-tight">
          Complete IT Solutions for <br />
          <span className="bg-[linear-gradient(90deg,_#579AFF_0%,_#345D99_100%)] bg-clip-text text-transparent">
            Your Business Growth
          </span>
        </h1>

        {/* Desktop button */}
        <div className="pt-4 hidden md:block">
          <Link to="/service">
            <ViewMoreButton text="View More" />
          </Link>
        </div>
      </motion.div>

      <motion.p
        className="pt-4 text-[#ADADAD] text-[16px] md:text-[20px] font-outfit max-w-[1100px]"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        As a trusted IT company in Kochi, we provide complete software and digital solutions
        tailored for startups, businesses, and enterprises. Our goal is to deliver simple,
        scalable, and result-driven technology.
      </motion.p>

      {/* Cards — grid cols driven by the same breakpoint logic, not separate Tailwind classes */}
      <motion.div
        className={`grid gap-6 pt-16 ${cols}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {services.slice(0, visibleCount).map((service) => (
          <motion.div
            key={service.id}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            <Link to={`/service/${service.id}`}>
              <CustomShapeCard
                image={service.image}
                title={service.title}
                text={service.text}
                buttonLink={`/service/${service.id}`}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile View More Button */}
      <div className="mt-10 md:hidden w-full">
        <Link to="/service">
          <button className="w-full flex justify-center py-3 text-lg border rounded-[10px]">
            View More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Service;