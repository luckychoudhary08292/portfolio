import React, { useState } from 'react';
import { Mail, Star, Trophy, ShieldCheck, CheckCircle2, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const DiscussionBanner: React.FC = () => {
  const { submitSubscriber } = usePortfolio();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      await submitSubscriber(email.trim(), 'recruiter_banner');
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  const tickerItems = [
    'Data Structures & Algorithms',
    'Full-Stack TypeScript',
    'React 19 & Next.js',
    'Node.js & Express',
    'System Design',
    'MongoDB & PostgreSQL',
    'Docker & Cloud Run',
    'Microservices Architecture',
    'Redis Caching',
    'Git & CI/CD',
  ];

  return (
    <section className="pt-20 sm:pt-28 pb-12 bg-white relative overflow-hidden">
      <div className="w-full max-w-[96%] xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-8 text-center mb-16 sm:mb-20">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-8"
        >
          Looking for an Ambitious <br />
          Engineer? <span className="text-[#ff6422]">Let's Connect</span>
        </motion.h2>

        {/* Capsule Input Bar */}
        <motion.form
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative rounded-full border border-slate-300/80 bg-white shadow-md p-1.5 pl-3 sm:pl-4 flex items-center justify-between gap-2 focus-within:border-[#ff6422] transition-colors">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#ff6422] shrink-0">
                <Mail size={16} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Recruiter / Hiring Email"
                required
                className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-semibold text-sm transition-all shadow-md shadow-orange-500/20 shrink-0 cursor-pointer"
            >
              Connect
            </button>
          </div>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-600 font-semibold bg-emerald-50 px-4 py-1.5 rounded-full"
            >
              <CheckCircle2 size={16} />
              <span>Thank you! Lucky will review and send his resume & contact details.</span>
            </motion.div>
          )}
        </motion.form>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-[#ff6422] fill-[#ff6422]" />
            <span>450+ LeetCode Solved</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Trophy size={16} className="text-slate-800" />
            <span>National Hackathon Winner</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-slate-800" />
            <span>Available for Internships & Full-Time</span>
          </div>
        </div>
      </div>

      {/* Angled Dual Marquee Ticker Tape */}
      <div className="relative w-full py-8 overflow-hidden select-none">
        {/* Angled Orange Ribbon Background */}
        <div className="w-[110%] -ml-[5%] bg-[#ff6422] py-4 transform -rotate-1 shadow-lg overflow-hidden flex items-center">
          <div className="flex gap-8 whitespace-nowrap animate-marquee">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 text-white font-bold text-lg sm:text-xl tracking-wide">
                <span>{item}</span>
                <span className="text-white/80 text-xl font-normal">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Angled White Ribbon */}
        <div className="w-[110%] -ml-[5%] bg-white border-y border-slate-200 py-3.5 transform rotate-1 -mt-5 shadow-md overflow-hidden flex items-center">
          <div className="flex gap-8 whitespace-nowrap animate-marquee-reverse">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 text-slate-900 font-extrabold text-lg sm:text-2xl tracking-tight">
                <span>{item}</span>
                <span className="text-[#ff6422] text-xl font-normal">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
