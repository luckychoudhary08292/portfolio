import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Send,
  Sparkles,
  Briefcase,
  Mail,
  User,
  Building,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SocialLinks } from './SocialLinks';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose }) => {
  const { profile, submitInquiry } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    opportunityType: 'Full-Time SWE Role',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key press and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitInquiry(formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        company: '',
        opportunityType: 'Full-Time SWE Role',
        message: '',
      });
    }, 2400);
  };

  const opportunityTypes = [
    'Full-Time SWE Role',
    'SWE Summer Internship',
    'Semester / Co-op',
    'Contract / Freelance',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-xl bg-[#0f1117] text-white border border-white/15 rounded-[28px] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden cursor-default my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#ff6422]/25 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer active:scale-95 z-20 group"
          aria-label="Close dialog"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {isSuccess ? (
          <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10 animate-in zoom-in duration-300">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Message Sent Successfully!</h3>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Thank you for reaching out. <span className="text-[#ff6422] font-semibold">{profile.name}</span> will review your opportunity and reply within 24 hours.
            </p>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Header: Developer Presence & Status Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#ff6422] text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-orange-500/30 uppercase tracking-tighter shrink-0">
                {profile.name ? profile.name.slice(0, 2) : 'LC'}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate">
                    Connect with {profile.name || 'Developer'}
                  </h3>
                  <span className="hidden xs:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {profile.title || 'Software Engineer'} • Actively interviewing
                </p>
              </div>
            </div>

            {/* Sub-header description */}
            <p className="text-xs sm:text-sm text-gray-300 mb-5 leading-relaxed">
              Share details about your open role, internship, or technical project. Looking forward to discussing how I can add immediate value.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <User size={13} className="text-[#ff6422]" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#ff6422]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Building size={13} className="text-[#ff6422]" />
                    <span>Company / Team</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Google, Stripe, Startup"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#ff6422]/20 transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Mail size={13} className="text-[#ff6422]" />
                  <span>Work Email *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="recruiter@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#ff6422]/20 transition-all"
                />
              </div>

              {/* Opportunity Type Pill Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Briefcase size={13} className="text-[#ff6422]" />
                  <span>Opportunity Type</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {opportunityTypes.map((type) => {
                    const isSelected = formData.opportunityType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, opportunityType: type })}
                        className={`text-xs font-semibold py-2 px-3 rounded-xl border transition-all text-left truncate cursor-pointer ${
                          isSelected
                            ? 'bg-[#ff6422] border-[#ff6422] text-white shadow-md shadow-orange-500/20'
                            : 'bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-[#ff6422]" />
                  <span>Message & Requirements *</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share a short summary of the role, requirements, or meeting schedule..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422] focus:bg-white/[0.08] focus:ring-2 focus:ring-[#ff6422]/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#ff6422] hover:bg-[#ff7536] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/30 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message & Connect'}</span>
                <Send size={16} />
              </button>
            </form>

            {/* Direct Profiles Row */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-xs text-gray-400 font-medium">
                Direct Profiles:
              </span>
              <SocialLinks variant="footer" className="justify-center" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
