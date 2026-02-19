import { useState, useEffect, useRef } from "react";
import missionImg from "./assets/mission.jpg";

/* ─────────────────────────────────────────────────────────────
   DESIGN SYSTEM — Kadence Safety
   Fonts: Plus Jakarta Sans (headings) + Inter (body)
   Palette: warm off-white, forest green, sage, periwinkle
   No dark navy — CTA uses deep forest green instead
   ──────────────────────────────────────────────────────────── */
const T = {
  /* Backgrounds */
  bgPage:    "#F4F5F2",          // warm off-white — page base
  bgAlt:     "#ECEEE9",          // slightly deeper — alternate sections
  bgDark:    "#233329",          // deep forest green — CTA + footer (replaces navy)
  bgCard:    "#FFFFFF",

  /* Brand */
  forest:    "#233329",          // primary text + headings
  sage:      "#79A47E",          // accent — used sparingly
  periwinkle:"#8B95C9",          // tertiary — glows only

  /* Text */
  text:      "#233329",
  muted:     "#6B7B6E",          // sage-tinted mid-grey
  mutedLight:"rgba(255,255,255,0.58)",

  /* Borders */
  border:    "rgba(35,51,41,0.1)",
  sageBorder:"rgba(121,164,126,0.35)",
};

const S = {
  section: "clamp(80px, 10vw, 120px)",
  gutter:  "clamp(24px, 5.5vw, 80px)",
  maxW:    "1120px",
};

/* ── GLOBAL STYLES ──────────────────────────────────────────── */
const GlobalStyles = () => (
  <>
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
    <style>{`
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { overflow-x: hidden; scroll-behavior: smooth; }
      body {
        background: ${T.bgPage};
        color: ${T.text};
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        line-height: 1.7;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }
      @media (max-width: 900px) {
        .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
        .four-col { grid-template-columns: 1fr !important; }
        .two-col-benefits { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 600px) {
        .nav-links { display: none !important; }
      }
    `}</style>
  </>
);

/* ── INTERSECTION REVEAL ────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── EYEBROW ────────────────────────────────────────────────── */
function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: "11px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: T.sage,
      marginBottom: "16px",
    }}>
      {children}
    </div>
  );
}

/* ── DIVIDER ────────────────────────────────────────────────── */
function Divider({ light = false }) {
  return (
    <div style={{
      width: "100%", height: "1px",
      background: light ? "rgba(255,255,255,0.12)" : T.border,
    }} />
  );
}

/* ── TWO-TONE HEADING ───────────────────────────────────────── */
/* Mirrors the reference: first line sage-green, second line dark */
function TwoToneH1({ line1, line2 }) {
  return (
    <h1 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800,
      fontSize: "clamp(40px, 6.5vw, 74px)",
      lineHeight: 1.08,
      letterSpacing: "-0.025em",
      margin: "0 0 32px",
    }}>
      <span style={{ color: T.sage, display: "block" }}>{line1}</span>
      <span style={{ color: "#ffffff", display: "block" }}>{line2}</span>
    </h1>
  );
}

