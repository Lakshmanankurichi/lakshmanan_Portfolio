/* ============================================================
   MAIN.JS — All interactions and DOM rendering
   Content lives in data.js — don't edit strings here
   ============================================================ */

/* ── LOADER ── */
(function initLoader() {
  const bar  = document.getElementById("lbar");
  const pct  = document.getElementById("lpct");
  const ldr  = document.getElementById("ldr");
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 7 + 2;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      setTimeout(() => {
        ldr.classList.add("out");
        setTimeout(() => {
          ldr.style.display = "none";
          setTimeout(() => {
            document.getElementById("focus").style.opacity = "1";
          }, 1800);
        }, 700);
      }, 350);
    }
    bar.style.width = p + "%";
    pct.textContent = Math.floor(p) + "%";
  }, 60);
})();

document.getElementById("focus").style.opacity = "0";
document.getElementById("focus").style.transition = "opacity .5s ease";

/* ── PARTICLE CANVAS ── */
(function initCanvas() {
  const c   = document.getElementById("hcvs");
  if (!c) return;
  const ctx = c.getContext("2d");
  const m   = { x: innerWidth / 2, y: innerHeight / 2 };
  const resize = () => { c.width = innerWidth; c.height = innerHeight; };
  resize();
  addEventListener("resize", resize);
  document.addEventListener("mousemove", e => { m.x = e.clientX; m.y = e.clientY; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * c.width;
      this.y  = Math.random() * c.height;
      this.s  = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.a  = Math.random() * 0.12 + 0.04;
    }
    update() {
      const dx = m.x - this.x, dy = m.y - this.y, d = Math.hypot(dx, dy);
      if (d < 140) { this.vx -= dx * 0.001; this.vy -= dy * 0.001; }
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > c.width || this.y < 0 || this.y > c.height) this.reset();
    }
    draw() {
      ctx.globalAlpha = this.a;
      ctx.fillStyle = "#064d43";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const ps = Array.from({ length: 80 }, () => new Particle());
  const anim = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 80) {
          ctx.globalAlpha = (1 - d / 80) * 0.04;
          ctx.strokeStyle = "#064d43";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(ps[i].x, ps[i].y);
          ctx.lineTo(ps[j].x, ps[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(anim);
  };
  anim();
})();

/* ── CURSOR ── */
(function initCursor() {
  const dot = document.getElementById("cdot");
  const rng = document.getElementById("crng");
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });
  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    rng.style.left = rx + "px"; rng.style.top = ry + "px";
    requestAnimationFrame(loop);
  })();
  const hoverEls = "a, button, .cs, .aic, .logo-item, .pstep, .skill-group, .fp-mood, .aisgb, .fpb";
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("hov"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("hov"));
  });
  // Magnetic CTAs
  document.querySelectorAll(".btn-primary, .btn-secondary, .n-cta").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
      document.body.classList.add("mag");
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
      document.body.classList.remove("mag");
    });
  });
})();

/* ── SCROLL PROGRESS ── */
window.addEventListener("scroll", () => {
  const fill = document.getElementById("prgfill");
  if (fill) fill.style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + "%";
});

/* ── HERO PARALLAX ── */
document.addEventListener("mousemove", e => {
  const x = (e.clientX / innerWidth - 0.5) * 20;
  const y = (e.clientY / innerHeight - 0.5) * 10;
  document.querySelectorAll(".hcard").forEach((card, i) => {
    const f = (i + 1) * 0.4;
    card.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
});

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".rv").forEach(el => ob.observe(el));
})();

/* ── RENDER: CLIENT LOGOS ── */
(function renderLogos() {
  const wrap = document.getElementById("logos-row");
  if (!wrap) return;
  CLIENTS.forEach(c => {
    const div = document.createElement("div");
    div.className = "logo-item";
    div.innerHTML = `<img src="assets/logos/${c.file}" alt="${c.name}" loading="lazy">`;
    wrap.appendChild(div);
  });
})();

