import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc';
import style from './styles/about.module.css';
import { textVariant, fadeIn } from '../utils/motion';

const HIGHLIGHTS = [
  { icon: "🎓", label: "Education", value: "MS CSE @ University at Buffalo" },
  { icon: "💼", label: "Experience", value: "4+ Years · 3 Companies" },
  { icon: "🧠", label: "Specialization", value: "AI / ML + Full-Stack" },
  { icon: "☁️", label: "Cloud", value: "AWS · GCP · Azure" },
  { icon: "📍", label: "Location", value: "New York, NY" },
  { icon: "✅", label: "Status", value: "Available Now · F-1 OPT" },
];

const About = () => {
  const resumeHref = "https://drive.google.com/file/d/1iDAS97T-d9uYfK6dxMZnmc2J9O6dL6up/preview";
  const liHref = "https://www.linkedin.com/in/ramvasanth-mahendran-8a0507203/";

  return (
    <>
      <motion.h1 variants={textVariant()} className={style.title}>
        About Me
      </motion.h1>

      <div className={style.layout}>

        {/* LEFT: text */}
        <div className={style.left}>
          <motion.p variants={fadeIn("up", "", 0.1, 0.5)} className={style.text}>
            Hey! I’m{" "}
            <a href={liHref} target="_blank" rel="noreferrer" className={style.link}>
              Ramvasanth Mahendran
            </a>
            {" "}— a Full-Stack Developer and AI Engineer completing my MS in Computer Science &amp; Engineering (Systems Track) at the University at Buffalo.
          </motion.p>
          <motion.p variants={fadeIn("up", "", 0.2, 0.5)} className={style.text}>
            Most recently at <strong className={style.highlight}>Hachette Book Group</strong>, I built a production RAG platform with FAISS vector indexing, local Mistral 7B GPU inference, and FastAPI microservices — cutting query response time by 30% and manual incident resolution by 40%.
          </motion.p>
          <motion.p variants={fadeIn("up", "", 0.3, 0.5)} className={style.text}>
            Before that at <strong className={style.highlight}>CodeStax.ai</strong>, I shipped Core Banking modules, cross-platform React Native apps to the App Store &amp; Google Play, and an AWS CodePipeline CI/CD system that cut release cycles by 40%.
          </motion.p>
          <motion.p variants={fadeIn("up", "", 0.4, 0.5)} className={style.text}>
            I build at the intersection of <strong className={style.highlight}>AI and full-stack engineering</strong> — scalable backends, intuitive frontends, and intelligent systems that solve real problems.
          </motion.p>
          <motion.div variants={fadeIn("up", "", 0.5, 0.5)} className={style.cta_row}>
            <a href={resumeHref} target="_blank" rel="noreferrer" className={style.btn_primary}>
              View Resume
            </a>
            <a href="#contact" className={style.btn_secondary}>
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* RIGHT: highlight cards */}
        <motion.div variants={fadeIn("left", "", 0.2, 0.6)} className={style.right}>
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className={style.card}>
              <span className={style.card_icon}>{h.icon}</span>
              <div>
                <p className={style.card_label}>{h.label}</p>
                <p className={style.card_value}>{h.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </>
  );
};

export default SectionWrapper(About, "about", "");