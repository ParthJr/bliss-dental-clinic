import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { StarIcon } from './Icons';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 35,
        scale: 0.98,
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

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-10 lg:py-14 bg-[#f9f3ec]"
      aria-label="Google Patient Reviews"
    >
      <div
        ref={cardRef}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#fef8f1] p-6 sm:p-10 lg:p-12 rounded-[36px] shadow-[0_10px_30px_-10px_rgba(85,40,79,0.07)] border border-[#ede7e0]"
      >
        {/* Rating Graphic & Metrics */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left w-full lg:w-auto">
          {/* Big Rating Box */}
          <div className="flex flex-col items-center justify-center bg-[#ffdad5]/60 border border-[#FF705E]/20 px-8 py-5 rounded-3xl shrink-0">
            <span className="font-display font-extrabold text-5xl sm:text-6xl text-[#55284F] leading-none">
              {clinicData.reputation.rating}
            </span>
            <div className="flex text-[#FF705E] mt-2 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-[#FF705E]" />
              ))}
            </div>
            <span className="text-xs text-[#58413e] font-semibold mt-1">
              Out of {clinicData.reputation.ratingScale.toFixed(1)}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd7f3] text-[#55284F] font-semibold text-xs w-fit self-center sm:self-start">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#55284F]" />
              <span>{clinicData.reputation.verifiedLabel}</span>
            </span>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1d1b17] tracking-tight">
              {clinicData.reputation.reviewCount} Google Reviews
            </h3>

            <p className="font-body text-sm sm:text-base text-[#58413e] max-w-lg leading-relaxed">
              Serving patients across Sargasan, Gandhinagar, and surrounding areas with gentle, transparent clinical care.
            </p>
          </div>
        </div>

        {/* Action Link to Google Reviews */}
        <div className="w-full sm:w-auto flex justify-center shrink-0">
          <a
            href={clinicData.links.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#55284F] text-white font-semibold text-sm sm:text-base hover:bg-[#330930] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#55284F]"
          >
            <span>Read Our Google Reviews</span>
            <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
