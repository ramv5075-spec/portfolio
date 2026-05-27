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
  { value: 4,   suffix: '+', label: 'Years Exp',   leet: false },
  { value: 3,   suffix: '',  label: 'Companies',   leet: false },
  { value: 15,  suffix: '+', label: 'Projects',    leet: false },
  { value: 30,  suffix: '%', label: 'Perf Boost',  leet: false },
  { value: 40,  suffix: '%', label: 'Less Manual', leet: false },
  { value: 120, suffix: '+', label: 'LeetCode',    leet: true  },
];

// Terminal commands that type out sequentially
const TERMINAL_LINES = [
  { type: 'cmd',    text: 'whoami' },
  { type: 'out',    text: 'Ramvasanth Mahendran' },
  { type: 'blank',  text: '' },
  { type: 'cmd',    text: 'cat role.txt' },
  { type: 'out',    text: 'Full-Stack & AI Engineer' },
  { type: 'out',    text: 'MS CS @ University at Buffalo' },
  { type: 'blank',  text: '' },
  { type: 'cmd',    text: 'ls skills/' },
  { type: 'dir',    text: 'React/  Node/  Python/  AWS/' },
  { type: 'dir',    text: 'LangChain/  FastAPI/  Docker/' },
  { type: 'blank',  text: '' },
  { type: 'cmd',    text: 'cat status.json' },
  { type: 'json',   text: '{' },
  { type: 'json',   text: '  "available": true,' },
  { type: 'json',   text: '  "visa": "F-1 OPT",' },
  { type: 'json',   text: '  "location": "New York, NY",' },
  { type: 'json',   text: '  "roles": ["SDE","Full-Stack","AI"]' },
  { type: 'json',   text: '}' },
  { type: 'blank',  text: '' },
  { type: 'cmd',    text: 'echo $OPEN_TO_WORK' },
  { type: 'green',  text: '✓ Available immediately' },
];

