import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import useGitHubProjects from "../hooks/useGitHubProjects";

const Projects = () => {
    const { projects, loading, error } = useGitHubProjects("Yashika-2806");

    if (loading) return (
        <div className="py-24 text-white text-center flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 border-4 border-[var(--neon-cyan)] border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-xl text-[var(--neon-cyan)] animate-pulse tracking-[0.16em] uppercase">Fetching Projects...</p>
        </div>
    );

    if (error) return (
        <div className="py-20 text-red-400 text-center text-xl">
            <p>Error loading projects: {error}</p>
            <p className="text-sm mt-2 text-[#7f96c7]">Please try again later.</p>
        </div>
    );

    return (
        <section id="projects" className="section-shell relative">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight neon-title">
                        Projects <span className="neon-accent">.exe</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#92abdc] max-w-2xl mx-auto mt-5 md:mt-6">
                        A live stream of repositories, experiments, and deployable systems pulled from GitHub and framed as a futuristic mission board.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center text-[#92abdc] text-xl">No projects found for this user.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-12">
                        {projects.map((repo, idx) => (
                            <ProjectCard key={repo.id} repo={repo} index={idx} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const ProjectCard = ({ repo, index }) => {
    // Generate a consistent random image based on the repo name length to keep it static per refresh
    const randomImageIndex = repo.name.length % 5;
    const projectImages = [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group flex flex-col h-full panel panel-hover rounded-[1.75rem] overflow-hidden relative"
        >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 gap-3">
                    <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--neon-cyan)] transition-colors leading-tight">
                            {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                        </h3>
                        {repo.problem && (
                            <p className="text-[#76b3ff] text-sm font-medium mt-1 italic">
                                Problem: {repo.problem}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--neon-green)] bg-[rgba(118,255,191,0.08)] px-2 py-1 rounded text-xs flex-shrink-0">
                        <FaStar size={12} /> {repo.stargazers_count}
                    </div>
                </div>

                <div className="w-full h-56 sm:h-64 bg-[#08101f] rounded-xl overflow-hidden mb-5 sm:mb-6 border border-[var(--line)] group-hover:border-[var(--neon-cyan)]/30 transition-colors relative">
                    <img
                        src={projectImages[randomImageIndex]}
                        alt={repo.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050913] to-transparent opacity-60"></div>
                </div>

                <p className="text-[#b4c8f4] text-base sm:text-xl md:text-2xl mb-4 sm:mb-5 leading-relaxed flex-grow line-clamp-3">
                    {repo.description || "A cool project on GitHub. Check out the code to see more detailed documentation."}
                </p>

                {repo.impact && (
                    <div className="mb-4 p-3 bg-[rgba(55,240,255,0.08)] border border-[rgba(55,240,255,0.2)] rounded-lg">
                        <p className="text-[var(--neon-cyan)] text-xs sm:text-sm font-bold">
                            📊 Impact: {repo.impact}
                        </p>
                    </div>
                )}

                {repo.tech && repo.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {repo.tech.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="text-[10px] font-bold text-[var(--neon-cyan)] bg-[rgba(55,240,255,0.08)] px-2.5 py-1.5 rounded border border-[rgba(55,240,255,0.2)] uppercase tracking-wide">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                <div className="pt-5 sm:pt-6 mt-auto border-t border-[var(--line)] grid grid-cols-2 gap-3 sm:gap-4">
                    <a
                        href={repo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#091326] text-white border border-[var(--line)] hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all font-bold text-xs sm:text-sm"
                    >
                        <FaGithub size={16} /> GitHub URL
                    </a>

                    {repo.demo && repo.demo !== "#" ? (
                        <a
                            href={repo.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[#021224] font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(55,240,255,0.3)] transition-all"
                        >
                            <FaExternalLinkAlt size={14} /> Live Demo
                        </a>
                    ) : (
                        <span className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#07101d] text-[#5f739f] border border-[#1b2b4c] cursor-not-allowed font-bold text-xs sm:text-sm">
                            <FaExternalLinkAlt size={14} /> Case Study
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
