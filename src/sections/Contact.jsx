import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaGithub, FaLinkedin } from "react-icons/fa";
import { user } from "../data/user";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thanks for contacting me! I will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="section-shell relative">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--neon-blue)]/8 blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--neon-cyan)]/8 blur-[150px]" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 md:mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 md:mb-6 neon-title">
                        Get In <span className="neon-accent">Touch</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#92abdc] max-w-2xl mx-auto">
                        <strong>Open for Full-Time AI/ML Roles (20+ LPA)|Consulting Partnerships | Technical Collaborations</strong>. Actively seeking positions building production-grade AI systems, multi-agent architectures, and scalable full-stack applications. I typically respond within 24 hours.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8 md:space-y-12"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 border-l-4 border-[var(--neon-cyan)] pl-4">Contact Information</h3>

                        <div className="flex items-start gap-4 sm:gap-6 group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#0a152d] flex items-center justify-center text-[var(--neon-cyan)] text-lg sm:text-2xl border border-[var(--line)] group-hover:border-[var(--neon-cyan)] group-hover:shadow-[0_0_15px_rgba(55,240,255,0.2)] transition-all duration-300">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[var(--neon-cyan)] transition-colors">Email</h4>
                                <p className="text-[#9fb5e4] text-base sm:text-lg">yashika.sapra@example.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 sm:gap-6 group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#0a152d] flex items-center justify-center text-[var(--neon-cyan)] text-lg sm:text-2xl border border-[var(--line)] group-hover:border-[var(--neon-cyan)] group-hover:shadow-[0_0_15px_rgba(55,240,255,0.2)] transition-all duration-300">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[var(--neon-cyan)] transition-colors">Phone</h4>
                                <p className="text-[#9fb5e4] text-base sm:text-lg">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 sm:gap-6 group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#0a152d] flex items-center justify-center text-[var(--neon-cyan)] text-lg sm:text-2xl border border-[var(--line)] group-hover:border-[var(--neon-cyan)] group-hover:shadow-[0_0_15px_rgba(55,240,255,0.2)] transition-all duration-300">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[var(--neon-cyan)] transition-colors">Location</h4>
                                <p className="text-[#9fb5e4] text-base sm:text-lg">Delhi, India</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 sm:gap-6 group cursor-pointer">
                            <a href={user.social.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#0a152d] flex items-center justify-center text-[var(--neon-cyan)] text-lg sm:text-2xl border border-[var(--line)] group-hover:border-[var(--neon-cyan)] group-hover:shadow-[0_0_15px_rgba(55,240,255,0.2)] transition-all duration-300">
                                <FaGithub />
                            </a>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[var(--neon-cyan)] transition-colors">GitHub</h4>
                                <a href={user.social.github} target="_blank" rel="noopener noreferrer" className="text-[#9fb5e4] text-base sm:text-lg hover:text-[var(--neon-cyan)] transition-colors">
                                    github.com/Yashika-2806
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 sm:gap-6 group cursor-pointer">
                            <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#0a152d] flex items-center justify-center text-[var(--neon-cyan)] text-lg sm:text-2xl border border-[var(--line)] group-hover:border-[var(--neon-cyan)] group-hover:shadow-[0_0_15px_rgba(55,240,255,0.2)] transition-all duration-300">
                                <FaLinkedin />
                            </a>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[var(--neon-cyan)] transition-colors">LinkedIn</h4>
                                <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9fb5e4] text-base sm:text-lg hover:text-[var(--neon-cyan)] transition-colors">
                                    linkedin.com/in/yashika-sapra
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 panel p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--neon-cyan)]/10 rounded-bl-full"></div>

                            <div className="space-y-3">
                                <label htmlFor="name" className="text-base font-bold text-[#bdd4ff] uppercase tracking-wider">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#081224] border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(55,240,255,0.2)] text-white placeholder-[#6278a8] transition-all text-base sm:text-lg"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="email" className="text-base font-bold text-[#bdd4ff] uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#081224] border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(55,240,255,0.2)] text-white placeholder-[#6278a8] transition-all text-base sm:text-lg"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-base font-bold text-[#bdd4ff] uppercase tracking-wider">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#081224] border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(55,240,255,0.2)] text-white placeholder-[#6278a8] transition-all text-base sm:text-lg resize-none"
                                    placeholder="For hiring: Mention role type, team size, and timeline. For partnerships: Describe the collaboration. Response time: 24 hours."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 sm:py-5 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[#041121] font-extrabold text-lg sm:text-xl rounded-xl shadow-[0_0_20px_rgba(55,240,255,0.35)] hover:shadow-[0_0_30px_rgba(55,240,255,0.55)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
