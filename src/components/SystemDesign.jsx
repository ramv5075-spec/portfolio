import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import style from "./styles/systemdesign.module.css";
import urlImg from "../assets/url_shorten.png"
import rateImg from "../assets/rate_limiter.png";

// ── UPDATE ONLY THE DESIGNS ARRAY in your SystemDesign.jsx ──
// Replace the entire DESIGNS array with this:

const DESIGNS = [
  {
    id: "url-shortener",
    title: "URL Shortener",
    subtitle: "Design a system like bit.ly",
    difficulty: "Medium",
    status: "completed",
    diagram: urlImg, // import urlImg from "../assets/url-shortener.png"
    concepts: ["Base62 encoding", "Redis cache", "Read replicas", "Rate limiting", "301 vs 302"],
    components: ["API Gateway", "Shorten Service", "Redirect Service", "MySQL", "Redis", "Kafka"],
    stats: [
      { val: "35k",  unit: "reads/sec", label: "QPS" },
      { val: "5.5TB", unit: "/ 5yr",   label: "Storage" },
      { val: "3.5T", unit: "unique",   label: "Codes" },
    ],
    articleLink: "https://medium.com/@ramv5075",
    excalidrawLink: "",
    summary: "A URL shortener takes a long URL and returns a short code. Core challenge: generating unique short codes at scale, handling massive read traffic (100:1 read/write ratio), and keeping redirects under 100ms globally.",
  },
  {
    id: "rate-limiter",
    title: "Rate Limiter",
    subtitle: "Design API rate limiting at scale",
    difficulty: "Medium",
    status: "completed",
    diagram: rateImg, // import rateImg from "../assets/rate-limiter.png"
    concepts: ["Sliding window counter", "Fixed window", "Token bucket", "Redis atomic ops", "Lua scripts"],
    components: ["API Gateway", "Rate Limiter Middleware", "Redis Cluster", "Rules Config Service", "Backend Services"],
    stats: [
      { val: "1B",   unit: "req/day",  label: "Scale" },
      { val: "<5ms", unit: "overhead", label: "Latency" },
      { val: "24B",  unit: "per user", label: "Storage" },
    ],
    articleLink: "",
    excalidrawLink: "",
    summary: "A rate limiter controls how many requests a user/IP can make in a time window. Lives in the API Gateway middleware, uses Redis for distributed atomic counters. Returns HTTP 429 with Retry-After header when limit exceeded. Sliding window counter is the best algorithm — low memory, accurate, no boundary burst problem.",
  },
  {
    id: "chat-system",
    title: "Chat System",
    subtitle: "Design WhatsApp at scale",
    difficulty: "Hard",
    status: "coming",
    diagram: null,
    concepts: ["WebSocket", "Message queues", "Fanout", "Presence service"],
    components: [],
    stats: [],
    articleLink: "",
    excalidrawLink: "",
    summary: "",
  },
  {
    id: "news-feed",
    title: "News Feed",
    subtitle: "Design Twitter / Instagram feed",
    difficulty: "Hard",
    status: "coming",
    diagram: null,
    concepts: ["Fanout on write", "CDN", "Caching", "Pagination"],
    components: [],
    stats: [],
    articleLink: "",
    excalidrawLink: "",
    summary: "",
  },
  {
    id: "notification",
    title: "Notification System",
    subtitle: "Push · SMS · Email at scale",
    difficulty: "Medium",
    status: "coming",
    diagram: null,
    concepts: ["Pub/Sub", "Kafka", "FCM/APNs", "Retry logic"],
    components: [],
    stats: [],
    articleLink: "",
    excalidrawLink: "",
    summary: "",
  },
  {
    id: "search-autocomplete",
    title: "Search Autocomplete",
    subtitle: "Design Google search suggestions",
    difficulty: "Hard",
    status: "coming",
    diagram: null,
    concepts: ["Trie", "Top-K", "Caching", "Ranking"],
    components: [],
    stats: [],
    articleLink: "",
    excalidrawLink: "",
    summary: "",
  },
];


const DIFF_COLOR = {
  Easy:   style.diff_easy,
  Medium: style.diff_medium,
  Hard:   style.diff_hard,
};

