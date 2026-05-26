import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import Modal from "../components/Modal";

const Projects = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="section-shell">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects && projects.length > 0 ? projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        onView={() => setSelectedProject(project)}
                    />
                )) : null}
            </div>
            {selectedProject && (
                <Modal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

const ProjectCard = ({ project, onView }) => {
    // Generate a consistent random image based on the repo name length to keep it static per refresh
    const randomImageIndex = project.name.length % 5;
    const projectImages = [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="panel rounded-2xl overflow-hidden group"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-[#9ab0df] text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project && project.tags && project.tags.length > 0 ? project.tags.map((tag, index) => (
                        <span key={index} className="bg-[#10203a] text-[#7ee9ff] text-xs font-semibold px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    )) : null}
                </div>
                <button
                    onClick={onView}
                    className="w-full text-center py-2.5 bg-[var(--neon-blue)]/20 text-[var(--neon-cyan)] rounded-lg border border-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/40 transition-all font-semibold"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
};

export default Projects;
