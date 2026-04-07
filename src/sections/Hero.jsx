import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaMedium, FaFileDownload, FaChevronDown, FaCode, FaRobot, FaDatabase } from "react-icons/fa";
import { user } from "../data/user";

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16"
        >
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] bg-[radial-gradient(circle,rgba(74,108,255,0.25),transparent_65%)] blur-[90px]" />
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[78vw] h-[55vh] bg-[radial-gradient(circle,rgba(55,240,255,0.22),transparent_70%)] blur-[110px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-24 items-center h-full">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 md:space-y-10 text-center lg:text-left order-2 lg:order-1"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full panel mx-auto lg:mx-0"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--neon-cyan)] animate-pulse shadow-[0_0_12px_var(--neon-cyan)]"></span>
                        <span className="text-[#bdd5ff] text-sm font-semibold tracking-[0.12em] uppercase">Open for AI/ML Roles (20+ LPA)</span>
                    </motion.div>

                    <div className="relative">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight neon-title">
                            AI Systems <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-cyan)] via-[#e6fdff] to-[var(--neon-blue)]">
                                Engineer
                            </span>
                        </h1>
                    </div>

                    <div className="text-xl sm:text-3xl lg:text-4xl font-bold h-[42px] sm:h-[50px] flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                        <span className="text-[var(--neon-green)] font-black text-3xl sm:text-4xl">&gt;_</span>
                        <span className="text-[#cfe0ff]">
                            <Typewriter
                                words={[...user.typewriter, "Problem Solver", "Tech Enthusiast"]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={80}
                                deleteSpeed={60}
                                delaySpeed={1500}
                            />
                        </span>
                    </div>

                    <p className="text-lg md:text-2xl text-[#9ab0df] max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light">
                        I engineer production-grade AI systems and full-stack applications. <span className="text-white font-medium">Multi-agent systems.</span> <span className="text-white font-medium">Real-time data pipelines.</span> <span className="text-white font-medium">Hardware-software integration.</span> I ship systems that scale.
                    </p>

                    <div className="pt-5 border-t border-[var(--line)]">
                        <p className="text-sm text-[#7690c7] uppercase tracking-[0.18em] mb-4 font-semibold">Powering Solutions With</p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 opacity-70">
                            <TechBadge icon={<FaCode />} label="Full Stack" />
                            <TechBadge icon={<FaRobot />} label="AI / ML" />
                            <TechBadge icon={<FaDatabase />} label="Data Engineering" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6 justify-center lg:justify-start">
                        <motion.a
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(55,240,255,0.45)" }}
                            whileTap={{ scale: 0.98 }}
                            href="#contact"
                            className="px-7 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[#031224] font-extrabold text-lg sm:text-xl rounded-2xl shadow-[0_0_20px_rgba(55,240,255,0.25)] transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            <span className="relative z-10">Let us Collaborate</span>
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.05, borderColor: "rgba(55,240,255,0.8)" }}
                            whileTap={{ scale: 0.98 }}
                            href="/resume.pdf"
                            target="_blank"
                            className="px-7 sm:px-10 py-4 sm:py-5 bg-[#0a152d]/80 border border-[var(--line)] text-white font-bold text-lg sm:text-xl rounded-2xl backdrop-blur-md hover:bg-[#0f1c39] transition-all flex items-center justify-center gap-3"
                        >
                            <FaFileDownload className="text-[var(--neon-cyan)]" />
                            <span>Resume</span>
                        </motion.a>
                    </div>

                    <div className="flex gap-4 sm:gap-8 pt-5 sm:pt-6 justify-center lg:justify-start">
                        <SocialButton href={user.social.github} icon={<FaGithub />} label="GitHub" delay={0} />
                        <SocialButton href={user.social.linkedin} icon={<FaLinkedin />} label="LinkedIn" delay={0.1} />
                        <SocialButton href="#" icon={<FaMedium />} label="Medium" delay={0.2} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative w-full aspect-square max-w-[800px] mx-auto order-1 lg:order-2 mb-4 sm:mb-10 lg:mb-0"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(55,240,255,0.2)_0%,transparent_60%)] blur-[120px]"></div>

                    <div className="w-full h-full relative z-10 p-4">
                        <div className="absolute inset-0 border-2 border-[rgba(55,240,255,0.24)] rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute inset-8 border border-[rgba(118,255,191,0.24)] rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

                        <div className="absolute inset-12 rounded-full overflow-hidden border-4 border-[#2e446f] shadow-2xl group z-20 hover:border-[var(--neon-cyan)]/70 transition-colors duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
                                alt="Profile"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#04070f]/90 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <FloatingOrb icon="RX" label="Innovation" className="top-0 right-10" delay={0} />
                        <FloatingOrb icon="AI" label="AI / ML" className="bottom-20 left-0" delay={1.5} />
                        <FloatingOrb icon="QX" label="Speed" className="top-20 -left-6" delay={2.5} />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 bg-[#0e1a34]/90 backdrop-blur-xl border border-[var(--line)] px-5 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl flex items-center gap-4 z-30"
                        >
                            <div className="text-left">
                                <p className="text-[var(--neon-cyan)] font-black text-2xl sm:text-3xl leading-none">15+</p>
                                <p className="text-[#bdd5ff] text-xs font-bold uppercase tracking-widest mt-1">High-Impact Projects</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
            >
                <span className="text-xs text-[#95abda] uppercase tracking-[0.3em]">Explore</span>
                <Link to="about" smooth={true} offset={-80} duration={800}>
                    <FaChevronDown className="text-[var(--neon-cyan)] animate-bounce text-2xl" />
                </Link>
            </motion.div>
        </section>
    );
};

const SocialButton = ({ href, icon, label, delay }) => (
    <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + delay }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a1630] border border-[#35598d] flex items-center justify-center text-[#89a5da] text-xl sm:text-2xl hover:bg-[var(--neon-cyan)] hover:text-[#001224] hover:border-[var(--neon-cyan)] hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(55,240,255,0.4)] transition-all duration-300 relative group"
        aria-label={label}
    >
        {icon}
    </motion.a>
);

const TechBadge = ({ icon, label }) => (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#09162f] border border-[#2e4b7e] text-[#c4d7ff] hover:bg-[#0f1f40] hover:border-[var(--neon-cyan)]/50 transition-colors cursor-default">
        <span className="text-[var(--neon-cyan)]">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
    </div>
);

const FloatingOrb = ({ icon, label, className, delay }) => (
    <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className={`absolute ${className} hidden md:flex flex-col items-center gap-2 z-20`}
    >
        <div className="w-16 h-16 rounded-full bg-[#0b1a33] border border-[var(--neon-cyan)]/35 shadow-[0_0_30px_rgba(55,240,255,0.15)] flex items-center justify-center text-sm font-bold tracking-wider text-[#d7f8ff] backdrop-blur-md">
            {icon}
        </div>
        <span className="px-3 py-1 bg-[#071326]/80 rounded-full text-xs font-bold text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30 backdrop-blur-sm">
            {label}
        </span>
    </motion.div>
);

export default Hero;
