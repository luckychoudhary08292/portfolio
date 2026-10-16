import mongoose, { Schema, Document } from 'mongoose';

// ==========================================
// 1. Certificate Model & Schema (certificates collection)
// ==========================================
export interface ICertificate extends Document {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  badge?: string; // 'aws' | 'meta' | 'google' | 'leetcode' (Default: 'aws')
  category?: string; // Preset: 'Programming Languages' | 'Web Development' | 'Cloud & DevOps' | 'AI & Tools' | 'Data Science' | 'Hackathons' | 'Cybersecurity' | 'General'
  image?: string; // Image URL or Base64 (Default: '')
  skills: string[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    credentialId: { type: String, default: '' },
    verifyUrl: { type: String, default: '' },
    badge: { type: String, default: 'aws' },
    category: { type: String, default: 'General' },
    image: { type: String, default: '' },
    skills: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ==========================================
// 2. Project Model & Schema (projects collection)
// ==========================================
export interface IProject extends Document {
  title: string;
  subtitle?: string;
  category: string;
  tag: string;
  image: string;
  gallery?: string[];
  description: string;
  overview?: string;
  keyFeatures?: string[];
  architecture?: string;
  role?: string;
  duration?: string;
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string;
  techStack: string[];
  deliverables?: string[];
  order: number;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    category: { type: String, default: 'Full-Stack' },
    tag: { type: String, default: 'Full-Stack' },
    image: { type: String, default: '' },
    gallery: [{ type: String }],
    description: { type: String, required: true },
    overview: { type: String, default: '' },
    keyFeatures: [{ type: String }],
    architecture: { type: String, default: '' },
    role: { type: String, default: 'Software Engineer' },
    duration: { type: String, default: '' },
    githubUrl: { type: String, default: 'https://github.com/luckychoudhary' },
    liveUrl: { type: String, default: '#' },
    metrics: { type: String, default: '' },
    techStack: [{ type: String }],
    deliverables: [{ type: String }],
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ==========================================
// 3. SkillCategory Model & Schema (skillcategories collection)
// ==========================================
export interface ISkillCategory extends Document {
  category: string;
  description?: string;
  image?: string;
  type?: string; // 'hard' | 'soft'
  items: Array<{
    name: string;
    level?: string;
    badge?: string;
    logo?: string; // Official PNG logo URL or base64 uploaded from admin panel
  }>;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const SkillCategorySchema = new Schema<ISkillCategory>(
  {
    category: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    type: { type: String, default: 'hard' },
    items: [
      {
        name: { type: String, required: true },
        level: { type: String, default: 'Proficient' },
        badge: { type: String, default: '' },
        logo: { type: String, default: '' },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ==========================================
// 4. Profile Model & Schema (profiles collection)
// ==========================================
export interface IProfile extends Document {
  name: string;
  title: string;
  heroQuote?: string;
  experienceYears?: string;
  projectsCompleted?: string;
  problemsSolved?: string;
  gpa?: string;
  degree?: string;
  university?: string;
  whyHireMeBio?: string;
  email?: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  twitter?: string;
  resumeUrl?: string;
  heroImage?: string;
  whyHireMeImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, default: 'Lucky Choudhary' },
    title: { type: String, default: 'Software Engineering Student' },
    heroQuote: {
      type: String,
      default:
        'Passionate about architecting high-performance distributed systems, solving algorithmic challenges, and crafting reliable full-stack applications.',
    },
    experienceYears: { type: String, default: '2022 - 2026' },
    projectsCompleted: { type: String, default: '20+' },
    problemsSolved: { type: String, default: '450+' },
    gpa: { type: String, default: '8.8 / 10' },
    degree: { type: String, default: 'B.Tech in Computer Science & Engineering' },
    university: { type: String, default: 'Sage University Indore' },
    whyHireMeBio: {
      type: String,
      default:
        'As an aspiring Software Engineer, I combine solid computer science fundamentals (Data Structures, Algorithms, OS, DBMS) with hands-on full-stack development. Ready to deliver immediate value as a Software Engineer Intern or Associate SWE.',
    },
    email: { type: String, default: 'luckychoudhary08292@gmail.com' },
    phone: { type: String, default: '+91 7738443636' },
    website: { type: String, default: 'lucky-choudhary.dev' },
    github: { type: String, default: 'https://github.com/luckychoudhary' },
    linkedin: { type: String, default: 'https://linkedin.com/in/lucky-choudhary08292' },
    leetcode: { type: String, default: 'https://leetcode.com/luckychoudhary' },
    twitter: { type: String, default: 'https://twitter.com/luckychoudhary' },
    resumeUrl: { type: String, default: '#' },
    heroImage: { type: String, default: '' },
    whyHireMeImage: { type: String, default: '' },
  },
  { timestamps: true }
);

// ==========================================
// 5. Experience Model & Schema (experiences collection)
// ==========================================
export interface IExperience extends Document {
  title: string;      // primary position or headline (e.g., Software Engineer Intern, B.Tech Computer Science)
  subtitle: string;   // company or institution (e.g., HyperScale Labs, Govt. Excellence Bal Vinay Mandir)
  date: string;       // duration or year (e.g., June 2024 - Sep 2024, 2022)
  place: string;      // location (e.g., Indore, Bengaluru / Remote)
  order: number;
  // Legacy / fallback fields
  company?: string;
  location?: string;
  period?: string;
  role?: string;
  description?: string;
  type?: 'education' | 'work' | 'leadership';
  activeColor?: 'orange' | 'dark';
  createdAt?: string;
  updatedAt?: string;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    date: { type: String, default: '' },
    place: { type: String, default: '' },
    order: { type: Number, default: 0 },
    // Backward compatibility with legacy documents
    company: { type: String, default: '' },
    location: { type: String, default: '' },
    period: { type: String, default: '' },
    role: { type: String, default: '' },
    description: { type: String, default: '' },
    type: { type: String, default: 'work' },
    activeColor: { type: String, default: 'orange' },
  },
  { timestamps: true }
);

// ==========================================
// 6. SkillLibrary Model & Schema (skilllibraries collection)
// ==========================================
export interface ISkillLibrary extends Document {
  name: string;
  category: string;
  badge?: string;
  color?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

const SkillLibrarySchema = new Schema<ISkillLibrary>(
  {
    name: { type: String, required: true },
    category: { type: String, default: 'Languages' },
    badge: { type: String, default: '' },
    color: { type: String, default: '#ff6422' },
    logo: { type: String, default: '' },
  },
  { timestamps: true }
);

// ==========================================
// 7. Inquiry Model & Schema (inquiries collection)
// ==========================================
export interface IInquiry extends Document {
  name?: string;
  email?: string;
  company?: string;
  opportunityType?: string;
  message?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    company: { type: String, default: '' },
    opportunityType: { type: String, default: 'Full-Time SWE Role' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  },
  { timestamps: true }
);

// ==========================================
// 8. Subscriber Model & Schema (subscribers collection)
// ==========================================
export interface ISubscriber extends Document {
  email: string;
  status: 'active' | 'unsubscribed';
  createdAt?: string;
  updatedAt?: string;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ['active', 'unsubscribed'], default: 'active' },
  },
  { timestamps: true }
);

// Explicit collection names bound to models (All 8 active collections)
export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema, 'certificates');
export const Project = mongoose.model<IProject>('Project', ProjectSchema, 'projects');
export const SkillCategory = mongoose.model<ISkillCategory>('SkillCategory', SkillCategorySchema, 'skillcategories');
export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema, 'profiles');
export const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema, 'experiences');
export const SkillLibrary = mongoose.model<ISkillLibrary>('SkillLibrary', SkillLibrarySchema, 'skilllibraries');
export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema, 'inquiries');
export const Subscriber = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema, 'subscribers');
