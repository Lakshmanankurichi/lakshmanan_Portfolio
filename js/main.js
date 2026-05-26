/* ============================================================
   MAIN.JS — All interactions. Content lives in data.js.
   ============================================================ */

/* ── LOADER ── */
(function() {
  var bar = document.getElementById("lbar");
  var pct = document.getElementById("lpct");
  var ldr = document.getElementById("ldr");
  var p = 0;
  var iv = setInterval(function() {
    p += Math.random() * 7 + 2;
    if (p >= 100) {
      p = 100; clearInterval(iv);
      setTimeout(function() {
        ldr.classList.add("out");
        setTimeout(function() {
          ldr.style.display = "none";
          setTimeout(function() {
            var f = document.getElementById("focus");
            if (f) { f.style.opacity = "1"; }
          }, 1800);
        }, 800);
      }, 300);
    }
    bar.style.width = p + "%";
    pct.textContent = Math.floor(p) + "%";
  }, 55);
})();

(function() {
  var f = document.getElementById("focus");
  if (f) { f.style.opacity = "0"; f.style.transition = "opacity 0.5s ease"; }
})();

/* ── CANVAS PARTICLES ── */
(function() {
  var c = document.getElementById("hcvs");
  if (!c) return;
  var ctx = c.getContext("2d");
  var mx = innerWidth / 2, my = innerHeight / 2;
  function resize() { c.width = innerWidth; c.height = innerHeight; }
  resize();
  addEventListener("resize", resize);
  document.addEventListener("mousemove", function(e) { mx = e.clientX; my = e.clientY; });
  function Particle() { this.reset(); }
  Particle.prototype.reset = function() {
    this.x = Math.random() * c.width; this.y = Math.random() * c.height;
    this.s = Math.random() * 1.1 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.22; this.vy = (Math.random() - 0.5) * 0.22;
    this.a = Math.random() * 0.1 + 0.03;
  };
  Particle.prototype.update = function() {
    var dx = mx - this.x, dy = my - this.y, d = Math.hypot(dx, dy);
    if (d < 130) { this.vx -= dx * 0.0008; this.vy -= dy * 0.0008; }
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > c.width || this.y < 0 || this.y > c.height) this.reset();
  };
  Particle.prototype.draw = function() {
    ctx.globalAlpha = this.a; ctx.fillStyle = "#064d43";
    ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2); ctx.fill();
  };
  var ps = [];
  for (var i = 0; i < 70; i++) ps.push(new Particle());
  function anim() {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(function(p) { p.update(); p.draw(); });
    for (var i = 0; i < ps.length; i++) {
      for (var j = i + 1; j < ps.length; j++) {
        var dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, d = Math.hypot(dx, dy);
        if (d < 75) {
          ctx.globalAlpha = (1 - d / 75) * 0.035;
          ctx.strokeStyle = "#064d43"; ctx.lineWidth = 0.4;
          ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(anim);
  }
  anim();
})();

/* ── CURSOR ── */
(function() {
  var dot = document.getElementById("cdot"), rng = document.getElementById("crng");
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });
  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    rng.style.left = rx + "px"; rng.style.top = ry + "px";
    requestAnimationFrame(loop);
  })();
  function addHover(sel, cls) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.addEventListener("mouseenter", function() { document.body.classList.add(cls); });
      el.addEventListener("mouseleave", function() { document.body.classList.remove(cls); });
    });
  }
  addHover("a, button, .cs, .aic, .logo-item, .pstep, .skill-group, .fp-mood, .aisgb, .fpb", "hov");
  // Magnetic effect on primary CTAs
  document.querySelectorAll(".btn-primary, .btn-outline, .n-cta").forEach(function(btn) {
    btn.addEventListener("mousemove", function(e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.22;
      var y = (e.clientY - r.top - r.height / 2) * 0.22;
      btn.style.transform = "translate(" + x + "px, " + y + "px)";
      document.body.classList.add("mag");
    });
    btn.addEventListener("mouseleave", function() {
      btn.style.transform = "";
      document.body.classList.remove("mag");
    });
  });
})();

/* ── SCROLL PROGRESS ── */
window.addEventListener("scroll", function() {
  var fill = document.getElementById("prg-fill");
  if (fill) fill.style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + "%";
});

/* ── SCROLL REVEAL ── */
(function() {
  var ob = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add("in"); ob.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
  function observeAll() {
    document.querySelectorAll(".rv").forEach(function(el) { ob.observe(el); });
  }
  observeAll();
  window._rvOb = ob;
})();