/* ── NAV ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const logoColor = scrolled ? T.forest : "#ffffff";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: `0 ${S.gutter}`, height: "72px",
      background: scrolled ? "rgba(244,245,242,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid rgba(255,255,255,0.18)",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800, fontSize: "30px", letterSpacing: "-0.02em",
        color: logoColor, transition: "color 0.4s",
      }}>
        Kadence<span style={{ color: scrolled ? T.sage : "rgba(121,164,126,0.75)", fontWeight: 600, transition: "color 0.4s" }}> Safety</span>
      </div>

      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        {["Home", "About Us", "How to Partner"].map(l => (
          <NavLink key={l} label={l} scrolled={scrolled} />
        ))}
        <NavCTA scrolled={scrolled} />
      </div>
    </nav>
  );
}

function NavLink({ label, scrolled }) {
  const [h, setH] = useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "16px",
        color: h
          ? (scrolled ? T.forest : "#ffffff")
          : (scrolled ? T.muted : "rgba(255,255,255,0.68)"),
        textDecoration: "none", transition: "color 0.2s",
      }}
    >{label}</a>
  );
}

function NavCTA({ scrolled }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "15px",
        padding: "10px 26px", borderRadius: "100px", cursor: "pointer",
        background: h ? T.sage : (scrolled ? T.forest : "rgba(255,255,255,0.12)"),
        color: "#ffffff",
        border: scrolled ? "none" : "1px solid rgba(255,255,255,0.28)",
        transition: "all 0.22s ease",
      }}
    >Contact Us</button>
  );
}

/* ── HERO ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <>
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: `120px ${S.gutter} 100px`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Full-bleed photo */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
          pointerEvents: "none",
        }} />
        {/* Dark forest-green overlay — fades photo, keeps text legible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(165deg, rgba(35,51,41,0.82) 0%, rgba(28,42,33,0.78) 50%, rgba(20,32,24,0.88) 100%)",
          pointerEvents: "none",
        }} />
        {/* Subtle sage centre glow on top of overlay */}
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px", height: "600px",
          background: "radial-gradient(ellipse, rgba(121,164,126,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "780px" }}>
          <Reveal delay={0.1}>
            <TwoToneH1 line1="Redefining" line2="Health & Safety" />
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.6)",
              lineHeight: 1.85, margin: "0 auto 48px", maxWidth: "500px",
            }}>
              Bringing together the best entrepreneurs in Health &amp; Safety to create the partner of choice for UK businesses.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <PillButton primary>Partner With Us</PillButton>
              <PillButton>Learn More</PillButton>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "9px",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}>Scroll</span>
          <div style={{ width: "1px", height: "36px", background: `linear-gradient(${T.sage}, transparent)` }} />
        </div>
      </section>
      <Divider />
    </>
  );
}

function PillButton({ children, primary = false }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "14px",
        padding: "13px 34px", borderRadius: "100px", cursor: "pointer",
        transition: "all 0.22s ease",
        background: primary
          ? (h ? "#6d9472" : T.sage)
          : (h ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"),
        color: "#ffffff",
        border: primary ? "none" : "1px solid rgba(255,255,255,0.22)",
        backdropFilter: primary ? "none" : "blur(4px)",
      }}
    >{children}</button>
  );
}

