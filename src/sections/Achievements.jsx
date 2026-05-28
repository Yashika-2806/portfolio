import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTrophy } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";

const Achievements = ({ achievements }) => {
    // Ensure achievements is always an array
    const safeAchievements = Array.isArray(achievements) ? achievements : [];

    return (
        <section id="achievements" className="section-shell">
            <SectionTitle>Awards & Achievements</SectionTitle>
            <div className="mt-12 md:mt-20 max-w-4xl mx-auto">
                <div className="relative border-l-2 border-[var(--line)] pl-8 space-y-12">
                    {safeAchievements.length > 0 ? safeAchievements.map((item, index) => (
                        <AchievementItem key={index} item={item} index={index} />
                    )) : (
                        <p className="text-[#9ab0df] text-center py-12">No achievements found</p>
                    )}
                </div>
            </div>
        </section>
    );
};

const AchievementItem = ({ item, index }) => {
    const [currentImage, setCurrentImage] = useState(0);
    // Ensure images is always an array
    const images = Array.isArray(item?.images) ? item.images : [];

    const nextImage = (e) => {
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative"
        >
            <div className="absolute -left-[42px] top-1 w-8 h-8 rounded-full bg-[#09162f] border-4 border-[var(--neon-cyan)] flex items-center justify-center shadow-[0_0_10px_rgba(55,240,255,0.8)]">
                <i className={`fa-solid ${item.icon} text-[var(--neon-cyan)] text-sm`}></i>
            </div>
            <p className="text-sm text-[#7ee9ff] font-semibold mb-1">{item.date}</p>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-base md:text-lg text-[#9ab0df]">{item.description}</p>

            <div className="grid lg:grid-cols-[1.8fr_1fr] h-full min-h-[420px] sm:min-h-[600px]">
                <div className="relative h-[340px] sm:h-[520px] lg:h-auto bg-[#03070f] group/slider overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImage}
                            src={images[currentImage] || ''}
                            alt={`${item.title} - ${currentImage + 1}`}
                            initial={{ opacity: 0, scale: item.rotate ? 1.5 : 1.1 }}
                            animate={{ opacity: 1, scale: item.rotate ? 1.4 : 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute inset-0 w-full h-full object-cover bg-[#111] ${item.rotate ? 'rotate-90' : ''}`}
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>

                    {images && images.length > 1 && (
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
                                {images && Array.isArray(images) && images.length > 0 ? images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImage ? "bg-[var(--neon-cyan)] w-8" : "bg-white/30 hover:bg-white"}`}
                                    />
                                )) : null}
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
