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
import { user } from "./data/user";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <div className="min-h-screen overflow-x-hidden text-white selection:bg-[var(--neon-cyan)] selection:text-[#03111f]">
            <div className="fixed inset-0 grid-overlay pointer-events-none z-0" />
            <div className="fixed inset-0 scanline pointer-events-none z-0" />
            <motion.div
              className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-cyan)] to-[var(--neon-green)] origin-left z-[100] shadow-[0_0_22px_rgba(55,240,255,0.85)]"
              style={{ scaleX }}
            />
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <VideoResume />
              <Skills />
              <Projects />
              <Certifications />
              <Achievements />
              <Workshops />
              <Contact />
            </main>
            <footer className="text-center py-8 text-[#7f96c7] border-t border-[var(--line)]">
              <p>&copy; {new Date().getFullYear()} {user.name}. All rights reserved.</p>
              <p className="flex items-center justify-center gap-2 mt-2">
                Made with <FaHeart className="text-red-500" /> in India
              </p>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
