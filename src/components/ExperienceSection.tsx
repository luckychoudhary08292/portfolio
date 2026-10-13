import React, { useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExperienceItem } from '../data/portfolioData';

// Palette of vibrant milestone colors exactly matching the reference graphic
const MILESTONE_COLORS = [
  { border: '#84cc16', text: '#65a30d', bg: 'rgba(132, 204, 22, 0.12)', glow: 'rgba(132, 204, 22, 0.35)' }, // 1: Lime Green
  { border: '#10b981', text: '#059669', bg: 'rgba(16, 185, 129, 0.12)', glow: 'rgba(16, 185, 129, 0.35)' }, // 2: Mint/Teal
  { border: '#06b6d4', text: '#0891b2', bg: 'rgba(6, 182, 212, 0.12)', glow: 'rgba(6, 182, 212, 0.35)' },  // 3: Cyan
  { border: '#0ea5e9', text: '#0284c7', bg: 'rgba(14, 165, 233, 0.12)', glow: 'rgba(14, 165, 233, 0.35)' }, // 4: Sky Blue
  { border: '#3b82f6', text: '#2563eb', bg: 'rgba(59, 130, 246, 0.12)', glow: 'rgba(59, 130, 246, 0.35)' }, // 5: Blue
  { border: '#2563eb', text: '#1d4ed8', bg: 'rgba(37, 99, 235, 0.12)', glow: 'rgba(37, 99, 235, 0.35)' },  // 6: Deep Blue
  { border: '#6366f1', text: '#4f46e5', bg: 'rgba(99, 102, 241, 0.12)', glow: 'rgba(99, 102, 241, 0.35)' }, // 7: Indigo
  { border: '#8b5cf6', text: '#7c3aed', bg: 'rgba(139, 92, 246, 0.12)', glow: 'rgba(139, 92, 246, 0.35)' }, // 8: Purple
  { border: '#a855f7', text: '#9333ea', bg: 'rgba(168, 85, 247, 0.12)', glow: 'rgba(168, 85, 247, 0.35)' }, // 9: Violet
  { border: '#d946ef', text: '#c026d3', bg: 'rgba(217, 70, 239, 0.12)', glow: 'rgba(217, 70, 239, 0.35)' }, // 10: Magenta
  { border: '#f43f5e', text: '#e11d48', bg: 'rgba(244, 63, 94, 0.12)', glow: 'rgba(244, 63, 94, 0.35)' },   // 11: Rose
  { border: '#ff6422', text: '#ea580c', bg: 'rgba(255, 100, 34, 0.12)', glow: 'rgba(255, 100, 34, 0.35)' }, // 12: Orange
];

// High-fidelity fallback milestone data strictly conforming to title, subtitle, date, place, order
const FALLBACK_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'B.Tech Computer Science & Engineering',
    subtitle: 'Arya College of Engineering & IT',
    date: '2021 – 2025',
    place: 'Jaipur, Rajasthan',
    order: 1,
    role: 'B.Tech Computer Science & Engineering',
    company: 'Arya College of Engineering & IT',
    period: '2021 – 2025',
    location: 'Jaipur, Rajasthan',
    description: 'Foundations of Algorithms, Distributed Systems, Cloud Architecture, and Core Web Technologies with 8.8+ GPA.',
    type: 'education',
  },
  {
    id: 'exp-2',
    title: 'Technical Lead & Web Dev Mentor',
    subtitle: 'Google Developer Student Clubs (GDSC)',
    date: '2022 – 2023',
    place: 'Campus Chapter, Jaipur',
    order: 2,
    role: 'Technical Lead & Web Dev Mentor',
    company: 'Google Developer Student Clubs (GDSC)',
    period: '2022 – 2023',
    location: 'Campus Chapter, Jaipur',
    description: 'Led technical bootcamps on React, TypeScript, and open-source workflows for 400+ student developers.',
    type: 'leadership',
  },
  {
    id: 'exp-3',
    title: 'Frontend Engineering Intern',
    subtitle: 'InnovateX Labs',
    date: 'June 2023 – Aug 2023',
    place: 'Bengaluru / Remote',
    order: 3,
    role: 'Frontend Engineering Intern',
    company: 'InnovateX Labs',
    period: 'June 2023 – Aug 2023',
    location: 'Bengaluru / Remote',
    description: 'Built high-throughput telemetry interfaces in Next.js & Tailwind CSS, cutting render latency by 35%.',
    type: 'work',
  },
  {
    id: 'exp-4',
    title: 'Software Engineer Intern',
    subtitle: 'CloudForge Systems',
    date: 'Jan 2024 – June 2024',
    place: 'Gurugram, India',
    order: 4,
    role: 'Software Engineer Intern',
    company: 'CloudForge Systems',
    period: 'Jan 2024 – June 2024',
    location: 'Gurugram, India',
    description: 'Engineered Node.js microservices, Dockerized backend workflows, and established automated CI/CD pipelines.',
    type: 'work',
  },
  {
    id: 'exp-5',
    title: 'Full-Stack Software Engineer',
    subtitle: 'Next-Gen SWE Career (Till Now)',
    date: '2024 – Present',
    place: 'Open to Global Opportunities',
    order: 5,
    role: 'Full-Stack Software Engineer',
    company: 'Next-Gen SWE Career (Till Now)',
    period: '2024 – Present',
    location: 'Open to Global Opportunities',
    description: 'Architecting scalable cloud applications, full-stack AI platforms, and active open-source contributions.',
    type: 'work',
  },
];

