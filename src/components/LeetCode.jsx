import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc';
import style from './styles/leetcode.module.css';

const USERNAME = 'Ramvasanth130699';
const CIRCUMFERENCE = 314;

// ── Update these numbers periodically from your LeetCode profile ──
const STATIC_STATS = {
  totalSolved:  120,
  easySolved:   60,
  mediumSolved: 50,
  hardSolved:   10,
  totalEasy:    856,
  totalMedium:  1793,
  totalHard:    793,
  ranking:      null,
};

const LeetCode = () => {
  const [stats, setStats] = useState(STATIC_STATS);
  const [source, setSource] = useState('static');

  useEffect(() => {
    // Try alfa-leetcode API (most reliable free option)
    fetch('https://alfa-leetcode-api.onrender.com/' + USERNAME + '/solved')
      .then((r) => r.json())
      .then((d) => {
        if (d && d.solvedProblem) {
          setStats((prev) => ({
            ...prev,
            totalSolved:  d.solvedProblem  || prev.totalSolved,
            easySolved:   d.easySolved     || prev.easySolved,
            mediumSolved: d.mediumSolved   || prev.mediumSolved,
            hardSolved:   d.hardSolved     || prev.hardSolved,
          }));
          setSource('live');
        }
      })
      .catch(() => {});
  }, []);

  const progress = (stats.totalSolved / (stats.totalEasy + stats.totalMedium + stats.totalHard)) * CIRCUMFERENCE;
  const dashArray = Math.min(progress, CIRCUMFERENCE) + ' ' + CIRCUMFERENCE;

  const LEVELS = [
    { label: 'Easy',   solved: stats.easySolved,   total: stats.totalEasy,   color: '#00b8a3' },
    { label: 'Medium', solved: stats.mediumSolved,  total: stats.totalMedium, color: '#ffc01e' },
    { label: 'Hard',   solved: stats.hardSolved,    total: stats.totalHard,   color: '#ef4743' },
  ];

  return (
    <>
      <motion.h1 variants={textVariant()} className={style.title}>
        LeetCode
      </motion.h1>
      <motion.p variants={fadeIn('', '', 0.1, 0.5)} className={style.subtitle}>
        Consistently sharpening DSA skills
      </motion.p>

      <motion.div variants={fadeIn('up', '', 0.2, 0.5)} className={style.card}>

        {/* Left — donut */}
        <div className={style.left}>
          <div className={style.donut_wrap}>
            <svg viewBox="0 0 120 120" className={style.donut}>
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="12"
              />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="#ffc01e"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={dashArray}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
            </svg>
            <div className={style.donut_center}>
              <span className={style.donut_number}>{stats.totalSolved}</span>
              <span className={style.donut_label}>Solved</span>
            </div>
          </div>

          {source === 'live' && (
            <span className={style.live_badge}>● Live</span>
          )}

          <a
            href={'https://leetcode.com/u/' + USERNAME + '/'}
            target="_blank"
            rel="noreferrer"
            className={style.profile_btn}
          >
            View Profile ↗
          </a>
        </div>

        {/* Right */}
        <div className={style.right}>

          {/* Ranking */}
          <div className={style.ranking_row}>
            <span className={style.ranking_icon}>🏆</span>
            <div>
              <p className={style.ranking_value}>
                {stats.ranking ? stats.ranking.toLocaleString() : 'Top Coder'}
              </p>
              <p className={style.ranking_label}>LeetCode Profile</p>
            </div>
          </div>

          {/* Level bars */}
          <div className={style.levels}>
            {LEVELS.map((lv) => {
              const pct = lv.total > 0 ? (lv.solved / lv.total) * 100 : 0;
              return (
                <div key={lv.label} className={style.level_row}>
                  <div className={style.level_meta}>
                    <span className={style.level_label} style={{ color: lv.color }}>
                      {lv.label}
                    </span>
                    <span className={style.level_count}>
                      {lv.solved}
                      <span className={style.level_total}>/{lv.total}</span>
                    </span>
                  </div>
                  <div className={style.bar_bg}>
                    <motion.div
                      className={style.bar_fill}
                      style={{ background: lv.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: pct + '%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* NeetCode badge */}
          <div className={style.neetcode_badge}>
            <span>📚</span>
            <div>
              <p className={style.badge_title}>NeetCode 150</p>
              <p className={style.badge_sub}>C++ solutions · organized by topic</p>
            </div>
            <a
              href="https://github.com/ramv5075-spec/neetcode-150"
              target="_blank"
              rel="noreferrer"
              className={style.badge_link}
            >
              GitHub ↗
            </a>
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(LeetCode, 'leetcode', '');
