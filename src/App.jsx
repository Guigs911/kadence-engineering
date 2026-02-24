import { useState, useEffect, useRef } from "react";
import missionImg from "./assets/mission.jpg";
import contactBg from "./assets/contact-bg.jpg";
import guillaumeHeadshot from "./assets/guillaume-headshot.jpg";
import gianmarcoHeadshot from "./assets/gianmarco-headshot.jpg";

/* ─────────────────────────────────────────────────────────────
   DESIGN SYSTEM – Kadence Safety
   Fonts: Plus Jakarta Sans (headings) + Inter (body)
   Palette: warm off-white, forest green, sage, periwinkle
   ──────────────────────────────────────────────────────────── */
const T = {
  bgPage:     "#F4F5F2",
  bgAlt:      "#ECEEE9",
  bgDark:     "#233329",
  bgCard:     "#FFFFFF",
  forest:     "#233329",
  sage:       "#79A47E",
  periwinkle: "#8B95C9",
  text:       "#233329",
  muted:      "#6B7B6E",
  mutedLight: "rgba(255,255,255,0.58)",
  border:     "rgba(35,51,41,0.1)",
  sageBorder: "rgba(121,164,126,0.35)",
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

      /* ── Tablet ── */
      @media (max-width: 900px) {
        .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
        .four-col { grid-template-columns: 1fr 1fr !important; }
        .contact-grid { grid-template-columns: 1fr !important; }
        .team-grid { grid-template-columns: 1fr !important; }
        .process-grid { grid-template-columns: 1fr !important; }
        .benefits-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .nav-links { display: none !important; }
        .nav-hamburger { display: flex !important; }
        .hero-buttons { flex-direction: column !important; align-items: center !important; }
        .hero-buttons button { width: 100% !important; max-width: 320px !important; }
        .cta-buttons { flex-direction: column !important; align-items: center !important; }
        .cta-buttons button { width: 100% !important; max-width: 280px !important; }
        .contact-image { display: none !important; }
      }

      /* ── Mobile ── */
      @media (max-width: 600px) {
        .four-col { grid-template-columns: 1fr !important; }
        .values-grid { grid-template-columns: 1fr !important; }
        .mobile-stack { flex-direction: column !important; align-items: stretch !important; }
        .mobile-center { text-align: center !important; }
        .mobile-hide { display: none !important; }
        .mission-grid { gap: 32px !important; }
        .hero-buttons { gap: 10px !important; }
        .benefits-grid { gap: 32px !important; }
        /* Reduce section padding on mobile */
        section { padding-left: 20px !important; padding-right: 20px !important; }
        footer { padding-left: 20px !important; padding-right: 20px !important; }
        /* Footer: stack on mobile */
        footer { grid-template-columns: 1fr !important; gap: 20px !important; text-align: center !important; }
        footer button { justify-self: center !important; }
        footer > div:first-child { justify-self: center !important; align-items: center !important; }
        footer div:last-child { justify-self: center !important; text-align: center !important; }
        /* Process steps: tighter */
        .process-step-content { flex-direction: column !important; }
        /* Founder cards: reduce padding */
        .founder-info { padding: 20px !important; }
      }

      /* ── Form placeholder styling ── */
      input::placeholder, textarea::placeholder {
        color: ${T.muted};
        opacity: 1;
      }

      /* ── Mobile drawer ── */
      .mobile-drawer {
        position: fixed; top: 72px; left: 0; right: 0; bottom: 0;
        background: rgba(35,51,41,0.98);
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 32px; z-index: 199;
        backdrop-filter: blur(16px);
        animation: drawerIn 0.25s ease;
      }
      @keyframes drawerIn {
        from { opacity: 0; transform: translateY(-12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .mobile-drawer button {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 600; font-size: 22px;
        color: rgba(255,255,255,0.85);
        background: none; border: none; cursor: pointer;
        letter-spacing: -0.01em;
        transition: color 0.2s;
      }
      .mobile-drawer button:hover { color: #ffffff; }
      .mobile-drawer .drawer-cta {
        margin-top: 8px;
        font-size: 16px !important;
        padding: 12px 36px !important;
        border-radius: 100px !important;
        background: ${T.sage} !important;
        color: #ffffff !important;
        border: none !important;
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
      fontWeight: 600, fontSize: "11px",
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: T.sage, marginBottom: "16px",
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

/* ── TWO-TONE H1 ────────────────────────────────────────────── */
function TwoToneH1({ line1, line2 }) {
  return (
    <h1 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800, fontSize: "clamp(40px, 6.5vw, 74px)",
      lineHeight: 1.08, letterSpacing: "-0.025em", margin: "0 0 32px",
    }}>
      <span style={{ color: "#ffffff", display: "block" }}>{line1}</span>
      <span style={{ color: T.sage, display: "block" }}>{line2}</span>
    </h1>
  );
}

/* ── NAV ────────────────────────────────────────────────────── */
function Nav({ currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close drawer on page change
  useEffect(() => { setMenuOpen(false); }, [currentPage]);

  const isContact = currentPage === "contact";
  const logoColor = (scrolled && !isContact) ? T.forest : "#ffffff";
  const iconColor = (scrolled && !isContact) ? T.forest : "#ffffff";

  const navTo = (page) => { setPage(page); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: `0 ${S.gutter}`, height: "72px",
        background: menuOpen
          ? "rgba(35,51,41,0.98)"
          : isContact
            ? "rgba(35,51,41,0.97)"
            : (scrolled ? "rgba(244,245,242,0.97)" : "transparent"),
        backdropFilter: (!isContact && scrolled && !menuOpen) ? "blur(16px)" : "none",
        borderBottom: (isContact || !scrolled || menuOpen) ? "1px solid rgba(255,255,255,0.18)" : `1px solid ${T.border}`,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}>
        {/* Logo */}
        <div
          onClick={() => navTo("home")}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800, fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: "-0.02em",
            color: menuOpen ? "#ffffff" : logoColor, transition: "color 0.4s", cursor: "pointer",
          }}
        >
          Kadence Group<span style={{ color: T.sage, fontWeight: 600 }}> Safety</span>
        </div>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {[
            { label: "Home",           page: "home" },
            { label: "About Us",       page: "about" },
            { label: "How to Partner", page: "partner" },
          ].map(({ label, page }) => (
            <NavLink
              key={page}
              label={label}
              scrolled={scrolled}
              darkTop={isContact}
              active={currentPage === page}
              onClick={() => navTo(page)}
            />
          ))}
          <NavCTA scrolled={scrolled} darkTop={isContact} onClick={() => navTo("contact")} />
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: "none", flexDirection: "column", justifyContent: "center",
            alignItems: "center", gap: "5px",
            background: "none", border: "none", cursor: "pointer", padding: "8px",
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke={menuOpen ? "#ffffff" : iconColor} strokeWidth="2" strokeLinecap="round" width="24" height="24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke={menuOpen ? "#ffffff" : iconColor} strokeWidth="2" strokeLinecap="round" width="24" height="24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {[
            { label: "Home",           page: "home" },
            { label: "About Us",       page: "about" },
            { label: "How to Partner", page: "partner" },
          ].map(({ label, page }) => (
            <button key={page} onClick={() => navTo(page)}
              style={{ color: currentPage === page ? "#ffffff" : "rgba(255,255,255,0.7)" }}>
              {label}
            </button>
          ))}
          <button className="drawer-cta" onClick={() => navTo("contact")}>Contact Us</button>
        </div>
      )}
    </>
  );
}

