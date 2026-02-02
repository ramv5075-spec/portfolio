import React, { useMemo, useRef, useState } from "react";
import styles from "./styles/portfolioChat.module.css";
import { projects } from "../constants";

// ========== Config ==========
const API_URL =
  import.meta.env.VITE_CHATBOT_API_URL ||
  "https://3bx2lny7nl.execute-api.ap-south-1.amazonaws.com/chat";

const CHATBOT_SECRET = import.meta.env.VITE_CHATBOT_SECRET || "";

// Turn your existing portfolio data into a safe “context”
function buildContext(projects) {
  const lines = [];

  lines.push(`Name: Ramvasanth Mahendran`);
  lines.push(`Roles: Full-Stack Engineer, Software Engineer, AI Engineer`);
  lines.push(
    `Summary: Builds full-stack apps and AI systems (RAG, embeddings, local LLMs).`
  );
  lines.push("");

  lines.push("Projects:");
  projects.forEach((p) => {
    const tech = (p.tech || []).join(", ");
    lines.push(`- ${p.name}: ${p.desc}`);
    if (tech) lines.push(`  Tech: ${tech}`);
    if (p.source_link) lines.push(`  GitHub: ${p.source_link}`);
    if (p.live_link) lines.push(`  Live: ${p.live_link}`);
  });

  return lines.join("\n");
}

// Local fallback answerer (only used if API fails)
function answerFromContext(userQ, context) {
  const q = userQ.toLowerCase();

  if (q.includes("resume") || q.includes("cv")) {
    return "You can check my resume from the About section link. Want me to summarize my experience in 3 bullets?";
  }

  if (q.includes("projects") || q.includes("portfolio")) {
    return "You can explore my recent projects in the Projects section. Tell me what role you're hiring for (Full-Stack / SDE / AI) and I’ll recommend the best projects to look at first.";
  }

  const names = (context.match(/- (.*?):/g) || []).map((s) =>
    s.replace("- ", "").replace(":", "").trim()
  );

  for (const name of names) {
    if (q.includes(name.toLowerCase())) {
      const idx = context.indexOf(`- ${name}:`);
      const slice = context.slice(idx);
      const nextIdx = slice.indexOf("\n- ", 3);
      const block = nextIdx === -1 ? slice : slice.slice(0, nextIdx);
      return block.replace(`- ${name}:`, `${name}:`).trim();
    }
  }

  return "Ask me about a specific project (e.g., DocChat RAG, URL Shortener, NeetCode 150) or ask: “Which projects are best for Full-Stack / AI roles?”";
}

// Call your hosted AI backend (Lambda + API Gateway)
async function askBackend(message, context) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(CHATBOT_SECRET ? { "x-chatbot-secret": CHATBOT_SECRET } : {}),
    },
    body: JSON.stringify({
      message,
      // optional: send context so chatbot answers based on your portfolio data
      // if your backend ignores it, no issue.
      context,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errMsg = data?.error || data?.message || "Request failed";
    throw new Error(errMsg);
  }

  // your lambda returns { reply: "..." }
  return data?.reply || "Sorry — I didn’t get a response. Please try again.";
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 Ask me about my projects, skills, or experience." },
  ]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);
  const context = useMemo(() => buildContext(projects), []);

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  };

  const send = async () => {
    const text = input.trim();
    if (!text || pending) return;

    setError("");
    setInput("");

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setPending(true);
    setTimeout(() => scrollToBottom(false), 0);

    try {
      const reply = await askBackend(text, context);
      const final = [...next, { role: "assistant", content: reply }];
      setMessages(final);
    } catch (e) {
      // fallback to local answerer
      const fallback = answerFromContext(text, context);
      setMessages([
        ...next,
        {
          role: "assistant",
          content: fallback,
        },
      ]);
      setError("AI service unavailable — showing a fallback answer.");
    } finally {
      setPending(false);
      setTimeout(() => scrollToBottom(true), 0);
    }
  };

  return (
    <div className={styles.wrap}>
     <button
  id="portfolio-chat-btn"   // 👈 ADD THIS
  className={styles.fab}
  onClick={() => {
    setOpen((v) => !v);
    setTimeout(() => scrollToBottom(false), 0);
  }}
  aria-label="Open portfolio chatbot"
>
  {open ? "×" : "💬"}
  {!open && <span className={styles.newBadge}>NEW</span>}
</button>


      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div>
              <div className={styles.title}>Ask my portfolio</div>
              <div className={styles.sub}>Projects • Skills • Experience</div>
              {error ? <div className={styles.error}>{error}</div> : null}
            </div>
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className={styles.body}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.msg} ${
                  m.role === "user" ? styles.user : styles.assistant
                }`}
              >
                {m.content}
              </div>
            ))}
            {pending && (
              <div className={`${styles.msg} ${styles.assistant}`}>
                Typing…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.footer}>
            <input
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try: "Which projects are best for AI roles?"'
              onKeyDown={(e) => e.key === "Enter" && send()}
              disabled={pending}
            />
            <button className={styles.send} onClick={send} disabled={pending}>
              {pending ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

