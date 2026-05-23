import { motion } from "framer-motion";
import ceo from "../../assets/founder.jpg";
import ConnectorShape from "../../components/ConnectorShape";


const FoundersMessage: React.FC = () => {
  return (
    <motion.section className="relative bg-black text-white py-4 sm:py-16 lg:py-16 px-5 sm:px-8 lg:px-20 mb-20 overflow-hidden"
    initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} 
 viewport={{ once: true, amount: 0.2 }}>

      {/* SVG defs for image clip */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="founderClip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.12 0
                H 0.82
                L 1 0.18
                V 0.96
                Q 1 1 0.96 1
                H 0.30
                L 0.08 0.82
                V 0.04
                Q 0.08 0 0.12 0
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      <div className="
        relative
        max-w-[1400px]
        2xl:max-w-[1536px]
        3xl:max-w-[1780px]
        mx-auto
        grid
        grid-cols-1
        md:grid-cols-2
        gap-10
        lg:gap-16
        xl:gap-20
        2xl:gap-32
        3xl:gap-48
        4xl:gap-64
        items-center
      ">

        {/* LEFT SIDE */}
        <div className="relative z-10 order-1 md:order-1">
          <div
            className="absolute left-0 top-1/2 h-[82%] w-full max-w-[620px] 3xl:max-w-[820px] -translate-y-1/2 pointer-events-none"
            style={{
              zIndex: 0,
              background:
                "radial-gradient(ellipse 62% 58% at 50% 50%, rgba(59,130,246,0.16) 0%, rgba(37,99,235,0.12) 38%, rgba(30,64,175,0.08) 60%, transparent 80%)",
              filter: "blur(18px)",
            }}
          />

          <div className="relative z-10">

          {/* Heading */}
          <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">

            <h2 className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              whitespace-nowrap
              font-heading
            ">
              Founder's Message
            </h2>

            {/* connector line (hide on mobile/tablet small) */}
            <div className="relative hidden  xl:block ms-5 mt-2 ">
              <ConnectorShape />
            </div>

          </div>

          {/* Paragraphs */}
          <div className="
            space-y-6 3xl:space-y-8 pt-4 text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] 3xl:text-[26px] font-outfit font-light leading-relaxed tracking-wide max-w-[550px] 3xl:max-w-[750px]
          ">

            <p>
              Technology is not just about innovation but about creating
              meaningful solutions. We help businesses grow through reliable IT
              services while empowering young talent with practical,
              industry-ready skills.
            </p>

            <p>
              We believe in learning by doing. Through internships, we offer
              real project exposure, mentorship, and guidance, while our
              service team delivers scalable solutions in app and web
              development, digital marketing, branding, and design.
            </p>

            <p>
              Our commitment to quality and integrity drives continuous
              improvement. We thank our clients, students, and partners for
              trusting us as we build innovative digital experiences and a
              skilled workforce for the future.
            </p>

            <div className="">
              <p className="text-gray-400">Warm regards,</p>
              <p className="text-white font-medium">
                Aslam K A - Founder
              </p>
            </div>

          </div>

          </div>

        </div>


        {/* RIGHT SIDE IMAGE */}
        <div className="  
          relative
          flex
          justify-center
          md:justify-end
          lg:justify-start
          order-2
          md:order-2
        
        ">

          {/* Image container */}
          <div className="
            relative
            w-[200px]
            h-[250px]

            sm:w-[240px]
            sm:h-[300px]

            md:w-[260px]
            md:h-[320px]

            lg:w-[320px]
            lg:h-[430px]
          ">


            {/* Image */}
            <img
            title="team"
              src={ceo}
              className="w-full h-full object-cover  "
              style={{ clipPath: "url(#founderClip)" }}
            />

            {/* Border */}
            <svg
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <path
                d="
                  M 0.12 0
                  H 0.82
                  L 1 0.18
                  V 0.96
                  Q 1 1 0.96 1
                  H 0.30
                  L 0.08 0.82
                  V 0.04
                  Q 0.08 0 0.12 0
                  Z
                "
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="0.010"
              />
            </svg>

          </div>

        </div>

      </div>



      

    </motion.section>
  );
};

export default FoundersMessage;
