import React, { useEffect, useState, useRef } from 'react';
import style from './styles/loading.module.css';

const NAME = "Ramvasanth Mahendran";

const LoadingScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('draw'); // draw -> hold -> exit
  const completedRef = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 1400);
    const t2 = setTimeout(() => setPhase('exit'), 2000);
    const t3 = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 2500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← run only once, never re-run even if onComplete reference changes

  return (
    <div className={style.screen + (phase === 'exit' ? ' ' + style.exit : '')}>
      <div className={style.center}>
        <svg viewBox="0 0 600 100" className={style.signature_svg}>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            className={style.signature_text}
          >
            {NAME}
          </text>
        </svg>

        <div className={style.underline_wrap}>
          <div className={style.underline} />
        </div>

        <p className={style.tagline}>Software Engineer</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
