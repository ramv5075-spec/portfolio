import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { fadeIn } from "../utils/motion";
import { light, dark } from "../assets";
import style from "./styles/navbar.module.css";

const RESUME_LINK = "https://drive.google.com/file/d/1RaqEXtvEpP7AK8Q0sKZx7B8jvIubxVNY/preview";

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
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 780);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => setOpen(!isOpen);

  const handleNavClick = (name) => {
    setActive(name);
    if (isOpen) setOpen(false);
  };

  return (
    <div className={style.navbar_container}>
      {/* Scroll progress bar */}
      <div
        className={style.progress_bar}
        style={{ width: scrolled ? scrollProgress + "%" : "0%" }}
      />

      <nav className={style.navbar + (scrolled ? " " + style.fixed : "")}>

        {/* Logo / name */}
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={style.logo_btn}
          whileHover={{ scale: 1.05 }}
        >
          <span className={style.logo_text}>RAM<span className={style.logo_accent}>.</span></span>
        </motion.button>

        {/* Desktop nav */}
        <ul className={style.navlink}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                className={style.font + (active === link.name ? " " + style.font_active : "")}
                onClick={() => handleNavClick(link.name)}
              >
                {link.name}
                {active === link.name && <span className={style.active_dot} />}
              </a>
            </li>
          ))}

          <li>
            <motion.a
              href={RESUME_LINK}
              target="_blank"
              rel="noreferrer"
              className={style.resume_btn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </li>

          {/* <li>
            <button type="button" className={style.theme_btn} onClick={toggleTheme}>
              <img
                src={theme === "light" ? light : dark}
                className={style.theme_img}
                alt="toggle theme"
                loading="lazy"
              />
            </button>
          </li> */}
        </ul>

        {/* Hamburger */}
        <div
          className={style.hamburger}
          onClick={handleMenuClick}
          onKeyDown={(e) => e.key === "Enter" && handleMenuClick()}
          role="button"
          tabIndex={0}
          aria-label="Toggle menu"
        >
          <span className={style.line + (isOpen ? " " + style.open : "")} />
          <span className={style.line + (isOpen ? " " + style.open : "")} />
          <span className={style.line + (isOpen ? " " + style.open : "")} />
        </div>

        {/* Mobile menu */}
        <ul className={style.mobilemenu + (isOpen ? " " + style.mobilemenu_open : "")}>
          <li className={style.mobile_top}>
            <button type="button" className={style.theme_btn} onClick={toggleTheme}>
              <img
                src={theme === "light" ? light : dark}
                className={style.theme_img}
                alt="toggle theme"
                loading="lazy"
              />
            </button>
          </li>

          {NAV_LINKS.map((link, index) => (
            <li key={link.id}>
              <motion.a
                href={link.url}
                className={style.mobile_font + (active === link.name ? " " + style.mobile_active : "")}
                variants={fadeIn("right", "", index * 0.08, 0.4)}
                initial="hidden"
                animate={isOpen ? "show" : "hidden"}
                onClick={() => handleNavClick(link.name)}
              >
                {link.name}
              </motion.a>
            </li>
          ))}

          <li>
            <motion.a
              href={RESUME_LINK}
              target="_blank"
              rel="noreferrer"
              className={style.mobile_resume_btn}
              variants={fadeIn("right", "", 0.5, 0.4)}
              initial="hidden"
              animate={isOpen ? "show" : "hidden"}
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