/* ── MODAL ── */
const Modal = ({ design, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className={style.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={style.modal}
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit={{   opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className={style.modal_header}>
            <div className={style.modal_header_left}>
              <h2 className={style.modal_title}>{design.title}</h2>
              <p className={style.modal_subtitle}>{design.subtitle}</p>
            </div>
            <div className={style.modal_header_right}>
              <span className={DIFF_COLOR[design.difficulty] + " " + style.diff_badge}>
                {design.difficulty}
              </span>
              <button className={style.close_btn} onClick={onClose} aria-label="Close">✕</button>
            </div>
          </div>

          <div className={style.modal_body}>
            {/* Diagram */}
            <div className={style.modal_diagram}>
              {design.diagram ? (
                <img src={design.diagram} alt={design.title} className={style.modal_img} />
              ) : (
                <div className={style.modal_placeholder}>
                  <span className={style.placeholder_icon}>⬡</span>
                  <p className={style.placeholder_text}>
                    Export your Excalidraw diagram as PNG<br />
                    save to <code>src/assets/url-shortener.png</code><br />
                    then set <code>diagram: urlImg</code>
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            {design.summary && (
              <p className={style.modal_summary}>{design.summary}</p>
            )}

            {/* Stats */}
            {design.stats.length > 0 && (
              <div className={style.modal_stats}>
                {design.stats.map((s, i) => (
                  <div key={i} className={style.modal_stat}>
                    <span className={style.modal_stat_val}>{s.val}<span className={style.modal_stat_unit}> {s.unit}</span></span>
                    <span className={style.modal_stat_key}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Concepts */}
            <div className={style.modal_section}>
              <span className={style.modal_section_label}>Key concepts</span>
              <div className={style.tags}>
                {design.concepts.map((c, i) => (
                  <span key={i} className={style.concept_tag}>{c}</span>
                ))}
              </div>
            </div>

            {/* Components */}
            {design.components.length > 0 && (
              <div className={style.modal_section}>
                <span className={style.modal_section_label}>Components</span>
                <div className={style.tags}>
                  {design.components.map((c, i) => (
                    <span key={i} className={style.comp_tag}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className={style.modal_links}>
              {design.articleLink && (
                <a href={design.articleLink} target="_blank" rel="noreferrer" className={style.link_btn}>
                  <span className={style.medium_m}>M</span> Read article
                </a>
              )}
              {design.excalidrawLink && (
                <a href={design.excalidrawLink} target="_blank" rel="noreferrer" className={style.link_btn + " " + style.link_ex}>
                  ⬡ View in Excalidraw
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── SMALL CARD ── */
const DesignCard = ({ design, index, onClick }) => {
  const isCompleted = design.status === "completed";

  return (
    <motion.div
      variants={fadeIn("up", "", index * 0.08, 0.4)}
      className={style.card + (isCompleted ? "" : " " + style.card_coming)}
      onClick={isCompleted ? onClick : undefined}
      style={isCompleted ? { cursor: "pointer" } : {}}
      role={isCompleted ? "button" : undefined}
      tabIndex={isCompleted ? 0 : undefined}
      onKeyDown={isCompleted ? (e) => { if (e.key === "Enter") onClick(); } : undefined}
    >
      {/* top accent */}
      {isCompleted && <div className={style.card_accent} />}

      <div className={style.card_inner}>
        {/* icon + status */}
        <div className={style.card_top}>
          <span className={style.card_icon}>⬡</span>
          {isCompleted
            ? <span className={style.status_dot} />
            : <span className={style.coming_pill}>soon</span>
          }
        </div>

        {/* title */}
        <h3 className={style.card_title}>{design.title}</h3>
        <p className={style.card_subtitle}>{design.subtitle}</p>

        {/* diff badge */}
        <span className={DIFF_COLOR[design.difficulty] + " " + style.diff_badge} style={{marginTop:"8px",alignSelf:"flex-start"}}>
          {design.difficulty}
        </span>

        {/* concept chips — first 3 */}
        <div className={style.card_chips}>
          {design.concepts.slice(0, 3).map((c, i) => (
            <span key={i} className={style.chip}>{c}</span>
          ))}
          {design.concepts.length > 3 && (
            <span className={style.chip_more}>+{design.concepts.length - 3}</span>
          )}
        </div>

        {/* cta */}
        {isCompleted && (
          <div className={style.card_cta}>
            <span>View details</span>
            <span className={style.cta_arrow}>→</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── MAIN ── */
const SystemDesign = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <motion.h1 variants={textVariant()} className={style.title}>
        System Design
      </motion.h1>
      <motion.p variants={fadeIn("","",0.1,0.5)} className={style.subtitle}>
        Architecture breakdowns — requirements · estimation · tradeoffs · diagrams
      </motion.p>

      <div className={style.grid}>
        {DESIGNS.map((d, i) => (
          <DesignCard key={d.id} design={d} index={i} onClick={() => setSelected(d)} />
        ))}
      </div>

      {selected && <Modal design={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default SectionWrapper(SystemDesign, "systemdesign", "");
