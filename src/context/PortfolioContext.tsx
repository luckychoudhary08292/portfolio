import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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

const CACHE_STORAGE_KEY = 'luckychoudhary_portfolio_cache_v2';

interface CachedPayload {
  data: {
    profile?: any;
    skills?: any[];
    certificates?: any[];
    experiences?: any[];
    projects?: any[];
  };
  timestamp: number;
}

function loadInitialCache(): CachedPayload['data'] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.data) {
      return parsed.data;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

function normalizeProfile(p: any): ProfileData {
  return {
    name: p?.name || defaultProfile.name,
    title: p?.title || defaultProfile.title,
    heroQuote: p?.heroQuote || defaultProfile.heroQuote,
    experienceYears: p?.experienceYears || defaultProfile.experienceYears,
    projectsCompleted: p?.projectsCompleted || defaultProfile.projectsCompleted,
    problemsSolved: p?.problemsSolved || defaultProfile.problemsSolved,
    gpa: p?.gpa || defaultProfile.gpa,
    degree: p?.degree || defaultProfile.degree,
    university: p?.university || defaultProfile.university,
    whyHireMeBio: p?.whyHireMeBio || defaultProfile.whyHireMeBio,
    email: p?.email || 'luckychoudhary08292@gmail.com',
    phone: p?.phone || defaultProfile.phone,
    website: p?.website || defaultProfile.website,
    github: p?.github || 'https://github.com/luckychoudhary',
    linkedin: p?.linkedin || 'https://linkedin.com/in/lucky-choudhary08292',
    leetcode: p?.leetcode || 'https://leetcode.com/luckychoudhary',
    twitter: p?.twitter || 'https://twitter.com/luckychoudhary',
    resumeUrl: p?.resumeUrl || defaultProfile.resumeUrl,
    heroImage: p?.heroImage || defaultProfile.heroImage,
    whyHireMeImage: p?.whyHireMeImage || defaultProfile.whyHireMeImage,
  };
}

function normalizeExperiences(raw: any[]): ExperienceItem[] {
  if (!Array.isArray(raw)) return defaultExperiences;
  return raw.map((item: any) => {
    const title = item.title || item.role || '';
    const subtitle = item.subtitle || item.company || '';
    const date = item.date || item.period || '';
    const place = item.place || item.location || '';
    const order = typeof item.order === 'number' ? item.order : 0;
    return {
      ...item,
      id: item._id ? String(item._id) : item.id,
      title,
      subtitle,
      date,
      place,
      order,
      role: title,
      company: subtitle,
      period: date,
      location: place,
    };
  });
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cached = useRef(loadInitialCache()).current;

  // Instant state initialization: If cached in localStorage, page renders IN ZERO MILLISECONDS!
  const [profile, setProfile] = useState<ProfileData>(() =>
    cached?.profile ? normalizeProfile(cached.profile) : defaultProfile
  );
  const [skills, setSkills] = useState<SkillCategoryItem[]>(() =>
    Array.isArray(cached?.skills) && cached.skills.length > 0
      ? cached.skills.map((s: any) => ({ ...s, id: s._id || s.id }))
      : defaultSkills
  );
  const [certificates, setCertificates] = useState<CertificateItem[]>(() =>
    Array.isArray(cached?.certificates) && cached.certificates.length > 0
      ? cached.certificates.map((c: any) => ({ ...c, id: c._id || c.id }))
      : defaultCertificates
  );
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() =>
    Array.isArray(cached?.experiences) && cached.experiences.length > 0
      ? normalizeExperiences(cached.experiences)
      : defaultExperiences
  );
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    Array.isArray(cached?.projects) && cached.projects.length > 0
      ? cached.projects.map((pr: any) => ({ ...pr, id: pr._id || pr.id }))
      : defaultProjects
  );

  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(() => Boolean(cached));
  // If we already have cached data, don't show blocking loading spinner!
  const [isLoading, setIsLoading] = useState<boolean>(() => !cached);

  const isFetchingRef = useRef<boolean>(false);

  const fetchPortfolioData = useCallback(async (isSilentBackground: boolean = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    // Only set loading true if it's the very first cold boot and there's no cache
    if (!isSilentBackground && !cached) {
      setIsLoading(true);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout for cold starts

    try {
      const res = await fetch('/api/portfolio', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

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
            setProfile(normalizeProfile(p));
          }
          if (Array.isArray(s) && s.length > 0) {
            setSkills(s.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(c) && c.length > 0) {
            setCertificates(c.map((item: any) => ({ ...item, id: item._id || item.id })));
          }
          if (Array.isArray(e) && e.length > 0) {
            setExperiences(normalizeExperiences(e));
          }
          if (Array.isArray(pr) && pr.length > 0) {
            setProjects(pr.map((item: any) => ({ ...item, id: item._id || item.id })));
          }

          setIsLiveConnected(true);

          // Save latest fresh data to localStorage for instant 0ms next load
          try {
            localStorage.setItem(
              CACHE_STORAGE_KEY,
              JSON.stringify({
                data: json.data,
                timestamp: Date.now(),
              })
            );
          } catch {
            // storage quota or private browsing protection
          }
        }
      } else {
        // If server returned non-200, keep existing cached data intact
        setIsLiveConnected(false);
      }
    } catch (err: any) {
      // If network or abort error occurs, don't break UI: keep cached/default data running smoothly
      if (err.name !== 'AbortError') {
        console.warn('Network sync notice:', err.message || err);
      }
      setIsLiveConnected(false);
    } finally {
      clearTimeout(timeoutId);
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [cached]);

  useEffect(() => {
    // 1. Initial background fetch
    fetchPortfolioData(false);

    // 2. Re-sync whenever the user switches back to this tab (e.g. recruiter returning to portfolio)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchPortfolioData(true);
      }
    };
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    // 3. Periodic silent background refresh every 45s (keeps data in sync with admin panel without lag)
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchPortfolioData(true);
      }
    }, 45000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [fetchPortfolioData]);

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
        refetch: () => fetchPortfolioData(false),
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
