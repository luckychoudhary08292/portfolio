import mongoose, { Schema, Document } from 'mongoose';

// Profile & General Settings
export interface IProfile extends Document {
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
  resumeUrl: string;
  heroImage: string;
  whyHireMeImage: string;
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
    university: { type: String, default: 'University Institute of Technology' },
    whyHireMeBio: {
      type: String,
      default:
        'As an aspiring Software Engineer, I combine solid computer science fundamentals (Data Structures, Algorithms, OS, DBMS) with hands-on full-stack development. Ready to deliver immediate value as a Software Engineer Intern or Associate SWE.',
    },
    email: { type: String, default: 'contact.luckychoudhary@gmail.com' },
    phone: { type: String, default: '+91 7738443636' },
    website: { type: String, default: 'lucky-choudhary.dev' },
    github: { type: String, default: 'https://github.com/luckychoudhary' },
    linkedin: { type: String, default: 'https://linkedin.com/in/luckychoudhary' },
    leetcode: { type: String, default: 'https://leetcode.com/luckychoudhary' },
    resumeUrl: { type: String, default: '#' },
    heroImage: { type: String, default: '/src/assets/images/lucky_swe_portrait_1791616127280.jpg' },
    whyHireMeImage: { type: String, default: '/src/assets/images/lucky_swe_pointing_1791616138165.jpg' },
  },
  { timestamps: true }
);

// Skills Category Model
export interface ISkillCategory extends Document {
  category: string;
  description: string;
  image: string;
  items: Array<{
    name: string;
    level: string;
    badge: string;
  }>;
  order: number;
}

const SkillCategorySchema = new Schema<ISkillCategory>(
  {
    category: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    items: [
      {
        name: { type: String, required: true },
        level: { type: String, default: 'Proficient' },
        badge: { type: String, default: '' },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Certificate Model
export interface ICertificate extends Document {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  badge: string;
  image: string;
  skills: string[];
  order: number;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    credentialId: { type: String, default: '' },
    verifyUrl: { type: String, default: '' },
    badge: { type: String, default: 'cloud' },
    image: { type: String, required: true },
    skills: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Experience & Education Timeline
export interface IExperience extends Document {
  company: string;
  location: string;
  period: string;
  role: string;
  description: string;
  type: 'education' | 'work' | 'leadership';
  activeColor: 'orange' | 'dark';
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    location: { type: String, default: 'India' },
    period: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['education', 'work', 'leadership'], default: 'work' },
    activeColor: { type: String, enum: ['orange', 'dark'], default: 'orange' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Projects / Portfolio
export interface IProject extends Document {
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  metrics: string;
  techStack: string[];
  deliverables: string[];
  order: number;
  featured: boolean;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    category: { type: String, default: 'Full-Stack' },
    tag: { type: String, default: 'Full-Stack' },
    image: { type: String, required: true },
    description: { type: String, required: true },
    githubUrl: { type: String, default: 'https://github.com' },
    liveUrl: { type: String, default: '#' },
    metrics: { type: String, default: '' },
    techStack: [{ type: String }],
    deliverables: [{ type: String }],
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Testimonials / Recommendations
export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  relationship: string;
  order: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Senior Software Engineer' },
    company: { type: String, default: 'Tech Mentor' },
    avatar: { type: String, required: true },
    rating: { type: Number, default: 5 },
    content: { type: String, required: true },
    relationship: { type: String, default: 'Internship Mentor' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Client & Recruiter Inquiries
export interface IInquiry extends Document {
  name: string;
  email: string;
  company: string;
  opportunityType: string;
  message: string;
  status: string;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: '' },
    opportunityType: { type: String, default: 'Full-Time SWE Role' },
    message: { type: String, required: true },
    status: { type: String, default: 'new' },
  },
  { timestamps: true }
);

// Email Subscribers / Recruiter Updates
export interface ISubscriber extends Document {
  email: string;
  source: string;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
export const SkillCategory = mongoose.model<ISkillCategory>('SkillCategory', SkillCategorySchema);
export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
export const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);
export const Project = mongoose.model<IProject>('Project', ProjectSchema);
export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema);
export const Subscriber = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
