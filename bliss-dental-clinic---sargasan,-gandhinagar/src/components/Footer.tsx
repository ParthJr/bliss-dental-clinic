import React, { useState } from 'react';
import { clinicData } from '../config/clinicData';
import { DentalLogo } from './Icons';
import { Phone, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { PrivacyModal } from './PrivacyModal';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({
    isOpen: false,
    type: 'privacy',
  });

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="w-full bg-[#55284F] text-white pt-16 sm:pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Main 3-column / 12-grid structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-white/10">
            {/* Col 1: Brand & Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <DentalLogo className="w-9 h-9" />
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#fef8f1]">
                  {clinicData.name}
                </span>
              </div>

              <p className="font-serif italic text-lg sm:text-xl text-[#f1b4e3] leading-snug">
                Gentle, boutique oral healthcare crafted with clinical precision.
              </p>

              <div className="flex items-start gap-2.5 text-sm text-[#ffd7f3] opacity-90 max-w-md mt-1">
                <MapPin className="w-4 h-4 text-[#FF705E] shrink-0 mt-1" />
                <p className="leading-relaxed">{clinicData.address.full}</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Phone className="w-4 h-4 text-[#FF705E] shrink-0" />
                <a
                  href={clinicData.phone.telUri}
                  className="font-display font-bold text-base sm:text-lg text-[#FF705E] hover:underline transition-colors"
                >
                  {clinicData.phone.international}
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="font-display font-bold text-base text-[#fef8f1] tracking-wide">
                Navigation
              </span>
              <nav className="flex flex-col gap-2.5 text-sm font-medium text-[#ffd7f3]/90">
                <button
                  type="button"
                  onClick={() => handleScrollTo('home')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('about')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('treatments')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Treatments
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('your-smile')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Your Smile Gallery
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('patient-guide')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Patient Guide
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('contact')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Visit
                </button>
              </nav>
            </div>

            {/* Col 3: Appointment Care Hours & CTA */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="font-display font-bold text-base text-[#fef8f1] tracking-wide">
                Appointment Care Hours
              </span>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl flex flex-col gap-3.5 border border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#ffd7f3] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF705E]" />
                    Monday – Saturday
                  </span>
                  <span className="text-white font-bold font-mono">10:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-2">
                  <span className="text-[#ffd7f3]">Sunday</span>
                  <span className="text-[#FF705E] font-semibold text-xs sm:text-sm">
                    By Prior Appointment
                  </span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#FF705E] text-white font-semibold text-sm shadow-[0_12px_28px_-6px_rgba(255,112,94,0.35)] hover:bg-[#ab3327] hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Your Slot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright and Legal Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ffd7f3]/80">
            <p>© {new Date().getFullYear()} Bliss Dental Clinic, Sargasan. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal({ isOpen: true, type: 'terms' })}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Privacy and Terms Dialog */}
      <PrivacyModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
      />
    </>
  );
};
