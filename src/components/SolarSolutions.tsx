import React from 'react';
import { Home, Building2, Factory, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface SolarSolutionsProps {
  onOpenQuote: (propertyType: string) => void;
}

export const SolarSolutions: React.FC<SolarSolutionsProps> = ({ onOpenQuote }) => {
  const solutions = [
    {
      type: 'RESIDENTIAL',
      title: 'For Homes, Apartments & Villas',
      icon: Home,
      badge: 'Up to 90% Bill Offsets',
      description: 'Transform your rooftop into a private clean power station. Lock in fixed electricity costs for 25+ years while protecting your family against power grid outages.',
      benefits: [
        'Drastic reduction in monthly electricity bills',
        'Efficient rooftop space utilization & equity boost',
        'Total energy independence from utility grid spikes',
        'Seamless integration with optional battery storage'
      ],
      ctaText: 'Get Residential Quote'
    },
    {
      type: 'COMMERCIAL',
      title: 'For Offices, Shops, Hotels & Warehouses',
      icon: Building2,
      badge: 'Tax Depreciation & ESG Goals',
      description: 'Significantly reduce operating expenses (OpEx) for your commercial enterprise. Leverage accelerated depreciation tax benefits while achieving sustainability metrics.',
      benefits: [
        'Immediate reduction in daytime business overhead',
        '40% accelerated tax depreciation benefit in Year 1',
        'Fulfill Corporate ESG & green building certifications',
        'Zero-down flexible solar lease & PPA options'
      ],
      ctaText: 'Get Commercial Quote'
    },
    {
      type: 'INDUSTRIAL',
      title: 'For Factories & Manufacturing Facilities',
      icon: Factory,
      badge: 'MW-Scale Heavy Offsets',
      description: 'Tailored high-voltage solar solutions designed for energy-intensive industrial complexes, manufacturing plants, logistics hubs, and cold storage units.',
      benefits: [
        'MW-scale solar generation for heavy machinery',
        'Reduction in expensive peak demand surge charges',
        '25-year long-term power purchase price stability',
        'Custom high-load roof mounting & carport structures'
      ],
      ctaText: 'Get Industrial Quote'
    }
  ];

  return (
    <section id="solutions" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Tailored Clean Energy Architecture
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Residential, Commercial & Industrial Solutions
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          Engineered to match the specific power consumption profiles, roof structures, and financial goals of your property.
        </p>
      </div>

      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((sol) => {
          const Icon = sol.icon;
          return (
            <div 
              key={sol.type}
              className="bg-[#121c17]/75 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl transition-all hover:-translate-y-1.5 hover:border-[#d4ff33]/50 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] bg-[#d4ff33]/10 px-3 py-1 rounded-full border border-[#d4ff33]/30">
                    {sol.type}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#d4ff33] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">
                  {sol.title}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {sol.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  {sol.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/90">
                      <Check className="w-4 h-4 text-[#d4ff33] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unique CTA for each category matching #d4ff33 button styling */}
              <button 
                onClick={() => onOpenQuote(sol.type)}
                className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3.5 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{sol.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          );
        })}
      </div>

    </section>
  );
};
