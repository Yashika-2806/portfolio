import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Modal = ({ isOpen, onClose, project }) => {

    return (
        <AnimatePresence>
            {isOpen && project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-4xl rounded-2xl overflow-hidden panel shadow-2xl relative max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-[#0b1730] rounded-full text-white transition-colors"
                        >
                            <FaTimes />
                        </button>

                        <div className="grid md:grid-cols-2">
                            <div className="h-48 md:h-auto bg-[#07101d] relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover absolute inset-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                            </div>

                            <div className="p-8 space-y-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-3 py-1 bg-[rgba(55,240,255,0.08)] text-[var(--neon-cyan)] rounded-full text-xs font-medium border border-[rgba(55,240,255,0.2)]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-[#b3c8f3] leading-relaxed text-sm">
                                    {project.description}
                                </p>

                                <div className="pt-6 border-t border-[var(--line)] flex gap-4">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#091326] hover:bg-[#10203f] text-white rounded-lg transition-colors font-semibold grow border border-[var(--line)]">
                                        <FaGithub /> Code
                                    </a>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[#04101d] rounded-lg transition-colors font-semibold shadow-lg shadow-cyan-500/25 grow">
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
