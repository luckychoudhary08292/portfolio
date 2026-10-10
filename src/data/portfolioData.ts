export interface SkillCategoryItem {
  id: string;
  category: string;
  description: string;
  image: string;
  iconName?: string;
  items: Array<{
    name: string;
    level: string;
    highlight?: boolean;
    badge?: string;
  }>;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  badge?: string;
  image: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  period: string;
  role: string;
  description: string;
  type: 'education' | 'work' | 'leadership';
  activeColor: 'orange' | 'dark';
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  metrics?: string;
  techStack: string[];
  deliverables?: string[];
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  relationship: string;
  content: string;
}

export const projectCategories = [
  'All',
  'Full-Stack',
  'Backend & Systems',
  'AI & Web',
  'Cloud Native',
];
