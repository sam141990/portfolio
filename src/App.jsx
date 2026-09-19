import React, { useState, useEffect, useRef, useCallback } from "react";

/* ────────────────────────────────────────────────────────────
   Content. Everything the page renders lives here, so editing
   the site never means touching layout code.
   ──────────────────────────────────────────────────────────── */

const PROFILE = {
  name: "Samuel Ashenafi Gizaw",
  roles: [
    "Software Engineer",
    "AI/ML Engineer",
    "LLM Evaluation",
    "Cybersecurity",
  ],
  location: "Addis Ababa, Ethiopia",
  email: "samuelahsenafi1990@gmail.com",
  phone: "+251 979 099 687",
  github: "https://github.com/sam141990",
  githubLabel: "github.com/sam141990",
  linkedin: "https://linkedin.com/in/samuel-ashenafi-241395231",
  linkedinLabel: "linkedin.com/in/samuel-ashenafi-241395231",
};

const BOOT = [
  {
    cmd: "whoami",
    out: [{ t: "samuel ashenafi gizaw", c: "term-out" }],
  },
  {
    cmd: "cat ~/focus.txt",
    out: [
      {
        t: "evaluating AI coding agents · writing engineering benchmarks · backend systems",
        c: "term-muted",
      },
    ],
  },
  {
    cmd: "stack --top",
    out: [
      { t: "python  typescript  java  pytorch  postgres  docker", c: "term-key" },
    ],
  },
  {
    cmd: "locate me",
    out: [{ t: "addis ababa, ethiopia — remote-friendly", c: "term-muted" }],
  },
];

const ABOUT = [
  "I'm a software engineer with experience across AI/ML, backend development, LLM evaluation and cybersecurity. I tend to gravitate toward problems that need careful thinking — not just getting something to work, but understanding why it works and where it could break.",
  "Lately most of my time has gone into evaluating AI coding agents: writing realistic engineering benchmarks and testing how models handle real software challenges like debugging, architecture decisions, security issues and command-line tasks.",
];

const TRAITS = [
  "Picks up unfamiliar systems quickly and works through them independently.",
  "Comfortable in remote setups, used to owning a workload without much hand-holding.",
  "Cares about clear communication — in code, in documentation, and when explaining a technical decision to someone non-technical.",
];

const JOBS = [
  {
    title: "AI Behavioral Evaluator | Prompt Engineer",
    org: "Revelo",
    when: "2025 — Present",
    where: "Remote",
    bullets: [
      "Reviewed AI-generated solutions to architecture and system design problems, checking whether the proposed approaches were practical, consistent and actually usable in production.",
      "Identified behavioral issues in model outputs — hallucinated APIs, unnecessary complexity, poor instruction-following, reasoning gaps — and documented them in a structured format.",
      "Wrote engineering prompts around distributed systems, async workflows, failure recovery and debugging that were realistic enough to meaningfully stress-test model reasoning.",
      "Rewrote and refined prompts for AI training datasets, keeping the intent intact while the phrasing became cleaner and more natural.",
      "Worked through SWE-bench-style scenarios covering debugging, implementation, code review and testing across different software projects.",
      "Helped with security evaluation tasks involving vulnerability discovery, fuzzing, crash triage and secure software analysis.",
    ],
  },
  {
    title: "Software Engineer",
    org: "Microlink Technologies",
    when: "2020 — Present",
    where: "Full-time",
    bullets: [
      "Developed and maintained backend and full-stack systems using Java, Spring Boot, Node.js, React, TypeScript, REST APIs, and both SQL and NoSQL databases.",
      "Involved across the whole development process — early design and data modeling through implementation, testing, bug fixing and deployment.",
      "Worked on internal platforms for business operations, contributing to architectural decisions and taking ownership of features end to end.",
      "Collaborated with cross-functional teams to ship reliable software on schedule, picking up code reviews and mentoring junior developers along the way.",
    ],
  },
];

const WORK = [
  {
    name: "AI Coding-Agent Evaluation",
    tags: "behavioral analysis · architecture review · structured coding",
    desc: "Reviewed AI coding agents on architecture, reasoning and behavioral quality. Focused on outputs that were misleading, overly broad or not thought through, and documented issues using a structured behavioral coding system.",
  },
  {
    name: "SWE-bench Evaluation",
    tags: "benchmark design · debugging · code review · testing",
    desc: "Designed and worked through realistic software engineering scenarios to measure how well AI systems handle practical dev work.",
  },
  {
    name: "Security-Focused Evaluation",
    tags: "vulnerability research · fuzzing · crash triage",
    desc: "Supported benchmark tasks involving vulnerability research, fuzzing, crash triage and secure software practices for AI evaluation projects.",
  },
  {
    name: "ML & Data Projects",
    tags: "numpy · pandas · scikit-learn · pytorch · tensorflow · jax",
    desc: "Data analysis, experimentation and model-related work using Python and the common ML and data tooling.",
  },
];

