import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';
import style from './styles/home.module.css';
import { fadeIn, staggerContainer } from '../utils/motion';

const ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'AI / ML Engineer',
  'Distributed Systems Builder',
];

const STATS = [
  { value: 4,  suffix: '+', label: 'Years Exp' },
  { value: 3,  suffix: '',  label: 'Companies' },
  { value: 30, suffix: '%', label: 'Perf Boost' },
  { value: 40, suffix: '%', label: 'Less Manual' },
  { value: 15, suffix: '+', label: 'Projects' },
];

// ── Update this with your real LeetCode count ──
const LEETCODE_SOLVED = 120;
const LEETCODE_URL = 'https://leetcode.com/u/Ramvasanth130699/';

const Typewriter = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className={style.typewriter}>
      {displayed}
      <span className={style.cursor}>|</span>
    </span>
  );
};

const Counter = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className={style.stat}>
      <span className={style.stat_value}>
        {count}<span className={style.stat_suffix}>{suffix}</span>
      </span>
      <span className={style.stat_label}>{label}</span>
    </div>
  );
};

function Home() {
  const iconCls    = style.btn_container + ' ' + style.btn_icon;
  const resumeCls  = style.btn_container + ' ' + style.btn_resume;
  const primaryCls = style.btn_container + ' ' + style.btn_primary;

  const ghHref = 'https://github.com/ramv5075-spec';
  const liHref = 'https://linkedin.com/in/ramvasanth-mahendran-8a0507203';
  const cvHref = 'https://drive.google.com/file/d/1RaqEXtvEpP7AK8Q0sKZx7B8jvIubxVNY/preview';

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      <div className={style.container}>

        <motion.p variants={fadeIn('', '', 0.05, 1)} className={style.greeting}>
          Hello, World 👋
        </motion.p>

        <p className={style.intro}>
          Hi, I&apos;m{' '}
          <motion.span variants={fadeIn('', '', 0.1, 1)} className={style.name}>
            Ramvasanth Mahendran
          </motion.span>
        </p>

        <motion.p variants={fadeIn('', '', 0.25, 1)} className={style.role_line}>
          <Typewriter />
        </motion.p>

        <motion.p variants={fadeIn('', '', 0.35, 1)} className={style.desc}>
          MS Computer Science and Engineering @ UB · 4+ years building AI systems, full-stack apps &amp; distributed platforms.
          <br />
          Actively seeking SDE, Full-Stack &amp; AI Engineering roles — available immediately.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeIn('', '', 0.5, 1)} className={style.cta_row}>
          <button
            className={primaryCls}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className={style.btn_hover}>Check out my work</span>
            <span className={style.btn}>Check out my work</span>
            <MdOutlineArrowForwardIos className={style.arrow} />
          </button>

          <a href={ghHref} target="_blank" rel="noreferrer" className={iconCls}>
            <FaGithub className={style.icon} />
            <span>GitHub</span>
          </a>

          <a href={liHref} target="_blank" rel="noreferrer" className={iconCls}>
            <FaLinkedin className={style.icon} />
            <span>LinkedIn</span>
          </a>

          <a href={cvHref} target="_blank" rel="noreferrer" className={resumeCls}>
            <HiDownload className={style.icon} />
            <span>Resume</span>
          </a>
        </motion.div>

        {/* Animated stats */}
        <motion.div variants={fadeIn('', '', 0.65, 1)} className={style.stats_row}>
          {STATS.map((s, i) => (
            <Counter key={i} value={s.value} suffix={s.suffix} label={s.label} />
          ))}

          {/* LeetCode badge — sits inline with stats */}
          <a
            href={LEETCODE_URL}
            target="_blank"
            rel="noreferrer"
            className={style.lc_badge}
            title="View LeetCode Profile"
          >
            <span className={style.lc_icon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#ffc01e"/>
              </svg>
            </span>
            <div className={style.lc_info}>
              <span className={style.lc_count}>{LEETCODE_SOLVED}</span>
              <span className={style.lc_label}>LeetCode</span>
            </div>
            <span className={style.lc_arrow}>↗</span>
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeIn('', '', 0.72, 1)} className={style.stats_divider} />

        {/* Open to work pill */}
        <motion.div variants={fadeIn('', '', 0.78, 1)} className={style.otw_pill}>
          <span className={style.pulse_dot} />
          <span className={style.otw_text}>Open to Work · F-1 OPT · Available Now</span>
        </motion.div>

        {/* AI chat hint */}
        <motion.p
          variants={fadeIn('', '', 0.88, 1)}
          className={style.chat_hint}
          onClick={() => document.querySelector('#portfolio-chat-btn')?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') document.querySelector('#portfolio-chat-btn')?.click(); }}
        >
          <span className={style.chat_icon}>💬</span>
          <span className={style.chat_text}>Ask my AI assistant about my projects, stack, or experience</span>
          <span className={style.chat_arrow}>↘</span>
        </motion.p>

      </div>
    </motion.section>
  );
}

export default Home;
