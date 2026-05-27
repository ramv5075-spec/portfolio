import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { fadeIn } from "../utils/motion";
import { light, dark } from "../assets";
import style from "./styles/navbar.module.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RESUME_LINK = "https://drive.google.com/file/d/1iDAS97T-d9uYfK6dxMZnmc2J9O6dL6up/preview";

const NAV_LINKS = [
  { id: 1, name: "About",      url: "/#about" },
  { id: 2, name: "Experience", url: "/#experience" },
  { id: 3, name: "Skills",     url: "/#techstack" },
  { id: 4, name: "Services",   url: "/#service" },
  { id: 5, name: "Projects",   url: "/#work" },
  { id: 6, name: "Contact",    url: "/#contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive]           = useState("");
  const [scrolled, setScrolled]       = useState(false);
  const [isOpen, setOpen]             = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isLabPage = location.pathname === "/lab";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop  = window.pageYOffset;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 780);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => setOpen(!isOpen);
  const handleNavClick  = (name) => { setActive(name); if (isOpen) setOpen(false); };
  const handleLogoClick = () => {
    if (isLabPage) navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={style.navbar_container}>
      <div className={style.progress_bar} style={{ width: scrolled ? scrollProgress + "%" : "0%" }} />

      <nav className={style.navbar + (scrolled ? " " + style.fixed : "")}>

        {/* Logo */}
        <motion.button type="button" onClick={handleLogoClick} className={style.logo_btn} whileHover={{ scale: 1.05 }}>
          <span className={style.logo_text}>RAM<span className={style.logo_accent}>.</span></span>
        </motion.button>

        {/* ── Desktop nav ── */}
        <ul className={style.navlink}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                className={style.font + (active === link.name ? " " + style.font_active : "")}
                onClick={() => handleNavClick(link.name)}
              >
                {link.name}
              </a>
            </li>
          ))}

          {/* ── RAM:// Lab link ── */}
          <li>
            <Link
              to="/lab"
              className={style.font + (isLabPage ? " " + style.font_active : "") + " " + style.lab_link}
              onClick={() => handleNavClick("Lab")}
            >
              <span className={style.ram_cyan}>RAM</span>
              <span className={style.ram_slash}>://</span>
              {!isLabPage && <span className={style.lab_new}>NEW</span>}
            </Link>
          </li>

          <li>
            <motion.a
              href={RESUME_LINK} target="_blank" rel="noreferrer"
              className={style.resume_btn}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </li>
        </ul>

        {/* Hamburger */}
        <div
          className={style.hamburger}
          onClick={handleMenuClick}
          onKeyDown={(e) => e.key === "Enter" && handleMenuClick()}
          role="button" tabIndex={0} aria-label="Toggle menu"
        >
          <span className={style.line + (isOpen ? " " + style.open : "")} />
          <span className={style.line + (isOpen ? " " + style.open : "")} />
          <span className={style.line + (isOpen ? " " + style.open : "")} />
        </div>

        {/* ── Mobile menu ── */}
        <ul className={style.mobilemenu + (isOpen ? " " + style.mobilemenu_open : "")}>
          <li className={style.mobile_top}>
            <button type="button" className={style.theme_btn} onClick={toggleTheme}>
              <img src={theme === "light" ? light : dark} className={style.theme_img} alt="toggle theme" loading="lazy" />
            </button>
          </li>

          {NAV_LINKS.map((link, index) => (
            <li key={link.id}>
              <motion.a
                href={link.url}
                className={style.mobile_font + (active === link.name ? " " + style.mobile_active : "")}
                variants={fadeIn("right", "", index * 0.08, 0.4)}
                initial="hidden" animate={isOpen ? "show" : "hidden"}
                onClick={() => handleNavClick(link.name)}
              >
                {link.name}
              </motion.a>
            </li>
          ))}

          {/* ── Mobile RAM:// link ── */}
          <li>
            <motion.div variants={fadeIn("right", "", 0.48, 0.4)} initial="hidden" animate={isOpen ? "show" : "hidden"}>
              <Link
                to="/lab"
                className={style.mobile_font + " " + style.mobile_lab + (isLabPage ? " " + style.mobile_active : "")}
                onClick={() => { handleNavClick("Lab"); setOpen(false); }}
              >
                <span className={style.ram_cyan}>RAM</span>
                <span>://</span>
                {!isLabPage && <span className={style.mobile_lab_badge}>NEW</span>}
              </Link>
            </motion.div>
          </li>

          <li>
            <motion.a
              href={RESUME_LINK} target="_blank" rel="noreferrer"
              className={style.mobile_resume_btn}
              variants={fadeIn("right", "", 0.56, 0.4)}
              initial="hidden" animate={isOpen ? "show" : "hidden"}
              onClick={() => setOpen(false)}
            >
              Resume
            </motion.a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