/* ── HERO PARALLAX ── */
document.addEventListener("mousemove", function(e) {
  var x = (e.clientX / innerWidth - 0.5) * 16;
  var y = (e.clientY / innerHeight - 0.5) * 8;
  var portrait = document.querySelector(".hero-portrait");
  if (portrait) portrait.style.transform = "translate(" + x * 0.3 + "px, " + y * 0.3 + "px)";
});

/* ── RENDER: LOGOS (fixed order) ── */
(function() {
  var wrap = document.getElementById("logos-row");
  if (!wrap) return;
  // Fixed order per spec: L&T, Schneider, P&G, Brown & Brown, AkzoNobel
  var order = ["lt.svg", "schneider.svg", "pg.svg", "bb.svg", "akzonobel.svg"];
  var names  = ["L&T", "Schneider Electric", "P&G", "Brown & Brown", "AkzoNobel"];
  order.forEach(function(file, i) {
    var div = document.createElement("div");
    div.className = "logo-item";
    div.innerHTML = '<img src="assets/logos/' + file + '" alt="' + names[i] + '" loading="lazy">';
    wrap.appendChild(div);
  });
})();

/* ── RENDER: HERO PROOF ── */
(function() {
  var wrap = document.getElementById("hero-proof");
  if (!wrap) return;
  SITE.proof.forEach(function(p, i) {
    var item = document.createElement("div");
    item.className = "hero-metric";
    item.innerHTML = '<div class="hm-val">' + p.value + '</div><div class="hm-lbl">' + p.label + '</div>';
    wrap.appendChild(item);
  });
})();

/* ── RENDER: PROJECTS ── */
(function() {
  var list = document.getElementById("cs-list");
  if (!list) return;
  PROJECTS.forEach(function(p) {
    var el = document.createElement("div");
    el.className = "cs rv" + (p.reversed ? " rev" : "");
    el.dataset.id = p.id;
    var tags = p.tags.map(function(t) { return '<span class="cs-tag">' + t + '</span>'; }).join("");
    var mets = p.metrics.map(function(m) {
      return '<div class="cs-met"><div class="cs-met-v">' + m.value + '</div><div class="cs-met-l">' + m.label + '</div></div>';
    }).join("");
    el.innerHTML =
      '<div class="cs-visual">' +
        '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
        '<div class="cs-visual-overlay"></div>' +
      '</div>' +
      '<div class="cs-body">' +
        '<div class="cs-header">' +
          '<div class="cs-index">' +
            '<span class="cs-num">' + p.num + '</span>' +
            '<span class="cs-company">' + p.company + ' &middot; ' + p.year + '</span>' +
          '</div>' +
          '<h3 class="cs-title">' + p.title + '</h3>' +
          '<div class="cs-problem">' + p.problem + '</div>' +
          '<p class="cs-brief">' + p.brief + '</p>' +
          '<div class="cs-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="cs-footer">' +
          '<div class="cs-metrics">' + mets + '</div>' +
          '<button class="cs-cta" onclick="openCS(\'' + p.id + '\')" style="cursor:none">' +
            'View Case Study' +
            '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
    list.appendChild(el);
  });
  document.querySelectorAll("#cs-list .rv").forEach(function(el) { window._rvOb.observe(el); });
})();

