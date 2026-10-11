import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DoctorProfileSection: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const doctor = clinicData.team[0];

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-20 bg-[#f9f3ec]"
      aria-label="Meet Our Clinical Team"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#55284F] font-bold">
            Clinical Excellence & Empathy
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1d1b17] tracking-tight">
            Meet Your Care Team.
          </h2>
          <p className="font-body text-sm sm:text-base text-[#58413e] leading-relaxed">
            Combining advanced dental implant training with a gentle, patient-first philosophy in Sargasan, Gandhinagar.
          </p>
        </div>

        <div
          ref={cardRef}
          className="bg-[#fef8f1] rounded-[40px] p-6 sm:p-10 lg:p-14 shadow-[0_15px_35px_-10px_rgba(85,40,79,0.08)] border border-[#ede7e0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Doctor Portrait / Graphic Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#ffdad5]/40 rounded-3xl p-8 text-center border border-[#FF705E]/15">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#55284F] text-white flex items-center justify-center font-display font-extrabold text-3xl sm:text-4xl shadow-md mb-4">
              BD
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1d1b17]">
              {doctor.name}
            </h3>
            <p className="font-serif italic text-sm text-[#55284F] mt-0.5">
              {doctor.role}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full bg-white text-[#ab3327] text-xs font-semibold shadow-xs">
                {doctor.qualification}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#55284F] text-xs font-semibold shadow-xs">
                {doctor.experience}
              </span>
            </div>
          </div>

          {/* Doctor Bio & Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#55284F] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#FF705E]" />
                <span>Specialization: {doctor.specialization}</span>
              </div>
              <p className="font-body text-base text-[#1d1b17] leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#ffd7f3]/30 border border-[#55284F]/15 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-display font-semibold text-sm text-[#55284F]">
                <HeartHandshake className="w-4 h-4 text-[#FF705E]" />
                <span>Our Clinical Philosophy</span>
              </div>
              <p className="font-body text-sm text-[#58413e] italic leading-relaxed">
                "{doctor.philosophy}"
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#FF705E] text-white font-semibold text-sm shadow-md hover:bg-[#ab3327] transition-all cursor-pointer"
              >
                Schedule Visit with Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
