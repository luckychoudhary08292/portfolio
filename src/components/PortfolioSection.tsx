import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import {
  ArrowUpRight,
  FileText,
  Github,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

// High-fidelity fallback projects if database is empty or loading
const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'DevSync AI – Autonomous Code Intelligence',
    category: 'AI & Developer Tools',
    tag: 'Full-Stack / AI',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80',
    description:
      'Autonomous AI review agent scanning pull requests, predicting architectural regressions, and automating unit test generation.',
    techStack: ['Next.js 14', 'TypeScript', 'Gemini 2.5', 'Docker', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/lucky-choudhary/devsync-ai',
    liveUrl: 'https://devsync-ai.preview.app',
    role: 'Lead Architect',
    duration: '3 Months',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'CloudScale K8s – Multi-Region Mesh Orchestrator',
    category: 'Cloud & DevOps',
    tag: 'DevOps / Infra',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    description:
      'Zero-downtime traffic mesh balancer with real-time failover routing across 4 cloud regions with sub-25ms global latency.',
    techStack: ['Go', 'Kubernetes', 'Terraform', 'gRPC', 'Prometheus', 'Grafana'],
    githubUrl: 'https://github.com/lucky-choudhary/cloudscale-mesh',
    liveUrl: 'https://cloudscale.preview.app',
    role: 'DevOps Engineer',
    duration: '4 Months',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'FinFlow Core – Distributed Ledger Engine',
    category: 'Fintech & Systems',
    tag: 'Fintech',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80',
    description:
      'Double-entry high-throughput distributed transaction platform processing 10,000+ transfers per second with strict ACID safety.',
    techStack: ['Rust', 'Node.js', 'Redis Cluster', 'Kafka', 'PostgreSQL', 'AWS'],
    githubUrl: 'https://github.com/lucky-choudhary/finflow-engine',
    liveUrl: 'https://finflow.preview.app',
    role: 'Backend Architect',
    duration: '2.5 Months',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'NeuroVision Studio – Edge AI Diagnostics',
    category: 'Computer Vision',
    tag: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1507146426996-ef0538821e1b?auto=format&fit=crop&w=1400&q=80',
    description:
      'Real-time edge computer vision model suite optimizing neural inference on embedded devices for medical diagnostic scanning.',
    techStack: ['Python', 'PyTorch', 'ONNX Runtime', 'FastAPI', 'React', 'OpenCV'],
    githubUrl: 'https://github.com/lucky-choudhary/neurovision-edge',
    liveUrl: 'https://neurovision.preview.app',
    role: 'ML Engineer',
    duration: '3 Months',
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'PulseIoT – Real-Time Telemetry Platform',
    category: 'IoT & Streaming',
    tag: 'Distributed Systems',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    description:
      'Low-latency WebSocket event streaming broker ingesting telemetry from 50,000+ concurrent sensor devices in real-time.',
    techStack: ['TypeScript', 'Express', 'Apache Kafka', 'TimescaleDB', 'React', 'Tailwind'],
    githubUrl: 'https://github.com/lucky-choudhary/pulse-iot',
    liveUrl: 'https://pulse-iot.preview.app',
    role: 'Full-Stack Developer',
    duration: '2 Months',
    featured: true,
  },
];