/* ── RENDER: PROOF METRICS ── */
(function renderProof() {
  const wrap = document.getElementById("hero-proof");
  if (!wrap) return;
  SITE.proof.forEach((p, i) => {
    if (i > 0) {
      const div = document.createElement("div");
      div.className = "proof-div";
      wrap.appendChild(div);
    }
    const item = document.createElement("div");
    item.className = "proof-item";
    item.innerHTML = `<div class="proof-val">${p.value}</div><div class="proof-lbl">${p.label}</div>`;
    wrap.appendChild(item);
  });
})();

/* ── RENDER: CASE STUDIES ── */
(function renderProjects() {
  const list = document.getElementById("cs-list");
  if (!list) return;
  PROJECTS.forEach(p => {
    const el = document.createElement("div");
    el.className = "cs rv" + (p.reversed ? " rev" : "");
    el.dataset.id = p.id;
    const tags  = p.tags.map(t => `<span class="cs-tag">${t}</span>`).join("");
    const mets  = p.metrics.map(m => `<div class="cs-met"><div class="cs-met-v">${m.value}</div><div class="cs-met-l">${m.label}</div></div>`).join("");
    el.innerHTML = `
      <div class="cs-img">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="cs-img-ov"></div>
      </div>
      <div class="cs-body">
        <div>
          <div class="cs-num">${p.num}</div>
          <div class="cs-company">${p.company} · ${p.year}</div>
          <h3 class="cs-title">${p.title}</h3>
          <div class="cs-problem">${p.problem}</div>
          <p class="cs-brief">${p.brief}</p>
          <div class="cs-tags">${tags}</div>
        </div>
        <div>
          <div class="cs-metrics">${mets}</div>
          <a href="${p.behance}" target="_blank" rel="noopener" class="cs-cta">View on Behance <span class="cs-cta-arr">↗</span></a>
        </div>
      </div>`;
    el.addEventListener("click", () => openCS(p.id));
    list.appendChild(el);
  });
  // Re-init reveal for dynamically added elements
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
  list.querySelectorAll(".rv").forEach(el => ob.observe(el));
})();

/* ── CASE STUDY PANEL ── */
function openCS(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const d = p.detail;
  document.getElementById("csp-label").textContent = `${p.company} · ${p.year}`;
  const exec  = d.exec.map(e => `<div class="ec"><div class="ec-l">${e.label}</div><div class="ec-v">${e.value}</div></div>`).join("");
  const mets  = d.metrics ? p.metrics.map(m => `<div class="mc"><div class="mc-v">${m.value}</div><div class="mc-l">${m.label}</div></div>`).join("") : "";
  const decs  = d.decisions.map(dec => `<div class="dec-block"><div class="dec-q">${dec.q}</div><div class="dec-a">${dec.a}</div></div>`).join("");
  const cons  = d.constraints.map(c => `<div class="con-row"><span class="con-l">${c.label}</span><span class="con-v">${c.value}</span></div>`).join("");
  const roles = d.roles.map(r => `<span class="rpill">${r}</span>`).join("");
  document.getElementById("csp-body").innerHTML = `
    <div class="sp-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
    <div class="sp-kicker">${p.company} · ${p.year}</div>
    <h2 class="sp-title">${p.title}</h2>
    <div class="exec-grid">${exec}</div>
    <div class="sp-sec"><h3 class="sp-sh">Metrics</h3><div class="metrics-row">${mets}</div></div>
    <div class="sp-sec"><h3 class="sp-sh">Context</h3><p class="sp-p">${d.context}</p></div>
    <div class="sp-sec"><h3 class="sp-sh">The Real Problem</h3><p class="sp-p">${d.problem}</p></div>
    <div class="sp-sec"><h3 class="sp-sh">Key Design Decisions</h3>${decs}</div>
    <div class="sp-sec"><h3 class="sp-sh">Constraints</h3><div style="background:var(--faint2);border-radius:8px;padding:20px">${cons}</div></div>
    <div class="sp-sec"><h3 class="sp-sh">My Contribution · ${d.contrib}%</h3>
      <div class="contrib-bar"><div class="contrib-fill" style="width:${d.contrib}%"></div></div>
      <div class="contrib-labels"><span>Individual (${d.contrib}%)</span><span>Team (${100 - d.contrib}%)</span></div>
      <div class="role-pills">${roles}</div>
    </div>
    <a href="${p.behance}" target="_blank" rel="noopener" class="behance-btn">View Full Case Study on Behance ↗</a>
    <div class="sp-note">Full walkthrough available on request · ${SITE.email}</div>`;
  document.getElementById("cs-overlay").classList.add("open");
  document.getElementById("cs-panel").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCS() {
  document.getElementById("cs-overlay").classList.remove("open");
  document.getElementById("cs-panel").classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("cs-overlay").addEventListener("click", closeCS);
document.getElementById("cs-panel").addEventListener("click", e => e.stopPropagation());

/* ── RENDER: PROCESS STEPS ── */
(function renderProcess() {
  const wrap = document.getElementById("process-steps");
  if (!wrap) return;
  PROCESS_STEPS.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = `pstep rv${i > 0 ? " d" + Math.min(i, 4) : ""}`;
    el.innerHTML = `<div class="pstep-num"><span class="pstep-ico">${s.icon}</span></div><div class="pstep-name">${s.name}</div><div class="pstep-desc">${s.desc}</div>`;
    wrap.appendChild(el);
  });
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); } });
  }, { threshold: 0.1 });
  wrap.querySelectorAll(".rv").forEach(el => ob.observe(el));
})();

