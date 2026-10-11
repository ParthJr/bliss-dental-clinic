import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#332E35]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#fef8f1] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ede7e0] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#ede7e0]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ffdad5] text-[#FF705E] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 id="legal-modal-title" className="font-display font-bold text-xl text-[#55284F]">
              {isPrivacy ? 'Patient Privacy Notice' : 'Terms of Consultation & Service'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#f3ede6] text-[#55284F] hover:bg-[#ede7e0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF705E]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 font-body text-sm sm:text-base text-[#58413e] flex flex-col gap-4 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                <strong>Bliss Dental Clinic</strong> is committed to respecting your personal healthcare privacy.
                When you submit a consultation request through this website, we collect only the necessary contact
                information (your name, telephone number, selected care preferences, and visit notes) solely to schedule
                and confirm your clinic visit.
              </p>
              <h3 className="font-display font-bold text-base text-[#1d1b17] mt-2">
                1. Information Collection & Use
              </h3>
              <p>
                Information provided in consultation forms is used strictly by authorized clinic staff in Sargasan,
                Gandhinagar to contact you regarding availability. We do not sell, rent, or distribute your private
                telephone numbers or personal data to third-party marketing companies.
              </p>
              <h3 className="font-display font-bold text-base text-[#1d1b17] mt-2">
                2. Communication Channels
              </h3>
              <p>
                By checking the consent box, you authorize Bliss Dental Clinic to reach you via phone call or direct SMS/WhatsApp
                strictly for appointment confirmation and appointment preparation.
              </p>
              <h3 className="font-display font-bold text-base text-[#1d1b17] mt-2">
                3. Contact for Inquiries
              </h3>
              <p>
                If you wish to update or withdraw your request, you may contact the clinic team at 079907 23416 or
                visit Pramukh Horizon-2, Shop No. 115, First Floor, Sargasan, Gandhinagar.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>Bliss Dental Clinic</strong>. By using this website and requesting appointments,
                you acknowledge and accept the following terms:
              </p>
              <h3 className="font-display font-bold text-base text-[#1d1b17] mt-2">
                1. Consultation Requests
              </h3>
              <p>
                Submitting a visit request through this online portal does not constitute a guaranteed medical reservation
                until confirmed directly by our clinic front-desk staff. Appointment slots are allocated based on daily
                clinic availability.
              </p>
              <h3 className="font-display font-bold text-base text-[#1d1b17] mt-2">
                2. Clinical Information & Care Plans
              </h3>
              <p>
                Information presented on this website is intended for general informational purposes to help patients
                understand dental options. Precise diagnosis, restorative plans, and treatment fees are formulated only
                after an in-person physical clinical examination with digital diagnostic evaluation.
              </p>
              <h3 className="font-display font-bold text-base text-[#1d1b17] mt-2">
                3. Operating Hours & Emergency Care
              </h3>
              <p>
                Regular clinical consultations are conducted Monday through Saturday between 10:00 AM and 8:00 PM.
                Sunday visits are held strictly by prior appointment.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#ede7e0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#55284F] text-white font-semibold text-sm hover:bg-[#330930] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
