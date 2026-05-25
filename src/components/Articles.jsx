import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import style from "./styles/articles.module.css";

// ── ADD YOUR MEDIUM ARTICLES HERE ──
const ARTICLES = [
  {
    title: "API Design & Architecture: REST, GraphQL, gRPC, WebSocket, and SOAP Explained",
    excerpt: "A developer's guide to understanding when and why to use each API type — with a live interactive playground you can try right now.",
    tags: ["API Design", "REST", "GraphQL", "gRPC", "WebSocket"],
    readTime: "12 min read",
    date: "2025",
    link: "https://medium.com/@ramv5075/api-design-architecture-rest-graphql-grpc-websocket-and-soap-explained-d133d193f6c4",
    featured: true,
  },
  // Add more articles here as you publish them
  // {
  //   title: "Your next article title",
  //   excerpt: "Brief description...",
  //   tags: ["Tag1", "Tag2"],
  //   readTime: "8 min read",
  //   date: "2025",
  //   link: "https://medium.com/@ramv5075/your-article",
  //   featured: false,
  // },
];

const ArticleCard = ({ article, index }) => (
  <motion.a
    href={article.link}
    target="_blank"
    rel="noreferrer"
    variants={fadeIn("up", "", index * 0.1, 0.5)}
    className={style.card + (article.featured ? " " + style.card_featured : "")}
  >
    {article.featured && (
      <div className={style.featured_badge}>✦ Featured</div>
    )}

    <div className={style.card_top}>
      <div className={style.medium_logo}>M</div>
      <span className={style.read_time}>{article.readTime}</span>
    </div>

    <h3 className={style.card_title}>{article.title}</h3>
    <p className={style.card_excerpt}>{article.excerpt}</p>

    <div className={style.card_tags}>
      {article.tags.slice(0, 4).map((tag, i) => (
        <span key={i} className={style.tag}>{tag}</span>
      ))}
    </div>

    <div className={style.card_footer}>
      <span className={style.date}>{article.date}</span>
      <span className={style.read_link}>Read on Medium →</span>
    </div>
  </motion.a>
);

const Articles = () => (
  <>
    <motion.h1 variants={textVariant()} className={style.title}>
      Writing
    </motion.h1>
    <motion.p variants={fadeIn("", "", 0.1, 0.5)} className={style.subtitle}>
      Technical articles on engineering, AI systems, and software architecture
    </motion.p>

    <div className={style.grid}>
      {ARTICLES.map((article, i) => (
        <ArticleCard key={i} article={article} index={i} />
      ))}

      {/* More on Medium card */}
      <motion.a
        href="https://medium.com/@ramv5075"
        target="_blank"
        rel="noreferrer"
        variants={fadeIn("up", "", ARTICLES.length * 0.1, 0.5)}
        className={style.more_card}
      >
        <div className={style.more_inner}>
          <div className={style.medium_logo_lg}>M</div>
          <p className={style.more_text}>More articles on Medium</p>
          <span className={style.more_arrow}>↗</span>
        </div>
      </motion.a>
    </div>
  </>
);

export default SectionWrapper(Articles, "articles", "");
