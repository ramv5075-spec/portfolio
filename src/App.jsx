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
import PortfolioChat from "./components/PortfolioChat";
import Impact from './components/Impact';
import DotNav from './components/DotNav';
import TerminalEgg from './components/TerminalEgg';
import LeetCode from './components/LeetCode';

function App() {
  return (
    <ThemeProvider>
      <div className="relative w-screen h-screen z-10">
        <Home />
        <StarsCanvas />
      </div>
      <div className="relative z-0 body">
        <Navbar />
        <About />
        <Experience />
        <TechStack />
        <Service />
        <Work />
        {/* <Impact /> */}
        <div><Testimonial /></div>
        <LeetCode/>
        <div><Contact /></div>
        <DotNav />
        <TerminalEgg />
      </div>
      <Footer />
      <PortfolioChat />
    </ThemeProvider>
  );
}

export default App;