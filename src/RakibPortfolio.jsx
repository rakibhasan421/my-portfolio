import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const data = {
  email: "rakibsobuz@gmail.com",
  phone: "01752709413",
  linkedin: "https://www.linkedin.com/in/rakib-hasan-4a2836185/",
  bio: "Angular specialist with 4+ years building enterprise-grade systems. Experienced in React, Next.js, and real-time frontend architectures. I own my work end-to-end — from requirements analysis to delivery.",
  experiences: [
    {
      role: "Software Engineer", company: "Dohatec New Media",
      location: "Ministry of Planning, Dhaka", period: "Nov 2022 – Present", type: "Full-time",
      desc: "Frontend Developer & Report Designer on e-PMIS, a national-scale Electronic Project Management Information System. Leading the frontend sub-team, implementing WebSocket-based real-time notifications, and building data-rich reports using Bold Report Designer.",
      tags: ["Angular", "PrimeNG", "NgRx", "RxJS", "WebSocket", "Bold Report", "Jira", "Gitlab"],
    },
    {
      role: "Frontend Lead", company: "Fusion Pulse Tech",
      location: "Remote", period: "Mar 2024 – Mar 2025", type: "Part-time",
      desc: "Led frontend development of a full e-Commerce platform using Next.js. Managed client communication, business analysis, and technical documentation — bridging product and engineering perfectly.",
      tags: ["Next.js", "React", "TypeScript", "Tech Lead", "Business Analysis"],
    },
    {
      role: "Software Engineer", company: "Mangrove Systems Bangladesh",
      location: "Mirpur DOHS, Dhaka", period: "Nov 2021 – Nov 2022", type: "Full-time",
      desc: "Built DX-R, a Japanese waste management system. Responsible for frontend development with Angular, Angular Material, business analysis, technical documentation, and BIRT-based report design.",
      tags: ["Angular", "Angular Material", "Flex Layout", "BIRT", "Git"],
    },
  ],
  skills: [
    { name: "Angular", icon: "⬡", level: 95 },
    { name: "Angular Material", icon: "◈", level: 92 },
    { name: "PrimeNG", icon: "◉", level: 88 },
    { name: "NgRx / RxJS", icon: "⟲", level: 85 },
    { name: "TypeScript", icon: "◆", level: 90 },
    { name: "JavaScript", icon: "◇", level: 92 },
    { name: "React", icon: "◎", level: 78 },
    { name: "Next.js", icon: "▲", level: 75 },
    { name: "WebSocket", icon: "⟷", level: 80 },
    { name: "Bold Report", icon: "◫", level: 82 },
    { name: "Git / Gitlab", icon: "⎇", level: 88 },
    { name: "Rx Web Validator", icon: "✓", level: 80 },
  ],
  education: [
    { degree: "M.Sc. in ICT", school: "Islamic University, Kushtia", year: "2019", score: "CGPA 3.28" },
    { degree: "B.Sc. in ICT", school: "Islamic University, Kushtia", year: "2018", score: "CGPA 3.45" },
    { degree: "HSC", school: "Holy Flower Model College, Dhaka", year: "2014", score: "GPA 5.00" },
    { degree: "SSC", school: "Bhatpara Secondary School, Meherpur", year: "2012", score: "GPA 5.00" },
  ],
};

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