/* ── CS PANEL ── */
function openCS(id) {
  var p = null;
  for (var i = 0; i < PROJECTS.length; i++) { if (PROJECTS[i].id === id) { p = PROJECTS[i]; break; } }
  if (!p) return;
  var d = p.detail;
  document.getElementById("csp-label").textContent = p.company + " " + p.year;
  var exec = d.exec.map(function(e) {
    return '<div class="ec"><div class="ec-l">' + e.label + '</div><div class="ec-v">' + e.value + '</div></div>';
  }).join("");
  var mets = p.metrics.map(function(m) {
    return '<div class="mc"><div class="mc-v">' + m.value + '</div><div class="mc-l">' + m.label + '</div></div>';
  }).join("");
  var decs = d.decisions.map(function(dec) {
    return '<div class="dec-block"><div class="dec-q">' + dec.q + '</div><div class="dec-a">' + dec.a + '</div></div>';
  }).join("");
  var cons = d.constraints.map(function(c) {
    return '<div class="con-row"><span class="con-l">' + c.label + '</span><span class="con-v">' + c.value + '</span></div>';
  }).join("");
  var roles = d.roles.map(function(r) { return '<span class="rpill">' + r + '</span>'; }).join("");
  document.getElementById("csp-body").innerHTML =
    '<div class="sp-hero-img"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy"></div>' +
    '<div class="sp-kicker">' + p.company + ' &middot; ' + p.year + '</div>' +
    '<h2 class="sp-title">' + p.title + '</h2>' +
    '<div class="exec-grid">' + exec + '</div>' +
    '<div class="sp-sec"><h3 class="sp-sh">Metrics</h3><div class="metrics-strip">' + mets + '</div></div>' +
    '<div class="sp-sec"><h3 class="sp-sh">Context</h3><p class="sp-p">' + d.context + '</p></div>' +
    '<div class="sp-sec"><h3 class="sp-sh">The Real Problem</h3><p class="sp-p">' + d.problem + '</p></div>' +
    '<div class="sp-sec"><h3 class="sp-sh">Key Design Decisions</h3>' + decs + '</div>' +
    '<div class="sp-sec"><h3 class="sp-sh">Constraints</h3><div style="background:var(--bg);border-radius:var(--radius-md);padding:var(--s6)">' + cons + '</div></div>' +
    '<div class="sp-sec"><h3 class="sp-sh">My Contribution &middot; ' + d.contrib + '%</h3>' +
      '<div class="contrib-wrap">' +
        '<div class="contrib-bar"><div class="contrib-fill" style="width:' + d.contrib + '%"></div></div>' +
        '<div class="contrib-labels"><span>Individual (' + d.contrib + '%)</span><span>Team (' + (100 - d.contrib) + '%)</span></div>' +
        '<div class="role-pills">' + roles + '</div>' +
      '</div>' +
    '</div>' +
    '<a href="' + p.behance + '" target="_blank" rel="noopener" class="behance-btn">' +
      'View on Behance' +
      '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
    '</a>' +
    '<div class="sp-note">Full walkthrough available on request &middot; ' + SITE.email + '</div>';
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
document.getElementById("cs-panel").addEventListener("click", function(e) { e.stopPropagation(); });

/* ── RENDER: PROCESS ── */
(function() {
  var wrap = document.getElementById("process-steps");
  if (!wrap) return;
  var icons = [
    '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
  ];
  PROCESS_STEPS.forEach(function(s, i) {
    var el = document.createElement("div");
    el.className = "pstep rv" + (i > 0 ? " d" + Math.min(i, 4) : "");
    el.innerHTML =
      '<div class="pstep-icon"><svg viewBox="0 0 24 24">' + icons[i] + '</svg></div>' +
      '<div class="pstep-num">Step 0' + (i + 1) + '</div>' +
      '<div class="pstep-name">' + s.name + '</div>' +
      '<div class="pstep-desc">' + s.desc + '</div>';
    wrap.appendChild(el);
  });
  document.querySelectorAll("#process-steps .rv").forEach(function(el) { window._rvOb.observe(el); });
})();

/* ── RENDER: PHILOSOPHY ── */
(function() {
  var wrap = document.getElementById("phil-items");
  if (!wrap) return;
  PHILOSOPHY.items.forEach(function(item, i) {
    var el = document.createElement("div");
    el.className = "phil-item rv" + (i > 0 ? " d" + Math.min(i, 4) : "");
    el.innerHTML =
      '<div class="phil-item-hed">' + item.heading + '</div>' +
      '<div class="phil-item-body">' + item.body + '</div>';
    wrap.appendChild(el);
  });
  document.querySelectorAll("#phil-items .rv").forEach(function(el) { window._rvOb.observe(el); });
})();

/* ── RENDER: AWARDS ── */
(function() {
  var wrap = document.getElementById("awards-list");
  if (!wrap) return;
  var icons = [
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'
  ];
  SITE.awards.forEach(function(a, i) {
    var el = document.createElement("div");
    el.className = "award-row";
    el.innerHTML =
      '<div class="award-icon"><svg viewBox="0 0 24 24">' + (icons[i] || icons[0]) + '</svg></div>' +
      a.text;
    wrap.appendChild(el);
  });
})();

/* ── RENDER: SKILLS ── */
(function() {
  var grid = document.getElementById("skills-grid");
  if (!grid) return;
  var sgIcons = [
    '<rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/>',
    '<circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
    '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
    '<path d="M12 2a10 10 0 0 1 10 10c0 1.5-3 7-10 7S2 13.5 2 12a10 10 0 0 1 10-10z"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>'
  ];
  CAPABILITIES.forEach(function(cap, i) {
    var el = document.createElement("div");
    el.className = "skill-group rv" + (i > 0 ? " d" + Math.min(i, 3) : "");
    var items = cap.items.map(function(it) { return '<div class="sg-item">' + it + '</div>'; }).join("");
    el.innerHTML =
      '<div class="sg-icon-wrap"><svg viewBox="0 0 24 24">' + sgIcons[i] + '</svg></div>' +
      '<div class="sg-name">' + cap.name + '</div>' +
      '<div class="sg-items">' + items + '</div>';
    grid.appendChild(el);
  });
  document.querySelectorAll("#skills-grid .rv").forEach(function(el) { window._rvOb.observe(el); });
})();

/* ── RENDER: AI EXPERIMENTS ── */
(function() {
  var grid = document.getElementById("ai-grid");
  if (!grid) return;
  var icoPaths = [
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h4M9 15h2"/>',
    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="12" y1="14" x2="12" y2="16"/>',
    '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'
  ];
  AI_EXPERIMENTS.forEach(function(exp, i) {
    var el = document.createElement("div");
    el.className = "aic rv" + (i % 2 !== 0 ? " d1" : "");
    var liveLink = exp.live ?
      '<a href="' + exp.live + '" target="_blank" rel="noopener" class="aic-live-link" onclick="event.stopPropagation()" style="cursor:none">' +
        'Open Live App <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
      '</a>' : "";
    var tags = exp.tags.map(function(t) { return '<span class="aic-tag">' + t + '</span>'; }).join("");
    var badgeCls = exp.statusType === "live" ? "aic-badge live" : "aic-badge";
    el.innerHTML =
      '<div class="aic-arrow"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></div>' +
      '<div class="aic-num">' + exp.num + '</div>' +
      '<div class="aic-icon"><svg viewBox="0 0 24 24">' + icoPaths[i] + '</svg></div>' +
      '<span class="' + badgeCls + '">' + exp.status + '</span>' +
      '<h3 class="aic-name">' + exp.name + '</h3>' +
      '<p class="aic-desc">' + exp.desc + '</p>' +
      '<div class="aic-tags">' + tags + '</div>' +
      liveLink;
    el.addEventListener("click", function() { openAI(exp.id); });
    grid.appendChild(el);
  });
  document.querySelectorAll("#ai-grid .rv").forEach(function(el) { window._rvOb.observe(el); });
})();

/* ── AI EXPERIMENT PANEL ── */
function openAI(id) {
  var exp = null;
  for (var i = 0; i < AI_EXPERIMENTS.length; i++) { if (AI_EXPERIMENTS[i].id === id) { exp = AI_EXPERIMENTS[i]; break; } }
  if (!exp) return;
  var d = exp.detail;
  var liveBtn = exp.live ?
    '<a href="' + exp.live + '" target="_blank" rel="noopener" class="behance-btn" style="margin-bottom:var(--s7)">' +
      'Open Live App <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>' +
    '</a>' : "";
  var tech = d.tech.map(function(t) { return '<span class="rpill">' + t + '</span>'; }).join("");
  var badgeCls = exp.statusType === "live" ? "aic-badge live" : "aic-badge";
  document.getElementById("ai-body").innerHTML =
    '<div class="sp-kicker">AI Experiment &middot; ' + exp.num + '</div>' +
    '<h2 class="sp-title" style="font-size:clamp(32px,5vw,52px)">' + exp.name + '</h2>' +
    '<span class="' + badgeCls + '" style="margin-bottom:var(--s7);display:inline-block">' + exp.status + '</span><br>' +
    liveBtn +
    '<div class="sp-sec"><h3 class="sp-sh">What It Is</h3><p class="sp-p">' + d.what + '</p></div>' +
    '<div class="sp-sec"><h3 class="sp-sh">Why I Built It</h3><p class="sp-p">' + d.why + '</p></div>' +
    '<div class="sp-sec"><h3 class="sp-sh">Key Learning</h3><p class="sp-p">' + d.learning + '</p></div>' +
    '<div class="sp-sec"><h3 class="sp-sh">Tech Stack</h3><div class="role-pills">' + tech + '</div></div>' +
    '<div class="sp-note">Interested? ' + SITE.email + '</div>';
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
document.getElementById("ai-panel").addEventListener("click", function(e) { e.stopPropagation(); });

/* ── RENDER: CONTACT ── */
(function() {
  var wrap = document.getElementById("clinks");
  if (!wrap) return;
  var links = [
    { href: "mailto:" + SITE.email, label: SITE.email, icon: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
    { href: SITE.linkedin, label: "LinkedIn", ext: true, icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
    { href: SITE.behance, label: "Behance Portfolio", ext: true, icon: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8M8 8h8M8 16h5"/>' },
    { href: SITE.resume, label: "Download Resume", ext: true, icon: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' }
  ];
  links.forEach(function(l) {
    var a = document.createElement("a");
    a.className = "cl"; a.href = l.href;
    if (l.ext) { a.target = "_blank"; a.rel = "noopener"; }
    a.style.cursor = "none";
    a.innerHTML =
      '<div class="cl-left"><svg viewBox="0 0 24 24">' + l.icon + '</svg>' + l.label + '</div>' +
      '<div class="cl-arrow"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></div>';
    wrap.appendChild(a);
  });
})();

/* ── FOCUS MODE ── */
(function() {
  var tog = document.getElementById("ftog");
  var panel = document.getElementById("fpanel");
  var play = document.getElementById("fpplay");
  var icon = document.getElementById("fp-play-icon");
  var wave = document.getElementById("fwave");
  var nm = document.getElementById("fpnm");
  var ar = document.getElementById("fpar");
  var moodsWrap = document.getElementById("fp-moods");
  var open = false, playing = true, trackIdx = 0;
  var playIcon = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  var pauseIcon = '<polygon points="5 3 19 12 5 21 5 3"/>';
  FOCUS_TRACKS.forEach(function(t, i) {
    var btn = document.createElement("button");
    btn.className = "fp-mood" + (i === 0 ? " on" : "");
    btn.style.cursor = "none";
    var emojis = ["🎵 Focused", "🎸 Creative", "⚡ Systems"];
    btn.textContent = emojis[i] || t.name;
    btn.addEventListener("click", function() {
      moodsWrap.querySelectorAll(".fp-mood").forEach(function(b) { b.classList.remove("on"); });
      btn.classList.add("on");
      trackIdx = i;
      nm.textContent = FOCUS_TRACKS[i].name;
      ar.textContent = FOCUS_TRACKS[i].artist;
    });
    moodsWrap.appendChild(btn);
  });
  tog.addEventListener("click", function() {
    open = !open; panel.classList.toggle("open", open);
  });
  play.addEventListener("click", function() {
    playing = !playing;
    play.classList.toggle("on", playing);
    icon.innerHTML = playing ? playIcon : pauseIcon;
    wave.querySelectorAll(".fw").forEach(function(w) { w.classList.toggle("paused", !playing); });
  });
  document.getElementById("fpprev").addEventListener("click", function() {
    trackIdx = (trackIdx - 1 + FOCUS_TRACKS.length) % FOCUS_TRACKS.length;
    nm.textContent = FOCUS_TRACKS[trackIdx].name;
    ar.textContent = FOCUS_TRACKS[trackIdx].artist;
  });
  document.getElementById("fpnxt").addEventListener("click", function() {
    trackIdx = (trackIdx + 1) % FOCUS_TRACKS.length;
    nm.textContent = FOCUS_TRACKS[trackIdx].name;
    ar.textContent = FOCUS_TRACKS[trackIdx].artist;
  });
})();

/* ── AI CHAT ── */
(function() {
  var tg = document.getElementById("aitg");
  var pan = document.getElementById("aichat");
  var mw = document.getElementById("aimsgs");
  var ip = document.getElementById("aiinp");
  var sd = document.getElementById("aisend");
  var sugs = document.getElementById("aisugs");
  var open = false;
  tg.addEventListener("click", function() { open = !open; pan.classList.toggle("open", open); });
  function addMsg(txt, role) {
    var d = document.createElement("div");
    d.className = "aim " + role; d.textContent = txt;
    mw.appendChild(d); mw.scrollTop = mw.scrollHeight; return d;
  }
  function ask(q) {
    if (!q.trim()) return;
    sugs.style.display = "none";
    addMsg(q, "u"); ip.value = "";
    var t = addMsg("Thinking...", "a");
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 250,
        system: "You are " + SITE.name + "'s portfolio AI. " + SITE.title + " at " + SITE.company + ", 8+ years. P&G ICLS (+40% research speed), SSC Payroll (iWin Award 2025), Schneider Electric B2B (+25% conversions). Philosophy: designers overvalue originality and undervalue legibility of intent. Answer in 2-3 confident sentences. Email: " + SITE.email,
        messages: [{ role: "user", content: q }]
      })
    }).then(function(r) { return r.json(); }).then(function(data) {
      t.textContent = data.content[0].text;
    }).catch(function() {
      var ql = q.toLowerCase();
      var key = Object.keys(AI_KB).find(function(k) { return ql.includes(k); });
      t.textContent = key ? AI_KB[key] : (SITE.name + " is a " + SITE.title + " at " + SITE.company + ". Contact: " + SITE.email);
    });
  }
  sd.addEventListener("click", function() { ask(ip.value); });
  ip.addEventListener("keydown", function(e) { if (e.key === "Enter") ask(ip.value); });
  document.querySelectorAll(".aisgb").forEach(function(b) {
    b.addEventListener("click", function() { ask(b.textContent); });
  });
})();