interface PortfolioSectionProps {
  onOpenProjectDoc?: (project: ProjectItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenProjectDoc }) => {
  const { projects: liveProjects } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const lastScrollTime = useRef<number>(0);
  const carouselStageRef = useRef<HTMLDivElement>(null);

  // Use live database projects if available, otherwise use high-fidelity fallback projects
  const projects = useMemo(() => {
    return liveProjects && liveProjects.length > 0 ? liveProjects : FALLBACK_PROJECTS;
  }, [liveProjects]);

  const totalProjects = projects.length;

  const handleNext = useCallback(() => {
    if (totalProjects === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const handlePrev = useCallback(() => {
    if (totalProjects === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

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

  return (
    <section
      id="projects"
      className="pt-6 pb-12 sm:pt-10 sm:pb-16 bg-white border-y border-slate-100 relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Background ambient lighting for 3D stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] bg-gradient-to-r from-orange-400/10 via-amber-300/10 to-rose-400/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-[96%] xl:max-w-[97%] 2xl:max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Clean Section Title */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Featured Software <span className="text-[#ff6422]">Projects</span>
          </h2>
        </div>

        {/* ============================================================
            360° 3D COVERFLOW SHOWCASE (Hero Center & Two Side Behind)
            Hidden horizontal scroll / swipe / wheel navigation only
            ============================================================ */}
        <div
          ref={carouselStageRef}
          onWheel={handleWheel}
          className="relative w-full py-2 sm:py-4 select-none outline-hidden"
        >
          {/* 3D Perspective Stage */}
          <div
            className="relative w-full h-[320px] sm:h-[390px] md:h-[450px] lg:h-[490px] flex items-center justify-center overflow-visible"
            style={{
              perspective: '1300px',
              transformStyle: 'preserve-3d',
            }}
          >
            {totalProjects === 0 ? (
              <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 text-slate-500">
                No projects available.
              </div>
            ) : (
              projects.map((item, index) => {
                // Compute relative circular offset
                let offset = (index - currentIndex) % totalProjects;
                if (offset > totalProjects / 2) offset -= totalProjects;
                if (offset < -totalProjects / 2) offset += totalProjects;

                const isCenter = offset === 0;
                const isLeft = offset === -1 || (totalProjects === 2 && offset === 1 && currentIndex === 0);
                const isRight = offset === 1;

                // 3D positioning attributes matching Certificates
                let translateX = '0%';
                let translateZ = 0;
                let rotateY = 0;
                let scale = 1;
                let zIndex = 30;
                let opacity = 1;

                if (isCenter) {
                  translateX = '0%';
                  translateZ = 110;
                  rotateY = 0;
                  scale = 1;
                  zIndex = 40;
                  opacity = 1;
                } else if (isLeft) {
                  translateX = '-62%';
                  translateZ = -85;
                  rotateY = 22;
                  scale = 0.85;
                  zIndex = 20;
                  opacity = 0.88;
                } else if (isRight) {
                  translateX = '62%';
                  translateZ = -85;
                  rotateY = -22;
                  scale = 0.85;
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

                return (
                  <motion.div
                    key={item.id || item._id || index}
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
                        if (onOpenProjectDoc) {
                          onOpenProjectDoc(item);
                        }
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
                    className={`absolute w-[90vw] sm:w-[540px] md:w-[620px] lg:w-[690px] xl:w-[740px] max-w-[92vw] aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer bg-slate-950 transition-shadow duration-300 group ${
                      isCenter
                        ? 'shadow-[0_22px_55px_-15px_rgba(255,100,34,0.38),0_18px_38px_rgba(0,0,0,0.5)] border-2 border-white/25 ring-1 ring-[#ff6422]/50'
                        : 'shadow-[0_14px_32px_rgba(0,0,0,0.45)] border border-slate-700/60 hover:opacity-95'
                    }`}
                  >
                    {/* Project Image background */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                        }}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                          isCenter ? 'group-hover:scale-105' : ''
                        }`}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center p-6 text-center">
                        <Layers className="w-16 h-16 text-[#ff6422]/40 mb-2" />
                      </div>
                    )}

                    {/* Dark scrim overlay so typography and icons are ultra-crisp */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                    {/* TOP CORNER: Left = Category/Tag Badge; Right = Doc Logo + GitHub Logo + Arrow Logo */}
                    <div className="absolute top-0 inset-x-0 z-20 p-3.5 sm:p-5 flex items-center justify-between gap-2">
                      {/* Top Left: Category Badge */}
                      <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[#ff6422] font-bold text-xs border border-[#ff6422]/30 shadow-md tracking-wide uppercase">
                        {item.category || item.tag || 'Project'}
                      </span>

                      {/* Top Right: Doc Logo + GitHub Logo + Arrow Logo */}
                      <div className="flex items-center gap-2">
                        {/* 1. Doc Logo: Opens Dynamic Full Screen Documentation Page */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenProjectDoc) {
                              onOpenProjectDoc(item);
                            }
                          }}
                          title="View Project Details & Documentation"
                          aria-label={`View detailed documentation for ${item.title}`}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-white hover:bg-[#ff6422] hover:border-[#ff6422] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer group/doc"
                        >
                          <FileText size={17} className="text-slate-100 group-hover/doc:text-white transition-colors" />
                        </button>

                        {/* 2. GitHub Logo: Redirects to GitHub Repo */}
                        <a
                          href={item.githubUrl || 'https://github.com'}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="View GitHub Repository"
                          aria-label={`View GitHub repository for ${item.title}`}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-white hover:bg-[#ff6422] hover:border-[#ff6422] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer group/gh"
                        >
                          <Github size={17} className="text-slate-100 group-hover/gh:text-white transition-colors" />
                        </a>

                        {/* 3. Arrow Logo: Project Deployment Access */}
                        <a
                          href={item.liveUrl && item.liveUrl !== '#' ? item.liveUrl : (item.githubUrl || 'https://github.com')}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Access Live Deployment"
                          aria-label={`Access live deployment for ${item.title}`}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ff6422] backdrop-blur-md border border-[#ff6422] text-white hover:bg-[#ff7b42] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer group/arrow"
                        >
                          <ArrowUpRight size={19} className="transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>

                    {/* BOTTOM INFO: BIG Highlight Title + Small Description + Tech Stack Names */}
                    <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 md:p-7 bg-gradient-to-t from-black/95 via-black/85 to-transparent pt-12 pb-4 sm:pb-6 pointer-events-none flex flex-col justify-end">
                      {/* Big Highlight Title */}
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md group-hover:text-[#ff6422] transition-colors duration-200">
                        {item.title}
                      </h3>

                      {/* Small Description */}
                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 line-clamp-2 leading-relaxed drop-shadow-xs">
                          {item.description}
                        </p>
                      )}

                      {/* Tech Stack Names */}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5">
                          {item.techStack.slice(0, 4).map((tech: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white font-medium border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                          {item.techStack.length > 4 && (
                            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-[#ff6422]/90 backdrop-blur-md text-white font-semibold">
                              +{item.techStack.length - 4} more
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
    </section>
  );
};
