import React from 'react';
import { clinicData, ServiceItem } from '../config/clinicData';
import { ArrowRight, Sparkles, FileText, Smile, Shield, Layers, HandMetal } from 'lucide-react';

interface TreatmentGridProps {
  onSelectService: (serviceId: string) => void;
}

export const TreatmentGrid: React.FC<TreatmentGridProps> = ({ onSelectService }) => {
  const renderIcon = (name: ServiceItem['iconName'], isLight: boolean = false) => {
    const iconClass = `w-6 h-6 ${isLight ? 'text-white' : 'text-[#ab3327]'}`;
    switch (name) {
      case 'notes':
        return <FileText className={iconClass} aria-hidden="true" />;
      case 'whitening':
        return <Sparkles className={`w-6 h-6 ${isLight ? 'text-white' : 'text-[#FF705E]'}`} aria-hidden="true" />;
      case 'smile':
        return <Smile className={`w-6 h-6 ${isLight ? 'text-white' : 'text-[#55284F]'}`} aria-hidden="true" />;
      case 'shield':
        return <Shield className={iconClass} aria-hidden="true" />;
      case 'dentures':
        return <Layers className={`w-6 h-6 ${isLight ? 'text-white' : 'text-[#55284F]'}`} aria-hidden="true" />;
      case 'hygiene':
        return <HandMetal className={`w-6 h-6 ${isLight ? 'text-white' : 'text-[#FF705E]'}`} aria-hidden="true" />;
      default:
        return <Smile className={iconClass} aria-hidden="true" />;
    }
  };

  const getCardClasses = (variant: ServiceItem['cardVariant']) => {
    switch (variant) {
      case 'coral':
        return 'bg-[#FF705E] text-white shadow-[0_16px_32px_-6px_rgba(255,112,94,0.35)]';
      case 'lavender':
        return 'bg-[#E9DDF7] text-[#1f182b] shadow-[0_10px_30px_-10px_rgba(85,40,79,0.06)] border border-[#cdc2db]/40';
      case 'peach':
        return 'bg-[#ffdad5] text-[#1d1b17] shadow-[0_10px_30px_-10px_rgba(85,40,79,0.06)] border border-[#e0bfba]/30';
      case 'ivory':
      default:
        return 'bg-[#f9f3ec] text-[#1d1b17] shadow-[0_10px_30px_-10px_rgba(85,40,79,0.06)] border border-[#ede7e0]';
    }
  };

  return (
    <section
      id="treatments"
      className="w-full px-4 sm:px-6 lg:px-12 py-12 lg:py-20 bg-[#fef8f1]"
      aria-label="Treatments and Services"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#FF705E] font-bold">
              Comprehensive Services
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1d1b17] tracking-tight">
              Find Your Kind of{' '}
              <span className="font-serif italic font-normal text-[#55284F]">
                Smile Care.
              </span>
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#58413e] max-w-md leading-relaxed">
            Tailored oral health solutions focused on preventive integrity, patient comfort, and long-lasting restorative function.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicData.services.map((service) => {
            const isCoralCard = service.cardVariant === 'coral';

            return (
              <div
                key={service.id}
                className={`${service.colSpan || 'lg:col-span-1'} ${getCardClasses(
                  service.cardVariant
                )} p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group`}
              >
                <div className="flex justify-between items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCoralCard ? 'bg-white/20' : 'bg-[#fef8f1] shadow-xs'
                    }`}
                  >
                    {renderIcon(service.iconName, isCoralCard)}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isCoralCard
                        ? 'bg-white/20 text-white'
                        : 'bg-white/80 text-[#55284F]'
                    }`}
                  >
                    {service.tag}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-2.5">
                  <h3
                    className={`font-display font-bold text-xl sm:text-2xl ${
                      isCoralCard ? 'text-white' : 'text-[#1d1b17]'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`font-body text-sm sm:text-base leading-relaxed ${
                      isCoralCard
                        ? 'text-white/90'
                        : service.cardVariant === 'lavender'
                        ? 'text-[#4b4358]'
                        : 'text-[#58413e]'
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.id)}
                      className={`inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded-lg p-0.5 ${
                        isCoralCard
                          ? 'text-white underline underline-offset-4 hover:opacity-90'
                          : 'text-[#55284F] hover:text-[#FF705E]'
                      }`}
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
