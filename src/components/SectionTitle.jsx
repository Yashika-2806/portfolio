import { motion } from "framer-motion";

const SectionTitle = ({ children }) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-center text-white"
        >
            {children}
        </motion.h2>
    );
};

export default SectionTitle;
