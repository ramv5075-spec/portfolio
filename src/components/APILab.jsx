import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import style from "./styles/apilab.module.css";

/* ─────────────────────────────────────────
   API TAB DEFINITIONS
───────────────────────────────────────── */
const TABS = [
  { id: "rest",      label: "REST",      icon: "⚡", color: "#00cfff" },
  { id: "graphql",   label: "GraphQL",   icon: "◈",  color: "#e535ab" },
  { id: "grpc",      label: "gRPC",      icon: "⚙",  color: "#10b981" },
  { id: "websocket", label: "WebSocket", icon: "⟷",  color: "#f59e0b" },
  { id: "soap",      label: "SOAP",      icon: "☁",  color: "#8b5cf6" },
];

const CONCEPTS = {
  rest: "REST uses HTTP methods (GET, POST, PUT, DELETE) on resource URLs. Stateless — every request is self-contained. Most common API style on the web.",
  graphql: "GraphQL lets clients ask for exactly the data they need. One endpoint, query language shapes the response. Eliminates over-fetching and under-fetching.",
  grpc: "gRPC uses Protocol Buffers (binary) over HTTP/2. ~10x smaller payloads than JSON. Built for high-performance microservice communication.",
  websocket: "WebSocket keeps a persistent two-way connection open. Unlike REST, the server can push data anytime. Perfect for real-time apps.",
  soap: "SOAP wraps messages in XML envelopes. Strict contract-based (WSDL). Built-in standards for security and transactions. Common in banking and enterprise.",
};

/* ─────────────────────────────────────────
   SYNTAX HIGHLIGHTER
───────────────────────────────────────── */
function highlight(text) {
  if (!text) return "";
  return text
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="hl-str">$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span class="hl-kw">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-num">$1</span>')
    .replace(/(\{|\}|\[|\])/g, '<span class="hl-brk">$1</span>');
}

/* ─────────────────────────────────────────
   REST PANEL
───────────────────────────────────────── */
const REST_PRESETS = [
  { label: "GET post",    method: "GET",    url: "https://jsonplaceholder.typicode.com/posts/1",  body: "" },
  { label: "GET users",   method: "GET",    url: "https://jsonplaceholder.typicode.com/users/1",  body: "" },
  { label: "POST create", method: "POST",   url: "https://jsonplaceholder.typicode.com/posts",    body: JSON.stringify({ title: "API Lab", body: "Testing REST", userId: 1 }, null, 2) },
  { label: "DELETE",      method: "DELETE", url: "https://jsonplaceholder.typicode.com/posts/1",  body: "" },
];

function RestPanel() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [timing, setTiming] = useState(null);

  const send = async () => {
    setLoading(true); setResponse(null); setStatusCode(null); setTiming(null);
    const t0 = Date.now();
    try {
      const opts = { method, headers: { "Content-Type": "application/json" } };
      if (["POST","PUT","PATCH"].includes(method) && body) opts.body = body;
      const r = await fetch(url, opts);
      const ms = Date.now() - t0;
      const data = await r.json();
      setResponse(JSON.stringify(data, null, 2));
      setStatusCode(r.status);
      setTiming(ms);
    } catch (e) {
      setResponse("Error: " + e.message);
      setStatusCode(0);
      setTiming(Date.now() - t0);
    }
    setLoading(false);
  };

  return (
    <div className={style.panel_body}>
      <div className={style.preset_row}>
        {REST_PRESETS.map((p) => (
          <button key={p.label} className={style.preset_btn}
            onClick={() => { setMethod(p.method); setUrl(p.url); setBody(p.body); }}>
            {p.label}
          </button>
        ))}
      </div>
      <div className={style.request_row}>
        <select className={style.method_select} value={method} onChange={e => setMethod(e.target.value)}>
          {["GET","POST","PUT","PATCH","DELETE"].map(m => <option key={m}>{m}</option>)}
        </select>
        <input className={style.url_input} value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
        <button className={style.send_btn} onClick={send} disabled={loading}>
          {loading ? "..." : "Send ▶"}
        </button>
      </div>
      {["POST","PUT","PATCH"].includes(method) && (
        <textarea className={style.body_input} value={body} onChange={e => setBody(e.target.value)} placeholder="Request body (JSON)" rows={4} />
      )}
      <ResponseBox response={response} statusCode={statusCode} timing={timing} loading={loading} />
    </div>
  );
}

