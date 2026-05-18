import { lazy, Suspense, useEffect } from "react";
import Loader from "@/components/Loader";
import { useInView } from "react-intersection-observer";
import SEO from "../components/SEO";
import ScrollToTop from "@/components/ScrollToTop";
import { useLocation } from "react-router-dom";

/* ✅ Reusable LazySection */
const LazySection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  return (
    <div ref={ref}>
      {inView ? children : <div className="h-[500px]" />}
    </div>
  );
};

/* ✅ Lazy Imports */
const HeroPage = lazy(() => import("../sections/Home/HeroPage"));
const Service = lazy(() => import("../sections/Home/Service"));
const Works = lazy(() => import("../sections/Home/Works"));
const About = lazy(() => import("../sections/Home/About"));
const Team = lazy(() => import("../sections/Home/Team"));
const FoundersMessage = lazy(() => import("../sections/Home/FounderMessage"));
const Robo = lazy(() => import("../sections/Home/Robo"));
const Build = lazy(() => import("../sections/Home/Build"));
const SmartSolutions = lazy(() => import("../sections/Home/SmartSolutions"));
const WhyChooseUs = lazy(() => import("../sections/Home/WhyChooseUs"));
const Testimonial = lazy(() => import("../sections/Home/Testimonial"));
const Faq = lazy(() => import("../sections/Home/Faq"));
const ContactSection = lazy(() => import("../sections/Home/GetInTouch"));

/* ✅ Common Loader Wrapper */
const SectionLoader = (
  <div className="p-10">
    <Loader />
  </div>
);

const Home = () => {
  const location = useLocation();

  /* 🔥 HASH SCROLL FIX (FINAL) */
  useEffect(() => {
    if (location.hash === "#contact") {
      const scrollToContact = () => {
        const el = document.getElementById("contact");

        if (el) {
          const yOffset = -90; // adjust based on navbar height
          const y =
            el.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          // retry until element is mounted (because of lazy loading)
          setTimeout(scrollToContact, 100);
        }
      };

      scrollToContact();
    }
  }, [location]);

  return (
    <div className="">
      <SEO
        title="Best IT Company in Kochi | Slam Tech"
        description="Looking for the Best IT Company in Kochi? Slam Tech Offers Expert IT Consulting, Software Development, and Digital Solutions to Help Businesses Grow"
        keywords="Best IT Company in Kochi"
      />

      <ScrollToTop />

      {/* 🚀 Above the fold */}
      <Suspense fallback={SectionLoader}>
        <HeroPage />
      </Suspense>

      <Suspense fallback={SectionLoader}>
        <Service />
      </Suspense>

      <Suspense fallback={SectionLoader}>
        <Works />
      </Suspense>

      <Suspense fallback={SectionLoader}>
        <About />
      </Suspense>

      <Suspense fallback={SectionLoader}>
        <FoundersMessage />
      </Suspense>

      {/* ⚡ Heavy Sections */}
      <LazySection>
        <Suspense fallback={SectionLoader}>
          <Team />
        </Suspense>
      </LazySection>

      <Suspense fallback={SectionLoader}>
        <Build />
      </Suspense>

      <Suspense fallback={SectionLoader}>
        <SmartSolutions />
      </Suspense>

      <LazySection>
        <Suspense fallback={SectionLoader}>
          <Robo />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={SectionLoader}>
          <WhyChooseUs />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={SectionLoader}>
          <Testimonial />
        </Suspense>
      </LazySection>

      {/* 📄 Light Sections */}
      <Suspense fallback={SectionLoader}>
        <Faq />
      </Suspense>

      <Suspense fallback={SectionLoader}>
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default Home;
