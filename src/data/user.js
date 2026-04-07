import { FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiDocker, SiKubernetes, SiGit, SiArduino, SiCplusplus, SiExpress, SiFirebase, SiPandas, SiPostman, SiMysql } from "react-icons/si";

export const user = {
    name: "Yashika Sapra",
    bio: "AI Systems Engineer | Building Production-Grade AI & Full-Stack Systems",
    typewriter: ["AI Systems Engineer", "Full Stack Builder", "ML Infrastructure Specialist", "Systems Architect"],
    about: `I build intelligent systems from neurons to APIs.\n\n**Three things:**\n1. I think like a systems architect, not a learner → I design for production: scalability, monitoring, failure handling.\n\n2. I ship the full stack → ML models + APIs + frontends + DevOps. I don't stop at notebooks.\n\n3. I solve real problems → Multi-agent AI for job automation. IoT networks handling 1000+ events/sec. Data systems processing millions.\n\n**Currently:** B.Tech CS (AI/ML/IoT specialization, 2023–2027) at GLA University\n\n**Previously:** 5+ hackathon wins. 15+ production projects. Multiple technical competitions. Shipped systems used by 50+ beta users.\n\nI obsess over impact metrics: latency, throughput, reliability. Every system I build has real numbers attached.`,
    stats: [
        { label: "Projects Built", value: "15+" },
        { label: "Hackathons Won", value: "5+" },
        { label: "Certifications", value: "10+" },
        { label: "Years Coding", value: "3+" },
    ],
    skills: {
        languages: [
            { name: "Java", icon: FaJava, color: "#007396" },
            { name: "Python", icon: FaPython, color: "#3776AB" },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "C++", icon: SiCplusplus, color: "#00599C" },
            { name: "SQL", icon: SiMysql, color: "#4479A1" },
        ],
        frontend: [
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
            { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        ],
        backend: [
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Express", icon: SiExpress, color: "#ffffff" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "REST APIs", icon: SiPostman, color: "#FF6C37" },
            { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        ],
        ai_ml: [
            { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
            { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
            { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
            { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
            { name: "Pandas", icon: SiPandas, color: "#150458" },
        ],
        tools: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "Arduino", icon: SiArduino, color: "#00979D" },
        ]
    },
    // Note: These projects are for manual entry fallback. 
    // The main Project section primarily uses GitHub API data via useGitHubProjects.js
    projects: [
        {
            title: "AI Career OS (Nirmaan)",
            description: "Multi-agent AI system that autonomously manages job applications, parses recruiter emails, and categorizes opportunities by role fit. Saves 5+ hours/week per user. 50+ beta users, 87% accuracy.",
            problem: "Job hunting is fragmented across spreadsheets and apps with zero automation",
            tech: ["Python", "LLMs", "Multi-Agent AI", "Node.js", "React", "MongoDB"],
            impact: "50+ beta users | 87% accuracy | 5 hrs/week saved",
            github: "https://github.com/Yashika-2806",
            demo: "#",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
        },
        {
            title: "Smart Home Automation System",
            description: "Real-time IoT network with intelligent automation. Arduino sensors, Python processing, React dashboard. 1000+ events/day, 99.2% uptime, <50ms latency. 30% energy reduction.",
            problem: "Home automation is either rigid (presets) or complex (requires coding)",
            tech: ["Arduino", "C++", "Python", "React", "MQTT", "Real-time DB"],
            impact: "1000+ events/day | 99.2% uptime | 30% energy reduction",
            github: "https://github.com/Yashika-2806",
            demo: "#",
            image: "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2000&auto=format&fit=crop"
        },
        {
            title: "Smart Urban Data Analytics Platform",
            description: "City-scale intelligence system. Ingests 100K+ daily metrics, runs ML models to identify infrastructure patterns, surfaces optimization recommendations with 87% accuracy.",
            problem: "Urban planners lack real-time data insights for infrastructure optimization",
            tech: ["Python", "Scikit-Learn", "Node.js", "React", "PostgreSQL", "Docker"],
            impact: "15+ optimizations identified | 87% accuracy | Live with municipality",
            github: "https://github.com/Yashika-2806",
            demo: "#",
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop"
        },
        {
            title: "Full-Stack E-Commerce Marketplace",
            description: "Scalable multi-vendor marketplace with real-time inventory, Elasticsearch search, and Stripe payments. Handled 10K+ test orders, 500+ sellers, 50K+ SKUs in beta.",
            problem: "Standard e-commerce lacks seller ecosystem and real-time inventory management",
            tech: ["React", "Node.js", "MongoDB", "Redis", "Elasticsearch", "Stripe"],
            impact: "10K+ orders | 500+ sellers | <200ms response time",
            github: "https://github.com/Yashika-2806",
            demo: "#",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2000&auto=format&fit=crop"
        }
    ],
    education: [
        {
            degree: "B.Tech in Computer Science Engineering",
            institution: "GLA University",
            year: "2023 - 2027",
            details: "Specialization: Artificial Intelligence, Machine Learning & IoT"
        }
    ],
    certifications: [
        {
            title: "Fundamentals of Building AI Agents",
            issuer: "Coursera",
            date: "Jan 2025",
            learned: "Multi-agent architecture, tool integration patterns, reliability",
            applied: "Built Nirmaan with 3 coordinated agents. Implemented error handling + retry logic.",
            image: "/images/fundamentals of building ai agents courseera.pdf"
        },
        {
            title: "Introduction to Large Language Models",
            issuer: "Coursera",
            date: "Nov 2024",
            learned: "LLM architecture, prompt engineering, token economics",
            applied: "LLM integration in Nirmaan for email parsing + classification. Optimized cost-per-token.",
            image: "/images/intoduction to llms courseera.pdf"
        },
        {
            title: "Intro to Embedded Systems",
            issuer: "Coursera",
            date: "Sep 2024",
            learned: "Microcontroller programming, sensor integration, real-time constraints",
            applied: "Architected sensor network for home automation. Solved 50ms latency challenge.",
            image: "/images/intro to embeddeed.pdf"
        },
        {
            title: "Generative AI",
            issuer: "Databricks",
            date: "Aug 2024",
            learned: "Generative models, fine-tuning strategies, deployment optimization",
            applied: "Fine-tuned inference models for urban analytics classification tasks.",
            image: "/images/generative ai databricks.pdf"
        },
        {
            title: "Oracle Database Professional",
            issuer: "Oracle",
            date: "Jun 2024",
            learned: "Advanced SQL, indexing strategies, query optimization",
            applied: "Designed PostgreSQL schema for analytics platform. Achieved sub-second queries.",
            image: "/images/ecertificate oracle.pdf"
        },
        {
            title: "Agentic AI Workshop",
            issuer: "Workshop",
            date: "Jan 2025",
            learned: "Autonomous system design, reliability patterns at scale",
            applied: "Direct application to Nirmaan multi-agent orchestration.",
            image: "/images/agentic ai workshop certificate.png"
        }
    ],
    social: {
        github: "https://github.com/Yashika-2806",
        linkedin: "https://www.linkedin.com/in/yashika-sapra-9a224a290/",
        leetcode: "https://leetcode.com/", // Add your specific link if available
        email: "yashika.sapra@example.com"
    }
};
