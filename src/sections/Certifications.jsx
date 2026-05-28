import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaAward } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const CertificatePreview = ({ src, alt }) => {
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let renderTask = null;
        let loadingTask = null;

        const renderCertificate = async () => {
            const canvas = canvasRef.current;
            const wrapper = wrapperRef.current;

            if (!canvas || !wrapper) {
                return;
            }

            setHasError(false);

            try {
                const response = await fetch(encodeURI(src));
                if (!response.ok) {
                    throw new Error(`Failed to load ${src}`);
                }

                const pdfData = await response.arrayBuffer();
                loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfData) });
                const pdfDocument = await loadingTask.promise;

                if (cancelled) {
                    return;
                }

                const page = await pdfDocument.getPage(1);

                if (cancelled) {
                    return;
                }

                const wrapperWidth = wrapper.clientWidth || 1;
                const wrapperHeight = wrapper.clientHeight || 1;
                const baseViewport = page.getViewport({ scale: 1 });
                const scale = Math.min(
                    wrapperWidth / baseViewport.width,
                    wrapperHeight / baseViewport.height
                );
                const viewport = page.getViewport({ scale: scale * 0.98 });
                const context = canvas.getContext("2d");

                if (!context) {
                    return;
                }

                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                canvas.style.width = `${Math.floor(viewport.width)}px`;
                canvas.style.height = `${Math.floor(viewport.height)}px`;

                renderTask = page.render({ canvasContext: context, viewport });
                await renderTask.promise;
            } catch {
                if (!cancelled) {
                    setHasError(true);
                }
            }
        };

        renderCertificate();

        return () => {
            cancelled = true;
            if (renderTask) {
                renderTask.cancel();
            }
            if (loadingTask) {
                loadingTask.destroy();
            }
        };
    }, [src]);

    return (
        <div
            ref={wrapperRef}
            className="w-full h-full overflow-hidden flex items-center justify-center bg-[#0a1428]"
        >
            {hasError ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain block"
                />
            ) : (
                <canvas
                    ref={canvasRef}
                    aria-label={alt}
                    className="block max-w-full max-h-full"
                />
            )}
        </div>
    );
};

const Certifications = ({ certifications }) => {
    const safeCertifications = Array.isArray(certifications) ? certifications : [];
    const [current, setCurrent] = useState(0);

    const handlePrev = () => {
        setCurrent((prev) => (prev === 0 ? safeCertifications.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrent((prev) => (prev === safeCertifications.length - 1 ? 0 : prev + 1));
    };

    if (safeCertifications.length === 0) {
        return (
            <section id="certifications" className="section-shell">
                <SectionTitle>Certifications & Events</SectionTitle>
                <p className="text-center text-[#9ab0df] py-12">No certifications found</p>
            </section>
        );
    }

    const cert = safeCertifications[current];
    const safeCert = {
        title: cert?.title || 'Certification',
        issuer: cert?.issuer || 'Issuer',
        date: cert?.date || '',
        learned: cert?.learned || '',
        applied: cert?.applied || '',
        image: cert?.image || ''
    };

    return (
        <section id="certifications" className="section-shell">
            <SectionTitle>Certifications & Events</SectionTitle>

            <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
                {/* Main carousel area */}
                <div className="relative panel rounded-2xl overflow-hidden">
                    {/* Certificate display */}
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Certificate image - takes up most of the space */}
                        <div className="lg:col-span-3 relative bg-[#0a1428] min-h-[300px] md:min-h-[420px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="w-full h-full absolute inset-0"
                                >
                                    {safeCert.image ? (
                                        <CertificatePreview src={safeCert.image} alt={safeCert.title} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FaAward className="text-6xl text-[#1e2d4a]" />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation arrows on the image */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)]/50 transition-all"
                                aria-label="Previous certificate"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)]/50 transition-all"
                                aria-label="Next certificate"
                            >
                                <FaChevronRight />
                            </button>
                        </div>

                        {/* Certificate details panel */}
                        <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center bg-[#060e1a]/80">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaAward className="text-[var(--neon-cyan)] text-xl" />
                                        <span className="text-xs font-semibold text-[var(--neon-cyan)] uppercase tracking-widest">
                                            {safeCert.issuer}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                                        {safeCert.title}
                                    </h3>

                                    {safeCert.date && (
                                        <p className="text-sm text-[#7ee9ff] font-medium mb-4">{safeCert.date}</p>
                                    )}

                                    {safeCert.learned && (
                                        <div className="mb-3">
                                            <p className="text-xs font-bold text-[#6a8dc7] uppercase tracking-wider mb-1">What I Learned</p>
                                            <p className="text-sm text-[#9ab0df] leading-relaxed">{safeCert.learned}</p>
                                        </div>
                                    )}

                                    {safeCert.applied && (
                                        <div className="mb-4">
                                            <p className="text-xs font-bold text-[#6a8dc7] uppercase tracking-wider mb-1">How I Applied It</p>
                                            <p className="text-sm text-[#9ab0df] leading-relaxed">{safeCert.applied}</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Pagination indicator */}
                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#1e2d4a]">
                                <span className="text-sm font-bold text-white">
                                    {String(current + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1 h-1 bg-[#1e2d4a] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((current + 1) / safeCertifications.length) * 100}%` }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>
                                <span className="text-sm text-[#6a8dc7]">
                                    {String(safeCertifications.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail strip */}
                <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {safeCertifications.map((c, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                                idx === current
                                    ? 'bg-[var(--neon-cyan)]/15 border-[var(--neon-cyan)]/50 text-[var(--neon-cyan)] shadow-[0_0_12px_rgba(55,240,255,0.15)]'
                                    : 'bg-[#0a1428] border-[#1e2d4a] text-[#6a8dc7] hover:border-[#3a5080] hover:text-white'
                            }`}
                        >
                            {c?.title || `Certificate ${idx + 1}`}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
