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

const CACHE_STORAGE_KEY = 'portfolio_db_cache_v5';

declare global {
  interface Window {
    __INITIAL_PORTFOLIO__?: {
      profile?: any;
      skills?: any[];
      certificates?: any[];
      experiences?: any[];
      projects?: any[];
    };
    __PORTFOLIO_PREFETCH__?: Promise<any> | null;
  }
}

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

function loadInitialData(): { data: CachedPayload['data'] | null; fromServerHtml: boolean } {
  if (typeof window === 'undefined') return { data: null, fromServerHtml: false };
  if (window.__INITIAL_PORTFOLIO__ && typeof window.__INITIAL_PORTFOLIO__ === 'object') {
    return { data: window.__INITIAL_PORTFOLIO__, fromServerHtml: true };
  }
  try {
    // Clean up older oversized cache keys if present
    localStorage.removeItem('portfolio_db_cache_v4');
    localStorage.removeItem('luckychoudhary_portfolio_cache_v3');
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return { data: null, fromServerHtml: false };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.data) {
      return { data: parsed.data, fromServerHtml: false };
    }
  } catch {
    // ignore parse errors
  }
  return { data: null, fromServerHtml: false };
}

function normalizeProfile(p: any): ProfileData {
  if (!p) return defaultProfile;
  return {
    name: p?.name || '',
    title: p?.title || '',
    heroQuote: p?.heroQuote || '',
    experienceYears: p?.experienceYears || '',
    projectsCompleted: p?.projectsCompleted || '',
    problemsSolved: p?.problemsSolved || '',
    gpa: p?.gpa || '',
    degree: p?.degree || '',
    university: p?.university || '',
    whyHireMeBio: p?.whyHireMeBio || '',
    email: p?.email || '',
    phone: p?.phone || '',
    website: p?.website || '',
    github: p?.github || '',
    linkedin: p?.linkedin || '',
    leetcode: p?.leetcode || '',
    twitter: p?.twitter || '',
    resumeUrl: p?.resumeUrl || '',
    heroImage: p?.heroImage || '',
    whyHireMeImage: p?.whyHireMeImage || '',
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
  const initialRef = useRef(loadInitialData());
  const cached = initialRef.current.data;

  // Instant state initialization from HTML hydration or compact ~14KB localStorage cache
  const [profile, setProfile] = useState<ProfileData>(() =>
    cached?.profile ? normalizeProfile(cached.profile) : defaultProfile
  );
  const [skills, setSkills] = useState<SkillCategoryItem[]>(() =>
    Array.isArray(cached?.skills)
      ? cached.skills.map((s: any) => ({ ...s, id: s._id || s.id }))
      : defaultSkills
  );
  const [certificates, setCertificates] = useState<CertificateItem[]>(() =>
    Array.isArray(cached?.certificates)
      ? cached.certificates.map((c: any) => ({ ...c, id: c._id || c.id }))
      : defaultCertificates
  );
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() =>
    Array.isArray(cached?.experiences)
      ? normalizeExperiences(cached.experiences)
      : defaultExperiences
  );
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    Array.isArray(cached?.projects)
      ? cached.projects.map((pr: any) => ({ ...pr, id: pr._id || pr.id }))
      : defaultProjects
  );

  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(() => Boolean(cached));
  const [isLoading, setIsLoading] = useState<boolean>(() => !cached);

  const isFetchingRef = useRef<boolean>(false);

  const applyPayload = useCallback((payload: CachedPayload['data']) => {
    const {
      profile: p,
      skills: s,
      certificates: c,
      experiences: e,
      projects: pr,
    } = payload;

    setProfile(p ? normalizeProfile(p) : defaultProfile);
    if (Array.isArray(s)) {
      setSkills(s.map((item: any) => ({ ...item, id: item._id || item.id })));
    }
    if (Array.isArray(c)) {
      setCertificates(c.map((item: any) => ({ ...item, id: item._id || item.id })));
    }
    if (Array.isArray(e)) {
      setExperiences(normalizeExperiences(e));
    }
    if (Array.isArray(pr)) {
      setProjects(pr.map((item: any) => ({ ...item, id: item._id || item.id })));
    }

    setIsLiveConnected(true);

    try {
      localStorage.setItem(
        CACHE_STORAGE_KEY,
        JSON.stringify({
          data: payload,
          timestamp: Date.now(),
        })
      );
    } catch {
      // storage quota or private browsing protection
    }
  }, []);

  const fetchPortfolioData = useCallback(
    async (isSilentBackground: boolean = false, retryCount: number = 0) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      if (!isSilentBackground && !cached) {
        setIsLoading(true);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);
      let scheduledRetry = false;

      try {
        let json: any = null;

        // Consume early <head> prefetch promise on initial load if available
        if (typeof window !== 'undefined' && window.__PORTFOLIO_PREFETCH__) {
          const prefetchPromise = window.__PORTFOLIO_PREFETCH__;
          window.__PORTFOLIO_PREFETCH__ = null;
          json = await prefetchPromise;
        }

        if (!json) {
          const res = await fetch('/api/portfolio', {
            signal: controller.signal,
            headers: {
              Accept: 'application/json',
            },
          });

          if (res.ok) {
            json = await res.json();
          }
        }

        if (json?.success && json.data) {
          applyPayload(json.data);
        } else {
          setIsLiveConnected(false);
          if (!cached && retryCount < 1) {
            scheduledRetry = true;
          }
        }
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.warn('Network sync notice:', err?.message || err);
        }
        setIsLiveConnected(false);
        if (!cached && retryCount < 1) {
          scheduledRetry = true;
        }
      } finally {
        clearTimeout(timeoutId);
        isFetchingRef.current = false;
        if (scheduledRetry) {
          setTimeout(() => {
            fetchPortfolioData(isSilentBackground, retryCount + 1);
          }, 1200);
        } else {
          setIsLoading(false);
        }
      }
    },
    [applyPayload, cached]
  );

  useEffect(() => {
    // Persist initial server-hydrated data into localStorage immediately, then revalidate silently
    if (initialRef.current.fromServerHtml && cached) {
      try {
        localStorage.setItem(
          CACHE_STORAGE_KEY,
          JSON.stringify({ data: cached, timestamp: Date.now() })
        );
      } catch {}
    } else {
      fetchPortfolioData(Boolean(cached));
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchPortfolioData(true);
      }
    };
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchPortfolioData(true);
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [fetchPortfolioData, cached]);

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
