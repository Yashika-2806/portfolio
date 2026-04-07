import React from "react";
import { motion } from "framer-motion";

const Workshops = () => {
    const workshops = [
        {
            title: "Building AI Agents & Multi-Agent Systems",
            focus: "LangChain, AutoGPT, task automation workflows",
            date: "Jan 2025",
            impact: "Applied to Nirmaan orchestration architecture"
        },
        {
            title: "Agentic AI Workshop",
            focus: "Autonomous system design, reliability patterns at scale",
            date: "2024",
            impact: "Direct application to production systems"
        }
    ];

    return (
        <section id="workshops" className="section-shell relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(74,108,255,0.07)_0%,transparent_70%)] blur-[100px]"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(55,240,255,0.07)_0%,transparent_70%)] blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 md:mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 md:mb-6 tracking-tight neon-title">
                        Advanced <span className="neon-accent">Training</span>
                    </h2>
                    <p className="text-base sm:text-lg text-[#92abdc] max-w-2xl mx-auto font-light">
                        Specialized workshops in AI systems and architectures
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
                    {workshops.map((workshop, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="panel rounded-2xl p-6 sm:p-8 border hover:border-[var(--neon-cyan)]/40 transition-all"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-2">{workshop.title}</h3>
                                <p className="text-[var(--neon-cyan)] text-sm font-medium">{workshop.focus}</p>
                            </div>
                            
                            <div className="space-y-2 pt-4 border-t border-white/10 text-sm">
                                <p className="text-[#92abdc]"><strong>When:</strong> {workshop.date}</p>
                                <p className="text-[#7ee9ff] italic"><strong>Applied to:</strong> {workshop.impact}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Workshops;
