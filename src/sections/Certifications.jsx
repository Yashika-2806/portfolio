import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaAward, FaExternalLinkAlt } from "react-icons/fa";
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

const Certifications = ({ certifications }) => {
    // Ensure certifications is always an array
    const safeCertifications = Array.isArray(certifications) ? certifications : [];

    return (
        <section id="certifications" className="section-shell">
            <SectionTitle>Certifications & Credentials</SectionTitle>
            <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {safeCertifications.length > 0 ? safeCertifications.map((cert, index) => (
                    <CertificationCard key={index} cert={cert} index={index} />
                )) : (
                    <p className="col-span-full text-center text-[#9ab0df] py-12">No certifications found</p>
                )}
            </div>
        </section>
    );
};

const CertificationCard = ({ cert, index }) => {
    const [currentImage, setCurrentImage] = useState(0);
    // Ensure cert.images is always an array
    const images = Array.isArray(cert?.images) ? cert.images : [];

    const nextImage = () => {
        if (images.length > 0) {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (images.length > 0) {
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="panel rounded-2xl overflow-hidden group"
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white leading-tight">{cert.title}</h3>
                </div>
            </div>
            <div className="p-5">
                <p className="text-sm text-[#9ab0df] mb-3">
                    <span className="font-semibold text-[#7ee9ff]">Issued by:</span> {cert.issuer}
                </p>
                <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center block py-2 bg-[var(--neon-blue)]/20 text-[var(--neon-cyan)] rounded-lg border border-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/40 transition-all font-semibold text-sm"
                >
                    View Credential
                </a>
            </div>
        </motion.div>
    );
};

export default Certifications;
