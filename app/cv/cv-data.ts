export interface CvData {
  name: string;
  title: string;
  bio?: string;
  about: {
    email: string;
    address: string;
    birthDate: string;
    phone: string;
  };
  langues: string[];
  atouts: string[];
  centresInteret: {
    name: string;
    detail?: string;
  }[];
  reseauxSociaux: {
    platform: "github" | "youtube" | string;
    handle: string;
  }[];
  diplomes: {
    title: string;
    period: string;
    school: string;
    location: string;
  }[];
  experiences: {
    title: string;
    period: string;
    roleOrContext?: string;
    description: string;
  }[];
  realisations: {
    title: string;
    period: string;
    description: string;
  }[];
  competences: {
    title: string;
    details: string;
  }[];
}

// Données fictives pour Git / dépôt public
export const cvData: CvData = {
  name: "ALEXANDRE\nDUPONT",
  title: "ÉTUDIANT EN\nINFORMATIQUE",
  bio: "Étudiant en génie logiciel et développement d'applications passionné par les architectures modernes. Je souhaite intégrer une formation d'excellence pour consolider mes compétences et réaliser des projets d'envergure.",
  about: {
    email: "alexandre.dupont.demo@example.com",
    address: "Lyon, France",
    birthDate: "15/05/2002",
    phone: "+33 6 00 00 00 00",
  },
  langues: ["Français", "Anglais"],
  atouts: [
    "Conception logicielle & Architectures modulaires web et cloud.",
    "Bases de données relationnelles et NoSQL, modélisation avancée.",
    "Autonomie technique, curiosité et veille permanente.",
  ],
  centresInteret: [
    {
      name: "Systèmes embarqués",
      detail: "(Projets IoT et domotique open-source)",
    },
    { name: "Jeux vidéo" },
    { name: "Course à pied" },
    { name: "Musique" },
  ],
  reseauxSociaux: [
    { platform: "github", handle: "@alexdupont" },
    { platform: "youtube", handle: "@TechDemo" },
  ],
  diplomes: [
    {
      title: "Licence Informatique et Systèmes Numériques",
      period: "2023 - 2025",
      school: "Université Technologique",
      location: "Lyon, France",
    },
    {
      title: "Baccalauréat Scientifique (NSI & Mathématiques)",
      period: "2020 - 2023",
      school: "Lycée Polyvalent",
      location: "Lyon, France",
    },
  ],
  experiences: [
    {
      title: "Création de solutions web et logicielles",
      period: "2023 - Présent",
      roleOrContext: "Freelance",
      description:
        "Développement de plateformes d'automatisation et de services numériques sur mesure pour PME et artisans.",
    },
  ],
  realisations: [
    {
      title: "Plateforme de gestion éco-responsable des ressources",
      period: "2024",
      description:
        "Création d'une application de suivi d'énergie pour bâtiments connectés avec alertes temps réel.",
    },
  ],
  competences: [
    {
      title: "Développement informatique",
      details: "TypeScript, Python, Go, Next.js",
    },
    {
      title: "Outils & DevOps",
      details: "Git, Docker, Linux, CI/CD",
    },
    {
      title: "Bureautique & Conception",
      details: "Figma, Notion, Suites Office",
    },
  ],
};
