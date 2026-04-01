// import CustomShapeCard from "@/components/CustomShapedCard"
import { services } from "@/data/service"
import ScrollToTop from "@/components/ScrollToTop"

import { lazy, Suspense } from "react";
import Loader from "@/components/Loader";

const CustomShapeCard = lazy(() => import('../components/CustomShapedCard'));
const Service = () => {
  return (
 <section className="px-10 font-outfit pb-16 pt-20">
   <ScrollToTop/>
      <p className="font-medium text-[24px] text-[#70A9FF]">services</p>
      <div className="flex justify-between">
      <p className="pt-4 font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl">Complete IT Solutions for <br />
      <span className="text-blue-400"> Your Business Growth </span></p>
      <div className="pt-4">
    

       


          </div>
        </div>
      <p className="pt-4 text-[#ADADAD] text-sm sm:text-base md:text-lg font-outfit max-w-[1400px]">We build simple, smart tech solutions that help businesses grow and keep things moving. From idea to launch, we turn concepts into easy-to-use digital products using modern tech, creative thinking, and a practical, hands-on approach that just works. </p>
    {/* cards */}

      <div className="flex justify-between gap-6 items-end pt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-4">
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