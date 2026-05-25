import { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Service from './components/Service';
import TechStack from './components/TechStack';
import Work from './components/Work';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarsCanvas from './components/Stars';
import PortfolioChat from './components/PortfolioChat';
import DotNav from './components/DotNav';
import TerminalEgg from './components/TerminalEgg';
import LeetCode from './components/LeetCode';
import APILab from './components/APILab';
import AnnouncementBar from './components/AnnouncementBar';
import Articles from './components/Articles';

function App() {
  return (
    <ThemeProvider>

      {/* ── Fixed elements — outside all stacking contexts ── */}
      <AnnouncementBar />
      <DotNav />
      <TerminalEgg />
      <PortfolioChat />

      {/* ── Hero ── */}
      <div className="relative w-screen h-screen">
        <Home />
        <StarsCanvas />
      </div>

      {/* ── Main content ── */}
      <div className="relative body">
        <Navbar />
        <About />
        <Experience />
        <TechStack />
        <Service />
        <Work />
        <APILab />
        <Articles />
        <div><Testimonial /></div>
        <LeetCode />
        <div><Contact /></div>
      </div>

      <Footer />

    </ThemeProvider>
  );
}

export default App;
