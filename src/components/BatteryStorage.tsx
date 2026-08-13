import React from 'react';
import { Sun, Moon, Battery, Zap, Home, ArrowDown, ShieldCheck, AlertCircle } from 'lucide-react';

export const BatteryStorage: React.FC = () => {
  return (
    <section id="battery-storage" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Continuous 24/7 Resilience
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Battery Energy Storage Systems
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          Store daytime solar energy to power your property through the night and maintain uninterrupted emergency power during grid blackouts.
        </p>
      </div>

      {/* Daytime vs Nighttime Flow Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* DAYTIME CARD */}
        <div className="bg-[#121c17]/80 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">DAYTIME OPERATION</span>
                <h3 className="text-lg font-bold text-white">Solar Generation & Battery Charging</h3>
              </div>
            </div>
            <span className="bg-amber-400/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              Peak Sun
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span><strong>01 — Generation:</strong> Solar panels capture sunlight and generate clean DC electricity.</span>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-4 h-4 text-white/40" />
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Home className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>02 — Direct Self-Consumption:</strong> Home or business immediately consumes daytime solar power.</span>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-4 h-4 text-white/40" />
            </div>

            <div className="bg-[#d4ff33]/15 p-4 rounded-2xl border border-[#d4ff33]/30 flex items-center gap-3 text-[#d4ff33]">
              <Battery className="w-5 h-5 fill-current shrink-0" />
              <span><strong>03 — Surplus Charging:</strong> Unused excess electricity automatically charges your battery bank.</span>
            </div>
          </div>
        </div>

        {/* NIGHTTIME CARD */}
        <div className="bg-[#121c17]/80 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">NIGHTTIME OPERATION</span>
                <h3 className="text-lg font-bold text-white">Stored Battery Discharge</h3>
              </div>
            </div>
            <span className="bg-cyan-400/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/30">
              Zero Sun
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Moon className="w-5 h-5 text-cyan-400 shrink-0" />
              <span><strong>01 — Solar Pause:</strong> Solar panel generation decreases or stops after sunset.</span>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-4 h-4 text-white/40" />
            </div>

            <div className="bg-[#d4ff33]/15 p-4 rounded-2xl border border-[#d4ff33]/30 flex items-center gap-3 text-[#d4ff33]">
              <Battery className="w-5 h-5 fill-current shrink-0" />
              <span><strong>02 — Battery Discharge:</strong> Smart battery seamlessly supplies stored energy to your breaker panel.</span>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="w-4 h-4 text-white/40" />
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Home className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>03 — Continuous Powering:</strong> Home continues running lights, fridge, & appliances without grid draw.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Mandatory Configuration Notice */}
      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-white/70 flex items-center gap-3 max-w-2xl mx-auto">
        <AlertCircle className="w-5 h-5 text-[#d4ff33] shrink-0" />
        <span>
          <strong>Configuration Note:</strong> Actual battery charging/discharging behavior depends on your system configuration (Grid-Tied with Storage, Off-Grid, or Hybrid Net Metering setup).
        </span>
      </div>

    </section>
  );
};
