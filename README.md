# Portfolio (static)

This repo is a single-file static portfolio (`index.html`) with a demo chatbot and SOC widget.

Local preview (static):

```powershell
python -m http.server 8000
```

Deploy to GitHub Pages (quick):

1. Commit your changes on the main branch and push to GitHub.
2. In the repository settings on GitHub, enable **Pages** and select the `main` branch (or `gh-pages` branch) as the source.
3. Your site will be available at `https://<your-username>.github.io/<repo-name>/` (may take a minute).

Server proxy for chat (recommended):

1. Create `server/.env` with:

```
GOOGLE_API_KEY=YOUR_KEY_HERE
```

2. Install and run the proxy (Node.js required):

```powershell
cd server
npm install
npm start
```

The server exposes `/api/chat` which forwards requests to Google's Generative Language API using the key from the environment. This prevents shipping the key in `index.html`. If you deploy the site on GitHub Pages (static hosting), deploy the `/server` folder separately (e.g., Render, Vercel, Railway) and update the `fetch('/api/chat')` URL in `index.html` to the deployed proxy origin.

Accessibility & Mobile checks (recommended):

- Run Lighthouse in Chrome (Audits > Accessibility) and address any issues shown.
- Install `pa11y` for automated checks:

```powershell
npm install -g pa11y
pa11y http://localhost:8000
```

- Test mobile responsiveness by resizing the browser or using Chrome DevTools device toolbar.

I added an accessible "Passer au contenu" link, `aria-label` on interactive inputs, and visible focus outlines to improve keyboard navigation.
