import React, { useEffect, useState, useRef } from 'react';
import style from './styles/loading.module.css';

const LoadingScreen = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 700);
    const t2 = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 1000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.screen + (exiting ? ' ' + style.exit : '')}>
      <div className={style.center}>
        <span className={style.mark}>RM</span>
        <div className={style.spinner}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
