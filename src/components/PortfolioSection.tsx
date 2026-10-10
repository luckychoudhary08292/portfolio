import React, { useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import { projectCategories, ProjectItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const { projects } = usePortfolio();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

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
          {projectCategories.map((cat) => {
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

        {/* Horizontal Scrollable Projects Track - stretches close to walls */}
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
              onClick={() => onSelectProject(item)}
              className="w-[320px] sm:w-[420px] lg:w-[460px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* 1. Image Frame (Above Title) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/src/assets/images/service_smart_home_mockup_1791610793006.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500 text-xs font-mono">
                      {item.title}
                    </div>
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold text-xs border border-white/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Circular Arrow Sign to Access Website or Project */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const targetUrl = item.liveUrl && item.liveUrl !== '#' ? item.liveUrl : item.githubUrl;
                      if (targetUrl && targetUrl !== '#') {
                        window.open(targetUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        onSelectProject(item);
                      }
                    }}
                    aria-label={`Access ${item.title}`}
                    title="Access Website or Project"
                    className="absolute bottom-3.5 right-3.5 z-20 w-12 h-12 rounded-full bg-[#16171a]/90 backdrop-blur-md border border-white/20 text-white hover:bg-[#ff6422] hover:border-[#ff6422] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 cursor-pointer active:scale-95 group/arrow"
                  >
                    <ArrowUpRight size={22} className="transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                  </button>

                  </div>

                {/* 2. Details (Title & Tech Stack strictly below image) */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#ff6422] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(item.techStack || []).slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {(item.techStack || []).length > 4 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-orange-50 text-[#ff6422] font-semibold">
                        +{(item.techStack || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Bottom Row: GitHub & Access Website / Modal */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-end text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href={item.githubUrl || 'https://github.com'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-black transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github size={16} />
                  </a>

                  <button
                    onClick={() => onSelectProject(item)}
                    className="inline-flex items-center gap-1 font-bold text-[#ff6422] hover:underline cursor-pointer"
                  >
                    <span>Access Project</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
