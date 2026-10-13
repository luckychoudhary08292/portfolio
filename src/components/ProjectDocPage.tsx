import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Lock,
  Maximize2,
  Share2,
  Sparkles,
  X,
  Calendar,
  User,
  Activity,
  Terminal,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDocPageProps {
  project: ProjectItem;
  allProjects?: ProjectItem[];
  onSelectProject?: (project: ProjectItem) => void;
  onBack: () => void;
  onOpenHireModal?: () => void;
}

export const ProjectDocPage: React.FC<ProjectDocPageProps> = ({
  project,
  allProjects = [],
  onSelectProject,
  onBack,
  onOpenHireModal,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features' | 'gallery'>('overview');
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on mount or when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'auto';
  }, [project]);

  // Track scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compile all project images (main banner + gallery)
  const allImages = useMemo(() => {
    const imgs: string[] = [];
    if (project.image) imgs.push(project.image);
    if (project.gallery && Array.isArray(project.gallery)) {
      project.gallery.forEach((img) => {
        if (img && !imgs.includes(img)) {
          imgs.push(img);
        }
      });
    }
    return imgs.length > 0
      ? imgs
      : ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80'];
  }, [project]);

  // Image viewer keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else {
          onBack();
        }
      } else if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') {
          setSelectedImageIndex((prev) =>
            prev !== null ? (prev + 1) % allImages.length : 0
          );
        } else if (e.key === 'ArrowLeft') {
          setSelectedImageIndex((prev) =>
            prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0
          );
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, allImages.length, onBack]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Find previous and next project for seamless cycling
  const currentIndex = allProjects.findIndex(
    (p) => (p._id || p.id) === (project._id || project.id) || p.title === project.title
  );
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  // Derived content
  const overviewText =
    project.overview ||
    project.description ||
    'A high-performance software system designed with a focus on responsiveness, architectural clarity, and user satisfaction.';

  const featuresList = useMemo(() => {
    if (project.keyFeatures && project.keyFeatures.length > 0) {
      return project.keyFeatures;
    }
    if (project.deliverables && project.deliverables.length > 0) {
      return project.deliverables;
    }
    return [
      'High-throughput distributed architecture built for low latency and zero downtime',
      'Modern, accessible UI with smooth micro-interactions and mobile responsiveness',
      'Production-grade database indexing and optimized server caching layers',
      'Clean modular codebase adhering strictly to SOLID design principles and clean code patterns',
      'End-to-end type safety across client interfaces and backend endpoints',
    ];
  }, [project]);

  // Extract clean domain for browser mockup
  const displayDomain = useMemo(() => {
    if (!project.liveUrl || project.liveUrl === '#') {
      return `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.app`;
    }
    try {
      const url = new URL(project.liveUrl);
      return url.hostname;
    } catch {
      return 'production.live';
    }
  }, [project]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-[#ff6422] selection:text-white antialiased">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#ff6422] via-[#ff8a4c] to-amber-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Command Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Back button & Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-[#ff6422]/50 text-white text-xs sm:text-sm font-medium transition-all group shrink-0 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ff6422] group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>

            <span className="text-white/20 hidden sm:inline">/</span>

            <div className="hidden sm:flex items-center gap-2 min-w-0 truncate">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono shrink-0">
                {project.category || 'Case Study'}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-semibold text-slate-200 truncate max-w-[200px] md:max-w-[320px]">
                {project.title}
              </span>
            </div>
          </div>

          {/* Center: Quick Project Switcher (If multiple projects) */}
          {allProjects.length > 1 && onSelectProject && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-slate-400">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
                title={`Previous: ${prevProject.title}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono px-1">
                {currentIndex + 1} / {allProjects.length}
              </span>
              <button
                onClick={() => onSelectProject(nextProject)}
                className="hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
                title={`Next: ${nextProject.title}`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Right Actions: Share, GitHub & Live App Launch */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer active:scale-95"
              title="Copy Case Study Link"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share'}</span>
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-white text-xs font-medium transition-all hover:scale-[1.02] active:scale-95"
                title="View Source on GitHub"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                <span className="hidden lg:inline">Source</span>
              </a>
            )}

            {project.liveUrl && project.liveUrl !== '#' ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ff6422] to-[#ff7b38] hover:from-[#ff7536] hover:to-[#ff8a4c] text-white text-xs font-bold shadow-md shadow-[#ff6422]/20 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-20">
        {/* Editorial Kicker & Title */}
        <section className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <span className="text-[#ff6422] font-semibold">{project.category || 'Engineering'}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>{project.role || 'Full-Stack Developer'}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>{project.duration || 'Case Study'}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.liveUrl && project.liveUrl !== '#' ? 'Live Project' : 'Completed'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          )}

          {/* Key Facts Strips (Zero-Pill Typographic Grid) */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-b border-white/[0.08] py-4 my-6">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-0.5">Role / Focus</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                {project.role || 'System Engineering'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-0.5">Timeline</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                {project.duration || 'Production Cycle'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-0.5">Key Metric</p>
              <p className="text-xs sm:text-sm font-semibold text-[#ff6422]">
                {project.metrics || '100% Responsive'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-0.5">Deliverable</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                {project.tag || 'Web Architecture'}
              </p>
            </div>
          </div>
        </section>

        {/* Primary Viewport: Browser Showcase Window */}
        <section className="mb-14">
          <div className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/80">
            {/* macOS Browser Header Bar */}
            <div className="px-4 py-3 bg-[#0a0d14] border-b border-white/[0.08] flex items-center justify-between gap-4">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-90 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-90 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-90 inline-block" />
              </div>

              {/* URL Mockup Address Bar */}
              <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-2 px-4 py-1 rounded-lg bg-black/40 border border-white/[0.06] text-xs text-slate-400 font-mono">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="text-slate-300 truncate">https://{displayDomain}</span>
              </div>

              {/* Expand High-Res Button */}
              <button
                onClick={() => setSelectedImageIndex(0)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors cursor-pointer"
                title="Expand Full Resolution"
              >
                <Maximize2 className="w-3 h-3 text-[#ff6422]" />
                <span className="hidden sm:inline">Enlarge Preview</span>
              </button>
            </div>

            {/* High-Fidelity Project Showcase Image */}
            <div
              className="relative aspect-[16/9] w-full bg-black/60 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImageIndex(0)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80';
                }}
              />

              {/* Subtle hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-xl">
                  <Maximize2 className="w-3.5 h-3.5 text-[#ff6422]" />
                  Click to inspect full resolution
                </span>
              </div>
            </div>

            {/* Mini thumbnail strip if multiple images */}
            {allImages.length > 1 && (
              <div className="px-4 py-3 bg-[#0a0d14] border-t border-white/[0.08] flex items-center gap-2.5 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-mono uppercase text-slate-500 whitespace-nowrap mr-1">
                  Screenshots ({allImages.length}):
                </span>
                {allImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className="relative w-14 h-9 sm:w-18 sm:h-11 rounded-lg overflow-hidden border border-white/10 hover:border-[#ff6422] shrink-0 transition-all cursor-pointer opacity-80 hover:opacity-100"
                    title={`View Screenshot ${i + 1}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-10 overflow-x-auto">
          {[
            { id: 'overview', label: 'Executive Overview', icon: Sparkles },
            { id: 'features', label: 'Core Features', icon: CheckCircle2 },
            { id: 'architecture', label: 'Technical Architecture', icon: Cpu },
            { id: 'gallery', label: `Media Gallery (${allImages.length})`, icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ff6422] text-white shadow-md shadow-[#ff6422]/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content with Smooth Transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff6422]" />
                    Project Summary & Mission
                  </h2>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
                    {overviewText}
                  </p>
                </div>

                {/* Engineering Highlights Quick List */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
                    Primary Objectives & Impact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <Zap className="w-4 h-4 text-[#ff6422] mb-2" />
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Performance First</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Engineered with clean asset pipelines and fast render speeds across diverse network conditions.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 mb-2" />
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Reliability & Security</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Adheres to strict input sanitization, data validation, and robust error recovery patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: FEATURES */}
            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff6422]" />
                  Key Features & Functional Highlights
                </h2>
                <div className="space-y-3">
                  {featuresList.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#ff6422]/40 transition-all flex items-start gap-4"
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#ff6422]/15 border border-[#ff6422]/30 text-[#ff6422] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String(fIndex + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: ARCHITECTURE */}
            {activeTab === 'architecture' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff6422]" />
                  System Architecture & Implementation
                </h2>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Technical Architecture Specs</span>
                  </div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {project.architecture ||
                      `This system is organized with strict separation of concerns between presentation, business logic, and persistent storage layers.\n\n• Client Layer: Built with reactive, typed components maximizing UI predictability and minimal re-render footprints.\n• Network & API Layer: Asynchronous request handling with defensive error boundaries and caching.\n• Data Architecture: Validated schemas ensuring consistent state propagation and zero-loss mutations.`}
                  </p>
                </div>

                {/* Tech Breakdown Grid */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Technology Breakdown
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 text-xs sm:text-sm font-mono font-medium transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: GALLERY */}
            {activeTab === 'gallery' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff6422]" />
                    Visual Gallery & Media
                  </h2>
                  <span className="text-xs font-mono text-slate-400">
                    {allImages.length} {allImages.length === 1 ? 'Screenshot' : 'Screenshots'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className="group relative rounded-2xl overflow-hidden border border-white/[0.1] bg-black/40 aspect-video cursor-pointer hover:border-[#ff6422]/60 transition-all shadow-md"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-medium border border-white/20">
                          <Maximize2 className="w-3 h-3 text-[#ff6422]" />
                          Inspect #{idx + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar: Quick Actions & Specs (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl sm:rounded-3xl bg-[#0c1017] border border-white/[0.1] p-6 space-y-6 sticky top-20 shadow-xl">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#ff6422]" />
                  Project Links
                </h3>

                <div className="space-y-2.5">
                  {project.liveUrl && project.liveUrl !== '#' ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#ff6422] to-[#ff7b38] hover:from-[#ff7536] hover:to-[#ff8a4c] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#ff6422]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Launch Live Application</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] text-slate-500 font-medium text-xs cursor-not-allowed border border-white/[0.06]"
                    >
                      Demo Available Upon Request
                    </button>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs sm:text-sm border border-white/[0.08] hover:border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Github className="w-4 h-4 text-white" />
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-5 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 text-xs font-mono font-medium border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata Details */}
              <div className="pt-5 border-t border-white/[0.08] space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Domain Category</span>
                  <span className="font-semibold text-white">{project.category}</span>
                </div>
                {project.tag && (
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Engineering Focus</span>
                    <span className="font-semibold text-white">{project.tag}</span>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Author Role</span>
                    <span className="font-semibold text-white">{project.role}</span>
                  </div>
                )}
                {project.metrics && (
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Key Metric</span>
                    <span className="font-bold text-[#ff6422]">{project.metrics}</span>
                  </div>
                )}
              </div>

              {/* Inquire / Hire CTA */}
              {onOpenHireModal && (
                <div className="pt-5 border-t border-white/[0.08]">
                  <button
                    onClick={onOpenHireModal}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white text-xs font-semibold border border-white/[0.08] hover:border-[#ff6422]/50 transition-all cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-[#ff6422]" />
                    <span>Inquire About Similar Work</span>
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Footer Project Stepper (Next Project Showcase) */}
        {allProjects.length > 1 && onSelectProject && nextProject && (
          <section className="mt-20 pt-12 border-t border-white/[0.1]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Continue Exploring</p>
                <h3 className="text-lg sm:text-xl font-bold text-white">Next Project in Portfolio</h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Back to All Projects ↑
              </button>
            </div>

            <div
              onClick={() => onSelectProject(nextProject)}
              className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0c1017] border border-white/[0.1] hover:border-[#ff6422]/50 transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-black/50"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-14 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-black/60 shrink-0 border border-white/10">
                  <img
                    src={nextProject.image}
                    alt={nextProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff6422]">
                    {nextProject.category}
                  </span>
                  <h4 className="text-base sm:text-xl font-bold text-white group-hover:text-[#ff6422] transition-colors truncate">
                    {nextProject.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate max-w-lg mt-0.5">
                    {nextProject.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white group-hover:text-[#ff6422] shrink-0">
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* High-Resolution Screenshot Inspection Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between max-w-6xl w-full mx-auto pb-4"
            >
              <div className="text-xs sm:text-sm font-mono text-slate-300">
                <span className="text-[#ff6422] font-semibold">{project.title}</span>
                <span className="text-white/20 mx-2">·</span>
                <span>
                  Screenshot {selectedImageIndex + 1} of {allImages.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close (Esc)</span>
                </button>
              </div>
            </div>

            {/* Middle Image Stage with Prev / Next */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto overflow-hidden"
            >
              {allImages.length > 1 && (
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0
                    )
                  }
                  className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Previous (←)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <img
                src={allImages[selectedImageIndex]}
                alt={`Enlarged view ${selectedImageIndex + 1}`}
                className="max-h-[78vh] w-auto max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl border border-white/10"
              />

              {allImages.length > 1 && (
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev !== null ? (prev + 1) % allImages.length : 0
                    )
                  }
                  className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Next (→)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom thumbnail bar */}
            {allImages.length > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-6xl w-full mx-auto pt-4 flex items-center justify-center gap-2 overflow-x-auto"
              >
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-12 h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      i === selectedImageIndex
                        ? 'border-[#ff6422] scale-110'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
