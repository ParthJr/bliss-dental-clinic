import React, { useEffect } from 'react';
import { clinicData, ServiceItem } from '../config/clinicData';
import { X, Calendar, Clock, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';

interface TreatmentModalProps {
  serviceId: string | null;
  onClose: () => void;
  onBookConsultation: (serviceId: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({
  serviceId,
  onClose,
  onBookConsultation,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && serviceId) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [serviceId, onClose]);

  useEffect(() => {
    if (serviceId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [serviceId]);

  if (!serviceId) return null;

  const service = clinicData.services.find((s) => s.id === serviceId) || clinicData.services[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="treatment-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#332E35]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#fef8f1] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#ede7e0] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#ede7e0]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#ffdad5] text-[#ab3327] text-xs font-semibold">
              {service.tag}
            </span>
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

        <div className="py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 id="treatment-modal-title" className="font-display font-bold text-2xl sm:text-3xl text-[#55284F]">
              {service.title}
            </h2>
            <p className="font-body text-base text-[#58413e] leading-relaxed">
              {service.description}
            </p>
          </div>

          {service.details && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f9f3ec] p-5 rounded-2xl border border-[#ede7e0]">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#55284F] uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF705E]" /> Duration
                </span>
                <span className="font-body text-sm font-semibold text-[#1d1b17]">
                  {service.details.duration}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#55284F] uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF705E]" /> Comfort
                </span>
                <span className="font-body text-sm font-semibold text-[#1d1b17]">
                  {service.details.comfortLevel}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#55284F] uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF705E]" /> Recovery
                </span>
                <span className="font-body text-sm font-semibold text-[#1d1b17]">
                  {service.details.recoveryTime}
                </span>
              </div>
            </div>
          )}

          {service.details?.clinicalFocus && (
            <div className="flex flex-col gap-3">
              <h3 className="font-display font-bold text-lg text-[#1d1b17]">
                What to Expect During Care
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.details.clinicalFocus.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#ede7e0]">
                    <CheckCircle className="w-4 h-4 text-[#FF705E] shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-[#58413e]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-[#ede7e0] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#f3ede6] text-[#55284F] font-semibold text-sm hover:bg-[#ede7e0] transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookConsultation(service.id);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF705E] text-white font-semibold text-sm shadow-md hover:bg-[#ab3327] transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation for this Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};