/* ─────────────────────────────────────────
   GRAPHQL PANEL
───────────────────────────────────────── */
const GQL_PRESETS = {
  country: `query {\n  country(code: "US") {\n    name\n    capital\n    currency\n    languages { name }\n  }\n}`,
  eu: `query {\n  countries(filter: { continent: { eq: "EU" } }) {\n    name\n    capital\n  }\n}`,
};

function GraphQLPanel() {
  const [query, setQuery] = useState(GQL_PRESETS.country);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [timing, setTiming] = useState(null);

  const run = async () => {
    setLoading(true); setResponse(null); setStatusCode(null); setTiming(null);
    const t0 = Date.now();
    try {
      const r = await fetch("https://countries.trevorblades.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const ms = Date.now() - t0;
      const data = await r.json();
      setResponse(JSON.stringify(data, null, 2));
      setStatusCode(data.errors ? 400 : 200);
      setTiming(ms);
    } catch (e) {
      setResponse("Error: " + e.message); setStatusCode(0); setTiming(Date.now() - t0);
    }
    setLoading(false);
  };

  return (
    <div className={style.panel_body}>
      <div className={style.preset_row}>
        <button className={style.preset_btn} onClick={() => setQuery(GQL_PRESETS.country)}>Country (US)</button>
        <button className={style.preset_btn} onClick={() => setQuery(GQL_PRESETS.eu)}>EU Countries</button>
        <span className={style.endpoint_hint}>→ countries.trevorblades.com/graphql</span>
      </div>
      <div className={style.gql_layout}>
        <div className={style.col}>
          <div className={style.col_label}>Query — ask for exactly this</div>
          <textarea className={style.gql_editor} value={query} onChange={e => setQuery(e.target.value)} rows={10} spellCheck={false} />
          <button className={style.send_btn} onClick={run} disabled={loading} style={{marginTop:"8px",width:"100%"}}>
            {loading ? "Running..." : "▶ Run Query"}
          </button>
        </div>
        <div className={style.col}>
          <div className={style.col_label}>Response — only what you asked</div>
          <ResponseBox response={response} statusCode={statusCode} timing={timing} loading={loading} inline />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   gRPC PANEL
───────────────────────────────────────── */
function GRPCPanel() {
  const [mode, setMode] = useState("unary");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);

  const PROTO = `service PostService {
  // Unary: one request → one response
  rpc GetPost(PostRequest) returns (Post);

  // Server streaming: one request → many
  rpc ListPosts(ListReq) returns (stream Post);
}

message PostRequest { int32 id = 1; }
message ListReq     { int32 limit = 1; }
message Post {
  int32  id     = 1;
  string title  = 2;
  string body   = 3;
  int32  userId = 4;
}`;

  const call = async () => {
    setLoading(true); setResponse(""); setStatusCode(null);
    if (mode === "unary") {
      try {
        const d = await (await fetch("https://jsonplaceholder.typicode.com/posts/1")).json();
        setResponse("// Unary — one request, one response\n\nPostResponse {\n  id:     " + d.id + "\n  userId: " + d.userId + "\n  title:  \"" + d.title + "\"\n  body:   \"" + d.body.slice(0,60) + "...\"\n}\n\n// Real gRPC sends this as binary\n// Protocol Buffers — ~10x smaller than JSON");
        setStatusCode(200);
      } catch (e) { setResponse("Error: " + e.message); setStatusCode(0); }
      setLoading(false);
    } else {
      setResponse("// Server streaming — server sends 5 responses\n// for a single client request...\n\n");
      setStatusCode(200);
      for (let i = 1; i <= 5; i++) {
        await new Promise(r => setTimeout(r, 600));
        try {
          const d = await (await fetch("https://jsonplaceholder.typicode.com/posts/" + i)).json();
          setResponse(prev => prev + "Post { id: " + d.id + ", title: \"" + d.title.slice(0,40) + "...\" }\n");
        } catch(e) {}
      }
      setResponse(prev => prev + "\n// Stream complete");
      setLoading(false);
    }
  };

  return (
    <div className={style.panel_body}>
      <div className={style.preset_row}>
        <button className={style.preset_btn + (mode==="unary"?" "+style.preset_active:"")} onClick={()=>setMode("unary")}>Unary call</button>
        <button className={style.preset_btn + (mode==="stream"?" "+style.preset_active:"")} onClick={()=>setMode("stream")}>Server streaming</button>
        <button className={style.send_btn} onClick={call} disabled={loading}>{loading?"Calling...":"▶ Call RPC"}</button>
      </div>
      <div className={style.gql_layout}>
        <div className={style.col}>
          <div className={style.col_label}>Proto definition (schema)</div>
          <pre className={style.proto_box}>{PROTO}</pre>
        </div>
        <div className={style.col}>
          <div className={style.col_label}>RPC result</div>
          <ResponseBox response={response} statusCode={statusCode} loading={loading && mode==="unary"} inline noStatus={mode==="stream"} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   WEBSOCKET PANEL
───────────────────────────────────────── */
function WebSocketPanel() {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => { return () => { if (ws) ws.close(); }; }, [ws]);

  const log = (text, type) => setMessages(prev => [...prev, { text, type, id: Date.now() + Math.random() }]);

  const toggle = () => {
    if (ws && ws.readyState <= 1) { ws.close(); return; }
    log("Connecting to wss://echo.websocket.org...", "sys");
    const sock = new WebSocket("wss://echo.websocket.org");
    sock.onopen    = () => { log("Connected! Server echoes back what you send.", "sys"); setConnected(true); };
    sock.onmessage = e => log(e.data, "in");
    sock.onclose   = () => { log("Disconnected.", "sys"); setConnected(false); setWs(null); };
    sock.onerror   = () => log("Connection error — echo server may be temporarily down.", "sys");
    setWs(sock);
  };

  const send = () => {
    if (!input.trim() || !ws) return;
    ws.send(input); log(input, "out"); setInput("");
  };

  return (
    <div className={style.panel_body}>
      <div className={style.ws_status_row}>
        <span className={style.ws_indicator + " " + (connected ? style.ws_on : style.ws_off)} />
        <span className={style.ws_status_text}>{connected ? "Connected" : "Disconnected"}</span>
        <button className={style.send_btn} onClick={toggle}>{connected ? "✕ Disconnect" : "⟷ Connect"}</button>
      </div>
      <div className={style.ws_log} ref={logRef}>
        {messages.length === 0 && <div className={style.ws_empty}>Click Connect to open a live WebSocket connection</div>}
        {messages.map(m => (
          <div key={m.id} className={style["ws_" + m.type]}>
            {m.type === "out" ? "→ You: " : m.type === "in" ? "← Server: " : ""}{m.text}
          </div>
        ))}
      </div>
      <div className={style.ws_input_row}>
        <input
          className={style.url_input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Type a message and press Enter..."
          disabled={!connected}
        />
        <button className={style.send_btn} onClick={send} disabled={!connected}>Send</button>
      </div>
      <p className={style.endpoint_hint} style={{marginTop:"8px"}}>Uses wss://echo.websocket.org — server echoes back everything in real time</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   SOAP PANEL
───────────────────────────────────────── */
function SOAPPanel() {
  const [op, setOp] = useState("c2f");
  const [val, setVal] = useState("100");
  const [reqXml, setReqXml] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [timing, setTiming] = useState(null);

  const call = async () => {
    setLoading(true); setResponse(null); setStatusCode(null); setTiming(null);
    const isCF = op === "c2f";
    const action = isCF ? "CelsiusToFahrenheit" : "FahrenheitToCelsius";
    const param  = isCF ? "Celsius" : "Fahrenheit";
    const num    = parseFloat(val) || 0;
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:tns="https://www.w3schools.com/xml/">
  <soap:Header/>
  <soap:Body>
    <tns:${action}>
      <tns:${param}>${num}</tns:${param}>
    </tns:${action}>
  </soap:Body>
</soap:Envelope>`;
    setReqXml(xml);
    const t0 = Date.now();
    try {
      const r = await fetch("https://www.w3schools.com/xml/tempconvert.asmx", {
        method: "POST",
        headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: `"https://www.w3schools.com/xml/${action}"` },
        body: xml,
      });
      const ms = Date.now() - t0;
      const text = await r.text();
      setResponse(text.replace(/></g, ">\n<").replace(/^\s*\n/gm, ""));
      setStatusCode(r.status); setTiming(ms);
    } catch (e) {
      const result = isCF ? (num * 9/5 + 32).toFixed(2) : ((num - 32) * 5/9).toFixed(2);
      setResponse(`CORS blocked (browsers block direct SOAP — expected).\nIn production SOAP is called server-side.\n\nSimulated: ${num}${isCF?"°C = "+result+"°F":"°F = "+result+"°C"}`);
      setStatusCode("CORS"); setTiming(Date.now() - t0);
    }
    setLoading(false);
  };

  return (
    <div className={style.panel_body}>
      <div className={style.preset_row}>
        <select className={style.method_select} value={op} onChange={e => setOp(e.target.value)}>
          <option value="c2f">Celsius → Fahrenheit</option>
          <option value="f2c">Fahrenheit → Celsius</option>
        </select>
        <input className={style.url_input} value={val} onChange={e => setVal(e.target.value)} style={{maxWidth:"90px"}} />
        <button className={style.send_btn} onClick={call} disabled={loading}>{loading ? "..." : "▶ Call"}</button>
      </div>
      <div className={style.gql_layout}>
        <div className={style.col}>
          <div className={style.col_label}>SOAP XML Envelope (request)</div>
          <pre className={style.proto_box}>{reqXml || "Click Call to see the XML envelope"}</pre>
        </div>
        <div className={style.col}>
          <div className={style.col_label}>XML Response</div>
          <ResponseBox response={response} statusCode={statusCode} timing={timing} loading={loading} inline />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SHARED RESPONSE BOX
───────────────────────────────────────── */
function ResponseBox({ response, statusCode, timing, loading, inline, noStatus }) {
  const statusColor = !statusCode ? "" : statusCode === 200 || statusCode === 201 ? style.ok : statusCode === "CORS" ? style.warn : style.err;

  return (
    <div className={style.response_wrap + (inline ? " " + style.response_inline : "")}>
      {!noStatus && (statusCode !== null || timing !== null) && (
        <div className={style.response_meta}>
          {statusCode !== null && <span className={style.status_badge + " " + statusColor}>{statusCode}</span>}
          {timing !== null && <span className={style.timing}>{timing}ms</span>}
        </div>
      )}
      <div
        className={style.response_code + (loading ? " " + style.loading : "")}
        dangerouslySetInnerHTML={{ __html: loading ? "Loading..." : response ? highlight(response) : "— response will appear here —" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function APILab() {
  const [active, setActive] = useState("rest");
  const activeTab = TABS.find(t => t.id === active);

  return (
    <>
      <motion.h1 variants={textVariant()} className={style.title}>
        API Lab
      </motion.h1>
      <motion.p variants={fadeIn("","",0.1,0.5)} className={style.subtitle}>
        Live interactive playground — try all 5 API types with real endpoints
      </motion.p>

      {/* Tab bar */}
      <motion.div variants={fadeIn("","",0.15,0.5)} className={style.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={style.tab + (active === tab.id ? " " + style.tab_active : "")}
            style={active === tab.id ? { borderColor: tab.color, color: tab.color, boxShadow: "0 0 12px " + tab.color + "33" } : {}}
            onClick={() => setActive(tab.id)}
          >
            <span className={style.tab_icon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Main panel */}
      <motion.div
        variants={fadeIn("up","",0.2,0.5)}
        className={style.lab_card}
        style={{ "--accent": activeTab.color }}
      >
        {/* Card top bar */}
        <div className={style.card_topbar}>
          <div className={style.terminal_dots}>
            <span className={style.dot_r}/><span className={style.dot_y}/><span className={style.dot_g}/>
          </div>
          <span className={style.card_title}>
            <span style={{color: activeTab.color}}>{activeTab.icon} {activeTab.label}</span>
            &nbsp;— API Lab
          </span>
          <span />
        </div>

        {/* Concept banner */}
        <div className={style.concept_banner} style={{ borderLeftColor: activeTab.color }}>
          <span className={style.concept_label} style={{ color: activeTab.color }}>CONCEPT</span>
          <span className={style.concept_text}>{CONCEPTS[active]}</span>
        </div>

        {/* Panel content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {active === "rest"      && <RestPanel />}
            {active === "graphql"   && <GraphQLPanel />}
            {active === "grpc"      && <GRPCPanel />}
            {active === "websocket" && <WebSocketPanel />}
            {active === "soap"      && <SOAPPanel />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default SectionWrapper(APILab, "apilab", "");
