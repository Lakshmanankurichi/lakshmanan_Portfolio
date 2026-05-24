# Lakshmanan.I — Portfolio

Senior Product Designer · LTIMindtree · Enterprise × AI

## Quick Deploy to Vercel

1. Extract this ZIP
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag the `portfolio/` folder onto the deploy area
4. Done — live URL in ~30 seconds

## Updating Content

**All content lives in `js/data.js`** — open it and edit:

### Update a case study
Find the project object by `id` (e.g. `"pg"`, `"ssc"`, `"sch"`)
Edit any field: title, metrics, problem, decisions, constraints, behance link

### Add a new case study
1. Add your image to `assets/images/yourimage.jpg`
2. Copy the template at the bottom of `PROJECTS` array in `data.js`
3. Fill in all fields
4. Save — done

### Add a new vibe-coded app / AI experiment
1. Copy the template at the bottom of `AI_EXPERIMENTS` array in `data.js`
2. Fill in: name, desc, tags, live URL, detail fields
3. Set `statusType: "live"` for green badge, `"default"` for grey
4. Save — done

### Update personal info
Edit the `SITE` object at the top of `data.js`:
- email, linkedin, behance, resume link
- proof metrics (years, clients, products)

## File Structure

```
portfolio/
├── index.html              ← HTML shell (rarely needs editing)
├── vercel.json             ← Vercel CDN config
├── css/
│   ├── variables.css       ← All design tokens (colors, fonts, spacing)
│   ├── style.css           ← All component styles
│   └── responsive.css      ← Mobile breakpoints
├── js/
│   ├── data.js             ← ALL CONTENT — edit this to update anything
│   └── main.js             ← All interactions (cursor, panels, AI chat)
└── assets/
    ├── images/
    │   ├── photo.jpg       ← Your portrait
    │   ├── clp.jpg         ← P&G case study
    │   ├── ssc.jpg         ← SSC case study
    │   └── ecommerce.jpg   ← Schneider case study
    └── logos/
        ├── pg.svg
        ├── schneider.svg
        ├── lt.svg
        ├── akzonobel.svg
        └── bb.svg
```

## Local Development

No build tools needed. Just open `index.html` in a browser.

For local server (avoids CORS on fonts):
```bash
npx serve .
# or
python3 -m http.server 3000
```

## Custom Domain on Vercel

1. Go to your project → Settings → Domains
2. Add `lakshmanan.design` (or any domain)
3. Follow DNS instructions

---
Built with Bricolage Grotesque · Teal #064d43 · Vercel
