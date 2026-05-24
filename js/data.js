/* ============================================================
   DATA.JS — Edit this file to update case studies & AI builds
   Add a new project: copy an object, fill in the fields, done.
   ============================================================ */

/* ─────────────────────────────────────────────
   SITE INFO — Personal details & contact
───────────────────────────────────────────── */
const SITE = {
  name: "Lakshmanan.I",
  title: "Senior Product Designer",
  company: "LTIMindtree",
  location: "Chennai, India",
  available: true,
  email: "lakshmanan.uxpro@gmail.com",
  linkedin: "https://www.linkedin.com/in/lakshmanan-ux/",
  behance: "https://www.behance.net/lakshmanankurichi",
  resume: "https://drive.google.com/file/d/1mXRmhw0IqPg0hAiOKDyU0bLVCDlz25L7/view?usp=sharing",
  proof: [
    { value: "8+", label: "Years Experience" },
    { value: "10+", label: "Enterprise Clients" },
    { value: "25+", label: "Products Shipped" }
  ],
  awards: [
    { icon: "★", text: "iWin Award — Accessibility Excellence · LTIMindtree 2025" },
    { icon: "★", text: "Pat on the Back Award · LTIMindtree 2023" },
    { icon: "📜", text: "Google UX Design Professional · 2025" },
    { icon: "📜", text: "IBM Enterprise Design Thinking · 2022" },
    { icon: "🎓", text: "MBA Financial Management · University of Madras" }
  ]
};

/* ─────────────────────────────────────────────
   CLIENT LOGOS
   Add or remove clients here
───────────────────────────────────────────── */
const CLIENTS = [
  { name: "P&G",               file: "pg.svg"         },
  { name: "Schneider Electric", file: "schneider.svg"  },
  { name: "L&T",               file: "lt.svg"         },
  { name: "AkzoNobel",         file: "akzonobel.svg"  },
  { name: "Brown & Brown",     file: "bb.svg"         }
];

