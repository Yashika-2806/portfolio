import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Modal from "../components/Modal";

const Projects = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    // Ensure projects is always an array
    const safeProjects = Array.isArray(projects) ? projects : [];

    return (
        <section id="projects" className="section-shell">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="mt-12 md:mt-20 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {safeProjects.length > 0 ? safeProjects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        onView={() => setSelectedProject(project)}
                    />
                )) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-[#9ab0df] text-lg">No projects found</p>
                    </div>
                )}
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
    // Ensure project has safe defaults
    const safeProject = {
        name: project?.name || project?.title || 'Project',
        title: project?.title || project?.name || 'Project',
        description: project?.description || 'No description',
        imageUrl: project?.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        tags: Array.isArray(project?.tags) ? project.tags : []
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="panel rounded-2xl overflow-hidden group"
        >
            <div className="relative aspect-video overflow-hidden bg-[#03070f]">
                <img
                    src={safeProject.imageUrl}
                    alt={safeProject.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
            <div className="p-7 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-3">{safeProject.title}</h3>
                <p className="text-[#9ab0df] text-base mb-5 line-clamp-3 leading-relaxed">{safeProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {safeProject.tags.length > 0 ? safeProject.tags.map((tag, index) => (
                        <span key={index} className="bg-[#10203a] text-[#7ee9ff] text-xs font-semibold px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    )) : null}
                </div>
                <button
                    onClick={onView}
                    className="w-full text-center py-3 bg-[var(--neon-blue)]/20 text-[var(--neon-cyan)] rounded-lg border border-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/40 transition-all font-semibold"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
};

export default Projects;
