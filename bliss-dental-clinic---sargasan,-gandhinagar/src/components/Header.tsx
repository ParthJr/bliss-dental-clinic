import React, { useState, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { DentalLogo } from './Icons';
import { MapPin, Phone, Clock, Menu, X, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking for nav links
      const sections = ['home', 'about', 'treatments', 'your-smile', 'patient-guide', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Treatments', href: '#treatments', id: 'treatments' },
    { label: 'Your Smile', href: '#your-smile', id: 'your-smile' },
    { label: 'Patient Guide', href: '#patient-guide', id: 'patient-guide' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#fef8f1]/95 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(85,40,79,0.08)]'
            : 'bg-[#fef8f1]/90 backdrop-blur-sm'
        }`}
      >
        {/* Top Announcement / Contact Bar */}
        <div className="bg-[#ede7e0]/60 border-b border-[#e0bfba]/20 px-4 sm:px-6 lg:px-12 py-1.5 transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-[#58413e] font-medium">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF705E] shrink-0" aria-hidden="true" />
                <span>{clinicData.locationLabel}</span>
              </span>
              <span className="hidden sm:inline text-[#e0bfba]">·</span>
              <a
                href={clinicData.phone.telUri}
                className="flex items-center gap-1.5 hover:text-[#FF705E] transition-colors"
                title="Call Bliss Dental Clinic"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF705E] shrink-0" aria-hidden="true" />
                <span>{clinicData.phone.display}</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF705E] animate-pulse" aria-hidden="true" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#58413e]/70 hidden xs:inline" aria-hidden="true" />
                {clinicData.hours.badgeSchedule}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* Logo & Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF705E] rounded-xl p-1"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <DentalLogo className="w-9 h-9 transform group-hover:scale-105 transition-transform duration-200" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl sm:text-2xl text-[#55284F] tracking-tight leading-none">
                {clinicData.name}
              </span>
              <span className="font-serif italic text-xs sm:text-[13px] text-[#58413e] tracking-wide -mt-0.5">
                {clinicData.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-1 p-1.5 bg-[#f9f3ec] rounded-full border border-[#ede7e0]/70"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FF705E] text-white shadow-[0_8px_20px_-4px_rgba(255,112,94,0.35)]'
                      : 'text-[#58413e] hover:text-[#1d1b17] hover:bg-[#ede7e0]/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#FF705E] text-white font-medium text-sm sm:text-base shadow-[0_10px_24px_-6px_rgba(255,112,94,0.4)] hover:bg-[#ab3327] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF705E]"
            >
              <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Book a Consultation</span>
            </button>

            {/* Direct Phone Shortcut */}
            <a
              href={clinicData.phone.telUri}
              className="hidden sm:flex w-10 h-10 rounded-full bg-[#ab3327] hover:bg-[#FF705E] text-white items-center justify-center transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF705E]"
              title={`Call ${clinicData.phone.display}`}
              aria-label={`Call ${clinicData.phone.display}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full text-[#55284F] hover:bg-[#ede7e0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF705E]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Accessibility */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 xl:hidden flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#55284F]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative w-full bg-[#fef8f1] rounded-t-[32px] p-6 shadow-2xl border-t border-[#e0bfba]/30 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#e0bfba]/20">
              <div className="flex items-center gap-2.5">
                <DentalLogo className="w-8 h-8" />
                <span className="font-display font-bold text-lg text-[#55284F]">
                  {clinicData.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-[#f3ede6] text-[#55284F] hover:bg-[#ede7e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF705E]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="flex flex-col py-4 gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-3 rounded-2xl text-base font-semibold transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-[#FF705E] text-white shadow-sm'
                      : 'text-[#1d1b17] hover:bg-[#f3ede6]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs opacity-75">→</span>
                </a>
              ))}
            </nav>

            {/* Mobile Action Buttons */}
            <div className="pt-4 border-t border-[#e0bfba]/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 rounded-full bg-[#FF705E] text-white font-semibold text-center shadow-[0_10px_20px_-5px_rgba(255,112,94,0.4)]"
              >
                Book a Consultation
              </button>

              <a
                href={clinicData.phone.telUri}
                className="w-full py-3 rounded-full bg-[#f3ede6] text-[#55284F] font-semibold text-center flex items-center justify-center gap-2 hover:bg-[#ede7e0]"
              >
                <Phone className="w-4 h-4 text-[#FF705E]" />
                <span>Call {clinicData.phone.display}</span>
              </a>

              <div className="text-center pt-2 text-xs text-[#58413e]">
                <p>{clinicData.address.line1}</p>
                <p className="mt-0.5">{clinicData.hours.weekdaySaturday}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
