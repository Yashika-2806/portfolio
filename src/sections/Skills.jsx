import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiDocker, SiKubernetes, SiGit, SiArduino, SiCplusplus, SiExpress, SiFirebase, SiPandas, SiPostman, SiMysql } from "react-icons/si";

const iconMapping = {
    "Java": FaJava,
    "Python": FaPython,
    "JavaScript": SiJavascript,
    "TypeScript": SiTypescript,
    "C++": SiCplusplus,
    "SQL": SiMysql,
    "React": FaReact,
    "Next.js": SiNextdotjs,
    "Tailwind CSS": SiTailwindcss,
    "HTML5": FaHtml5,
    "CSS3": FaCss3Alt,
    "Node.js": FaNodeJs,
    "Express": SiExpress,
    "MongoDB": SiMongodb,
    "REST APIs": SiPostman,
    "Firebase": SiFirebase,
    "TensorFlow": SiTensorflow,
    "PyTorch": SiPytorch,
    "OpenCV": SiOpencv,
    "Scikit-Learn": SiScikitlearn,
    "Pandas": SiPandas,
    "Git": SiGit,
    "Docker": SiDocker,
    "Kubernetes": SiKubernetes,
    "Postman": SiPostman,
    "Arduino": SiArduino
};

const formatCategoryName = (key) => {
    const names = {
        languages: "Languages",
        frontend: "Frontend Development",
        backend: "Backend & Databases",
        ai_ml: "AI & Machine Learning",
        tools: "Tools & Platforms"
    };
    return names[key] || key;
};

const Skills = ({ skills }) => {
    // Ensure skills is always an object with safe defaults
    const safeSkills = (skills && typeof skills === 'object' && Object.keys(skills).length > 0) ? skills : {
        languages: [],
        frontend: [],
        backend: [],
        ai_ml: [],
        tools: []
    };

    return (
        <section id="skills" className="section-shell">
            <SectionTitle>Technical Skills</SectionTitle>
            <p className="text-center text-[#9ab0df] max-w-2xl mx-auto mt-4 mb-16 text-lg">
                A comprehensive toolkit of technologies I use to build scalable, intelligent, and performance-driven solutions.
            </p>
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-12">
                {Object.keys(safeSkills).length > 0 ? Object.entries(safeSkills).map(([key, categorySkills], index) => (
                    <SkillCategory
                        key={index}
                        category={key}
                        skills={categorySkills || []}
                        index={index}
                    />
                )) : (
                    <div className="text-center py-12">
                        <p className="text-[#9ab0df] text-lg">No skills found</p>
                    </div>
                )}
            </div>
        </section>
    );
};

const SkillCategory = ({ category, skills, index }) => {
    const safeSkillsArray = Array.isArray(skills) ? skills : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="w-full"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-[var(--neon-cyan)] rounded-full shadow-[0_0_8px_var(--neon-cyan)]"></div>
                <h3 className="text-2xl font-bold text-white tracking-wide">
                    {formatCategoryName(category)}
                </h3>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6">
                {safeSkillsArray.length > 0 ? safeSkillsArray.map((skill, idx) => {
                    const skillName = typeof skill === 'string' ? skill : skill.name;
                    const skillColor = typeof skill === 'object' && skill.color ? skill.color : '#37f0ff';
                    const Icon = iconMapping[skillName];

                    return (
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-[#0a1220] rounded-2xl border border-[#1e2d4a] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[var(--neon-cyan)] hover:shadow-[0_0_20px_rgba(55,240,255,0.2)] transition-all group"
                        >
                            {Icon ? (
                                <Icon className="text-4xl md:text-5xl mb-3 transition-transform group-hover:scale-110" style={{ color: skillColor }} />
                            ) : (
                                <div className="text-4xl md:text-5xl mb-3 font-bold transition-transform group-hover:scale-110" style={{ color: skillColor }}>
                                    {skillName.charAt(0)}
                                </div>
                            )}
                            <span className="text-sm font-semibold text-[#a4bbeb] group-hover:text-white transition-colors text-center px-2">
                                {skillName}
                            </span>
                        </div>
                    );
                }) : (
                    <p className="text-[#9ab0df] text-sm">No skills in this category</p>
                )}
            </div>
        </motion.div>
    );
};

export default Skills;
