import { motion } from "framer-motion";
import { user } from "../data/user";

const Skills = () => {
    // Define the display order and titles for categories
    const categories = [
        { key: 'languages', title: 'Languages' },
        { key: 'frontend', title: 'Frontend Development' },
        { key: 'backend', title: 'Backend & Databases' },
        { key: 'ai_ml', title: 'AI / Machine Learning' },
        { key: 'tools', title: 'Tools & DevOps' }
    ];

    return (
        <section id="skills" className="section-shell relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full grid-overlay pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5 md:mb-6 neon-title">
                        Technical <span className="neon-accent">Skills</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#92abdc] max-w-2xl mx-auto">
                        A comprehensive toolkit of technologies I use to build scalable, intelligent, and performance-driven solutions.
                    </p>
                </div>

                <div className="space-y-12 md:space-y-16">
                    {categories.map((category, index) => {
                        const skills = user.skills[category.key];
                        if (!skills) return null;

                        return (
                            <SkillCategory
                                key={category.key}
                                title={category.title}
                                skills={skills}
                                index={index}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const SkillCategory = ({ title, skills, index }) => {
    // Map skills to their use cases
    const skillUseCases = {
        // Languages
        'Python': 'ML models, data pipelines, automation systems',
        'Java': 'System design, competitive programming, architecture',
        'JavaScript': 'Real-time frontends, APIs, interactivity',
        'TypeScript': 'Type-safe applications, scalable systems',
        'C++': 'Performance-critical IoT systems, algorithms',
        'SQL': 'Database design, complex queries, analytics',
        // Frontend
        'React': 'Building responsive UIs, real-time data',
        'Next.js': 'Full-stack React, SSR, performance optimization',
        'Tailwind CSS': 'Rapid UI development, design systems',
        'HTML5': 'Semantic markup, accessibility',
        'CSS3': 'Animations, responsive design, modern styling',
        // Backend
        'Node.js': 'RESTful APIs, microservices, WebSocket connections',
        'Express': 'Web server framework, middleware pipelines',
        'MongoDB': 'Document modeling, flexible schemas at scale',
        'REST APIs': 'Scalable API architecture, integrations',
        'Firebase': 'Real-time database, authentication',
        // AI/ML
        'TensorFlow': 'Model training, production inference',
        'PyTorch': 'Research-grade modeling, custom architectures',
        'OpenCV': 'Real-time image processing, computer vision',
        'Scikit-Learn': 'Classical ML pipelines, ensemble methods',
        'Pandas': 'Data manipulation, feature engineering',
        // Tools
        'Git': 'Version control, collaborative workflows',
        'Docker': 'Containerization, reproducible deployments',
        'Kubernetes': 'Container orchestration, scaling',
        'Postman': 'API testing and documentation',
        'Arduino': 'Microcontroller programming, IoT devices'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
        >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 md:mb-10 border-l-8 border-[var(--neon-cyan)] pl-4 sm:pl-6 flex items-center gap-3">
                {title}
                <span className="h-px bg-[var(--line)] flex-grow ml-6"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {skills.map((skill, idx) => (
                    <SkillItem key={idx} skill={skill} idx={idx} useCase={skillUseCases[skill.name]} />
                ))}
            </div>
        </motion.div>
    );
};

const SkillItem = ({ skill, idx, useCase }) => {
    const Icon = skill.icon;
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="flex flex-col items-start justify-start p-5 sm:p-6 panel rounded-2xl transition-all duration-300 group shadow-lg relative overflow-hidden panel-hover h-full"
            style={{
                '--skill-color': skill.color,
                borderColor: 'rgba(255,255,255,0.05)'
            }}
        >
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--skill-color)] transition-colors duration-300 pointer-events-none"></div>

            <div className="absolute inset-0 bg-gradient-to-br from-[var(--skill-color)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div
                className="text-5xl sm:text-6xl mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110 relative z-10 drop-shadow-2xl"
                style={{ color: skill.color }}
            >
                <Icon />
            </div>

            <span className="text-[#d0e2ff] group-hover:text-white font-bold text-lg md:text-xl tracking-wide transition-colors relative z-10">
                {skill.name}
            </span>
            
            {useCase && (
                <p className="text-[#a4bbeb] group-hover:text-[#cfe0ff] text-xs sm:text-sm mt-2 transition-colors relative z-10 leading-snug">
                    {useCase}
                </p>
            )}
        </motion.div>
    );
};

export default Skills;
