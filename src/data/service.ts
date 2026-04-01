import img2 from "../assets/service2.jpg";
import img3 from "../assets/Service3.webp";
import img1 from "../assets/robo.jpg";
import img4 from "../assets/service4.jpg";
import img5 from "../assets/service5.jpg";
import img6 from "../assets/service6.webp";
import img7 from "../assets/service7.jpg";
import img8 from "../assets/service8.jpg";
import {
  Globe,
  Database,
  ShoppingCart,
  CodeXml,
  Brain,
  Bot,
  Smartphone,
  Shield,
  Megaphone,
  Palette,
  Camera,
  Network,
} from "lucide-react";

export const services = [
  {
    image: img3,
    title: "Web Development",
    text: "We build simple, smart tech solutions that help businesses grow and keep things moving.",
    id: "web-development",

    about:
      "Our web development services combine cutting-edge technology with creative design to deliver exceptional digital experiences.",

    offers: [
      {
        icon: Globe,
        title: "Static Websites",
        desc: "Fast, SEO-optimized static sites perfect for portfolios and landing pages.",
      },
      {
        icon: Database,
        title: "Dynamic Websites",
        desc: "Interactive web applications with real-time data and user authentication.",
      },
      {
        icon: ShoppingCart,
        title: "E-commerce",
        desc: "Full-featured online stores with payment integration and inventory management",
      },
      {
        icon: CodeXml,
        title: "Custom Web Apps",
        desc: "Tailored solutions built to meet your specific business requirements",
      },
    ],

    technologies: ["React.js", "Python", "MERN", "Node.js", "Express.js"],

    steps: [
      { number: "01", title: "Planning", text: "Understanding your requirements and defining project scope", position: "left" },
      { number: "02", title: "Design", text: "Creating wireframes and visual designs for your approval", position: "center" },
      { number: "03", title: "Development", text: "Building your website with clean, maintainable code", position: "right" },
      { number: "04", title: "Testing", text: "Ensuring performance and security", position: "left" },
      { number: "05", title: "Launch", text: "Deployment and ongoing support", position: "center" },
    ],
  },

  {
    image: img1,
    title: "AI & Machine Learning",
    text: "Intelligent solutions powered by machine learning and data analytics.",
    id: "ai-ml",

    about:
      "We develop AI-powered systems that automate processes and generate insights from data.",

    offers: [
      {
        icon: Brain,
        title: "Predictive Analytics",
        desc: "Forecast trends and outcomes using data-driven models.",
      },
      {
        icon: Bot,
        title: "Chatbots & Automation",
        desc: "AI-powered bots for customer support and automation.",
      },
      {
        icon: Database,
        title: "Data Processing",
        desc: "Handling and analyzing large datasets efficiently.",
      },
      {
        icon: CodeXml,
        title: "Custom AI Solutions",
        desc: "Tailored AI models for business-specific needs.",
      },
    ],

    technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"],

    steps: [
      { number: "01", title: "Data Collection", text: "Gathering relevant datasets", position: "left" },
      { number: "02", title: "Model Design", text: "Choosing algorithms and structure", position: "center" },
      { number: "03", title: "Training", text: "Training AI models", position: "right" },
      { number: "04", title: "Evaluation", text: "Testing accuracy", position: "left" },
      { number: "05", title: "Deployment", text: "Integrating into applications", position: "center" },
    ],
  },

  {
    image: img2,
    title: "App Development",
    text: "Cross-platform mobile apps for Android & iOS with seamless UX.",
    id: "app",

    about:
      "We create high-performance mobile apps with intuitive design and smooth functionality.",

    offers: [
      {
        icon: Smartphone,
        title: "Android Apps",
        desc: "Native and cross-platform Android applications.",
      },
      {
        icon: Smartphone,
        title: "iOS Apps",
        desc: "High-quality iOS applications with smooth UX.",
      },
      {
        icon: CodeXml,
        title: "Cross-platform Apps",
        desc: "Single codebase apps using Flutter & React Native.",
      },
      {
        icon: Database,
        title: "Backend Integration",
        desc: "Secure APIs and database integration.",
      },
    ],

    technologies: ["Flutter", "React Native", "Firebase", "Swift", "Kotlin"],

    steps: [
      { number: "01", title: "Requirement Analysis", text: "Understanding app goals", position: "left" },
      { number: "02", title: "UI/UX Design", text: "Designing user interfaces", position: "center" },
      { number: "03", title: "Development", text: "Building app features", position: "right" },
      { number: "04", title: "Testing", text: "Ensuring performance", position: "left" },
      { number: "05", title: "Deployment", text: "Publishing to stores", position: "center" },
    ],
  },

  {
    image: img4,
    title: "Cyber Security",
    text: "Protect your digital assets with advanced security solutions.",
    id: "cyber",

    about:
      "We secure systems against cyber threats through audits and testing.",

    offers: [
      {
        icon: Shield,
        title: "Vulnerability Assessment",
        desc: "Identify weaknesses in your systems.",
      },
      {
        icon: Shield,
        title: "Penetration Testing",
        desc: "Simulate attacks to test defenses.",
      },
      {
        icon: Database,
        title: "Data Protection",
        desc: "Secure sensitive business data.",
      },
      {
        icon: Network,
        title: "Network Security",
        desc: "Protect networks from unauthorized access.",
      },
    ],

    technologies: ["Kali Linux", "Wireshark", "Metasploit", "Nmap", "Burp Suite"],

    steps: [
      { number: "01", title: "Assessment", text: "Finding vulnerabilities", position: "left" },
      { number: "02", title: "Analysis", text: "Evaluating risks", position: "center" },
      { number: "03", title: "Testing", text: "Penetration testing", position: "right" },
      { number: "04", title: "Fixing", text: "Applying fixes", position: "left" },
      { number: "05", title: "Monitoring", text: "Continuous security checks", position: "center" },
    ],
  },

  {
    image: img5,
    title: "Digital Marketing",
    text: "Data-driven marketing strategies to grow your online presence.",
    id: "digital",

    about:
      "We help businesses grow using SEO, ads, and social media strategies.",

    offers: [
      {
        icon: Megaphone,
        title: "SEO Optimization",
        desc: "Improve search engine rankings.",
      },
      {
        icon: Megaphone,
        title: "Social Media Marketing",
        desc: "Grow presence across platforms.",
      },
      {
        icon: Database,
        title: "Analytics & Tracking",
        desc: "Measure and improve performance.",
      },
      {
        icon: CodeXml,
        title: "Ad Campaigns",
        desc: "Targeted paid marketing campaigns.",
      },
    ],

    technologies: ["Google Ads", "Meta Ads", "SEO Tools", "Analytics", "Content Marketing"],

    steps: [
      { number: "01", title: "Research", text: "Market analysis", position: "left" },
      { number: "02", title: "Strategy", text: "Campaign planning", position: "center" },
      { number: "03", title: "Execution", text: "Running campaigns", position: "right" },
      { number: "04", title: "Optimization", text: "Improving results", position: "left" },
      { number: "05", title: "Reporting", text: "Performance tracking", position: "center" },
    ],
  },

  {
    image: img6,
    title: "UI/UX Design",
    text: "Creating intuitive and visually appealing user experiences.",
    id: "ui-ux",

    about:
      "We design user-friendly interfaces that enhance engagement and usability.",

    offers: [
      {
        icon: Palette,
        title: "UI Design",
        desc: "Visually stunning interface designs.",
      },
      {
        icon: Palette,
        title: "UX Research",
        desc: "Understanding user behavior and needs.",
      },
      {
        icon: CodeXml,
        title: "Wireframing",
        desc: "Blueprints for application structure.",
      },
      {
        icon: Globe,
        title: "Prototyping",
        desc: "Interactive prototypes for testing.",
      },
    ],

    technologies: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"],

    steps: [
      { number: "01", title: "Research", text: "User analysis", position: "left" },
      { number: "02", title: "Wireframing", text: "Layout creation", position: "center" },
      { number: "03", title: "Design", text: "UI creation", position: "right" },
      { number: "04", title: "Testing", text: "User feedback", position: "left" },
      { number: "05", title: "Delivery", text: "Final handoff", position: "center" },
    ],
  },

  {
    image: img7,
    title: "Graphic Designing",
    text: "Creative designs that build strong brand identity.",
    id: "graphic",

    about:
      "We create compelling visual content for branding and marketing.",

    offers: [
      {
        icon: Palette,
        title: "Logo Design",
        desc: "Unique brand identity logos.",
      },
      {
        icon: Palette,
        title: "Branding",
        desc: "Complete visual identity solutions.",
      },
      {
        icon: Megaphone,
        title: "Social Media Creatives",
        desc: "Engaging posts and ads.",
      },
      {
        icon: Camera,
        title: "Print Design",
        desc: "Brochures, posters, and banners.",
      },
    ],

    technologies: ["Photoshop", "Illustrator", "Canva", "InDesign", "CorelDRAW"],

    steps: [
      { number: "01", title: "Concept", text: "Understanding brand", position: "left" },
      { number: "02", title: "Design", text: "Creating visuals", position: "center" },
      { number: "03", title: "Feedback", text: "Revisions", position: "right" },
      { number: "04", title: "Finalization", text: "Final output", position: "left" },
      { number: "05", title: "Delivery", text: "Assets delivery", position: "center" },
    ],
  },

  {
    image: img8,
    title: "Networking & CCTV",
    text: "Reliable networking and surveillance solutions.",
    id: "networking",

    about:
      "We provide secure networking and surveillance systems for homes and businesses.",

    offers: [
      {
        icon: Network,
        title: "Network Setup",
        desc: "LAN/WiFi setup and configuration.",
      },
      {
        icon: Camera,
        title: "CCTV Installation",
        desc: "Advanced surveillance systems.",
      },
      {
        icon: Shield,
        title: "Security Monitoring",
        desc: "24/7 monitoring solutions.",
      },
      {
        icon: Database,
        title: "Maintenance",
        desc: "System maintenance and support.",
      },
    ],

    technologies: ["Cisco", "MikroTik", "Hikvision", "Dahua", "IP Networking"],

    steps: [
      { number: "01", title: "Site Survey", text: "Analyzing location", position: "left" },
      { number: "02", title: "Planning", text: "Designing layout", position: "center" },
      { number: "03", title: "Installation", text: "Setting up systems", position: "right" },
      { number: "04", title: "Configuration", text: "System setup", position: "left" },
      { number: "05", title: "Support", text: "Maintenance", position: "center" },
    ],
  },
];