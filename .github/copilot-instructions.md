## Purpose
Provide concise, actionable instructions for an AI coding agent working on this single-file static portfolio.

## Big picture
- Single-page static site: everything (markup, styles, JS) lives in `index.html`.
- Major responsibilities:
  - Project cards & modal UI (client-side data driven via `data-*` attributes).
  - Chatbot that calls Google Generative Language API from the client.
  - SOC widget that appends simulated logs.

## Key files / entrypoints
- `index.html` — entire application. Inspect for all behavior.

## Important DOM/API hooks (use these exactly)
- Projects & modal: `#projects`, `.tags-source`, `openModal()`, `projectDetails` object.
- Modal targets: `#modal`, `#modal-title`, `#modal-desc`, `#modal-img`, `#modal-tags`, `#modal-link`.
- SOC widget: `#soc-widget`, `#log-container`, functions `addLog()` and `toggleSoc()`.
- Chatbot: `#chat-window`, `#chat-messages`, `#chat-input`, functions `sendMessage()` and `getBestModel()`.

## Patterns & conventions to follow
- Add project cards by duplicating an existing card in `#projects`, set `data-title`, `data-desc`, `data-img`, optional `data-link`, and add tag badges inside `.tags-source`.
- Prefer adding rich modal text in `projectDetails` (top of inline script) keyed by the `data-title` rather than embedding large HTML in `data-desc`.
- The modal copies badges by assigning `targetTags.innerHTML = sourceTags.innerHTML`; preserve this pattern.
- UI strings are in French — keep that language unless asked otherwise.

## Security & operational notes (must follow)
- A public API key is present in `index.html` as `API_KEY`. Do NOT commit any replacement API keys in plaintext. If you need to change chat behavior, implement a server-side proxy (e.g., POST `/api/chat`) that reads the key from environment variables.
- CSP: `index.html` contains a Content-Security-Policy meta tag. When adding external hosts (scripts, fonts, images, connect-src), update the CSP accordingly.
- The code currently uses `innerHTML` for known/trusted content (`projectDetails`) — if you accept arbitrary HTML later, sanitize with DOMPurify before assigning.

## How to preview / developer workflow
- No build step. Serve folder with a static server locally (Windows PowerShell):

```powershell
python -m http.server 8000
# or, if Node is available
npx http-server -c-1 .
```

## Chatbot-specific guidance
- Current flow: client calls `generativelanguage.googleapis.com` using `API_KEY` from `index.html`.
- Prefer implementing a server proxy `/api/chat` that inserts the key from env vars and forwards requests. Update `sendMessage()` to POST to the proxy.
- Keep `getBestModel()` logic server-side if possible to avoid leaking model discovery traffic.

## Small examples (exact strings you may modify)
- ProjectDetails object key example: `projectDetails["App Web Gestion Décodeur"]` — add expanded HTML there.
- Modal invocation: `openModal(element)` reads `element.getAttribute('data-title')` and prefers `projectDetails[title]`.

## What not to do
- Do not commit secrets. If you find the `API_KEY` constant in `index.html`, stop and propose moving it to server-side env.
- Do not change the site language from French without permission.

## Next steps for maintainers (suggested)
- Replace client-side API key with a server proxy and update `sendMessage()` to use `/api/chat`.
- Consider splitting JS into `chat.js`, `projects.js` and adding a minimal preview CI step.

If any part of this doc is unclear or you want it expanded (proxy stub, exact CSP lines, or automated tests), tell me which area to iterate on.
## Purpose
Provide concise, actionable guidance for an AI coding agent working on this repository (single-file static portfolio).

## Big picture
- Single-page static site: all logic, styles and markup are contained in `index.html`.
- Styling: Tailwind CSS loaded from CDN plus a small inline CSS block (custom classes: `fade-in-up`, `cyber-text`, `bg-grid`).
- Client integrations: Google Generative Language API (chat), Formspree (contact form), Google Fonts, and remote images via HTTPS.

## Key files to inspect
- [index.html](index.html) — entire application lives here (markup, JS, CSS, CSP, API key).

## Major components & data flow
- Hero / static sections: plain HTML + Tailwind classes.
- Projects/skills cards: interactive via `data-*` attributes (e.g., `data-title`, `data-desc`, `data-img`, `data-link`) and a shared `openModal()` function that fills a modal from these attributes.
- Rich project descriptions: stored in the `projectDetails` JS object at the top of the inline script; `openModal()` prefers this object over `data-desc` when present.
- SOC widget: simulated live logs appended to `#log-container` by `addLog()`; toggle via `toggleSoc()`.
- Chatbot: client-side calls to Google Generative Language API. Model selection happens in `getBestModel()`; the API key is in the constant `API_KEY` (client-side) — treat as a secret to remove or replace with a server proxy.

