import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AnnouncementBar from './components/AnnouncementBar';
import Lab from './components/Lab';
import LoadingScreen from './components/LoadingScreen';

/* ── Main portfolio page ── */
const Portfolio = () => (
  <>
    <AnnouncementBar />
    <DotNav />
    <TerminalEgg />
    <PortfolioChat />
    <div className="relative w-screen h-screen">
      <Home />
      <StarsCanvas />
    </div>
    <div className="relative body">
      <Navbar />
      <About />
      <Experience />
      <TechStack />
      <Service />
      <Work />
      <div><Testimonial /></div>
      <LeetCode />
      <Contact />
    </div>
    <Footer />
  </>
);

/* ── Lab page ── */
const LabPage = () => (
  <>
    <Navbar />
    <Lab />
    <Footer />
    <PortfolioChat />
    <TerminalEgg />
  </>
);

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider>

        {/* Loading screen — shows once on first visit */}
        {!loaded && (
          <LoadingScreen onComplete={() => setLoaded(true)} />
        )}

        {/* Main app — rendered underneath, visible after loading */}
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
          <Routes>
            <Route path="/"    element={<Portfolio />} />
            <Route path="/lab" element={<LabPage />} />
          </Routes>
        </div>

      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
