# Images

Everything the site references from the `images/` folder lives here.

## Place your files here

| File / folder          | Used for                                   | Status |
| ---------------------- | ------------------------------------------ | ------ |
| `profile.png`          | Founder portrait in the About section      | empty placeholder exists |
| `favicon.svg`          | Browser tab icon (already wired)           | done |
| `certifications/`      | Optional certificate images / logos        | see its README |
| `projects/`            | Project screenshots                        | see its README |

## Notes

- **Profile photo:** drop your photo at `images/profile.png` (portrait, roughly
  1000x1200px works well). While the file is empty, the site shows a neutral
  "ZS" placeholder instead, so the page never shows a broken image.
- **Filenames matter:** `index.html` references `images/profile.png` and
  `images/favicon.svg` by name. Keep those names (or update the HTML).