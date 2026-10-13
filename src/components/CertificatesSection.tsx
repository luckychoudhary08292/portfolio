import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  X,
  Award,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificateItem } from '../data/portfolioData';

// High-fidelity fallback certificates if database is empty or still loading
const FALLBACK_CERTIFICATES: CertificateItem[] = [
  {
    id: '1',
    title: 'Meta Certified Front-End Developer Specialization',
    issuer: 'Meta / Coursera',
    issueDate: 'Aug 2024',
    category: 'Web Development',
    credentialId: 'META-FED-884920',
    verifyUrl: 'https://coursera.org/verify/professional-cert/META-FED',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80',
    skills: ['React', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'UI/UX Design', 'Version Control'],
  },
  {
    id: '2',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issueDate: 'Jan 2024',
    category: 'Cloud & DevOps',
    credentialId: 'AWS-SAA-901823',
    verifyUrl: 'https://aws.amazon.com/verification',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    skills: ['AWS Cloud', 'Serverless Architecture', 'S3 & EC2', 'VPC & IAM', 'Cloud Security'],
  },
  {
    id: '3',
    title: 'Google Professional Machine Learning Engineer',
    issuer: 'Google Cloud Platform',
    issueDate: 'Nov 2023',
    category: 'AI & Machine Learning',
    credentialId: 'GCP-MLE-449102',
    verifyUrl: 'https://google.accredible.com/verify',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80',
    skills: ['Vertex AI', 'TensorFlow', 'Python ML', 'Model Deployment', 'Data Engineering'],
  },
  {
    id: '4',
    title: 'Full Stack Open – Deep Dive into Modern Web Development',
    issuer: 'University of Helsinki',
    issueDate: 'Jun 2023',
    category: 'Web Development',
    credentialId: 'FSO-HELSINKI-7721',
    verifyUrl: 'https://fullstackopen.com/en/stats',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
    skills: ['Node.js', 'Express', 'React', 'MongoDB', 'GraphQL', 'TypeScript', 'CI/CD'],
  },
  {
    id: '5',
    title: 'Professional Scrum Master™ I (PSM I)',
    issuer: 'Scrum.org',
    issueDate: 'Mar 2023',
    category: 'Cybersecurity & Methods',
    credentialId: 'PSM-991204',
    verifyUrl: 'https://scrum.org/certificates',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    skills: ['Agile Leadership', 'Scrum Framework', 'Sprint Planning', 'Team Facilitation'],
  },
  {
    id: '6',
    title: 'Python for Data Science and Machine Learning Bootcamp',
    issuer: 'Udemy / Jose Portilla',
    issueDate: 'Oct 2022',
    category: 'Data Science & Analytics',
    credentialId: 'UC-DATA-55018',
    verifyUrl: 'https://udemy.com/certificate/UC-DATA',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Data Visualization', 'Seaborn'],
  },
];

