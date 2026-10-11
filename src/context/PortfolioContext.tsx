import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SkillCategoryItem,
  CertificateItem,
  ExperienceItem,
  ProjectItem,
  TestimonialItem,
  defaultProfile,
  defaultSkills,
  defaultCertificates,
  defaultExperiences,
  defaultProjects,
  defaultTestimonials,
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

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [skills, setSkills] = useState<SkillCategoryItem[]>(defaultSkills);
  const [certificates, setCertificates] = useState<CertificateItem[]>(defaultCertificates);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
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
            setProfile((prev) => ({
              ...prev,
              ...p,
              name: p.name || prev.name,
              title: p.title || prev.title,
              heroQuote: p.heroQuote || prev.heroQuote,
              experienceYears: p.experienceYears || prev.experienceYears,
              projectsCompleted: p.projectsCompleted || prev.projectsCompleted,
              problemsSolved: p.problemsSolved || prev.problemsSolved,
              gpa: p.gpa || prev.gpa,
              degree: p.degree || prev.degree,
              university: p.university || prev.university,
              whyHireMeBio: p.whyHireMeBio || prev.whyHireMeBio,
              email: p.email || prev.email,
              phone: p.phone || prev.phone,
              website: p.website || prev.website,
              github: p.github || prev.github,
              linkedin: p.linkedin || prev.linkedin,
              leetcode: p.leetcode || prev.leetcode,
              heroImage: p.heroImage || prev.heroImage,
              whyHireMeImage: p.whyHireMeImage || prev.whyHireMeImage,
            }));
          }
          if (Array.isArray(s) && s.length > 0) {
            setSkills(s.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(c) && c.length > 0) {
            setCertificates(c.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(e) && e.length > 0) {
            setExperiences(e.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(pr) && pr.length > 0) {
            setProjects(pr.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(t) && t.length > 0) {
            setTestimonials(t.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          setIsLiveConnected(true);
        }
      } else {
        setIsLiveConnected(false);
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

    // Auto-retry if not connected yet
    const interval = setInterval(() => {
      if (!isLiveConnected) {
        fetchPortfolioData();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveConnected]);

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
