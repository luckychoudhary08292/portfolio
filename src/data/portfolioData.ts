export interface SkillItem {
  name: string;
  level?: string;
  highlight?: boolean;
  badge?: string;
  logo?: string; // Official PNG logo URL or base64 uploaded by admin
}

export interface SkillCategoryItem {
  id?: string;
  _id?: string;
  category: string;
  description?: string;
  image?: string;
  iconName?: string;
  type?: 'hard' | 'soft';
  items: SkillItem[];
  order?: number;
}

export interface CertificateItem {
  id?: string;
  _id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  badge?: string;
  category?: string; // 'Programming Languages' | 'Web Development' | 'Cloud & DevOps' | 'AI & Tools' | 'Data Science' | 'Hackathons' | 'Cybersecurity' | 'General'
  image?: string;
  skills?: string[];
  order?: number;
}

export interface ExperienceItem {
  id?: string;
  _id?: string;
  title?: string;      // primary position or headline (e.g., Software Engineer Intern, B.Tech Computer Science)
  subtitle?: string;   // company or institution (e.g., HyperScale Labs, Govt. Excellence Bal Vinay Mandir)
  date?: string;       // duration or year (e.g., June 2024 - Sep 2024, 2022)
  place?: string;      // location (e.g., Indore, Bengaluru / Remote)
  order?: number;
  description?: string;
  type?: 'education' | 'work' | 'leadership';
  activeColor?: 'orange' | 'dark';
  // Fallback compatibility with existing database records:
  company?: string;
  role?: string;
  period?: string;
  location?: string;
}

export interface ProjectItem {
  id?: string;
  _id?: string;
  title: string;
  subtitle?: string;
  category: string;
  tag?: string;
  image: string;
  gallery?: string[]; // Extra project images / screenshots
  description: string;
  overview?: string; // Extended markdown or rich text overview
  keyFeatures?: string[]; // Highlighted features
  architecture?: string; // Architecture / workflow description
  role?: string; // Lead Developer, Full-Stack, etc.
  duration?: string; // Timeline e.g. "3 Months", "Jan 2024 - Mar 2024"
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string;
  techStack: string[];
  deliverables?: string[];
  featured?: boolean;
  order?: number;
}

export interface SkillLibraryItem {
  id?: string;
  _id?: string;
  name: string;
  category: string;
  badge?: string;
  color?: string;
  logo?: string;
}

export interface ProfileData {
  _id?: string;
  name: string;
  title: string;
  heroQuote: string;
  experienceYears: string;
  projectsCompleted: string;
  problemsSolved: string;
  gpa: string;
  degree: string;
  university: string;
  whyHireMeBio: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  leetcode: string;
  twitter?: string;
  resumeUrl: string;
  heroImage: string;
  whyHireMeImage: string;
}

// Clean initial empty state: No hardcoded demo data, pure dynamic containers
export const defaultProfile: ProfileData = {
  name: '',
  title: '',
  heroQuote: '',
  experienceYears: '',
  projectsCompleted: '',
  problemsSolved: '',
  gpa: '',
  degree: '',
  university: '',
  whyHireMeBio: '',
  email: '',
  phone: '',
  website: '',
  github: '',
  linkedin: '',
  leetcode: '',
  twitter: '',
  resumeUrl: '',
  heroImage: '',
  whyHireMeImage: '',
};

export const defaultSkills: SkillCategoryItem[] = [];
export const defaultCertificates: CertificateItem[] = [];
export const defaultExperiences: ExperienceItem[] = [];
export const defaultProjects: ProjectItem[] = [];
