import { useParams } from "react-router-dom"
import { projects } from "../data/projects"
import { useEffect,useState } from "react"
import ScrollToTop from "./ScrollToTop"
export default function ProjectDetail() {

  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  )

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!project) {
    return <div className="p-10 text-xl">Project not found</div>
  }


  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 md:py-20 max-w-full mx-auto">
      <ScrollToTop/>

      {/* SVG clipPaths */}
      <svg width="0" height="0">
        <defs>

<clipPath id="heroClip" clipPathUnits="objectBoundingBox">
<path d="
M0.44,0.13
L0.56,0
H0.98
A0.02,0.02 0 0 1 1,0.02
V0.98
A0.02,0.02 0 0 1 0.98,1
H0.02
A0.02,0.02 0 0 1 0,0.98
V0.15
A0.02,0.02 0 0 1 0.02,0.13
Z"/>
</clipPath>

<clipPath id="cardClip" clipPathUnits="objectBoundingBox">
<path d="
M0.44,0.13
A0.015,0 0 0 1 0.455,0.115
L0.545,0.015
A0.0,0 0 0 1 0.56,0
H0.98
A0.02,0.02 0 0 1 1,0.02
V0.98
A0.02,0.02 0 0 1 0.98,1
H0.02
A0.02,0.02 0 0 1 0,0.98
V0.15
A0.02,0.02 0 0 1 0.02,0.13
Z"/>
</clipPath>

<clipPath id="cardClip2" clipPathUnits="objectBoundingBox">
<path d="
M0.45,0
A0.015,0 0 0 1 0.465,0.01
L0.555,0.12
A0.015,0 0 0 1 0.57,0.13
H0.98
A0.02,0.02 0 0 1 1,0.15
V0.98
A0.02,0.02 0 0 1 0.98,1
H0.02
A0.02,0.02 0 0 1 0,0.98
V0.02
A0.02,0.02 0 0 1 0.02,0
H0.45
Z"/>
</clipPath>

<clipPath id="showcaseClip" clipPathUnits="objectBoundingBox">
<path d="
M0.02,0
H0.98
A0.02,0.02 0 0 1 1,0.02
V0.98
A0.02,0.02 0 0 1 0.98,1
H0.02
A0.02,0.02 0 0 1 0,0.98
V0.02
A0.02,0.02 0 0 1 0.02,0
Z"/>
</clipPath>

        </defs>
      </svg>


      {/* Title */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#70A9FF] to-[#436599] bg-clip-text text-transparent">
          {project.title}
        </h1>

        <p className="text-gray-200 text-lg md:text-[24px] pt-4 max-w-4xl">
          {project.subtitle}
        </p>
      </div>


      {/* Hero Image */}
      <img
        src={project.images.heroImage}
        alt={project.title}
        className="w-full max-h-[400px] sm:max-h-[500px] md:max-h-[800px] mb-10 object-cover rounded-[20px]"
      />


      {/* Description */}
      <p className="text-2xl md:text-[40px] mb-2">About</p>

      <p className="text-gray-300 mb-16 text-base md:text-[20px]">
        {project.description}
      </p>


      {/* Image Grid */}
     <div className="flex flex-col md:flex-row items-center mb-16 gap-8">

  {/* Laptop image */}
  <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]">
    <img
      src={project.images.laptop}
      alt="Laptop view"
      style={{ clipPath: "url(#cardClip2)" }}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Timeline indicator */}
  <div className="flex md:flex-col items-center justify-center">

    <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>

    <div className="w-4 h-4 rounded-full bg-gray-300 mx-2 md:my-2"></div>

    <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>

  </div>

  {/* Mobile image */}
  <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]">
    <img
      src={project.images.mobile}
      alt="Mobile view"
      style={{ clipPath: "url(#cardClip)" }}
      className="w-full h-full object-cover"
    />
  </div>

</div>



      {/* Heading Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-16 gap-8 md:gap-6 md:pl-12">

        <div>
          <p className="text-2xl md:text-[40px]">{project.head}</p>
        </div>

        <div>
          {project.head2.map((heading, index) => (
            <div key={index} className="mb-4">

              <p className="text-xl md:text-[36px] p-2">{heading}</p>

              <hr className="my-4"/>

              <p className="text-gray-400 p-2 text-sm md:text-[20px]">
                {project.sub[index]}
              </p>

            </div>
          ))}
        </div>

      </div>



      {/* Second Image Grid */}
   <div className="flex flex-col md:flex-row items-center mb-16 gap-8">

  {/* Laptop image */}
  <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]">
    <img
      src={project.images.showcase1}
      alt="Laptop view"
      style={{ clipPath: "url(#cardClip2)" }}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Timeline indicator */}
  <div className="flex md:flex-col items-center justify-center">

    <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>

    <div className="w-4 h-4 rounded-full bg-gray-300 mx-2 md:my-2"></div>

    <div className="h-[1px] w-16 md:w-[1px] md:h-32 bg-gray-500"></div>

  </div>

  {/* Mobile image */}
  <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]">
    <img
      src={project.images.showcase2}
      alt="Mobile view"
      style={{ clipPath: "url(#cardClip)" }}
      className="w-full h-full object-cover"
    />
  </div>

</div>



      {/* Showcase */}
      <img
        src={project.images.showcase}
        alt="Project showcase"
        style={{ clipPath: "url(#showcaseClip)" }}
        className="w-full max-h-[350px] sm:max-h-[500px] md:max-h-[800px] mb- object-cover"
      />
   
 {isLargeScreen && (
    <div className="w-full flex justify-center ">
      <svg
        viewBox="0 0 600 260"
        className="w-full max-w-[700px] h-auto"
        fill="none"
        stroke="#d1d5db"
        strokeWidth="2"
      >
        {/* vertical line */}
        <line x1="300" y1="0" x2="300" y2="100" />

        {/* diagonal lines */}
        <line x1="280" y1="140" x2="100" y2="270" />
        <line x1="340" y1="160" x2="550" y2="270" />

        {/* circles */}
        <circle cx="300" cy="120" r="16" fill="#d1d5db" />

        <circle cx="270" cy="150" r="16" fill="#d1d5db" />
        <circle cx="330" cy="150" r="16" fill="#d1d5db" />
      </svg>
    </div>
 )}



      {/* Challenge + Features */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ${isLargeScreen ? "" : "pt-6"}`}>

        <div className="border border-neutral-700 rounded-xl p-6 ">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Challenge</h3>

          <ul className="space-y-2 text-gray-300 text-sm md:text-base">
            {project.challenge.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>

        <div className="border border-neutral-700 rounded-xl p-6 ">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Key Features</h3>

          <ul className="space-y-2 text-gray-300 text-sm md:text-base">
            {project.features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </div>

      </div>

     <div className="rounded-[20px] overflow-hidden py-6">
  <img
    src={project.images.lastimg}
    alt="showcase"
    style={{ clipPath: "url(#showcaseClip)" }}
    className="w-full max-h-[350px] sm:max-h-[500px] md:max-h-[800px] object-cover"
  />
</div>

    </section>
  )
}