/* ── Terminal card ── */
const TerminalCard = () => {
  const [lines, setLines]         = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [typing, setTyping]       = useState(true);
  const [done, setDone]           = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const logRef = useRef(null);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  // Typing engine
  useEffect(() => {
    if (done) return;
    if (currentLine >= TERMINAL_LINES.length) { setDone(true); return; }

    const line = TERMINAL_LINES[currentLine];

    if (line.type === 'blank') {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { type: 'blank', text: '' }]);
        setCurrentLine(c => c + 1);
        setCharIdx(0);
      }, 120);
      return () => clearTimeout(t);
    }

    const isCmd  = line.type === 'cmd';
    const speed  = isCmd ? 55 : 18;
    const delay  = charIdx === 0 ? (isCmd ? 180 : 60) : speed;

    if (charIdx < line.text.length) {
      const t = setTimeout(() => {
        setCharIdx(c => c + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines(prev => [...prev, { type: line.type, text: line.text }]);
        setCurrentLine(c => c + 1);
        setCharIdx(0);
      }, isCmd ? 260 : 80);
      return () => clearTimeout(t);
    }
  }, [currentLine, charIdx, done]);

  const currentLineData = TERMINAL_LINES[currentLine];
  const partialText = currentLineData
    ? currentLineData.text.slice(0, charIdx)
    : '';

  const renderLine = (line, i) => {
    if (line.type === 'blank') return <div key={i} className={style.t_blank} />;
    if (line.type === 'cmd')   return <div key={i} className={style.t_line}><span className={style.t_prompt}>ram@portfolio:~$</span><span className={style.t_cmd}> {line.text}</span></div>;
    if (line.type === 'out')   return <div key={i} className={style.t_line}><span className={style.t_out}>{line.text}</span></div>;
    if (line.type === 'dir')   return <div key={i} className={style.t_line}><span className={style.t_dir}>{line.text}</span></div>;
    if (line.type === 'json')  return <div key={i} className={style.t_line}><span className={style.t_json}>{line.text}</span></div>;
    if (line.type === 'green') return <div key={i} className={style.t_line}><span className={style.t_green}>{line.text}</span></div>;
    return null;
  };

  return (
    <div className={style.terminal}>
      {/* Title bar */}
      <div className={style.t_bar}>
        <div className={style.t_dots}>
          <span className={style.t_red} />
          <span className={style.t_yellow} />
          <span className={style.t_green_dot} />
        </div>
        <span className={style.t_title}>ram@portfolio: ~</span>
        <span />
      </div>

      {/* Output */}
      <div className={style.t_body} ref={logRef}>
        {/* Welcome line */}
        <div className={style.t_line}>
          <span className={style.t_comment}>// Welcome to my portfolio terminal</span>
        </div>
        <div className={style.t_blank} />

        {/* Rendered lines */}
        {lines.map((l, i) => renderLine(l, i))}

        {/* Currently typing line */}
        {!done && currentLineData && currentLineData.type !== 'blank' && (
          <div className={style.t_line}>
            {currentLineData.type === 'cmd' && (
              <>
                <span className={style.t_prompt}>ram@portfolio:~$</span>
                <span className={style.t_cmd}> {partialText}</span>
              </>
            )}
            {currentLineData.type === 'out'   && <span className={style.t_out}>{partialText}</span>}
            {currentLineData.type === 'dir'   && <span className={style.t_dir}>{partialText}</span>}
            {currentLineData.type === 'json'  && <span className={style.t_json}>{partialText}</span>}
            {currentLineData.type === 'green' && <span className={style.t_green}>{partialText}</span>}
            <span className={style.t_cursor + (showCursor ? '' : ' ' + style.t_cursor_hide)}>▋</span>
          </div>
        )}

        {/* Idle cursor when done */}
        {done && (
          <div className={style.t_line}>
            <span className={style.t_prompt}>ram@portfolio:~$</span>
            <span className={style.t_cursor + (showCursor ? '' : ' ' + style.t_cursor_hide)}>▋</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Typewriter ── */
const Typewriter = () => {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState('');
  const [del, setDel]   = useState(false);
  const [ci, setCi]     = useState(0);

  useEffect(() => {
    const cur = ROLES[idx];
    let t;
    if (!del && ci < cur.length)        t = setTimeout(() => { setText(cur.slice(0,ci+1)); setCi(c=>c+1); }, 60);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), 1800);
    else if (del && ci > 0)             t = setTimeout(() => { setText(cur.slice(0,ci-1)); setCi(c=>c-1); }, 35);
    else if (del && ci === 0)           { setDel(false); setIdx(i=>(i+1)%ROLES.length); }
    return () => clearTimeout(t);
  }, [ci, del, idx]);

  return <span className={style.typewriter}>{text}<span className={style.cursor}>|</span></span>;
};

/* ── Counter ── */
const Counter = ({ value, suffix, label, leet }) => {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(value / 40));
    const t = setInterval(() => { cur += step; if (cur >= value) { setCount(value); clearInterval(t); } else setCount(cur); }, 30);
    return () => clearInterval(t);
  }, [started, value]);

  if (leet) return (
    <a ref={ref} href="https://leetcode.com/u/Ramvasanth130699/" target="_blank" rel="noreferrer" className={style.stat + ' ' + style.stat_leet}>
      <span className={style.stat_value} style={{color:'#ffc01e'}}>{count}<span className={style.stat_suffix}>{suffix}</span></span>
      <span className={style.stat_label}>LeetCode ↗</span>
    </a>
  );
  return (
    <div ref={ref} className={style.stat}>
      <span className={style.stat_value}>{count}<span className={style.stat_suffix}>{suffix}</span></span>
      <span className={style.stat_label}>{label}</span>
    </div>
  );
};

/* ── Live clock ── */
const LiveClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const upd = () => setTime(new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true, timeZone:'America/New_York' }));
    upd();
    const t = setInterval(upd, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={style.clock_row}>
      <span className={style.clock_dot} />
      <span className={style.clock_text}>{time} · New York, NY</span>
    </div>
  );
};

