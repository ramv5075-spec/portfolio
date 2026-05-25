import React, { useEffect, useRef, useState } from 'react';
import style from './styles/matrixrain.module.css';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NAME = 'RAMVASANTH MAHENDRAN';
const PHASE_RAIN     = 'rain';
const PHASE_FREEZE   = 'freeze';
const PHASE_SPELL    = 'spell';
const PHASE_HOLD     = 'hold';
const PHASE_DISSOLVE = 'dissolve';
const PHASE_DONE     = 'done';

const MatrixRain = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const phaseRef  = useRef(PHASE_RAIN);
  const frameRef  = useRef(0);
  const colsRef   = useRef([]);
  const frozenRef = useRef([]);
  const rafRef    = useRef(null);
  const [phase, setPhase] = useState(PHASE_RAIN);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const W      = window.innerWidth;
    const H      = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const FONT_SIZE = Math.max(14, Math.floor(W / 80));
    const COLS      = Math.floor(W / FONT_SIZE);
    const ROWS      = Math.floor(H / FONT_SIZE);

    // init columns — random starting y
    const drops = Array.from({ length: COLS }, () => Math.floor(Math.random() * -ROWS));
    colsRef.current = drops;

    // frozen grid for spelling phase
    const frozen = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        opacity: 0,
      }))
    );
    frozenRef.current = frozen;

    // where to draw the name (centered)
    const nameRow   = Math.floor(ROWS / 2);
    const nameStart = Math.floor((COLS - NAME.length) / 2);

    let tick = 0;
    let spellProgress = 0;
    let dissolveProgress = 0;

    const draw = () => {
      tick++;
      const ph = phaseRef.current;

      if (ph === PHASE_RAIN || ph === PHASE_FREEZE) {
        // semi-transparent black overlay → trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, W, H);

        ctx.font = `${FONT_SIZE}px monospace`;

        drops.forEach((y, i) => {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const x = i * FONT_SIZE;

          // head of column — bright white
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y * FONT_SIZE);

          // body — cyan green
          ctx.fillStyle = '#00ff41';
          if (y > 1) {
            ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y - 1) * FONT_SIZE);
          }

          drops[i]++;
          if (drops[i] * FONT_SIZE > H && Math.random() > 0.975) {
            drops[i] = 0;
          }
        });

        if (ph === PHASE_RAIN && tick > 120) {
          phaseRef.current = PHASE_FREEZE;
          setPhase(PHASE_FREEZE);
        }

        if (ph === PHASE_FREEZE && tick > 180) {
          phaseRef.current = PHASE_SPELL;
          setPhase(PHASE_SPELL);
        }
      }

      if (ph === PHASE_SPELL) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, W, H);

        // fade existing rain
        drops.forEach((y, i) => {
          const x = i * FONT_SIZE;
          ctx.fillStyle = 'rgba(0, 255, 65, 0.15)';
          ctx.font = `${FONT_SIZE}px monospace`;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y * FONT_SIZE);
          drops[i]++;
          if (drops[i] * FONT_SIZE > H) drops[i] = 0;
        });

        // spell name letter by letter
        if (tick % 4 === 0 && spellProgress < NAME.length) {
          spellProgress++;
        }

        ctx.font = `bold ${FONT_SIZE * 2.5}px monospace`;
        const nameX = (W - NAME.length * FONT_SIZE * 1.5) / 2;
        const nameY = H / 2;

        // glow effect
        ctx.shadowBlur   = 20;
        ctx.shadowColor  = '#00ffff';

        for (let i = 0; i < spellProgress; i++) {
          const isLast = i === spellProgress - 1;
          ctx.fillStyle = isLast ? '#ffffff' : '#00ffff';
          ctx.fillText(NAME[i], nameX + i * FONT_SIZE * 1.5, nameY);
        }
        ctx.shadowBlur = 0;

        if (spellProgress >= NAME.length) {
          if (tick > 280) {
            phaseRef.current = PHASE_HOLD;
            setPhase(PHASE_HOLD);
          }
        }
      }

      if (ph === PHASE_HOLD) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, W, H);

        ctx.font = `bold ${FONT_SIZE * 2.5}px monospace`;
        const nameX = (W - NAME.length * FONT_SIZE * 1.5) / 2;
        const nameY = H / 2;

        ctx.shadowBlur  = 24;
        ctx.shadowColor = '#00ffff';
        ctx.fillStyle   = '#00ffff';
        ctx.fillText(NAME, nameX, nameY);
        ctx.shadowBlur = 0;

        // subtle subtitle
        ctx.font      = `${FONT_SIZE}px monospace`;
        ctx.fillStyle = 'rgba(0,255,65,0.6)';
        const sub     = '> Full-Stack & AI Engineer';
        const subX    = (W - sub.length * FONT_SIZE * 0.6) / 2;
        ctx.fillText(sub, subX, nameY + FONT_SIZE * 3);

        if (tick > 380) {
          phaseRef.current = PHASE_DISSOLVE;
          setPhase(PHASE_DISSOLVE);
        }
      }

      if (ph === PHASE_DISSOLVE) {
        dissolveProgress += 0.025;
        ctx.fillStyle = `rgba(0,0,0,${Math.min(dissolveProgress, 1)})`;
        ctx.fillRect(0, 0, W, H);

        if (dissolveProgress >= 1) {
          phaseRef.current = PHASE_DONE;
          setPhase(PHASE_DONE);
          onComplete();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  if (phase === PHASE_DONE) return null;

  return (
    <div className={style.overlay}>
      <canvas ref={canvasRef} className={style.canvas} />
      {(phase === PHASE_RAIN || phase === PHASE_FREEZE) && (
        <div className={style.hint}>
          <span className={style.hint_dot} />
          initializing...
        </div>
      )}
      <button
        className={style.skip_btn}
        onClick={() => {
          phaseRef.current = PHASE_DONE;
          setPhase(PHASE_DONE);
          onComplete();
        }}
      >
        skip intro ↓
      </button>
    </div>
  );
};

export default MatrixRain;
