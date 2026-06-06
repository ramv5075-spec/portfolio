import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc';
import style from './styles/about.module.css';
import { textVariant, fadeIn } from '../utils/motion';
import myPhoto from '../assets/my-image3.jpeg';

const STATS = [
  { val: "4+",   label: "Years Exp"  },
  { val: "3",    label: "Companies"  },
  { val: "20+",  label: "Projects"   },
  { val: "686+", label: "LeetCode"   },
];

const About = () => (
  <>
    <motion.h1 variants={textVariant()} className={style.title}>
      About Me
    </motion.h1>

    <div className={style.wrapper}>

      {/* ── LEFT: Bio ── */}
      <motion.div variants={fadeIn("right","",0.1,0.7)} className={style.left}>

        <div className={style.name_block}>
          <h2 className={style.name}>Ramvasanth Mahendran</h2>
          <p className={style.tagline}>Software Engineer · Distributed Systems · Full-Stack · AI/ML</p>
        </div>

        <div className={style.accent_line} />

        <p className={style.para}>
          Software Engineer with <span className={style.hl}>4+ years</span> designing and
          shipping production systems — distributed backends, full-stack platforms, and
          AI-powered applications across fintech, publishing, and cloud-native environments.
          <span className={style.hl}> MS CSE · University at Buffalo</span> — Systems,
          AI/ML &amp; Software Engineering.
        </p>

        <p className={style.para}>
          At <span className={style.hl}>Hachette Book Group</span>, built a production RAG
          platform — FAISS + Mistral 7B GPU inference,{" "}
          <span className={style.metric}>30% accuracy ↑</span>, zero third-party AI cost,
          99.9% uptime. At <span className={style.hl}>CodeStax.ai</span>, delivered{" "}
          <span className={style.metric}>Core Banking</span> infrastructure (ledger, loans,
          wallets on Amazon QLDB) and{" "}
          <span className={style.metric}>customer-facing applications</span> — Vue.js,
          React Native (App Store &amp; Play), Java Spring Boot — for{" "}
          <span className={style.metric}>5 global enterprise clients</span>. At{" "}
          <span className={style.hl}>Novalnet</span>, engineered high-throughput REST APIs
          for a <span className={style.metric}>European payment service provider</span>,
          processing millions of transactions with <span className={style.metric}>p99 latency ↓ 30%</span>.
        </p>

        <p className={style.para}>
          Personal benchmarks —{" "}
          <span className={style.metric}>7,300 req/s · p99 &lt; 6ms</span> on a distributed
          KV store (Raft consensus · WAL · consistent hashing) and{" "}
          <span className={style.metric}>6,250 msg/sec · p99 &lt; 19ms</span> on a
          real-time notification service (Kafka · WebSocket · Spring Boot).
          I build systems that perform under real production load.
        </p>

        <div className={style.tags}>
          {[
            "Distributed Systems",
            "System Design",
            "Full-Stack",
            "AI / GenAI",
            "Cloud · AWS",
            "Open to Work · F-1 OPT",
          ].map(t => (
            <span key={t} className={style.tag}>{t}</span>
          ))}
        </div>

      </motion.div>

      {/* ── RIGHT: Photo ── */}
      <motion.div variants={fadeIn("left","",0.2,0.7)} className={style.right}>
        <div className={style.photo_wrap}>
          <img src={myPhoto} alt="Ramvasanth Mahendran" className={style.photo} />
          <div className={style.photo_overlay} />
          <div className={style.badge}>
            <span className={style.badge_dot} />
            <span className={style.badge_text}>Available Now · F-1 OPT</span>
          </div>
        </div>
        <div className={style.stats}>
          {STATS.map((s,i) => (
            <div key={i} className={style.stat}>
              <span className={style.stat_val}>{s.val}</span>
              <span className={style.stat_label}>{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  </>
);

export default SectionWrapper(About, "about", "");
