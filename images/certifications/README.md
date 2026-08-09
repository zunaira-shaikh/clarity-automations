# Certifications folder

The Certifications section on the site already shows your **three real Coursera
credentials** (names, issuing organization, dates, and verification links are
hard-coded in `index.html`). This folder is **optional** image storage on top of
that.

## Add a certificate image (optional)

Drop a screenshot or logo here, e.g.:

- `ai-models-in-n8n.jpg`
- `workflow-automation-n8n.jpg`
- `ai-agents-n8n.jpg`

Then in `index.html`, inside each `.cert-row`, uncomment the `<img>` inside the
`.cert-thumb` element and point its `src` at your file. Currently each thumb
shows a neutral gray "Doc" placeholder, which is fine to keep.

The credential links already point to Coursera's real verification URLs, so no
other setup is required.