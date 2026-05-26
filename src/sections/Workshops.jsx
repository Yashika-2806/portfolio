import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

const Workshops = ({ workshops }) => {
    return (
        <section id="workshops" className="section-shell">
            <SectionTitle>Workshops & Seminars</SectionTitle>
            <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                {workshops.map((item, index) => (
                    <WorkshopCard key={index} item={item} />
                ))}
            </div>
        </section>
    );
};

const WorkshopCard = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="panel p-6 md:p-8 rounded-2xl flex flex-col"
        >
            <div className="flex-grow">
                <p className="text-sm text-[#7ee9ff] font-semibold mb-2">{item.date}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-base text-[#9ab0df] mb-4">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-[var(--line)]">
                <p className="text-sm text-[#9ab0df]">
                    <span className="font-semibold text-[#7ee9ff]">Role:</span> {item.role}
                </p>
            </div>
        </motion.div>
    );
};

export default Workshops;