export const CertificatesSection: React.FC = () => {
  const { certificates: liveCertificates } = usePortfolio();
  const [fullscreenImageCert, setFullscreenImageCert] = useState<CertificateItem | null>(null);

  // Filter States: Default 360 view, default category 'All', default auto-sweep ON
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'360' | 'grid'>('360');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAutoSweep, setIsAutoSweep] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // 360 Carousel State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const lastScrollTime = useRef<number>(0);
  const carouselStageRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Use live database certificates if available, otherwise use high-fidelity fallback
  const rawCertificates = useMemo(() => {
    return liveCertificates && liveCertificates.length > 0 ? liveCertificates : FALLBACK_CERTIFICATES;
  }, [liveCertificates]);

  // Compute all database categories dynamically with item counts
  const categoriesList = useMemo(() => {
    const counts: Record<string, number> = { All: rawCertificates.length };
    rawCertificates.forEach((c) => {
      const cat = c.category && c.category.trim() ? c.category.trim() : 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const list: { name: string; count: number }[] = [{ name: 'All', count: rawCertificates.length }];
    Object.keys(counts).forEach((cat) => {
      if (cat !== 'All') {
        list.push({ name: cat, count: counts[cat] });
      }
    });
    return list;
  }, [rawCertificates]);

  // Filter certificates based on selected category
  const filteredCertificates = useMemo(() => {
    if (selectedCategory === 'All') return rawCertificates;
    return rawCertificates.filter((c) => {
      const cat = c.category && c.category.trim() ? c.category.trim() : 'General';
      return cat === selectedCategory;
    });
  }, [rawCertificates, selectedCategory]);

  const totalCerts = filteredCertificates.length;

  // Circular navigation helpers
  const handleNext = useCallback(() => {
    if (totalCerts === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalCerts);
  }, [totalCerts]);

  const handlePrev = useCallback(() => {
    if (totalCerts === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalCerts) % totalCerts);
  }, [totalCerts]);

  // Auto-sweep effect: Default ON, automatically advances 360 stage every 3.8s when not hovered
  useEffect(() => {
    if (!isAutoSweep || viewMode !== '360' || fullscreenImageCert || isHovered || totalCerts <= 1) {
      return;
    }
    const timer = setInterval(() => {
      handleNext();
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoSweep, viewMode, fullscreenImageCert, isHovered, totalCerts, handleNext]);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  // Smooth wheel & touchpad horizontal scroll handler with rate throttling
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 280) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 25) {
        lastScrollTime.current = now;
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    },
    [handleNext, handlePrev]
  );

  // Global keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenImageCert) {
        if (e.key === 'Escape') setFullscreenImageCert(null);
        return;
      }
      if (e.key === 'Escape' && isFilterOpen) {
        setIsFilterOpen(false);
        return;
      }
      if (viewMode === '360') {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImageCert, isFilterOpen, viewMode, handleNext, handlePrev]);

  return (
    <section
      id="certificates"
      className="pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#fafbfc] border-y border-slate-100 relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Background ambient lighting for 3D stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] bg-gradient-to-r from-orange-400/10 via-amber-300/10 to-rose-400/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Section Header with Title & Filter Button at Right Side Corner */}
        <div className="relative flex items-center justify-between mb-4 sm:mb-6">
          {/* Spacer to keep title centered */}
          <div className="w-12 sm:w-28 hidden sm:block" />

          {/* Centered Title */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 text-center flex-1">
            Licenses & <span className="text-[#ff6422]">Certificates</span>
          </h2>

          {/* Filter Button at Right Side Corner */}
          <div className="relative shrink-0" ref={filterDropdownRef}>
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              aria-label="Filter certificates"
              aria-expanded={isFilterOpen}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs border select-none ${
                isFilterOpen || selectedCategory !== 'All' || viewMode !== '360' || !isAutoSweep
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-500/30'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal size={15} className={isFilterOpen ? 'text-[#ff6422]' : 'text-slate-600'} />
              <span>Filter</span>
              {(selectedCategory !== 'All' || viewMode !== '360') && (
                <span className="w-2 h-2 rounded-full bg-[#ff6422]" />
              )}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180 text-orange-400' : ''}`}
              />
            </button>

            {/* Filter Dropdown Popover */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 top-full mt-2 w-[300px] sm:w-[340px] bg-white/98 backdrop-blur-xl border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-2xl z-50 text-left"
                >
                  {/* Header Row of Filter Popover */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Certificate Controls
                    </span>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* 1. Display Mode Toggle: Default 360° Rotation vs Grid */}
                  <div className="mb-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                      Display Mode
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl">
                      <button
                        onClick={() => setViewMode('360')}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          viewMode === '360'
                            ? 'bg-[#ff6422] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Sparkles size={13} />
                        <span>360° Rotation</span>
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          viewMode === 'grid'
                            ? 'bg-[#ff6422] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <LayoutGrid size={13} />
                        <span>Grid View</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Auto-Sweep (Rotation): Default ON, Toggleable to OFF */}
                  <div className="mb-4 flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-150">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Auto-Sweep (Rotation)</span>
                      <span className="text-[11px] text-slate-400 block">
                        {isAutoSweep ? 'Auto sweeps every ~4s' : 'Off (Manual scroll only)'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAutoSweep((prev) => !prev)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isAutoSweep ? 'bg-[#ff6422]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          isAutoSweep ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* 3. Categories Selection: Default All, Lists All DB Categories */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Category Suggestion
                      </label>
                      {selectedCategory !== 'All' && (
                        <button
                          onClick={() => {
                            setSelectedCategory('All');
                            setCurrentIndex(0);
                          }}
                          className="text-[11px] text-[#ff6422] hover:underline font-semibold cursor-pointer"
                        >
                          Reset to All
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-[170px] overflow-y-auto pr-1">
                      {categoriesList.map((cat) => {
                        const isSelected = selectedCategory === cat.name;
                        return (
                          <button
                            key={cat.name}
                            onClick={() => {
                              setSelectedCategory(cat.name);
                              setCurrentIndex(0);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            <span>{cat.name}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                              }`}
                            >
                              {cat.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ============================================================
            VIEW MODE 1: 360° 3D COVERFLOW SHOWCASE (Default)
            ============================================================ */}
        {viewMode === '360' && (
          <div
            ref={carouselStageRef}
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full py-2 sm:py-4 select-none outline-hidden"
          >
            {/* 3D Perspective Stage */}
            <div
              className="relative w-full h-[290px] sm:h-[350px] md:h-[400px] lg:h-[440px] flex items-center justify-center overflow-visible"
              style={{
                perspective: '1300px',
                transformStyle: 'preserve-3d',
              }}
            >
              {totalCerts === 0 ? (
                <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 text-slate-500">
                  No certificates available in this category.
                </div>
              ) : (
                filteredCertificates.map((cert, index) => {
                  // Compute relative circular offset
                  let offset = (index - currentIndex) % totalCerts;
                  if (offset > totalCerts / 2) offset -= totalCerts;
                  if (offset < -totalCerts / 2) offset += totalCerts;

                  const isCenter = offset === 0;
                  const isLeft = offset === -1 || (totalCerts === 2 && offset === 1 && currentIndex === 0);
                  const isRight = offset === 1;

                  // 3D positioning attributes
                  let translateX = '0%';
                  let translateZ = 0;
                  let rotateY = 0;
                  let scale = 1;
                  let zIndex = 30;
                  let opacity = 1;

                  if (isCenter) {
                    translateX = '0%';
                    translateZ = 100;
                    rotateY = 0;
                    scale = 1;
                    zIndex = 40;
                    opacity = 1;
                  } else if (isLeft) {
                    translateX = '-60%';
                    translateZ = -80;
                    rotateY = 22;
                    scale = 0.84;
                    zIndex = 20;
                    opacity = 0.88;
                  } else if (isRight) {
                    translateX = '60%';
                    translateZ = -80;
                    rotateY = -22;
                    scale = 0.84;
                    zIndex = 20;
                    opacity = 0.88;
                  } else {
                    translateX = offset > 0 ? '110%' : '-110%';
                    translateZ = -260;
                    rotateY = offset > 0 ? -38 : 38;
                    scale = 0.65;
                    zIndex = 10;
                    opacity = 0;
                  }

                  const categoryName = cert.category || 'General';

                  return (
                    <motion.div
                      key={cert.id || index}
                      initial={false}
                      animate={{
                        x: translateX,
                        z: translateZ,
                        rotateY: rotateY,
                        scale: scale,
                        opacity: opacity,
                        zIndex: zIndex,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 30,
                        mass: 0.85,
                      }}
                      onClick={() => {
                        if (isCenter) {
                          setFullscreenImageCert(cert);
                        } else if (isLeft) {
                          handlePrev();
                        } else if (isRight) {
                          handleNext();
                        }
                      }}
                      drag={isCenter ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_e, info) => {
                        if (info.offset.x > 50 || info.velocity.x > 250) {
                          handlePrev();
                        } else if (info.offset.x < -50 || info.velocity.x < -250) {
                          handleNext();
                        }
                      }}
                      className={`absolute w-[88vw] sm:w-[480px] md:w-[540px] lg:w-[600px] xl:w-[650px] max-w-[90vw] aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer bg-slate-950 transition-shadow duration-300 ${
                        isCenter
                          ? 'shadow-[0_20px_50px_-15px_rgba(255,100,34,0.35),0_15px_35px_rgba(0,0,0,0.5)] border-2 border-white/25 ring-1 ring-[#ff6422]/50'
                          : 'shadow-[0_12px_30px_rgba(0,0,0,0.45)] border border-slate-700/60 hover:opacity-95'
                      }`}
                    >
                      {/* Image background */}
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                            isCenter ? 'hover:scale-105' : ''
                          }`}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center p-6 text-center">
                          <Award className="w-16 h-16 text-[#ff6422]/40 mb-2" />
                        </div>
                      )}

                      {/* Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />

                      {/* Top Badges Overlaid Directly */}
                      <div className="absolute top-0 inset-x-0 z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-none gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/20 shadow-md">
                            {cert.issuer}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#ff6422]/90 backdrop-blur-md text-white font-semibold text-xs border border-[#ff6422]/40 shadow-xs">
                            {categoryName}
                          </span>
                        </div>

                        {cert.issueDate && (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-emerald-400 font-medium text-xs sm:text-sm border border-emerald-500/20 shadow-xs">
                            <CheckCircle2 size={13} className="text-emerald-400" />
                            <span>{cert.issueDate}</span>
                          </span>
                        )}
                      </div>

                      {/* Bottom Info: Name and Credential clearly shown at bottom of image */}
                      <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-12 pb-4 sm:pb-6 pointer-events-none flex flex-col justify-end">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight drop-shadow-md">
                          {cert.title}
                        </h3>

                        {cert.credentialId && (
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold bg-black/70 px-2.5 py-0.5 rounded-md border border-amber-400/30 backdrop-blur-xs shadow-xs">
                              <span className="text-slate-300 font-normal">Credential ID:</span> {cert.credentialId}
                            </span>
                          </div>
                        )}

                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {cert.skills.slice(0, 4).map((skill: string, sIdx: number) => (
                              <span
                                key={sIdx}
                                className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white font-medium border border-white/10"
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 4 && (
                              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-[#ff6422]/90 backdrop-blur-md text-white font-semibold">
                                +{cert.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ============================================================
            VIEW MODE 2: GRID VIEW (Selectable from Filter Popover)
            ============================================================ */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 pb-6">
            {filteredCertificates.map((cert, idx) => {
              const categoryName = cert.category || 'General';
              return (
                <motion.div
                  key={cert.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setFullscreenImageCert(cert)}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer bg-slate-950 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group"
                >
                  {/* Image background */}
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-6 text-center">
                      <Award className="w-12 h-12 text-[#ff6422]/40 mb-2" />
                    </div>
                  )}

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-0 inset-x-0 z-10 p-4 flex items-center justify-between pointer-events-none gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-bold text-xs border border-white/20 shadow-md">
                      {cert.issuer}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff6422]/90 backdrop-blur-md text-white font-semibold text-xs">
                      {categoryName}
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 inset-x-0 z-20 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-10 pb-5 pointer-events-none flex flex-col justify-end">
                    <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight drop-shadow-md group-hover:text-orange-400 transition-colors">
                      {cert.title}
                    </h3>

                    {cert.credentialId && (
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[11px] font-mono text-amber-300 font-semibold bg-black/70 px-2 py-0.5 rounded-md border border-amber-400/30">
                          ID: {cert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================
          TRUE FULL DESKTOP SCREEN CERTIFICATE VIEWER
          - Opens normally as full desktop screen (not a small popup box)
          - Prominent Cross button to return to screen
          - Clicking blank space backdrop closes it
          ============================================================ */}
      <AnimatePresence>
        {fullscreenImageCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFullscreenImageCert(null)}
            className="fixed inset-0 z-[100] bg-black/95 sm:bg-black/98 flex flex-col items-center justify-center p-2 sm:p-4 select-none backdrop-blur-md cursor-pointer"
          >
            {/* Prominent High-Contrast Cross / Close Button in Top Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImageCert(null);
              }}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-[#ff6422] text-white flex items-center justify-center border border-white/30 transition-all duration-200 cursor-pointer backdrop-blur-md shadow-2xl active:scale-95 group"
              aria-label="Close full screen certificate"
            >
              <X size={26} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Full Screen Certificate Image Display - clicking blank space closes the viewer */}
            <div
              className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 cursor-pointer"
              onClick={() => setFullscreenImageCert(null)}
            >
              {fullscreenImageCert.image ? (
                <img
                  src={fullscreenImageCert.image}
                  alt={fullscreenImageCert.title}
                  onClick={(e) => e.stopPropagation()}
                  className="w-auto h-auto max-w-[96vw] max-h-[92vh] object-contain rounded-lg shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-white/10 cursor-default"
                />
              ) : (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-[85vw] max-w-4xl aspect-[16/10] bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-white cursor-default"
                >
                  <Award className="w-20 h-20 text-[#ff6422] mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-bold">{fullscreenImageCert.title}</h2>
                  <p className="text-slate-400 mt-2">{fullscreenImageCert.issuer}</p>
                </div>
              )}

              {/* Floating Bottom Bar: Full Name & Credential Information */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="fixed bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[110] bg-black/80 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-center shadow-2xl max-w-2xl cursor-default"
              >
                <p className="text-sm sm:text-base font-bold text-white truncate">
                  {fullscreenImageCert.title}
                </p>
                <div className="flex items-center justify-center gap-2 mt-0.5 text-xs text-slate-300">
                  <span className="text-[#ff6422] font-semibold">{fullscreenImageCert.issuer}</span>
                  {fullscreenImageCert.credentialId && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-amber-300 font-semibold">
                        ID: {fullscreenImageCert.credentialId}
                      </span>
                    </>
                  )}
                  {fullscreenImageCert.issueDate && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">
                        {fullscreenImageCert.issueDate}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