/* ─────────────────────────────────────────────
   CASE STUDIES
   To add a new case study:
   1. Add your image to assets/images/
   2. Copy one project object below
   3. Fill in all fields
   4. Add to this array
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "pg",
    num: "01",
    year: "2026",
    company: "LTIMindtree × P&G",
    title: "Consumer Research Platform",
    category: "Enterprise Research Intelligence · AI-Powered Search",
    image: "assets/images/clp.jpg",
    reversed: false,
    problem: "Researchers were duplicating 25% of studies because they couldn't find what already existed — a knowledge discovery problem disguised as a UI problem.",
    brief: "Unified 6 fragmented research systems into one AI-powered portal used across 180 countries. The decisive intervention wasn't a redesign — it was rethinking how institutional knowledge surfaces.",
    tags: ["User Research", "Information Architecture", "AI Search UX", "Enterprise"],
    metrics: [
      { value: "40%", label: "Faster research" },
      { value: "25%", label: "Fewer duplicates" },
      { value: "180", label: "Countries" }
    ],
    behance: "https://www.behance.net/gallery/249162961/Consumer-Learning-Platform",
    detail: {
      exec: [
        { label: "Problem",  value: "Researchers duplicating 25% of studies — a knowledge discovery problem disguised as a UI problem" },
        { label: "My Role",  value: "Lead UX · Information Architecture · AI Search UX · Stakeholder Workshops" },
        { label: "Decision", value: "Unified 6 systems into one ICLS portal; fixed discovery before fixing UI" },
        { label: "Impact",   value: "+30–40% research speed · −25% duplicate studies · 180 countries" }
      ],
      context: "P&G's global research teams used 6 disconnected systems. Researchers wasted 30% of their time re-discovering existing studies. I led the end-to-end redesign of the Integrated Consumer Learning Solutions portal.",
      problem: "The core problem was knowledge fragmentation, not UI fragmentation. Studies existed in silos, making institutional knowledge invisible. The AI-powered search was the decisive design intervention — not the visual redesign.",
      decisions: [
        {
          q: "Why unified portal over improving each tool separately?",
          a: "Improving individual tools wouldn't solve duplication — the root cause was cross-tool invisibility. Integration was the only intervention that eliminated the root cause. Business case: 25% duplicate studies = wasted budget at P&G global scale."
        },
        {
          q: "Why AI search as the primary intervention?",
          a: "Researchers spent most time searching, not studying. Fixing discovery unlocked everything downstream. The 'What Do You Want to Discover?' prompt reduced cognitive load immediately and drove adoption."
        }
      ],
      constraints: [
        { label: "Timeline",     value: "8 months · 3 sprint cycles" },
        { label: "Tech",         value: "Legacy system integration — 6 disparate APIs to unify" },
        { label: "Stakeholders", value: "Global teams across 4 time zones, multiple business units" }
      ],
      contrib: 75,
      roles: ["UX Strategy", "Information Architecture", "AI Search UX", "Stakeholder Workshops", "Usability Testing"]
    }
  },
  {
    id: "ssc",
    num: "02",
    year: "2024",
    company: "LTIMindtree · SSC",
    title: "Payroll & Benefits Portal",
    category: "Enterprise HR · Shared Services · Mobile-First",
    image: "assets/images/ssc.jpg",
    reversed: true,
    problem: "A one-size-fits-all interface forced payroll managers and general employees into the same workflow — creating noise that destroyed efficiency for everyone.",
    brief: "Role-based dashboard redesign for a multi-billion-dollar enterprise. When you only show people what's relevant to them, efficiency gains follow naturally.",
    tags: ["Role-Based Design", "Mobile-First", "WCAG Accessibility", "Enterprise HR"],
    metrics: [
      { value: "25%", label: "More efficient" },
      { value: "40%", label: "Mobile adoption" },
      { value: "iWin", label: "Award 2025" }
    ],
    behance: "https://www.behance.net/gallery/219382517/Employer-Shared-Service-Portal",
    detail: {
      exec: [
        { label: "Problem",  value: "One-size-fits-all interface forced all user roles into the same workflow — noise for everyone" },
        { label: "My Role",  value: "Lead UX · Role-Based Architecture · Mobile-First Redesign · WCAG Accessibility" },
        { label: "Decision", value: "Role-based dashboards — each user type sees only what's relevant, nothing more" },
        { label: "Impact",   value: "+25% efficiency · +40% mobile adoption · iWin Accessibility Award 2025" }
      ],
      context: "A shared services portal for a multi-billion-dollar enterprise with 10,000+ users — payroll managers, approvers, and employees — all using the same undifferentiated interface.",
      problem: "The design failure was a mental model failure. A payroll administrator and a general employee don't share a mental model — yet the interface treated them identically. The noise this created was the efficiency killer.",
      decisions: [
        {
          q: "Why role-based over a universal interface?",
          a: "Role-based dashboards surface only relevant actions per user type. Removing irrelevant elements reduced cognitive load and task completion time by 35% in testing — without changing any underlying functionality."
        },
        {
          q: "Why mobile-first for an enterprise tool?",
          a: "40% of access was already being attempted on mobile and failing. The demand existed. Mobile-first wasn't a trend decision — it was responding to documented user behaviour."
        }
      ],
      constraints: [
        { label: "Security",   value: "Enterprise-grade data security for payroll data" },
        { label: "Legacy",     value: "30+ year payroll system integration — no backend changes" },
        { label: "Compliance", value: "Multi-jurisdiction payroll compliance requirements" }
      ],
      contrib: 78,
      roles: ["UX Strategy", "Role-Based Architecture", "Mobile UX", "WCAG Accessibility", "Workflow Design"]
    }
  },
  {
    id: "sch",
    num: "03",
    year: "2023",
    company: "LTIMindtree × Schneider Electric",
    title: "Global Commerce Platform",
    category: "B2B Ecommerce · Checkout Architecture · Conversion",
    image: "assets/images/ecommerce.jpg",
    reversed: false,
    problem: "B2B purchasing requires multi-stakeholder approval. The platform treated it like consumer checkout — abandonment happened exactly where procurement authority changed hands.",
    brief: "Rebuilt B2B ordering workflows around procurement hierarchy for 50K+ industrial customers. One architectural decision at the approval stage changed every downstream metric.",
    tags: ["Checkout Architecture", "Conversion CRO", "B2B UX", "Brand System"],
    metrics: [
      { value: "25%", label: "More conversions" },
      { value: "15%", label: "Less abandonment" },
      { value: "50K+", label: "B2B customers" }
    ],
    behance: "https://www.behance.net/gallery/219381605/Schneider-Electric-Ecommerce",
    detail: {
      exec: [
        { label: "Problem",  value: "B2B checkout ignored procurement authority hierarchy — abandonment clustered at the approval stage" },
        { label: "My Role",  value: "Lead UX · Checkout Architecture · Role-Based Purchasing · Conversion Optimisation" },
        { label: "Decision", value: "Rebuilt checkout around procurement roles, not individual users" },
        { label: "Impact",   value: "+25% B2B conversions · −15% cart abandonment · 50K+ customers" }
      ],
      context: "Schneider Electric's B2B platform served 50K+ industrial customers globally. The existing checkout had 7 steps and treated enterprise purchasing like consumer checkout — ignoring that B2B requires multi-stakeholder approval.",
      problem: "Abandonment wasn't random — it clustered at the approval stage. B2B purchasing requires procurement managers, approvers, and engineers to interact at different points. The system didn't model this. That single insight changed everything.",
      decisions: [
        {
          q: "Why role-based checkout over a streamlined universal flow?",
          a: "Individual-user checkout is the wrong mental model for B2B. The approval stage — where 15% abandoned — was where procurement authority changed hands. Role-based flows made this transition invisible to users."
        },
        {
          q: "Why use L&T brand constraints as a design foundation?",
          a: "Brand guidelines were strict but non-negotiable. Rather than fighting them, I used them as a design system foundation — reducing future debt and aligning with global rollout requirements across all regions."
        }
      ],
      constraints: [
        { label: "Brand",  value: "Strict L&T guidelines — non-negotiable across all regions" },
        { label: "Scale",  value: "50K+ customers, multi-region, multi-language" },
        { label: "Legacy", value: "Existing ERP integration — no backend changes allowed" }
      ],
      contrib: 80,
      roles: ["UX Strategy", "Checkout Architecture", "Conversion CRO", "Brand System", "User Research"]
    }
  }

  /* ── TO ADD A NEW CASE STUDY ──────────────────────────────
  ,{
    id: "yourproject",
    num: "04",
    year: "2025",
    company: "Your Company",
    title: "Project Title",
    category: "Category · Sub-category",
    image: "assets/images/yourimage.jpg",
    reversed: true,
    problem: "The core problem in one sentence.",
    brief: "2-3 sentence overview of what you did and why it mattered.",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    metrics: [
      { value: "XX%", label: "Metric label" },
      { value: "YY+", label: "Metric label" },
      { value: "ZZ",  label: "Metric label" }
    ],
    behance: "https://www.behance.net/gallery/YOUR_ID",
    detail: {
      exec: [
        { label: "Problem",  value: "..." },
        { label: "My Role",  value: "..." },
        { label: "Decision", value: "..." },
        { label: "Impact",   value: "..." }
      ],
      context: "Full context paragraph.",
      problem: "The real problem paragraph.",
      decisions: [
        { q: "Why X over Y?", a: "Because..." },
        { q: "Why Z approach?", a: "Because..." }
      ],
      constraints: [
        { label: "Timeline", value: "..." },
        { label: "Tech",     value: "..." }
      ],
      contrib: 80,
      roles: ["Role 1", "Role 2", "Role 3"]
    }
  }
  ──────────────────────────────────────────────────────── */
];

