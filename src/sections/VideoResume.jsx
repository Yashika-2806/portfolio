import { motion } from "framer-motion";

const VideoResume = () => {
    return (
        <section id="video-resume" className="section-shell relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--neon-blue)]/8 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--neon-cyan)]/8 rounded-full blur-[150px]" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-14 md:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 md:mb-6 neon-title">
                        Video <span className="neon-accent">Resume</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#92abdc] max-w-3xl mx-auto">
                        <strong>2-minute walkthrough:</strong> From AI hobby projects to production systems. See how I ship end-to-end: model → API → integration. <em className="text-[var(--neon-cyan)]">Click play below.</em>
                    </p>
                </div>

                <div className="max-w-5xl mx-auto aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(55,240,255,0.12)] border border-[var(--line)] bg-[#071120] group relative panel">
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#8ea8da] pointer-events-none">
                        <span>Video Feed</span>
                        <span>Neural Intro</span>
                    </div>
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=7jJ5X6h9Q123456&controls=1&modestbranding=1"
                        title="Video Resume"
                        frameBorder="0"
                        allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 pt-7 sm:pt-8"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default VideoResume;
