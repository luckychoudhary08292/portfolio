import React, { useState } from 'react';
import {
  ArrowUpRight,
  Send,
  Github,
  Linkedin,
  Code2,
  Twitter,
  Mail,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterSectionProps {
  onOpenHireModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenHireModal }) => {
  const { profile, submitSubscriber } = usePortfolio();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      await submitSubscriber(newsletterEmail.trim(), 'footer_newsletter');
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      className="bg-[#131417] text-white rounded-t-[36px] sm:rounded-t-[48px] pt-16 sm:pt-24 pb-12 overflow-hidden shadow-2xl relative"
    >
      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Top Banner Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              Lets Connect there
            </h2>
            <p className="text-sm text-gray-400">
              Actively interviewing for Software Engineering Internships & New Grad roles.
            </p>
          </div>

          <button
            onClick={onOpenHireModal}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-8 py-3.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-14 border-b border-white/10">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#ff6422] flex items-center justify-center text-white font-bold text-xs tracking-tighter">
                  {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'LC'}
                </div>
                <span className="font-extrabold text-xl tracking-wider text-white uppercase">
                  {profile.name || 'PORTFOLIO'}
                </span>
              </div>

              {/* Bio Paragraph */}
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
                {profile.whyHireMeBio}
              </p>
            </div>

            {/* Social Icons (GitHub, LinkedIn, LeetCode, Twitter, Email) */}
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ff6422] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ff6422] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={profile.leetcode}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ff6422] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LeetCode"
              >
                <Code2 size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ff6422] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ff6422] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-[#ff6422] font-bold text-sm tracking-wide uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Me
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('skills')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Technical Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('projects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('certificates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Certificates
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('experience')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Education & Exp
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-[#ff6422] font-bold text-sm tracking-wide uppercase mb-4">
              Contact & Links
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-gray-400 hover:text-white transition-colors truncate max-w-full"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors truncate max-w-full"
                >
                  {profile.github ? profile.github.replace(/^https?:\/\//, '') : 'github.com'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors truncate max-w-full"
                >
                  {profile.linkedin ? profile.linkedin.replace(/^https?:\/\//, '') : 'linkedin.com'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors truncate max-w-full"
                >
                  {profile.leetcode ? profile.leetcode.replace(/^https?:\/\//, '') : 'leetcode.com'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Recruiter Updates (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-[#ff6422] font-bold text-sm tracking-wide uppercase mb-4">
              Stay in Touch
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Drop your email to receive project updates, technical blogs, and resume copy.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <div className="flex items-center bg-white rounded-full p-1 pl-4 shadow-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Recruiter / Work Email"
                  required
                  className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none pr-2"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-10 h-10 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-90 cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </div>

              {subscribed && (
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 size={14} />
                  <span>Email received successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>Copyright© 2026 {profile.name || 'Developer'}. All Rights Reserved.</div>
          <div className="flex items-center gap-2">
            <span>Built with React 19, TypeScript, Express & MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
