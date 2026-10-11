import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { Smile, Palette, Layers, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmilePrioritiesProps {
  onSelectPriority?: (priorityId: string) => void;
}

export const SmilePrioritiesSection: React.FC<SmilePrioritiesProps> = ({ onSelectPriority }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
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

      // Cards reveal with subtle staggered rise
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 25,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getPriorityIcon = (iconType: string) => {
    switch (iconType) {
      case 'health':
        return <Smile className="w-5 h-5 text-[#ab3327]" aria-hidden="true" />;
      case 'cosmetic':
        return <Palette className="w-5 h-5 text-[#55284F]" aria-hidden="true" />;
      case 'restorative':
      default:
        return <Layers className="w-5 h-5 text-[#ab3327]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="your-smile"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-10 lg:py-16"
      aria-label="Your Smile, Your Priorities"
    >
      <div className="max-w-7xl mx-auto bg-[#FF705E] text-white rounded-[40px] p-6 sm:p-10 lg:p-16 relative shadow-[0_20px_48px_-12px_rgba(255,112,94,0.4)]">
        {/* Decorative backdrop shapes */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#ab3327]/30 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-10">
          {/* Header */}
          <div ref={headerRef} className="max-w-3xl flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wider text-[#fef8f1] font-bold opacity-90">
              Individualized Pathways
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Your Smile. Your Priorities.
            </h2>
            <p className="font-body text-base sm:text-lg text-white/95 max-w-2xl leading-relaxed">
              Every patient brings unique requirements. A consultation can help you understand relevant treatment options and make informed decisions about your dental care.
            </p>
          </div>

          {/* 3 Staggered Priority Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2"
          >
            {clinicData.smilePriorities.map((item, index) => {
              const offsetClass =
                index === 1 ? 'md:translate-y-3' : 'md:-translate-y-2';

              return (
                <div
                  key={item.id}
                  className={`bg-[#fef8f1] text-[#1d1b17] p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-3 group ${offsetClass}`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-full bg-[#ffdad5] flex items-center justify-center">
                        {getPriorityIcon(item.icon)}
                      </div>
                      <span className="text-xs font-semibold text-[#58413e]/70">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#55284F] group-hover:text-[#FF705E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#58413e] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#ede7e0]">
                    <button
                      type="button"
                      onClick={() => onSelectPriority?.(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55284F] group-hover:text-[#FF705E] transition-colors"
                    >
                      <span>Explore this care path</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
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
