import React, { useEffect, useState } from 'react';
import style from './styles/vscodeintro.module.css';

const LINES = [
  { code: '// portfolio.js',                                   color: 'comment',  delay: 0    },
  { code: '',                                                   color: 'blank',    delay: 300  },
  { code: 'const developer = {',                               color: 'white',    delay: 600  },
  { code: '  name:     "Ramvasanth Mahendran",',               color: 'string',   delay: 900  },
  { code: '  role:     "Full-Stack & AI Engineer",',           color: 'string',   delay: 1200 },
  { code: '  ms:       "Computer Science and Engineering @ UB",',              color: 'string',   delay: 1500 },
  { code: '  exp:      "4+ years",',                           color: 'string',   delay: 1800 },
  { code: '  stack:    ["React", "Node", "Python", "AWS"],',   color: 'array',    delay: 2100 },
  { code: '  ai:       ["RAG", "LangChain", "Mistral 7B"],',   color: 'array',    delay: 2400 },
  { code: '  status:   "Open to Work 🟢",',                    color: 'string',   delay: 2700 },
  { code: '  visa:     "F-1 OPT · Available Now",',            color: 'string',   delay: 3000 },
  { code: '};',                                                 color: 'white',    delay: 3300 },
  { code: '',                                                   color: 'blank',    delay: 3600 },
  { code: 'developer.build();',                                color: 'call',     delay: 3900 },
];

const TABS = ['portfolio.js', 'about.jsx', 'experience.ts'];
const EXPLORER = ['portfolio.js', 'Home.jsx', 'About.jsx', 'Experience.jsx', 'Work.jsx'];

const VSCodeIntro = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [cursorLine, setCursorLine] = useState(0);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers = [];

    LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCursorLine(i);
      }, line.delay);
      timers.push(t);
    });

    // after last line, wait then fade out
    const lastDelay = LINES[LINES.length - 1].delay;
    const holdTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setDone(true);
        onComplete();
      }, 800);
    }, lastDelay + 1400);
    timers.push(holdTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (done) return null;

  return (
    <div className={style.overlay + (fadeOut ? ' ' + style.fade_out : '')}>
      <div className={style.window}>

        {/* Title bar */}
        <div className={style.titlebar}>
          <div className={style.traffic_lights}>
            <span className={style.tl_red}   onClick={onComplete} title="Close" />
            <span className={style.tl_yellow} />
            <span className={style.tl_green}  />
          </div>
          <span className={style.window_title}>portfolio.js — Visual Studio Code</span>
          <span />
        </div>

        {/* Main layout */}
        <div className={style.layout}>

          {/* Activity bar */}
          <div className={style.activity_bar}>
            <div className={style.activity_icon} title="Explorer">⎇</div>
            <div className={style.activity_icon} title="Search">⌕</div>
            <div className={style.activity_icon} title="Git">⑂</div>
            <div className={style.activity_icon} title="Extensions">⊞</div>
          </div>

          {/* Sidebar explorer */}
          <div className={style.sidebar}>
            <div className={style.sidebar_title}>EXPLORER</div>
            <div className={style.sidebar_folder}>
              <span className={style.folder_icon}>▾</span>
              <span>PORTFOLIO</span>
            </div>
            {EXPLORER.map((f, i) => (
              <div
                key={f}
                className={style.sidebar_file + (f === 'portfolio.js' ? ' ' + style.file_active : '')}
              >
                <span className={style.file_icon}>
                  {f.endsWith('.jsx') ? '⚛' : f.endsWith('.ts') ? '𝑇' : '𝐽'}
                </span>
                {f}
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className={style.editor}>

            {/* Tabs */}
            <div className={style.tabs}>
              {TABS.map((t) => (
                <div
                  key={t}
                  className={style.tab + (t === 'portfolio.js' ? ' ' + style.tab_active : '')}
                >
                  <span className={style.tab_icon}>
                    {t.endsWith('.jsx') ? '⚛' : t.endsWith('.ts') ? '𝑇' : '𝐽'}
                  </span>
                  {t}
                  {t === 'portfolio.js' && <span className={style.tab_dot} />}
                </div>
              ))}
            </div>

            {/* Code area */}
            <div className={style.code_area}>
              {visibleLines.map((line, i) => (
                <div key={i} className={style.code_line}>
                  <span className={style.line_num}>{i + 1}</span>
                  <span className={style['color_' + line.color] || style.color_white}>
                    {line.code}
                    {i === cursorLine && (
                      <span className={style.cursor} />
                    )}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Status bar */}
        <div className={style.statusbar}>
          <span className={style.status_left}>⑂ main</span>
          <span className={style.status_mid}>portfolio.js</span>
          <span className={style.status_right}>JavaScript · UTF-8 · Ln {cursorLine + 1}</span>
        </div>
      </div>

      {/* Skip */}
      <button
        className={style.skip_btn}
        onClick={() => { setFadeOut(true); setTimeout(() => { setDone(true); onComplete(); }, 400); }}
      >
        skip intro ↓
      </button>
    </div>
  );
};

export default VSCodeIntro;
