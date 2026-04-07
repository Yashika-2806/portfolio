import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaAward, FaExternalLinkAlt } from "react-icons/fa";
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
            className="w-full h-full overflow-hidden flex items-center justify-center bg-[#1a1a1a]"
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

const Certifications = () => {
    const certifications = [
        {
            title: "Fundamentals of Building AI Agents",
            issuer: "Coursera",
            date: "Jan 2025",
            learned: "Multi-agent architecture, tool integration patterns, reliability",
            applied: "Built Nirmaan with 3 coordinated agents. Implemented error handling + retry logic.",
            description: "Multi-agent orchestration, tool calling, reliability patterns at scale",
            images: [
                "/images/fundamentals of building ai agents courseera.pdf"
            ],
            verifyUrl: "/images/fundamentals of building ai agents courseera.pdf"
        },
        {
            title: "Introduction to Large Language Models",
            issuer: "Coursera",
            date: "Nov 2024",
            learned: "LLM architecture, prompt engineering, token economics",
            applied: "LLM integration in Nirmaan for email parsing + classification. Cost-per-token optimized.",
            description: "Large language model architecture and practical applications",
            images: [
                "/images/intoduction to llms courseera.pdf"
            ],
            verifyUrl: "/images/intoduction to llms courseera.pdf"
        },
        {
            title: "Intro to Embedded Systems",
            issuer: "Coursera",
            date: "Sep 2024",
            learned: "Microcontroller programming, sensor integration, real-time constraints, power optimization",
            applied: "Architected sensor network for home automation. Solved 50ms latency challenge with event-driven design.",
            description: "Microcontroller design and embedded systems development",
            images: [
                "/images/intro to embeddeed.pdf"
            ],
            verifyUrl: "/images/intro to embeddeed.pdf"
        },
        {
            title: "Generative AI",
            issuer: "Databricks",
            date: "Aug 2024",
            learned: "Generative models, fine-tuning strategies, deployment optimization",
            applied: "Fine-tuned inference models for urban analytics classification. Improved prediction accuracy to 87%.",
            description: "Generative model concepts and Databricks platform hands-on",
            images: [
                "/images/generative ai databricks.pdf"
            ],
            verifyUrl: "/images/generative ai databricks.pdf"
        },
        {
            title: "Oracle Database Professional",
            issuer: "Oracle",
            date: "Jun 2024",
            learned: "Advanced SQL, indexing strategies, query optimization, database architecture",
            applied: "Designed PostgreSQL schema for analytics platform. Achieved sub-second queries on 100K+ records.",
            description: "Professional database design and optimization certification",
            images: [
                "/images/ecertificate oracle.pdf"
            ],
            verifyUrl: "/images/ecertificate oracle.pdf"
        },
        {
            title: "Agentic AI Workshop",
            issuer: "Workshop",
            date: "Jan 2025",
            learned: "Autonomous system design, reliability patterns, failure recovery",
            applied: "Direct application to Nirmaan multi-agent orchestration and system resilience.",
            description: "Hands-on workshop on building autonomous AI systems",
            images: [
                "/images/agentic ai workshop certificate.png"
            ],
            verifyUrl: "/images/agentic ai workshop certificate.png"
        }
    ];

    return (
        <section id="certifications" className="section-shell relative">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-14 md:mb-24 text-white tracking-tight neon-title">
                    Certifications & <span className="neon-accent">Events</span>
                </h2>

                <div className="flex flex-col gap-10 md:gap-16">
                    {certifications.map((cert, idx) => (
                        <CertEventCard key={idx} cert={cert} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const CertEventCard = ({ cert, index }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % cert.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + cert.images.length) % cert.images.length);
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
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white relative z-10">{cert.title}</h3>
                    <p className="text-[var(--neon-cyan)] text-sm relative z-10 opacity-90 tracking-[0.12em] uppercase">{cert.issuer}</p>
                </div>
                <div className="bg-[rgba(55,240,255,0.08)] p-3 rounded-xl border border-[rgba(55,240,255,0.2)] hidden md:block">
                    <FaAward className="text-3xl text-[var(--neon-cyan)]" />
                </div>
            </div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] h-full min-h-[700px] sm:min-h-[800px] lg:min-h-[750px]">
                <div className="relative h-[500px] sm:h-[650px] lg:h-[700px] bg-[#03070f] group/slider overflow-hidden flex items-center justify-center p-0">
                    <AnimatePresence mode="wait">
                        {cert.images[currentImage]?.toLowerCase().endsWith('.pdf') ? (
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="w-full h-full overflow-hidden"
                            >
                                <CertificatePreview
                                    src={cert.images[currentImage]}
                                    alt={`${cert.title} certificate`}
                                />
                            </motion.div>
                        ) : (
                            <motion.img
                                key={currentImage}
                                src={cert.images[currentImage]}
                                alt={`${cert.title} certificate`}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="w-full h-full object-contain bg-[#1a1a1a] block"
                            />
                        )}
                    </AnimatePresence>

                    {cert.images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[var(--neon-cyan)] hover:text-[#05111e] transition-all z-20 cursor-pointer"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[var(--neon-cyan)] hover:text-[#05111e] transition-all z-20 cursor-pointer"
                            >
                                <FaChevronRight />
                            </button>
                        </>
                    )}
                </div>

                <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-between bg-transparent">
                    <div className="space-y-5 mb-5 sm:mb-6">
                        <div className="bg-[#081224] p-5 sm:p-6 rounded-xl border border-[rgba(55,240,255,0.2)]">
                            <h4 className="text-sm font-bold text-[var(--neon-cyan)] mb-2 uppercase tracking-wide">What I Learned</h4>
                            <p className="text-[#b3c8f4] text-base leading-relaxed">{cert.learned}</p>
                        </div>
                        
                        <div className="bg-[#0a1627] p-5 sm:p-6 rounded-xl border border-[rgba(55,240,255,0.15)]">
                            <h4 className="text-sm font-bold text-[var(--neon-green)] mb-2 uppercase tracking-wide">How I Applied It</h4>
                            <p className="text-[#b3c8f4] text-base leading-relaxed">{cert.applied}</p>
                        </div>
                    </div>

                    {cert.verifyUrl && (
                        <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-3.5 sm:py-4 bg-transparent border border-[rgba(55,240,255,0.3)] text-[var(--neon-cyan)] rounded-xl hover:bg-[var(--neon-cyan)] hover:text-[#06101d] transition-all duration-300 font-bold text-base sm:text-lg group/link"
                        >
                            <span>View Certificate</span>
                            <FaExternalLinkAlt className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Certifications;
