import { lazy, Suspense } from "react";
import Loader from "@/components/Loader";
import { useInView } from "react-intersection-observer";

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
const WhyChooseUs = lazy(() => import("../sections/Home/WhyChooseUs"));
const Faq = lazy(() => import("../sections/Home/Faq"));
const ContactSection = lazy(() => import("../sections/Home/GetInTouch"));

/* ✅ Common Loader Wrapper */
const SectionLoader = (
  <div className="p-10">
    <Loader />
  </div>
);

const Home = () => {
  return (
    <div className="">
      {/* 🚀 Above the fold (NO LazySection) */}
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

      {/* ⚡ Heavy Sections (LazySection + Suspense) */}
      <LazySection>
        <Suspense fallback={SectionLoader}>
          <Team />
        </Suspense>
      </LazySection>

      <Suspense fallback={SectionLoader}>
        <Build />
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