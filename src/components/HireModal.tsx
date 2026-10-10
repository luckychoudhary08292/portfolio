import React, { useState } from 'react';
import { X, CheckCircle2, Send, Sparkles, Briefcase, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141518] text-white border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-orange-500/20 text-[#ff6422] flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
            <p className="text-sm text-gray-300 max-w-xs">
              Thank you for reaching out. {profile.name} will review your opportunity and reply within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#ff6422] text-xs font-bold tracking-wider uppercase mb-1">
              <Briefcase size={14} />
              <span>Job & Internship Inquiry</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Get in Touch with <span className="text-[#ff6422]">{profile.name}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Connect regarding SWE opportunities, internships, or technical collaborations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1e2025] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Company / Team
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stripe, Google, Startup"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#1e2025] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="recruiter@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1e2025] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Opportunity Type
                </label>
                <select
                  value={formData.opportunityType}
                  onChange={(e) => setFormData({ ...formData, opportunityType: e.target.value })}
                  className="w-full bg-[#1e2025] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff6422]"
                >
                  <option value="Full-Time SWE Role">Full-Time Software Engineer</option>
                  <option value="SWE Summer Internship">Summer SWE Internship</option>
                  <option value="Co-op / Semester Internship">Co-op / Fall Internship</option>
                  <option value="Technical Project / Freelance">Technical Project / Contract</option>
                  <option value="General Technical Chat">General Coffee Chat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Message / Role Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share a brief overview of the role, requirements, or meeting schedule..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1e2025] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6422] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#ff6422] hover:bg-[#ff7536] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/25 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message & Connect'}</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