export const ExperienceSection: React.FC = () => {
  const { experiences: liveExperiences } = usePortfolio();

  const rawExperiences = useMemo(() => {
    return liveExperiences && liveExperiences.length > 0 ? liveExperiences : FALLBACK_EXPERIENCES;
  }, [liveExperiences]);

  const experiences = useMemo(() => {
    return [...rawExperiences].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [rawExperiences]);

  // Highway Geometry Constants (Single Continuous SVG Coordinate Plane)
  const VIEW_LEFT = -40;
  const VIEW_WIDTH = 980; // from -40 to 940
  const LEFT_X = 110;
  const RIGHT_X = 790;
  const PITCH = 280; // Vertical distance between rows (giving 230px clear space for cards)
  const START_Y = 85;

  const totalItems = experiences.length;
  const totalRows = Math.max(1, Math.ceil(totalItems / 2));
  const totalHeight = START_Y + (totalRows - 1) * PITCH + 250;

  // Generate Single Continuous Unbroken Vector Road Path
  const { roadPath, outerDottedPaths, directionChevrons, finishPos } = useMemo(() => {
    const rRadius = PITCH / 2; // 140px semicircle radius
    let d = `M 45 ${START_Y} L ${RIGHT_X} ${START_Y}`;
    const dottedPaths: string[] = [];
    const chevrons: { x: number; y: number; dir: 'R' | 'L' }[] = [];

    chevrons.push({ x: 450, y: START_Y, dir: 'R' });

    for (let r = 0; r < totalRows - 1; r++) {
      const curY = START_Y + r * PITCH;
      const nextY = curY + PITCH;

      if (r % 2 === 0) {
        // Even row: Left -> Right. Turn on the right side downwards (Clockwise: sweep=1)
        d += ` A ${rRadius} ${rRadius} 0 0 1 ${RIGHT_X} ${nextY}`;
        d += ` L ${LEFT_X} ${nextY}`;

        // Outer dotted decorative arc on right
        dottedPaths.push(`M ${RIGHT_X} ${curY - 24} A ${rRadius + 24} ${rRadius + 24} 0 0 1 ${RIGHT_X} ${nextY + 24}`);
        chevrons.push({ x: 450, y: nextY, dir: 'L' });
      } else {
        // Odd row: Right -> Left. Turn on the left side downwards (Counter-Clockwise: sweep=0)
        d += ` A ${rRadius} ${rRadius} 0 0 0 ${LEFT_X} ${nextY}`;
        d += ` L ${RIGHT_X} ${nextY}`;

        // Outer dotted decorative arc on left
        dottedPaths.push(`M ${LEFT_X} ${curY - 24} A ${rRadius + 24} ${rRadius + 24} 0 0 0 ${LEFT_X} ${nextY + 24}`);
        chevrons.push({ x: 450, y: nextY, dir: 'R' });
      }
    }

    // Determine Finish Badge location
    const lastRowIndex = totalRows - 1;
    const lastRowY = START_Y + lastRowIndex * PITCH;
    const itemsInLastRow = totalItems % 2 === 1 ? 1 : 2;
    const isLastRowLtoR = lastRowIndex % 2 === 0;

    let fX = 840;
    if (isLastRowLtoR) {
      fX = itemsInLastRow === 1 ? 620 : 840;
    } else {
      fX = itemsInLastRow === 1 ? 280 : 60;
    }

    return {
      roadPath: d,
      outerDottedPaths: dottedPaths,
      directionChevrons: chevrons,
      finishPos: { x: fX, y: lastRowY },
    };
  }, [totalRows, totalItems, PITCH, START_Y, LEFT_X, RIGHT_X]);

  // Compute exact coordinates for each milestone & its content card
  const milestoneNodes = useMemo(() => {
    return experiences.map((item, idx) => {
      const rowIndex = Math.floor(idx / 2);
      const colIndex = idx % 2;
      const isLtoR = rowIndex % 2 === 0;

      const y = START_Y + rowIndex * PITCH;
      let x = 280;

      if (isLtoR) {
        x = colIndex === 0 ? 280 : 620;
      } else {
        x = colIndex === 0 ? 620 : 280;
      }

      const color = MILESTONE_COLORS[idx % MILESTONE_COLORS.length];

      return {
        item,
        idx,
        number: idx + 1,
        color,
        x,
        y,
        cardY: y + 52, // Safely positioned below the road track
      };
    });
  }, [experiences, PITCH, START_Y]);

  return (
    <section
      id="experience"
      className="py-16 sm:py-24 bg-[#fafbfc] border-y border-slate-100 relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Background map dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-lime-400/5 via-sky-400/5 to-rose-400/5 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-[96%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-100/70 border border-lime-200 text-lime-800 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Compass size={13} className="text-lime-700" />
            <span>Interactive Highway Road Map</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Education & <span className="text-[#ff6422]">Experience Route</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2 max-w-xl mx-auto">
            A seamless milestone highway tracking university education through leadership and internships up to present-day achievements.
          </p>
        </div>

        {/* ============================================================
            DESKTOP & TABLET: SINGLE CONTINUOUS VECTOR ROADMAP
            - 100% UNBROKEN road (Zero seams, zero misalignments)
            - ZERO card overlapping (Ample vertical breathing room)
            ============================================================ */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <div
            className="relative w-full mx-auto"
            style={{ minHeight: `${totalHeight}px` }}
          >
            {/* SVG SINGLE CONTINUOUS HIGHWAY CANVAS */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox={`${VIEW_LEFT} 0 ${VIEW_WIDTH} ${totalHeight}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* 1. Outer decorative dotted turn arcs */}
              {outerDottedPaths.map((p, pIdx) => (
                <path
                  key={pIdx}
                  d={p}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
              ))}

              {/* 2. Outer road curb/border (Provides crisp boundary) */}
              <path
                d={roadPath}
                fill="none"
                stroke="#18181b"
                strokeWidth="54"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 3. Dark Asphalt Highway Track */}
              <path
                d={roadPath}
                fill="none"
                stroke="#27272a"
                strokeWidth="48"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 4. Pristine White Dashed Center Line */}
              <path
                d={roadPath}
                fill="none"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="2.5"
                strokeDasharray="10 8"
                strokeLinecap="round"
              />

              {/* 5. Direction Chevrons along each lane */}
              {directionChevrons.map((ch, cIdx) => (
                <g key={cIdx} transform={`translate(${ch.x}, ${ch.y})`}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={ch.dir === 'R' ? '#38bdf8' : '#fbbf24'}
                    fontSize="13"
                    fontWeight="900"
                    letterSpacing="3"
                    opacity="0.85"
                  >
                    {ch.dir === 'R' ? '▶ ▶ ▶ ▶' : '◀ ◀ ◀ ◀'}
                  </text>
                </g>
              ))}
            </svg>

            {/* START BADGE (Positioned at x = 45, y = START_Y) */}
            <div
              className="absolute z-30"
              style={{
                left: `${((45 - VIEW_LEFT) / VIEW_WIDTH) * 100}%`,
                top: `${(START_Y / totalHeight) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-20 h-20 rounded-full bg-[#84cc16] p-1.5 shadow-xl flex items-center justify-center ring-6 ring-lime-400/25">
                <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="text-xs font-black tracking-wider text-[#65a30d] uppercase">
                    START
                  </span>
                </div>
              </div>
            </div>

            {/* CHECKPOINT BADGES & CLEAN CONTENT CARDS */}
            {milestoneNodes.map(({ item, idx, number, color, x, y, cardY }) => (
              <React.Fragment key={item.id || item._id || idx}>
                {/* Milestone Circular Pin on the Highway */}
                <div
                  className="absolute z-30 cursor-pointer group"
                  style={{
                    left: `${((x - VIEW_LEFT) / VIEW_WIDTH) * 100}%`,
                    top: `${(y / totalHeight) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    style={{
                      borderColor: color.border,
                      boxShadow: `0 8px 25px ${color.glow}`,
                    }}
                    className="w-18 h-18 rounded-full bg-white border-[5px] flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  >
                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">
                      STOP
                    </span>
                    <span
                      style={{ color: color.text }}
                      className="text-2xl font-black leading-none"
                    >
                      {number}
                    </span>
                  </div>
                </div>

                {/* Content Card (Stationed below the road with dedicated vertical space - NO overlapping) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="absolute z-20 w-[260px] sm:w-[290px] text-center"
                  style={{
                    left: `${((x - VIEW_LEFT) / VIEW_WIDTH) * 100}%`,
                    top: `${(cardY / totalHeight) * 100}%`,
                    transform: 'translate(-50%, 0)',
                  }}
                >
                  <div className="relative bg-white/98 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 hover:border-slate-300">
                    {/* Tiny triangular pointer pointing towards the checkpoint pin */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-200/90 rotate-45" />

                    {/* Date / Duration Badge */}
                    <div className="flex items-center justify-center gap-1.5 mb-1.5 relative z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-800">
                        <Calendar size={11} className="text-[#ff6422]" />
                        <span>{item.date || item.period}</span>
                      </span>
                    </div>

                    {/* Primary Position or Headline (Title) */}
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                      {item.title || item.role}
                    </h4>

                    {/* Company or Institution (Subtitle) */}
                    <p
                      style={{ color: color.text }}
                      className="text-xs font-bold mt-0.5 line-clamp-1"
                    >
                      {item.subtitle || item.company}
                    </p>

                    {/* Location (Place) */}
                    {(item.place || item.location) && (
                      <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mt-1">
                        <MapPin size={10} className="text-[#ff6422]" />
                        <span className="truncate max-w-[210px]">{item.place || item.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </React.Fragment>
            ))}

            {/* FINISH BADGE (PRESENT / TILL NOW) */}
            <div
              className="absolute z-30"
              style={{
                left: `${((finishPos.x - VIEW_LEFT) / VIEW_WIDTH) * 100}%`,
                top: `${(finishPos.y / totalHeight) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-20 h-20 rounded-full bg-[#f43f5e] p-1.5 shadow-xl flex items-center justify-center ring-6 ring-rose-400/25">
                <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="text-[10px] font-black tracking-wider text-[#e11d48] uppercase leading-tight">
                    PRESENT
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">
                    TILL NOW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE VIEW (< md)
            Smooth vertical lane with dark road and dashed line
            ============================================================ */}
        <div className="md:hidden relative max-w-md mx-auto pl-10 pr-2 py-4">
          {/* Vertical Road Track */}
          <div className="absolute left-6 top-6 bottom-8 w-[38px] -translate-x-1/2 bg-[#27272a] rounded-full shadow-md z-0">
            <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-white/75" />
          </div>

          {/* START Pin on Mobile */}
          <div className="relative mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#84cc16] ring-4 ring-lime-400/25 flex items-center justify-center shadow-md z-10 shrink-0 -ml-10">
              <span className="text-[10px] font-black text-white uppercase">START</span>
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Academic Journey Begins
            </span>
          </div>

          {/* Milestones on Mobile */}
          <div className="space-y-8 relative z-10">
            {experiences.map((item, idx) => {
              const color = MILESTONE_COLORS[idx % MILESTONE_COLORS.length];

              return (
                <div key={item.id || item._id || idx} className="relative flex items-start gap-4">
                  {/* Circular Badge */}
                  <div
                    style={{
                      borderColor: color.border,
                      boxShadow: `0 4px 15px ${color.glow}`,
                    }}
                    className="w-12 h-12 rounded-full bg-white border-4 flex items-center justify-center shrink-0 -ml-10 z-20 shadow-md"
                  >
                    <span style={{ color: color.text }} className="text-base font-black">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    {/* Date / Duration Badge */}
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-800">
                        <Calendar size={11} className="text-[#ff6422]" />
                        <span>{item.date || item.period}</span>
                      </span>
                    </div>

                    {/* Headline / Position (Title) */}
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {item.title || item.role}
                    </h4>

                    {/* Institution / Company (Subtitle) */}
                    <p style={{ color: color.text }} className="text-xs font-bold mt-0.5">
                      {item.subtitle || item.company}
                    </p>

                    {/* Location (Place) */}
                    {(item.place || item.location) && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                        <MapPin size={10} className="text-[#ff6422]" />
                        <span>{item.place || item.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* FINISH Pin on Mobile */}
          <div className="relative mt-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#f43f5e] ring-4 ring-rose-400/25 flex items-center justify-center shadow-md z-10 shrink-0 -ml-10">
              <span className="text-[10px] font-black text-white uppercase">NOW</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Present Milestone</span>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                ● Open to Full-Stack & SWE Roles
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Route Legend */}
        <div className="mt-14 sm:mt-18 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dynamic Route: Expands seamlessly as new education or experience items are added</span>
          </div>
        </div>
      </div>
    </section>
  );
};
