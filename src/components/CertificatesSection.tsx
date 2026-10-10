import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CertificateItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

export const CertificatesSection: React.FC = () => {
  const { certificates } = usePortfolio();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [fullscreenImageCert, setFullscreenImageCert] = useState<CertificateItem | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="certificates" className="py-20 sm:py-28 bg-[#fafbfc] border-y border-slate-100 relative">
      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Licenses & <span className="text-[#ff6422]">Certificates</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-[#ff6422] hover:bg-orange-50 text-slate-700 hover:text-[#ff6422] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white flex items-center justify-center transition-all shadow-md shadow-orange-500/20 cursor-pointer active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container - stretches close to walls */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 snap-x snap-mandatory select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-[320px] sm:w-[380px] lg:w-[420px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Certificate Image Frame with Title on Image & Tap to Fullscreen */}
              <div
                onClick={() => setFullscreenImageCert(cert)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer group"
              >
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    onError={(e) => {
                      // Fallback in case of broken external image URL
                      (e.target as HTMLImageElement).src = '/src/assets/images/cert_aws_cloud_doc_1791619234289.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-500 text-xs font-mono">
                    {cert.title}
                  </div>
                )}

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Issuer Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold text-xs border border-white/20">
                    {cert.issuer}
                  </span>
                </div>
              </div>

              {/* Lower Details */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#ff6422] transition-colors leading-snug mb-3">
                    {cert.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      {cert.issueDate}
                    </span>
                    <span className="font-mono text-slate-600 font-medium">
                      {cert.credentialId}
                    </span>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-orange-50 text-[#ff6422] font-semibold">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end text-xs">
                  <a
                    href={cert.verifyUrl || 'https://aws.amazon.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#ff6422] font-bold hover:underline"
                  >
                    <span>Verify</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Lightbox Modal */}
      <AnimatePresence>
        {fullscreenImageCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImageCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#141518] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setFullscreenImageCert(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                aria-label="Close full screen"
              >
                <X size={20} />
              </button>

              {/* Full Image */}
              <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[480px] bg-black flex items-center justify-center p-2 sm:p-4 overflow-auto">
                {fullscreenImageCert.image ? (
                  <img
                    src={fullscreenImageCert.image}
                    alt={fullscreenImageCert.title}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                  />
                ) : null}
              </div>

              {/* Bottom Info Bar */}
              <div className="p-4 sm:p-6 bg-[#18191d] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#ff6422] uppercase tracking-wider">
                      {fullscreenImageCert.issuer}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      • {fullscreenImageCert.credentialId}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {fullscreenImageCert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={fullscreenImageCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-semibold text-xs transition-colors shadow-md shadow-orange-500/20"
                  >
                    <span>Verify on Issuer Website</span>
                    <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => setFullscreenImageCert(null)}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