/* ─────────────────────────────────────────────
   VIBE CODED APPS / AI EXPERIMENTS
   To add a new app:
   1. Copy one object below
   2. Fill in the fields
   3. Add to this array
   4. Use iconSvg for a custom SVG icon path
───────────────────────────────────────────── */
const AI_EXPERIMENTS = [
  {
    id: "copilot",
    num: "01",
    iconSvg: `<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h4M9 15h2"/>`,
    name: "Design Copilot",
    status: "In Development",
    statusType: "default",
    desc: "AI-assisted interface generator built for enterprise systems. Problem statement in — structured UI framework out. Cuts design time by 60% while maintaining enterprise-grade complexity.",
    tags: ["Claude API", "Figma Plugin", "React", "TypeScript"],
    live: "",
    detail: {
      what: "AI-assisted interface generator built to compress the design-to-prototype cycle for enterprise systems. Give it a problem statement and a system context — it outputs a structured UI framework built on enterprise design patterns.",
      why: "Most AI design tools generate generic consumer UI. Enterprise systems need role-based access, dense information hierarchy, and accessibility compliance from the start. Design Copilot is constraint-first by design.",
      learning: "Enterprise UI generation performs significantly better when given explicit user roles and data density requirements upfront. The AI needs context about who is using it, not just what it should do.",
      tech: ["Claude API", "Figma Plugin API", "React", "TypeScript"]
    }
  },
  {
    id: "gravity",
    num: "02",
    iconSvg: `<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>`,
    name: "Gravity Sketchpad Pro",
    status: "Live & Deployed",
    statusType: "live",
    desc: "Physics-based collaborative drawing canvas for creative ideation. A personal experiment that became a deployed product used by 200+ designers for mood boarding.",
    tags: ["Canvas API", "Matter.js", "Vercel", "Vanilla JS"],
    live: "https://gravity-sketchpad-pro.vercel.app/",
    detail: {
      what: "Physics-based collaborative drawing canvas exploring creative ideation through real-time gravity simulation. A personal experiment in interaction design that became a deployed product used by 200+ designers.",
      why: "I wanted to explore what happens when you remove the grid from design tools. The physics engine creates unexpected compositions — it's a creativity catalyst, not a precision tool. Removing constraints surfaces different kinds of thinking.",
      learning: "The tool has become a mood boarding and early ideation tool for designers who use it before opening Figma. Removing constraints surfaces different kinds of ideas.",
      tech: ["Canvas API", "Matter.js Physics", "Vercel", "Vanilla JS"]
    }
  },
  {
    id: "process",
    num: "03",
    iconSvg: `<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M12 14v2"/>`,
    name: "Process Builder",
    status: "Validation Stage",
    statusType: "default",
    desc: "No-code workflow designer with AI-powered bottleneck detection. Makes invisible enterprise complexity visible before design starts.",
    tags: ["GPT-4o", "React Flow", "D3.js", "Framer"],
    live: "",
    detail: {
      what: "No-code workflow designer with AI-powered bottleneck detection. Maps enterprise processes visually, then uses AI to identify where friction accumulates before it becomes systemic failure.",
      why: "After the SSC Payroll redesign, I realised the root problem was invisible workflow complexity. Process Builder makes that complexity visible before design starts — fundamentally changing the conversation with stakeholders.",
      learning: "The most valuable output isn't the workflow diagram — it's the bottleneck report that shows stakeholders where time actually disappears. That's the artefact that gets the budget approved.",
      tech: ["GPT-4o", "D3.js Node Graph", "React Flow", "Framer"]
    }
  },
  {
    id: "visual",
    num: "04",
    iconSvg: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    name: "Visual Intelligence",
    status: "Beta Testing",
    statusType: "default",
    desc: "Raw enterprise data → interactive dashboards. AI selects visualisations, narrates insights. The narrative layer increased comprehension 40% in user testing.",
    tags: ["Claude API", "D3.js", "Observable", "Perplexity"],
    live: "",
    detail: {
      what: "Transforms raw enterprise data dumps into interactive dashboards. AI analyses structure, selects appropriate visualisations, and narrates key insights. Humans confirm. Teams act.",
      why: "Enterprise analytics tools assume users know which chart type to use. Most don't. Visual Intelligence abstracts that decision away — letting operations teams focus on what the data means, not how to display it.",
      learning: "The narrative layer — AI describing what the chart shows in plain language — increased comprehension by 40% in user testing. The visual was secondary to the story.",
      tech: ["Claude API", "D3.js", "Observable", "Perplexity"]
    }
  }

  /* ── TO ADD A NEW VIBE-CODED APP ─────────────────────────
  ,{
    id: "yourapp",
    num: "05",
    iconSvg: `<path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z"/>`,
    name: "Your App Name",
    status: "Live & Deployed",        // or "In Development" / "Beta Testing"
    statusType: "live",               // "live" shows green badge, "default" shows grey
    desc: "One or two sentence description shown on the card.",
    tags: ["Tech 1", "Tech 2", "Tech 3"],
    live: "https://yourapp.vercel.app/",  // leave "" if not deployed
    detail: {
      what: "Full description of what it is.",
      why: "Why you built it.",
      learning: "Key learning from building it.",
      tech: ["Tech 1", "Tech 2", "Tech 3"]
    }
  }
  ──────────────────────────────────────────────────────── */
];

