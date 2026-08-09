# Projects folder

Screenshots for the four "Selected Work" cards. Each card already has a live
`<img>` pointing at its filename below: the card shows a styled placeholder
until a real file exists, then the screenshot appears automatically. Just
**drop the image in with the exact filename — no HTML edits needed.**

| Card                  | Expected filename              | Aspect ratio | Status |
| --------------------- | ------------------------------ | ------------ | ------ |
| Weather Alert Bot     | `weather-alert-bot.png`        | panoramic    | done (wired up) |
| AI Email Intelligence | `ai-email-intelligence.png`    | 16:9         | done (wired up) |
| AI Research Agent     | `ai-research-agent.png`        | 16:9         | done (wired up) |
| Smart Email Classifier| `smart-email-classifier.png`   | 16:9         | done (wired up) |

## Steps to replace one screenshot

1. Drop your replacement screenshot here with the exact filename from the table
   (1600x900px or similar, kept under ~300KB). Use a real screenshot, not a
   placeholder.
2. Refresh the page. That card shows the new screenshot automatically —
   nothing to edit in `index.html`.

## "View Project" buttons

Each card's "View Project" link currently points to `#` (a placeholder). To
wire it up, set the real project URL or repository link as its `href`, then
remove the `js-placeholder-link` class from that link so the click is no longer
intercepted by the script. The "GitHub" buttons already point at your GitHub
profile; swap them for per-repo links if you have them.