import React from 'react';
import { X, Award, ExternalLink, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import { CertificateItem } from '../data/portfolioData';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#141518] text-white border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#ff6422]">
            <Award size={28} />
          </div>
          <div>
            <span className="text-xs font-bold text-[#ff6422] uppercase tracking-wider">
              {certificate.issuer}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {certificate.title}
            </h3>
          </div>
        </div>

        {/* Details Card */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Credential ID:</span>
            <span className="font-mono font-semibold text-white">{certificate.credentialId}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Issue Date:</span>
            <span className="text-white font-medium">{certificate.issueDate}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Verification Status:</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck size={14} />
              <span>Verified & Authentic</span>
            </span>
          </div>
        </div>

        {/* Competencies */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            Key Competencies Validated
          </h4>
          <div className="flex flex-wrap gap-2">
            {certificate.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-lg bg-white/10 text-white font-medium border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
          <a
            href={certificate.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff6422] hover:bg-[#ff7536] text-white font-semibold text-xs transition-colors shadow-md shadow-orange-500/20"
          >
            <span>Verify on Issuer Website</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
