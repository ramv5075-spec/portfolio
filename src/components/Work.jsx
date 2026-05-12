import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import style from "./styles/work.module.css";
import SectionWrapper from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const CATEGORIES = ["All", "AI / ML", "Full-Stack", "Mobile", "Backend", "DevOps"];

const PROJECT_META = {
  1:  { category: "Backend",    emoji: "🏦", featured: false },
  2:  { category: "Full-Stack", emoji: "💻", featured: false },
  3:  { category: "Mobile",     emoji: "📱", featured: false },
  4:  { category: "AI / ML",    emoji: "🧠", featured: true  },
  5:  { category: "AI / ML",    emoji: "🤖", featured: false },
  6:  { category: "AI / ML",    emoji: "💬", featured: true  },
  7:  { category: "Backend",    emoji: "📚", featured: false },
  8:  { category: "Full-Stack", emoji: "✅", featured: false },
  9:  { category: "AI / ML",    emoji: "📄", featured: false },
  10: { category: "Backend",    emoji: "🔗", featured: false },
  11: { category: "Backend",    emoji: "🔐", featured: false },
  12: { category: "DevOps",     emoji: "🚀", featured: true  },
};

const CATEGORY_COLORS = {
  "AI / ML":    "#7c3aed",
  "Full-Stack": "#00cfff",
  "Mobile":     "#10b981",
  "Backend":    "#f59e0b",
  "DevOps":     "#ef4444",
};

const ProjectCard = ({ project, featured = false }) => {
  const [showAll, setShowAll] = useState(false);
  const meta = PROJECT_META[project.id] || { category: "Project", emoji: "💡", featured: false };
  const color = CATEGORY_COLORS[meta.category] || "#00cfff";

  return (
    <motion.article
      variants={fadeIn("up", "", 0.05, 0.4)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={featured ? style.card_featured : style.card}
      style={{ "--accent": color }}
    >
      <div className={style.card_inner}>
        {/* Top row */}
        <div className={style.top_row}>
          <div className={style.emoji_wrap}>
            <span className={style.emoji}>{meta.emoji}</span>
          </div>
          <span
            className={style.cat_badge}
            style={{ color, borderColor: color + "44", background: color + "11" }}
          >
            {meta.category}
          </span>
        </div>

        {/* Name */}
        <h2 className={style.name}>{project.name}</h2>

        {/* Desc */}
        <p className={showAll ? style.desc_full : style.desc}>{project.desc}</p>
        {project.desc.length > 100 && (
          <button className={style.toggle} style={{ color }} onClick={() => setShowAll(!showAll)}>
            {showAll ? "less ▲" : "more ▼"}
          </button>
        )}

        {/* Tech chips */}
        <div className={style.chips}>
          {project.tech?.slice(0, featured ? 6 : 4).map((t) => (
            <span key={t} className={style.chip}>{t}</span>
          ))}
          {project.tech?.length > (featured ? 6 : 4) && (
            <span className={style.chip_more}>+{project.tech.length - (featured ? 6 : 4)}</span>
          )}
        </div>

        {/* Actions */}
        <div className={style.actions}>
          <a
            href={project.source_link}
            target="_blank"
            rel="noreferrer"
            className={style.btn_primary}
            style={{ background: color, color: "#0a0f1e" }}
          >
            {project.source_label || "GitHub →"}
          </a>
          {project.hasLive && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noreferrer"
              className={style.btn_secondary}
              style={{ borderColor: color + "66", color }}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Work = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => PROJECT_META[p.id]?.category === active);

  return (
    <div className={style.container}>
      <motion.h1 variants={textVariant()} className={style.title}>
        My Recent Works
      </motion.h1>
      <motion.p variants={fadeIn("", "", 0.1, 0.5)} className={style.subtitle}>
        {projects.length} projects — AI, full-stack, mobile &amp; cloud
      </motion.p>

      {/* Filters */}
      <motion.div variants={fadeIn("", "", 0.15, 0.5)} className={style.filters}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={cat === active ? style.filter_active : style.filter_btn}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Bento grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={style.bento}
        >
          {filtered.map((project) => {
            const meta = PROJECT_META[project.id];
            const isFeatured = meta?.featured && active === "All";
            return (
              <ProjectCard key={project.id} project={project} featured={isFeatured} />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Work, "work", "");