/* ── RENDER: PHILOSOPHY ── */
(function renderPhilosophy() {
  const itemsWrap = document.getElementById("phil-items");
  if (!itemsWrap) return;
  PHILOSOPHY.items.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = `phil-item rv${i > 0 ? " d" + Math.min(i, 4) : ""}`;
    el.innerHTML = `<div class="phil-item-hed">${item.heading}</div><div class="phil-item-body">${item.body}</div>`;
    itemsWrap.appendChild(el);
  });
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); } });
  }, { threshold: 0.06 });
  itemsWrap.querySelectorAll(".rv").forEach(el => ob.observe(el));
})();

/* ── RENDER: ABOUT AWARDS ── */
(function renderAwards() {
  const wrap = document.getElementById("awards-list");
  if (!wrap) return;
  SITE.awards.forEach(a => {
    const el = document.createElement("div");
    el.className = "award-row";
    el.innerHTML = `<div class="award-ico">${a.icon}</div>${a.text}`;
    wrap.appendChild(el);
  });
})();

/* ── RENDER: CAPABILITIES ── */
(function renderCaps() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  CAPABILITIES.forEach(cap => {
    const el = document.createElement("div");
    el.className = "skill-group rv";
    const items = cap.items.map(i => `<div class="sg-item">${i}</div>`).join("");
    el.innerHTML = `<span class="sg-icon">${cap.icon}</span><div class="sg-name">${cap.name}</div><div class="sg-items">${items}</div>`;
    grid.appendChild(el);
  });
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); } });
  }, { threshold: 0.1 });
  grid.querySelectorAll(".rv").forEach(el => ob.observe(el));
})();

/* ── RENDER: AI EXPERIMENTS ── */
(function renderAI() {
  const grid = document.getElementById("ai-grid");
  if (!grid) return;
  AI_EXPERIMENTS.forEach((exp, i) => {
    const el = document.createElement("div");
    el.className = "aic rv" + (i % 2 !== 0 ? " d1" : "");
    const liveBtn = exp.live ? `<a href="${exp.live}" target="_blank" rel="noopener" class="aic-live-btn">Open Live App ↗</a>` : "";
    const tags    = exp.tags.map(t => `<span class="aic-tag">${t}</span>`).join("");
    const statusCls = exp.statusType === "live" ? "aic-status live" : "aic-status";
    el.innerHTML = `
      <div class="aic-num">${exp.num}</div>
      <div class="aic-icon"><svg viewBox="0 0 24 24">${exp.iconSvg}</svg></div>
      <span class="${statusCls}">${exp.status}</span>
      <h3 class="aic-name">${exp.name}</h3>
      <p class="aic-desc">${exp.desc}</p>
      <div class="aic-tags">${tags}</div>
      ${liveBtn}
      <span class="aic-arr">↗</span>`;
    el.addEventListener("click", () => openAI(exp.id));
    grid.appendChild(el);
  });
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); } });
  }, { threshold: 0.06 });
  grid.querySelectorAll(".rv").forEach(el => ob.observe(el));
})();

