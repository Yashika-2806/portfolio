import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const getTrimmedCanvasUrl = (sourceCanvas) => {
    const context = sourceCanvas.getContext("2d");
    if (!context) return sourceCanvas.toDataURL();

    const { width, height } = sourceCanvas;
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    const sample = (x, y) => {
        const index = (y * width + x) * 4;
        return [pixels[index], pixels[index + 1], pixels[index + 2]];
    };

    const cornerSamples = [
        sample(0, 0),
        sample(width - 1, 0),
        sample(0, height - 1),
        sample(width - 1, height - 1),
    ];
    const pageBackground = cornerSamples.reduce(
        (acc, color) => color.map((value, index) => acc[index] + value),
        [0, 0, 0]
    ).map((value) => value / cornerSamples.length);

    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    const threshold = 28;

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            const index = (y * width + x) * 4;
            const alpha = pixels[index + 3];
            const distance =
                Math.abs(pixels[index] - pageBackground[0]) +
                Math.abs(pixels[index + 1] - pageBackground[1]) +
                Math.abs(pixels[index + 2] - pageBackground[2]);

            if (alpha > 12 && distance > threshold) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }

    if (minX >= maxX || minY >= maxY) return sourceCanvas.toDataURL();

    const padding = Math.round(Math.min(width, height) * 0.035);
    const cropX = Math.max(0, minX - padding);
    const cropY = Math.max(0, minY - padding);
    const cropWidth = Math.min(width - cropX, maxX - minX + padding * 2);
    const cropHeight = Math.min(height - cropY, maxY - minY + padding * 2);

    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = cropWidth;
    trimmedCanvas.height = cropHeight;
    trimmedCanvas
        .getContext("2d")
        ?.drawImage(sourceCanvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    return trimmedCanvas.toDataURL();
};

const CertificatePreview = ({ src, alt }) => {
    const canvasRef = useRef(null);
    const [hasError, setHasError] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const isPdf = src && src.toLowerCase().endsWith('.pdf');

    useEffect(() => {
        if (!isPdf) return;

        let cancelled = false;
        let loadingTask = null;
        let renderTask = null;

        const renderPdf = async () => {
            setHasError(false);

            try {
                const response = await fetch(encodeURI(src));
                if (!response.ok) throw new Error(`Failed to load ${src}`);

                const pdfData = await response.arrayBuffer();
                loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfData) });
                const pdfDocument = await loadingTask.promise;

                if (cancelled) return;

                const page = await pdfDocument.getPage(1);

                if (cancelled) return;

                // Render at 2x scale for crisp quality
                const viewport = page.getViewport({ scale: 2.5 });
                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext("2d");
                if (!context) return;

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                renderTask = page.render({ canvasContext: context, viewport });
                await renderTask.promise;

                if (!cancelled) {
                    setImageUrl(getTrimmedCanvasUrl(canvas));
                }
            } catch {
                if (!cancelled) setHasError(true);
            }
        };

        renderPdf();

        return () => {
            cancelled = true;
            if (renderTask) renderTask.cancel();
            if (loadingTask) loadingTask.destroy();
        };
    }, [src, isPdf]);

    // For non-PDF images (png, jpg, etc.)
    if (!isPdf) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#0a1428]">
                {hasError ? (
                    <div className="flex flex-col items-center gap-3 text-[#4a6a9e]">
                        <FaAward className="text-5xl" />
                        <span className="text-sm">Could not load certificate</span>
                    </div>
                ) : (
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                        onError={() => setHasError(true)}
                    />
                )}
            </div>
        );
    }

    // For PDFs - show the rendered image
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#0a1428]">
            {/* Hidden canvas for rendering */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {hasError ? (
                <div className="flex flex-col items-center gap-3 text-[#4a6a9e]">
                    <FaAward className="text-5xl" />
                    <span className="text-sm">Could not load certificate</span>
                </div>
            ) : imageUrl ? (
                <img
                    src={imageUrl}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="flex items-center gap-3 text-[#6a8dc7]">
                    <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-[var(--neon-cyan)]"></div>
                    <span className="text-sm">Loading certificate...</span>
                </div>
            )}
        </div>
    );
};

const CertificateSection = ({ cert, index }) => {
    const safeCert = {
        title: cert?.title || 'Certification',
        issuer: cert?.issuer || 'Issuer',
        date: cert?.date || '',
        learned: cert?.learned || '',
        applied: cert?.applied || '',
        image: cert?.image || ''
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="panel rounded-2xl overflow-hidden">
                {/* Certificate image - full width, large */}
                <div className="w-full aspect-[4/3] md:aspect-[16/10] relative bg-[#0a1428]">
                    {safeCert.image ? (
                        <CertificatePreview src={safeCert.image} alt={safeCert.title} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaAward className="text-7xl text-[#1e2d4a]" />
                        </div>
                    )}
                </div>

                {/* Certificate details below */}
                <div className="p-6 md:p-8 bg-[#060e1a]/80">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <FaAward className="text-[var(--neon-cyan)] text-2xl" />
                        <span className="text-sm font-bold text-[var(--neon-cyan)] uppercase tracking-widest">
                            {safeCert.issuer}
                        </span>
                        {safeCert.date && (
                            <span className="text-sm font-medium text-[#7ee9ff] ml-auto">{safeCert.date}</span>
                        )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {safeCert.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {safeCert.learned && (
                            <div>
                                <p className="text-sm font-bold text-[#6a8dc7] uppercase tracking-wider mb-1">What I Learned</p>
                                <p className="text-base text-[#9ab0df] leading-relaxed">{safeCert.learned}</p>
                            </div>
                        )}
                        {safeCert.applied && (
                            <div>
                                <p className="text-sm font-bold text-[#6a8dc7] uppercase tracking-wider mb-1">How I Applied It</p>
                                <p className="text-base text-[#9ab0df] leading-relaxed">{safeCert.applied}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Certifications = ({ certifications }) => {
    const safeCertifications = Array.isArray(certifications) ? certifications : [];

    return (
        <section id="certifications" className="section-shell">
            <SectionTitle>Certifications & Events</SectionTitle>
            <p className="text-center text-[#9ab0df] max-w-2xl mx-auto mt-4 mb-16 text-lg">
                Industry-recognized credentials that validate my expertise.
            </p>

            {safeCertifications.length > 0 ? (
                <div className="flex flex-col gap-16 md:gap-20">
                    {safeCertifications.map((cert, index) => (
                        <CertificateSection key={index} cert={cert} index={index} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-[#9ab0df] py-12">No certifications found</p>
            )}
        </section>
    );
};

export default Certifications;
