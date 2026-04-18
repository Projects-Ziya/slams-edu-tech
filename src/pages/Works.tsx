// import WorksCard from '../components/WorksCard';
// import img1 from "../assets/works/works1.webp"

import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from "../components/SEO";


import { lazy, Suspense } from "react";
import { Loader } from 'lucide-react';

const WorksCard = lazy(() => import('../components/WorksCard'));
const Works = () => {
  return (
<section className=' px-6 pt-[112px]'>
  <SEO
  title="Web & App Development Company in Kochi | Expert Solutions"
  description="Choose a Leading Web & App Development Company in Kochi Offering Custom Websites, Mobile Apps, and Scalable Digital Solutions. Contact us Today Slams Edutech"
  keywords="Web Development Company in Kochi"
/>
   <ScrollToTop/>

 <p className="font-medium text-[24px] text-[#70A9FF]">Works</p>
      <div className="flex justify-between">
      <p className="pt-4 font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl">Smart Solutions for a
      <span className="text-blue-400"> Digital World </span></p>
      <div className="pt-4">
      
          </div>
        </div>
              <p className="pt-4 text-[#ADADAD] text-[20px] text-sm sm:text-base md:text-lg font-outfit max-w-[1100px]">As a leading web development company in Kochi, Slams EduTech delivers high-quality websites and mobile applications for startups and businesses. Explore our work and see how we turn ideas into real digital solutions. </p>


      <div className="justify-between gap-6 items-end pt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] xl:grid-cols-3 2xl:grid-cols-4">

  <Suspense fallback={<div className="text-white"><Loader/></div>}>
    {projects.map((project) => (
      <Link key={project.id} to={`/project/${project.id}`}>
        <WorksCard
          image={project.coverImage}
          name={project.title}
          stack={project.subtitle}
        />
      </Link>
    ))}
  </Suspense>

</div>

    </section> 
    
  )
}

export default Works