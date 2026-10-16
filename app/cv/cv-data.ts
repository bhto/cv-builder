export interface LanguageItem {
  name: string;
  levelPercent: number;
}

export interface ReferenceItem {
  name: string;
  role: string;
  phone: string;
}

export interface CvData {
  name: string;
  title: string;
  bio?: string;
  about: {
    email: string;
    address: string;
    birthDate: string;
    nationality?: string;
    phone: string;
  };
  langues: (string | LanguageItem)[];
  atouts?: string[];
  references?: ReferenceItem[];
  centresInteret: {
    name: string;
    detail?: string;
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
    nationality: "Française",
    phone: "+33 6 00 00 00 00",
  },
  langues: [
    { name: "Français", levelPercent: 90 },
    { name: "Anglais", levelPercent: 60 },
  ],
  atouts: ["Autonomie", "Curieux", "Esprit d'équipe"],
  references: [
    {
      name: "DUPONT Jean",
      role: "Développeur Full-stack",
      phone: "+33 XX XX XX",
    },
    {
      name: "LAMAIRE Zoé",
      role: "Lead Developer chez SFR",
      phone: "+33 XX XX XX",
    },
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
      period: "(Projet de soutenance à venir)",
      description:
        "Création d'une application de suivi d'énergie pour bâtiments connectés avec alertes temps réel.",
    },
  ],
  competences: [
    {
      title: "Conception & Architecture",
      details: "Conception logicielle & architectures modulaires web et cloud",
    },
    {
      title: "Bases de données & SGBD",
      details: "Bases de données relationnelles et NoSQL, modélisation avancée",
    },
    {
      title: "Développement logiciel",
      details: "TypeScript, Python, Go, Next.js, React",
    },
    {
      title: "Outils & DevOps",
      details: "Git, Docker, Linux, CI/CD, automatisation",
    },
    {
      title: "Bureautique & Conception",
      details: "Figma, Notion, Suites Office",
    },
  ],
};