function NavLink({ label, scrolled, darkTop, active, onClick }) {
  const [h, setH] = useState(false);
  const light = !scrolled || darkTop;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "16px",
        color: active
          ? (light ? "#ffffff" : T.forest)
          : h
            ? (light ? "#ffffff" : T.forest)
            : (light ? "rgba(255,255,255,0.68)" : T.muted),
        textDecoration: "none",
        background: "none", border: "none", cursor: "pointer",
        padding: 0, position: "relative", transition: "color 0.2s",
      }}
    >
      {label}
      {/* Active underline */}
      <span style={{
        position: "absolute", bottom: "-4px", left: 0, right: 0,
        height: "2px", borderRadius: "2px",
        background: light ? "#ffffff" : T.sage,
        opacity: active ? 1 : 0,
        transition: "opacity 0.2s",
      }} />
    </button>
  );
}

function NavCTA({ scrolled, darkTop, onClick }) {
  const [h, setH] = useState(false);
  const light = !scrolled || darkTop;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "15px",
        padding: "10px 26px", borderRadius: "100px", cursor: "pointer",
        background: h ? T.sage : (light ? "rgba(255,255,255,0.12)" : T.forest),
        color: "#ffffff",
        border: light ? "1px solid rgba(255,255,255,0.28)" : "none",
        transition: "all 0.22s ease",
      }}
    >Contact Us</button>
  );
}

