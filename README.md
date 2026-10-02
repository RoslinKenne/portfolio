# Portfolio de Zoyem Roslin Kenne

Site statique en français. Ouvrir index.html ou servir le dossier :

Contenu actualisé le 2 octobre 2026 à partir du CV et de la lettre fournis : stage QA/sécurité, projets cyber 2026, fin de formation prévue en décembre 2026 et disponibilité en janvier 2027. Le CV téléchargeable est `CV_Zoyem_Roslin_Kenne_Cybersecurite.pdf`. Les descriptions du stage restent générales et ne publient aucune donnée client. La lettre n'est pas publiée.

```sh
python3 -m http.server 8000
```

Le CSS est déjà compilé dans styles.css. Pour modifier les styles : Node.js 24, `npm ci`, puis `npm run build`. Le CV et les images sont inclus localement. Le site reste lisible sans JavaScript ; le menu mobile dispose d’une navigation de secours et les animations respectent la réduction des mouvements. Les descriptions de projets correspondent au code des dépôts accessibles.

Contact : le formulaire conserve le service Formspree déjà configuré et une adresse mail directe est affichée comme alternative. La réception réelle doit être vérifiée dans le compte Formspree par le propriétaire ; les tests interceptent l’envoi et n’envoient aucun message.

```sh
npm ci
npx playwright install --with-deps chromium
TEST_URL=http://127.0.0.1:8000/ npm test
```

Lancer le serveur local dans un autre terminal. Les tests vérifient le menu, les liens, images et PDF, l’absence de débordement horizontal, le formulaire, l’affichage sans JavaScript et les préférences d’animation.

## Validation

Les tests couvrent les scénarios décrits ci-dessous. Ils vérifient la version corrigée ; ils ne garantissent pas tous les usages possibles.
