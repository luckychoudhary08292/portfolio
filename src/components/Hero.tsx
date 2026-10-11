import React, { useState } from 'react';
import { ArrowUpRight, Star, Code2, Award, X } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onOpenHireModal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHireModal, onExploreProjects }) => {
  const { profile } = usePortfolio();
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <section id="home" className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-white">
      {/* Background Subtle Ambience */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-orange-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Hello Pill with hand-drawn rays */}
        <div className="flex flex-col items-center justify-center mb-3">
          <div className="relative">
            {/* Playful Orange Accent Rays */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 pointer-events-none">
              <span className="w-1 h-2.5 bg-[#ff6422] rounded-full rotate-[-25deg] transform origin-bottom" />
              <span className="w-1 h-3 bg-[#ff6422] rounded-full -translate-y-0.5" />
              <span className="w-1 h-2.5 bg-[#ff6422] rounded-full rotate-[25deg] transform origin-bottom" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-slate-800/80 bg-white shadow-xs text-xs font-semibold text-slate-800 tracking-wide"
            >
              <Code2 size={13} className="text-[#ff6422]" />
              <span>Hello, World!</span>
            </motion.div>
          </div>
        </div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            I'm <span className="text-[#ff6422]">{profile.name}</span>,
            <br />
            {profile.title}
          </h1>
        </motion.div>

        {/* Hero Stage: Large Portrait with Side Highlights and Center Arch close to walls */}
        <div className="relative w-full max-w-full mx-auto flex flex-col md:flex-row items-center justify-center min-h-[480px] sm:min-h-[580px] lg:min-h-[680px]">
          {/* Left Summary Quote Card - positioned close to left wall on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col max-w-[220px] 2xl:max-w-[280px] absolute left-2 sm:left-4 lg:left-6 xl:left-10 2xl:left-14 top-1/3 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="text-4xl lg:text-5xl font-serif text-slate-800 leading-none mb-2 font-bold opacity-80">
              “
            </div>
            <p className="text-xs lg:text-sm font-medium text-slate-700 leading-relaxed">
              {profile.heroQuote}
            </p>
            <span className="block text-xs font-bold text-[#ff6422] mt-2">
              GPA: {profile.gpa} • {profile.experienceYears}
            </span>
          </motion.div>

          {/* Center Portrait Visual with Arch - Big Size & Fitted on Screen */}
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Sizable Peach / Orange Arch Background */}
            <div className="relative w-full max-w-[340px] xs:max-w-[390px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] h-[430px] xs:h-[490px] sm:h-[580px] md:h-[660px] lg:h-[720px] xl:h-[760px] flex items-end justify-center group/heroimg">
              {/* Semicircle Arch */}
              <div className="absolute bottom-0 w-full h-[80%] bg-gradient-to-t from-[#f8924f] via-[#fba86c] to-[#fcb985] rounded-t-full shadow-2xl overflow-hidden" />



              {/* Portrait Image - Big and Fitted */}
              {profile.heroImage ? (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  src={profile.heroImage}
                  alt={`${profile.name || 'Developer'} - ${profile.title || 'Portfolio'}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/lucky_swe_portrait_1791616127280.jpg';
                  }}
                  className="relative z-10 w-full h-full object-cover object-top select-none drop-shadow-2xl cursor-pointer"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
                  }}
                  onClick={() => setIsFullscreen(true)}
                  title="Tap to view fitted on screen"
                />
              ) : null}

              {/* Action Buttons Capsule Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute bottom-4 z-30 p-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-1.5"
              >
                <button
                  onClick={onExploreProjects}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-orange-500/30 cursor-pointer"
                >
                  <span>Projects</span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={onOpenHireModal}
                  className="px-5 py-2.5 rounded-full text-white/90 hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/10 cursor-pointer"
                >
                  Contact Me
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right Rating & LeetCode Experience - positioned close to right wall */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col items-start absolute right-2 sm:right-4 lg:right-6 xl:right-10 2xl:right-14 top-1/3 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center gap-1 mb-2 text-[#ff6422]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#ff6422" stroke="none" />
              ))}
            </div>
            <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {profile.problemsSolved}
            </div>
            <div className="text-xs lg:text-sm font-semibold text-slate-700">
              DSA Problems Solved
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              LeetCode & HackerRank
            </div>
          </motion.div>
        </div>

        {/* Responsive Mobile / Tablet Quote & Rating Row */}
        <div className="flex lg:hidden items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100 max-w-md mx-auto">
          <div className="text-left">
            <div className="flex items-center gap-0.5 text-[#ff6422] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#ff6422" stroke="none" />
              ))}
            </div>
            <div className="text-xl font-bold text-slate-900">{profile.problemsSolved}</div>
            <div className="text-xs text-slate-500">DSA Solved</div>
          </div>

          <div className="text-right max-w-[180px]">
            <p className="text-xs text-slate-600 leading-snug">
              {profile.degree}
            </p>
            <span className="text-[11px] font-bold text-[#ff6422]">GPA {profile.gpa}</span>
          </div>
        </div>
      </div>

      {/* Lightbox / Fitted Fullscreen Modal for Hero Image */}
      {isFullscreen && profile.heroImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[94vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-3 right-3 sm:-top-12 sm:right-0 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-xl"
              aria-label="Close full screen"
            >
              <X size={22} />
            </button>
            <img
              src={profile.heroImage}
              alt={profile.name}
              className="max-h-[85vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white/90 font-medium text-sm">
              <span className="font-bold text-[#ff6422]">{profile.name}</span> — {profile.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
