import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaGithub, FaLinkedin } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";

const Contact = ({ contact, social }) => {
    // Ensure contact has default values
    const safeContact = {
        email: contact?.email || 'contact@example.com',
        phone: contact?.phone || '+1 (555) 000-0000',
        address: contact?.address || 'Location not specified',
        description: contact?.description || 'Get in touch for collaborations or inquiries.'
    };

    // Ensure social has default values
    const safeSocial = {
        whatsapp: social?.whatsapp || '#',
        linkedin: social?.linkedin || '#',
        github: social?.github || '#',
        twitter: social?.twitter || '#',
        instagram: social?.instagram || '#'
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const phone = safeContact.phone.replace(/[^0-9]/g, "");
        const text = `Hello, my name is ${name}.\nMy email is ${email}.\n\nMessage: ${message}`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
        setFormData({ name: "", email: "", message: "" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="section-shell">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--neon-blue)]/8 blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--neon-cyan)]/8 blur-[150px]" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 md:mb-20"
                >
                    <SectionTitle title="Get In Touch" />
                </motion.div>

                <div className="mt-12 md:mt-20 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                            <p className="text-lg text-[#a4bbeb]">{safeContact.description}</p>
                        </div>
                        <div className="space-y-6">
                            <InfoItem icon="fa-envelope" text={safeContact.email} href={`mailto:${safeContact.email}`} />
                            <InfoItem icon="fa-phone" text={safeContact.phone} href={`tel:${safeContact.phone}`} />
                            <InfoItem icon="fa-map-marker-alt" text={safeContact.address} />
                        </div>
                        <div className="flex space-x-5 pt-4">
                            <SocialLink href={safeSocial.linkedin} icon="fa-linkedin" />
                            <SocialLink href={safeSocial.github} icon="fa-github" />
                            <SocialLink href={safeSocial.twitter} icon="fa-twitter" />
                            <SocialLink href={safeSocial.instagram} icon="fa-instagram" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="panel p-6 md:p-8 rounded-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

                            <div className="space-y-3">
                                <label htmlFor="name" className="text-base font-bold text-[#bdd4ff] uppercase tracking-wider">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#081224] border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(55,240,255,0.2)] text-white placeholder-[#6278a8] transition-all text-base sm:text-lg"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="email" className="text-base font-bold text-[#bdd4ff] uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#081224] border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(55,240,255,0.2)] text-white placeholder-[#6278a8] transition-all text-base sm:text-lg"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-base font-bold text-[#bdd4ff] uppercase tracking-wider">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#081224] border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(55,240,255,0.2)] text-white placeholder-[#6278a8] transition-all text-base sm:text-lg resize-none"
                                    placeholder="For hiring: Mention role type, team size, and timeline. For partnerships: Describe the collaboration. Response time: 24 hours."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 sm:py-5 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[#041121] font-extrabold text-lg sm:text-xl rounded-xl shadow-[0_0_20px_rgba(55,240,255,0.35)] hover:shadow-[0_0_30px_rgba(55,240,255,0.55)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const InfoItem = ({ icon, text, href }) => (
    <div className="flex items-center gap-4 text-lg">
        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#10203a] border border-[#263c68] flex items-center justify-center">
            <i className={`fa-solid ${icon} text-[var(--neon-cyan)]`}></i>
        </div>
        {href ? (
            <a href={href} className="text-[#a4bbeb] hover:text-white transition-colors">{text}</a>
        ) : (
            <span className="text-[#a4bbeb]">{text}</span>
        )}
    </div>
);

const SocialLink = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#10203a] border border-[#263c68] flex items-center justify-center text-xl text-[#a4bbeb] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]/50 transition-all"
    >
        <i className={`fab ${icon}`}></i>
    </a>
);

export default Contact;
