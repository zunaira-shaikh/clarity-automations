# Clarity Automations - Website

A production-ready, single-page website for **Clarity Automations**, a founder-led
AI automation consultancy. Built with plain **HTML5 + CSS3 + jQuery** (no build
tools, no frameworks) and ready to deploy to GitHub Pages.

> "I build practical AI systems that quietly remove repetitive work, so your
> team can focus on the work that matters."

---

## 1. File structure

```
index.html                     All sections + SEO metadata + structured data
css/style.css                  Design tokens, layout, responsive rules
js/script.js                   jQuery interactions + form validation
images/
  favicon.svg                  Browser tab icon (wired up)
  profile.png                  Founder portrait (empty placeholder file)
  certifications/              Optional certificate images (folder README inside)
  projects/                    Project screenshots (folder README inside)
```

---

## 2. Where to place your files

| File                           | Where to put it                          |
| ------------------------------ | ---------------------------------------- |
| Profile photo (portrait)       | `images/profile.png` (keep that filename) |
| Certificate images (optional)  | `images/certifications/`                 |
| Project screenshots            | `images/projects/`                       |

`images/projects/README.md` lists the exact filenames and how to swap a
placeholder for a real screenshot.

---

## 3. What to edit (personalization)

Search every file for the marker **`[PERSONALIZE]`**. The important ones live in
`index.html`:

1. **Contact email**: look for `class="js-email"`. It appears in the Contact
   section and the footer. The contact form reads it automatically, so changing
   it there is enough.
2. **LinkedIn / GitHub URLs**: in the Contact section, footer, and the JSON-LD
   `<script type="application/ld+json">`.
3. **Agency name**: the header brand, hero label, footer logo, `<title>`, and
   meta tags. It is already set to **Clarity Automations**.
4. **Your name / title**: About section; already set to **Zunaira Shaikh -
   Founder & AI Solutions Developer**.
5. **Meta / Open Graph**: `og:url` and the canonical link are placeholders
   (`[your-deployed-site-url]`). Replace them after deploying. `og:image`
   expects `images/og-image.jpg` if you want a share preview card.
6. **Fonts**: IBM Plex Sans + IBM Plex Mono load from Google Fonts with a
   system-font fallback. You can remove the two `<link>` tags in the `<head>` if
   you prefer to go fully offline.

---

## 4. Where to add content

| Content              | Where |
| -------------------- | ----- |
| Certifications       | `#certifications` section. Your three real Coursera credentials are already wired in with verification links. Add images per `images/certifications/README.md`. |
| Projects             | `#projects` section. The four builds are described; add screenshots and real "View Project" URLs per `images/projects/README.md`. |
| Portfolio details    | Same `#projects` section; the copy is inside each `.project-body`. |
| Technologies         | `#technologies` list. Add or remove `.tech-item` entries. |
| New sections         | Copy an existing `<section class="section...">` pattern and add a matching nav link. |

---

## 5. Run locally

No build tools or installs required. Either:

- **Double-click** `index.html`, or
- From a terminal in this folder:

```bash
# with Python
python -m http.server 8000

# with Node
npx http-server .
```

Then open `http://localhost:8000`.

Tip: opening `index.html` directly via `file://` works too, but the mailto form
and hash navigation behave the same on a local server.

---

## 6. Deploy to GitHub Pages

1. Create a GitHub repository, e.g. `clarity-automations`.
2. Push this folder (all files, keeping `index.html` at the root):

```bash
git init
git add .
git commit -m "Add Clarity Automations website"
git branch -M main
git remote add origin https://github.com/zunaira-shaikh/clarity-automations.git
git push -u origin main
```

3. On GitHub: **Settings -> Pages -> Build and deployment**, choose
   **Deploy from a branch**, pick `main`, and `/ (root)`. Save.
4. Your site will be live at
   `https://zunaira-shaikh.github.io/clarity-automations/`.

After the first deploy, replace the `[your-deployed-site-url]` placeholders in
`index.html` (canonical + `og:url`) with the real URL.

---

## 7. Optional backend for the contact form

The form is **intentionally frontend-only**: on submit it validates the fields,
then opens the visitor's email client with a pre-filled message via a `mailto:`
link. It does not fake sending.

To send from the site directly, pick one (options are also commented above the
form in `index.html`):

- **Formspree** - set the form's `action` to `https://formspree.io/f/YOUR_FORM_ID`
  and change the button `type` handling (keep the JS validation).
- **EmailJS** - add their SDK and replace the `mailto` block at the bottom of
  `js/script.js` with an `emailjs.send(...)` call.
- **Netlify Forms** - add `data-netlify="true"` to the `<form>` tag and deploy
  to Netlify; submissions appear in the Netlify dashboard.

The mailto hand-off is labeled clearly in `js/script.js` so it is easy to swap.

---

## 8. Design & behavior notes

- **Palette**: off-white / charcoal / near-black with a single deep-emerald
  accent. A matching dark mode follows the system setting automatically.
- **Motion**: subtle fade-up reveals and hover states only. All scroll-driven
  behavior uses IntersectionObserver (no scroll listeners) and honors
  `prefers-reduced-motion`.
- **No fabricated content**: no clients, testimonials, stats, or partnerships
  were invented. Certifications are your real Coursera credentials.