import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import style from "./styles/impact.module.css";

const STATS = [
  { value: 30,  suffix: "%", label: "Query Accuracy Boost",       sub: "Hachette RAG Platform" },
  { value: 40,  suffix: "%", label: "Faster Incident Resolution",  sub: "Power Automate Pipelines" },
  { value: 40,  suffix: "%", label: "Release Cycles Reduced",      sub: "AWS CodePipeline CI/CD" },
  { value: 4,   suffix: "+", label: "Years of Experience",         sub: "Across 3 Companies" },
  { value: 15,  suffix: "+", label: "Projects Shipped",            sub: "Web, Mobile & AI" },
  { value: 35,  suffix: "%", label: "Frontend Performance Gain",   sub: "React Migration at Novalnet" },
];

const ROLES = ["SDE II", "Full-Stack Engineer", "AI Engineer", "Backend Engineer"];

/* animated counter hook */
const useCounter = (target, duration = 1800, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
};

const StatCard = ({ stat, started }) => {
  const count = useCounter(stat.value, 1600, started);
  return (
    <div className={style.stat_card}>
      <div className={style.stat_value}>
        {count}<span className={style.stat_suffix}>{stat.suffix}</span>
      </div>
      <div className={style.stat_label}>{stat.label}</div>
      <div className={style.stat_sub}>{stat.sub}</div>
    </div>
  );
};

const Impact = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={style.wrapper}>

      {/* ── IMPACT NUMBERS ── */}
      <motion.div variants={textVariant()} className={style.section_label}>
        By The Numbers
      </motion.div>
      <motion.h2 variants={fadeIn("", "", 0.1, 0.5)} className={style.section_title}>
        Real Impact. Measurable Results.
      </motion.h2>
      <motion.p variants={fadeIn("", "", 0.2, 0.5)} className={style.section_sub}>
        Every metric below came from production work — not side projects.
      </motion.p>

      <div ref={ref} className={style.stats_grid}>
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeIn("up", "", i * 0.08, 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <StatCard stat={stat} started={started} />
          </motion.div>
        ))}
      </div>

      {/* ── DIVIDER ── */}
      <div className={style.divider} />

      {/* ── OPEN TO WORK CTA ── */}
      <motion.div
        variants={fadeIn("up", "", 0.1, 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className={style.cta_box}
      >
        <div className={style.cta_left}>
          <div className={style.available_pill}>
            <span className={style.pulse_dot} />
            Available Now
          </div>
          <h2 className={style.cta_heading}>
            Open to Work
          </h2>
          <p className={style.cta_desc}>
            MS Computer Science and Engineering @ UB · F-1 OPT · Work authorized immediately · Open to relocate anywhere in the US.
          </p>
          <div className={style.role_tags}>
            {ROLES.map((r, i) => (
              <span key={i} className={style.role_tag}>{r}</span>
            ))}
          </div>
        </div>

        <div className={style.cta_right}>
          <a
            href="mailto:ramv5075@gmail.com"
            className={style.btn_hire}
          >
            Let's Talk →
          </a>
          <a
            href="https://drive.google.com/file/d/1RaqEXtvEpP7AK8Q0sKZx7B8jvIubxVNY/preview"
            target="_blank"
            rel="noreferrer"
            className={style.btn_resume}
          >
            View Resume
          </a>
          <div className={style.contact_links}>
            <a href="https://linkedin.com/in/ramvasanth-mahendran-8a0507203" target="_blank" rel="noreferrer" className={style.contact_link}>LinkedIn ↗</a>
            <a href="https://github.com/ramv5075-spec" target="_blank" rel="noreferrer" className={style.contact_link}>GitHub ↗</a>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default SectionWrapper(Impact, "impact", "");
