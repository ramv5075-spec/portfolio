import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import style from './styles/terminal.module.css';

const RESPONSES = {
  help: [
    'Available commands:',
    '  whoami       — who is Ram?',
    '  skills       — tech stack',
    '  experience   — work history',
    '  projects     — notable projects',
    '  contact      — get in touch',
    '  status       — availability',
    '  clear        — clear terminal',
    '  exit         — close terminal',
  ],
  whoami: [
    'Ramvasanth Mahendran (Ram)',
    'MS Computer Science and Engineering @ University at Buffalo',
    '4+ years · Full-Stack · AI/ML · Distributed Systems',
    'Previously: Hachette Book Group, CodeStax.ai, Novalnet',
  ],
  skills: [
    'Languages  → Python, Java, C++, JS, TypeScript, SQL',
    'AI/ML      → LLMs, RAG, FAISS, LangChain, Mistral 7B',
    'Frontend   → React, Vue.js, React Native, Angular',
    'Backend    → Node.js, Spring Boot, FastAPI',
    'Cloud      → AWS, GCP, Azure, Docker, Kubernetes',
    'Databases  → PostgreSQL, MySQL, Oracle, MongoDB, Redis',
  ],
  experience: [
    '[2026-Present] Software Developer @ Garden State Speed Skating',
    '  → Vue.js, Node.js, CI/CD',
    '[2025]         Software Engineer Intern @ Hachette Book Group',
    '  → RAG platform, Mistral 7B, 30% accuracy boost',
    '[2022-2024]    SDE @ CodeStax.ai',
    '  → Core Banking, React Native, AWS, 40% faster releases',
    '[2021-2022]    SDE @ Novalnet E-Solutions',
    '  → FinTech, Java, React, 30% perf boost',
  ],
  projects: [
    '★ AI RAG System     → FAISS + Mistral 7B + SQL Server',
    '★ LedgerBank Suite  → Node.js + React + React Native',
    '★ Portfolio AI      → AWS Lambda + OpenAI GPT-4o-mini',
    '★ Kafka Txn System  → Python + Kafka + FastAPI + Docker',
    '★ AI SQL Agent      → NL-to-SQL agentic system',
    '  Type: open github — to see all projects',
  ],
  'open github': ['Opening GitHub...'],
  contact: [
    'Email    → ramv5075@gmail.com',
    'Phone    → +1 (908) 405-5698',
    'LinkedIn → linkedin.com/in/ramvasanth-mahendran-8a0507203',
    'GitHub   → github.com/ramv5075-spec',
  ],
  status: [
    '● Status     : OPEN TO WORK',
    '● Visa       : F-1 OPT (valid until Feb 2027)',
    '● STEM OPT   : Eligible (24 months extension)',
    '● Location   : New York, NY',
    '● Relocation : Open anywhere in the US',
    '● Start Date : Immediately',
  ],
};

const PROMPT = 'ram@portfolio:~$';

const Terminal = ({ onClose }) => {
  const [lines, setLines] = useState([
    { type: 'system', text: "Welcome to Ram's Portfolio Terminal v1.0" },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'blank' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = (cmd) => {
    const c = cmd.trim().toLowerCase();
    const newLines = [{ type: 'input', text: PROMPT + ' ' + cmd }];

    if (c === 'clear') {
      setLines([{ type: 'system', text: 'Terminal cleared. Type "help" for commands.' }]);
      return;
    }
    if (c === 'exit') {
      newLines.push({ type: 'output', text: 'Goodbye! 👋' });
      setLines((l) => [...l, ...newLines]);
      setTimeout(onClose, 800);
      return;
    }
    if (c === 'open github') {
      window.open('https://github.com/ramv5075-spec', '_blank');
      newLines.push({ type: 'success', text: 'Opened github.com/ramv5075-spec' });
    } else if (RESPONSES[c]) {
      RESPONSES[c].forEach((t) => newLines.push({ type: 'output', text: t }));
    } else if (c === '') {
      // empty — do nothing
    } else {
      newLines.push({ type: 'error', text: 'command not found: ' + c + '. Type "help".' });
    }

    newLines.push({ type: 'blank' });
    setLines((l) => [...l, ...newLines]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setInput('');
      setHistIdx(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.25 }}
      className={style.terminal}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={style.titlebar}>
        <div className={style.dots_row}>
          <button className={style.dot_red} onClick={onClose} title="Close" />
          <span className={style.dot_yellow} />
          <span className={style.dot_green} />
        </div>
        <span className={style.terminal_title}>ram@portfolio — terminal</span>
        <span />
      </div>

      <div className={style.output}>
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'input'   ? style.line_input   :
              line.type === 'error'   ? style.line_error   :
              line.type === 'success' ? style.line_success :
              line.type === 'system'  ? style.line_system  :
              line.type === 'blank'   ? style.line_blank   :
              style.line_output
            }
          >
            {line.text || ''}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={style.input_row}>
        <span className={style.prompt}>{PROMPT}</span>
        <input
          ref={inputRef}
          className={style.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
    </motion.div>
  );
};

const TerminalTrigger = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <button
        className={style.trigger_btn}
        onClick={() => setOpen((o) => !o)}
        title="Open Terminal (Ctrl+`)"
        aria-label="Open terminal"
      >
        <span className={style.trigger_icon}>&gt;_</span>
      </button>

      <AnimatePresence>
        {open && (
          <div className={style.overlay}>
            <Terminal onClose={() => setOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalTrigger;
