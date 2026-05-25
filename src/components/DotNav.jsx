import React, { useState, useEffect } from "react";
import style from "./styles/dotnav.module.css";

const SECTIONS = [
  { id: "about",       label: "About" },
  { id: "experience",  label: "Experience" },
  { id: "techstack",   label: "Skills" },
  { id: "service",     label: "Services" },
  { id: "work",        label: "Projects" },
  { id: "testimonial", label: "Testimonials" },
  { id: "contact",     label: "Contact" },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'apilab', label: 'API Lab' },
  { id: 'articles', label: 'Writing' },
];

const DotNav = () => {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);

      let current = "";
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) current = sec.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <nav className={style.nav} aria-label="Section navigation">
      {SECTIONS.map((sec) => (
        <button
          key={sec.id}
          className={style.dot_wrap}
          onClick={() => scrollTo(sec.id)}
          aria-label={sec.label}
          title={sec.label}
        >
          <span className={style.tooltip}>{sec.label}</span>
          <span className={active === sec.id ? style.dot_active : style.dot} />
        </button>
      ))}
    </nav>
  );
};

export default DotNav;
