import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTrophy } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";

const Achievements = ({ achievements }) => {
    // Ensure achievements is always an array
    const safeAchievements = Array.isArray(achievements) ? achievements : [];

    return (
        <section id="achievements" className="section-shell">
            <SectionTitle>Honors & Achievements</SectionTitle>
            <div className="mt-12 md:mt-20 max-w-5xl mx-auto space-y-16 md:space-y-20">
                {safeAchievements.length > 0 ? safeAchievements.map((item, index) => (
                    <AchievementItem key={index} item={item} index={index} />
                )) : (
                    <p className="text-[#9ab0df] text-center py-12">No achievements found</p>
                )}
            </div>
        </section>
    );
};

const AchievementItem = ({ item, index }) => {
    const [currentImage, setCurrentImage] = useState(0);
    // Ensure images is always an array
    const images = Array.isArray(item?.images) ? item.images : [];
    
    // Ensure item has safe defaults
    const safeItem = {
        icon: item?.icon || '🏆',
        date: item?.date || 'Date',
        title: item?.title || 'Achievement',
        description: item?.description || 'No description',
        rotate: !!item?.rotate
    };

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="border border-[var(--line)] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a1428] to-[#08101f] shadow-lg hover:shadow-[0_0_20px_rgba(55,240,255,0.15)] transition-shadow"
        >
            <div>
                {/* Image Section */}
                <div className="relative w-full min-h-[28rem] md:min-h-[34rem] overflow-hidden bg-[#03070f] group/slider flex items-center justify-center">
                    {images.length > 0 ? (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImage}
                                    src={images[currentImage]}
                                    alt={`${safeItem.title} - ${currentImage + 1}`}
                                    initial={{ opacity: 0, scale: 1.03 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className={`max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02] ${safeItem.rotate ? 'rotate-90' : ''}`}
                                />
                            </AnimatePresence>

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[var(--neon-cyan)] hover:text-[#05111e] transition-all z-20 cursor-pointer"
                                    >
                                        <FaChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[var(--neon-cyan)] hover:text-[#05111e] transition-all z-20 cursor-pointer"
                                    >
                                        <FaChevronRight size={16} />
                                    </button>

                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                                                className={`transition-all duration-300 ${idx === currentImage ? "bg-[var(--neon-cyan)] w-7 h-2" : "bg-white/30 w-2 h-2"} rounded-full hover:bg-white/60`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="text-[#9ab0df] text-center">No image</div>
                    )}
                </div>

                {/* Text Section */}
                <div className="p-7 md:p-10 bg-[#060e1a]/80">
                    <div className="flex items-start gap-4 mb-4">
                        <span className="text-3xl">{safeItem.icon}</span>
                        <div className="flex-1">
                            <p className="text-xs md:text-sm text-[#7ee9ff] font-semibold uppercase tracking-wider">{safeItem.date}</p>
                            <h3 className="text-xl md:text-3xl font-bold text-white mt-1 leading-tight">{safeItem.title}</h3>
                        </div>
                    </div>
                    <p className="text-base md:text-lg text-[#b3c8f3] leading-relaxed">
                        {safeItem.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};



export default Achievements;
