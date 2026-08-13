import React from 'react';
import { Search, Compass, Shield, Wrench, Zap, CheckCircle2 } from 'lucide-react';

export const InstallationProcess: React.FC = () => {
  const steps = [
    {
      number: 'STEP 01',
      title: 'SITE SURVEY',
      icon: Search,
      bullets: [
        'Roof structural integrity & material condition assessment',
        'Available roof area & solar irradiance exposure measurement',
        'Past 12-month electricity consumption tariff evaluation',
        '3D shading simulation (trees, neighboring structures)'
      ]
    },
    {
      number: 'STEP 02',
      title: 'SYSTEM DESIGN',
      icon: Compass,
      bullets: [
        'Exact kW system capacity & panel layout configuration',
        'Selection of Monocrystalline vs. Polycrystalline panels',
        'Inverter sizing (String vs Microinverter setup)',
        'Roof load safety & wind resistance engineering calculations'
      ]
    },
    {
      number: 'STEP 03',
      title: 'MOUNTING STRUCTURE',
      icon: Shield,
      bullets: [
        'Anodized aluminum or HDG steel mounting rail installation',
        'Weatherproof roof flashing & leak-proof sealants',
        'Optimal tilt angle alignment for maximum annual generation',
        'Grounding & lightning protection attachment'
      ]
    },
    {
      number: 'STEP 04',
      title: 'PANEL INSTALLATION',
      icon: Wrench,
      bullets: [
        'Precision mounting of solar panels onto structural rails',
        'Torque-tightened stainless steel clamps & fasteners',
        'DC string wiring connection & conduit protection',
        'Individual panel diode & connection verification'
      ]
    },
    {
      number: 'STEP 05',
      title: 'ELECTRICAL CONNECTION',
      icon: Zap,
      bullets: [
        'Solar Panels → Smart Inverter connection',
        'Inverter → Main AC Electrical Panel integration',
        'Bi-directional Net Meter installation with utility grid',
        'Optional battery storage bank wiring'
      ]
    },
    {
      number: 'STEP 06',
      title: 'TESTING & COMMISSIONING',
      icon: CheckCircle2,
      bullets: [
        'Voltage, polarity, and insulation resistance electrical testing',
        'Inverter boot-up & live Wi-Fi IoT monitoring sync',
        'Utility inspection clearance & net metering approval',
        'Final system handover & customer mobile app walkthrough'
      ]
    }
  ];

  return (
    <section id="installation" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Turnkey Execution Roadmap
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          6-Step Solar Installation Process
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          From initial roof site survey to net metering grid commissioning, our certified engineers handle every detail with precision.
        </p>
      </div>

      {/* 6 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.number}
              className="bg-[#121c17]/70 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl transition-all hover:-translate-y-1.5 hover:border-[#d4ff33]/50 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-black text-[#d4ff33] bg-[#d4ff33]/10 px-3 py-1 rounded-full border border-[#d4ff33]/30">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#d4ff33] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>

                <ul className="space-y-2.5 text-xs text-white/80">
                  {step.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4ff33] shrink-0 mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
