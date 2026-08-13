import React from 'react';
import { Sun, Cpu, Shield, Battery, Activity, Cable } from 'lucide-react';

export const SolarComponents: React.FC = () => {
  const components = [
    {
      title: 'Solar Panels',
      icon: Sun,
      description: 'High-efficiency photovoltaic modules engineered to convert raw solar radiation into Direct Current (DC) electricity.'
    },
    {
      title: 'Inverter',
      icon: Cpu,
      description: 'Smart power electronics that convert DC electricity into standard 230V Alternating Current (AC) electricity for household appliances.'
    },
    {
      title: 'Mounting Structure',
      icon: Shield,
      description: 'Heavy-duty anodized aluminum or steel mounting hardware securing panels to the roof or ground against high wind loads.'
    },
    {
      title: 'Battery Storage',
      icon: Battery,
      description: 'Lithium iron phosphate (LFP) energy storage bank that stores excess daytime power for night use and emergency grid backup.'
    },
    {
      title: 'Monitoring System',
      icon: Activity,
      description: 'IoT mobile app & web interface tracking real-time generation, consumption, grid export, and individual panel health 24/7.'
    },
    {
      title: 'Grid Connection & Net Meter',
      icon: Cable,
      description: 'Bi-directional electric utility meter recording power imported from or exported to the local grid under net metering regulations.'
    }
  ];

  return (
    <section id="components" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Hardware Ecosystem
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Core Solar System Components
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          Every SUNVEXA solar installation integrates Tier-1 certified components for maximum reliability and 25-year operational efficiency.
        </p>
      </div>

      {/* 6 Components Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((c) => {
          const Icon = c.icon;
          return (
            <div 
              key={c.title}
              className="bg-[#121c17]/70 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl transition-all hover:-translate-y-1.5 hover:border-[#d4ff33]/50 group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#d4ff33] mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {c.title}
                </h3>

                <p className="text-xs text-white/75 leading-relaxed">
                  {c.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
