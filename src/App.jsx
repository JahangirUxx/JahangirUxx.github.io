import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, ArrowDown, Menu, X, Mail, Linkedin,
  Dribbble, Check, Paperclip, Sparkles
} from "lucide-react";

const FORM_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/REPLACE_ME";

const projects = [
  {
    number: "01",
    title: "iTalk",
    category: "AI / SaaS / Web",
    description:
      "A modern AI voice-agent experience designed to help businesses create, launch, and manage intelligent voice conversations with clarity and ease.",
    className: "project-a",
    image: "/images/italk.png",
    href: "https://www.behance.net/gallery/254054857/AI-Voice-Agent-SaaS-Website-UIUX-Design"
  },

  {
    number: "02",
    title: "Hablax",
    category: "Commerce / Fintech / Web",
    description:
      "A global digital commerce experience for gift cards, gaming, mobile recharges, eSIMs, entertainment, and everyday digital services across 200+ countries.",
    className: "project-b",
    image: "/images/hablax.webp",
    href: "https://www.hablax.com/"
  },

  {
    number: "03",
    title: "True Wallet",
    category: "Web3 / Fintech / Mobile",
    description:
      "A secure Web3 wallet experience focused on clear user flows, intuitive crypto interactions, and a premium mobile-first financial experience.",
    className: "project-c",
    image: "/images/true-wallet.webp",
    href: "https://www.behance.net/gallery/250327661/Web3-Crypto-Wallet-Mobile-App-UIUX-Design-Case-Study"
  },

  {
    number: "04",
    title: "MonPay",
    category: "Fintech / Mobile / UX",
    description:
      "A fintech onboarding redesign focused on making account setup clearer, smoother, and more approachable through a streamlined mobile experience.",
    className: "project-d",
    image: "/images/monpay.webp",
    href: "https://www.behance.net/gallery/249207727/MonPay-Redesigning-Fintech-Onboarding-UX-Case-Study"
  },
const services = [
  ["01", "UI/UX Design", "Product strategy, user flows, wireframes, prototypes and polished interfaces."],
  ["02", "Web Design", "Conversion-focused landing pages and responsive websites for modern brands."],
  ["03", "Visual Design", "Brand systems, marketing assets, presentations and digital experiences."],
  ["04", "Design to Code", "Turning high-fidelity designs into responsive, production-ready frontends."]
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    if (FORM_ENDPOINT.includes("REPLACE_ME")) {
      alert("Connect your Formspree endpoint first. See README.md.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
  const errorData = await res.json().catch(() => null);
  console.error("Formspree error:", errorData);
  throw new Error("Submission failed");
}
      form.reset();
      setSent(true);
    } catch {
      alert("Something went wrong. Please email me directly at jahangirux@gmail.com.");
    } finally {
      setSending(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <div className="site">
      <div className="progress" style={{ width: `${progress}%` }} />

      <header className="nav">
        <button className="logo" onClick={() => scrollTo("top")}>JH<span>.</span></button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("services")}>Services</button>
          <button className="nav-cta" onClick={() => scrollTo("contact")}>Start a project <ArrowUpRight size={15}/></button>
        </nav>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">
          {menu ? <X/> : <Menu/>}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-grid" />
          <Reveal className="eyebrow"><span className="status-dot"/> Available for selected projects</Reveal>
          <Reveal className="hero-copy" delay={80}>
            <p className="kicker">UI/UX • VISUAL • FRONTEND</p>
            <h1>I design digital<br/><em>experiences</em><br/>people remember.</h1>
            <p className="hero-sub">I’m Jahangir Hussain — a UI/UX & Visual Designer creating premium websites, digital products and brand experiences for ambitious teams.</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => scrollTo("work")}>Explore my work <ArrowDown size={17}/></button>
              <button className="secondary" onClick={() => scrollTo("contact")}>Hire me <ArrowUpRight size={17}/></button>
            </div>
          </Reveal>
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
          <div className="hero-meta"><span>Based in Pakistan</span><span>Working globally</span><span>GMT+5</span></div>
        </section>

        <section className="marquee" aria-label="Capabilities">
          <div>PRODUCT DESIGN <span>✦</span> WEB EXPERIENCES <span>✦</span> VISUAL SYSTEMS <span>✦</span> FRONTEND <span>✦</span> PRODUCT DESIGN <span>✦</span></div>
        </section>

        <section id="work" className="section work">
          <Reveal className="section-head">
            <p className="label">Selected work / 2026</p>
            <h2>Built to make<br/><em>an impression.</em></h2>
            <p className="section-intro">A selection of product, web and visual design work focused on clarity, craft and measurable impact.</p>
          </Reveal>
          <div className="projects">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <a className={`project ${p.className}`} href={p.href} target="_blank" rel="noreferrer">
                  <div className="project-art">
  {p.title === "Hablax" ? (
    <div className="art-window">
      <div className="art-bar"/>
      <div className="art-lines"/>
      <div className="art-card"/>
      <div className="art-pill"/>
    </div>
  ) : (
    <img
      src={p.image}
      alt={`${p.title} project preview`}
    />
  )}
</div>
                  <div className="project-info">
                    <span>{p.number} / {p.category}</span><h3>{p.title} <ArrowUpRight size={23}/></h3><p>{p.description}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <Reveal className="about-label"><p className="label">About me</p></Reveal>
          <Reveal className="about-content" delay={100}>
            <h2>Good design is<br/><em>felt before it’s explained.</em></h2>
            <p>I’m a UI/UX and Visual Designer with 3+ years of experience working across digital products, websites, fintech, SaaS and brand experiences. I care about the details that turn a functional interface into something people genuinely enjoy using.</p>
            <p>I work with Figma, Photoshop and Illustrator, and I’m increasingly shipping responsive frontend experiences with modern web tooling and AI-assisted development workflows.</p>
            <div className="about-links">
              <a href="https://www.behance.net/JahangirHussaini" target="_blank" rel="noreferrer">Behance <ArrowUpRight size={16}/></a>
              <a href="https://www.linkedin.com/in/jahangirhussaini/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a>
            </div>
          </Reveal>
        </section>

        <section id="services" className="section services">
          <Reveal className="section-head">
            <p className="label">What I do</p><h2>Design with<br/><em>purpose.</em></h2>
          </Reveal>
          <div className="service-list">
            {services.map(([n,t,d], i) => <Reveal key={t} delay={i*80}><div className="service"><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight/></div></Reveal>)}
          </div>
        </section>

        <section className="statement">
          <Reveal><Sparkles size={22}/><h2>Let’s make something<br/><em>worth remembering.</em></h2><button className="primary" onClick={() => scrollTo("contact")}>Start a conversation <ArrowUpRight size={17}/></button></Reveal>
        </section>

        <section id="contact" className="section contact">
          <Reveal className="contact-intro"><p className="label">Start a project</p><h2>Tell me what<br/><em>you’re building.</em></h2><p>Have a project in mind? Send the details and I’ll get back to you with next steps.</p><a href="mailto:jahangirux@gmail.com"><Mail size={17}/> jahangirux@gmail.com</a></Reveal>

          <Reveal className="form-wrap" delay={100}>
            <form onSubmit={submit} encType="multipart/form-data">
              <div className="form-row">
                <label>Full name<input required name="name" placeholder="John Smith"/></label>
                <label>Email<input required type="email" name="email" placeholder="john@company.com"/></label>
              </div>
              <div className="form-row">
                <label>Company / Brand<input name="company" placeholder="Company name"/></label>
                <label>Project type<select required name="project_type" defaultValue=""><option value="" disabled>Select one</option><option>Website</option><option>Mobile App</option><option>SaaS / Dashboard</option><option>UI/UX Product Design</option><option>Branding / Visual Design</option><option>Other</option></select></label>
              </div>
              <label>Project description<textarea required name="description" rows="6" placeholder="Tell me about your goals, users, scope and anything important..."/></label>
              <div className="form-row">
                <label>Estimated budget<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>$500 – $1,000</option><option>$1,000 – $2,500</option><option>$2,500 – $5,000</option><option>$5,000+</option><option>Not sure — recommend a budget</option></select></label>
                <label>Timeline<select name="timeline" defaultValue=""><option value="" disabled>Select timeline</option><option>ASAP</option><option>1–2 weeks</option><option>3–4 weeks</option><option>1–2 months</option><option>Flexible</option></select></label>
              </div>
              <input type="hidden" name="_subject" value="New Portfolio Project Inquiry — Jahangir Hussain"/>
              <input type="hidden" name="_gotcha" />
              {sent && <div className="success"><Check size={17}/> Thanks — your inquiry has been sent. I’ll get back to you within 24–48 hours.</div>}
              <button className="submit" disabled={sending}>{sending ? "Sending..." : "Send project inquiry"} <ArrowUpRight size={18}/></button>
              <small>By submitting this form, you agree to be contacted about your project.</small>
            </form>
          </Reveal>
        </section>
      </main>

      <footer>
        <div><strong>JH<span>.</span></strong><p>UI/UX & Visual Designer</p></div>
        <div className="footer-links"><a href="mailto:jahangirux@gmail.com"><Mail size={16}/> Email</a><a href="https://www.linkedin.com/in/jahangirhussaini/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a href="https://www.behance.net/JahangirHussaini" target="_blank" rel="noreferrer"><Dribbble size={16}/> Behance</a></div>
        <p>© {new Date().getFullYear()} Jahangir Hussain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
