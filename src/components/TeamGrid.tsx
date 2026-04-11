import { AnimatePresence, motion } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

interface Props {
  members: TeamMember[];
  setActiveMember: (member: TeamMember) => void;
}

const cardPositions = [
  { x: 432, y: 49, w: 157, h: 122 },
  { x: 432, y: 174, w: 158, h: 206 },
  { x: 432.684, y: 384.822, w: 98, h: 156 },
  { x: 216.98, y: 286.542, w: 109, h: 201 },
  { x: 80, y: 381, w: 132, h: 107 },
  { x: 330.578, y: 174.223, w: 97, h: 205 },
  { x: 593, y: 174, w: 120, h: 120 },
];

const TeamGrid = ({ members, setActiveMember }: Props) => {

    
  return (
    <div className="relative w-[800px] h-[650px]">

      {/* ✅ SVG LINES (STATIC STRUCTURE) */}
      <svg
        viewBox="0 0 800 650"
        className="absolute inset-0 w-full h-full"
      >
        <path d="M430.133 0V645.837" stroke="white" strokeWidth="1" />
        <path d="M590.953 49.1348V380.998" stroke="white" strokeWidth="1" />
        <path d="M329.301 172.308H799" stroke="white" strokeWidth="1" />
        <path d="M329.301 382.269H700.721" stroke="white" strokeWidth="1" />
        <path d="M428.852 544.047H530.967" stroke="white" strokeWidth="1" />
        <path d="M0 379.716H213.152" stroke="white" strokeWidth="1" />
        <path d="M79.1328 489.483H328.023" stroke="white" strokeWidth="1" />
        <path d="M328.023 84.8774V576.275" stroke="white" strokeWidth="1" />
        <path d="M214.43 179.323V489.489" stroke="white" strokeWidth="1" />
        <path d="M77.8594 380.993V583.934" stroke="white" strokeWidth="1" />
      </svg>

      {/* ✅ CARDS */}
      {members.map((member, index) => {
  const pos = cardPositions[index];
  if (!pos) return null;

        return (
        <motion.div
  key={index}
  onMouseEnter={() => setActiveMember(member)}
  className="absolute overflow-hidden bg-[#111] cursor-pointer rounded-xl group"
  style={{
    left: pos.x,
    top: pos.y,
    width: pos.w,
    height: pos.h,
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.04, zIndex: 20 }}
  transition={{ duration: 0.4 }}
>
  <div className="relative w-full h-full overflow-hidden">

    {/* ✅ IMAGE (NO ANIMATION) */}
    <img
      src={member.image}
      alt={member.name}
      className="absolute inset-0 w-full h-full object-cover 
                 grayscale group-hover:grayscale-0 
                 transition duration-300"
    />

    {/* ✅ SINGLE CLEAN WIPE */}
    <motion.div
      key={member.id}
      className="absolute inset-0 bg-black z-10 pointer-events-none"

      initial={{ y: 0 }}          // fully covered
      animate={{ y: "100%" }}     // wipe down

      transition={{
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1], // 👈 smooth standard easing
      }}
    />

  </div>
</motion.div>
        );
      })}
    </div>
  );
};

export default TeamGrid;