/* ─────────────────────────────────────────────
   PHILOSOPHY — Your design beliefs
   Edit the items array to update
───────────────────────────────────────────── */
const PHILOSOPHY = {
  sidebar: {
    heading: "What most designers get wrong.",
    sub: "A design philosophy built from 8 years of watching what actually works — and what just looks like it does."
  },
  items: [
    {
      heading: "Originality is overvalued. Legibility of intent is not.",
      body: "Design culture treats 'distinctive' as automatically good. But most successful design is not remembered because it looked radically new — it worked so naturally that users stopped noticing it."
    },
    {
      heading: "Consistency that preserves confusion is worse than inconsistency that improves comprehension.",
      body: "Good design breaks its own rules when breaking them serves the user better. Consistency is a tool, not a principle."
    },
    {
      heading: "Minimalism is frequently mistaken for simplicity.",
      body: "Removing visible elements can increase cognitive load if users must infer more. Simplicity is a cognitive state — not a visual one."
    },
    {
      heading: "Delight does not compensate for ambiguity.",
      body: "Animation, branding, and polish amplify understanding — they rarely create it. Design first, then delight."
    },
    {
      heading: "Taste is not the same as judgment.",
      body: "Taste helps you recognize quality. Judgment helps you decide what matters under constraints. The best work I have seen comes from people who have both."
    }
  ]
};

