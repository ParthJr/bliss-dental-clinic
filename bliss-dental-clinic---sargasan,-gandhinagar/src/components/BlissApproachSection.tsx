import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BlissApproachSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });

      if (cardContainerRef.current) {
        gsap.from(cardContainerRef.current.children, {
          opacity: 0,
          y: 25,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardContainerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-10 lg:py-16"
      aria-label="The Bliss Approach"
    >
      <div className="max-w-7xl mx-auto bg-[#55284F] text-white rounded-[40px] p-6 sm:p-10 lg:p-16 relative shadow-[0_20px_50px_-15px_rgba(85,40,79,0.35)]">
        <div className="relative z-10 flex flex-col gap-10 lg:gap-14">
          <div ref={headerRef} className="max-w-3xl flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#FF705E] font-bold">
              The Bliss Approach
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#fef8f1] tracking-tight leading-tight">
              Good Care Starts With Feeling Heard.
            </h2>
            <p className="font-body text-base sm:text-lg text-[#ffd7f3] opacity-90 max-w-2xl pt-1 leading-relaxed">
              Understanding your dental concerns, asking questions, and exploring suitable treatment options are important steps toward informed decisions about your oral health.
            </p>
          </div>

          <div
            ref={cardContainerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {clinicData.principles.map((principle) => (
              <div
                key={principle.step}
                className="bg-white/15 backdrop-blur-sm p-6 sm:p-8 rounded-3xl hover:bg-white/20 transition-all duration-300 flex flex-col justify-between group border border-white/10 shadow-sm"
              >
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#FF705E]">
                  {principle.step}
                </span>
                <div className="mt-8 flex flex-col gap-2">
                  <h3 className="font-display font-semibold text-xl text-[#fef8f1]">
                    {principle.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#ffd7f3] opacity-90 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
