import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SkillCategoryItem,
  CertificateItem,
  ExperienceItem,
  ProjectItem,
  TestimonialItem,
} from '../data/portfolioData';

export interface ProfileData {
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

interface PortfolioContextType {
  profile: ProfileData;
  skills: SkillCategoryItem[];
  certificates: CertificateItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  isLiveConnected: boolean;
  isLoading: boolean;
  refetch: () => Promise<void>;
  submitInquiry: (data: {
    name: string;
    email: string;
    company?: string;
    opportunityType?: string;
    message: string;
  }) => Promise<boolean>;
  submitSubscriber: (email: string, source?: string) => Promise<boolean>;
}

const emptyProfile: ProfileData = {
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
  resumeUrl: '',
  heroImage: '',
  whyHireMeImage: '',
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [skills, setSkills] = useState<SkillCategoryItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const {
            profile: p,
            skills: s,
            certificates: c,
            experiences: e,
            projects: pr,
            testimonials: t,
          } = json.data;

          if (p) {
            setProfile(p);
          }
          setSkills(Array.isArray(s) ? s.map((item: any) => ({ ...item, id: item._id || item.id })) : []);
          setCertificates(Array.isArray(c) ? c.map((item: any) => ({ ...item, id: item._id || item.id })) : []);
          setExperiences(Array.isArray(e) ? e.map((item: any) => ({ ...item, id: item._id || item.id })) : []);
          setProjects(Array.isArray(pr) ? pr.map((item: any) => ({ ...item, id: item._id || item.id })) : []);
          setTestimonials(Array.isArray(t) ? t.map((item: any) => ({ ...item, id: item._id || item.id })) : []);
          setIsLiveConnected(true);
        }
      }
    } catch (err) {
      console.error('Error fetching data from MongoDB database:', err);
      setIsLiveConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const submitInquiry = async (data: {
    name: string;
    email: string;
    company?: string;
    opportunityType?: string;
    message: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const submitSubscriber = async (email: string, source: string = 'website'): Promise<boolean> => {
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        certificates,
        experiences,
        projects,
        testimonials,
        isLiveConnected,
        isLoading,
        refetch: fetchPortfolioData,
        submitInquiry,
        submitSubscriber,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
