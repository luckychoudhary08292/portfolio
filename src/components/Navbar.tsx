import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SocialLinks } from './SocialLinks';

interface NavbarProps {
  onOpenHireModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHireModal }) => {
  const { profile } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 95;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
        isScrolled ? 'top-3' : 'top-5'
      }`}
    >
      {/* Floating Pill Nav Container - Centered, Compact, Sleek */}
      <nav className="w-full max-w-3xl bg-[#141518]/95 backdrop-blur-md border border-white/10 rounded-full px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between text-sm transition-all duration-300">
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollTo('home')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'home'
                ? 'bg-[#ff6422] text-white shadow-md shadow-orange-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('about')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'about'
                ? 'bg-[#ff6422] text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollTo('skills')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'skills'
                ? 'bg-[#ff6422] text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Skills
          </button>
        </div>

        {/* Center Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group cursor-pointer px-3 py-1"
          aria-label={`${profile.name || 'Developer'} Portfolio`}
        >
          <div className="w-8 h-8 rounded-full bg-[#ff6422] flex items-center justify-center text-white font-bold text-xs tracking-tighter shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform uppercase">
            {profile.name ? profile.name.slice(0, 2) : 'LC'}
          </div>
          <span className="font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-orange-400 transition-colors uppercase">
            {profile.name ? profile.name.split(' ')[0] : 'PORTFOLIO'}
          </span>
        </button>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollTo('projects')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'projects'
                ? 'bg-[#ff6422] text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo('certificates')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'certificates'
                ? 'bg-[#ff6422] text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Certificates
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-[#ff6422] text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2 pr-1">
          <button
            onClick={onOpenHireModal}
            className="px-3 py-1.5 bg-[#ff6422] text-white rounded-full text-xs font-semibold"
          >
            Hire Me
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 max-w-md mx-auto bg-[#141518]/98 border border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => scrollTo('home')}
            className={`px-4 py-3 rounded-2xl text-left font-medium ${
              activeSection === 'home' ? 'bg-[#ff6422] text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('about')}
            className={`px-4 py-3 rounded-2xl text-left font-medium ${
              activeSection === 'about' ? 'bg-[#ff6422] text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollTo('skills')}
            className={`px-4 py-3 rounded-2xl text-left font-medium ${
              activeSection === 'skills' ? 'bg-[#ff6422] text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className={`px-4 py-3 rounded-2xl text-left font-medium ${
              activeSection === 'projects' ? 'bg-[#ff6422] text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo('certificates')}
            className={`px-4 py-3 rounded-2xl text-left font-medium ${
              activeSection === 'certificates' ? 'bg-[#ff6422] text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            Certificates
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className={`px-4 py-3 rounded-2xl text-left font-medium ${
              activeSection === 'contact' ? 'bg-[#ff6422] text-white' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            Contact
          </button>

          {/* Mobile Social Links Dock */}
          <div className="pt-3 pb-1 border-t border-white/10 flex justify-center">
            <SocialLinks variant="footer" />
          </div>
        </div>
      )}
    </header>
  );
};