/* ── PILL BUTTON (Hero) ─────────────────────────────────────── */
function PillButton({ children, primary = false, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "14px",
        padding: "13px 34px", borderRadius: "100px", cursor: "pointer",
        transition: "all 0.22s ease",
        background: primary
          ? (h ? "#6d9472" : T.sage)
          : (h ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"),
        color: "#ffffff",
        border: "1px solid rgba(255,255,255,0.22)",
        backdropFilter: primary ? "none" : "blur(4px)",
      }}
    >{children}</button>
  );
}

/* ── CTA BUTTON (dark sections) ─────────────────────────────── */
function CTABtn({ children, primary = false, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "14px",
        padding: "13px 34px", borderRadius: "100px", cursor: "pointer",
        transition: "all 0.22s ease",
        background: primary
          ? (h ? "#6d9472" : T.sage)
          : (h ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"),
        color: "#ffffff",
        border: "1.5px solid rgba(255,255,255,0.45)",
        backdropFilter: primary ? "none" : "blur(4px)",
      }}
    >{children}</button>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE SECTIONS
   ══════════════════════════════════════════════════════════════ */

/* ── HERO ───────────────────────────────────────────────────── */
function Hero({ setPage }) {
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
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(165deg, rgba(35,51,41,0.82) 0%, rgba(28,42,33,0.78) 50%, rgba(20,32,24,0.88) 100%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px", height: "600px",
          background: "radial-gradient(ellipse, rgba(121,164,126,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "780px" }}>
          <Reveal delay={0.1}>
            <TwoToneH1 line1="Redefining" line2="Workplace Safety" />
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.6)",
              lineHeight: 1.85, margin: "0 auto 48px", maxWidth: "640px",
            }}>
              Building a national leader in workplace safety, compliance and training.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero-buttons" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <PillButton primary onClick={() => setPage("partner")}>How to Partner</PillButton>
              <PillButton onClick={() => setPage("contact")}>Contact Us</PillButton>
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

