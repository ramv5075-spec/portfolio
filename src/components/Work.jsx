import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import style from "./styles/work.module.css";
import SectionWrapper from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const CATEGORIES = ["All", "AI / ML", "Full-Stack", "Mobile", "Backend", "DevOps"];

const PROJECT_META = {
  1:  { category: "Backend",    emoji: "🏦" },
  2:  { category: "Full-Stack", emoji: "💻" },
  3:  { category: "Mobile",     emoji: "📱" },
  4:  { category: "AI / ML",    emoji: "🧠" },
  5:  { category: "AI / ML",    emoji: "🤖" },
  6:  { category: "AI / ML",    emoji: "💬" },
  7:  { category: "Backend",    emoji: "📚" },
  8:  { category: "Full-Stack", emoji: "✅" },
  9:  { category: "AI / ML",    emoji: "📄" },
  10: { category: "Backend",    emoji: "🔗" },
  11: { category: "Backend",    emoji: "🔐" },
  12: { category: "DevOps",     emoji: "🚀" },
};

const CAT_COLORS = {
  "AI / ML":    { text: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
  "Full-Stack": { text: "#00cfff", bg: "rgba(0,207,255,0.08)",   border: "rgba(0,207,255,0.2)"   },
  "Mobile":     { text: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)"  },
  "Backend":    { text: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)"  },
  "DevOps":     { text: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)" },
};

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const meta  = PROJECT_META[project.id] || { category: "Project", emoji: "💡" };
  const color = CAT_COLORS[meta.category] || CAT_COLORS["Full-Stack"];
  const isLong = project.desc?.length > 110;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={style.card}
    >
      {/* Top accent line */}
      <div className={style.accent} style={{ background: color.text }} />

      <div className={style.card_body}>
        {/* Header */}
        <div className={style.header}>
          <span className={style.emoji}>{meta.emoji}</span>
          <span
            className={style.cat}
            style={{ color: color.text, background: color.bg, borderColor: color.border }}
          >
            {meta.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={style.title}>{project.name}</h3>

        {/* Desc */}
        <p className={style.desc + (expanded ? " " + style.desc_open : "")}>
          {project.desc}
        </p>
        {isLong && (
          <button
            className={style.toggle}
            style={{ color: color.text }}
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? "show less ↑" : "read more ↓"}
          </button>
        )}

        {/* Tech chips */}
        <div className={style.chips}>
          {project.tech?.slice(0, 4).map(t => (
            <span key={t} className={style.chip}>{t}</span>
          ))}
          {project.tech?.length > 4 && (
            <span className={style.chip_more}>+{project.tech.length - 4}</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={style.footer}>
        <a
          href={project.source_link}
          target="_blank"
          rel="noreferrer"
          className={style.gh_btn}
        >
          <span className={style.gh_icon}>⑂</span>
          <span>{project.source_label || "GitHub"}</span>
          <span className={style.gh_arrow}>↗</span>
        </a>
        {project.hasLive && project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noreferrer"
            className={style.live_btn}
            style={{ color: color.text, borderColor: color.border }}
          >
            Live ↗
          </a>
        )}
      </div>
    </motion.article>
  );
};

const Work = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter(p => PROJECT_META[p.id]?.category === active);

  const getCategoryCount = (cat) =>
    projects.filter(p => PROJECT_META[p.id]?.category === cat).length;

  return (
    <div className={style.container}>
      <motion.h1 variants={textVariant()} className={style.section_title}>
        Projects
      </motion.h1>
      <motion.p variants={fadeIn("", "", 0.1, 0.5)} className={style.section_sub}>
        {projects.length} projects across AI, full-stack, mobile &amp; cloud
      </motion.p>

      {/* Filters */}
      <motion.div variants={fadeIn("", "", 0.15, 0.5)} className={style.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={style.filter + (cat === active ? " " + style.filter_on : "")}
            onClick={() => setActive(cat)}
          >
            {cat}
            {cat !== "All" && (
              <span className={style.filter_count}>{getCategoryCount(cat)}</span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={style.grid}
        >
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <div className={style.empty}>No projects in this category yet</div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Work, "work", "");
