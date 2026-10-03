# Portfolio de Zoyem Roslin Kenne

Site statique publié sur https://roslinkenne.github.io/portfolio/.

La refonte conserve le contenu précédent. La version antérieure reste accessible dans `archives/2026-10-02/` et dans la branche `backup/portfolio-avant-refonte-2026-10-02`. Le PDF d’origine reste téléchargeable ; l’aperçu de CV assorti ne le remplace pas.

Les outils de cybersécurité et l’assistant sont des démonstrations locales : aucun scan ni appel Gemini. Le formulaire conserve le service Formspree existant ; les tests interceptent les requêtes et n’envoient aucun message.

CSS et JavaScript sont servis directement sans compilation. `npm run build` vérifie les fichiers indispensables. `npm test` effectue les contrôles dans Chromium contre `TEST_URL`. Pour lancer le site : `python -m http.server 8000`.

Les animations respectent les préférences système et l’interrupteur mémorisé. L’assistant réapparaît occasionnellement près des bords et reste fixe pendant l’utilisation. Les images existantes sont réutilisées ; leurs sources figurent dans `assets/SOURCES.md`.
