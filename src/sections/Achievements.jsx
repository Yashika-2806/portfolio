import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTrophy } from "react-icons/fa";

const Achievements = () => {
    const achievements = [
        {
            title: "🥇 1st Position - GLAU Shark Tank",
            description: "Won against 50+ teams with innovative B2B automation product. Focused on problem clarity + execution roadmap. Prize: ₹50K + incubation mentorship.",
            date: "2024",
            images: [
                "/images/Shark tank1.jpeg"
            ]
        },
        {
            title: "🥈 2nd Position - Technavya Digital Storytelling",
            description: "Ranked 2/200+ participants. Built interactive web-based story platform using React + Three.js for 3D narrative. Creative + technical excellence.",
            date: "2024",
            images: [
                "/images/Story telling1.jpeg",
                "/images/Story telling2.jpeg"
            ]
        },
        {
            title: "⭐ AI Hackathon - Best Innovation",
            description: "24-hour sprint. Built real-time anomaly detection system. Won vs 120+ participants in innovation category. From ideation to working demo in 24hrs.",
            date: "2024",
            images: [
                "/images/AI summit1.jpeg",
                "/images/AI summit2.jpeg"
            ]
        },
        {
            title: "🎖️ 1st Position - IBM ICE Day Technical Poster",
            description: "Won among 80+ technical presentations. Research-based poster on distributed systems optimization. Defended complex ideas under scrutiny.",
            date: "2024",
            images: [
                "/images/Poster1.jpg",
                "/images/Poster2.jpeg",
                "/images/Poster3.jpeg"
            ]
        },
        {
            title: "🏆 IBM ICE Day Technical Quiz - Top Score",
            description: "94/100 - Highest score among 150+ competitors. Algorithms, system design, databases. Fundamentals matter.",
            date: "2024",
            images: [
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
            ]
        },
        {
            title: "🥈 2nd Position - Tech Expo Prototype Challenge",
            description: "Built and demonstrated working IoT prototype. Won 2nd vs 60+ teams for technical depth + usability. Working demos > slideshows.",
            date: "2023",
            images: [
                "/images/Tech expo1.jpeg",
                "/images/Tech expo2.jpeg"
            ]
        },
        {
            title: "🌟 Recognized - Innovative Bharat Initiative",
            description: "Selected for tech-driven national development program. Among 40 participants matched to high-impact problem statements. Scaling potential.",
            date: "2024",
            images: [
                "/images/Innovative bharat1.jpg",
                "/images/Innovative bharat2.jpeg"
            ]
        },
        {
            title: "👑 Cultural Leadership - 12th Standard",
            description: "Selected as Cultural Head Girl (1/400 students). Organized 8 major school events. Led 25-person team. 60% school participation.",
            date: "2022",
            images: [
                "/images/Cultural head1.jpeg"
            ]
        }
    ];

    return (
        <section id="achievements" className="section-shell relative">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-14 md:mb-24 text-white tracking-tight neon-title">
                    Honors & <span className="neon-accent">Achievements</span>
                </h2>

                <div className="flex flex-col gap-10 md:gap-16">
                    {achievements.map((item, idx) => (
                        <AchievementCard key={idx} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const AchievementCard = ({ item, index }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % item.images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full panel rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group flex flex-col"
        >
            <div className="bg-gradient-to-r from-[#0d1a34] to-[#060c17] px-4 sm:px-8 py-4 sm:py-5 border-b border-[var(--line)] flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-20"></div>
                <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white relative z-10">{item.title}</h3>
                    <p className="text-[var(--neon-cyan)] text-sm relative z-10 opacity-90 tracking-[0.12em] uppercase">{item.date}</p>
                </div>
                <div className="bg-[rgba(55,240,255,0.08)] p-3 rounded-xl border border-[rgba(55,240,255,0.2)] hidden md:block">
                    <FaTrophy className="text-3xl text-[var(--neon-cyan)]" />
                </div>
            </div>

            <div className="grid lg:grid-cols-[1.8fr_1fr] h-full min-h-[420px] sm:min-h-[600px]">
                <div className="relative h-[340px] sm:h-[520px] lg:h-auto bg-[#03070f] group/slider overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImage}
                            src={item.images[currentImage]}
                            alt={`${item.title} - ${currentImage + 1}`}
                            initial={{ opacity: 0, scale: item.rotate ? 1.5 : 1.1 }}
                            animate={{ opacity: 1, scale: item.rotate ? 1.4 : 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute inset-0 w-full h-full object-cover bg-[#111] ${item.rotate ? 'rotate-90' : ''}`}
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>

                    {item.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[var(--neon-cyan)] hover:text-[#05111e] transition-all z-20 cursor-pointer"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[var(--neon-cyan)] hover:text-[#05111e] transition-all z-20 cursor-pointer"
                            >
                                <FaChevronRight />
                            </button>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {item.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImage ? "bg-[var(--neon-cyan)] w-8" : "bg-white/30 hover:bg-white"}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-center bg-transparent">
                    <div className="bg-[#081224] p-5 sm:p-8 rounded-2xl border border-[var(--line)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] h-full flex items-center">
                        <p className="text-[#b3c8f3] text-base sm:text-xl md:text-3xl leading-relaxed font-light text-center md:text-left">
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Achievements;
