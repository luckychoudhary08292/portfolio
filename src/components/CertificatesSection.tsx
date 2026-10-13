import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  X,
  Award,
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

  // 360 Carousel State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const lastScrollTime = useRef<number>(0);
  const carouselStageRef = useRef<HTMLDivElement>(null);

  // Use live database certificates if available, otherwise use high-fidelity fallback
  const certificates = useMemo(() => {
    return liveCertificates && liveCertificates.length > 0 ? liveCertificates : FALLBACK_CERTIFICATES;
  }, [liveCertificates]);

  const totalCerts = certificates.length;

  const handleNext = useCallback(() => {
    if (totalCerts === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalCerts);
  }, [totalCerts]);

  const handlePrev = useCallback(() => {
    if (totalCerts === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalCerts) % totalCerts);
  }, [totalCerts]);

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
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImageCert, handleNext, handlePrev]);

  return (
    <section id="certificates" className="py-20 sm:py-28 bg-[#fafbfc] border-y border-slate-100 relative overflow-hidden select-none">
      {/* Background ambient lighting for 3D stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] bg-gradient-to-r from-orange-400/10 via-amber-300/10 to-rose-400/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Clean Section Title (All extra badges and toggle buttons removed) */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Licenses & <span className="text-[#ff6422]">Certificates</span>
          </h2>
        </div>

        {/* ============================================================
            360° 3D COVERFLOW SHOWCASE (Hero Center & Two Side Behind)
            Hidden horizontal scroll / swipe / wheel navigation only
            ============================================================ */}
        <div
          ref={carouselStageRef}
          onWheel={handleWheel}
          className="relative w-full py-4 sm:py-8 select-none outline-hidden"
        >
          {/* 3D Perspective Stage */}
          <div
            className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] lg:h-[580px] flex items-center justify-center overflow-visible"
            style={{
              perspective: '1300px',
              transformStyle: 'preserve-3d',
            }}
          >
            {totalCerts === 0 ? (
              <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 text-slate-500">
                No certificates available.
              </div>
            ) : (
              certificates.map((cert, index) => {
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
                  translateZ = 120;
                  rotateY = 0;
                  scale = 1;
                  zIndex = 40;
                  opacity = 1;
                } else if (isLeft) {
                  translateX = '-62%';
                  translateZ = -90;
                  rotateY = 24;
                  scale = 0.84;
                  zIndex = 20;
                  opacity = 0.88;
                } else if (isRight) {
                  translateX = '62%';
                  translateZ = -90;
                  rotateY = -24;
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
                    className={`absolute w-[92vw] sm:w-[620px] md:w-[700px] lg:w-[780px] xl:w-[840px] max-w-[94vw] aspect-[16/10.5] rounded-3xl overflow-hidden cursor-pointer bg-slate-950 transition-shadow duration-300 ${
                      isCenter
                        ? 'shadow-[0_25px_60px_-15px_rgba(255,100,34,0.35),0_20px_40px_rgba(0,0,0,0.5)] border-2 border-white/25 ring-1 ring-[#ff6422]/50'
                        : 'shadow-[0_15px_35px_rgba(0,0,0,0.45)] border border-slate-700/60 hover:opacity-95'
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

                    {/* Scrim Overlay for high-contrast legible typography */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />

                    {/* Top Badges Overlaid Directly */}
                    <div className="absolute top-0 inset-x-0 z-10 p-4 sm:p-6 flex items-center justify-between pointer-events-none gap-2">
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
                    <div className="absolute bottom-0 inset-x-0 z-20 p-5 sm:p-7 md:p-8 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-14 pb-5 sm:pb-7 pointer-events-none flex flex-col justify-end">
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                        {cert.title}
                      </h3>

                      {cert.credentialId && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-amber-300 font-semibold bg-black/70 px-2.5 py-1 rounded-md border border-amber-400/30 backdrop-blur-xs shadow-xs">
                            <span className="text-slate-300 font-normal">Credential ID:</span> {cert.credentialId}
                          </span>
                        </div>
                      )}

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {cert.skills.slice(0, 4).map((skill: string, sIdx: number) => (
                            <span
                              key={sIdx}
                              className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white font-medium border border-white/10"
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 4 && (
                            <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded-md bg-[#ff6422]/90 backdrop-blur-md text-white font-semibold">
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
      </div>

      {/* ============================================================
          TRUE FULL DESKTOP SCREEN CERTIFICATE VIEWER
          - Opens normally as full desktop screen (not a small popup box)
          - Prominent Cross button to return to screen
          ============================================================ */}
      <AnimatePresence>
        {fullscreenImageCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFullscreenImageCert(null)}
            className="fixed inset-0 z-[100] bg-black/95 sm:bg-black/98 flex flex-col items-center justify-center p-2 sm:p-4 select-none backdrop-blur-md"
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
