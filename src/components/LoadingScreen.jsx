import React, { useEffect, useState, useRef } from 'react';
import style from './styles/loading.module.css';

const BOOT_LINES = [
  { text: 'Initializing RAM:// OS v4.0...',                              delay: 400,  color: 'cyan'  },
  { text: 'Loading languages: C++ · Java · Python · Go · TypeScript...',  delay: 1000, color: 'white' },
  { text: 'Compiling DSA engine — Arrays · Trees · Graphs · DP · BFS...', delay: 1700, color: 'white' },
  { text: 'Booting distributed systems — Raft · WAL · Consistent Hashing...', delay: 2400, color: 'white' },
  { text: 'Mounting system design modules — Kafka · Redis · Sharding...', delay: 3100, color: 'white' },
  { text: 'Spinning up microservices — Spring Boot · FastAPI · Node.js...', delay: 3800, color: 'white' },
  { text: 'Loading full-stack core — React · Vue · TypeScript · PostgreSQL...', delay: 4500, color: 'white' },
  { text: 'Starting AI agents — LangGraph · MCP · FAISS · Mistral 7B...', delay: 5200, color: 'white' },
  { text: 'Deploying — AWS · Azure · Docker · Kubernetes · CI/CD...',     delay: 5900, color: 'white' },
  { text: 'Identity verified: Ramvasanth Mahendran · SDE',                delay: 6600, color: 'cyan'  },
  { text: 'Status: Open to Work · F-1 OPT · New York, NY',                delay: 7200, color: 'green' },
  { text: 'All systems operational. Welcome.',                            delay: 7800, color: 'green' },
];

const PROGRESS_STEPS = [0, 8, 16, 26, 36, 46, 56, 66, 76, 86, 94, 100];

const LoadingScreen = ({ onComplete }) => {
  const [visibleLines, setVisibleLines]   = useState([]);
  const [progress, setProgress]           = useState(0);
  const [phase, setPhase]                 = useState('boot'); // boot | ready | exit
  const [showReady, setShowReady]         = useState(false);
  const [scanPos, setScanPos]             = useState(0);
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  /* ── Hex grid canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const HEX_SIZE = 36;
    const HEX_W    = HEX_SIZE * 2;
    const HEX_H    = Math.sqrt(3) * HEX_SIZE;

    const drawHex = (x, y, opacity) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30);
        const px = x + HEX_SIZE * 0.85 * Math.cos(angle);
        const py = y + HEX_SIZE * 0.85 * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,207,255,${opacity})`;
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      const cols = Math.ceil(canvas.width  / (HEX_W * 0.75)) + 2;
      const rows = Math.ceil(canvas.height / HEX_H) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * HEX_W * 0.75;
          const y = r * HEX_H + (c % 2 === 0 ? 0 : HEX_H / 2);
          const wave = Math.sin(t + c * 0.3 + r * 0.4) * 0.5 + 0.5;
          drawHex(x, y, wave * 0.12 + 0.02);
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Scan line ── */
  useEffect(() => {
    const t = setInterval(() => {
      setScanPos(p => (p + 1.2) % 100);
    }, 16);
    return () => clearInterval(t);
  }, []);

  const bootRan = useRef(false);

  /* ── Boot sequence ── */
  useEffect(() => {
    if (bootRan.current) return;  // ← add this
  bootRan.current = true;   
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setProgress(PROGRESS_STEPS[i + 1] || 100);
      }, line.delay);
    });

    // Show READY
    setTimeout(() => {
      setShowReady(true);
      setPhase('ready');
    }, 6000);

    // Exit
    setTimeout(() => {
      setPhase('exit');
      setTimeout(() => onComplete(), 600);
    }, 7500);
  }, [onComplete]);

  return (
    <div className={style.screen + (phase === 'exit' ? ' ' + style.exit : '')}>

      {/* Hex grid */}
      <canvas ref={canvasRef} className={style.canvas} />

      {/* Scan line */}
      <div className={style.scan} style={{ top: scanPos + '%' }} />

      {/* Corner brackets */}
      <div className={style.corner_tl} />
      <div className={style.corner_tr} />
      <div className={style.corner_bl} />
      <div className={style.corner_br} />

      {/* Center content */}
      <div className={style.center}>

        {/* Logo */}
        <div className={style.logo_wrap}>
          <div className={style.logo_ring} />
          <div className={style.logo_ring2} />
          <div className={style.logo}>
            <span className={style.logo_ram}>RAM</span>
            <span className={style.logo_slash}>://</span>
          </div>
        </div>

        {/* System label */}
        <div className={style.sys_label}>PORTFOLIO OS · v2.0.25</div>

        {/* Progress bar */}
        <div className={style.progress_wrap}>
          <div className={style.progress_track}>
            <div className={style.progress_fill} style={{ width: progress + '%' }} />
            <div className={style.progress_glow} style={{ left: progress + '%' }} />
          </div>
          <div className={style.progress_pct}>{progress}%</div>
        </div>

        {/* Boot log */}
        <div className={style.log}>
          {visibleLines.map((line, i) => (
            <div key={i} className={style.log_line + ' ' + style['log_' + line.color]}>
              <span className={style.log_arrow}>›</span>
              <span>{line.text}</span>
            </div>
          ))}
          {visibleLines.length < BOOT_LINES.length && (
            <div className={style.log_line + ' ' + style.log_white}>
              <span className={style.log_arrow}>›</span>
              <span className={style.blink_cursor}>▋</span>
            </div>
          )}
        </div>

        {/* Ready state */}
        {showReady && (
          <div className={style.ready}>
            <div className={style.ready_text}>SYSTEM READY</div>
            <div className={style.ready_sub}>Loading portfolio interface...</div>
          </div>
        )}
      </div>

      {/* Side decorations */}
      <div className={style.side_left}>
        <div className={style.side_line} />
        <div className={style.side_label}>RAM://SYS</div>
        <div className={style.side_line} />
      </div>
      <div className={style.side_right}>
        <div className={style.side_line} />
        <div className={style.side_label}>ONLINE</div>
        <div className={style.side_line} />
      </div>

    </div>
  );
};

export default LoadingScreen;
