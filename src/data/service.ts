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
    text: "We are a website development company in Kochi offering custom web solutions designed to help businesses build a strong online presence. Our approach focuses on creating fast, responsive, and SEO-friendly websites that are tailored to your business goals.",
    id: "web-development",

    about:
      "Our web development services combine cutting-edge technology with creative design to deliver exceptional digital experiences. Whether you need a simple landing page or a complex web application, our team has the expertise to bring your vision to life. We focus on performance, scalability, and user experience to ensure your website not only looks great but performs flawlessly.",

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
    text:"As an AI/ML development company, we help businesses leverage intelligent automation and data-driven insights to improve efficiency and decision-making. Our solutions are designed to simplify complex processes and unlock the true value of your data.",
    id: "ai-ml",

    about:
      "Our AI and Machine Learning services are designed to transform your data into actionable intelligence. We build intelligent systems that automate complex workflows, predict future trends, and enhance decision-making capabilities. Whether you are looking to integrate intelligent chatbots or deploy advanced predictive models, our custom solutions are engineered to drive operational efficiency and measurable business growth.",

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
      { number: "01", title: "Data Collection", text: "Gathering relevant datasets and cleaning data for model accuracy", position: "left" },
      { number: "02", title: "Model Design", text: "Choosing the optimal algorithms and defining the model structure", position: "center" },
      { number: "03", title: "Training", text: "Training AI models using comprehensive data to ensure high accuracy", position: "right" },
      { number: "04", title: "Evaluation", text: "Testing accuracy and validating the model against real-world scenarios", position: "left" },
      { number: "05", title: "Deployment", text: "Integrating the trained models seamlessly into your business applications", position: "center" },
    ],
  },

  {
    image: img2,
    title: "App Development",
    text: "We are a mobile app development company in Kochi offering custom Android and iOS app solutions tailored to your business needs. Our apps are designed to deliver smooth performance, intuitive user experience, and scalable functionality.",
    id: "app",

    about:
      "We craft high-performance, user-centric mobile applications tailored to your unique business needs across both Android and iOS platforms. Our app development process blends intuitive UI/UX design with robust backend integration to ensure a seamless and engaging user experience. From initial concept to final deployment, we focus on scalability and performance to help your mobile presence stand out in a competitive digital landscape.",

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
      { number: "01", title: "Requirement Analysis", text: "Understanding your app goals and identifying the target audience", position: "left" },
      { number: "02", title: "UI/UX Design", text: "Designing intuitive user interfaces and seamless user experiences", position: "center" },
      { number: "03", title: "Development", text: "Building core app features with scalable and robust architecture", position: "right" },
      { number: "04", title: "Testing", text: "Ensuring high performance and security through rigorous testing", position: "left" },
      { number: "05", title: "Deployment", text: "Publishing to app stores and providing continuous maintenance", position: "center" },
    ],
  },

  {
    image: img4,
    title: "Cyber Security",
    text:"We are a cyber security company focused on protecting businesses from evolving digital threats. Our solutions include advanced threat detection, data protection, and secure system management to ensure your operations remain safe and uninterrupted.",
    id: "cyber",

    about:
      "Our comprehensive cyber security services are engineered to protect your digital assets from continuously evolving threats. We provide rigorous vulnerability assessments, proactive penetration testing, and robust network security configurations to ensure your operations remain uncompromised. By fortifying your infrastructure and securing sensitive data, we empower your business to operate safely and confidently in today's complex digital environment.",

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
      { number: "01", title: "Assessment", text: "Conducting comprehensive scans to find system vulnerabilities", position: "left" },
      { number: "02", title: "Analysis", text: "Evaluating potential security risks and business impact", position: "center" },
      { number: "03", title: "Testing", text: "Performing deep penetration testing to simulate real-world attacks", position: "right" },
      { number: "04", title: "Fixing", text: "Applying critical security patches and strengthening system defenses", position: "left" },
      { number: "05", title: "Monitoring", text: "Providing continuous security checks and 24/7 monitoring", position: "center" },
    ],
  },

  {
    image: img5,
    title: "Digital Marketing",
    text: "We offer digital marketing services in Kochi designed to help businesses grow through data-driven strategies. Our approach focuses on reaching the right audience, improving online visibility, and driving measurable results.",
    id: "digital",

    about:
      "Our digital marketing services are driven by data and focused on maximizing your online reach and ROI. We deploy comprehensive strategies encompassing targeted SEO, dynamic social media campaigns, and precision-driven paid advertising to engage your ideal audience. By continuously analyzing performance metrics and optimizing our approach, we help elevate your brand visibility and turn digital interactions into long-term customer relationships.",

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
      { number: "01", title: "Research", text: "Conducting in-depth market analysis and competitor research", position: "left" },
      { number: "02", title: "Strategy", text: "Planning targeted campaigns to maximize audience reach", position: "center" },
      { number: "03", title: "Execution", text: "Running optimized ad campaigns across multiple digital platforms", position: "right" },
      { number: "04", title: "Optimization", text: "Analyzing campaign data and adjusting strategies for better ROI", position: "left" },
      { number: "05", title: "Reporting", text: "Providing detailed performance tracking and comprehensive reporting", position: "center" },
    ],
  },

  {
    image: img6,
    title: "UI/UX Design",
    text:"We design intuitive, user-centered interfaces that enhance usability and create engaging digital experiences that users love.",
    id: "ui-ux",

    about:
      "Our UI/UX design philosophy centers on creating intuitive, visually stunning interfaces that captivate users from the first interaction. We dive deep into user research and behavior analysis to craft wireframes and interactive prototypes that perfectly align with your brand's vision. By prioritizing flawless usability and aesthetic excellence, we ensure your digital products deliver memorable and frictionless experiences.",

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
      { number: "01", title: "Research", text: "Conducting thorough user research and behavior analysis", position: "left" },
      { number: "02", title: "Wireframing", text: "Creating structural wireframes and planning the user journey", position: "center" },
      { number: "03", title: "Design", text: "Designing visually stunning interfaces that reflect your brand identity", position: "right" },
      { number: "04", title: "Testing", text: "Testing prototypes with real users and gathering actionable feedback", position: "left" },
      { number: "05", title: "Delivery", text: "Delivering final design assets and comprehensive style guides", position: "center" },
    ],
  },

  {
    image: img7,
    title: "Graphic Designing",
    text:"We craft visually compelling designs that strengthen your brand identity and communicate your message effectively across all platforms.",
    id: "graphic",

    about:
      "Our graphic design services focus on crafting compelling visual narratives that instantly communicate your brand's core values. From establishing a unique brand identity and logo design to creating engaging marketing materials and social media creatives, we bring your vision to life. We combine creative artistry with strategic thinking to ensure every visual element we produce resonates strongly with your target demographic.",

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
      { number: "01", title: "Concept", text: "Understanding your core brand values and target demographics", position: "left" },
      { number: "02", title: "Design", text: "Creating compelling visuals tailored to your specific marketing needs", position: "center" },
      { number: "03", title: "Feedback", text: "Incorporating your feedback to refine and perfect the design concepts", position: "right" },
      { number: "04", title: "Finalization", text: "Finalizing high-resolution graphics optimized for print and web", position: "left" },
      { number: "05", title: "Delivery", text: "Delivering organized project assets in all required file formats", position: "center" },
    ],
  },

  {
    image: img8,
    title: "Networking & CCTV",
    text: "We provide reliable networking and surveillance solutions to ensure secure connectivity and continuous monitoring for homes and businesses.",
    id: "networking",

    about:
      "We deliver reliable and advanced networking and surveillance solutions designed to keep your premises secure and fully connected. Our services cover everything from complex LAN/WiFi configurations to the professional installation of high-definition CCTV systems with 24/7 monitoring capabilities. We emphasize proactive maintenance and robust infrastructure planning to provide you with seamless connectivity and absolute peace of mind.",

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
      { number: "01", title: "Site Survey", text: "Conducting comprehensive site surveys to analyze coverage requirements", position: "left" },
      { number: "02", title: "Planning", text: "Designing an optimal network and strategic camera placement layout", position: "center" },
      { number: "03", title: "Installation", text: "Professionally installing networking hardware and surveillance cameras", position: "right" },
      { number: "04", title: "Configuration", text: "Configuring network settings and securing the surveillance feeds", position: "left" },
      { number: "05", title: "Support", text: "Providing ongoing technical support and proactive system maintenance", position: "center" },
    ],
  },
];