import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { FaUser, FaVideo, FaTools, FaProjectDiagram, FaCertificate, FaEnvelope, FaHome, FaChalkboardTeacher, FaTrophy, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", to: "about", icon: <FaUser /> },
        { name: "Video Resume", to: "video-resume", icon: <FaVideo /> },
        { name: "Skills", to: "skills", icon: <FaTools /> },
        { name: "Projects", to: "projects", icon: <FaProjectDiagram /> },
        { name: "Certifications", to: "certifications", icon: <FaCertificate /> },
        { name: "Awards", to: "achievements", icon: <FaTrophy /> },
        { name: "Workshops", to: "workshops", icon: <FaChalkboardTeacher /> },
        { name: "Contact", to: "contact", icon: <FaEnvelope /> },
    ];

    return (
        <nav className="fixed top-3 md:top-4 left-0 right-0 z-50 flex justify-center px-3 md:px-4">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`
                    w-full max-w-6xl flex items-center justify-between px-3 md:px-7 py-2.5 md:py-3 rounded-2xl
                    transition-all duration-300 border backdrop-blur-xl
                    ${scrolled
                        ? "bg-[#081224]/90 border-[var(--line)] shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                        : "bg-[#081224]/70 border-[#263c68]"
                    }
                `}
            >
                <Link
                    to="hero"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer flex items-center gap-3 text-[var(--neon-cyan)] hover:text-white transition-colors"
                >
                    <div className="w-10 h-10 rounded-xl bg-[#0a1a35] border border-[#35598d] flex items-center justify-center shadow-[0_0_12px_rgba(55,240,255,0.25)]">
                        <FaHome className="text-lg" />
                    </div>
                    <span className="hidden md:block font-semibold tracking-[0.14em] text-xs text-[#bdd5ff]">NEURAL GRID</span>
                </Link>

                <div className="hidden xl:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            spy={true}
                            activeClass="bg-[rgba(55,240,255,0.12)] text-[var(--neon-cyan)]"
                            offset={-100}
                            className="
                                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer
                                text-[#96b2e9] transition-all duration-300 border border-transparent
                                hover:bg-[rgba(55,240,255,0.08)] hover:text-white hover:border-[rgba(55,240,255,0.25)]
                            "
                        >
                            <span className="text-base">{link.icon}</span>
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>

                <a
                    href="#contact"
                    className="
                        hidden md:flex items-center gap-2 px-5 py-2
                        bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[#031326] font-bold rounded-xl
                        shadow-[0_0_16px_rgba(55,240,255,0.4)]
                        hover:shadow-[0_0_28px_rgba(55,240,255,0.6)] hover:scale-105 transition-all
                    "
                >
                    <span>Connect</span>
                </a>

                <button
                    className="xl:hidden w-10 h-10 rounded-xl border border-[#35598d] text-[var(--neon-cyan)] flex items-center justify-center"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </motion.div>

            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-[66px] left-3 right-3 md:left-4 md:right-4 panel p-3 md:p-4 xl:hidden"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#a8c2f3] border border-transparent hover:border-[rgba(55,240,255,0.25)] hover:bg-[rgba(55,240,255,0.08)]"
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
