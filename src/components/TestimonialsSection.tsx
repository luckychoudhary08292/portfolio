import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-[#131417] text-white rounded-t-[36px] sm:rounded-t-[48px] rounded-b-[36px] sm:rounded-b-[48px] py-20 sm:py-28 overflow-hidden shadow-2xl my-6">
      {/* Background Amber/Orange Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Star Sparkles */}
      <div className="absolute top-16 left-12 text-white/40 select-none pointer-events-none text-2xl font-bold animate-pulse">
        ✦
      </div>
      <div className="absolute top-28 right-16 text-white/40 select-none pointer-events-none text-xl font-bold animate-pulse">
        ✦
      </div>

      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* Header with speech ticks and sparkles */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="relative inline-block mb-2">
            {/* Hand-drawn accent ticks */}
            <div className="absolute -top-3.5 right-0 flex items-center gap-1 pointer-events-none">
              <span className="w-1 h-3 bg-[#ff6422] rounded-full rotate-[15deg]" />
              <span className="w-1 h-3 bg-[#ff6422] rounded-full rotate-[35deg]" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Endorsements & <br />
              <span className="text-[#ff6422]">Recommendations</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl mx-auto"
          >
            Feedback and character references from engineering internship managers, computer science
            professors, and hackathon co-builders.
          </motion.p>
        </div>

        {/* Testimonials Carousel Track - stretches close to walls */}
        <div className="relative w-full max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {testimonials.map((item, idx) => {
              const isCenter = idx === currentIndex;
              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative rounded-3xl p-6 sm:p-8 backdrop-blur-md border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isCenter
                      ? 'bg-[#1e1f25] border-white/20 shadow-2xl scale-100 md:scale-105 z-20'
                      : 'bg-[#18191d]/80 border-white/5 opacity-80 md:opacity-60 hover:opacity-90 z-10'
                  }`}
                >
                  {/* Watermark Quote */}
                  <div className="absolute top-6 right-6 text-5xl sm:text-6xl font-serif text-white/10 select-none pointer-events-none leading-none">
                    “”
                  </div>

                  <div>
                    {/* Relationship Badge */}
                    <div className="inline-block px-3 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[11px] font-bold uppercase tracking-wider mb-4 border border-orange-500/20">
                      {item.relationship || 'Mentor Recommendation'}
                    </div>

                    {/* Author Meta */}
                    <div className="flex items-center gap-3.5 mb-4">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/30"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center text-sm border-2 border-orange-500/30">
                          {item.name ? item.name.slice(0, 2).toUpperCase() : 'EX'}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-white text-base tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">
                          {item.role}, {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1 text-[#ff6422]">
                        {[...Array(Math.round(item.rating || 5))].map((_, i) => (
                          <Star key={i} size={16} fill="#ff6422" stroke="none" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-white">{item.rating || 5}.0</span>
                    </div>

                    {/* Testimonial Quote Text */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      "{item.content}"
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff6422] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`transition-all duration-300 cursor-pointer ${
                      currentIndex === i
                        ? 'w-6 h-2 bg-[#ff6422] rounded-full'
                        : 'w-2 h-2 bg-white/30 rounded-full'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff6422] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