/* ── Scroll indicator ── */
const ScrollIndicator = () => (
  <div className={style.scroll_wrap}>
    <div className={style.scroll_mouse}><div className={style.scroll_wheel} /></div>
    <span className={style.scroll_text}>scroll to explore</span>
  </div>
);

/* ── Home ── */
function Home() {
  const ghHref = 'https://github.com/ramv5075-spec';
  const liHref = 'https://linkedin.com/in/ramvasanth-mahendran-8a0507203';
  const cvHref = 'https://drive.google.com/file/d/1iDAS97T-d9uYfK6dxMZnmc2J9O6dL6up/preview';

  return (
    <motion.section variants={staggerContainer()} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }}>
      <div className={style.container}>

        <motion.div variants={fadeIn('','',0.1,1)} className={style.clock_wrap}>
          <LiveClock />
        </motion.div>

        <div className={style.hero_split}>

          {/* ── LEFT ── */}
          <div className={style.hero_left}>
            <motion.p variants={fadeIn('','',0.05,1)} className={style.greeting}>Hello, World 👋</motion.p>

            <div className={style.intro}>
              <span className={style.intro_hi}>Hi, I'm</span>
              <motion.span variants={fadeIn('','',0.1,1)} className={style.name}>Ramvasanth Mahendran</motion.span>
            </div>

            <motion.p variants={fadeIn('','',0.25,1)} className={style.role_line}><Typewriter /></motion.p>

            <motion.p variants={fadeIn('','',0.35,1)} className={style.desc}>
              MS Computer Science @ UB · 4+ years building AI systems,
              full-stack apps &amp; distributed platforms.
              <br />Actively seeking SDE, Full-Stack &amp; AI roles — available immediately.
            </motion.p>

            <motion.div variants={fadeIn('','',0.5,1)} className={style.cta_row}>
              <button className={style.btn_primary} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span className={style.btn_text}>Check out my work</span>
                <MdOutlineArrowForwardIos className={style.btn_arrow} />
              </button>
              <a href={ghHref} target="_blank" rel="noreferrer" className={style.btn_icon}><FaGithub /><span>GitHub</span></a>
              <a href={liHref} target="_blank" rel="noreferrer" className={style.btn_icon}><FaLinkedin /><span>LinkedIn</span></a>
              <a href={cvHref} target="_blank" rel="noreferrer" className={style.btn_resume}><HiDownload /><span>Resume</span></a>
            </motion.div>

            <motion.div variants={fadeIn('','',0.65,1)} className={style.stats_row}>
              {STATS.map((s,i) => <Counter key={i} {...s} />)}
            </motion.div>

            <motion.div variants={fadeIn('','',0.72,1)} className={style.stats_divider} />

            <motion.div variants={fadeIn('','',0.78,1)} className={style.otw_pill}>
              <span className={style.pulse_dot} />
              <span className={style.otw_text}>Open to Work · F-1 OPT · Available Now</span>
            </motion.div>

            <motion.div
              variants={fadeIn('','',0.88,1)}
              className={style.chat_hint}
              onClick={() => document.querySelector('#portfolio-chat-btn')?.click()}
              role="button" tabIndex={0}
              onKeyDown={e => { if (e.key==='Enter') document.querySelector('#portfolio-chat-btn')?.click(); }}
            >
              <span>💬</span>
              <span className={style.chat_text}>Ask my AI assistant about my projects, stack, or experience</span>
              <span className={style.chat_arrow}>↘</span>
            </motion.div>
          </div>

          {/* ── RIGHT — terminal ── */}
          <motion.div variants={fadeIn('left','',0.4,0.8)} className={style.hero_right}>
            <TerminalCard />
          </motion.div>

        </div>

        <motion.div variants={fadeIn('','',1,1)}>
          <ScrollIndicator />
        </motion.div>

      </div>
    </motion.section>
  );
}

export default Home;
