import int1 from "../assets/internship/int1.jpg";
import int2 from "../assets/internship/int2.png";
import int3 from "../assets/internship/int3.png";
import int4 from "../assets/internship/int4.jpg";
import int5 from "../assets/internship/int5.jpg";
import int6 from "../assets/internship/int6.jpg";
import int7 from "../assets/internship/int7.jpg";
import int8 from "../assets/internship/int8.jpg";
import int9 from "../assets/internship/int9.jpg";
import int10 from "../assets/internship/int10.jpg";
import int11 from "../assets/internship/int11.jpg";
import int12 from "../assets/internship/int12.jpg";
import { Code,CircleCheck,BookOpen,Users,GraduationCap,BriefcaseBusiness  } from "lucide-react";

const commonDuration = [
  {
    title: "1 Week",
    points: ["Certification", "Basic Projects", "Flexible schedule"],
  },
  {
    title: "15 Days",
    points: ["Certification", "Mini Projects", "Doubt Support"],
  },
  {
    title: "3 Months",
    points: ["Advanced Projects", "Mentor Support", "Job Assistance"],
  },
  {
    title: "6 Months",
    points: ["Industry Projects", "Internship Certificate", "Placement Support"],
  },
];

const commonBenefits = [
  {
    img: Code,
    title: "Hands-on Experience",
    description: "Work on real-world projects",
  },
  {
    img: CircleCheck,
    title: "Dual Certification",
    description: "Internship & Project completion",
  },
  {
    img: BookOpen,
    title: "Full Documentation",
    description: "Source code & learning materials",
  },
  {
    img: Users,
    title: "Expert Mentors",
    description: "Mentorship from industry experts",
  },
  {
    img: GraduationCap,
    title: "Interview Preparation",
    description: "Resume & interview preparation",
  },
  {
    img: BriefcaseBusiness,
    title: "Placement Support",
    description: "Job placement support",
  },
];
export const internship = [
  {
    image: int1,
    title: "Web Development",
    text: "React fundamentals, Node.js, MongoDB, Express...",
    id: "web",
    btn: "View Details",
    description:
      "Master modern web development with hands-on training and real-world projects.",
    learn: [
      "JavaScript ES6+ fundamentals",
      "React basics & project setup",
      "JSX & component architecture",
      "Props & state management",
      "React Hooks (useState, useEffect – basics)",
      "Event handling & conditional rendering",
      "Form handling & validation",
      "Styling (CSS Modules / Tailwind)",
      "Performance & best practices",
      "Debugging & deployment basics",     
    ],
    carddetail: [
      "React Basics & Mini UI Project Program",
      "Core React concepts + guided project",
      "In-depth training + real-time application",
      "Advanced React + career guidance",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int2,
    title: "Flutter Development",
    text: "State Management, Dart, Flutter Widgets, Firebase...",
    id: "Flutter",
    btn: "View Details",
    description:
      "Build cross-platform mobile apps using Flutter and Dart.",
    learn: [
      "Dart Programming",
      "Flutter UI",
      "State Management",
      "Firebase Integration",
      "API Handling",
      "Navigation",
      "App Deployment",
      "Debugging",
    ],
    carddetail: [
      "Flutter Basics & UI Development",
      "State Management + Firebase Integration",
      "Real-world App Development",
      "Advanced Flutter + Deployment",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int3,
    title: "Cyber Security",
    text: "Ethical Hacking, Network Security, Penetration Testing...",
    id: "Cyber",
    btn: "View Details",
    description:
      "Learn to secure systems and protect against cyber threats.",
    learn: [
      "Ethical Hacking",
      "Network Security",
      "Kali Linux",
      "Pen Testing",
      "Vulnerability Analysis",
      "Cryptography Basics",
      "Firewall Setup",
      "Security Tools",
    ],
    carddetail: [
      "Cyber Security Fundamentals",
      "Network Security & Ethical Hacking",
      "Penetration Testing Projects",
      "Advanced Security & Career Guidance",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int4,
    title: "MERN Stack",
    text: "React, Node.js, MongoDB, Express...",
    id: "MERN",
    btn: "View Details",
    description:
      "Become a full-stack developer using MERN technologies.",
    learn: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "REST APIs",
      "Authentication",
      "CRUD Apps",
      "Deployment",
    ],
    carddetail: [
      "Frontend with React Basics",
      "Backend with Node & Express",
      "Full Stack Project Development",
      "Advanced MERN + Deployment",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int5,
    title: "Digital Marketing",
    text: "SEO, SEM, Social Media Marketing...",
    id: "Digital",
    btn: "View Details",
    description:
      "Grow brands online using marketing strategies and tools.",
    learn: [
      "SEO",
      "Google Ads",
      "Social Media Marketing",
      "Content Marketing",
      "Email Campaigns",
      "Analytics",
      "Brand Strategy",
      "Lead Generation",
    ],
    carddetail: [
      "Marketing Basics & SEO",
      "Social Media & Ads Campaigns",
      "Content Strategy & Analytics",
      "Advanced Marketing + Lead Generation",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int6,
    title: "AI & Machine Learning",
    text: "ML, Deep Learning, NLP...",
    id: "Machine",
    btn: "View Details",
    description:
      "Build intelligent systems using AI and machine learning.",
    learn: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Data Preprocessing",
      "Model Training",
      "TensorFlow",
      "Projects",
    ],
    carddetail: [
      "Python & ML Basics",
      "Deep Learning Concepts",
      "Real-world AI Projects",
      "Advanced AI + Career Guidance",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int7,
    title: "Data Science",
    text: "Data Analysis, Visualization, Statistics...",
    id: "Data",
    btn: "View Details",
    description:
      "Analyze and visualize data to extract insights.",
    learn: [
      "Python",
      "Pandas",
      "NumPy",
      "Data Visualization",
      "Statistics",
      "EDA",
      "Machine Learning",
      "Projects",
    ],
    carddetail: [
      "Data Science Fundamentals",
      "Data Analysis & Visualization",
      "Machine Learning Projects",
      "Advanced Analytics & Career Prep",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int8,
    title: "Game Development",
    text: "Unity, Game Design, 2D/3D...",
    id: "Game",
    btn: "View Details",
    description:
      "Create engaging 2D and 3D games using Unity.",
    learn: [
      "Unity Engine",
      "C#",
      "Game Physics",
      "UI Design",
      "Animation",
      "Level Design",
      "Game Logic",
      "Publishing",
    ],
    carddetail: [
      "Game Dev Basics with Unity",
      "Game Mechanics & UI",
      "2D/3D Game Projects",
      "Advanced Game Dev & Publishing",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int9,
    title: "Graphic Design",
    text: "Branding, Photoshop, Design Principles...",
    id: "Graphic",
    btn: "View Details",
    description:
      "Design stunning visuals and brand identities.",
    learn: [
      "Photoshop",
      "Illustrator",
      "Branding",
      "Typography",
      "Color Theory",
      "Layouts",
      "Social Creatives",
      "Portfolio",
    ],
    carddetail: [
      "Design Basics & Tools",
      "Branding & Visual Identity",
      "Creative Design Projects",
      "Advanced Design & Portfolio",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int10,
    title: "Software Testing",
    text: "Manual Testing, API Testing...",
    id: "Testing",
    btn: "View Details",
    description:
      "Ensure software quality through testing techniques.",
    learn: [
      "Manual Testing",
      "Automation Testing",
      "API Testing",
      "Bug Tracking",
      "Test Cases",
      "Selenium",
      "JIRA",
      "QA Process",
    ],
    carddetail: [
      "Testing Basics",
      "Automation & API Testing",
      "Real-world QA Projects",
      "Advanced Testing & Career Prep",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int11,
    title: "Python Development",
    text: "Python, OOP, Flask/Django...",
    id: "Python",
    btn: "View Details",
    description:
      "Develop applications using Python frameworks.",
    learn: [
      "Python Basics",
      "OOP",
      "Flask",
      "Django",
      "APIs",
      "Database",
      "Projects",
      "Deployment",
    ],
    carddetail: [
      "Python Fundamentals",
      "Web Development with Django/Flask",
      "Project Development",
      "Advanced Python + Deployment",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },

  {
    image: int12,
    title: "UI/UX Designing",
    text: "Figma, Wireframing, Prototyping...",
    id: "Designing",
    btn: "View Details",
    description:
      "Design user-friendly and engaging interfaces.",
    learn: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Research",
      "UX Principles",
      "UI Design",
      "Usability Testing",
      "Design Systems",
    ],
    carddetail: [
      "UI/UX Fundamentals",
      "Wireframing & Prototyping",
      "Design Projects",
      "Advanced UX & Portfolio",
    ],
    duration: commonDuration,
    benefits: commonBenefits,
  },
];