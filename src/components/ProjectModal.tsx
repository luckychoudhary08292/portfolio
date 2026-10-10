import React from 'react';
import { X, CheckCircle, Github, ExternalLink, Cpu } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenHireModal: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenHireModal,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#141518] text-white border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white border border-white/20 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Hero Media Preview */}
        <div className="relative aspect-[16/9] w-full bg-[#1b1c20] overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-transparent to-black/40 pointer-events-none" />

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full bg-[#ff6422] text-white text-xs font-bold mb-2">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Technologies & System Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.techStack || []).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-lg bg-white/10 text-white font-medium border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics & Architecture */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {project.metrics && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-gray-400 font-medium">Performance & Scale</div>
                <div className="text-xl font-bold text-[#ff6422] mt-0.5">
                  {project.metrics}
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-gray-400 font-medium">Key Engineering Highlights</div>
              <ul className="mt-2 space-y-1">
                {(project.deliverables || ['Microservices architecture', 'High concurrency', 'Automated testing']).map(
                  (d, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-gray-200">
                      <CheckCircle size={13} className="text-[#ff6422]" />
                      <span>{d}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                <Github size={16} />
                <span>GitHub Repository</span>
              </a>

              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-semibold text-xs transition-colors shadow-md shadow-orange-500/20"
                >
                  <ExternalLink size={15} />
                  <span>Live Preview</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenHireModal();
              }}
              className="px-6 py-2.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              Discuss This Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
