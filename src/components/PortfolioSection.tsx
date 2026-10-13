import React, { useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Github,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface PortfolioSectionProps {
  onOpenProjectDoc?: (project: ProjectItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenProjectDoc }) => {
  const { projects } = usePortfolio();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically compute category filters from projects in database
  const dynamicCategories: string[] = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category || p.tag).filter((c): c is string => Boolean(c)))),
  ];

  const filteredProjects = projects.filter(
    (p) =>
      activeCategory === 'All' ||
      p.tag === activeCategory ||
      p.category === activeCategory
  );

  const displayList = filteredProjects.length > 0 ? filteredProjects : projects;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-white relative">
      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Featured Software <span className="text-[#ff6422]">Projects</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll projects left"
              className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-[#ff6422] hover:bg-orange-50 text-slate-700 hover:text-[#ff6422] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll projects right"
              className="w-11 h-11 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white flex items-center justify-center transition-all shadow-md shadow-orange-500/20 cursor-pointer active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Categories / Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {dynamicCategories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-[#f1f3f5] text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Horizontal Scrollable Projects Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 snap-x snap-mandatory select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayList.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-[340px] sm:w-[440px] lg:w-[480px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Large Well-Fitted Image with Top Badges, Action Icons & Embedded App Title */}
              <div className="relative h-[280px] sm:h-[340px] md:h-[360px] w-full overflow-hidden bg-slate-950 shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400 text-sm font-semibold">
                    {item.title}
                  </div>
                )}

                {/* Dark gradient overlay so that icons at top and title at bottom are crystal clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Left Corner: Category / Tag Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-[#ff6422] font-bold text-xs border border-[#ff6422]/30 shadow-md tracking-wide uppercase">
                    {item.category || item.tag || 'Project'}
                  </span>
                </div>

                {/* Top Right Corner: Doc Logo + GitHub Logo + Arrow Logo */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  {/* Documentation Logo next to GitHub logo: opens dynamic full-screen project doc page */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenProjectDoc) {
                        onOpenProjectDoc(item);
                      }
                    }}
                    title="View Project Details & Documentation"
                    aria-label={`View detailed documentation for ${item.title}`}
                    className="w-10 h-10 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-white hover:bg-[#ff6422] hover:border-[#ff6422] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer group/doc"
                  >
                    <FileText size={18} className="text-slate-100 group-hover/doc:text-white transition-colors" />
                  </button>

                  {/* GitHub Logo Redirect */}
                  <a
                    href={item.githubUrl || 'https://github.com'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="View GitHub Repository"
                    aria-label={`View GitHub repository for ${item.title}`}
                    className="w-10 h-10 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-white hover:bg-[#ff6422] hover:border-[#ff6422] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer group/gh"
                  >
                    <Github size={18} className="text-slate-100 group-hover/gh:text-white transition-colors" />
                  </a>

                  {/* Arrow Logo: Project Deployment Access */}
                  <a
                    href={item.liveUrl && item.liveUrl !== '#' ? item.liveUrl : (item.githubUrl || 'https://github.com')}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Access Live Deployment"
                    aria-label={`Access live deployment for ${item.title}`}
                    className="w-10 h-10 rounded-full bg-[#ff6422] backdrop-blur-md border border-[#ff6422] text-white hover:bg-[#ff7b42] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer group/arrow"
                  >
                    <ArrowUpRight size={20} className="transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                  </a>
                </div>

                {/* App Name inside the image right above the bottom line */}
                <div className="absolute bottom-4 left-5 right-5 z-10 pointer-events-none">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-md group-hover:text-[#ff6422] transition-colors duration-200 line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
