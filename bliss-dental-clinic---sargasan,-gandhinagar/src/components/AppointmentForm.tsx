import React, { useState, useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { CheckCircle2, AlertCircle, Calendar, Clock, Phone, Send, Loader2, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AppointmentFormProps {
  initialServiceId?: string;
}

export interface FormSubmissionData {
  fullName: string;
  mobileNumber: string;
  serviceId: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  consent: boolean;
  honeypot?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialServiceId }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormSubmissionData>({
    fullName: '',
    mobileNumber: '',
    serviceId: initialServiceId || '',
    preferredDate: '',
    preferredTimeSlot: 'morning',
    notes: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [lastSubmissionHash, setLastSubmissionHash] = useState<string | null>(null);

  // Sync initialServiceId when user clicks on a service card
  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  // Minimum allowed date is today
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Gentle card entrance only - NEVER animate inputs directly to prevent layout thrashing or focus bugs
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Strict Indian mobile phone validation
  const validateMobile = (phone: string): boolean => {
    // Strips spaces, hyphens, and +91
    const cleaned = phone.replace(/[\s\-]/g, '').replace(/^(\+91|91)/, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required for appointment confirmation.';
    } else if (!validateMobile(formData.mobileNumber)) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    if (!formData.serviceId) {
      errs.serviceId = 'Please select a service or reason for your visit.';
    }

    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select your preferred date.';
    } else if (formData.preferredDate < todayStr) {
      errs.preferredDate = 'Preferred date cannot be in the past.';
    }

    if (!formData.preferredTimeSlot) {
      errs.preferredTimeSlot = 'Please select a preferred time slot.';
    }

    if (!formData.consent) {
      errs.consent = 'You must agree to be contacted by Bliss Dental Clinic regarding your visit.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Bot honeypot verification
    if (formData.honeypot) {
      setSubmissionStatus('error');
      setStatusMessage('Submission rejected by security check.');
      return;
    }

    // Duplicate submission prevention
    const currentHash = `${formData.fullName.trim()}-${formData.mobileNumber.trim()}-${formData.preferredDate}`;
    if (lastSubmissionHash === currentHash) {
      setErrors({
        form: 'You have already submitted a consultation request for this date. Our team will contact you shortly.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissionStatus('success');
        setStatusMessage(
          data.message ||
            'Your consultation request has been received. The clinic team will contact you to confirm availability.'
        );
        setReferenceId(data.referenceId || `BLISS-${Date.now().toString().slice(-6)}`);
        setLastSubmissionHash(currentHash);
        // Reset non-essential fields
        setFormData((prev) => ({
          ...prev,
          notes: '',
        }));
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Submission service temporarily unavailable.');
      }
    } catch (err: any) {
      // Honest error reporting as mandated by Section 11
      setSubmissionStatus('error');
      setStatusMessage(
        err.message ||
          'Unable to send consultation request right now. Please call our clinic directly at 079907 23416.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="consultation"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-20 bg-[#fef8f1]"
      aria-label="Appointment Request"
    >
      <div className="max-w-7xl mx-auto bg-[#ffdad5] rounded-[40px] p-6 sm:p-10 lg:p-16 shadow-[0_20px_40px_-15px_rgba(85,40,79,0.12)] border border-[#FF705E]/15">
        <div
          ref={cardRef}
          className="max-w-2xl mx-auto bg-[#fef8f1] rounded-3xl p-6 sm:p-10 shadow-xl border border-white flex flex-col gap-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs uppercase tracking-widest text-[#ab3327] font-bold">
              Schedule an Appointment
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1d1b17] tracking-tight">
              Let's Make Your Visit Happen.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#58413e] leading-relaxed">
              Tell us how to reach you and when you would prefer to visit. The clinic team can contact you to confirm availability.
            </p>
          </div>

          {/* Submission Success Banner */}
          {submissionStatus === 'success' ? (
            <div
              className="p-6 rounded-2xl bg-[#ffd7f3]/40 border border-[#55284F]/20 flex flex-col gap-4 text-center items-center"
              role="alert"
            >
              <div className="w-12 h-12 rounded-full bg-[#55284F] text-white flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-display font-bold text-lg text-[#55284F]">
                  Consultation Request Received
                </p>
                <p className="font-body text-sm text-[#1d1b17] leading-relaxed">
                  {statusMessage}
                </p>
                {referenceId && (
                  <p className="text-xs font-mono text-[#58413e] mt-1">
                    Enquiry Ref: <span className="font-bold">{referenceId}</span>
                  </p>
                )}
              </div>
              <div className="pt-2 flex flex-wrap gap-3 justify-center">
                <a
                  href={clinicData.phone.telUri}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF705E] text-white text-xs sm:text-sm font-semibold hover:bg-[#ab3327] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us: {clinicData.phone.display}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmissionStatus('idle');
                    setStatusMessage('');
                  }}
                  className="px-5 py-2.5 rounded-full bg-white text-[#55284F] border border-[#ede7e0] text-xs sm:text-sm font-semibold hover:bg-[#f3ede6] transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Consultation Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {/* General Form Error */}
              {(errors.form || submissionStatus === 'error') && (
                <div
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span>{errors.form || statusMessage}</span>
                    <a
                      href={clinicData.phone.telUri}
                      className="text-xs font-bold underline hover:text-red-900"
                    >
                      Click here to call clinic at {clinicData.phone.display}
                    </a>
                  </div>
                </div>
              )}

              {/* Anti-spam honeypot (hidden from humans) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Leave this empty</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="full-name" className="font-semibold text-sm text-[#1d1b17]">
                  Full Name <span className="text-[#FF705E]">*</span>
                </label>
                <input
                  id="full-name"
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-2xl bg-white text-[#1d1b17] border transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF705E] ${
                    errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-[#e0bfba]/60'
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'full-name-error' : undefined}
                />
                {errors.fullName && (
                  <p id="full-name-error" className="text-xs text-red-600 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="mobile-number" className="font-semibold text-sm text-[#1d1b17]">
                  Mobile Number <span className="text-[#FF705E]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#58413e] font-medium pointer-events-none">
                    +91
                  </span>
                  <input
                    id="mobile-number"
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, mobileNumber: e.target.value });
                      if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
                    }}
                    className={`w-full pl-14 pr-4 py-3 rounded-2xl bg-white text-[#1d1b17] border transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF705E] ${
                      errors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-[#e0bfba]/60'
                    }`}
                    aria-invalid={!!errors.mobileNumber}
                    aria-describedby={errors.mobileNumber ? 'mobile-number-error' : undefined}
                  />
                </div>
                {errors.mobileNumber && (
                  <p id="mobile-number-error" className="text-xs text-red-600 font-medium">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Service of Interest */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service-interest" className="font-semibold text-sm text-[#1d1b17]">
                  Service of Interest <span className="text-[#FF705E]">*</span>
                </label>
                <select
                  id="service-interest"
                  required
                  value={formData.serviceId}
                  onChange={(e) => {
                    setFormData({ ...formData, serviceId: e.target.value });
                    if (errors.serviceId) setErrors({ ...errors, serviceId: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-2xl bg-white text-[#1d1b17] border transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF705E] ${
                    errors.serviceId ? 'border-red-400 bg-red-50/20' : 'border-[#e0bfba]/60'
                  }`}
                  aria-invalid={!!errors.serviceId}
                  aria-describedby={errors.serviceId ? 'service-interest-error' : undefined}
                >
                  <option value="" disabled>
                    Select a treatment or reason for visit
                  </option>
                  {clinicData.services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Other / Not Sure Yet</option>
                </select>
                {errors.serviceId && (
                  <p id="service-interest-error" className="text-xs text-red-600 font-medium">
                    {errors.serviceId}
                  </p>
                )}
              </div>

              {/* Date & Time Slot Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pref-date" className="font-semibold text-sm text-[#1d1b17] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF705E]" />
                    <span>Preferred Date</span> <span className="text-[#FF705E]">*</span>
                  </label>
                  <input
                    id="pref-date"
                    type="date"
                    min={todayStr}
                    required
                    value={formData.preferredDate}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredDate: e.target.value });
                      if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-2xl bg-white text-[#1d1b17] border transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF705E] ${
                      errors.preferredDate ? 'border-red-400 bg-red-50/20' : 'border-[#e0bfba]/60'
                    }`}
                    aria-invalid={!!errors.preferredDate}
                    aria-describedby={errors.preferredDate ? 'pref-date-error' : undefined}
                  />
                  {errors.preferredDate && (
                    <p id="pref-date-error" className="text-xs text-red-600 font-medium">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pref-time" className="font-semibold text-sm text-[#1d1b17] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF705E]" />
                    <span>Preferred Time Slot</span> <span className="text-[#FF705E]">*</span>
                  </label>
                  <select
                    id="pref-time"
                    required
                    value={formData.preferredTimeSlot}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredTimeSlot: e.target.value });
                      if (errors.preferredTimeSlot) setErrors({ ...errors, preferredTimeSlot: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-2xl bg-white text-[#1d1b17] border transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF705E] ${
                      errors.preferredTimeSlot ? 'border-red-400 bg-red-50/20' : 'border-[#e0bfba]/60'
                    }`}
                  >
                    <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="notes" className="font-semibold text-sm text-[#1d1b17]">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Tell us about any specific discomfort, previous dental experiences, or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white text-[#1d1b17] border border-[#e0bfba]/60 transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF705E]"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData({ ...formData, consent: e.target.checked });
                      if (errors.consent) setErrors({ ...errors, consent: '' });
                    }}
                    className="mt-1 w-4 h-4 rounded text-[#FF705E] focus:ring-[#FF705E] border-[#e0bfba] cursor-pointer"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                  />
                  <label htmlFor="consent" className="text-xs sm:text-sm text-[#58413e] leading-snug cursor-pointer select-none">
                    I agree to be contacted by Bliss Dental Clinic regarding my consultation request.
                  </label>
                </div>
                {errors.consent && (
                  <p id="consent-error" className="text-xs text-red-600 font-medium pl-7">
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 rounded-full bg-[#FF705E] text-white font-semibold text-sm sm:text-base shadow-[0_12px_28px_-6px_rgba(255,112,94,0.4)] hover:bg-[#ab3327] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF705E]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transmitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Request a Consultation</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Disclaimer Note */}
              <p className="text-xs text-[#58413e] text-center opacity-80 pt-1">
                * Note: A consultation request is subject to clinic confirmation.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