/* Self-reported emphasis — how the working week actually splits.
   Edit these numbers freely; they are a claim about focus, not a score. */
const FOCUS = [
  { name: "LLM evaluation & benchmark design", value: 32 },
  { name: "Backend & full-stack engineering", value: 28 },
  { name: "ML / data experimentation", value: 18 },
  { name: "Security & vulnerability work", value: 12 },
  { name: "Review, docs & mentoring", value: 10 },
];

const RADAR = [
  { axis: "AI / ML", value: 0.82 },
  { axis: "LLM eval", value: 0.95 },
  { axis: "Backend", value: 0.9 },
  { axis: "Frontend", value: 0.7 },
  { axis: "Security", value: 0.68 },
  { axis: "Data", value: 0.78 },
];

const STACK = [
  {
    key: "programming",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C++", "SQL", "Bash"],
  },
  {
    key: "ai_ml",
    items: [
      "Machine Learning",
      "Deep Learning",
      "LLMs",
      "NLP",
      "PyTorch",
      "TensorFlow",
      "NumPy",
      "Pandas",
    ],
  },
  {
    key: "llm_eval",
    items: [
      "Prompt Engineering",
      "Behavioral Analysis",
      "Benchmark Design",
      "AI Data Quality",
      "Model Evaluation",
    ],
  },
  {
    key: "software",
    items: [
      "React",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Git",
      "Linux",
    ],
  },
  {
    key: "security",
    items: [
      "Vulnerability Research",
      "Security Testing",
      "Crash Analysis",
      "Secure Coding",
      "C / C++ / Rust / Go",
    ],
  },
];

const SECTIONS = [
  { id: "about", file: "about", ext: ".md", label: "about.md" },
  { id: "experience", file: "experience", ext: ".log", label: "experience.log" },
  { id: "work", file: "selected-work", ext: ".json", label: "selected-work.json" },
  { id: "skills", file: "skills", ext: ".yaml", label: "skills.yaml" },
  { id: "education", file: "education", ext: ".md", label: "education.md" },
  { id: "contact", file: "contact", ext: ".sh", label: "contact.sh" },
];

/* ────────────────────────────────────────────────────────────
   Hooks
   ──────────────────────────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);
  return reduced;
}

/* Reveals once, when the element first scrolls into view. */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ────────────────────────────────────────────────────────────
   Hero terminal — one orchestrated boot sequence on load.
   ──────────────────────────────────────────────────────────── */