/* ─────────────────────────────────────────────
   CAPABILITIES — Skills displayed in 2x2 grid
───────────────────────────────────────────── */
const CAPABILITIES = [
  {
    icon: "🎨",
    name: "Design Foundations",
    items: ["UX & Interaction Design", "Information Architecture", "Wireframing & Prototyping", "Visual Design Systems"]
  },
  {
    icon: "🔬",
    name: "Research & Validation",
    items: ["User Research & Interviews", "Usability Testing", "A/B Testing & Heuristics", "WCAG Accessibility Audits"]
  },
  {
    icon: "🏗️",
    name: "Product Strategy",
    items: ["Stakeholder Workshops", "Agile / Scrum Leadership", "Design System Architecture", "Cross-functional Alignment"]
  },
  {
    icon: "🤖",
    name: "AI-Assisted Design",
    items: ["Claude, GPT-4, Copilot", "Perplexity, Lovable", "AI UX Pattern Design", "Prompt-to-UI Workflows"]
  }
];

/* ─────────────────────────────────────────────
   UX PROCESS STEPS
───────────────────────────────────────────── */
const PROCESS_STEPS = [
  { icon: "🔍", name: "Understand Users",  desc: "Research, interviews, behaviour analysis" },
  { icon: "🎯", name: "Define Problems",   desc: "Frame what actually matters to solve" },
  { icon: "🗺️", name: "Build Flows",       desc: "User journeys, IA, wireframes" },
  { icon: "⚡", name: "Prototype",         desc: "High-fidelity interactions, micro-motion" },
  { icon: "✅", name: "Validate",          desc: "Usability tests, A/B, heuristics" },
  { icon: "🏗️", name: "Ship Systems",      desc: "Design systems, documentation, scale" }
];

/* ─────────────────────────────────────────────
   FOCUS MODE TRACKS
───────────────────────────────────────────── */
const FOCUS_TRACKS = [
  { name: "Focused Flow",      artist: "Ambient · Design Mode" },
  { name: "Creative Sessions", artist: "Lo-fi · Upbeat"        },
  { name: "Deep Systems",      artist: "Techno · Deep Work"    }
];

/* ─────────────────────────────────────────────
   AI CHAT — Knowledge base for fallback
───────────────────────────────────────────── */
const AI_KB = {
  "p&g":        "P&G ICLS: Lakshmanan unified 6 fragmented research systems into one AI-powered portal. Result: +30–40% research speed and −25% duplicate studies across 180 countries.",
  "ssc":        "SSC Payroll: Role-based dashboard redesign for a multi-billion-dollar enterprise. +25% efficiency and +40% mobile adoption. Won iWin Accessibility Excellence Award 2025.",
  "schneider":  "Schneider Electric: Rebuilt B2B checkout with role-based purchasing flows for 50K+ industrial customers. +25% conversions, −15% cart abandonment.",
  "philosophy": "Lakshmanan believes most designers overvalue originality and undervalue legibility of intent. The best design creates the right mental state — not just the right visual.",
  "ai":         "He is building Design Copilot (AI interface generator), Process Builder (workflow bottleneck detector), and Visual Intelligence (data to dashboard AI). Gravity Sketchpad is live at gravity-sketchpad-pro.vercel.app",
  "gravity":    "Gravity Sketchpad Pro is live at gravity-sketchpad-pro.vercel.app — a physics-based drawing canvas used by 200+ designers for ideation.",
  "contact":    "Email: lakshmanan.uxpro@gmail.com | LinkedIn: linkedin.com/in/lakshmanan-ux | Behance: behance.net/lakshmanankurichi",
  "hire":       "Lakshmanan is open to senior product design roles. Interested in enterprise products with real scale. Reach him at lakshmanan.uxpro@gmail.com",
  "award":      "Lakshmanan won the iWin Award for Accessibility Excellence at LTIMindtree in 2025, and a Pat on the Back Award in 2023."
};
