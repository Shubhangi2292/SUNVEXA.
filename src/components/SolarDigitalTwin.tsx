import React, { useState } from 'react';
import { Sun, Cpu, Home, Battery, Cable, ArrowRight, Zap, Sliders, Activity, Sparkles } from 'lucide-react';

export const SolarDigitalTwin: React.FC = () => {
  // Interactive Parameters
  const [systemSizeKW, setSystemSizeKW] = useState<number>(5.5);
  const [batteryCapKWh, setBatteryCapKWh] = useState<number>(10.2);
  const [homeUsageKW, setHomeUsageKW] = useState<number>(2.4);

  // Derived simulated calculations (midday sun condition)
  const solarGenKW = Math.round(systemSizeKW * 0.78 * 10) / 10; // ~78% irradiance peak
  const excessPowerKW = Math.max(0, Math.round((solarGenKW - homeUsageKW) * 10) / 10);
  const deficitPowerKW = Math.max(0, Math.round((homeUsageKW - solarGenKW) * 10) / 10);
  
  // Battery state simulation
  const batteryLevelPct = batteryCapKWh > 0 ? 82 : 0;
  const batteryChargingKW = batteryCapKWh > 0 ? Math.min(3.0, excessPowerKW) : 0;
  const gridExportKW = Math.max(0, Math.round((excessPowerKW - batteryChargingKW) * 10) / 10);
  const gridImportKW = deficitPowerKW;

  const estDailyGenKWh = Math.round(systemSizeKW * 4.3);

  return (
    <section id="digital-twin" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="bg-[#121c17]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        
        {/* Ambient Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4ff33]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
              <Activity className="w-3.5 h-3.5" /> Interactive System Simulation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Solar Digital Twin — "Your Solar System"
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Visualize real-time energy flows between sunlight, rooftop solar panels, inverter conversion, home consumption, battery storage, and the utility power grid.
            </p>
            <span className="inline-block mt-2 text-[11px] text-[#d4ff33] bg-[#d4ff33]/10 px-3 py-0.5 rounded-full border border-[#d4ff33]/30">
              Estimated / Simulated Hardware Data
            </span>
          </div>

          {/* Interactive Sliders Control Panel */}
          <div className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-white/80">Solar System Capacity:</span>
                <span className="text-[#d4ff33] font-bold">{systemSizeKW} kW</span>
              </div>
              <input 
                type="range"
                min="3.0"
                max="15.0"
                step="0.5"
                value={systemSizeKW}
                onChange={(e) => setSystemSizeKW(Number(e.target.value))}
                className="w-full accent-[#d4ff33] cursor-pointer"
              />
              <span className="text-[10px] text-white/40 block mt-1">Est. Daily Output: ~{estDailyGenKWh} kWh/day</span>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-white/80">Battery Bank Capacity:</span>
                <span className="text-cyan-400 font-bold">{batteryCapKWh} kWh</span>
              </div>
              <input 
                type="range"
                min="0"
                max="20"
                step="2.5"
                value={batteryCapKWh}
                onChange={(e) => setBatteryCapKWh(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-white/40 block mt-1">
                {batteryCapKWh > 0 ? `Active Battery (${batteryLevelPct}% Charged)` : 'No Battery Configured'}
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-white/80">Home Power Load:</span>
                <span className="text-emerald-400 font-bold">{homeUsageKW} kW</span>
              </div>
              <input 
                type="range"
                min="0.8"
                max="8.0"
                step="0.2"
                value={homeUsageKW}
                onChange={(e) => setHomeUsageKW(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <span className="text-[10px] text-white/40 block mt-1">Simulated Household Consumption</span>
            </div>
          </div>

          {/* Graphical Energy Flow Schematic Diagram */}
          <div className="bg-[#0a110d]/90 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative">
            
            {/* Top Row: Sun & Solar Panels */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400 mb-2 animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <Sun className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold text-amber-300">SUNLIGHT IRRADIANCE</span>
              <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 to-[#d4ff33] my-1" />
              
              <div className="bg-white/10 border border-[#d4ff33]/40 px-6 py-3 rounded-2xl text-center backdrop-blur-md shadow-xl min-w-[200px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4ff33] block">SOLAR PANELS</span>
                <span className="text-xl font-black text-white">{solarGenKW} kW</span>
                <span className="text-[10px] text-white/60 block">{systemSizeKW} kW Capacity Array</span>
              </div>
            </div>

            {/* Middle Row: Inverter Center Hub */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1c2922] border-2 border-[#d4ff33] p-5 rounded-2xl text-center shadow-[0_0_25px_rgba(212,255,51,0.2)] min-w-[220px]">
                <div className="w-10 h-10 rounded-xl bg-[#d4ff33]/20 border border-[#d4ff33]/50 mx-auto flex items-center justify-center text-[#d4ff33] mb-1">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white block">SMART INVERTER</span>
                <span className="text-[11px] text-[#d4ff33] font-semibold block">Converting DC → AC</span>
              </div>
            </div>

            {/* Bottom Row: Home, Battery, and Grid Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              
              {/* Home Node */}
              <div className="bg-white/10 border border-emerald-500/40 p-4 rounded-2xl backdrop-blur-md relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white block">HOME CONSUMPTION</span>
                <span className="text-lg font-black text-emerald-400">{homeUsageKW} kW</span>
                <span className="text-[10px] text-white/60 block">Active Property Load</span>
              </div>

              {/* Battery Node */}
              <div className="bg-white/10 border border-cyan-400/40 p-4 rounded-2xl backdrop-blur-md relative">
                <div className="w-10 h-10 rounded-full bg-cyan-400/20 text-cyan-400 mx-auto flex items-center justify-center mb-2">
                  <Battery className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xs font-bold text-white block">BATTERY BANK</span>
                <span className="text-lg font-black text-cyan-400">
                  {batteryCapKWh > 0 ? `${batteryLevelPct}%` : '0% (N/A)'}
                </span>
                <span className="text-[10px] text-white/60 block">
                  {batteryChargingKW > 0 ? `Charging +${batteryChargingKW} kW` : 'Standby / Discharging'}
                </span>
              </div>

              {/* Grid Node */}
              <div className="bg-white/10 border border-amber-400/40 p-4 rounded-2xl backdrop-blur-md relative">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center mb-2">
                  <Cable className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white block">UTILITY GRID</span>
                <span className="text-lg font-black text-amber-400">
                  {gridExportKW > 0 ? `+${gridExportKW} kW (Export)` : gridImportKW > 0 ? `-${gridImportKW} kW (Import)` : '0 kW (Net Zero)'}
                </span>
                <span className="text-[10px] text-white/60 block">Net Metering Connection</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
