import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import APILab from "./APILab";
import Articles from "./Articles";
import SystemDesign from "./SystemDesign";
import LeetCode from "./LeetCode";
import style from "./styles/lab.module.css";

const TABS = [
  {
    id: "api",
    label: "API Playground",
    icon: "⚗️",
    desc: "Try all 5 API types live",
    component: APILab,
    tag: "interactive",
  },
  {
    id: "systems",
    label: "System Design",
    icon: "⬡",
    desc: "Architecture diagrams",
    component: SystemDesign,
    tag: "2 done",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    icon: "💻",
    desc: "DSA progress & stats",
    component: LeetCode,
    tag: "120+",
  },
  {
    id: "writing",
    label: "Writing",
    icon: "✍️",
    desc: "Technical articles",
    component: Articles,
    tag: "medium",
  },
];

const Lab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "api";
  const [active, setActive] = useState(
    TABS.find(t => t.id === tabFromUrl) ? tabFromUrl : "api"
  );

  const switchTab = (id) => {
    setActive(id);
    setSearchParams({ tab: id });
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeTab = TABS.find(t => t.id === active);
  const ActiveComponent = activeTab?.component;

  return (
    <div className={style.page}>

      {/* ── Mobile tab bar ── */}
      <div className={style.mobile_tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={style.mobile_tab + (active === tab.id ? " " + style.mobile_tab_active : "")}
            onClick={() => switchTab(tab.id)}
          >
            <span className={style.mobile_tab_icon}>{tab.icon}</span>
            <span className={style.mobile_tab_label}>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={style.layout}>

        {/* ── Sidebar ── */}
        <aside className={style.sidebar}>

          {/* Brand */}
          <div className={style.sidebar_brand}>
            <div className={style.brand_badge}>
              <span className={style.brand_prefix}>RAM</span>
              <span className={style.brand_suffix}>://</span>
            </div>
            <div className={style.brand_meta}>
              <div className={style.brand_name}>Ramvasanth Mahendran</div>
              <div className={style.brand_sub}>Full-Stack · AI Engineer</div>
            </div>
          </div>

          {/* Status pill */}
          <div className={style.status_pill}>
            <span className={style.status_dot} />
            <span className={style.status_text}>Open to Work · F-1 OPT</span>
          </div>

          {/* Nav */}
          <nav className={style.sidebar_nav}>
            <p className={style.nav_label}>Explore</p>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={style.nav_item + (active === tab.id ? " " + style.nav_active : "")}
                onClick={() => switchTab(tab.id)}
              >
                <span className={style.nav_icon}>{tab.icon}</span>
                <div className={style.nav_text}>
                  <span className={style.nav_name}>{tab.label}</span>
                  <span className={style.nav_desc}>{tab.desc}</span>
                </div>
                {tab.tag && (
                  <span className={style.nav_tag + (active === tab.id ? " " + style.nav_tag_active : "")}>
                    {tab.tag}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className={style.sidebar_divider} />

          {/* Stats */}
          <div className={style.sidebar_stats}>
            <p className={style.nav_label}>At a glance</p>
            <div className={style.stat_grid}>
              <div className={style.stat_box}>
                <span className={style.stat_val}>4+</span>
                <span className={style.stat_key}>Years exp</span>
              </div>
              <div className={style.stat_box}>
                <span className={style.stat_val}>120+</span>
                <span className={style.stat_key}>LeetCode</span>
              </div>
              <div className={style.stat_box}>
                <span className={style.stat_val}>15+</span>
                <span className={style.stat_key}>Projects</span>
              </div>
              <div className={style.stat_box}>
                <span className={style.stat_val}>2</span>
                <span className={style.stat_key}>Designs</span>
              </div>
            </div>
          </div>

          <div className={style.sidebar_divider} />

          {/* Links */}
          <div className={style.sidebar_links}>
            <a href="https://github.com/ramv5075-spec" target="_blank" rel="noreferrer" className={style.ext_link}>
              <span>⑂</span> GitHub
            </a>
            <a href="https://leetcode.com/u/Ramvasanth130699/" target="_blank" rel="noreferrer" className={style.ext_link}>
              <span>💻</span> LeetCode
            </a>
            <a href="https://medium.com/@ramv5075" target="_blank" rel="noreferrer" className={style.ext_link}>
              <span>M</span> Medium
            </a>
          </div>

          <div className={style.sidebar_divider} />

          {/* Back */}
          <Link to="/" className={style.back_link}>
            <span>←</span>
            <span>Back to portfolio</span>
          </Link>

        </aside>

        {/* ── Main ── */}
        <main className={style.main}>

          {/* Top bar */}
          <div className={style.topbar}>
            <div className={style.breadcrumb}>
              <span className={style.bc_root}>RAM://</span>
              <span className={style.bc_sep}>/</span>
              <span className={style.bc_active}>{activeTab?.label}</span>
            </div>
            <div className={style.topbar_right}>
              <span className={style.topbar_icon}>{activeTab?.icon}</span>
              <span className={style.topbar_desc}>{activeTab?.desc}</span>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className={style.content}
            >
              {ActiveComponent && <ActiveComponent />}
            </motion.div>
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
};

export default Lab;
