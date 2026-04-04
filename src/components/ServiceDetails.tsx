import { useParams } from "react-router-dom";
import { services } from "../data/service";
import { HashLink } from "react-router-hash-link";
import ScrollToTop from "./ScrollToTop";

const ServiceDetails = () => {
  const { id } = useParams();

  const service = services.find((item) => item.id === id);

  if (!service) {
    return <div className="text-white p-6">Service not found</div>;
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 bg-black text-white">
      <ScrollToTop />

      {/* HERO */}
      <section className="mx-auto mt-10 py-10 sm:py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-16">

        <div className="flex-1">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium mb-4 leading-tight">
            {service.title} <br />
            <span className="text-blue-400">Solutions</span> for Your <br />
            Business
          </p>

          <p className="text-sm sm:text-base md:text-lg max-w-[650px] mb-6 text-gray-300">
            {service.text}
          </p>

          <button className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base">
            Start Your Project
          </button>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <img
            src={service.image}
            alt={service.title}
            className="rounded-xl w-full max-w-[320px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px] 
            h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto py-10 sm:py-12 md:py-16">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-medium mb-4">
          About The Service
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
          {service.about}
        </p>
      </section>

      {/* WHAT WE OFFER */}
      <section className="mx-auto py-10 sm:py-12 md:py-16">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-8 sm:mb-10">
          What We Offer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {service.offers?.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="border border-gray-700 p-5 sm:p-6 md:p-8 rounded-xl min-h-[200px]"
              >
                <Icon className="mb-4 text-blue-400" />

                <p className="mb-2 font-medium text-base sm:text-lg md:text-xl leading-tight">
                  {item.title}
                </p>

                <p className="text-gray-400 text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="bg-black text-white py-10 sm:py-12 md:py-16">
        <div className="mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-8 sm:mb-12">
            Technologies we use
          </h2>

          {/* Desktop */}
          <div className="relative hidden md:block">
            <div className="absolute top-2 left-0 w-full border-t border-dotted border-gray-500"></div>

            <div className="flex justify-between items-start relative">
              {service.technologies.map((tech, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div className="w-px h-16 md:h-20 bg-gray-500 mt-2"></div>
                  <div className="w-2 h-2 bg-white rounded-full z-10"></div>

                  <p className="mt-2 text-gray-300 text-sm sm:text-base md:text-lg font-medium text-center">
                    {tech}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
            {service.technologies.map((tech, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg p-3 sm:p-4 text-center text-gray-300 text-sm sm:text-base"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#0d0d0d] text-white py-12 sm:py-16 md:py-20 lg:py-24 px-2 sm:px-4 md:px-6 lg:px-10">
        <div className="mx-auto">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-medium mb-10 md:mb-16 text-center">
            Our Process
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-y-12 lg:gap-y-20">
            {service.steps.map((step, index) => {
              let alignClass = "";
              if (step.position === "left") alignClass = "lg:justify-self-start";
              if (step.position === "center") alignClass = "lg:justify-self-center";
              if (step.position === "right") alignClass = "lg:justify-self-end";

              return (
                <div
                  key={index}
                  className={`relative w-full max-w-[320px] mx-auto ${alignClass}`}
                >
                  <div className="relative p-5 sm:p-6 bg-[#151515] rounded-xl border border-gray-800 lg:bg-transparent lg:border-none">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl sm:text-3xl md:text-[32px] text-gray-400 font-semibold">
                        {step.number}
                      </span>

                      <h3 className="text-base sm:text-lg md:text-xl font-medium">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto py-10 sm:py-12 flex justify-center">
        <div className="bg-blue-900 rounded-2xl w-full max-w-[900px] text-center py-8 sm:py-10 md:py-12 px-4 md:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Ready to Start Your Project?
          </h2>

          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Let’s discuss how we can help bring your vision to life
          </p>

          <HashLink smooth to="/#contact">
            <button className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base">
              Get a Quote
            </button>
          </HashLink>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;