import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import VideoResume from "./sections/VideoResume";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Achievements from "./sections/Achievements";
import Workshops from "./sections/Workshops";
import Contact from "./sections/Contact";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/Admin";
import usePortfolioData from "./hooks/usePortfolioData"; // Import the hook

function MainLayout() {
  const { portfolioData, loading } = usePortfolioData();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#03111f] text-white text-2xl">
        Loading Portfolio...
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#03111f] text-white text-2xl">
        Error: Could not load portfolio data.
      </div>
    );
  }

  const { name, hero, about, social, skills, projects, certifications, achievements, workshops, contact } = portfolioData;

  return (
    <div className="min-h-screen overflow-x-hidden text-white selection:bg-[var(--neon-cyan)] selection:text-[#03111f]">
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />
      <div className="fixed inset-0 scanline pointer-events-none z-0" />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-cyan)] to-[var(--neon-green)] origin-left z-[100] shadow-[0_0_22px_rgba(55,240,255,0.85)]"
        style={{ scaleX }}
      />
      <Navbar social={social} />
      <main className="relative z-10">
        <Hero hero={hero} />
        <About about={about} />
        <VideoResume />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
        <Achievements achievements={achievements} />
        <Workshops workshops={workshops} />
        <Contact contact={contact} social={social} />
      </main>
      <footer className="text-center py-8 text-[#7f96c7] border-t border-[var(--line)]">
        <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="flex items-center justify-center gap-2 mt-2">
          Made with <FaHeart className="text-red-500" /> in India
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
