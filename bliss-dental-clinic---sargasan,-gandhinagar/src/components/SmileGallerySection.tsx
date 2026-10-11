import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { Sparkles, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SmileGallerySection: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-20 bg-[#fef8f1]"
      aria-label="Smile Transformation Case Highlights"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#FF705E] font-bold">
              Before & After Transformations
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1d1b17] tracking-tight">
              Smile Gallery & Case Highlights.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#58413e] leading-relaxed">
              Explore representative examples of restorative and aesthetic dental care delivered at Bliss Dental Clinic.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicData.smileCases.map((item) => (
            <div
              key={item.id}
              className="bg-[#f9f3ec] p-6 sm:p-8 rounded-3xl border border-[#ede7e0] shadow-sm flex flex-col justify-between gap-6 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#ffdad5] text-[#ab3327] text-xs font-semibold">
                    {item.tag}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FF705E]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#55284F] group-hover:text-[#FF705E] transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-[#58413e] font-semibold uppercase tracking-wider">
                  {item.category}
                </p>
                <p className="font-body text-sm text-[#58413e] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ede7e0] flex flex-col gap-3">
                <div className="p-3 rounded-2xl bg-white/80 text-xs font-medium text-[#55284F]">
                  ✓ {item.highlight}
                </div>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF705E] hover:text-[#ab3327] transition-colors"
                >
                  <span>Discuss Your Options</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
