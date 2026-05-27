import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import style from './styles/announcement.module.css';

const ANNOUNCEMENT = {
  id: 'lab-v1',
  badge: 'NEW',
  emoji: '⚗️',
  text: 'The Lab is live — try REST, GraphQL, gRPC, WebSocket & SOAP + System Design',
  cta: 'Visit Lab →',
  route: '/lab?tab=api',
};

const BAR_HEIGHT = 42;

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement_' + ANNOUNCEMENT.id);
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bar-height', visible ? BAR_HEIGHT + 'px' : '0px');
    return () => root.style.setProperty('--bar-height', '0px');
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('announcement_' + ANNOUNCEMENT.id, '1');
  };

  const handleCTA = () => {
    navigate(ANNOUNCEMENT.route);
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
