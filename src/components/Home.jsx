import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { motion } from 'framer-motion';
import style from './styles/home.module.css';
import { fadeIn, staggerContainer } from '../utils/motion';

const Home = () => (
  <motion.section
    variants={staggerContainer()}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
  >
    <div className={style.container}>
      <p className={style.intro}>
        Hi, I&apos;m{' '}
        <motion.span variants={fadeIn('', '', 0.1, 1)} className={style.name}>
          Ramvasanth Mahendran
        </motion.span>
      </p>

      <motion.p variants={fadeIn('', '', 0.3, 1)} className={style.desc}>
        Actively seeking full-time roles in Software Development (SDE), Full-Stack, and AI Engineering
      </motion.p>

      <motion.button
        variants={fadeIn('', '', 0.6, 1)}
        className={style.btn_container}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
          });
        }}
      >
        <span className={style.btn_hover}>Check out my work</span>
        <span className={style.btn}>Check out my work</span>
        <MdOutlineArrowForwardIos className={style.arrow} />
      </motion.button>

      {/* ✅ NEW: AI Chat hint (no auto-open) */}
      <motion.p
        variants={fadeIn('', '', 0.8, 1)}
        className={style.chat_hint}
        onClick={() => {
          // Optional: if your PortfolioChat has a button element, we can "nudge" it by focusing.
          // If you later add an id to the chat button, update this selector.
          document.querySelector('#portfolio-chat-btn')?.click();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') document.querySelector('#portfolio-chat-btn')?.click();
        }}
      >
        <span className={style.chat_icon}>💬</span>
        <span className={style.chat_text}>
          New: Ask my AI assistant about my projects, tech stack, or experience
        </span>
        <span className={style.chat_arrow}>↘</span>
      </motion.p>
    </div>
  </motion.section>
);

export default Home;