/* ── MISSION ────────────────────────────────────────────────── */
function Mission() {
  return (
    <>
      <section style={{ background: T.bgCard, padding: `clamp(40px, 5vw, 64px) ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }} className="two-col mission-grid">
          <div>
            <Reveal delay={0}>
              <Eyebrow>Our Mission</Eyebrow>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(30px, 4vw, 50px)",
                lineHeight: 1.12, letterSpacing: "-0.022em",
                color: T.forest, margin: "0 0 32px",
              }}>
                Raising the Standards<br />of Workplace Safety
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ borderLeft: `3px solid ${T.sage}`, paddingLeft: "24px" }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontSize: "16px", color: T.forest, lineHeight: 1.8, margin: 0 }}>
                  We want to bring together the best entrepreneurs in Health &amp; Safety, Training, and Compliance services to create the partner of choice for clients seeking to protect their people, assets, and the environment.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px rgba(35,51,41,0.14)", aspectRatio: "4/5" }}>
              <img src={missionImg} alt="Health and safety professional" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
          position: "relative", overflow: "hidden", height: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ minHeight: "80px" }}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(20px, 2.6vw, 28px)", color: T.sage,
              letterSpacing: "-0.02em", lineHeight: 1.25, margin: "0 0 10px",
            }}>{item.title}</h3>
            <div style={{ width: h ? "48px" : "32px", height: "2px", background: T.sage, borderRadius: "2px", marginBottom: "14px", transition: "width 0.32s ease" }} />
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", color: T.forest, margin: 0, lineHeight: 1.85 }}>{item.body}</p>
        </div>
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
              <Eyebrow>Our Focus</Eyebrow>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(28px, 4.2vw, 54px)", color: T.forest,
                letterSpacing: "-0.022em", lineHeight: 1.14, margin: "0 0 16px",
              }}>We are looking to partner with exceptional<br />businesses and entrepreneurs</h2>
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
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>),
    title: "Central Services To Free Up Time for What Really Matters",
    body: "We remove your administrative burden by centralising back-office functions, allowing you to focus entirely on client service excellence.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3"/></svg>),
    title: "Technological Support for Digitalisation and Growth",
    body: "We provide a modern tech stack, enabling your teams to work more efficiently, securely, and to the highest standards.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6"/></svg>),
    title: "National Scale to Strengthen Local Execution",
    body: "You leverage the reach, reputation, and capabilities of a national platform to win larger contracts, expand service offerings, and attract top talent.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>),
    title: "Bigger Financial Upside",
    body: "You participate in the financial upside of a large and diversified national group, whilst retaining full operational independence and your local identity.",
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
          transition: "all 0.28s ease", cursor: "default", position: "relative",
        }}
      >
        <div style={{
          flexShrink: 0, width: "48px", height: "48px", borderRadius: "50%",
          background: h ? T.sage : "rgba(121,164,126,0.10)",
          border: `1px solid ${h ? T.sage : T.sageBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: h ? "#ffffff" : T.sage, transition: "all 0.30s ease", marginTop: "2px",
        }}>{b.icon}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "17px", color: T.forest, margin: "0 0 8px", lineHeight: 1.35 }}>{b.title}</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "15px", color: T.forest, margin: 0, lineHeight: 1.85, whiteSpace: "pre-line" }}>{b.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Benefits() {
  return (
    <>
      <section style={{ background: T.bgCard, padding: `${S.section} ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "center" }} className="two-col benefits-grid">
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Eyebrow>Why Join</Eyebrow>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 46px)", color: T.forest,
                letterSpacing: "-0.022em", lineHeight: 1.12, margin: "0 0 20px",
              }}>Benefits from<br />Joining the Group</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", color: T.muted, lineHeight: 1.8, margin: 0, maxWidth: "280px" }}>
                A partnership built to unlock your full potential.
              </p>
            </div>
          </Reveal>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: "-28px", top: "24px", bottom: "24px", width: "1px",
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

/* ── HOME CTA (Get In Touch) ────────────────────────────────── */
function HomeCTA({ setPage }) {
  return (
    <>
      <section style={{
        background: T.bgDark,
        padding: `${S.section} ${S.gutter}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "280px", background: "radial-gradient(ellipse, rgba(121,164,126,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(139,149,201,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />

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
            <div className="cta-buttons" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <CTABtn primary onClick={() => setPage("partner")}>How to Partner</CTABtn>
              <CTABtn onClick={() => setPage("contact")}>Contact Us</CTABtn>
            </div>
          </Reveal>
        </div>
      </section>
      <Divider light />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT US PAGE
   ══════════════════════════════════════════════════════════════ */
function AboutPage({ setPage }) {
  return (
    <>
      {/* ── Team header ── */}
      <section style={{ background: T.bgDark, padding: `100px ${S.gutter} 40px`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "900px", height: "300px", background: "radial-gradient(ellipse, rgba(121,164,126,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: S.maxW, margin: "0 auto", position: "relative" }}>
          <Reveal delay={0.05}><Eyebrow>The Team</Eyebrow></Reveal>
          <Reveal delay={0.12}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.08,
              letterSpacing: "-0.025em", color: "#ffffff", margin: "0 0 16px", whiteSpace: "nowrap",
            }}>
              Our Founding <span style={{ color: T.sage }}>Team</span>
            </h1>
          </Reveal>
        </div>
      </section>
      <Divider light />

      {/* ── Team cards ── */}
      <section style={{ background: T.bgAlt, padding: `clamp(40px, 5vw, 64px) ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto" }}>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "stretch" }}>
            <FounderCard
              delay={0.05}
              name="Gianmarco Iannello"
              role="Co-Founder"
              photo={gianmarcoHeadshot}
              linkedin="https://uk.linkedin.com/in/gianmarco-iannello"
              bio={"After studying at University College London (UCL), he worked for three years in M&A advisory at Perella Weinberg Partners.\n\nSubsequently, he spent eight years at Permira and KKR, two leading private equity firms, where he focused on buy-and-build and growth investments in Business Services and Financial Services across Europe. He also served on the boards of Alter Domus and APRIL Group.\n\nHe is Adjunct Professor of Finance at Hult International Business School, and a trustee of the United World College of the Adriatic. In 2025, he co-founded Kadence with Guillaume."}
            />
            <FounderCard
              delay={0.12}
              name="Guillaume Iserin"
              role="Co-Founder"
              photo={guillaumeHeadshot}
              linkedin="https://uk.linkedin.com/in/guillaumeiserin"
              bio={"After studying at University College London (UCL), he worked for four years in M&A advisory at Perella Weinberg Partners.\n\nSubsequently, he spent four years as part of the investment team at The Cranemere Group, a holding company with >$2.5 billion in shareholder equity, where he focused on Business Services and Light Industrials buy-and-build investments across Europe. He also served on the board of Extraordinary Surfaces.\n\nGuillaume also holds an MBA from INSEAD. In 2025, he co-founded Kadence with Gianmarco."}
            />
          </div>
        </div>
      </section>
      <Divider />

      {/* ── Values ── */}
      <section style={{ background: T.bgAlt, padding: `clamp(40px, 5vw, 64px) ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <Eyebrow>What Guides Us</Eyebrow>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.8vw, 44px)", color: T.forest, letterSpacing: "-0.022em", lineHeight: 1.12, margin: "0 auto" }}>
                Our Values
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", alignItems: "stretch" }} className="four-col values-grid">
            {[
              { title: "Partnership First", body: "We see every acquisition as the beginning of a long-term relationship. We succeed when our partners succeed." },
              { title: "Integrity Always", body: "We operate with complete transparency – on valuation, process, and expectations. No surprises, no hidden agendas." },
              { title: "Craft & Excellence", body: "We are drawn to businesses that take genuine pride in their work and hold themselves to the highest professional standards." },
              { title: "People at the Centre", body: "Behind every business are talented people. We invest in them as much as we invest in the business itself." },
              { title: "Legacy Preserved", body: "We believe a founder's legacy is worth protecting. We work hard to ensure continuity of culture, brand, and identity." },
              { title: "Ambition With Patience", body: "We move decisively but never rush decisions that deserve careful thought." },
            ].map((v, i) => (
              <ValueCard key={i} v={v} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>
      <Divider />

      {/* ── Careers CTA ── */}
      <section style={{
        background: T.bgDark,
        padding: `${S.section} ${S.gutter}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "280px", background: "radial-gradient(ellipse, rgba(121,164,126,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <Eyebrow>Careers</Eyebrow>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 5.5vw, 58px)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              color: "#ffffff", margin: "0 0 20px",
            }}>
              Join the{" "}
              <span style={{ color: T.sage }}>Team</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: "17px", color: "rgba(255,255,255,0.58)",
              lineHeight: 1.8, margin: "0 0 44px",
            }}>
              If you share our passion for building enduring businesses and would like to work with us, we would love to hear from you.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <CTABtn primary onClick={() => setPage("contact")}>Contact Us</CTABtn>
            </div>
          </Reveal>
        </div>
      </section>
      <Divider light />
    </>
  );
}

function ValueCard({ v, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          borderRadius: "20px", padding: "32px",
          background: T.bgCard,
          border: `1.5px solid ${h ? T.sage : T.sageBorder}`,
          boxShadow: h ? "0 12px 40px rgba(35,51,41,0.10)" : "0 2px 12px rgba(35,51,41,0.05)",
          transition: "all 0.32s ease", cursor: "default",
          position: "relative", overflow: "hidden", height: "100%",
        }}
      >
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: T.sage, margin: "0 0 10px", lineHeight: 1.3 }}>{v.title}</h3>
        <div style={{ width: h ? "48px" : "32px", height: "3px", background: T.sage, borderRadius: "2px", marginBottom: "16px", transition: "width 0.32s ease" }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "15px", color: T.forest, margin: 0, lineHeight: 1.8 }}>{v.body}</p>
        <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: "radial-gradient(circle at top right, rgba(121,164,126,0.08), transparent 65%)", opacity: h ? 1 : 0.4, transition: "opacity 0.4s", pointerEvents: "none" }} />
      </div>
    </Reveal>
  );
}

function LinkedInButton({ href }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        flexShrink: 0,
        display: "flex", alignItems: "center", gap: "6px",
        padding: "7px 14px", borderRadius: "100px",
        background: h ? "#0A66C2" : "rgba(10,102,194,0.08)",
        border: "1.5px solid rgba(10,102,194,0.25)",
        color: h ? "#ffffff" : "#0A66C2",
        textDecoration: "none",
        transition: "all 0.22s ease",
      }}
    >
      {/* LinkedIn icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.02em" }}>LinkedIn</span>
    </a>
  );
}

function FounderCard({ name, role, bio, linkedin, photo, delay }) {
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div style={{
        borderRadius: "20px", overflow: "hidden",
        border: `1.5px solid ${T.sageBorder}`,
        background: T.bgCard,
        boxShadow: "0 4px 24px rgba(35,51,41,0.07)",
        height: "100%", display: "flex", flexDirection: "column",
      }}>
        {/* Avatar: photo or placeholder */}
        <div style={{
          width: "100%", aspectRatio: "4/3",
          background: `linear-gradient(135deg, ${T.bgAlt} 0%, rgba(121,164,126,0.12) 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          {photo ? (
            <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "rgba(121,164,126,0.18)",
                border: `2px solid ${T.sageBorder}`,
                margin: "0 auto 12px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.sage, opacity: 0.7 }}>Photo coming soon</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="founder-info" style={{ padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginRight: "-2px" }}>
            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "22px", color: T.forest, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{name}</h3>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: T.sage, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px" }}>{role}</p>
            </div>
            {linkedin && <LinkedInButton href={linkedin} />}
          </div>
          <div style={{ width: "32px", height: "2px", background: T.sage, borderRadius: "2px", marginBottom: "20px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {bio.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "15px", color: T.muted, lineHeight: 1.85, margin: 0 }}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOW TO PARTNER PAGE
   ══════════════════════════════════════════════════════════════ */
const processSteps = [
  {
    num: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "Initial Meeting & Fit Assessment",
    body: "We get to know you and your business to ensure there is a strong cultural and strategic alignment.",
  },
  {
    num: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Exchange of Commercial & Financial Information",
    body: "Provided there is mutual interest, selected information is shared so we can work on submitting an offer to you.",
  },
  {
    num: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "LOI with Proposed Valuation & Transaction Structure",
    body: "We prepare a clear offer, setting out the key points of the proposed transaction.",
  },
  {
    num: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Due Diligence Phase",
    body: "A focused review of financial, legal, and people & culture matters.",
  },
  {
    num: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Contracts Finalised & Completion",
    body: "Agreements are signed, funds are transferred, and the deal is closed.",
  },
  {
    num: 6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Partnership Begins",
    body: "We begin working together, supporting growth while preserving what makes your business great.",
  },
];

const faqItems = [
  {
    q: "What are the benefits of joining Kadence?",
    a: "You realise the value of what you have built to date, while becoming a shareholder in a fast-growing national group.\n\nReinvesting alongside us allows you to participate meaningfully in the upside as we scale the business together, while the group takes on central and administrative functions so you can focus on clients, teams, and running the business.",
  },
  {
    q: "What are the criteria for joining Kadence?",
    a: "There are no specific criteria for joining Kadence.\n\nSince each project is unique, we take the time to examine it collaboratively. This personalized approach gives us the agility and flexibility needed to offer tailored partnerships.",
  },
  {
    q: "If I join Kadence, will I lose my independence?",
    a: "No. You will retain full control over your client relationships, go-to-market strategy, and local culture.\n\nThe group offers shared back-office support and drives integration only where it benefits everyone, such as in Finance, Technology or Procurement.",
  },
  {
    q: "I am thinking about retirement, can I still join?",
    a: "Of course. We also welcome companies where succession is top of mind and we provide tailored solutions to ensure business continuity and legacy preservation. Together, we will manage the transition over several months to ensure a smooth, lasting handover.",
  },
];

function ProcessStep({ step, delay }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          display: "flex", gap: "20px", alignItems: "flex-start",
          padding: "18px 24px",
          borderRadius: "14px",
          background: h ? T.bgCard : "transparent",
          border: `1.5px solid ${h ? T.sage : T.sageBorder}`,
          boxShadow: h ? "0 8px 32px rgba(35,51,41,0.09)" : "0 1px 4px rgba(35,51,41,0.04)",
          transition: "all 0.32s ease", cursor: "default",
        }}
      >
        {/* Number badge */}
        <div style={{
          flexShrink: 0,
          width: "36px", height: "36px", borderRadius: "50%",
          background: h ? T.forest : "rgba(35,51,41,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.32s ease",
        }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700, fontSize: "15px",
            color: h ? "#ffffff" : T.forest,
            transition: "color 0.32s ease",
          }}>{step.num}</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{ color: h ? T.sage : T.muted, transition: "color 0.32s ease" }}>{step.icon}</span>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "17px", color: T.forest, margin: 0, lineHeight: 1.3 }}>{step.title}</h3>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "15px", color: T.muted, margin: 0, lineHeight: 1.8 }}>{step.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function FAQItem({ item, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div style={{ borderBottom: `1px solid ${T.border}` }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            padding: "28px 0", background: "none", border: "none", cursor: "pointer",
            textAlign: "left", gap: "16px",
          }}
        >
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "clamp(15px, 2vw, 18px)", color: T.forest, lineHeight: 1.6, display: "block", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", overflow: "visible" }}>
            {item.q}
          </span>
          {/* Chevron */}
          <span style={{
            flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%",
            background: open ? T.forest : T.bgAlt,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.28s ease",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={open ? "#ffffff" : T.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s ease" }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </button>
        {open && (
          <div style={{ paddingBottom: "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {item.a.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", color: T.muted, lineHeight: 1.85, margin: 0, maxWidth: "820px" }}>
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function PartnerPage({ setPage }) {
  return (
    <>
      {/* ── Page header ── */}
      <section style={{ background: T.bgDark, padding: `140px ${S.gutter} 100px`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "900px", height: "300px", background: "radial-gradient(ellipse, rgba(121,164,126,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: S.maxW, margin: "0 auto", position: "relative" }}>
          <Reveal delay={0.05}><Eyebrow>Partner With Us</Eyebrow></Reveal>
          <Reveal delay={0.12}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.08,
              letterSpacing: "-0.025em", color: "#ffffff", margin: "0 0 24px", maxWidth: "720px",
            }}>
              A <span style={{ color: T.sage }}>Partnership</span> Built<br />
              to Last
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.6)",
              lineHeight: 1.85, maxWidth: "560px",
            }}>
              Our process is straightforward, respectful of your time, and designed to build trust from day one. We move quickly, keep diligence focused and non-invasive, with emphasis on cultural fit and shared vision.
            </p>
          </Reveal>
        </div>
      </section>
      <Divider light />

      {/* ── Process steps ── */}
      <section style={{ background: T.bgCard, padding: `clamp(32px, 4vw, 52px) ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.8vw, 46px)", color: T.forest, letterSpacing: "-0.022em", lineHeight: 1.12, margin: 0 }}>
                Our Partnership Process
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {processSteps.map((step, i) => (
              <ProcessStep key={step.num} step={step} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>
      <Divider />

      {/* ── FAQ ── */}
      <section style={{ background: T.bgAlt, padding: `clamp(32px, 4vw, 52px) ${S.gutter}` }}>
        <div style={{ maxWidth: S.maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <Eyebrow>FAQ</Eyebrow>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.8vw, 46px)", color: T.forest, letterSpacing: "-0.022em", lineHeight: 1.12 }}>
                Your Most Frequent Questions
              </h2>
            </div>
          </Reveal>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* Top border */}
            <div style={{ borderTop: `1px solid ${T.border}` }} />
            {faqItems.map((item, i) => (
              <FAQItem key={i} item={item} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>
      <Divider />

      {/* ── CTA ── */}
      <section style={{ background: T.bgDark, padding: `${S.section} ${S.gutter}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "280px", background: "radial-gradient(ellipse, rgba(121,164,126,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <Eyebrow>Get In Touch</Eyebrow>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5.5vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#ffffff", margin: "0 0 20px" }}>
              Do You Want{" "}<span style={{ color: T.sage }}>To Join?</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "17px", color: "rgba(255,255,255,0.58)", lineHeight: 1.8, margin: "0 0 44px" }}>
              We are always looking for exceptional businesses and founders to partner with.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <CTABtn primary onClick={() => setPage("contact")}>Contact Us</CTABtn>
            </div>
          </Reveal>
        </div>
      </section>
      <Divider light />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT US PAGE
   ══════════════════════════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xeelrzqy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "15px",
    color: T.forest, background: "#ffffff",
    border: `1.5px solid ${T.sageBorder}`,
    borderRadius: "10px", padding: "14px 18px",
    outline: "none", transition: "border-color 0.2s",
    lineHeight: 1.5,
  };

  return (
    <>
      {/* ── Form + Image ── */}
      <section style={{ background: T.bgPage, padding: `${S.section} ${S.gutter}`, paddingTop: "120px" }}>
        <div className="contact-grid" style={{ maxWidth: S.maxW, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "stretch" }}>

          {/* Left: Form */}
          <Reveal delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <Eyebrow>Send Us a Message</Eyebrow>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 40px)", color: T.forest, letterSpacing: "-0.022em", lineHeight: 1.12, margin: "0 0 12px" }}>
                Let's Talk
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "15px", color: T.muted, lineHeight: 1.8, margin: "0 0 36px" }}>
                If you are interested in exploring a partnership, or simply would like to know more, we would love to hear from you.
              </p>

              {status === "success" ? (
                <div style={{
                  flex: 1, borderRadius: "16px", background: "rgba(121,164,126,0.08)",
                  border: `1.5px solid ${T.sage}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "48px", textAlign: "center", gap: "16px",
                }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: T.sage, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: T.forest, margin: 0 }}>Message Sent</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                  {/* Name + Phone row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      placeholder="Full Name *"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = T.sage}
                      onBlur={e => e.target.style.borderColor = T.sageBorder}
                    />
                    <input
                      type="tel" name="phone"
                      value={form.phone} onChange={handleChange}
                      placeholder="Phone Number"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = T.sage}
                      onBlur={e => e.target.style.borderColor = T.sageBorder}
                    />
                  </div>

                  {/* Email */}
                  <input
                    type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="Email Address *"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = T.sage}
                    onBlur={e => e.target.style.borderColor = T.sageBorder}
                  />

                  {/* Message */}
                  <textarea
                    name="message" required
                    value={form.message} onChange={handleChange}
                    placeholder="Your Message *"
                    rows={6}
                    style={{ ...inputStyle, resize: "vertical", flex: 1, minHeight: "160px" }}
                    onFocus={e => e.target.style.borderColor = T.sage}
                    onBlur={e => e.target.style.borderColor = T.sageBorder}
                  />

                  {status === "error" && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#c0392b", margin: 0 }}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  {/* Submit */}
                  <SubmitButton sending={status === "sending"} />
                </form>
              )}
            </div>
          </Reveal>

          {/* Right: Image */}
          <Reveal delay={0.15} style={{ display: "contents" }}>
            <div className="contact-image" style={{
              borderRadius: "20px", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(35,51,41,0.16)",
              height: "100%", minHeight: "520px",
              position: "relative",
            }}>
              <img
                src={contactBg}
                alt="Plans and instruments on a desk"
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

function SubmitButton({ sending }) {
  const [h, setH] = useState(false);
  return (
    <button
      type="submit"
      disabled={sending}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "15px",
        padding: "15px 40px", borderRadius: "100px", cursor: sending ? "not-allowed" : "pointer",
        border: "none", transition: "all 0.22s ease",
        background: sending ? T.muted : (h ? "#4a7050" : T.forest),
        color: "#ffffff",
        alignSelf: "flex-start",
        letterSpacing: "0.01em",
        display: "flex", alignItems: "center", gap: "10px",
      }}
    >
      {sending ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" style={{ animation: "spin 1s linear infinite" }}>
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/>
            <path d="M21 12a9 9 0 00-9-9"/>
          </svg>
          Sending…
        </>
      ) : (
        <>
          Send Message
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </>
      )}
    </button>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{
      background: T.bgDark,
      padding: `32px ${S.gutter}`,
      display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "16px",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", justifySelf: "start" }}>
        <button
          onClick={() => setPage("home")}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "18px", color: "#ffffff", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          Kadence Group<span style={{ color: T.sage, fontWeight: 600 }}> Safety</span>
        </button>
        <a
          href="mailto:contact@kadencegroup.co.uk"
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400,
            color: "rgba(255,255,255,0.42)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.42)"}
        >
          contact@kadencegroup.co.uk
        </a>
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { label: "Home",           page: "home" },
          { label: "About Us",       page: "about" },
          { label: "How to Partner", page: "partner" },
          { label: "Contact Us",     page: "contact" },
        ].map(({ label, page }) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.42)"}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400,
              color: "rgba(255,255,255,0.42)", background: "none", border: "none",
              cursor: "pointer", padding: 0, transition: "color 0.2s",
            }}
          >{label}</button>
        ))}
      </div>

      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.28)", textAlign: "right", justifySelf: "end" }}>
        © 2026 Kadence Group Limited. All rights reserved.
      </div>
    </footer>
  );
}

/* ── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const setPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  return (
    <>
      <GlobalStyles />
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <Nav currentPage={currentPage} setPage={setPage} />

      {currentPage === "home" && (
        <>
          <Hero setPage={setPage} />
          <Mission />
          <Focus />
          <Benefits />
          <HomeCTA setPage={setPage} />
        </>
      )}

      {currentPage === "about" && (
        <AboutPage setPage={setPage} />
      )}

      {currentPage === "partner" && (
        <PartnerPage setPage={setPage} />
      )}

      {currentPage === "contact" && (
        <ContactPage />
      )}

      <Footer setPage={setPage} />
    </>
  );
}
