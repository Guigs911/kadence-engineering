import { useState, useEffect, useRef } from "react";

/* ── TOKENS — Clear Sky palette ─────────────────────────── */
const C = {
  bg:        "#EEF4FB",   // page background — airy blue-white
  bgAlt:     "#E6EFF9",   // slightly deeper for alternating sections
  bgCard:    "#FFFFFF",   // cards
  navy:      "#1A3A6B",   // primary text + nav
  accent:    "#2B7FE0",   // electric blue — links, icons, labels
  gold:      "#E8A020",   // amber — CTAs, dividers, highlights
  text:      "#1A3A6B",   // body text
  muted:     "#6B82A0",   // secondary text
  border:    "rgba(43,127,224,0.15)",
  goldBorder:"rgba(232,160,32,0.5)",
};

/* ── DIVIDER ─────────────────────────────────────────────── */
function Divider() {
  return (
    <div style={{
      width: "100%", height: "1px",
      background: `linear-gradient(90deg, transparent 0%, ${C.goldBorder} 20%, rgba(232,160,32,0.9) 50%, ${C.goldBorder} 80%, transparent 100%)`,
    }}/>
  );
}

/* ── INTERSECTION HOOK ───────────────────────────────────── */
function useInView(threshold = 0.12) {
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
      transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── SHARED LABEL ────────────────────────────────────────── */
function Label({ children, light = false }) {
  return (
    <div style={{
      display: "inline-block",
      fontFamily: "'DM Mono', monospace",
      fontSize: "10px", letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: light ? C.gold : C.accent,
      border: `1px solid ${light ? "rgba(232,160,32,0.4)" : "rgba(43,127,224,0.3)"}`,
      borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
      background: light ? "rgba(232,160,32,0.08)" : "rgba(43,127,224,0.07)",
    }}>{children}</div>
  );
}

/* ── NAV ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 52px", height: "68px",
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <div style={{
        fontFamily: "'Sora', sans-serif", fontWeight: 800,
        fontSize: "20px", letterSpacing: "0.01em",
        color: scrolled ? C.navy : "#ffffff",
        transition: "color 0.35s ease",
      }}>
        Kadence
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        {["Home", "About Us", "How to Partner"].map(l => (
          <a key={l} href="#" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
            color: scrolled ? C.muted : "rgba(255,255,255,0.75)",
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = scrolled ? C.navy : "#ffffff"}
            onMouseLeave={e => e.target.style.color = scrolled ? C.muted : "rgba(255,255,255,0.75)"}
          >{l}</a>
        ))}
        <button style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600,
          color: "#ffffff", background: C.gold,
          border: "none", borderRadius: "6px", padding: "9px 22px", cursor: "pointer",
          boxShadow: "0 2px 8px rgba(232,160,32,0.35)",
        }}>Contact Us</button>
      </div>
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <>
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, #1a3a6c 0%, #1e4278 45%, #2456a4 100%)`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Dot grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none",
        }}/>
        {/* Bottom glow */}
        <div style={{
          position: "absolute", bottom: "-40px", left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "320px",
          background: "radial-gradient(ellipse, rgba(232,160,32,0.12) 0%, transparent 68%)",
          pointerEvents: "none",
        }}/>
        {/* Top-right soft light */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(100,160,255,0.12) 0%, transparent 68%)",
          pointerEvents: "none",
        }}/>

        <div style={{ position: "relative", maxWidth: "780px" }}>
          <Reveal delay={0}>
            <Label light>Building a National Leader in H&S</Label>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 800,
              fontSize: "clamp(40px, 6.5vw, 72px)",
              color: "#ffffff", lineHeight: 1.06,
              letterSpacing: "-0.025em", margin: "0 0 40px",
            }}>
              Redefining Health &amp; Safety
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              <button style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "15px",
                background: C.gold, color: "#ffffff",
                border: "none", borderRadius: "8px", padding: "14px 32px", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(232,160,32,0.4)",
              }}>Partner With Us</button>
              <button style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "15px",
                background: "rgba(255,255,255,0.1)", color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px",
                padding: "14px 32px", cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}>Learn More</button>
            </div>
          </Reveal>
        </div>

        <div style={{
          position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)" }}>SCROLL</div>
          <div style={{ width: "1px", height: "32px", background: `linear-gradient(${C.gold}, transparent)` }}/>
        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── MISSION ─────────────────────────────────────────────── */
function Mission() {
  return (
    <>
      <section style={{ background: C.bgCard, padding: "100px 52px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Reveal delay={0}><Label>Our Mission</Label></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 800,
              fontSize: "clamp(30px, 4vw, 46px)",
              color: C.navy, letterSpacing: "-0.02em",
              lineHeight: 1.15, margin: "0 0 48px",
            }}>
              Bringing together the best in{" "}
              <span style={{ color: C.accent }}>Health &amp; Safety</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
            <Reveal delay={0.15}>
              <div style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: "24px" }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: "17px", fontWeight: 600,
                  color: C.navy, lineHeight: 1.7, margin: 0,
                }}>
                  We bring together the best entrepreneurs in Health &amp; Safety, Training, and Compliance services to create the partner of choice for businesses seeking to protect their people, assets, and the environment.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: "24px" }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
                  color: C.muted, lineHeight: 1.85, margin: 0,
                }}>
                  We acquire, support, and grow specialist firms through shared resources, technology, and capital — raising the standard of workplace safety across the UK.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── FOCUS ───────────────────────────────────────────────── */