## Project-specific conventions (do these exactly)
- To add a project card: duplicate an existing card inside the `#projects` section, set `data-title`, `data-desc`, `data-img`, optional `data-link`, and include tags inside the `.tags-source` element. The modal uses those attributes and the `projectDetails` object.
- Use `tags-source` to provide badge HTML that is copied into the modal (`targetTags.innerHTML = sourceTags.innerHTML`).
- Use French for UI strings and chatbot prompts (`lang="fr"`).
- Preserve the CSP meta tag at the top of `index.html` when changing external origins; update `script-src`, `style-src`, `connect-src`, `font-src`, and `img-src` if you add endpoints.

## Security & operational notes (critical)
- The repository currently contains a public API key in `index.html` (constant `API_KEY`). DO NOT commit any replacement keys in plaintext. Preferred fixes:
  - Move the chat API calls to a server-side endpoint and store credentials in environment variables.
  - If client calls must remain, restrict the API key using HTTP referrers (Google Cloud Console) and update the CSP accordingly.
- The contact form posts to Formspree (`action="https://formspree.io/f/xpqzklyp"`). No server-side email handling here.

## How to preview / developer workflow
- There is no build step. To preview locally, serve the folder using a static server. Examples:
  - Python (Windows PowerShell):
    ```powershell
    python -m http.server 8000
    ```
  - Node (if installed):
    ```powershell
    npx http-server -c-1 .
    ```
- Or open `index.html` in a browser (some features like fetch to remote APIs may be restricted by CORS/file://).

## When modifying code, follow these patterns
- Keep all DOM queries performed once where practical — current code caches elements by id and mutates them directly.
- Preserve `data-*` usage for content; prefer editing `projectDetails` for rich modal HTML rather than inserting raw HTML into `data-desc` to avoid escaping pitfalls.
- When adding external network calls, update the CSP meta and `connect-src` to include the new host.

## Chatbot-specific instructions (high priority)
- The chat flow does client-side fetches to `generativelanguage.googleapis.com` using `API_KEY`. To change/improve:
  - Implement a server-side proxy at `/api/chat` that injects the API key from env vars.
  - Update `sendMessage()` to POST to your proxy instead of calling Google directly.
  - Keep `getBestModel()` logic server-side if possible; client-side model discovery leaks traffic patterns.

## Examples (concrete edits)
- Add a project: copy a card in the `#projects` grid and set:
  - `data-title="Mon Projet"`
  - `data-desc="Courte description"`
  - `data-img="https://...jpg"`
  - add tag badges inside the `.tags-source` element.
- Provide an extended modal description: add an entry in the `projectDetails` object (top of the inline script) keyed by the card title.

## Tests / CI
- No tests or CI configured in this repo. Recommend adding a simple static site preview job if you add build steps.

## What the agent must not do
- Do not commit any plaintext secrets (API keys). If you detect a key in code, stop and suggest moving it to a server or secret store.
- Do not change the language (French) unless asked.

## Important IDs & entrypoints
- Modal: `#modal`, `#modal-title`, `#modal-desc`, `#modal-img`, `#modal-tags`, `#modal-link`
- Projects: `#projects`, `projectDetails` object, `.tags-source`
- Chatbot: `#chat-window`, `#chat-messages`, `#chat-input`, functions `sendMessage()`, `getBestModel()`, constant `API_KEY`
- SOC widget: `#soc-widget`, `#log-container`, `addLog()`, `toggleSoc()`

## Onboarding checklist (quick)
1. Run a local static server: `python -m http.server 8000` and confirm the modal and SOC logs work.
2. Search for `API_KEY` in `index.html` and propose a server-side `/api/chat` proxy that injects the key from environment variables; update `sendMessage()` to POST to the proxy.
3. If you add remote hosts, update the CSP meta (script-src, connect-src, style-src, img-src, font-src).

## Next steps for maintainers (suggested)
- Remove `API_KEY` from `index.html` and replace with a server proxy.
- Consider using DOMPurify if you ever accept dynamic or external HTML into `projectDetails`.
- Split JS into modular files if the site grows (e.g., `projects.js`, `chat.js`) and add a minimal build/preview pipeline (simple static-preview CI).

If anything above is unclear or you want more examples (e.g., a proxy stub or exact CSP lines), tell me which area to expand.
