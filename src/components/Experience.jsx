import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc';
import style from './styles/experience.module.css';
import { textVariant, fadeIn } from '../utils/motion';

const EXPERIENCES = [
  {
    role: "Software Developer",
    company: "Garden State Speed Skating",
    period: "Feb 2026 – Present",
    location: "New Jersey",
    type: "Full-Time",
    stack: ["Vue.js", "Node.js", "JavaScript", "REST APIs", "CI/CD"],
    bullets: [
      "Designed and built the organization official website using Vue.js with component-based responsive UI across mobile and desktop.",
      "Developed Node.js backend REST APIs for member data, event registrations, and contact form submissions with structured JSON contracts.",
      "Deployed full-stack application to production with CI/CD pipeline automation — configured staging and production environments.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Hachette Book Group",
    period: "Jun 2025 – Dec 2025",
    location: "New York, NY",
    type: "Internship",
    stack: ["Python", "FastAPI", "RAG", "FAISS", "Mistral 7B", "MCP", "Power Automate"],
    bullets: [
      "Designed and deployed production RAG platform integrating Oracle DB and SQL Server through FAISS vector indexing and local Mistral 7B GPU inference — improved query response accuracy by 30%.",
      "Deployed Microsoft Copilot agents and MCP integrations into enterprise workflows and built Power Automate automation pipelines — reduced manual incident resolution time by 40%.",
      "Built Power Apps internal tools and applied GitHub Copilot for AI-assisted development across cross-functional teams.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "CodeStax.ai",
    period: "May 2022 – Jun 2024",
    location: "Chennai, India",
    type: "Full-Time",
    stack: ["TypeScript", "Vue.js", "Node.js", "Java", "React Native", "AWS", "LangChain"],
    bullets: [
      "Built Core Banking platform modules (Ledger, Home Loan, Wallet) using Vue.js dashboards and Node.js/Java REST backend — improved API latency by 30% and page load by 20%.",
      "Shipped cross-platform React Native mobile apps end-to-end to App Store and Google Play — owned architecture, development, release, and post-launch iteration.",
      "Implemented cross-account AWS CodePipeline CI/CD system with automated tests and Microspot rule engine — reducing release cycles by 40%.",
      "Delivered AI initiatives integrating LangGraph multi-agent systems and LLM-powered features into enterprise products.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Novalnet E-Solutions",
    period: "Feb 2021 – Mar 2022",
    location: "Chennai, India",
    type: "Full-Time",
    stack: ["Java", "React.js", "MySQL", "REST APIs", "PHP"],
    bullets: [
      "Built payment API integrations and Admin CRM for a high-volume FinTech platform processing millions of daily transactions.",
      "Optimized complex MySQL queries and relational schemas — improved backend data-layer performance by 30%.",
      "Migrated legacy PHP Zend interfaces to React.js — improving frontend performance by 35%.",
    ],
  },
];

const ExperienceCard = ({ exp, index }) => {
  const [open, setOpen] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className={style.item + (isLeft ? " " + style.item_left : " " + style.item_right)}>

      {/* Timeline dot */}
      <div className={style.dot}>
        <div className={style.dot_inner} />
      </div>

      {/* Card */}
      <motion.div
        variants={fadeIn(isLeft ? "right" : "left", "", index * 0.15, 0.5)}
        className={style.card}
        onClick={() => setOpen(!open)}
      >
        <div className={style.card_header}>
          <div>
            <h3 className={style.role}>{exp.role}</h3>
            <p className={style.company}>{exp.company}</p>
          </div>
          <div className={style.meta}>
            <span className={style.period}>{exp.period}</span>
            <span className={style.location}>{exp.location}</span>
            <span className={style.type_badge}>{exp.type}</span>
          </div>
        </div>

        {/* Stack badges */}
        <div className={style.stack_row}>
          {exp.stack.map((s, i) => <span key={i} className={style.badge}>{s}</span>)}
        </div>

        {/* Expand toggle */}
        <button className={style.toggle} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
          {open ? "Hide details ▲" : "Show details ▼"}
        </button>

        {/* Bullets */}
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={style.bullets}
          >
            {exp.bullets.map((b, i) => (
              <li key={i} className={style.bullet}>{b}</li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
};

const Experience = () => (
  <>
    <motion.h1 variants={textVariant()} className={style.title}>
      Experience
    </motion.h1>

    <div className={style.timeline}>
      <div className={style.line} />
      {EXPERIENCES.map((exp, i) => (
        <ExperienceCard key={i} exp={exp} index={i} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Experience, "experience", "");