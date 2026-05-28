import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaMedium, FaFileDownload, FaChevronDown, FaCode, FaRobot, FaDatabase } from "react-icons/fa";

const Hero = ({ hero }) => {
    // Ensure hero has safe defaults
    const safeHero = {
        tagline: hero?.tagline || 'Welcome',
        title: Array.isArray(hero?.title) ? hero.title : ['Build', 'the Future'],
        roles: Array.isArray(hero?.roles) ? hero.roles : ['Developer'],
        description: hero?.description || 'Creating amazing things',
        resumeUrl: hero?.resumeUrl || '#',
        imageUrl: hero?.imageUrl || '/images/profile.jpg'
    };

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
                        <span className="text-[#bdd5ff] text-sm font-semibold tracking-[0.12em] uppercase">{safeHero.tagline}</span>
                    </motion.div>

                    <div className="relative">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight neon-title">
                            {safeHero.title[0]} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-cyan)] via-[#e6fdff] to-[var(--neon-blue)]">
                                {safeHero.title[1]}
                            </span>
                        </h1>
                    </div>

                    <div className="text-xl sm:text-3xl lg:text-4xl font-bold h-[42px] sm:h-[50px] flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                        <span className="text-[var(--neon-green)] font-black text-3xl sm:text-4xl">&gt;_</span>
                        <Typewriter
                            words={safeHero.roles}
                            loop={0}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </div>

                    <p className="text-lg md:text-xl text-[#a4bbeb] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        {safeHero.description}
                    </p>

                    <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-4">
                        <a
                            href={safeHero.resumeUrl}
                            download="Yashika Sapra.pdf"
                            className="btn-primary"
                        >
                            <FaFileDownload />
                            <span>Resume</span>
                        </a>
                        <Link
                            to="projects"
                            smooth={true}
                            duration={500}
                            offset={-80}
                            className="btn-secondary cursor-pointer text-3xl text-[#6a8dc7] hover:text-[var(--neon-cyan)] transition-colors animate-bounce-slow"
                        >
                            <span>My Work</span>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative order-1 lg:order-2"
                >
                    <div className="aspect-square rounded-full overflow-hidden w-[70%] max-w-[380px] lg:w-full lg:max-w-none mx-auto relative z-10 shadow-[0_0_60px_rgba(55,240,255,0.4)] border-4 border-[var(--line)]">
                        <img
                            src={safeHero.imageUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[90%] h-[90%] bg-gradient-to-tr from-[var(--neon-blue)]/50 to-[var(--neon-cyan)]/50 rounded-full blur-3xl animate-pulse-slow" />
                    </div>
                    <TechIcon icon={<FaCode />} position="top-1/4 left-0" delay={0.2} />
                    <TechIcon icon={<FaRobot />} position="top-1/2 right-0" delay={0.4} />
                    <TechIcon icon={<FaDatabase />} position="bottom-1/4 left-1/4" delay={0.6} />
                </motion.div>

            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <Link
                    to="about"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="cursor-pointer text-3xl text-[#6a8dc7] hover:text-[var(--neon-cyan)] transition-colors animate-bounce-slow"
                >
                    <FaChevronDown />
                </Link>
            </motion.div>
        </section>
    );
};

const TechIcon = ({ icon, position, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay, duration: 0.5, type: "spring", stiffness: 120 }}
        className={`absolute ${position} w-16 h-16 bg-[#0a1a35]/80 backdrop-blur-sm border border-[var(--line)] rounded-full flex items-center justify-center text-3xl text-[var(--neon-cyan)] shadow-lg`}
    >
        {icon}
    </motion.div>
);

export default Hero;
