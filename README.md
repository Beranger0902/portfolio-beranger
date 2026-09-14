# Portfolio de Beranger Agbodainon

Portfolio animé construit avec Next.js 15, TypeScript, Tailwind CSS et Framer Motion.

## Installation

```bash
npm install
npm run dev
```

Ouvre ensuite `http://localhost:3000`.

## Build de production

```bash
npm run build
npm start
```

## Structure

```text
src/
  app/
    page.tsx                 Page d'accueil (one-page)
    projets/[slug]/page.tsx  Page dédiée à chaque projet (étude de cas + démo interactive)
  components/                Sections animées (Hero, About, Skills, Projects, Timeline, Contact…)
  components/demos/          Démos interactives (une par projet)
  data/
    profile.ts               Infos personnelles (email, liens, photo…)
    projects.ts              Liste des projets : textes, stack, liens, image de couverture
public/
  CV_Beranger_Agbodainon.pdf CV (aperçu dans une modale avant téléchargement)
  profile.svg                Avatar par défaut
  projects/*.svg             Images de couverture des projets
```

## Personnaliser

- **Photo** : dépose `public/profile.jpg` puis mets `photo: "/profile.jpg"` dans `src/data/profile.ts`.
- **CV** : remplace `public/CV_Beranger_Agbodainon.pdf`. Le bouton « Voir mon CV » ouvre un aperçu ; le téléchargement se fait depuis la modale.
- **Projets** : modifie `src/data/projects.ts`. Chaque projet a un `slug` (URL `/projets/<slug>`), une image `cover`, des `links` (`demo`, `site`, `github`) et un `demoComponent` optionnel.
- **Liens GitHub** : par défaut ils pointent vers le profil `github.com/Beranger0902` — remplace-les par l'URL de chaque dépôt.

## Pages projets

| Projet | URL | Démo interactive |
| --- | --- | --- |
| Plateforme de gestion des présences | `/projets/gestion-presences` | Pointage géolocalisé |
| Site web de Drwintech | `/projets/site-drwintech` | Rapport de performance |
| Plateforme de gestion d'événements | `/projets/gestion-evenements` | Billetterie + QR code |
| Speed Go | `/projets/speed-go` | Commande de course (mobile) |
| AfriFlow | `/projets/afriflow` | Kanban de livraisons |
| KoraBudget | `/projets/korabudget` | Suivi budgétaire |
| MediLink Afrique | `/projets/medilink-afrique` | Prise de rendez-vous |

## Déploiement Vercel

1. Pousse le projet sur GitHub.
2. Connecte le dépôt à Vercel — Next.js est détecté automatiquement.
3. Aucune variable d'environnement n'est nécessaire.
