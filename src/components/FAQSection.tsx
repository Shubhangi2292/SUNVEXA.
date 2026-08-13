import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do solar panels work?',
      a: 'Solar panels absorb natural sunlight using photovoltaic (PV) semiconductor cells made of silicon. Sunlight knocks electrons loose within the cells, producing Direct Current (DC) electricity, which an inverter transforms into standard Alternating Current (AC) electricity for your property.'
    },
    {
      q: 'How many solar panels do I need?',
      a: 'The number of solar panels depends on your average monthly electricity consumption (kWh), rooftop solar irradiance, and panel wattage (e.g. 450W). A standard 5 kW residential system typically requires 11 to 12 panels occupying around 350 – 450 sq ft of roof space.'
    },
    {
      q: 'How long do solar panels last?',
      a: 'Tier-1 monocrystalline solar panels are engineered to last 25 to 30+ years. All SUNVEXA installations include a 25-year linear performance warranty guaranteeing panels retain over 85% of original efficiency after 25 years.'
    },
    {
      q: 'Do solar panels work on cloudy days?',
      a: 'Yes. Solar panels generate electricity using visible light particles (photons) rather than direct heat. While output on overcast days is typically 15% to 30% of peak capacity, panels continue producing power throughout daylight hours.'
    },
    {
      q: 'What happens at night?',
      a: 'Since solar panels require sunlight, generation stops at night. If your system includes a battery storage bank, it seamlessly supplies stored daytime energy. If connected to the utility grid without a battery, power is drawn from the grid automatically.'
    },
    {
      q: 'Do I need a battery?',
      a: 'A battery is optional but recommended if you experience frequent grid power outages or want 100% nighttime self-sufficiency. If your utility offers favorable net metering credits, a grid-tied system without a battery can also achieve full financial bill elimination.'
    },
    {
      q: 'How much roof space is required?',
      a: 'Each 450W panel requires approximately 22 – 25 sq ft of unshaded roof space. A standard 3 kW home setup needs around 250 sq ft, while a 5 kW setup requires approximately 450 sq ft.'
    },
    {
      q: 'How long does installation take?',
      a: 'Physical rooftop mounting and electrical wiring for a residential system typically takes 1 to 2 days. Permitting, utility interconnection approval, and net meter commissioning usually take 1 to 3 weeks depending on your local discom.'
    },
    {
      q: 'What maintenance is required?',
      a: 'Solar panels have no moving parts and require minimal maintenance. Occasional cleaning with fresh water every 3 to 6 months to clear dust, pollen, or leaves is sufficient to maintain optimal generation.'
    },
    {
      q: 'Can solar panels reduce my electricity bill?',
      a: 'Yes. A properly sized rooftop solar system can offset 70% to 90%+ of your monthly electricity bill. Through net metering, excess daytime electricity generated is fed back to the discom grid to offset nighttime power consumption.'
    }
  ];

  return (
    <section id="faq" className="py-20 max-w-5xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          Everything you need to know about solar installation, panel efficiency, battery backup, and electricity savings.
        </p>
      </div>

      {/* Expandable Accordion Cards */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                isOpen 
                  ? 'bg-[#121c17]/90 border-[#d4ff33]/50 shadow-2xl' 
                  : 'bg-[#121c17]/60 border-white/15 hover:bg-[#121c17]/80'
              }`}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#d4ff33]' : 'text-white/40'}`} />
                  <span>{faq.q}</span>
                </h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                  isOpen ? 'bg-[#d4ff33] text-[#0a110d] rotate-180' : 'bg-white/10 text-white'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/10 mt-1">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
