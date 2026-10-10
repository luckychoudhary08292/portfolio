import React, { useRef } from 'react';
import {
  Code,
  Terminal,
  Layers,
  Database,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SkillCategoryItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface SkillsSectionProps {
  onSelectSkillCategory: (cat: SkillCategoryItem) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkillCategory }) => {
  const { skills } = usePortfolio();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('language')) return <Code size={22} className="text-[#ff6422]" />;
    if (lower.includes('front')) return <Layers size={22} className="text-[#ff6422]" />;
    if (lower.includes('back')) return <Terminal size={22} className="text-[#ff6422]" />;
    return <Database size={22} className="text-[#ff6422]" />;
  };

  return (
    <section
      id="skills"
      className="relative bg-[#131417] text-white rounded-t-[36px] sm:rounded-t-[48px] pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden shadow-2xl"
    >
      {/* Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Silk Wave SVG Accent */}
      <div className="absolute top-12 left-4 sm:left-12 opacity-30 pointer-events-none">
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          <path
            d="M30 60C70 20 140 10 180 50C220 90 170 170 120 180C70 190 10 140 10 100C10 80 15 70 30 60Z"
            fill="url(#orange-glow-skills-h)"
          />
          <defs>
            <linearGradient id="orange-glow-skills-h" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7b39" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e84c0f" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Technical <span className="text-[#ff6422]">Skills</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll skills left"
              className="w-11 h-11 rounded-full bg-[#1b1c20] border border-white/10 hover:border-[#ff6422] text-white flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll skills right"
              className="w-11 h-11 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white flex items-center justify-center transition-all shadow-md shadow-orange-500/20 cursor-pointer active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Skills Track - stretches close to walls */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 snap-x snap-mandatory select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {skills.map((category, idx) => (
            <motion.div
              key={category.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelectSkillCategory(category)}
              className="w-[320px] sm:w-[380px] lg:w-[420px] shrink-0 snap-start rounded-3xl bg-[#1b1c20]/95 border border-white/10 hover:border-[#ff6422]/60 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image Frame strictly above Title */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 bg-[#24262c] border border-white/10 group/img">
                  <img
                    src={category.image || '/src/assets/images/service_smart_home_mockup_1791610793006.jpg'}
                    alt={category.category}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/blog_music_player_1791610853630.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c20] via-black/20 to-black/40 pointer-events-none" />

                  {/* Category Pill Tag on Image */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
                    {getCategoryIcon(category.category)}
                    <span>{category.category}</span>
                  </div>

                  {/* Circular Arrow Sign to Access / Explore Skill Projects */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSkillCategory(category);
                    }}
                    aria-label={`Explore ${category.category}`}
                    title="Access Projects in this skill domain"
                    className="absolute bottom-3 right-3 z-20 w-11 h-11 rounded-full bg-[#16171a]/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#ff6422] hover:border-[#ff6422] transition-all duration-300 shadow-xl hover:scale-110 cursor-pointer active:scale-95 group/arrow"
                  >
                    <ArrowUpRight size={20} className="transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                  </button>
                </div>

                {/* Title strictly below Image */}
                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors mb-2">
                  {category.category}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mb-5">
                  {category.description}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/15 font-medium group-hover:border-orange-500/30 transition-colors"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
