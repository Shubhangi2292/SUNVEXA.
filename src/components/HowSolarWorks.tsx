import React, { useState } from 'react';
import { Sun, Zap, Cpu, Home, BatteryCharging, ArrowRight, Play, CheckCircle } from 'lucide-react';

export const HowSolarWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'Sunlight',
      subtitle: 'Photons hit the rooftop solar panels',
      icon: Sun,
      color: 'text-amber-400',
      description: 'Sunlight containing energy particles (photons) radiates onto the silicon solar panels installed on your rooftop.',
      detail: 'Photons from natural sunlight penetrate the anti-reflective glass surface and collide with silicon semiconductor atoms within the PV cells.'
    },
    {
      step: '02',
      title: 'Photovoltaic Effect',
      subtitle: 'Sunlight converted into DC electricity',
      icon: Zap,
      color: 'text-[#d4ff33]',
      description: 'The solar cells absorb photons, knocking electrons loose to create a continuous flow of Direct Current (DC) electricity.',
      detail: 'Positive (P-type) and negative (N-type) silicon semiconductor layers establish an internal electrical field that directs free electrons into conductive wiring.'
    },
    {
      step: '03',
      title: 'Inverter Conversion',
      subtitle: 'DC converted to usable AC electricity',
      icon: Cpu,
      color: 'text-cyan-400',
      description: 'The smart solar inverter transforms raw DC power into 230V Alternating Current (AC) electricity compatible with standard appliances.',
      detail: 'Advanced micro-inverters or string inverters continuously synchronize voltage, frequency, and phase to match household power standards seamlessly.'
    },
    {
      step: '04',
      title: 'Home & Business Powering',
      subtitle: 'Electricity powers appliances & equipment',
      icon: Home,
      color: 'text-emerald-400',
      description: 'AC electricity passes through your main breaker panel to power lights, HVAC, refrigeration, computers, and EV charging.',
      detail: 'Your property automatically uses free solar power first, reducing reliance on expensive utility grid electricity in real time.'
    },
    {
      step: '05',
      title: 'Battery Storage & Grid Export',
      subtitle: 'Excess power stored or credited to grid',
      icon: BatteryCharging,
      color: 'text-[#d4ff33]',
      description: 'Surplus energy generated during peak sunny hours charges your home battery bank or feeds back to the utility grid for net metering credits.',
      detail: 'During nighttime or power outages, your stored battery reserves instantly supply power, ensuring uninterrupted 24/7 energy independence.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Interactive Solar Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          How Solar Energy Works
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          From photon absorption on your roof to powering your everyday appliances, follow the 5-stage transformation of clean solar energy.
        </p>
      </div>

      {/* Interactive Step Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                isActive 
                  ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a] shadow-2xl scale-105 z-10 font-bold' 
                  : 'bg-[#121c17]/60 backdrop-blur-md text-white border-white/15 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${isActive ? 'text-[#0a110d]' : 'text-[#d4ff33]'}`}>
                  {s.step}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#0a110d]' : s.color}`} />
              </div>

              <div>
                <span className="text-xs font-bold block leading-tight">{s.title}</span>
                <span className={`text-[10px] block line-clamp-1 ${isActive ? 'text-[#0a110d]/80' : 'text-white/60'}`}>
                  {s.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Feature Card */}
      <div className="bg-[#121c17]/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#d4ff33]/10 to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-[#d4ff33]">
                STAGE {steps[activeStep].step}
              </span>
              <span className="h-6 w-[1px] bg-white/20" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                {steps[activeStep].subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              {steps[activeStep].title}
            </h3>

            <p className="text-base text-white/90 leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-xs text-white/80 leading-relaxed flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#d4ff33] shrink-0 mt-0.5" />
              <span>{steps[activeStep].detail}</span>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button 
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Next Stage ({steps[(activeStep + 1) % steps.length].title})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Icon Visualization Display */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center p-6 text-center shadow-2xl relative group">
              <div className="w-20 h-20 rounded-full bg-[#d4ff33]/20 border border-[#d4ff33]/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {React.createElement(steps[activeStep].icon, { className: "w-10 h-10 text-[#d4ff33]" })}
              </div>
              <span className="text-xs font-bold text-white">{steps[activeStep].title}</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
