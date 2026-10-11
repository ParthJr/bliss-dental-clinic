import React, { useRef, useEffect } from 'react';
import { clinicData } from '../config/clinicData';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(detailsCardRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: detailsCardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(mapCardRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: mapCardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-20 bg-[#fef8f1]"
      aria-label="Location and Contact Information"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#FF705E] font-bold">
            Visit Our Sargasan Clinic
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1d1b17] tracking-tight">
            Come Say Hello.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Clinic Details Card */}
          <div
            ref={detailsCardRef}
            className="lg:col-span-5 bg-[#f9f3ec] p-6 sm:p-10 rounded-3xl flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(85,40,79,0.06)] border border-[#ede7e0]"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <span className="font-display font-bold text-2xl text-[#55284F]">
                  {clinicData.name}
                </span>
                <span className="font-body text-sm sm:text-base text-[#58413e] font-medium">
                  {clinicData.descriptor}
                </span>
              </div>

              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffdad5] text-[#ab3327] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#FF705E]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#1d1b17]">Address</span>
                  <p className="text-[#58413e] text-sm mt-0.5 leading-relaxed">
                    {clinicData.address.full}
                  </p>
                </div>
              </div>

              {/* Phone item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffd7f3] text-[#55284F] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-[#55284F]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#1d1b17]">Phone Contact</span>
                  <a
                    href={clinicData.phone.telUri}
                    className="text-[#ab3327] font-bold text-base hover:underline mt-0.5"
                  >
                    {clinicData.phone.display}
                  </a>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ffdad5] text-[#ab3327] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-[#FF705E]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#1d1b17]">Operating Hours</span>
                  <p className="text-[#58413e] text-sm mt-0.5">
                    {clinicData.hours.weekdaySaturday}
                  </p>
                  <p className="text-[#58413e]/80 text-xs mt-0.5 font-medium">
                    {clinicData.hours.sunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-8 border-t border-[#ede7e0] mt-6">
              <a
                href={clinicData.phone.telUri}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF705E] text-white font-semibold text-sm shadow-sm hover:bg-[#ab3327] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call {clinicData.phone.display}</span>
              </a>

              <a
                href={clinicData.links.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#55284F] text-white font-semibold text-sm shadow-sm hover:bg-[#330930] transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Stylized Map View Card */}
          <div
            ref={mapCardRef}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(85,40,79,0.06)] relative min-h-[360px] sm:min-h-[420px] flex items-center justify-center border border-[#ede7e0] group"
          >
            {/* Map visual image */}
            <div
              className="w-full h-full min-h-[380px] bg-cover bg-center rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA81tWAdLz_Vecozt6sQi7-0zqwFOirMWJntWbcnh79gxBUh2vGp6LcZ3_nZAJneis06iB_YPV2b6yot52ajnftz4_FuPnzW91NttE3ekMzQhw7ucmGIqQyWnu7W3c9WHjMtwa6jINfU12QHC3l2LUVVrQY87FuLfMaQY9e8HoxU3H72Vx0dMDloxlBGmZNJc0-2wE1tcK7R_ayPbsj-PmBBu5tlUMeBNvjgEfcUtrU3hH5h8pIOziv')",
              }}
            >
              {/* Soft overlay gradient */}
              <div className="w-full h-full bg-[#55284F]/5 backdrop-brightness-[0.98]" />
            </div>

            {/* Location Map Overlay Pin Card */}
            <a
              href={clinicData.links.googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 px-5 rounded-2xl shadow-xl flex items-center gap-4 border border-[#ede7e0] hover:bg-white transition-all max-w-md group/card"
            >
              <div className="w-11 h-11 rounded-full bg-[#FF705E] text-white flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#1d1b17] group-hover/card:text-[#FF705E] transition-colors">
                  <span>Pramukh Horizon-2, Sargasan</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </div>
                <span className="text-xs text-[#58413e] mt-0.5">
                  {clinicData.address.accessibilityNotes}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