/* ── MISSION ────────────────────────────────────────────────── */
function Mission() {
  return (
    <>
      <section style={{ background: T.bgCard, padding: `${S.section} ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }} className="two-col">
          {/* Left: heading + text */}
          <div>
            <Reveal delay={0}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(30px, 4vw, 50px)",
                lineHeight: 1.12, letterSpacing: "-0.022em",
                color: T.forest, margin: "0 0 32px",
              }}>
                Our Mission
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ borderLeft: `3px solid ${T.sage}`, paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400,
                  fontSize: "16px", color: T.forest, lineHeight: 1.8, margin: 0,
                }}>
                  We bring together the best entrepreneurs in Health &amp; Safety, Training, and Compliance services to create the partner of choice for businesses seeking to protect their people, assets, and the environment.
                </p>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400,
                  fontSize: "16px", color: T.forest, lineHeight: 1.8, margin: 0,
                }}>
                  We acquire, support, and grow specialist firms through shared resources, technology, and capital — raising the standard of workplace safety across the UK.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: image */}
          <Reveal delay={0.2}>
            <div style={{
              borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(35,51,41,0.14)",
              aspectRatio: "4/5",
            }}>
              <img
                src={missionImg}
                alt="Health and safety professional"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── FOCUS ──────────────────────────────────────────────────── */
const focusItems = [
  {
    num: "01",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
    title: "Health & Safety Services",
    body: "Helping businesses maintain safe working environments and protect their people across industries.",
  },
  {
    num: "02",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>),
    title: "Compliance Services",
    body: "Ensuring organisations meet regulatory standards and maintain ongoing compliance with evolving legislation.",
  },
  {
    num: "03",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>),
    title: "Training & Accreditation",
    body: "Professional development programmes and certification services to upskill teams and ensure industry compliance.",
  },
  {
    num: "04",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>),
    title: "Risk Management & ESG Consulting",
    body: "Advisory services to identify, assess, and mitigate operational, environmental, social, and governance risks.",
  },
];

function FocusCard({ item, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          borderRadius: "20px", padding: "32px 32px 38px",
          background: T.bgCard,
          border: `1.5px solid ${h ? T.sage : T.sageBorder}`,
          boxShadow: h ? "0 12px 40px rgba(35,51,41,0.10)" : "0 2px 12px rgba(35,51,41,0.05)",
          transition: "all 0.32s ease", cursor: "default",
          position: "relative", overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Title + rule pinned to top; body pushed to fixed distance via flex */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ minHeight: "80px" }}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(20px, 2.6vw, 28px)", color: T.sage,
              letterSpacing: "-0.02em", lineHeight: 1.25,
              margin: "0 0 10px", whiteSpace: "pre-line",
            }}>{item.title}</h3>

            {/* Sage underline rule */}
            <div style={{
              width: h ? "48px" : "32px",
              height: "2px",
              background: T.sage,
              borderRadius: "2px",
              marginBottom: "14px",
              transition: "width 0.32s ease",
            }} />
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 400,
            fontSize: "16px", color: T.muted, margin: 0, lineHeight: 1.85,
          }}>{item.body}</p>
        </div>

        {/* Subtle corner glow */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "140px", height: "140px",
          background: "radial-gradient(circle at top right, rgba(121,164,126,0.08), transparent 65%)",
          opacity: h ? 1 : 0.4, transition: "opacity 0.4s", pointerEvents: "none",
        }} />
      </div>
    </Reveal>
  );
}

function Focus() {
  return (
    <>
      <section style={{ background: T.bgAlt, padding: `${S.section} ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "56px" }}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(28px, 3.8vw, 46px)",
                color: T.forest, letterSpacing: "-0.022em",
                lineHeight: 1.14, margin: "0 0 16px", maxWidth: "520px",
              }}>
                Our Focus
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 400,
                fontSize: "16px", color: T.forest, maxWidth: "900px", lineHeight: 1.8,
                opacity: 0.72, whiteSpace: "nowrap",
              }}>
                We are looking to partner with{" "}
                <span style={{
                  color: "#3d5c45",
                  fontWeight: 700,
                }}>exceptional businesses and entrepreneurs</span>
                {" "}operating in the following areas:
              </p>
            </div>
          </Reveal>

          <div className="four-col" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: "14px", rowGap: "28px" }}>
            {focusItems.map((item, i) => (
              <FocusCard key={item.num} item={item} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── BENEFITS ───────────────────────────────────────────────── */
const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Central Services To Free Up Time on What Really Matters",
    body: "We remove your administrative burden by centralising back-office functions, allowing you to focus entirely on client service excellence and team leadership.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="7" y="7" width="10" height="10" rx="1"/>
        <path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3"/>
      </svg>
    ),
    title: "Technological Support for Digitalisation and Growth",
    body: "We provide a modern software and tech stack to every company in the group, enabling your teams to work more efficiently, securely, and to the highest standards.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
        <path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6"/>
      </svg>
    ),
    title: "National Scale to Strengthen Local Execution",
    body: "Leverage the reach, reputation, and capabilities of a national platform to win larger contracts, expand service offerings, and attract best-in-class talent.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: "Bigger Financial Upside",
    body: "Participate in the financial upside of a large and diversified national group, whilst retaining full operational independence and your local identity.",
  },
];

