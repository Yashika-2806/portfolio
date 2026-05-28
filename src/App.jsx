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
import Footer from "./components/Footer";
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

  // Debug log - log all data being received
  if (!loading && portfolioData) {
    console.log("✅ PORTFOLIO DATA LOADED:", {
      name: portfolioData.name,
      hasHero: !!portfolioData.hero,
      hasAbout: !!portfolioData.about,
      skillsKeys: portfolioData.skills ? Object.keys(portfolioData.skills) : [],
      projectsLength: Array.isArray(portfolioData.projects) ? portfolioData.projects.length : 'NOT AN ARRAY',
      certificationsLength: Array.isArray(portfolioData.certifications) ? portfolioData.certifications.length : 'NOT AN ARRAY',
      achievementsLength: Array.isArray(portfolioData.achievements) ? portfolioData.achievements.length : 'NOT AN ARRAY',
      workshopsLength: Array.isArray(portfolioData.workshops) ? portfolioData.workshops.length : 'NOT AN ARRAY',
      hasSocial: !!portfolioData.social,
      hasContact: !!portfolioData.contact,
      allData: portfolioData
    });
  }

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

  const { name, hero, about, social, skills, projects, certifications, achievements, workshops, contact, videoResume } = portfolioData;

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
        <VideoResume videoResume={videoResume} />
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
  const { portfolioData, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="bg-[#030712] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[var(--neon-cyan)] mx-auto"></div>
          <h1 className="text-3xl font-bold mt-6">Loading Portfolio...</h1>
          <p className="text-lg text-[#a4bbeb] mt-2">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="bg-[#030712] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="text-lg text-[#a4bbeb] mt-2">
            Could not load portfolio data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#030712]">
      <Navbar social={portfolioData.social} />
      <Hero hero={portfolioData.hero} />
      <MainLayout portfolioData={portfolioData} />
      <Footer />
    </div>
  );
}

export default App;