const focusItems = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
    title: "Health & Safety Services",
    body: "Helping businesses maintain safe working environments and protect their people across industries.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>),
    title: "Compliance Services",
    body: "Ensuring organisations meet regulatory standards and maintain ongoing compliance with evolving legislation.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>),
    title: "Training & Accreditation",
    body: "Professional development programmes and certification services to upskill teams and ensure industry compliance.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>),
    title: "Risk Management & ESG Consulting",
    body: "Advisory services to identify, assess, and mitigate operational, environmental, social, and governance risks.",
  },
];

function FocusCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "14px", padding: "32px",
        minHeight: "190px", display: "flex", gap: "20px", alignItems: "flex-start",
        position: "relative", overflow: "hidden", cursor: "default",
        background: hov ? "#ffffff" : C.bgCard,
        border: hov ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
        boxShadow: hov
          ? `0 12px 40px rgba(232,160,32,0.12), 0 2px 8px rgba(43,127,224,0.08)`
          : "0 2px 12px rgba(26,58,107,0.06)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0, width: "180px", height: "180px",
        background: `radial-gradient(circle at top right, rgba(43,127,224,0.06), transparent 65%)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none",
      }}/>
      <div style={{
        width: "48px", height: "48px", borderRadius: "10px", flexShrink: 0,
        background: hov ? `rgba(43,127,224,0.12)` : `rgba(43,127,224,0.08)`,
        border: `1px solid ${hov ? "rgba(43,127,224,0.3)" : "rgba(43,127,224,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: C.accent, transition: "all 0.3s ease",
      }}>{item.icon}</div>
      <div>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "16px", color: C.navy, margin: "0 0 10px", lineHeight: 1.3 }}>{item.title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.muted, margin: 0, lineHeight: 1.75 }}>{item.body}</p>
      </div>
    </div>
  );
}

