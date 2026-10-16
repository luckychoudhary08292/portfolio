import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export interface SocialLinksProps {
  variant?: 'hero' | 'footer' | 'pill' | 'compact' | 'modal';
  className?: string;
  showLabels?: boolean;
}

// Helper to format URLs based on database / admin inputs
export const formatSocialUrl = (
  url: string | undefined,
  platformBase: string,
  fallbackUsername: string
): string => {
  if (!url || !url.trim()) return `${platformBase}/${fallbackUsername}`;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('@')) return `${platformBase}/${trimmed.slice(1)}`;
  return `${platformBase}/${trimmed}`;
};

export const getGmailUrl = (emailVal: string | undefined): string => {
  if (!emailVal || !emailVal.trim()) return 'mailto:contact.luckychoudhary@gmail.com';
  const trimmed = emailVal.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const clean = trimmed.replace(/^mailto:/, '');
  return `mailto:${clean}`;
};

export const useSocialLinksData = () => {
  const { profile } = usePortfolio();

  const githubUrl = formatSocialUrl(profile.github, 'https://github.com', 'luckychoudhary');
  const linkedinUrl = formatSocialUrl(profile.linkedin, 'https://linkedin.com/in', 'lucky-choudhary08292');
  const leetcodeUrl = formatSocialUrl(profile.leetcode, 'https://leetcode.com', 'luckychoudhary');
  const twitterUrl = formatSocialUrl(profile.twitter, 'https://twitter.com', 'luckychoudhary');
  const gmailUrl = getGmailUrl(profile.email);
  const displayEmail = (profile.email || 'contact.luckychoudhary@gmail.com').replace(/^mailto:/, '');

  return [
    {
      id: 'github',
      name: 'GitHub',
      displayValue: profile.github
        ? profile.github.replace(/^https?:\/\/(www\.)?github\.com\/?/, '@')
        : '@luckychoudhary',
      url: githubUrl,
      brandColor: '#24292e',
      hoverBg: 'hover:bg-[#24292e] hover:border-[#24292e] hover:shadow-[#24292e]/30',
      activeBorder: 'border-slate-800',
      badgeBg: 'bg-slate-900',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] fill-current" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      displayValue: profile.leetcode
        ? profile.leetcode.replace(/^https?:\/\/(www\.)?leetcode\.com\/?/, '')
        : 'luckychoudhary',
      url: leetcodeUrl,
      brandColor: '#ffa116',
      hoverBg: 'hover:bg-[#ffa116] hover:border-[#ffa116] hover:shadow-[#ffa116]/30',
      activeBorder: 'border-[#ffa116]',
      badgeBg: 'bg-[#ffa116]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] fill-current" aria-hidden="true">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
      ),
    },
    {
      id: 'gmail',
      name: 'Gmail',
      displayValue: displayEmail,
      url: gmailUrl,
      brandColor: '#ea4335',
      hoverBg: 'hover:bg-[#ea4335] hover:border-[#ea4335] hover:shadow-[#ea4335]/30',
      activeBorder: 'border-[#ea4335]',
      badgeBg: 'bg-[#ea4335]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] fill-current" aria-hidden="true">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
        </svg>
      ),
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      displayValue: profile.twitter
        ? profile.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\/?/, '@')
        : '@luckychoudhary',
      url: twitterUrl,
      brandColor: '#0f1419',
      hoverBg: 'hover:bg-black hover:border-black hover:shadow-black/30',
      activeBorder: 'border-black',
      badgeBg: 'bg-black',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] sm:w-[21px] sm:h-[21px] fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      displayValue: profile.linkedin
        ? profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\/?/, '')
        : 'lucky-choudhary',
      url: linkedinUrl,
      brandColor: '#0a66c2',
      hoverBg: 'hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:shadow-[#0a66c2]/30',
      activeBorder: 'border-[#0a66c2]',
      badgeBg: 'bg-[#0a66c2]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] fill-current" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
        </svg>
      ),
    },
  ];
};

