import React, { useRef, useState } from 'react';
import {
  Code,
  Terminal,
  Layers,
  Database,
  Cloud,
  FileCode,
  Sparkles,
  Users,
  Lightbulb,
  Clock,
  HeartHandshake,
  MessageSquare,
  Target,
  Compass,
  Workflow,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SkillCategoryItem, SkillItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface SkillsSectionProps {
  onSelectSkillCategory: (cat: SkillCategoryItem) => void;
}

interface SoftSkillCategory {
  id: string;
  category: string;
  type: 'soft';
  image?: string;
  items: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkillCategory }) => {
  const { skills } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'hard' | 'soft'>('hard');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Card Header Logo / Icon based on category
  const getCategoryLogo = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('language')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#ff6422]/15 border border-[#ff6422]/30 flex items-center justify-center text-[#ff6422] shadow-md shadow-orange-500/10">
          <Code size={24} strokeWidth={2.2} />
        </div>
      );
    }
    if (lower.includes('front')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10">
          <Layers size={24} strokeWidth={2.2} />
        </div>
      );
    }
    if (lower.includes('back')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/10">
          <Terminal size={24} strokeWidth={2.2} />
        </div>
      );
    }
    if (lower.includes('database') || lower.includes('cloud')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/10">
          <Database size={24} strokeWidth={2.2} />
        </div>
      );
    }
    if (lower.includes('collaboration') || lower.includes('team')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/10">
          <Users size={24} strokeWidth={2.2} />
        </div>
      );
    }
    if (lower.includes('problem') || lower.includes('critical')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-md shadow-rose-500/10">
          <Lightbulb size={24} strokeWidth={2.2} />
        </div>
      );
    }
    if (lower.includes('execution') || lower.includes('leadership') || lower.includes('delivery')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md shadow-blue-500/10">
          <Target size={24} strokeWidth={2.2} />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#ff6422] shadow-md shadow-orange-500/10">
        <Sparkles size={24} strokeWidth={2.2} />
      </div>
    );
  };

  // Clean mini skill logo: NO square border, NO background box, clean PNG / SVG aesthetic
  const getCleanMiniSkillLogo = (name: string, badge?: string) => {
    const key = (badge || name).toLowerCase();

    // JavaScript (Official Yellow JS Badge)
    if (key.includes('js') || key.includes('javascript')) {
      return (
        <svg className="w-8 h-8 rounded" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="3" fill="#F7DF1E" />
          <path
            d="M7 16.5C7.5 17.5 8.5 18 9.8 18C11.3 18 12.3 17.2 12.3 15.6C12.3 14.1 11.4 13.5 9.9 12.9L9.2 12.6C8.2 12.2 7.6 11.7 7.6 10.8C7.6 9.8 8.4 9 9.7 9C10.7 9 11.5 9.4 12 10.3L10.7 11.1C10.4 10.5 10 10.2 9.6 10.2C9.1 10.2 8.7 10.5 8.7 10.9C8.7 11.4 9 11.7 9.8 12L10.5 12.3C12.1 13 13.5 13.7 13.5 15.6C13.5 17.7 11.9 19.2 9.8 19.2C7.9 19.2 6.5 18.2 5.8 16.8L7 16.5ZM14.8 9.2H16.1V15.4C16.1 16.7 16.8 17.2 17.8 17.2C18.4 17.2 18.9 17 19.2 16.8L19.4 18C18.9 18.2 18.1 18.4 17.2 18.4C15.3 18.4 14.8 17.2 14.8 15.3V9.2Z"
            fill="#000000"
          />
        </svg>
      );
    }
    // TypeScript (Official Blue TS Badge)
    if (key.includes('ts') || key.includes('typescript')) {
      return (
        <svg className="w-8 h-8 rounded" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <path
            d="M12.5 14.8C12.8 16.2 13.8 17.1 15.5 17.1C17.2 17.1 18.2 16.3 18.2 14.9C18.2 13.6 17.2 13 15.6 12.4L14.7 12.1C13.2 11.5 12.3 10.7 12.3 9.2C12.3 7.4 13.8 6.1 16 6.1C17.8 6.1 19.1 7.1 19.6 8.7L17.7 9.4C17.4 8.4 16.8 7.9 16 7.9C15 7.9 14.4 8.4 14.4 9.1C14.4 9.8 14.8 10.3 16 10.7L17 11.1C19.1 11.8 20.2 12.8 20.2 14.7C20.2 17 18.4 18.8 15.5 18.8C12.9 18.8 11.3 17.5 10.7 15.5L12.5 14.8ZM5.5 8H8.2V18.5H10.3V8H13V6.2H5.5V8Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    }
    // Python
    if (key.includes('python')) {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.9 2C8.7 2 6.8 3.4 6.8 5.7V7.5H12V8.4H5.1C2.9 8.4 1 10.3 1 12.5C1 14.8 2.6 16.4 5.1 16.4H6.8V14.3C6.8 12.2 8.5 10.5 10.6 10.5H15.4C16.9 10.5 18.1 9.3 18.1 7.8V5.7C18.1 3.4 15.8 2 11.9 2ZM9.3 3.8C9.9 3.8 10.4 4.3 10.4 4.9C10.4 5.5 9.9 6 9.3 6C8.7 6 8.2 5.5 8.2 4.9C8.2 4.3 8.7 3.8 9.3 3.8Z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22C15.3 22 17.2 20.6 17.2 18.3V16.5H12V15.6H18.9C21.1 15.6 23 13.7 23 11.5C23 9.2 21.4 7.6 18.9 7.6H17.2V9.7C17.2 11.8 15.5 13.5 13.4 13.5H8.6C7.1 13.5 5.9 14.7 5.9 16.2V18.3C5.9 20.6 8.2 22 12.1 22ZM14.7 20.2C14.1 20.2 13.6 19.7 13.6 19.1C13.6 18.5 14.1 18 14.7 18C15.3 18 15.8 18.5 15.8 19.1C15.8 19.7 15.3 20.2 14.7 20.2Z"
            fill="#FFD43B"
          />
        </svg>
      );
    }
    // React (Official Cyan Spinning Atom)
    if (key.includes('react')) {
      return (
        <svg
          className="w-8 h-8 animate-[spin_12s_linear_infinite]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
        >
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.6" fill="#61DAFB" />
        </svg>
      );
    }
    // Tailwind CSS
    if (key.includes('tailwind')) {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#06B6D4">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    }
    // Next.js
    if (key.includes('next')) {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M15.5 8H17.5V16H15.5V8Z" fill="#FFFFFF" />
          <path d="M8.5 8H10.5L15.8 16H13.8L8.5 8Z" fill="#FFFFFF" />
        </svg>
      );
    }
    // Node.js
    if (key.includes('node')) {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#68A063">
          <path d="M12 2L3 7.2V17.5L12 22.7L21 17.5V7.2L12 2ZM12 4.5L18.8 8.4V16.3L12 20.2L5.2 16.3V8.4L12 4.5Z" />
        </svg>
      );
    }
    // MongoDB
    if (key.includes('mongo')) {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#13AA52">
          <path d="M12 2C11.5 2 7 8 7 13.5C7 17.5 9.5 20.5 12 22C14.5 20.5 17 17.5 17 13.5C17 8 12.5 2 12 2ZM12 4.5C13.5 7.5 15.2 11.2 15.2 13.5C15.2 16.2 13.8 18.5 12 19.8V4.5Z" />
        </svg>
      );
    }
    // Docker
    if (key.includes('docker')) {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm9 3h2v2h-2zm3.8 3.5c-.4-.3-1.4-.4-2.1-.2-.2-.5-.6-.9-1.1-1.2l-.7-.4-.4.6c-.3.5-.4 1.1-.4 1.7 0 .2 0 .4.1.6-.7.4-1.8.4-2.5.4H2c-.4 1.7.1 3.6 1.4 5 1.5 1.5 3.5 2.2 6.1 2.2 5.5 0 9.7-2.7 11.2-8.3.7.1 1.4-.1 1.8-.4.2-.2.3-.5.2-.8-.2-.3-.5-.5-.9-.6z" />
        </svg>
      );
    }
    // Git
    if (key.includes('git')) {
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F05032">
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.8.8.8 2 0 2.8s-2 .8-2.8 0c-.5-.5-.6-1.3-.4-1.9L12.3 11v4.8c.2.1.4.3.5.5.8.8.8 2 0 2.8s-2 .8-2.8 0c-.8-.8-.8-2 0-2.8.3-.3.6-.4 1-.5V10.9c-.4-.1-.7-.3-1-.5-.5-.5-.6-1.3-.4-1.9L6.9 5.8 2.4 10.3c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.5.6-1.5.1-2.1z" />
        </svg>
      );
    }
    // AWS / Cloud
    if (key.includes('aws') || key.includes('cloud')) {
      return <Cloud size={28} className="text-[#FF9900]" />;
    }
    // Database / SQL / PostgreSQL
    if (key.includes('sql') || key.includes('postgres') || key.includes('db')) {
      return <Database size={28} className="text-[#336791]" />;
    }
    // HTML / CSS
    if (key.includes('html') || key.includes('css')) {
      return <FileCode size={28} className="text-[#E34F26]" />;
    }
    // Redux
    if (key.includes('redux')) {
      return <span className="text-[#764ABC] font-black text-sm font-mono">REDUX</span>;
    }
    // Express
    if (key.includes('express')) {
      return <span className="text-white font-bold text-sm font-mono">EXPRESS</span>;
    }
    // C++
    if (key.includes('c++') || key.includes('cpp')) {
      return <span className="text-[#0080FF] font-black text-base font-mono">C++</span>;
    }
    // Java
    if (key.includes('java') && !key.includes('javascript')) {
      return <span className="text-[#E76F00] font-black text-base font-mono">JAVA</span>;
    }

    // Soft Skills Clean Transparent Icons (NO square border, NO bg)
    if (key.includes('team') || key.includes('cross-func') || key.includes('collaboration')) {
      return <Users size={26} className="text-amber-400" />;
    }
    if (key.includes('comm') || key.includes('presentation') || key.includes('dialogue')) {
      return <MessageSquare size={26} className="text-cyan-300" />;
    }
    if (key.includes('leader') || key.includes('mentorship') || key.includes('ownership')) {
      return <Target size={26} className="text-[#ff6422]" />;
    }
    if (
      key.includes('empathy') ||
      key.includes('relation') ||
      key.includes('active listen') ||
      key.includes('listen')
    ) {
      return <HeartHandshake size={26} className="text-rose-400" />;
    }
    if (key.includes('analytical') || key.includes('critical') || key.includes('problem')) {
      return <Lightbulb size={26} className="text-yellow-300" />;
    }
    if (key.includes('adapt') || key.includes('agile') || key.includes('learning')) {
      return <Workflow size={26} className="text-emerald-300" />;
    }
    if (
      key.includes('time') ||
      key.includes('deadline') ||
      key.includes('sprint') ||
      key.includes('priority')
    ) {
      return <Clock size={26} className="text-blue-300" />;
    }
    if (key.includes('direction') || key.includes('initiative') || key.includes('strategic')) {
      return <Compass size={26} className="text-purple-300" />;
    }

    // Default clean text
    return (
      <span className="text-white/90 font-bold text-xs font-mono">
        {name.slice(0, 3).toUpperCase()}
      </span>
    );
  };

  // Dedicated Soft Skills Categories (Loaded from DB if available, fallback for smooth preview)
  const defaultSoftSkillCategories: SoftSkillCategory[] = [
    {
      id: 'soft-1',
      category: 'Team Collaboration & Communication',
      type: 'soft',
      items: [
        { name: 'Active Listening', badge: 'listen' },
        { name: 'Cross-Functional Teamwork', badge: 'team' },
        { name: 'Technical Presentation', badge: 'presentation' },
        { name: 'Conflict Resolution', badge: 'empathy' },
        { name: 'Constructive Code Reviews', badge: 'dialogue' },
        { name: 'Stakeholder Communication', badge: 'comm' },
      ],
    },
    {
      id: 'soft-2',
      category: 'Problem Solving & Critical Thinking',
      type: 'soft',
      items: [
        { name: 'Root Cause Analysis', badge: 'analytical' },
        { name: 'Algorithmic Reasoning', badge: 'critical' },
        { name: 'Creative Troubleshooting', badge: 'problem' },
        { name: 'Fast Technical Assimilation', badge: 'learning' },
        { name: 'Decision Making Under Uncertainty', badge: 'analytical' },
        { name: 'Systems Thinking', badge: 'critical' },
      ],
    },
    {
      id: 'soft-3',
      category: 'Execution & Leadership',
      type: 'soft',
      items: [
        { name: 'Ownership Mindset', badge: 'ownership' },
        { name: 'Agile & Sprint Adaptability', badge: 'agile' },
        { name: 'Deadline & Time Management', badge: 'deadline' },
        { name: 'Proactive Mentorship', badge: 'mentorship' },
        { name: 'Strategic Prioritization', badge: 'priority' },
        { name: 'Engineering Leadership', badge: 'leader' },
      ],
    },
  ];

  // Distinguish Hard and Soft Skills from database categories
  const dbHardSkills = skills.filter((c) => !c.type || c.type === 'hard');
  const dbSoftSkills = skills.filter((c) => c.type === 'soft');

  const currentDisplayList =
    activeTab === 'hard'
      ? dbHardSkills
      : dbSoftSkills.length > 0
      ? dbSoftSkills
      : defaultSoftSkillCategories;

  return (
    <section
      id="skills"
      className="relative bg-[#111216] text-white rounded-t-[36px] sm:rounded-t-[48px] pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden shadow-2xl"
    >
      {/* Subtle Ambient Lights */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* 1. Simple Hard Skill & Soft Skill Buttons */}
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <div className="inline-flex p-1.5 bg-[#17181d] rounded-full border border-white/10 shadow-lg">
            <button
              onClick={() => {
                setActiveTab('hard');
                if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'hard'
                  ? 'bg-[#ff6422] text-white shadow-md shadow-orange-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Hard Skill
            </button>
            <button
              onClick={() => {
                setActiveTab('soft');
                if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'soft'
                  ? 'bg-[#ff6422] text-white shadow-md shadow-orange-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Soft Skill
            </button>
          </div>
        </div>

        {/* 2. Main Title (Below the Buttons, Dynamic Heading Based on Tab) */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {activeTab === 'hard' ? (
              <>
                Technical Skills <span className="text-[#ff6422]">(Hard Skills)</span>
              </>
            ) : (
              <>
                Behavioural Skills <span className="text-[#ff6422]">(Soft Skills)</span>
              </>
            )}
          </h2>
        </div>

        {/* 3. Smooth Horizontal Scroll Controls */}
        <div className="flex items-center justify-end gap-3 mb-4 px-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full bg-[#17181d] border border-white/10 hover:border-[#ff6422] text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/5 shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-orange-500/20 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 4. Cards Track: Smooth Horizontal Scrolling, Category Logo & Name Aligned Horizontally, Clean Mini Skill PNG Logos */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-8 pt-2 snap-x snap-mandatory select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {currentDisplayList.map((category, idx) => (
            <motion.div
              key={category.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => {
                if ('items' in category && activeTab === 'hard') {
                  onSelectSkillCategory(category as SkillCategoryItem);
                }
              }}
              className="w-[320px] sm:w-[370px] lg:w-[410px] shrink-0 snap-start rounded-[28px] bg-[#17181d] border border-white/10 hover:border-[#ff6422]/60 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-start group cursor-pointer"
            >
              {/* Category Logo & Category Name Aligned Horizontally */}
              <div className="flex items-center gap-3.5 sm:gap-4 mb-6">
                <div className="shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-12 h-12 rounded-xl object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    getCategoryLogo(category.category)
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-300 transition-colors leading-tight">
                  {category.category}
                </h3>
              </div>

              {/* Skills Items: Clean Mini Skill PNG Logo (No Square Border, No BG Box) with Small Name Below */}
              <div className="grid grid-cols-3 gap-y-5 gap-x-2 pt-1 w-full">
                {category.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex flex-col items-center justify-center p-2 group/skill text-center"
                  >
                    {/* Mini skill logo: clean PNG without square border or background box */}
                    <div className="h-9 w-9 flex items-center justify-center mb-1.5 group-hover/skill:scale-110 transition-transform duration-200">
                      {skill.logo ? (
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="max-h-8 max-w-8 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        getCleanMiniSkillLogo(skill.name, skill.badge)
                      )}
                    </div>

                    {/* Small name */}
                    <span className="text-[11px] sm:text-xs font-medium text-slate-300 group-hover/skill:text-white transition-colors truncate max-w-full leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
