# Samuel Ashenafi Gizaw — portfolio

Personal portfolio built as an editor window: the file tree is the navigation,
the gutter numbers run as one continuous file, and the status bar tracks which
section you're in. React + Vite, no UI framework, no runtime dependencies
beyond React itself.

**Live:** https://sam141990.github.io/portfolio/

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the built output
```

Node 18 or newer.

## Push it to GitHub

Create an empty repository on GitHub first — no README, no .gitignore, no
license, since this repo already has them. Then, from this folder:

```bash
git remote add origin https://github.com/sam141990/portfolio.git
git branch -M main
git push -u origin main
```

This folder already has a first commit made. If you'd rather start the history
yourself, delete the `.git` directory and run `git init && git add . &&
git commit -m "Initial commit"` before the lines above.

## Publish it on GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
One-time setup after your first push:

1. Repository **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push anything to `main` — the workflow runs and the site goes live at
   `https://<username>.github.io/<repo>/`

`vite.config.js` uses `base: "./"`, so the build works from any sub-path
without further configuration. `public/.nojekyll` stops GitHub from running
Jekyll over the output.

### Other hosts

The build is plain static files. Vercel, Netlify and Cloudflare Pages all work
with build command `npm run build` and output directory `dist`.

### Custom domain

Add a `public/CNAME` file containing just your domain, then point a DNS
`CNAME` record at `<username>.github.io`.

## Where to edit

All copy lives in constants at the top of `src/App.jsx`, so changing what the
site says never means touching layout code.

| constant   | what it drives                                       |
| ---------- | ---------------------------------------------------- |
| `PROFILE`  | name, location, email, phone, GitHub, LinkedIn       |
| `BOOT`     | the typed terminal sequence in the hero              |
| `ABOUT`    | the about paragraphs                                 |
| `TRAITS`   | the working-style bullets                            |
| `JOBS`     | experience entries                                   |
| `WORK`     | selected work entries                                |
| `FOCUS`    | the animated focus bars (self-reported percentages)  |
| `RADAR`    | domain-coverage radar, values from 0 to 1            |
| `STACK`    | the technical strengths chips                        |
| `SECTIONS` | the file tree, tab bar, and scroll targets           |

`FOCUS` and `RADAR` are self-reported estimates rather than measured scores —
set them to whatever is actually true before sharing the site.

Colour and type are tokens at the top of `src/styles.css`. The whole palette
hangs off two accents, `--amber` and `--teal`; change those to re-theme the
page.

## Structure

```
.
├── .github/workflows/deploy.yml   GitHub Pages build + deploy
├── public/.nojekyll               keeps Pages from running Jekyll
├── src/
│   ├── App.jsx                    all content + components
│   ├── main.jsx                   React entry point
│   └── styles.css                 design tokens and layout
├── index.html                     document shell, fonts, meta tags
└── vite.config.js
```

## Accessibility and behaviour

- Full keyboard navigation with visible focus rings
- `prefers-reduced-motion` disables the typing intro, the meter animations and
  smooth scrolling
- Responsive down to small phones; the file-tree rail collapses into the tab bar
- No tracking, no analytics, no cookies

## License

MIT — see [LICENSE](LICENSE).
