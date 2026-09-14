export type ProjectKind = "pro" | "demo";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  kind: ProjectKind;
  year: string;
  cover: string;
  accent: string;
  description: string;
  longDescription: string[];
  stack: string[];
  features: string[];
  results: { label: string; value: string }[];
  links: {
    demo?: string;
    site?: string;
    github?: string;
  };
  demoComponent?: "afriflow" | "korabudget" | "medilink" | "presence" | "events" | "speedgo" | "drwintech";
};

export const projects: Project[] = [
  {
    slug: "gestion-presences",
    title: "Plateforme de gestion des présences",
    tagline: "Pointage des employés par géolocalisation",
    category: "Projet professionnel — Drwintech",
    kind: "pro",
    year: "2026",
    cover: "/projects/presences.webp",
    accent: "#2dd4bf",
    description:
      "Conception et développement d'une plateforme de gestion des présences des employés par géolocalisation, avec tableau de bord RH en temps réel.",
    longDescription: [
      "Drwintech avait besoin d'un outil fiable pour suivre la présence de ses équipes réparties sur plusieurs sites. J'ai conçu une plateforme où chaque employé pointe depuis son téléphone : sa position GPS est vérifiée par rapport à un périmètre autorisé avant validation.",
      "Le tableau de bord RH agrège les pointages, calcule automatiquement les retards et les heures effectuées, et génère des rapports exportables. L'architecture repose sur une API REST sécurisée et une base de données relationnelle optimisée pour les requêtes temporelles.",
    ],
    stack: ["Next.js", "Laravel", "API REST", "MySQL", "Géolocalisation", "JWT"],
    features: [
      "Pointage géolocalisé avec périmètre autorisé par site",
      "Tableau de bord RH temps réel (présents, retards, absences)",
      "Historique par employé et export des rapports mensuels",
      "Gestion des rôles : administrateur, manager, employé",
      "Notifications de retard et d'oubli de pointage",
    ],
    results: [
      { label: "Sites couverts", value: "3+" },
      { label: "Précision GPS", value: "±15 m" },
      { label: "Temps de pointage", value: "< 3 s" },
    ],
    links: { demo: "/projets/gestion-presences#demo", github: "https://github.com/Beranger0902/drwintech_presence" },
    demoComponent: "presence",
  },
  {
    slug: "site-drwintech",
    title: "Site web de Drwintech",
    tagline: "Vitrine corporate performante et SEO-ready",
    category: "Projet professionnel — Drwintech",
    kind: "pro",
    year: "2026",
    cover: "/projects/drwintech.webp",
    accent: "#60a5fa",
    description:
      "Développement du front-end avec Next.js et du back-end avec Prisma ORM, avec une attention portée à la structuration du code et aux performances.",
    longDescription: [
      "Refonte complète du site institutionnel de Drwintech : présentation des services, portfolio de réalisations, blog et formulaire de contact connecté au CRM interne.",
      "J'ai structuré le projet en modules réutilisables, mis en place Prisma pour la couche de données et optimisé le rendu côté serveur pour un score Lighthouse élevé.",
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Rendu hybride SSR / SSG pour des pages ultra rapides",
      "Espace d'administration pour gérer services et actualités",
      "Formulaire de contact avec validation et anti-spam",
      "SEO technique : métadonnées, sitemap, données structurées",
      "Design responsive et accessible",
    ],
    results: [
      { label: "Score Lighthouse", value: "95+" },
      { label: "Pages", value: "12" },
      { label: "Temps de chargement", value: "< 1 s" },
    ],
    links: { site: "https://drwintech.com", demo: "/projets/site-drwintech#demo", github: "https://github.com/Beranger0902/site-vitrine" },
    demoComponent: "drwintech",
  },
  {
    slug: "gestion-evenements",
    title: "Plateforme de gestion d'événements",
    tagline: "Billetterie, inscriptions et suivi en temps réel",
    category: "Projet professionnel — Drwintech",
    kind: "pro",
    year: "2026",
    cover: "/projects/events.webp",
    accent: "#f472b6",
    description:
      "Développement d'une plateforme de gestion d'événements avec Next.js et Drizzle ORM, modélisation de la base de données et documentation technique.",
    longDescription: [
      "Une plateforme SaaS permettant aux organisateurs de créer des événements, gérer les inscriptions, émettre des billets avec QR code et suivre les participants le jour J.",
      "J'ai pris en charge la modélisation complète de la base de données avec Drizzle ORM, l'architecture multi-tenant et la rédaction de la documentation technique pour l'équipe.",
    ],
    stack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Architecture SaaS", "QR Code", "Stripe"],
    features: [
      "Création d'événements avec pages publiques personnalisables",
      "Billetterie avec génération de QR codes et scan à l'entrée",
      "Architecture multi-tenant : un espace par organisateur",
      "Tableau de bord : ventes, inscriptions, taux de présence",
      "Documentation technique et schéma de base de données",
    ],
    results: [
      { label: "Tables modélisées", value: "18" },
      { label: "Multi-tenant", value: "Oui" },
      { label: "Documentation", value: "100 %" },
    ],
    links: { demo: "/projets/gestion-evenements#demo", github: "https://github.com/Beranger0902" },
    demoComponent: "events",
  },
  {
    slug: "speed-go",
    title: "Speed Go",
    tagline: "Application mobile de transport à la demande",
    category: "Hackathon — FRIARE 2025",
    kind: "pro",
    year: "2025",
    cover: "/projects/speedgo.webp",
    accent: "#fb923c",
    description:
      "Développement du back-end en API REST, conception UI/UX et réalisation du prototype de présentation d'une application mobile.",
    longDescription: [
      "Lors du hackathon FRIARE 2025, notre équipe a imaginé Speed Go : une application qui met en relation passagers et conducteurs de zémidjans (moto-taxis) pour des trajets rapides et sécurisés à Cotonou.",
      "J'ai développé l'API REST (authentification, gestion des courses, calcul du tarif), conçu l'interface mobile et réalisé le prototype présenté au jury.",
    ],
    stack: ["Node.js", "Express", "API REST", "Figma", "UI/UX", "Prototype mobile"],
    features: [
      "Commande d'une course en 3 étapes",
      "Estimation du prix et du temps de trajet",
      "Suivi du conducteur en temps réel",
      "Historique et évaluation des courses",
      "Prototype interactif présenté au jury",
    ],
    results: [
      { label: "Durée", value: "48 h" },
      { label: "Endpoints API", value: "14" },
      { label: "Écrans prototypés", value: "9" },
    ],
    links: { demo: "/projets/speed-go#demo", github: "https://github.com/Beranger0902" },
    demoComponent: "speedgo",
  },
  {
    slug: "afriflow",
    title: "AfriFlow",
    tagline: "SaaS de gestion des flux de livraison",
    category: "Projet de démonstration",
    kind: "demo",
    year: "2026",
    cover: "/projects/afriflow.webp",
    accent: "#34d399",
    description:
      "Plateforme SaaS de gestion des flux de livraison adaptée aux petites entreprises africaines : suivi des colis, tournées et livreurs.",
    longDescription: [
      "AfriFlow répond à un besoin concret : les petites entreprises de e-commerce et de restauration gèrent leurs livraisons sur WhatsApp et dans des cahiers. La plateforme centralise commandes, livreurs et tournées dans une interface simple, utilisable sur mobile.",
      "La démo interactive ci-dessous illustre le tableau de bord : suivi des colis par statut, attribution des livreurs et vue d'ensemble des performances du jour.",
    ],
    stack: ["Next.js", "Laravel", "PostgreSQL", "Docker", "Redis", "API REST"],
    features: [
      "Suivi des colis par statut (en attente, en route, livré)",
      "Attribution des livreurs et optimisation des tournées",
      "Notifications SMS / WhatsApp aux clients",
      "Tableau de bord des performances quotidiennes",
      "Mode hors-ligne pour les livreurs",
    ],
    results: [
      { label: "Livraisons / jour", value: "200+" },
      { label: "Gain de temps", value: "40 %" },
      { label: "Erreurs réduites", value: "-60 %" },
    ],
    links: { demo: "/projets/afriflow#demo", github: "https://github.com/Beranger0902" },
    demoComponent: "afriflow",
  },
  {
    slug: "korabudget",
    title: "KoraBudget",
    tagline: "Suivi budgétaire simple pour associations",
    category: "Projet de démonstration",
    kind: "demo",
    year: "2026",
    cover: "/projects/korabudget.webp",
    accent: "#a78bfa",
    description:
      "Outil de suivi budgétaire simple pour associations, entrepreneurs et organisations locales : dépenses, recettes et prévisions.",
    longDescription: [
      "KoraBudget offre aux petites structures une alternative aux tableurs : saisie rapide des recettes et dépenses, catégorisation automatique et visualisation claire de la santé financière.",
      "La démo permet d'ajouter des transactions et de voir le budget se mettre à jour en direct, avec une répartition par catégorie.",
    ],
    stack: ["Vue.js", "Node.js", "Express", "Redis", "SQLite", "API REST"],
    features: [
      "Saisie de transactions en quelques secondes",
      "Catégories personnalisables et budgets par poste",
      "Graphiques de répartition et d'évolution",
      "Export PDF / Excel pour les assemblées générales",
      "Multi-utilisateurs avec rôles trésorier / membre",
    ],
    results: [
      { label: "Prise en main", value: "5 min" },
      { label: "Catégories", value: "Illimitées" },
      { label: "Export", value: "PDF / XLSX" },
    ],
    links: { demo: "/projets/korabudget#demo", github: "https://github.com/Beranger0902" },
    demoComponent: "korabudget",
  },
  {
    slug: "medilink-afrique",
    title: "MediLink Afrique",
    tagline: "Prise de rendez-vous pour structures de santé",
    category: "Projet de démonstration",
    kind: "demo",
    year: "2026",
    cover: "/projects/medilink.webp",
    accent: "#38bdf8",
    description:
      "Plateforme de prise de rendez-vous et de suivi administratif pour structures de santé : agenda des praticiens, dossiers patients et rappels.",
    longDescription: [
      "MediLink Afrique fluidifie l'accueil des centres de santé : les patients réservent en ligne, les praticiens gèrent leur agenda et l'administration suit les dossiers sans paperasse.",
      "La démo présente le parcours de réservation côté patient : choix du praticien, du créneau et confirmation instantanée.",
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "JWT", "Tailwind CSS", "Responsive UI"],
    features: [
      "Réservation en ligne par spécialité et praticien",
      "Agenda partagé avec gestion des disponibilités",
      "Dossier patient sécurisé (JWT, chiffrement)",
      "Rappels SMS automatiques avant le rendez-vous",
      "Statistiques de fréquentation pour la direction",
    ],
    results: [
      { label: "Réservation", value: "< 1 min" },
      { label: "Rappels envoyés", value: "Auto" },
      { label: "No-show", value: "-35 %" },
    ],
    links: { demo: "/projets/medilink-afrique#demo", github: "https://github.com/Beranger0902" },
    demoComponent: "medilink",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
