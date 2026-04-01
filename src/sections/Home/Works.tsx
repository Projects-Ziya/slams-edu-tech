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





import StarBorder from "../../components/StarBorder";
import WorksCard from '../../components/WorksCard';

import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const Works = () => {
  return (
    <section id="works" className='bg-black px-5 md:px-10 md:pt-[112px]'>

      <p className="font-medium text-[20px] md:text-[24px] text-gray-400">/ Our Works</p>

      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <p className="pt-4 font-extrabold font-heading tracking-tight text-4xl md:text-[52px]">
          Smart Solutions for a
          <span className="text-blue-400"> Digital World </span>
        </p>

        {/* Desktop button */}
        <div className="pt-4 hidden md:block">
          <StarBorder
            as={Link}
            to="/works"
            className="custom-class"
            color="cyan"
            speed="2s"
            c1="from-gray-950"
            c2="via-gray-850"
            c3="to-gray-800"
          >
            View more
          </StarBorder>
        </div>
      </div>

      <p className="pt-4 text-[#ADADAD] tracking-wider text-[16px] md:text-[20px] font-outfit max-w-[1100px]">
        From ideas to execution, we build digital solutions <br />
        that help your business grow and stay ahead.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
        {projects.slice(0, 4).map((project) => (
          <Link key={project.id} to={`/project/${project.id}`}>
            <WorksCard
              image={project.coverImage}
              name={project.title}
              stack={project.subtitle}
            />
          </Link>
        ))}
      </div>

      {/* Mobile View More Button */}
      <div className="mt-10 md:hidden w-full">
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
      </div>

    </section>
  )
}

export default Works