function Focus() {
  return (
    <>
      <section style={{ background: C.bg, padding: "100px 52px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <Label>Our Focus</Label>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: C.navy, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
                Where We Partner
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: C.muted, maxWidth: "460px", margin: "0 auto", lineHeight: 1.75 }}>
                We are looking to partner with exceptional businesses and entrepreneurs operating in the following areas:
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {focusItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <FocusCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── BENEFITS ────────────────────────────────────────────── */
const benefits = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>),
    title: "Central Services To Free Up Time on What Really Matters",
    body: "We will remove your administrative burden by centralising back-office functions, allowing you to focus entirely on client service excellence and team leadership.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>),
    title: "Technological Support for Digitalization and Growth",
    body: "We provide modern software and tech stack to every company in the group, enabling you and your teams to work more efficiently, securely, and to the highest standards.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>),
    title: "National Scale to Strengthen Local Execution",
    body: "You will be able to leverage the reach, reputation, and capabilities of a national platform to win larger contracts, expand service offerings, and attract best-in-class talent.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>),
    title: "Bigger Financial Upside",
    body: "You will be able to participate in the financial upside of being part of a large and diversified national group, whilst retaining operational independence and local identity.",
  },
];

function BenCard({ b }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "14px", padding: "36px 32px", minHeight: "190px",
        position: "relative", overflow: "hidden", cursor: "default",
        background: hov ? "#ffffff" : C.bgCard,
        border: hov ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
        boxShadow: hov
          ? "0 12px 40px rgba(232,160,32,0.12), 0 2px 8px rgba(43,127,224,0.08)"
          : "0 2px 12px rgba(26,58,107,0.06)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0, width: "180px", height: "180px",
        background: "radial-gradient(circle at top right, rgba(232,160,32,0.07), transparent 65%)",
        opacity: hov ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none",
      }}/>
      <div style={{
        width: "48px", height: "48px", borderRadius: "10px", marginBottom: "20px",
        background: hov ? "rgba(232,160,32,0.14)" : "rgba(43,127,224,0.08)",
        border: `1px solid ${hov ? "rgba(232,160,32,0.35)" : "rgba(43,127,224,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? C.gold : C.accent,
        transition: "all 0.3s ease",
      }}>{b.icon}</div>
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "17px", color: C.navy, margin: "0 0 12px", lineHeight: 1.35 }}>{b.title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: C.muted, margin: 0, lineHeight: 1.75 }}>{b.body}</p>
    </div>
  );
}

function Benefits() {
  return (
    <>
      <section style={{ background: C.bgAlt, padding: "100px 52px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <Label>Why Join Kadence Safety</Label>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: C.navy, letterSpacing: "-0.02em", margin: 0 }}>
                Benefits from Joining the Group
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <BenCard b={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── CTA ─────────────────────────────────────────────────── */
function CTA() {
  return (
    <>
      <section style={{
        background: `linear-gradient(160deg, #1a3a6c 0%, #1e4278 50%, #2456a4 100%)`,
        padding: "100px 52px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: "-40px", left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "250px",
          background: "radial-gradient(ellipse, rgba(232,160,32,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <Label light>Get In Touch</Label>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 54px)",
              color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 20px",
            }}>Do You Want To Join?</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: "0 0 40px" }}>
              We are always looking for exceptional businesses and founders to partner with. If you're ready to grow with the group, we'd love to hear from you.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              <button style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "15px",
                background: C.gold, color: "#ffffff",
                border: "none", borderRadius: "8px", padding: "15px 36px", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(232,160,32,0.4)",
              }}>Contact Us</button>
              <button style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "15px",
                background: "rgba(255,255,255,0.1)", color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px",
                padding: "15px 36px", cursor: "pointer", backdropFilter: "blur(4px)",
              }}>Learn How to Partner →</button>
            </div>
          </Reveal>
        </div>
      </section>
      <Divider />
    </>
  );
}

/* ── FOOTER ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: C.navy,
      padding: "32px 52px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "18px", color: "#ffffff" }}>Kadence</div>
      <div style={{ display: "flex", gap: "32px" }}>
        {["Home", "About Us", "How to Partner"].map(l => (
          <a key={l} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>© 2026 Kadence. All rights reserved.</div>
    </footer>
  );
}

/* ── APP ─────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { background: ${C.bg}; overflow-x: hidden; } html { overflow-x: hidden; }`}</style>
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
