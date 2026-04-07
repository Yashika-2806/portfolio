import { motion } from "framer-motion";
import { user } from "../data/user";
import { FaGraduationCap } from "react-icons/fa";

const About = () => {
    return (
        <section id="about" className="section-shell text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon-blue)]/15 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--neon-cyan)]/15 blur-[120px]" />

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 md:mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 md:mb-6 neon-title">About <span className="neon-accent">Me</span></h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-[var(--line)] relative group panel">
                            <img
                                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-5 sm:p-8 bg-[#081427]/90 backdrop-blur-md rounded-2xl border border-[var(--line)] group-hover:border-[var(--neon-cyan)]/60 transition-colors">
                                <p className="font-bold text-base sm:text-xl text-white italic">"Code is like humor. When you have to explain it, it’s bad."</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8 md:space-y-10"
                    >
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-4xl font-bold text-[var(--neon-cyan)]">I build intelligent systems from neurons to APIs</h3>
                            
                            <div className="space-y-6 text-lg md:text-xl text-[#a4bbeb] leading-relaxed">
                                <div>
                                    <h4 className="font-bold text-white mb-2">→ Systems Architecture Mindset</h4>
                                    <p>I think like an architect, not a learner. I design for production: scalability, monitoring, failure handling.</p>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-white mb-2">→ Full-Stack Shipping</h4>
                                    <p>ML models + APIs + frontends + DevOps. I don't stop at notebooks.</p>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-white mb-2">→ Real-World Problem Solving</h4>
                                    <p>Multi-agent AI for job automation. IoT networks processing 1000+ events/sec. Data systems handling millions of records.</p>
                                </div>
                                
                                <div className="pt-4 border-t border-[var(--line)]">
                                    <p className="text-[#7f96c7] italic">I obsess over impact metrics: latency, throughput, reliability. Every system I build has real numbers attached.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-8">
                            <StatCard count={user.stats[0].value} label="Projects Completed" />
                            <StatCard count={user.stats[1].value} label="Hackathons Won" />
                            <StatCard count={user.stats[2].value} label="Certifications" />
                            <StatCard count={user.stats[3].value} label="Years Experience" />
                        </div>

                        <div className="space-y-6" id="education">
                            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                <FaGraduationCap className="text-[var(--neon-cyan)]" /> Education
                            </h3>
                            <div className="space-y-7 md:space-y-8 border-l-2 border-[var(--line)] pl-6 md:pl-8 relative">
                                {user.education.map((edu, index) => (
                                    <div key={index} className="relative group">
                                        <span className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-[#09162f] border-4 border-[var(--neon-cyan)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(55,240,255,0.8)]" />
                                        <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[var(--neon-cyan)] transition-colors">{edu.degree}</h4>
                                        <p className="text-[#7ee9ff] text-base md:text-xl font-medium mt-1">{edu.institution} | {edu.year}</p>
                                        <p className="text-[#9ab0df] text-base md:text-xl mt-2">{edu.details}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const StatCard = ({ count, label }) => (
    <div className="p-4 sm:p-6 panel panel-hover rounded-2xl border-l-4 border-[var(--neon-cyan)] transition-transform duration-300 group">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">{count}</h3>
        <p className="text-[#87a0d3] text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
);

export default About;
