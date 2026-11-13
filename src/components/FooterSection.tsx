import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SocialLinks } from './SocialLinks';

interface FooterSectionProps {
  onOpenHireModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenHireModal }) => {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const conciseBio = profile.whyHireMeBio
    ? profile.whyHireMeBio.length > 120
      ? `${profile.whyHireMeBio.slice(0, 117).trim()}...`
      : profile.whyHireMeBio
    : '';

  const initials = profile.name
    ? profile.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  return (
    <footer
      id="contact"
      className="bg-[#131417] text-white rounded-t-[36px] sm:rounded-t-[48px] pt-14 sm:pt-20 pb-10 overflow-hidden shadow-2xl relative"
    >
      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Banner Row: Direct CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6422] text-xs font-semibold uppercase tracking-wider mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#ff6422] animate-pulse" />
              <span>Open to Opportunities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
              Let's Connect & Build
            </h2>
            {profile.title && (
              <p className="text-sm text-gray-400 max-w-xl">
                {profile.title}{profile.university ? ` • ${profile.university}` : ''}
              </p>
            )}
          </div>

          <button
            onClick={onOpenHireModal}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95 group"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Horizontal Brand & Social Bar */}
        <div className="py-8 sm:py-10 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Logo, Name and Concise Description all aligned horizontally */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 min-w-0">
            {/* Logo + Name aligned horizontally */}
            {profile.name ? (
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-full bg-[#ff6422] flex items-center justify-center text-white font-black text-xs tracking-tighter shadow-md shadow-orange-500/20">
                  {initials}
                </div>
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase">
                  {profile.name}
                </span>
              </div>
            ) : (
              <div className="w-32 h-7 rounded-full bg-white/10 animate-pulse shrink-0" />
            )}

            {/* Subtle Vertical Divider on sm+ */}
            {conciseBio && (
              <>
                <span className="hidden sm:inline-block w-px h-5 bg-white/15 shrink-0" />
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl truncate sm:overflow-visible sm:whitespace-normal">
                  {conciseBio}
                </p>
              </>
            )}
          </div>

          {/* Social Links aligned horizontally on the right */}
          <div className="shrink-0 flex items-center">
            <SocialLinks variant="footer" />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()}{profile.name ? ` ${profile.name}.` : ''} All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for Hire</span>
            </span>
            <span className="text-white/20">•</span>
            <button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
