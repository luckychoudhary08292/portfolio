import React from 'react';
import { GraduationCap, Briefcase, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { experiences } = usePortfolio();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap size={15} className="text-[#ff6422]" />;
      case 'leadership':
        return <Users size={15} className="text-[#ff6422]" />;
      case 'work':
      default:
        return <Briefcase size={15} className="text-slate-800" />;
    }
  };

  return (
    <section id="experience" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="w-full max-w-[96%] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Education & <span className="text-[#ff6422]">Experience</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            Academic milestones, software development internships, and developer community leadership.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Dotted Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 border-l-2 border-dashed border-slate-700/60 z-0" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16 relative z-10">
            {experiences.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-12"
              >
                {/* Left Column (Company & Period) */}
                <div className="pl-14 md:pl-0 md:w-1/2 md:text-right">
                  <div className="flex md:justify-end items-center gap-1.5 mb-1">
                    <span className="text-xs font-bold text-[#ff6422] uppercase tracking-wider">
                      {item.type || 'Academic / Work'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {item.company}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {item.period} • {item.location}
                  </p>
                </div>

                {/* Center Node Badge */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 shadow-sm transition-transform duration-300 hover:scale-110 ${
                      item.activeColor === 'orange' ? 'border-[#ff6422]' : 'border-slate-800'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        item.activeColor === 'orange' ? 'bg-[#ff6422]' : 'bg-slate-800'
                      }`}
                    />
                  </div>
                </div>

                {/* Right Column (Role & Description) */}
                <div className="pl-14 md:pl-0 md:w-1/2 md:text-left">
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {item.role}
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