function BootTerminal({ reduced }) {
  const [step, setStep] = useState(0); // which command we're on
  const [typed, setTyped] = useState(""); // chars typed of current command
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setStep(BOOT.length);
      setDone(true);
      return;
    }
    let cancelled = false;
    let i = 0;
    let char = 0;
    let timer;

    const tick = () => {
      if (cancelled) return;
      if (i >= BOOT.length) {
        setDone(true);
        return;
      }
      const cmd = BOOT[i].cmd;
      if (char < cmd.length) {
        char += 1;
        setTyped(cmd.slice(0, char));
        timer = setTimeout(tick, 34 + Math.random() * 34);
      } else {
        i += 1;
        char = 0;
        setStep(i);
        setTyped("");
        timer = setTimeout(tick, 480);
      }
    };

    timer = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduced]);

  const finished = BOOT.slice(0, step);

  return (
    <div className="term" aria-label="Terminal introduction">
      <div className="term-bar">
        <span className="dot dot-1" />
        <span className="dot" />
        <span className="dot" />
        <span className="term-title">samuel@portfolio — zsh</span>
      </div>
      <div className="term-body">
        {finished.map((entry, idx) => (
          <div key={idx}>
            <div className="term-line">
              <span className="prompt">$ </span>
              <span className="term-out">{entry.cmd}</span>
            </div>
            {entry.out.map((o, j) => (
              <div className={"term-line " + o.c} key={j}>
                {o.t}
              </div>
            ))}
          </div>
        ))}
        {!done && (
          <div className="term-line">
            <span className="prompt">$ </span>
            <span className="term-out">{typed}</span>
            <span className="caret" />
          </div>
        )}
        {done && (
          <div className="term-line">
            <span className="prompt">$ </span>
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Metrics
   ──────────────────────────────────────────────────────────── */

function FocusMeters() {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref}>
      {FOCUS.map((f) => (
        <div className="meter" key={f.name}>
          <div className="meter-head">
            <span className="meter-name">{f.name}</span>
            <span className="meter-val">{f.value}%</span>
          </div>
          <div
            className="meter-track"
            role="img"
            aria-label={f.name + ": " + f.value + " percent of focus"}
          >
            <div
              className="meter-fill"
              style={{ width: shown ? f.value * 2.6 + "%" : 0 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Radar() {
  const [ref, shown] = useReveal();
  const size = 260;
  const c = size / 2;
  const r = size / 2 - 42;

  const pt = (i, radius) => {
    const a = (Math.PI * 2 * i) / RADAR.length - Math.PI / 2;
    return [c + Math.cos(a) * radius, c + Math.sin(a) * radius];
  };

  const rings = [0.25, 0.5, 0.75, 1].map((f) =>
    RADAR.map((_, i) => pt(i, r * f).join(",")).join(" ")
  );

  const shape = RADAR.map((d, i) => pt(i, r * d.value).join(",")).join(" ");

  return (
    <div className="radar-wrap" ref={ref}>
      <svg
        className="radar"
        viewBox={"0 0 " + size + " " + size}
        role="img"
        aria-label="Domain coverage across AI/ML, LLM evaluation, backend, frontend, security and data"
      >
        {rings.map((p, i) => (
          <polygon key={i} className="radar-grid" points={p} />
        ))}
        {RADAR.map((d, i) => {
          const [x, y] = pt(i, r);
          return <line key={d.axis} className="radar-spoke" x1={c} y1={c} x2={x} y2={y} />;
        })}
        <polygon
          className="radar-poly"
          points={shape}
          style={{ transform: shown ? "scale(1)" : "scale(0.05)", opacity: shown ? 1 : 0 }}
        />
        {shown &&
          RADAR.map((d, i) => {
            const [x, y] = pt(i, r * d.value);
            return <circle key={d.axis} className="radar-dot" cx={x} cy={y} r="2.4" />;
          })}
        {RADAR.map((d, i) => {
          const [x, y] = pt(i, r + 18);
          const anchor = x > c + 4 ? "start" : x < c - 4 ? "end" : "middle";
          return (
            <text
              key={d.axis}
              className="radar-label"
              x={x}
              y={y + 3}
              textAnchor={anchor}
            >
              {d.axis}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Layout helpers
   ──────────────────────────────────────────────────────────── */

function Row({ n, children, wide }) {
  return (
    <div className="row">
      <div className="ln" aria-hidden="true">
        {n}
      </div>
      <div className={wide ? "body body-wide" : "body"}>{children}</div>
    </div>
  );
}

function SectionHead({ id, n, title, note }) {
  return (
    <div className="section-head row" id={id}>
      <div className="ln" aria-hidden="true">
        {n}
      </div>
      <div className="body body-wide">
        <h2 className="heading">{title}</h2>
        {note && <p className="section-note">{note}</p>}
      </div>
    </div>
  );
}

function CopyField({ label, value, href }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
        () => setCopied(false)
      );
    }
  };
  return (
    <div className="contact-card">
      <p className="contact-k">{label}</p>
      <p className="contact-v">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
      </p>
      <button className="copy-btn" onClick={copy}>
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   App
   ──────────────────────────────────────────────────────────── */

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState("about");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      setActive(id);
    },
    [reduced]
  );

  const activeLabel =
    (SECTIONS.find((s) => s.id === active) || SECTIONS[0]).label;

  return (
    <div className="shell">
      <aside className="rail">
        <div className="rail-head">
          <p className="rail-name">samuel ashenafi gizaw</p>
          <p className="rail-sub">software · ai/ml · llm eval</p>
        </div>
        <nav className="tree" aria-label="Sections">
          <p className="tree-label">~/samuel</p>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className="tree-item"
              aria-current={active === s.id}
              onClick={() => go(s.id)}
            >
              <span>
                {s.file}
                <span className="tree-ext">{s.ext}</span>
              </span>
            </button>
          ))}
        </nav>
        <div className="rail-foot">
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href={"mailto:" + PROFILE.email}>email</a>
        </div>
      </aside>

      <main className="pane">
        <div className="tabbar" role="tablist" aria-label="Open files">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className="tab"
              role="tab"
              aria-current={active === s.id}
              onClick={() => go(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="doc">
          {/* hero */}
          <section className="hero row" aria-label="Introduction">
            <div className="ln" aria-hidden="true">
              1
            </div>
            <div className="body body-wide">
              <h1 className="hero-name">Samuel Ashenafi Gizaw</h1>
              <p className="hero-meta">
                {PROFILE.roles.join("  /  ")}
              </p>
              <BootTerminal reduced={reduced} />
              <div className="cta-row">
                <button className="cta cta-primary" onClick={() => go("work")}>
                  see selected work
                </button>
                <button className="cta" onClick={() => go("contact")}>
                  get in touch
                </button>
              </div>
            </div>
          </section>

          {/* about */}
          <SectionHead id="about" n="12" title="about" />
          <section aria-labelledby="about">
            <Row n="13" wide>
              {ABOUT.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <ul className="bullets" style={{ marginTop: "1.1rem" }}>
                {TRAITS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Row>
          </section>

          {/* experience */}
          <SectionHead id="experience" n="24" title="experience" />
          <section aria-labelledby="experience">
            <Row n="25" wide>
              {JOBS.map((job) => (
                <article className="job" key={job.org}>
                  <div className="job-head">
                    <h3 className="job-title">
                      {job.title} <span className="job-org">@ {job.org}</span>
                    </h3>
                    <span className="job-when">{job.when}</span>
                  </div>
                  <p className="job-where">{job.where}</p>
                  <ul className="bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </Row>
          </section>

          {/* work */}
          <SectionHead id="work" n="48" title="selected work" />
          <section aria-labelledby="work">
            <Row n="49" wide>
              <div className="work-list">
                {WORK.map((w) => (
                  <article className="work" key={w.name}>
                    <div>
                      <h3 className="work-name">{w.name}</h3>
                      <p className="work-tags">{w.tags}</p>
                    </div>
                    <p className="work-desc">{w.desc}</p>
                  </article>
                ))}
              </div>
            </Row>
          </section>

          {/* skills */}
          <SectionHead
            id="skills"
            n="63"
            title="skills"
            note="focus split is self-reported — a claim about where the week goes, not a score"
          />
          <section aria-labelledby="skills">
            <Row n="64" wide>
              <div className="telemetry">
                <FocusMeters />
                <Radar />
              </div>
              <div className="stack">
                {STACK.map((s) => (
                  <div className="stack-row" key={s.key}>
                    <span className="stack-key">{s.key}:</span>
                    <div className="chips">
                      {s.items.map((i) => (
                        <span className="chip" key={i}>
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          </section>

          {/* education */}
          <SectionHead id="education" n="88" title="education & languages" />
          <section aria-labelledby="education">
            <Row n="89" wide>
              <div className="kv">
                <span className="kv-key">degree</span>
                <span className="kv-val">BSc in Software Engineering</span>
              </div>
              <div className="kv">
                <span className="kv-key">university</span>
                <span className="kv-val">Bahir Dar University</span>
              </div>
              <div className="kv">
                <span className="kv-key">graduated</span>
                <span className="kv-val">2024</span>
              </div>
              <div className="kv">
                <span className="kv-key">languages</span>
                <span className="kv-val">
                  Amharic (native) · English (working proficiency)
                </span>
              </div>
            </Row>
          </section>

          {/* contact */}
          <SectionHead
            id="contact"
            n="97"
            title="contact"
            note="fastest route is email"
          />
          <section aria-labelledby="contact">
            <Row n="98" wide>
              <div className="contact-grid">
                <CopyField
                  label="email"
                  value={PROFILE.email}
                  href={"mailto:" + PROFILE.email}
                />
                <CopyField label="phone" value={PROFILE.phone} />
                <CopyField
                  label="github"
                  value={PROFILE.githubLabel}
                  href={PROFILE.github}
                />
                <CopyField
                  label="linkedin"
                  value={PROFILE.linkedinLabel}
                  href={PROFILE.linkedin}
                />
                <CopyField label="based in" value={PROFILE.location} />
              </div>
            </Row>
          </section>
        </div>
      </main>

      <div className="status">
        <div className="status-left">
          <span className="status-badge">NORMAL</span>
          <span>{activeLabel}</span>
        </div>
        <div className="status-right">
          <span className="status-dim">utf-8</span>
          <span className="status-dim">addis ababa</span>
          <span className="status-dim">remote-friendly</span>
        </div>
      </div>
    </div>
  );
}
