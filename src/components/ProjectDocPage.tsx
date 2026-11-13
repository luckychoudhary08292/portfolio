import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
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
  User,
  Activity,
  Terminal,
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
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture' | 'gallery'>('overview');
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top and reset active tab on mount or when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'auto';
    setActiveTab('overview');
    setSelectedImageIndex(null);
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

  // Compile all project images (main banner + gallery) strictly from DB
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
    return imgs;
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

  // Share action
  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Find previous & next project indices
  const currentIndex = allProjects.findIndex(
    (p) => (p._id || p.id) === (project._id || project.id) || p.title === project.title
  );
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  // Derived content strictly from database record
  const overviewText = project.overview || project.description || '';

  const featuresList = useMemo(() => {
    if (project.keyFeatures && project.keyFeatures.length > 0) {
      return project.keyFeatures;
    }
    if (project.deliverables && project.deliverables.length > 0) {
      return project.deliverables;
    }
    return [];
  }, [project]);

  // Extract clean domain for browser mockup when liveUrl exists
  const displayDomain = useMemo(() => {
    if (!project.liveUrl || project.liveUrl === '#') {
      return project.category || project.title;
    }
    try {
      const url = new URL(project.liveUrl);
      return url.hostname;
    } catch {
      return project.liveUrl;
    }
  }, [project]);

  const factItems = useMemo(() => {
    const items: { label: string; value: string; highlight?: boolean }[] = [];
    if (project.role) items.push({ label: 'Role / Focus', value: project.role });
    if (project.duration) items.push({ label: 'Timeline', value: project.duration });
    if (project.metrics) items.push({ label: 'Impact Metric', value: project.metrics, highlight: true });
    if (project.tag) items.push({ label: 'Deliverable', value: project.tag });
    else if (project.category) items.push({ label: 'Category', value: project.category });
    return items;
  }, [project]);

  const availableTabs = useMemo(() => {
    const tabs: { id: 'overview' | 'features' | 'architecture' | 'gallery'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
      { id: 'overview', label: 'Executive Overview', icon: Sparkles },
    ];
    if (featuresList.length > 0) {
      tabs.push({ id: 'features', label: 'Core Features', icon: CheckCircle2 });
    }
    if (project.architecture || (project.techStack && project.techStack.length > 0)) {
      tabs.push({ id: 'architecture', label: 'Tech & Architecture', icon: Cpu });
    }
    if (allImages.length > 0) {
      tabs.push({ id: 'gallery', label: `Media Gallery (${allImages.length})`, icon: Layers });
    }
    return tabs;
  }, [featuresList.length, project.architecture, project.techStack, allImages.length]);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans selection:bg-[#ff6422] selection:text-white antialiased">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#ff6422] via-[#ff7b38] to-amber-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Command Bar Navigation (Clean White Portfolio Theme) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Back button & Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/90 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-all group shrink-0 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#ff6422] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </button>

            <span className="text-slate-300 hidden sm:inline">/</span>

            <div className="hidden sm:flex items-center gap-2 min-w-0 truncate">
              {project.category && (
                <>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-mono shrink-0">
                    {project.category}
                  </span>
                  <span className="text-slate-300">·</span>
                </>
              )}
              <span className="text-xs font-bold text-slate-900 truncate max-w-[200px] md:max-w-[320px]">
                {project.title}
              </span>
            </div>
          </div>

          {/* Center: Quick Project Switcher (If multiple projects) */}
          {allProjects.length > 1 && onSelectProject && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-xs text-slate-600">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-white cursor-pointer"
                title={`Previous: ${prevProject.title}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono px-1 font-semibold text-slate-700">
                {currentIndex + 1} / {allProjects.length}
              </span>
              <button
                onClick={() => onSelectProject(nextProject)}
                className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-white cursor-pointer"
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-medium transition-all cursor-pointer active:scale-95 shadow-xs"
              title="Copy Case Study Link"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
                title="View Source on GitHub"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                <span className="hidden lg:inline">Source Code</span>
              </a>
            )}

            {project.liveUrl && project.liveUrl !== '#' ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20">
        {/* Editorial Header & Elevator Pitch */}
        <section className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider">
            {project.category && (
              <span className="px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-[#ff6422] font-bold">
                {project.category}
              </span>
            )}
            {project.role && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-600 font-semibold">{project.role}</span>
              </>
            )}
            {project.duration && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-500">{project.duration}</span>
              </>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Project
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
            {project.title}
          </h1>

          {project.subtitle ? (
            <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          ) : overviewText ? (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {overviewText}
            </p>
          ) : null}

          {/* Key Facts Strips (Strictly from database fields) */}
          {factItems.length > 0 && (
            <div className={`pt-4 grid grid-cols-2 ${factItems.length >= 4 ? 'md:grid-cols-4' : factItems.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs my-6`}>
              {factItems.map((fact) => (
                <div key={fact.label}>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                    {fact.label}
                  </p>
                  <p className={`text-xs sm:text-sm truncate ${fact.highlight ? 'font-black text-[#ff6422]' : 'font-bold text-slate-900'}`}>
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Primary Viewport: Clean macOS Browser Showcase Window */}
        <section className="mb-12">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xl shadow-slate-200/60">
            {/* macOS Browser Header Bar */}
            <div className="px-4 py-3 bg-slate-100/90 border-b border-slate-200/80 flex items-center justify-between gap-4">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs" />
              </div>

              {/* URL Mockup Address Bar */}
              <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-2 px-4 py-1 rounded-lg bg-white border border-slate-200/90 text-xs text-slate-600 font-mono shadow-xs">
                <Lock className="w-3 h-3 text-emerald-500" />
                <span className="text-slate-700 truncate font-medium">
                  {project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : displayDomain}
                </span>
              </div>

              {/* Expand High-Res Button */}
              {allImages.length > 0 ? (
                <button
                  onClick={() => setSelectedImageIndex(0)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 transition-colors cursor-pointer shadow-xs"
                  title="Expand Full Resolution"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#ff6422]" />
                  <span className="hidden sm:inline">Enlarge Preview</span>
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>

            {/* High-Fidelity Project Showcase Image */}
            {allImages.length > 0 ? (
              <div
                className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImageIndex(0)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Layers className="w-16 h-16 text-slate-300" />
                </div>
                <img
                  src={allImages[0]}
                  alt={project.title}
                  className="relative z-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                {/* Subtle hover overlay hint */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold border border-white shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5 text-[#ff6422]" />
                    Click to inspect full resolution screenshot
                  </span>
                </div>
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400">
                <Layers className="w-14 h-14 text-slate-300" />
                <span className="text-xs font-medium">No preview image stored in database</span>
              </div>
            )}

            {/* Mini thumbnail strip if multiple images */}
            {allImages.length > 1 && (
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2.5 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-mono uppercase text-slate-500 whitespace-nowrap mr-1 font-bold">
                  Screenshots ({allImages.length}):
                </span>
                {allImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className="relative w-14 h-9 sm:w-18 sm:h-11 rounded-lg overflow-hidden border border-slate-200 hover:border-[#ff6422] shrink-0 transition-all cursor-pointer opacity-85 hover:opacity-100 shadow-xs"
                    title={`View Screenshot ${i + 1}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section Navigation Tabs (Crisp White Theme) */}
        {availableTabs.length > 1 && (
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/90 mb-8 overflow-x-auto shadow-xs">
            {availableTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#ff6422] text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic Tab Content with Smooth Transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Left Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff6422]" />
                    Project Summary
                  </h2>
                  {overviewText ? (
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
                      {overviewText}
                    </p>
                  ) : (
                    <p className="text-slate-400 text-sm">No extended overview saved for this project.</p>
                  )}
                </div>

                {/* Deliverables / Key Features preview from DB when available */}
                {featuresList.length > 0 && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Highlights & Deliverables
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {featuresList.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#ff6422] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: FEATURES */}
            {activeTab === 'features' && featuresList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff6422]" />
                    Key Features & Deliverables
                  </h2>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {featuresList.length} Items
                  </span>
                </div>

                <div className="space-y-3.5">
                  {featuresList.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#ff6422]/60 hover:shadow-md transition-all flex items-start gap-4 shadow-xs"
                    >
                      <span className="w-7 h-7 rounded-xl bg-orange-100 border border-orange-200 text-[#ff6422] text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                        {String(fIndex + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
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
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff6422]" />
                  System Architecture & Implementation
                </h2>

                {project.architecture && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#ff6422] uppercase tracking-wider font-bold">
                      <Terminal className="w-4 h-4" />
                      <span>Technical Architecture Specs</span>
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {project.architecture}
                    </p>
                  </div>
                )}

                {/* Tech Breakdown Grid */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="space-y-3 pt-1">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Technology Breakdown
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-mono font-semibold transition-all hover:border-[#ff6422] shadow-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 4: GALLERY */}
            {activeTab === 'gallery' && allImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff6422]" />
                    Visual Gallery & Media
                  </h2>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {allImages.length} {allImages.length === 1 ? 'Screenshot' : 'Screenshots'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video cursor-pointer hover:border-[#ff6422] hover:shadow-lg transition-all shadow-xs"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="w-10 h-10 text-slate-300" />
                      </div>
                      <img
                        src={imgUrl}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="relative z-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-[#ff6422]" />
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
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-6 space-y-6 sticky top-24 shadow-sm">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-2 font-bold">
                  <Activity className="w-4 h-4 text-[#ff6422]" />
                  Project Action Links
                </h3>

                <div className="space-y-2.5">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff6422] hover:bg-[#ff7536] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Launch Live Application</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs"
                    >
                      <Github className="w-4 h-4 text-white" />
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 font-bold">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-semibold border border-slate-200/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata Details (Strictly from DB) */}
              {(project.category || project.tag || project.role || project.duration || project.metrics) && (
                <div className="pt-5 border-t border-slate-100 space-y-2.5 text-xs">
                  {project.category && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Domain Category</span>
                      <span className="font-bold text-slate-900">{project.category}</span>
                    </div>
                  )}
                  {project.tag && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Engineering Focus</span>
                      <span className="font-bold text-slate-900">{project.tag}</span>
                    </div>
                  )}
                  {project.role && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Author Role</span>
                      <span className="font-bold text-slate-900">{project.role}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Timeline</span>
                      <span className="font-bold text-slate-900">{project.duration}</span>
                    </div>
                  )}
                  {project.metrics && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Key Metric</span>
                      <span className="font-black text-[#ff6422]">{project.metrics}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Inquire / Hire CTA */}
              {onOpenHireModal && (
                <div className="pt-5 border-t border-slate-100">
                  <button
                    onClick={onOpenHireModal}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100/80 text-[#ff6422] text-xs font-bold border border-orange-200 transition-all cursor-pointer active:scale-95 shadow-xs"
                  >
                    <User className="w-3.5 h-3.5 text-[#ff6422]" />
                    <span>Inquire About Similar Work</span>
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Footer Project Stepper (Next Project Showcase in Portfolio Theme) */}
        {allProjects.length > 1 && onSelectProject && nextProject && (
          <section className="mt-18 pt-10 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Continue Exploring</p>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">Next Project in Portfolio</h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold text-slate-500 hover:text-[#ff6422] transition-colors cursor-pointer"
              >
                Back to All Projects ↑
              </button>
            </div>

            <div
              onClick={() => onSelectProject(nextProject)}
              className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 hover:border-[#ff6422] transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs hover:shadow-md"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-20 h-14 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-xs flex items-center justify-center">
                  <Layers className="w-6 h-6 text-slate-300" />
                  {nextProject.image && (
                    <img
                      src={nextProject.image}
                      alt={nextProject.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff6422] font-bold">
                    {nextProject.category}
                  </span>
                  <h4 className="text-base sm:text-xl font-black text-slate-900 group-hover:text-[#ff6422] transition-colors truncate">
                    {nextProject.title}
                  </h4>
                  <p className="text-xs text-slate-600 truncate max-w-lg mt-0.5">
                    {nextProject.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#ff6422] shrink-0">
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
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between max-w-6xl w-full mx-auto pb-4"
            >
              <div className="text-xs sm:text-sm font-mono text-slate-300">
                <span className="text-[#ff6422] font-bold">{project.title}</span>
                <span className="text-white/20 mx-2">·</span>
                <span>
                  Screenshot {selectedImageIndex + 1} of {allImages.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                  className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
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
                  className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
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
                        ? 'border-[#ff6422] scale-110 shadow-md'
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