function BenefitRow({ b, delay, last }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          display: "flex", gap: "28px", alignItems: "flex-start",
          padding: "28px 0",
          borderBottom: last ? "none" : `1px solid ${T.border}`,
          transition: "all 0.28s ease", cursor: "default",
          position: "relative",
        }}
      >
        {/* Icon circle */}
        <div style={{
          flexShrink: 0,
          width: "48px", height: "48px", borderRadius: "50%",
          background: h ? T.sage : "rgba(121,164,126,0.10)",
          border: `1px solid ${h ? T.sage : T.sageBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: h ? "#ffffff" : T.sage,
          transition: "all 0.30s ease",
          marginTop: "2px",
        }}>{b.icon}</div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: "17px", color: T.forest,
            margin: "0 0 8px", lineHeight: 1.35,
          }}>{b.title}</h3>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 400,
            fontSize: "15px", color: T.muted,
            margin: 0, lineHeight: 1.85,
          }}>{b.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Benefits() {
  return (
    <>
      <section style={{ background: T.bgCard, padding: `${S.section} ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "center" }} className="two-col">

          {/* Left: vertically centred heading column */}
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 46px)",
                color: T.forest, letterSpacing: "-0.022em",
                lineHeight: 1.12, margin: "0 0 20px",
              }}>
                Benefits from<br />Joining the Group
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 400,
                fontSize: "16px", color: T.muted,
                lineHeight: 1.8, margin: 0, maxWidth: "280px",
              }}>
                A partnership built to unlock your full potential.
              </p>
            </div>
          </Reveal>

          {/* Right: benefit rows with timeline connector */}
          <div style={{ position: "relative" }}>
            {/* Vertical timeline line */}
            <div style={{
              position: "absolute", left: "-28px", top: "24px", bottom: "24px",
              width: "1px",
              background: `linear-gradient(to bottom, rgba(121,164,126,0.0) 0%, ${T.sage} 12%, ${T.sage} 88%, rgba(121,164,126,0.0) 100%)`,
            }} />
            {benefits.map((b, i) => (
              <BenefitRow key={i} b={b} delay={i * 0.08} last={i === benefits.length - 1} />
            ))}
          </div>

        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <>
      <section style={{
        background: T.bgDark,   // deep forest green — not navy
        padding: `${S.section} ${S.gutter}`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Dot texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none",
        }} />
        {/* Sage glow */}
        <div style={{
          position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "280px",
          background: "radial-gradient(ellipse, rgba(121,164,126,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        {/* Periwinkle top-right */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(139,149,201,0.09) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <Eyebrow>Get In Touch</Eyebrow>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 5.5vw, 58px)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              color: "#ffffff", margin: "0 0 20px",
            }}>
              Do You Want{" "}
              <span style={{ color: T.sage }}>To Join?</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: "17px", color: "rgba(255,255,255,0.58)",
              lineHeight: 1.8, margin: "0 0 44px",
            }}>
              We are always looking for exceptional businesses and founders to partner with.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <CTABtn primary>Contact Us</CTABtn>
              <CTABtn>Learn How to Partner →</CTABtn>
            </div>
          </Reveal>
        </div>
      </section>
      <Divider light />
    </>
  );
}

function CTABtn({ children, primary = false }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "14px",
        padding: "13px 34px", borderRadius: "100px", cursor: "pointer",
        transition: "all 0.22s ease",
        background: primary
          ? (h ? "#6d9472" : T.sage)
          : (h ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"),
        color: "#ffffff",
        border: primary ? "none" : "1px solid rgba(255,255,255,0.22)",
        backdropFilter: primary ? "none" : "blur(4px)",
      }}
    >{children}</button>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: T.bgDark,
      padding: `32px ${S.gutter}`,
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
    }}>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800, fontSize: "18px", color: "#ffffff",
      }}>Kadence<span style={{ color: T.sage, fontWeight: 600 }}> Safety</span></div>

      <div style={{ display: "flex", gap: "28px" }}>
        {["Home", "About Us", "How to Partner"].map(l => (
          <a key={l} href="#"
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.85)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.42)"}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400,
              color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.2s",
            }}
          >{l}</a>
        ))}
      </div>

      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.28)",
      }}>© 2026 Kadence Safety. All rights reserved.</div>
    </footer>
  );
}

/* ── APP ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Hero />
      <Mission />
      <Focus />
      <Benefits />
      <CTA />
      <Footer />
    </>
  );
}
