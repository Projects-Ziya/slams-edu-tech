// import CustomShapeCard from "@/components/CustomShapedCard"
import { services } from "@/data/service"
import ScrollToTop from "@/components/ScrollToTop"

import { lazy, Suspense } from "react";
import Loader from "@/components/Loader";
import SEO from "../components/SEO";


const CustomShapeCard = lazy(() => import('../components/CustomShapedCard'));
const Service = () => {
  return (
 <section className="px-6 font-outfit pb-16 pt-20">

<SEO
  title="Best Software Development Company | Custom services"
  description="Best Software Development Company Offering Custom Software, Web, and Mobile app Development Services to Help Your Business Grow Faster"
  keywords="Best Software Development Company"
/>

   <ScrollToTop/>
      <p className="font-medium text-[24px] text-[#70A9FF]">services</p>
      <div className="flex justify-between">
      <p className="pt-4 font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl">Best Software Development Company for <br /> your 
      <span className="text-blue-400">  Business Growth </span></p>
      <div className="pt-4">
    

       


          </div>
        </div>
      <p className="pt-4 text-[#ADADAD] text-sm sm:text-base md:text-lg font-outfit max-w-[1400px]">Slams EduTech delivers custom web, mobile, and business software designed to scale. As a trusted software development company, we work with startups and growing businesses to turn ideas into reliable, high-performance digital products. </p>
    {/* cards */}

      <div className="justify-between gap-6 items-end pt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] xl:grid-cols-3">
          <Suspense fallback={<div className="text-white"><Loader/></div>}>

      {services.map((service) => (
          <CustomShapeCard
              key={service.id}

            image={service.image}
            title={service.title}
            text={service.text}
            buttonLink={`/service/${service.id}`}
          />
      ))}
      </Suspense>
    </div>

  </section>   )
}

export default Service