import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SkillCategoryItem,
  CertificateItem,
  ExperienceItem,
  ProjectItem,
  ProfileData,
  defaultProfile,
  defaultSkills,
  defaultCertificates,
  defaultExperiences,
  defaultProjects,
} from '../data/portfolioData';

export type { ProfileData };

interface PortfolioContextType {
  profile: ProfileData;
  skills: SkillCategoryItem[];
  certificates: CertificateItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
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
          } = json.data;

          if (p) {
            setProfile({
              name: p.name || '',
              title: p.title || '',
              heroQuote: p.heroQuote || '',
              experienceYears: p.experienceYears || '',
              projectsCompleted: p.projectsCompleted || '',
              problemsSolved: p.problemsSolved || '',
              gpa: p.gpa || '',
              degree: p.degree || '',
              university: p.university || '',
              whyHireMeBio: p.whyHireMeBio || '',
              email: p.email || '',
              phone: p.phone || '',
              website: p.website || '',
              github: p.github || '',
              linkedin: p.linkedin || '',
              leetcode: p.leetcode || '',
              resumeUrl: p.resumeUrl || '',
              heroImage: p.heroImage || '',
              whyHireMeImage: p.whyHireMeImage || '',
            });
          }
          if (Array.isArray(s)) {
            setSkills(s.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(c)) {
            setCertificates(c.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(e)) {
            setExperiences(
              e.map((item: any) => ({
                ...item,
                id: item._id || item.id,
                title: item.title || item.role || '',
                subtitle: item.subtitle || item.company || '',
                date: item.date || item.period || '',
                place: item.place || item.location || '',
                order: typeof item.order === 'number' ? item.order : 0,
                role: item.title || item.role || '',
                company: item.subtitle || item.company || '',
                period: item.date || item.period || '',
                location: item.place || item.location || '',
              }))
            );
          }
          if (Array.isArray(pr)) {
            setProjects(pr.map((item: any) => ({ ...item, id: item._id || item.id })));
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

    // Polling interval to auto-sync with Admin Panel updates
    const interval = setInterval(() => {
      fetchPortfolioData();
    }, 5000);

    return () => clearInterval(interval);
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
