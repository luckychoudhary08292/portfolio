import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface WhyHireMeSectionProps {
  onOpenHireModal: () => void;
}

export const WhyHireMeSection: React.FC<WhyHireMeSectionProps> = ({ onOpenHireModal }) => {
  const { profile } = usePortfolio();
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <section id="about" className="py-6 sm:py-12 lg:py-16 bg-white min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="w-full max-w-[98%] 2xl:max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
        {/* Rounded Card Container - fits full screen as much as possible and close to walls */}
        <div className="rounded-[36px] sm:rounded-[48px] bg-[#f9fafb] border border-slate-200/80 p-6 sm:p-10 lg:p-12 xl:p-16 2xl:p-20 shadow-xs min-h-[80vh] flex items-center">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 2xl:gap-20">
            {/* Left Column: Portrait with Orange Arch Background - Big Size & Screen Fitted */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-[52%] xl:w-[54%] flex items-center justify-center"
            >
              {/* Orange Pill Arch */}
              <div className="relative w-full max-w-[460px] xs:max-w-[540px] sm:max-w-[640px] md:max-w-[720px] lg:max-w-[780px] xl:max-w-[860px] 2xl:max-w-[960px] aspect-[5/4] flex items-end justify-center group/whyhire">
                {/* Arch Shape */}
                <div className="absolute bottom-0 w-[92%] sm:w-[88%] h-[90%] bg-gradient-to-t from-[#f89552] to-[#fcb985] rounded-t-[180px] sm:rounded-t-[240px] lg:rounded-t-[300px] rounded-b-[44px] shadow-xl overflow-hidden" />

                {/* Portrait image - Big and Fitted in 5:4 Ratio */}
                {profile.whyHireMeImage ? (
                  <img
                    src={profile.whyHireMeImage}
                    alt={`Why Hire ${profile.name || 'Developer'}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    className="relative z-10 w-full h-full aspect-[5/4] object-cover object-top drop-shadow-2xl select-none cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    style={{
                      aspectRatio: '5 / 4',
                      maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                    }}
                    onClick={() => setIsFullscreen(true)}
                    title="Tap to view fitted on screen"
                  />
                ) : null}
              </div>
            </motion.div>

            {/* Right Column: Heading, Description, Stats & Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="w-full lg:w-[48%] xl:w-[46%] flex flex-col items-start lg:pl-6 xl:pl-10"
            >
              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
                Why <span className="text-[#ff6422]">Hire me?</span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {profile.whyHireMeBio}
              </p>

              {/* Two Stats Columns */}
              <div className="grid grid-cols-2 gap-8 sm:gap-12 mb-10 w-full max-w-lg">
                <div>
                  <div className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {profile.problemsSolved}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-slate-600 mt-1">
                    DSA Problems Solved
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
                    {profile.projectsCompleted}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-slate-600 mt-1">
                    Full-Stack Projects
                  </div>
                </div>
              </div>

              {/* Pill Button */}
              <button
                onClick={onOpenHireModal}
                className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-2xl sm:rounded-full border border-slate-900 text-slate-900 font-bold text-sm sm:text-base hover:bg-slate-900 hover:text-white transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
              >
                Hire me
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox / Fitted Fullscreen Modal for Why Hire Me Image */}
      {isFullscreen && profile.whyHireMeImage && (
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
              src={profile.whyHireMeImage}
              alt={`Why Hire ${profile.name}`}
              className="max-h-[85vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white/90 font-medium text-sm">
              <span className="font-bold text-[#ff6422]">Why Hire {profile.name}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