/* ── AI EXPERIMENT PANEL ── */
function openAI(id) {
  const exp = AI_EXPERIMENTS.find(x => x.id === id);
  if (!exp) return;
  const d = exp.detail;
  const liveBtn = exp.live ? `<a href="${exp.live}" target="_blank" rel="noopener" class="behance-btn" style="margin-top:0;margin-bottom:24px">Open Live App ↗</a>` : "";
  const tech    = d.tech.map(t => `<span class="rpill">${t}</span>`).join("");
  const statusCls = exp.statusType === "live" ? "aic-status live" : "aic-status";
  document.getElementById("ai-body").innerHTML = `
    <div class="sp-kicker">AI Experiment · ${exp.num}</div>
    <h2 class="sp-title" style="font-size:clamp(32px,5vw,52px)">${exp.name}</h2>
    <span class="${statusCls}" style="margin-bottom:32px;display:inline-block">${exp.status}</span>
    ${liveBtn}
    <div class="sp-sec"><h3 class="sp-sh">What It Is</h3><p class="sp-p">${d.what}</p></div>
    <div class="sp-sec"><h3 class="sp-sh">Why I Built It</h3><p class="sp-p">${d.why}</p></div>
    <div class="sp-sec"><h3 class="sp-sh">Key Learning</h3><p class="sp-p">${d.learning}</p></div>
    <div class="sp-sec"><h3 class="sp-sh">Tech Stack</h3><div class="role-pills">${tech}</div></div>
    <div class="sp-note">Interested in this experiment? → ${SITE.email}</div>`;
  document.getElementById("ai-overlay").classList.add("open");
  document.getElementById("ai-panel").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeAI() {
  document.getElementById("ai-overlay").classList.remove("open");
  document.getElementById("ai-panel").classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("ai-overlay").addEventListener("click", closeAI);
document.getElementById("ai-panel").addEventListener("click", e => e.stopPropagation());

/* ── RENDER: CONTACT LINKS ── */
(function renderContact() {
  const wrap = document.getElementById("clinks");
  if (!wrap) return;
  const links = [
    { href: "mailto:" + SITE.email,  icon: `<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>`, label: SITE.email },
    { href: SITE.linkedin,            icon: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>`, label: "LinkedIn", ext: true },
    { href: SITE.behance,             icon: `<circle cx="12" cy="12" r="10"/><path d="M8 12h8M8 8h8M8 16h5"/>`, label: "Behance Portfolio", ext: true },
    { href: SITE.resume,              icon: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>`, label: "Download Resume", ext: true }
  ];
  links.forEach(l => {
    const a = document.createElement("a");
    a.className = "cl";
    a.href = l.href;
    if (l.ext) { a.target = "_blank"; a.rel = "noopener"; }
    a.innerHTML = `<div class="cl-left"><svg viewBox="0 0 24 24">${l.icon}</svg>${l.label}</div><span class="cl-arr">↗</span>`;
    wrap.appendChild(a);
  });
})();

/* ── FOCUS MODE ── */
(function initFocus() {
  const tog   = document.getElementById("ftog");
  const panel = document.getElementById("fpanel");
  const play  = document.getElementById("fpplay");
  const wave  = document.getElementById("fwave");
  const nm    = document.getElementById("fpnm");
  const ar    = document.getElementById("fpar");
  let open = false, playing = true, trackIdx = 0;

  // Populate moods from data
  const moodsWrap = document.getElementById("fp-moods");
  FOCUS_TRACKS.forEach((t, i) => {
    const btn = document.createElement("button");
    btn.className = "fp-mood" + (i === 0 ? " on" : "");
    btn.textContent = ["🎵 Focused", "🎸 Creative", "⚡ Systems"][i] || t.name;
    btn.addEventListener("click", () => {
      moodsWrap.querySelectorAll(".fp-mood").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
      trackIdx = i;
      nm.textContent = FOCUS_TRACKS[i].name;
      ar.textContent = FOCUS_TRACKS[i].artist;
    });
    moodsWrap.appendChild(btn);
  });

  tog.addEventListener("click", () => { open = !open; panel.classList.toggle("open", open); });
  play.addEventListener("click", () => {
    playing = !playing;
    play.textContent = playing ? "⏸" : "▶";
    play.classList.toggle("on", playing);
    wave.querySelectorAll(".fw").forEach(w => w.classList.toggle("off", !playing));
  });
  document.getElementById("fpprev").addEventListener("click", () => {
    trackIdx = (trackIdx - 1 + FOCUS_TRACKS.length) % FOCUS_TRACKS.length;
    nm.textContent = FOCUS_TRACKS[trackIdx].name;
    ar.textContent = FOCUS_TRACKS[trackIdx].artist;
  });
  document.getElementById("fpnxt").addEventListener("click", () => {
    trackIdx = (trackIdx + 1) % FOCUS_TRACKS.length;
    nm.textContent = FOCUS_TRACKS[trackIdx].name;
    ar.textContent = FOCUS_TRACKS[trackIdx].artist;
  });
})();

/* ── AI CHAT ── */
(function initChat() {
  const tg   = document.getElementById("aitg");
  const pan  = document.getElementById("aichat");
  const mw   = document.getElementById("aimsgs");
  const ip   = document.getElementById("aiinp");
  const sd   = document.getElementById("aisend");
  const sugs = document.getElementById("aisugs");
  let open = false;

  tg.addEventListener("click", () => { open = !open; pan.classList.toggle("open", open); });

  function addMsg(txt, role) {
    const d = document.createElement("div");
    d.className = "aim " + role;
    d.textContent = txt;
    mw.appendChild(d);
    mw.scrollTop = mw.scrollHeight;
    return d;
  }

  async function ask(q) {
    if (!q.trim()) return;
    sugs.style.display = "none";
    addMsg(q, "u");
    ip.value = "";
    const t = addMsg("Thinking...", "a");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 250,
          system: `You are ${SITE.name}'s portfolio AI. ${SITE.title} at ${SITE.company}, 8+ years. Projects: P&G ICLS (+40% research speed, -25% duplicates, 180 countries), SSC Payroll (+25% efficiency, +40% mobile, iWin Award 2025), Schneider Electric B2B (+25% conversions, -15% abandonment, 50K+ customers). Philosophy: designers overvalue originality and undervalue legibility of intent; the best design creates the right mental state. AI builds: Design Copilot, Gravity Sketchpad (live: gravity-sketchpad-pro.vercel.app), Process Builder, Visual Intelligence. Email: ${SITE.email}. Answer in 2-3 specific confident sentences.`,
          messages: [{ role: "user", content: q }]
        })
      });
      const data = await res.json();
      t.textContent = data.content[0].text;
    } catch (_) {
      const ql = q.toLowerCase();
      const key = Object.keys(AI_KB).find(k => ql.includes(k));
      t.textContent = key ? AI_KB[key] : `${SITE.name} is a ${SITE.title} at ${SITE.company} specialising in enterprise systems and AI-driven design. Contact: ${SITE.email}`;
    }
  }

  sd.addEventListener("click", () => ask(ip.value));
  ip.addEventListener("keydown", e => { if (e.key === "Enter") ask(ip.value); });
  document.querySelectorAll(".aisgb").forEach(b => b.addEventListener("click", () => ask(b.textContent)));
})();