/* ─── ANIMATED WRAPPER ──────────────────────────────────────── */
function Fade({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ─── SHARED STYLES ──────────────────────────────────────────── */
const tagStyle = {
  fontSize: "0.7rem", background: "#f5f1eb",
  border: "1px solid #e5ded4", color: "#5a5550",
  padding: "0.28rem 0.7rem", borderRadius: 4,
  fontFamily: "'DM Sans',sans-serif", fontWeight: 500,
};

/* ─── SECTION HEADER ─────────────────────────────────────────── */
function SectionHeader({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "3rem" }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "#2d6a4f", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>{num} /</span>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>{title}</h2>
    </div>
  );
}

/* ─── NAV ───────────────────────────────────────────────────── */
function Nav({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const links = ["about", "experience", "skills", "education", "contact"];
  const labels = { about: "About", experience: "Experience", skills: "Skills", education: "Education", contact: "Contact" };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        background: "rgba(252,250,247,0.93)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid #e5ded4",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "0 1.2rem" : "0 3rem", height: 60,
      }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", color: "#1a1a1a" }}>
          Rakib Hasan
        </span>

        {isMobile ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "0.5rem", display: "flex", flexDirection: "column",
            justifyContent: "center", gap: 5, width: 32, height: 32,
          }}>
            <span style={{ display: "block", width: 22, height: 2, background: "#2d6a4f", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#2d6a4f", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#2d6a4f", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: "0.2rem" }}>
            {links.map(l => (
              <a key={l} href={`#${l}`} onClick={e => scrollTo(e, l)} style={{
                textDecoration: "none", padding: "0.38rem 0.85rem", borderRadius: 20,
                fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase",
                color: active === l ? "#fff" : "#666",
                background: active === l ? "#2d6a4f" : "transparent",
                transition: "all 0.25s", cursor: "pointer",
              }}>{labels[l]}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile Drawer */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 299,
          background: "rgba(252,250,247,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid #e5ded4",
          display: "flex", flexDirection: "column",
          maxHeight: menuOpen ? 320 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l}`} onClick={e => scrollTo(e, l)} style={{
              textDecoration: "none", padding: "1rem 1.5rem",
              fontSize: "0.95rem", fontWeight: active === l ? 600 : 400,
              color: active === l ? "#2d6a4f" : "#444",
              borderLeft: active === l ? "3px solid #2d6a4f" : "3px solid transparent",
              background: active === l ? "rgba(45,106,79,0.05)" : "transparent",
              transition: "all 0.2s", display: "block",
            }}>{labels[l]}</a>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────────── */
function Hero() {
  const isMobile = useIsMobile();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => c < 4 ? c + 1 : c), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="about" style={{
      minHeight: "100vh",
      padding: isMobile ? "7rem 1.4rem 4rem" : "8rem 3rem 5rem",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center",
      background: `
        radial-gradient(ellipse 80% 60% at 70% 20%, rgba(45,106,79,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 10% 80%, rgba(82,183,136,0.08) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 90% 85%, rgba(163,216,180,0.12) 0%, transparent 50%),
        linear-gradient(160deg, #fdfcf9 0%, #f5f0e8 40%, #eef7f2 100%)
      `,
    }}>
      {/* SVG mesh */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g1" cx="75%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#b7e4c7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#b7e4c7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g2" cx="10%" cy="85%" r="35%">
            <stop offset="0%" stopColor="#d4f1e0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4f1e0" stopOpacity="0" />
          </radialGradient>
          <filter id="blur1"><feGaussianBlur stdDeviation="40" /></filter>
        </defs>
        <ellipse cx="900" cy="160" rx="320" ry="240" fill="url(#g1)" filter="url(#blur1)" />
        <ellipse cx="120" cy="680" rx="260" ry="200" fill="url(#g2)" filter="url(#blur1)" />
        <circle cx="600" cy="400" r="1" fill="none" stroke="rgba(45,106,79,0.07)" strokeWidth="160" />
        <circle cx="600" cy="400" r="1" fill="none" stroke="rgba(45,106,79,0.04)" strokeWidth="280" />
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={80 + c * 100} cy={60 + r * 100} r="1.5" fill="rgba(45,106,79,0.10)" />
          ))
        )}
      </svg>

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 260px",
          gap: isMobile ? "2.5rem" : "4rem",
          alignItems: "center",
        }}>
          <div>
            <Fade delay={0}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(45,106,79,0.09)", border: "1px solid rgba(45,106,79,0.22)",
                borderRadius: 20, padding: "0.35rem 1rem",
                fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#2d6a4f", marginBottom: "1.6rem",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#52b788", display: "inline-block", animation: "blink 2s infinite" }} />
                Open to Opportunities ◉ Dhaka ◉ Remote
              </div>
            </Fade>

            <Fade delay={80}>
              <h1 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: isMobile ? "3.2rem" : "clamp(3.5rem,7vw,6rem)",
                fontWeight: 700, lineHeight: 0.95,
                letterSpacing: "-0.03em", color: "#1a1a1a", marginBottom: "1.2rem",
              }}>
                Rakib<br /><span style={{ color: "#2d6a4f" }}>Hasan.</span>
              </h1>
            </Fade>

            <Fade delay={160}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "#6b6560", maxWidth: 480, lineHeight: 1.85, marginBottom: "2.2rem", fontWeight: 300 }}>
                {data.bio}
              </p>
            </Fade>

            <Fade delay={220}>
              <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                <a href={`mailto:${data.email}`}
                  style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#2d6a4f", color:"#fff", padding:"0.72rem 1.6rem", borderRadius:5, textDecoration:"none", fontWeight:600, fontSize:"0.87rem", letterSpacing:"0.02em", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 20px rgba(45,106,79,0.28)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(45,106,79,0.38)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(45,106,79,0.28)"; }}
                >✉ Get in Touch</a>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", border:"1.5px solid #d5cfc7", color:"#3a3530", padding:"0.72rem 1.6rem", borderRadius:5, textDecoration:"none", fontWeight:500, fontSize:"0.87rem", fontFamily:"'DM Sans',sans-serif" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#2d6a4f"; e.currentTarget.style.color="#2d6a4f"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#d5cfc7"; e.currentTarget.style.color="#3a3530"; }}
                >↗ LinkedIn</a>
              </div>
            </Fade>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "1fr", gap: "0.9rem" }}>
            {[
              { num: `${count}+`, label: "Years Experience" },
              { num: "3", label: "Companies" },
              { num: "Angular", label: "Core Expertise" },
              { num: "M.Sc.", label: "ICT Degree" },
            ].map((s, i) => (
              <Fade key={i} delay={100 + i * 60}>
                <div style={{
                  background: "rgba(255,255,255,0.75)", border: "1px solid rgba(229,222,212,0.9)",
                  borderRadius: 10, padding: "1.2rem 1.4rem",
                  boxShadow: "0 4px 20px rgba(45,106,79,0.06)",
                  backdropFilter: "blur(8px)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(45,106,79,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(45,106,79,0.06)"; }}
                >
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", fontWeight: 700, color: "#2d6a4f", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.35rem" }}>{s.label}</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────────── */
function Experience() {
  const [open, setOpen] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="experience" style={{
      padding: isMobile ? "4rem 1.4rem" : "6rem 3rem",
      position: "relative", overflow: "hidden",
      background: `
        radial-gradient(ellipse 50% 60% at 95% 50%, rgba(45,106,79,0.06) 0%, transparent 60%),
        #fcfaf7
      `,
    }}>
      <svg style={{ position: "absolute", top: 0, right: 0, width: 300, height: "100%", pointerEvents: "none", opacity: 0.5 }} viewBox="0 0 300 800" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={20 + i * 48} y1="0" x2={20 + i * 48} y2="800" stroke="rgba(45,106,79,0.07)" strokeWidth="1" strokeDasharray="4 8" />
        ))}
      </svg>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Fade><SectionHeader num="01" title="Experience" /></Fade>

        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {data.experiences.map((exp, i) => (
              <Fade key={i} delay={i * 60}>
                <div style={{ background: "#fff", border: "1px solid #e5ded4", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                    all: "unset", cursor: "pointer", display: "flex", justifyContent: "space-between",
                    alignItems: "center", width: "100%", padding: "1.1rem 1.3rem",
                    background: open === i ? "rgba(45,106,79,0.05)" : "transparent",
                    boxSizing: "border-box",
                  }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", fontWeight: 700, color: "#1a1a1a" }}>{exp.role}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#2d6a4f", marginTop: 2 }}>{exp.company}</div>
                    </div>
                    <span style={{ color: "#2d6a4f", fontWeight: 700, fontSize: "1.4rem", lineHeight: 1, transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                  </button>
                  <div style={{ maxHeight: open === i ? 600 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <div style={{ padding: "0 1.3rem 1.3rem" }}>
                      <div style={{ fontSize: "0.72rem", color: "#999", marginBottom: "0.5rem", fontFamily: "'DM Sans',sans-serif" }}>{exp.period} · {exp.location}</div>
                      <p style={{ color: "#6b6560", fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "1rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>{exp.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {exp.tags.map(t => <span key={t} style={tagStyle}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem" }}>
            <div style={{ borderRight: "1px solid #e5ded4", paddingRight: "1.5rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              {data.experiences.map((exp, i) => (
                <Fade key={i} delay={i * 70}>
                  <button onClick={() => setOpen(i)} style={{
                    all: "unset", cursor: "pointer", display: "block", width: "100%",
                    padding: "0.9rem 1rem", borderRadius: 6, boxSizing: "border-box",
                    background: open === i ? "rgba(45,106,79,0.07)" : "transparent",
                    borderLeft: open === i ? "2.5px solid #2d6a4f" : "2.5px solid transparent",
                    transition: "all 0.2s",
                  }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", fontWeight: 700, color: open === i ? "#2d6a4f" : "#3a3530" }}>{exp.company}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#bbb", marginTop: 3 }}>{exp.period}</div>
                  </button>
                </Fade>
              ))}
            </div>
            <Fade delay={120}>
              <div style={{ paddingTop: "0.3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a1a1a" }}>{data.experiences[open].role}</h3>
                  <span style={{ fontSize: "0.68rem", background: "rgba(45,106,79,0.1)", color: "#2d6a4f", padding: "0.2rem 0.6rem", borderRadius: 20, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>{data.experiences[open].type}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#2d6a4f", marginBottom: "1rem", fontWeight: 500 }}>
                  {data.experiences[open].company} · {data.experiences[open].location}
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#6b6560", lineHeight: 1.85, marginBottom: "1.4rem", fontSize: "0.95rem", fontWeight: 300 }}>
                  {data.experiences[open].desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {data.experiences[open].tags.map(t => <span key={t} style={tagStyle}>{t}</span>)}
                </div>
              </div>
            </Fade>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────── */
function Skills() {
  const isMobile = useIsMobile();
  return (
    <section id="skills" style={{
      padding: isMobile ? "4rem 1.4rem" : "6rem 3rem",
      position: "relative", overflow: "hidden",
      background: `
        radial-gradient(ellipse 70% 50% at 15% 30%, rgba(82,183,136,0.09) 0%, transparent 55%),
        radial-gradient(ellipse 50% 40% at 85% 70%, rgba(45,106,79,0.07) 0%, transparent 50%),
        linear-gradient(180deg, #f5f0e8 0%, #eef7f2 100%)
      `,
    }}>
      <svg style={{ position: "absolute", bottom: 0, left: 0, pointerEvents: "none", opacity: 0.45 }} width="280" height="280" viewBox="0 0 280 280">
        <polygon points="0,280 140,0 280,280" fill="none" stroke="rgba(45,106,79,0.08)" strokeWidth="1" />
        <polygon points="28,280 140,36 252,280" fill="none" stroke="rgba(45,106,79,0.06)" strokeWidth="1" />
      </svg>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Fade><SectionHeader num="02" title="Skills" /></Fade>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(auto-fill,minmax(190px,1fr))", gap: "1rem" }}>
          {data.skills.map((sk, i) => (
            <Fade key={sk.name} delay={i * 45}>
              <div style={{
                background: "rgba(255,255,255,0.8)", border: "1px solid rgba(229,222,212,0.9)",
                borderRadius: 10, padding: "1.3rem",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(45,106,79,0.13)"; e.currentTarget.style.borderColor="rgba(45,106,79,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor="rgba(229,222,212,0.9)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem" }}>
                  <span style={{ fontSize: "1.3rem", color: "#2d6a4f" }}>{sk.icon}</span>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.82rem", color: "#52b788", fontWeight: 700 }}>{sk.level}%</span>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#2a2520", marginBottom: "0.65rem" }}>{sk.name}</div>
                <div style={{ height: 3, background: "#e8e2d9", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${sk.level}%`, background: "linear-gradient(90deg,#2d6a4f,#74c69d)", borderRadius: 2 }} />
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION ──────────────────────────────────────────────── */
function Education() {
  const isMobile = useIsMobile();
  return (
    <section id="education" style={{
      padding: isMobile ? "4rem 1.4rem" : "6rem 3rem",
      position: "relative", overflow: "hidden",
      background: `
        radial-gradient(ellipse 60% 50% at 80% 20%, rgba(163,216,180,0.14) 0%, transparent 55%),
        #fcfaf7
      `,
    }}>
      <svg style={{ position: "absolute", top: "8%", right: "4%", pointerEvents: "none" }} width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="72" fill="none" stroke="rgba(45,106,79,0.07)" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="90" cy="90" r="50" fill="none" stroke="rgba(45,106,79,0.05)" strokeWidth="1" strokeDasharray="4 10" />
      </svg>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Fade><SectionHeader num="03" title="Education" /></Fade>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.1rem" }}>
          {data.education.map((edu, i) => (
            <Fade key={i} delay={i * 70}>
              <div style={{
                background: "rgba(255,255,255,0.82)", border: "1px solid rgba(229,222,212,0.9)",
                borderRadius: 10, padding: "1.8rem",
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
                transition: "transform 0.2s, box-shadow 0.2s",
                gap: "1rem",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(45,106,79,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,0.04)"; }}
              >
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.3rem" }}>{edu.degree}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "#2d6a4f", fontWeight: 500, marginBottom: "0.45rem" }}>{edu.school}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#bbb" }}>{edu.year}</div>
                </div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", fontWeight: 700, color: "#2d6a4f", background: "rgba(45,106,79,0.09)", padding: "0.35rem 0.7rem", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
                  {edu.score}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact() {
  const isMobile = useIsMobile();
  return (
    <section id="contact" style={{
      padding: isMobile ? "4rem 1.4rem" : "6rem 3rem",
      position: "relative", overflow: "hidden",
      background: `
        radial-gradient(ellipse 70% 60% at 20% 50%, rgba(82,183,136,0.18) 0%, transparent 55%),
        radial-gradient(ellipse 50% 50% at 85% 20%, rgba(45,106,79,0.2) 0%, transparent 50%),
        linear-gradient(145deg, #1a2f25 0%, #2d6a4f 60%, #1b4332 100%)
      `,
      color: "#fff",
    }}>
      <svg style={{ position: "absolute", bottom: "5%", right: "5%", pointerEvents: "none", opacity: 0.25 }} width="160" height="160" viewBox="0 0 160 160">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 5 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={16 + c * 32} cy={16 + r * 32} r="2.5" fill="#95d5b2" />
          ))
        )}
      </svg>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "2.5rem" : "4rem" }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>04 / Contact</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "2.4rem" : "clamp(2.5rem,5vw,4rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "0.8rem" }}>
              Let's Build<br /><span style={{ color: "#95d5b2" }}>Something Great.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", fontWeight: 300 }}>
              Open to full-time roles, freelance projects, and collaborations.
            </p>
          </div>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "1rem", maxWidth: isMobile ? "100%" : 860, margin: "0 auto" }}>
          {[
            { icon: "✉", label: "Email", value: data.email, href: `mailto:${data.email}` },
            { icon: "☏", label: "Phone", value: data.phone, href: `tel:${data.phone}` },
            { icon: "in", label: "LinkedIn", value: "View Profile", href: data.linkedin },
            { icon: "📍", label: "Location", value: "Mirpur-1, Dhaka", href: null },
          ].map((c, i) => {
            const cardStyle = {
              display: "flex", flexDirection: "column", gap: "0.4rem",
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: 10, padding: "1.3rem",
              transition: "background 0.2s, border-color 0.2s, transform 0.2s",
            };
            const inner = (
              <>
                <span style={{ fontSize: "1.2rem" }}>{c.icon}</span>
                <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Sans',sans-serif" }}>{c.label}</span>
                <span style={{ fontSize: isMobile ? "0.7rem" : "0.82rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, wordBreak: "break-all" }}>{c.value}</span>
              </>
            );
            return (
              <Fade key={i} delay={i * 70}>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ ...cardStyle, textDecoration: "none", color: "#fff" }}
                    onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.14)"; e.currentTarget.style.borderColor="rgba(149,213,178,0.4)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.13)"; e.currentTarget.style.transform="translateY(0)"; }}
                  >{inner}</a>
                ) : (
                  <div style={cardStyle}>{inner}</div>
                )}
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #fcfaf7; overflow-x: hidden; }
      @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #fcfaf7; }
      ::-webkit-scrollbar-thumb { background: #c8bfb4; border-radius: 3px; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const sections = ["about", "experience", "skills", "education", "contact"];
    const handle = () => {
      const y = window.scrollY + 80;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= y) { setActive(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <Nav active={active} setActive={setActive} />
      <Hero />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <footer style={{
        background: "#111", color: "#555",
        padding: "1.4rem 2rem",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem",
        fontSize: "0.75rem", fontFamily: "'DM Sans',sans-serif",
      }}>
        <span>© 2025 Rakib Hasan</span>
        <span>Software Engineer · Dhaka, Bangladesh</span>
      </footer>
    </div>
  );
}
