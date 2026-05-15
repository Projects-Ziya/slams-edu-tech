import { projects } from "@/data/projects";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "../components/SEO";
import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";
import WorksHero from "../components/WorksHero";

const ProjectScene = lazy(() => import("../components/ProjectScene"));

// ─── color assignment for each project (by title or slug) ───
const colorMap: Record<string, "orange" | "violet" | "cyan" | "emerald" | "default"> = {
  "direct share": "orange",
  "ziya learn mate": "violet",
  "slams ride": "cyan",
  "ziya global ventures": "emerald",
};

const getGradientColor = (title: string) =>
  colorMap[title.toLowerCase()] || "default";

const Works = () => {
  return (
    <div className="relative bg-black min-h-screen">
      <SEO
        title="Web & App Development Company in Kochi | Expert Solutions"
        description="Choose a Leading Web & App Development Company in Kochi Offering Custom Websites, Mobile Apps, and Scalable Digital Solutions. Contact us Today Slams Tech"
        keywords="Web Development Company in Kochi"
      />
      <ScrollToTop />

      <WorksHero />

      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Loader className="text-white animate-spin" />
          </div>
        } 
      >
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectScene
              key={project.id}
              id={project.id}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description || project.subtitle} // fallback if no description
              images={[
                project.coverImage,
                project.images?.laptop || project.coverImage,
                project.images?.mobile || project.coverImage
              ]}
              gradientColor={getGradientColor(project.title)}
              index={index}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Works;