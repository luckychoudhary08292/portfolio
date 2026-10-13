import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WhyHireMeSection } from './components/WhyHireMeSection';
import { DiscussionBanner } from './components/DiscussionBanner';
import { FooterSection } from './components/FooterSection';
import { HireModal } from './components/HireModal';
import { ProjectDocPage } from './components/ProjectDocPage';
import { SkillCategoryItem, ProjectItem } from './data/portfolioData';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

function PortfolioMain() {
  const { projects } = usePortfolio();
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedDocProject, setSelectedDocProject] = useState<ProjectItem | null>(null);

  // Sync with browser back/forward buttons and hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-doc-')) {
        const projectId = hash.replace('#project-doc-', '');
        const found = projects.find((p) => (p._id || p.id) === projectId || p.title === decodeURIComponent(projectId));
        if (found) {
          setSelectedDocProject(found);
          return;
        }
      }
      if (selectedDocProject && !hash.startsWith('#project-doc-')) {
        setSelectedDocProject(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check on load
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects]);

  const handleOpenDoc = (project: ProjectItem) => {
    setSelectedDocProject(project);
    const identifier = project._id || project.id || encodeURIComponent(project.title);
    window.location.hash = `project-doc-${identifier}`;
  };

  const handleCloseDoc = () => {
    setSelectedDocProject(null);
    if (window.location.hash.startsWith('#project-doc-')) {
      window.history.pushState(null, '', window.location.pathname + '#projects');
    }
  };

  const handleSelectSkillCategory = (_cat: SkillCategoryItem) => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If user opens a project doc page, render full screen page
  if (selectedDocProject) {
    return (
      <>
        <ProjectDocPage
          project={selectedDocProject}
          allProjects={projects}
          onSelectProject={(proj) => {
            setSelectedDocProject(proj);
            const identifier = proj._id || proj.id || encodeURIComponent(proj.title);
            window.location.hash = `project-doc-${identifier}`;
          }}
          onBack={handleCloseDoc}
          onOpenHireModal={() => setIsHireModalOpen(true)}
        />
        <HireModal isOpen={isHireModalOpen} onClose={() => setIsHireModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#ff6422] selection:text-white antialiased">
      {/* Floating Pill Navigation */}
      <Navbar onOpenHireModal={() => setIsHireModalOpen(true)} />

      <main>
        {/* 1. Hero Section: Lucky Choudhary SWE Student */}
        <Hero
          onOpenHireModal={() => setIsHireModalOpen(true)}
          onExploreProjects={handleExploreProjects}
        />

        {/* 2. Technical Skills Section */}
        <SkillsSection onSelectSkillCategory={handleSelectSkillCategory} />

        {/* 3. Featured Software Engineering Projects */}
        <PortfolioSection onOpenProjectDoc={handleOpenDoc} />

        {/* 4. Verified Licenses & Certificates Section */}
        <CertificatesSection />

        {/* 5. Education & Internship Experience Timeline */}
        <ExperienceSection />

        {/* 6. Why Hire Me? Student Stats & Pointing Portrait */}
        <WhyHireMeSection onOpenHireModal={() => setIsHireModalOpen(true)} />

        {/* 7. Recruiter Connect & Technical Marquee Ticker */}
        <DiscussionBanner />

        {/* 9. Let's Connect & Footer */}
        <FooterSection onOpenHireModal={() => setIsHireModalOpen(true)} />
      </main>

      {/* Interactive Modals */}
      <HireModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
