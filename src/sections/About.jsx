import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const About = ({ about }) => {
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
                                src={about.imageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-5 sm:p-8 bg-[#081427]/90 backdrop-blur-md rounded-2xl border border-[var(--line)] group-hover:border-[var(--neon-cyan)]/60 transition-colors">
                                <p className="font-bold text-base sm:text-xl text-white italic">"{about.quote}"</p>
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
                            <h3 className="text-2xl md:text-4xl font-bold text-[var(--neon-cyan)]">{about.title}</h3>
                            
                            <div className="space-y-6 text-lg md:text-xl text-[#a4bbeb] leading-relaxed"
                                 dangerouslySetInnerHTML={{ __html: about.description }}
                            >
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-8">
                            {about && about.stats && about.stats.length > 0 ? about.stats.map((stat, index) => (
                                <StatCard key={index} count={stat.value} label={stat.label} />
                            )) : null}
                        </div>

                        <div className="space-y-6" id="education">
                            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                <FaGraduationCap className="text-[var(--neon-cyan)]" /> Education
                            </h3>
                            <div className="space-y-7 md:space-y-8 border-l-2 border-[var(--line)] pl-6 md:pl-8 relative">
                                {about && about.education && about.education.length > 0 ? about.education.map((edu, index) => (
                                    <div key={index} className="relative group">
                                        <span className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-[#09162f] border-4 border-[var(--neon-cyan)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(55,240,255,0.8)]" />
                                        <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[var(--neon-cyan)] transition-colors">{edu.degree}</h4>
                                        <p className="text-[#7ee9ff] text-base md:text-xl font-medium mt-1">{edu.institution} | {edu.year}</p>
                                        <p className="text-[#9ab0df] text-base md:text-xl mt-2">{edu.details}</p>
                                    </div>
                                )) : null}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const StatCard = ({ count, label }) => (
    <div className="panel rounded-2xl p-5 text-center">
        <p className="text-4xl md:text-5xl font-extrabold text-white">{count}</p>
        <p className="text-sm md:text-base text-[#7f96c7] mt-2">{label}</p>
    </div>
);

export default About;
