### Résumé
Ajoute des démos statiques pour portfolio cybersécurité : SOC simulé, recherche CVE mock et mini-CTF, ainsi que améliorations d'accessibilité.

### Type de changement
- [x] Nouvelle fonctionnalité
- [x] Correction / amélioration

### Détails
- Section `#demos` ajoutée avec SOC et CVE search
- Fichier `cve_mock.json` ajouté
- Mini CTF statique (Base64 decode + flag)
- Améliorations ARIA, skip link et focus styles
- Mise à jour `README.md` pour déploiement et accessibilité

### Tests
- Démarrer un serveur statique local et vérifier :
  - Recherche CVE retourne des résultats
  - SOC génère des alertes, pause/reprise fonctionne
  - Mini CTF accepte le flag `CTF{keeps_it_simple_2026}`

### Checklist
- [ ] Code testé localement
- [ ] Liens vérifiés
- [ ] Acccessibilité testée (Lighthouse / pa11y)

### Notes de déploiement
Déployer `index.html` sur GitHub Pages; le chat IA nécessite un proxy server (`/server`) déployé séparément si souhaité.