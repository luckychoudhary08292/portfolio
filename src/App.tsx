import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WhyHireMeSection } from './components/WhyHireMeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DiscussionBanner } from './components/DiscussionBanner';
import { FooterSection } from './components/FooterSection';
import { HireModal } from './components/HireModal';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';
import { ProjectItem, CertificateItem, SkillCategoryItem } from './data/portfolioData';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

function PortfolioMain() {
  const { projects } = usePortfolio();
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  const handleSelectSkillCategory = (_cat: SkillCategoryItem) => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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

        {/* 2. Technical Skills Section (replaces My Services) */}
        <SkillsSection onSelectSkillCategory={handleSelectSkillCategory} />

        {/* 3. Featured Software Engineering Projects */}
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 4. Verified Licenses & Certificates Section (Horizontal Scrollable + Lightbox) */}
        <CertificatesSection />

        {/* 5. Education & Internship Experience Timeline */}
        <ExperienceSection />

        {/* 6. Why Hire Me? Student Stats & Pointing Portrait */}
        <WhyHireMeSection onOpenHireModal={() => setIsHireModalOpen(true)} />

        {/* 7. Endorsements & Recommendations */}
        <TestimonialsSection />

        {/* 8. Recruiter Connect & Technical Marquee Ticker */}
        <DiscussionBanner />

        {/* 9. Let's Connect & Footer */}
        <FooterSection onOpenHireModal={() => setIsHireModalOpen(true)} />
      </main>

      {/* Interactive Modals */}
      <HireModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenHireModal={() => {
          setSelectedProject(null);
          setIsHireModalOpen(true);
        }}
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
