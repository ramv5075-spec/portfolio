import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import style from "./styles/service.module.css";

const SERVICES = [
  {
    number: "01",
    icon: "🧠",
    title: "AI & RAG Engineering",
    desc: "Production RAG pipelines, FAISS vector stores, local LLM inference with Mistral 7B, LangChain multi-agent systems, and MCP integrations.",
    metric: "30% accuracy boost",
    tags: ["LangChain", "FAISS", "Mistral 7B", "FastAPI"],
    color: "#7c3aed",
  },
  {
    number: "02",
    icon: "⚙️",
    title: "Full-Stack Development",
    desc: "End-to-end web and mobile apps with React, Vue.js, React Native, Node.js, Spring Boot — from architecture to production deployment.",
    metric: "20% faster page loads",
    tags: ["React", "Vue.js", "Node.js", "Spring Boot"],
    color: "#00cfff",
  },
  {
    number: "03",
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "AWS infrastructure, Docker, Kubernetes, cross-account CI/CD pipelines, and Power Automate enterprise workflow automation.",
    metric: "40% faster releases",
    tags: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    color: "#10b981",
  },
  {
    number: "04",
    icon: "📱",
    title: "Mobile Development",
    desc: "Cross-platform React Native apps shipped end-to-end to App Store and Google Play — owned architecture, build, release and iteration.",
    metric: "iOS & Android",
    tags: ["React Native", "JWT", "AsyncStorage"],
    color: "#f59e0b",
  },
  {
    number: "05",
    icon: "🗄️",
    title: "Database Engineering",
    desc: "Schema design and query optimization across PostgreSQL, MySQL, Oracle, SQL Server, MongoDB, Redis and FAISS vector stores.",
    metric: "30% latency cut",
    tags: ["PostgreSQL", "Oracle", "Redis", "FAISS"],
    color: "#ef4444",
  },
  {
    number: "06",
    icon: "🔷",
    title: "Microsoft Power Platform",
    desc: "Power Automate pipelines, Power Apps tools, Copilot Studio agents and AI Builder integrations for enterprise workflows.",
    metric: "40% less manual work",
    tags: ["Power Automate", "Copilot Studio", "MCP"],
    color: "#0078d4",
  },
];

const Service = () => (
  <div className={style.container}>
    <motion.h1 variants={textVariant()} className={style.title}>
      What I Do
    </motion.h1>
    <motion.p variants={fadeIn("", "", 0.1, 0.5)} className={style.subtitle}>
      6 areas of expertise — built from real production experience
    </motion.p>

    <div className={style.list}>
      {SERVICES.map((svc, i) => (
        <motion.div
          key={i}
          variants={fadeIn("up", "", i * 0.08, 0.5)}
          className={style.row}
          style={{ "--accent": svc.color }}
        >
          <span className={style.number}>{svc.number}</span>

          <div className={style.row_left}>
            <div className={style.row_title_row}>
              <span className={style.row_icon}>{svc.icon}</span>
              <h3 className={style.row_title}>{svc.title}</h3>
            </div>
            <p className={style.row_desc}>{svc.desc}</p>
            <div className={style.row_tags}>
              {svc.tags.map((t, ti) => (
                <span key={ti} className={style.tag}>{t}</span>
              ))}
            </div>
          </div>

          <div className={style.row_metric}>
            <span className={style.metric_value}>{svc.metric}</span>
            <span className={style.metric_label}>Impact</span>
          </div>

          <div className={style.row_line} />
        </motion.div>
      ))}
    </div>
  </div>
);

export default SectionWrapper(Service, "service", "");