/**
 * FloatingSocialOrbit:
 * Floats the 5 official logos (GitHub, LeetCode, Gmail, Twitter, LinkedIn)
 * directly on top and around the user's portrait/photo arch with organic bobbing physics.
 */
export const FloatingSocialOrbit: React.FC = () => {
  const items = useSocialLinksData();

  // Positions strictly placed in the blank space flanking the names and profile image (zero overlap with face or text)
  const orbitConfigs = [
    {
      id: 'github',
      // Upper-left blank space beside the names and top of portrait
      positionClass: '-top-6 xs:-top-8 sm:-top-12 -left-7 xs:-left-10 sm:-left-18 md:-left-24 lg:-left-32 xl:-left-40',
      floatAnim: {
        x: [0, -12, 6, -14, 4, 0],
        y: [0, -14, 8, -16, 6, 0],
        rotate: [0, -7, 5, -8, 4, 0],
        scale: [1, 1.05, 0.97, 1.04, 0.98, 1],
      },
      duration: 6.4,
      delay: 0,
      glowColor: 'rgba(36, 41, 46, 0.28)',
    },
    {
      id: 'leetcode',
      // Mid-left blank space beside the portrait arch
      positionClass: 'top-20 xs:top-24 sm:top-28 md:top-32 -left-8 xs:-left-12 sm:-left-20 md:-left-28 lg:-left-36 xl:-left-44',
      floatAnim: {
        x: [0, -10, 8, -12, 6, 0],
        y: [0, 12, -14, 8, -10, 0],
        rotate: [0, 8, -6, 7, -4, 0],
        scale: [1, 0.98, 1.06, 0.97, 1.03, 1],
      },
      duration: 7.2,
      delay: 0.5,
      glowColor: 'rgba(255, 161, 22, 0.38)',
    },
    {
      id: 'gmail',
      // Lower-left blank space beside the portrait arch
      positionClass: 'top-48 xs:top-56 sm:top-64 md:top-72 -left-7 xs:-left-10 sm:-left-18 md:-left-24 lg:-left-32 xl:-left-40',
      floatAnim: {
        x: [0, -14, 8, -12, 6, 0],
        y: [0, -14, 10, -18, 6, 0],
        rotate: [0, -6, 8, -5, 6, 0],
        scale: [1, 1.06, 0.97, 1.05, 0.98, 1],
      },
      duration: 5.8,
      delay: 1.0,
      glowColor: 'rgba(234, 67, 53, 0.38)',
    },
    {
      id: 'linkedin',
      // Upper-right blank space beside the names and top of portrait
      positionClass: '-top-6 xs:-top-8 sm:-top-12 -right-7 xs:-right-10 sm:-right-18 md:-right-24 lg:-right-32 xl:-right-40',
      floatAnim: {
        x: [0, 12, -6, 14, -4, 0],
        y: [0, -14, 8, -16, 6, 0],
        rotate: [0, 7, -5, 8, -4, 0],
        scale: [1, 0.97, 1.06, 0.98, 1.05, 1],
      },
      duration: 7.8,
      delay: 0.8,
      glowColor: 'rgba(10, 102, 194, 0.38)',
    },
    {
      id: 'twitter',
      // Mid-right blank space beside the portrait arch
      positionClass: 'top-24 xs:top-28 sm:top-36 md:top-40 -right-8 xs:-right-12 sm:-right-20 md:-right-28 lg:-right-36 xl:-right-44',
      floatAnim: {
        x: [0, 10, -8, 12, -6, 0],
        y: [0, 12, -14, 8, -10, 0],
        rotate: [0, -8, 6, -6, 7, 0],
        scale: [1, 1.05, 0.96, 1.06, 0.97, 1],
      },
      duration: 6.9,
      delay: 1.5,
      glowColor: 'rgba(15, 20, 25, 0.32)',
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-40 select-none">
      {items.map((item) => {
        const cfg = orbitConfigs.find((c) => c.id === item.id);
        if (!cfg) return null;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              x: cfg.floatAnim.x,
              y: cfg.floatAnim.y,
              rotate: cfg.floatAnim.rotate,
              scale: cfg.floatAnim.scale,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1 * cfg.delay },
              x: {
                duration: cfg.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: cfg.delay,
              },
              y: {
                duration: cfg.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: cfg.delay,
              },
              rotate: {
                duration: cfg.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: cfg.delay,
              },
              scale: {
                duration: cfg.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: cfg.delay,
              },
            }}
            className={`absolute ${cfg.positionClass} pointer-events-auto`}
          >
            <a
              href={item.url}
              target={item.id === 'gmail' && !item.url.startsWith('http') ? undefined : '_blank'}
              rel="noreferrer"
              title={`${item.name}: ${item.url}`}
              aria-label={`${item.name} profile`}
              className={`group relative w-11 h-11 xs:w-12 xs:h-12 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 flex items-center justify-center transition-all duration-300 ${item.hoverBg} hover:scale-115 active:scale-95 cursor-pointer`}
              style={{
                boxShadow: `0 10px 26px -4px ${cfg.glowColor}`,
              }}
            >
              {/* Pure Brand Logo Only */}
              <div className="text-slate-800 group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Hover Tooltip displaying live DB link / handle */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-semibold opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl z-50 flex items-center gap-1">
                <span className="text-orange-400 font-bold">{item.name}:</span>
                <span className="text-slate-200 max-w-[160px] truncate">{item.displayValue}</span>
              </span>
            </a>
          </motion.div>
        );
      })}
    </div>
  );
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'hero',
  className = '',
  showLabels = false,
}) => {
  const socialItems = useSocialLinksData();

  // Footer styling: Sleek dark badges matching the dark footer
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 flex-wrap ${className}`}>
        {socialItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target={item.id === 'gmail' && !item.url.startsWith('http') ? undefined : '_blank'}
            rel="noreferrer"
            title={`${item.name}: ${item.url}`}
            aria-label={`${item.name} profile`}
            className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center transition-all duration-200 ${item.hoverBg} hover:text-white hover:scale-110 active:scale-95 shadow-sm group`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    );
  }

  // Compact styling for popups or navigation
  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-xs ${className}`}
      >
        {socialItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target={item.id === 'gmail' && !item.url.startsWith('http') ? undefined : '_blank'}
            rel="noreferrer"
            title={`${item.name} (${item.url})`}
            aria-label={item.name}
            className={`w-8 h-8 rounded-full bg-white text-slate-700 flex items-center justify-center transition-all duration-200 ${item.hoverBg} hover:text-white shadow-xs hover:scale-105 active:scale-95 group`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    );
  }

  // Modal variant with labels
  if (variant === 'modal') {
    return (
      <div className={`flex items-center justify-center gap-2 sm:gap-3 flex-wrap ${className}`}>
        {socialItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target={item.id === 'gmail' && !item.url.startsWith('http') ? undefined : '_blank'}
            rel="noreferrer"
            title={`${item.name}: ${item.url}`}
            aria-label={item.name}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white ${item.hoverBg} text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs`}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    );
  }

  // Default 'hero' style: Elegant floating glassmorphic dock with tooltips
  return (
    <div
      className={`inline-flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg shadow-slate-200/60 ${className}`}
    >
      {socialItems.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target={item.id === 'gmail' && !item.url.startsWith('http') ? undefined : '_blank'}
          rel="noreferrer"
          title={`${item.name}: ${item.url}`}
          aria-label={item.name}
          className={`relative group w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center transition-all duration-300 ${item.hoverBg} hover:text-white hover:scale-110 hover:shadow-lg active:scale-95 cursor-pointer`}
        >
          {item.icon}

          {/* Interactive Tooltip on Hover with live link */}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-semibold opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl z-50 flex items-center gap-1.5">
            <span className="font-bold text-orange-400">{item.name}</span>
            <span className="text-slate-300 font-normal max-w-[150px] truncate">
              {item.displayValue}
            </span>
          </span>
        </a>
      ))}

      {showLabels && (
        <span className="text-xs font-medium text-slate-500 pl-1 pr-2 hidden sm:inline-block">
          Live links synced from database
        </span>
      )}
    </div>
  );
};
