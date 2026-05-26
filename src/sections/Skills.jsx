import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

const Skills = ({ skills }) => {
    return (
        <section id="skills" className="section-shell">
            <SectionTitle>Skills & Expertise</SectionTitle>
            <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {skills && Object.keys(skills).length > 0 ? Object.entries(skills).map(([key, categorySkills], index) => (
                    <SkillCategory
                        key={index}
                        category={key}
                        skills={categorySkills || []}
                        icon={null}
                    />
                )) : null}
            </div>
        </section>
    );
};

const SkillCategory = ({ category, skills, icon }) => {
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
        >
            <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl text-[var(--neon-cyan)]">
                    <i className={`fa-solid ${icon}`}></i>
                </span>
                <h3 className="text-2xl font-bold text-white">{category}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
                {skills && Array.isArray(skills) && skills.length > 0 ? skills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-[#10203a] text-[#96b2e9] text-sm font-semibold px-4 py-2 rounded-full border border-[#263c68] hover:border-[var(--neon-cyan)]/50 hover:text-white transition-all cursor-default"
                    >
                        {skill.name || skill}
                    </span>
                )) : null}
            </div>
        </motion.div>
    );
};

export default Skills;
