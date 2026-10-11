import React, { useState, useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FaqSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-20 bg-[#f9f3ec]"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#ffdad5] text-[#FF705E] flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#FF705E] font-bold">
            Patient Support
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1d1b17] tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="font-body text-sm sm:text-base text-[#58413e] max-w-lg">
            Clear answers about dental visits, treatments, scheduling, and clinic policies at Bliss Dental Clinic.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-4">
          {clinicData.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#fef8f1] rounded-3xl border border-[#ede7e0] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-[#1d1b17] hover:bg-[#f3ede6]/40 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-[#FF705E] font-mono">0{index + 1}</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#55284F] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 font-body text-sm sm:text-base text-[#58413e] leading-relaxed border-t border-[#ede7e0]/60">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-[#eadef8] text-[#55284F] text-xs font-semibold">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
