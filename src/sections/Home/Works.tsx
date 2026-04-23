// import StarBorder from "../../components/StarBorder";
// import WorksCard from '../../components/WorksCard';

// import { projects } from "@/data/projects";
// import { Link } from "react-router-dom";
// const Works = () => {
//   return (
//     <section id="works" className='bg-black px-10 pt-[112px]'>

//  <p className="font-medium text-[24px] text-gray-400">/ Our Works</p>
//       <div className="flex justify-between">
//       <p className="pt-4 font-medium text-5xl">Smart Solutions for a
//       <span className="text-blue-400"> Digital World </span></p>
//       <div className="pt-4">
//         <StarBorder
//   as={Link} to="/works"
//   className="custom-class"
//   color="cyan"
//   speed="2s"
//     c1="from-gray-950"
//     c2="via-gray-850"
//     c3="to-gray-800"
// >
//    View more
// </StarBorder>
//           </div>
//         </div>
//               <p className="pt-4 text-[#ADADAD] text-[20px] font-outfit max-w-[1100px]">From ideas to execution, we build digital solutions <br /> that help your business grow and stay ahead. </p>


//                <div className="flex justify-between gap-6 items-end pt-10 grid grid-cols-4">
//   {projects.slice(0, 4).map((project) => (
//     <Link key={project.id} to={`/project/${project.id}`}>
//       <WorksCard
//         image={project.coverImage}
//         name={project.title}
//         stack={project.subtitle}
//       />
//     </Link>
//   ))}
// </div>




//     </section>
//   )
// }

// export default Works





import { motion } from "framer-motion";
import StarBorder from "../../components/StarBorder";
import WorksCard from '../../components/WorksCard';
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import ViewMoreButton from "../../components/Button";
import { useEffect, useState } from "react";



const Works = () => {




  return (
    <section id="works" 
    className='bg-[#1d1b1b] px-5 md:px-12 2xl:px-16 font-outfit pt-[60px] pb-[20px]'
    >

      <p className="font-medium text-[20px] md:text-[24px] text-gray-400">/ Our Works</p>

      <motion.div className="flex flex-col md:flex-row md:justify-between gap-6"
       initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} 
 viewport={{ once: true, amount: 0.2 }}>
       <h1 className="pt-4 font-bold font-outfit text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-tight tracking-tight">
  Digital Solutions That{" "}
  <span className="bg-[linear-gradient(90deg,_#579AFF_0%,_#345D99_100%)] bg-clip-text text-transparent">
  Deliver Results
</span>
</h1>

        {/* Desktop button */}
             <div className="pt-4 hidden md:block">
  <Link to="/works">
    <ViewMoreButton text=" View More" />
  </Link>
</div>
      </motion.div>

      <p className="pt-4 text-[#ADADAD] tracking-wider text-[16px] md:text-[20px] font-outfit max-w-[1100px]">
        We design and develop real-world digital solutions that help businesses grow and stay ahead in a competitive market.
      </p>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pt-12 pb-16"
               // className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10 "       

          initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // 🔥 THIS MAKES IT PREMIUM
      },
    },
  }}>
    
  {projects.slice(0,4).map((project) => (      
    
    <motion.div
          key={project.id}
    variants={{
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    }}>
          <Link  to={`/project/${project.id}`}>
            
            <WorksCard
              image={project.coverImage}
              name={project.title}
              stack={project.subtitle}
            />
          </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile View More Button */}
      {/* <div className="mt-10 md:hidden w-full">
        <StarBorder
          as={Link}
          to="/works"
          className="w-full "
          color="cyan"
          speed="2s"
          c1="from-gray-950"
          c2="via-gray-850"
          c3="to-gray-800"
        >
          View more
        </StarBorder>
      </div> */}

       <div className="mt-10 md:hidden w-full">
               <Link to="/works">
                <button className="w-full flex justify-center py-3 text-lg border rounded-[10px]">View More</button>
        </Link>
            </div>

    </section>
  )
}

export default Works