import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { StarIcon } from './Icons';
import { Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { gsap } from 'gsap';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const reputationRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const ambientBlob1Ref = useRef<HTMLDivElement>(null);
  const ambientBlob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Ambient blobs subtle entrance
      tl.from([ambientBlob1Ref.current, ambientBlob2Ref.current], {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
      }, 0);

      // Eyebrow reveal
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.6,
      }, 0.1);

      // Headline line by line reveal
      tl.from([headlineLine1Ref.current, headlineLine2Ref.current], {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.18,
      }, 0.2);

      // Supporting copy fade & translate
      tl.from(copyRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, 0.5);

      // CTA buttons stagger
      if (ctaGroupRef.current) {
        tl.from(ctaGroupRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.12,
        }, 0.65);
      }

      // Reputation badge reveal
      tl.from(reputationRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
      }, 0.8);

      // Hero image soft reveal
      tl.from(imageWrapperRef.current, {
        opacity: 0,
        scale: 0.94,
        clipPath: 'inset(10% 10% 10% 10% round 48px)',
        duration: 1,
      }, 0.3);

      // Floating strip
      tl.from(floatingBadgeRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.7,
      }, 0.85);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-12 pt-8 pb-16 lg:py-20 bg-[#fef8f1]"
    >
      {/* Ambient Organic Blobs */}
      <div
        ref={ambientBlob1Ref}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#ffd7f3] opacity-40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        ref={ambientBlob2Ref}
        className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#ffdad5] opacity-40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Eyebrow Pill */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffdad5] text-[#55284F] font-semibold text-xs uppercase tracking-wider shadow-sm border border-[#FF705E]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF705E] animate-pulse" aria-hidden="true" />
            <span>Bliss Dental Clinic · Sargasan</span>
          </div>

          {/* Oversized Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1d1b17] tracking-tight leading-[1.12]">
            <span ref={headlineLine1Ref} className="block">
              Love Your Smile.
            </span>
            <span
              ref={headlineLine2Ref}
              className="block font-serif italic font-normal text-[#55284F] mt-1"
            >
              Feel Like You.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            ref={copyRef}
            className="font-body text-base sm:text-lg text-[#58413e] max-w-xl leading-relaxed"
          >
            Explore dental care options, understand your choices, and take the next step toward a healthier smile in a comforting, boutique setting.
          </p>

          {/* Action Buttons */}
          <div
            ref={ctaGroupRef}
            className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('treatments')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FF705E] text-white font-semibold text-base shadow-[0_12px_28px_-6px_rgba(255,112,94,0.38)] hover:bg-[#ab3327] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF705E]"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#f3ede6] text-[#55284F] font-semibold text-base hover:bg-[#ede7e0] hover:text-[#1d1b17] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#55284F]"
            >
              Request a Visit
            </button>
          </div>

          {/* Reputation Indicator Badge */}
          <div
            ref={reputationRef}
            className="inline-flex items-center gap-4 p-2.5 pr-5 rounded-full bg-[#f9f3ec] border border-[#ede7e0] shadow-[0_10px_30px_-10px_rgba(85,40,79,0.07)]"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffdad5] text-[#ab3327]">
              <StarIcon className="w-5 h-5 text-[#FF705E]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#1d1b17]">
                <span>{clinicData.reputation.rating} ★</span>
                <span className="text-[#58413e] font-normal">
                  · {clinicData.reputation.reviewCount} {clinicData.reputation.platform} reviews
                </span>
              </div>
              <span className="text-xs text-[#58413e]/80 font-medium">
                {clinicData.reputation.verifiedLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Visual Composition */}
        <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
          {/* Organic Backdrop Elements */}
          <div
            className="absolute -inset-4 rounded-full bg-[#f1b4e3]/30 blur-2xl transform -rotate-6"
            aria-hidden="true"
          />
          <div
            className="absolute w-72 h-72 rounded-full bg-[#FF705E]/15 -bottom-8 -right-8 pointer-events-none"
            aria-hidden="true"
          />

          {/* Main Portrait Image Card */}
          <div
            ref={imageWrapperRef}
            className="relative w-full max-w-md aspect-square rounded-[48px] overflow-hidden shadow-[0_20px_40px_-12px_rgba(85,40,79,0.18)] bg-[#ede7e0] border-4 border-white"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnS5it3uxF0PKLlVlVzYo7iU_x37BmQVaACBuvpnMFJ71QF85hhCuIq5SC3_fF0FfLhEZBq5FWQDwCymgUpNYUuA7lrAABO2XHhRM7FnmLC7DZfQ_AO1Dx4ivvPTEHLfHCF9DYVtjbFqoF2dzOpkYYW6v3-xb-TrzF3RI6ShyeXNwzuIuKPkVVBTBbT7Ft91pcjVsIJa2kXOAAswOFmaUOoCpNcMs-PyZYHmVYElRl_J6gPJmCEeTc"
              alt="Comfortable, smiling patient at Bliss Dental Clinic in Sargasan"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Resilient fallback if CDN image cannot be loaded
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'p-8', 'text-center', 'bg-gradient-to-br', 'from-[#ffdad5]', 'to-[#f9f3ec]');
                  const fallback = document.createElement('div');
                  fallback.className = 'text-[#55284F] flex flex-col items-center gap-3';
                  fallback.innerHTML = `
                    <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#FF705E] shadow-sm">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                    </div>
                    <p class="font-bold text-lg">Bliss Dental Clinic</p>
                    <p class="text-xs text-[#58413e]">Boutique Care in Sargasan, Gandhinagar</p>
                  `;
                  target.parentElement.appendChild(fallback);
                }
              }}
            />
          </div>

          {/* Floating Information Strip */}
          <div
            ref={floatingBadgeRef}
            className="absolute -bottom-5 sm:-bottom-6 left-2 sm:left-6 right-2 sm:right-auto bg-white/95 backdrop-blur-md py-3 px-5 sm:px-6 rounded-full shadow-[0_16px_32px_-8px_rgba(85,40,79,0.15)] flex items-center gap-2.5 border border-[#ede7e0]"
          >
            <Sparkles className="w-5 h-5 text-[#FF705E] shrink-0" aria-hidden="true" />
            <span className="font-semibold text-xs sm:text-sm text-[#55284F] whitespace-nowrap">
              Personalized care · Warm, relaxed atmosphere
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
