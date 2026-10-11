import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PatientJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      // Connector line grow animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Step cards sequence
      if (stepsContainerRef.current) {
        gsap.from(stepsContainerRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="patient-guide"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-20 bg-[#fef8f1]"
      aria-label="Patient Journey and Guide"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Header Block */}
        <div
          ref={headerRef}
          className="text-center flex flex-col items-center gap-2 max-w-2xl"
        >
          <span className="text-xs uppercase tracking-widest text-[#FF705E] font-bold">
            Simple Experience
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1d1b17] tracking-tight">
            Three Steps to Get Started.
          </h2>
          <p className="font-body text-sm sm:text-base text-[#58413e] leading-relaxed">
            We keep appointment preparation completely straightforward and transparent from your very first message.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="w-full relative mt-2">
          {/* Desktop Connecting Line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[44px] left-20 right-20 h-1 bg-[#f1b4e3] z-0 rounded-full"
            aria-hidden="true"
          />

          <div
            ref={stepsContainerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
          >
            {clinicData.journeySteps.map((step, idx) => {
              const isSecond = idx === 1;

              return (
                <div
                  key={step.number}
                  className="bg-[#f9f3ec] p-6 sm:p-8 rounded-3xl flex flex-col gap-5 shadow-[0_10px_30px_-10px_rgba(85,40,79,0.06)] border border-[#ede7e0] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-extrabold text-xl text-white shadow-md shrink-0 ${
                        isSecond
                          ? 'bg-[#55284F] shadow-[0_8px_20px_-4px_rgba(85,40,79,0.35)]'
                          : 'bg-[#FF705E] shadow-[0_8px_20px_-4px_rgba(255,112,94,0.4)]'
                      }`}
                    >
                      {step.number}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#55284F] px-3 py-1 rounded-full bg-white/70">
                      {step.badge}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display font-bold text-xl text-[#1d1b17]">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#58413e] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
