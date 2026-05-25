import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './styles/announcement.module.css';

// ── UPDATE THIS whenever you ship something new ──
const ANNOUNCEMENT = {
  id: 'api-lab-v2',
  badge: 'NEW',
  emoji: '⚗️',
  text: 'API Lab is live — try REST, GraphQL, gRPC, WebSocket & SOAP with real endpoints',
  cta: 'Try it →',
  target: 'apilab',
};

const BAR_HEIGHT = 42; // px — keep in sync with CSS

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement_' + ANNOUNCEMENT.id);
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  // Push body content down when bar is visible
  useEffect(() => {
    const root = document.documentElement;
    if (visible) {
      root.style.setProperty('--bar-height', BAR_HEIGHT + 'px');
    } else {
      root.style.setProperty('--bar-height', '0px');
    }
    return () => root.style.setProperty('--bar-height', '0px');
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('announcement_' + ANNOUNCEMENT.id, '1');
  };

  const handleCTA = () => {
    const el = document.getElementById(ANNOUNCEMENT.target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    dismiss();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -BAR_HEIGHT, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -BAR_HEIGHT, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={style.bar}
        >
          <div className={style.inner}>
            <span className={style.live_dot} />
            <span className={style.badge}>{ANNOUNCEMENT.badge}</span>
            <span className={style.emoji}>{ANNOUNCEMENT.emoji}</span>
            <span className={style.text}>{ANNOUNCEMENT.text}</span>
            <button className={style.cta} onClick={handleCTA}>
              {ANNOUNCEMENT.cta}
            </button>
            <button className={style.close} onClick={dismiss} aria-label="Dismiss">✕</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
