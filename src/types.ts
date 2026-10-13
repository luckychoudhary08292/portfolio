// ==========================================
// Central TypeScript Interface Definitions
// ==========================================

export interface ExperienceItem {
  id?: string;
  _id?: string;
  title: string;       // primary position or headline (e.g., Software Engineer Intern, B.Tech Computer Science)
  subtitle: string;    // company or institution (e.g., HyperScale Labs, Govt. Excellence Bal Vinay Mandir)
  date: string;        // duration or year (e.g., June 2024 - Sep 2024, 2022)
  place: string;       // location (e.g., Indore, Bengaluru / Remote)
  order?: number;
  description?: string;
  type?: 'education' | 'work' | 'leadership';
  activeColor?: 'orange' | 'dark';
  // Backward fallback compatibility with existing database records:
  company?: string;
  role?: string;
  period?: string;
  location?: string;
}

export type {
  CertificateItem,
  ProjectItem,
  SkillCategoryItem,
  SkillItem,
  ProfileData,
} from './data/portfolioData';
