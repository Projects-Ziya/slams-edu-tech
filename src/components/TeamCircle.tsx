import { motion } from "framer-motion";
import member1 from "../assets/member1.webp";
import member2 from "../assets/member2.webp";
import member3 from "../assets/member3.webp";
import member4 from "../assets/member4.webp";
import member5 from "../assets/member5.webp";
import member6 from "../assets/member6.webp";

import member7 from "../assets/member6.webp";
import member8 from "../assets/member5.webp";
import member9 from "../assets/member4.webp";
import member10 from "../assets/member3.webp";
import member11 from "../assets/member2.webp";
import member12 from "../assets/member1.webp";

import sreekutty from "../assets/sreekutty.webp";
import alfread from "../assets/alfred.webp";
import hr from "../assets/HR.webp";
import anoop from "../assets/anoop.webp";
import noufal from "../assets/noufal.webp";
import akshay from "../assets/Akshay-ui.webp";

import Segment from "./Segment";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

interface TeamCircleProps {
  setActiveMember: (member: TeamMember | null) => void;
  groupIndex: number;
  rotate: number;
}

const teamGroups: TeamMember[][] = [
  [
    { id: 1, name: "Anugrah Sivadasan", role: "Frontend Developer", image: member1 },
    { id: 2, name: "Jesna", role: "Finance Head", image: member2 },
    { id: 3, name: "Ashvin Kunnirikkal", role: "AI/ML Engineer", image: member3 },
    { id: 4, name: "Akshay", role: "Frontend Developer", image: member4 },
    { id: 5, name: "Athulya Jinu", role: "UI/UX Developer", image: member5 },
    { id: 6, name: "Cinda Sibichan", role: "Python Developer", image: member6 },
  ],
  [
    { id: 7, name: "Sreekutty", role: "Operation Head", image: sreekutty },
    { id: 8, name: "Fayas", role: "Hr", image: hr },
    { id: 9, name: "Alfread", role: "Digital Market", image: alfread },
    { id: 10, name: "Anoop", role: "Python", image: anoop },
    { id: 11, name: "Noufal", role: "UI/UX", image: noufal },
    { id: 12, name: "Akshay", role: "UI/UX", image: akshay },
  ],
  [
    { id: 8, name: "Member 8", role: "Designer", image: member8 },
    { id: 7, name: "Member 7", role: "Developer", image: member7 },
    { id: 10, name: "Member 10", role: "Engineer", image: member10 },
    { id: 9, name: "Member 9", role: "Engineer", image: member9 },
    { id: 12, name: "Member 12", role: "Developer", image: member12 },
    { id: 11, name: "Member 11", role: "Manager", image: member11 },
  ],
];

const imageSettings = [
  { rotate: -332, offsetX: 0, offsetY: 22, scale: 1.0 },
  { rotate: -25, offsetX: 10, offsetY: 55, scale: 1.0 },
  { rotate: -80, offsetX: 50, offsetY: -25, scale: 1.0 },
  { rotate: -150, offsetX: 30, offsetY: -10, scale: 1.0 },
  { rotate: 150, offsetX: 30, offsetY: -15, scale: 1.1 },
  { rotate: 90, offsetX: -15, offsetY: -25, scale: 1.05 },
];

const baseAngle = -30;
const step = 60;
const gapAdjust = 4;

const segmentSettings = [
  { angle: baseAngle + step * 0 + gapAdjust, radius: 182, offsetX: 75, offsetY: -22 },
  { angle: baseAngle + step * 1 + gapAdjust, radius: 179, offsetX: 82, offsetY: -87 },
  { angle: baseAngle + step * 2 + gapAdjust, radius: 180, offsetX: 30, offsetY: -123 },
  { angle: baseAngle + step * 3 + gapAdjust, radius: 180, offsetX: -32, offsetY: -93 },
  { angle: baseAngle + step * 4 + gapAdjust, radius: 180, offsetX: -32, offsetY: -30 },
  { angle: baseAngle + step * 5 + gapAdjust, radius: 185, offsetX: 16, offsetY: 5 },
];

const segmentPath = `M125.48 16.5178 L153.575 1.21404 C158.174 -1.29091 163.858 0.169156 166.356 4.77201 C177.336 25.0107 204.023 82.022 203.397 157.124 C202.853 222.541 175.312 282.704 163.932 304.811 C161.365 309.797 155.168 311.335 140.397 308.386 L5.22327 218.645 C0.227532 215.557 -1.26238 208.672 1.09046 203.29 C4.38293 195.76 8.38127 183.664 10.3125 166.516 C12.6331 145.91 10.3714 130.984 8.17678 122.311 C6.88819 117.219 8.79312 111.454 13.3562 108.852 L120.158 47.9527 C124.956 45.2169 126.627 39.1095 123.891 34.3117 L121.577 30.2536 C118.803 25.3897 120.563 19.1962 125.48 16.5178 Z`;

const TeamCircle: React.FC<TeamCircleProps> = ({ setActiveMember, groupIndex, rotate }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  const members = teamGroups[groupIndex];

  return (
    <div ref={containerRef} className="w-full">

      {/* ✅ MOBILE VIEW */}
      <div className="md:hidden flex gap-4 overflow-x-auto px-4 py-6">
        {members.map((member) => (
          <div
            key={member.id}
            onClick={() => setActiveMember(member)}
            className="min-w-[220px] bg-[#111] rounded-2xl p-4 flex-shrink-0 cursor-pointer"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[240px] object-cover rounded-xl"
            />
            <h3 className="text-white mt-4 text-lg font-semibold">
              {member.name}
            </h3>
            <p className="text-gray-400 text-sm">{member.role}</p>
          </div>
        ))}
      </div>

      {/* ✅ DESKTOP VIEW */}
      <motion.div
        className="hidden md:block w-[750px] h-[750px]"
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
      >
        <motion.svg
          viewBox="0 0 750 750"
          className="w-full h-full"
          animate={{ rotate }}
          transition={{ duration: 0.6 }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          <defs>
            {members.map((_, i) => (
              <clipPath key={i} id={`clip-${i}`}>
                <path d={segmentPath} />
              </clipPath>
            ))}
          </defs>

          {members.map((member, index) => (
            <Segment
              key={member.id}
              member={member.image}
              memberData={member}
              onHoverMember={setActiveMember}
              index={index}
              seg={segmentSettings[index]}
              img={imageSettings[index]}
              segmentPath={segmentPath}
              center={350}
              pivotCX={105}
              pivotCY={155}
              startAnimation={isInView}
            />
          ))}
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default TeamCircle;