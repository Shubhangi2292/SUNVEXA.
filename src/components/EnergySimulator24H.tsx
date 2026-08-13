import React, { useState } from 'react';
import { Sun, Moon, Zap, Home, Battery, Cable, Clock, Sparkles } from 'lucide-react';

export const EnergySimulator24H: React.FC = () => {
  // Time in minutes (0 to 1439 = 00:00 to 23:59)
  const [timeMinutes, setTimeMinutes] = useState<number>(750); // Default 12:30 PM (750 mins)

  const hours = Math.floor(timeMinutes / 60);
  const mins = timeMinutes % 60;
  const timeFormatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  const isDaytime = hours >= 6 && hours < 18;

  // Calculate dynamic solar curve (bell curve peaking at 12:30 PM)
  let solarGenKW = 0;
  if (isDaytime) {
    const peakProgress = Math.sin(((hours - 6 + mins / 60) / 12) * Math.PI);
    solarGenKW = Math.max(0, Math.round(peakProgress * 5.2 * 10) / 10);
  }

  // Calculate home consumption curve (higher in morning & evening)
  let homeLoadKW = 1.8;
  if (hours >= 7 && hours <= 9) homeLoadKW = 3.2; // Morning rush
  else if (hours >= 18 && hours <= 22) homeLoadKW = 4.1; // Evening AC/TV rush
  else if (isDaytime) homeLoadKW = 2.1;

  // Battery charge simulation state
  let batteryPct = 40;
  if (hours >= 12 && hours < 17) batteryPct = 95;
  else if (hours >= 17 && hours < 22) batteryPct = Math.max(25, 95 - (hours - 17) * 15);
  else if (hours >= 22 || hours < 6) batteryPct = 20;

  // Net power calculations
  const netPowerKW = Math.round((solarGenKW - homeLoadKW) * 10) / 10;
  const isSurplus = netPowerKW > 0;

  return (
    <section id="simulator-24h" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      <div className={`rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl border transition-all duration-700 ${
        isDaytime 
          ? 'bg-gradient-to-b from-[#121c17] via-[#1a2e24] to-[#0a110d] border-amber-400/30' 
          : 'bg-gradient-to-b from-[#0a110d] via-[#091510] to-[#05070a] border-cyan-500/30'
      }`}>
        
        {/* Sky Ambient Glow */}
        {isDaytime ? (
          <div className="absolute top-0 right-10 w-80 h-80 bg-amber-400/20 rounded-full blur-[90px] pointer-events-none" />
        ) : (
          <div className="absolute top-0 right-10 w-80 h-80 bg-cyan-400/15 rounded-full blur-[90px] pointer-events-none" />
        )}

        <div className="relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/10 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-white/15">
              <Clock className="w-3.5 h-3.5" /> 24-Hour Solar Lifecycle
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              "A Day With Solar" — 24-Hour Energy Simulator
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Drag the timeline slider from 00:00 to 23:59 to see how your solar generation, home power consumption, and battery storage adapt across day and night.
            </p>
          </div>

          {/* Timeline Controls & Quick Hour Buttons */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 mb-10 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {isDaytime ? (
                  <div className="w-9 h-9 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center">
                    <Sun className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center">
                    <Moon className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <span className="text-xs text-white/60 block">Selected Simulation Time</span>
                  <span className="text-2xl font-black text-[#d4ff33]">{timeFormatted}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { label: '6 AM', min: 360 },
                  { label: '9 AM', min: 540 },
                  { label: '12 PM', min: 720 },
                  { label: '3 PM', min: 900 },
                  { label: '6 PM', min: 1080 },
                  { label: '9 PM', min: 1260 },
                  { label: '12 AM', min: 0 }
                ].map(b => (
                  <button
                    key={b.label}
                    onClick={() => setTimeMinutes(b.min)}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#d4ff33] hover:text-[#0a110d] text-white/80 text-xs font-bold transition-all cursor-pointer border border-white/10"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <input 
              type="range"
              min="0"
              max="1439"
              value={timeMinutes}
              onChange={(e) => setTimeMinutes(Number(e.target.value))}
              className="w-full accent-[#d4ff33] cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-white/50">
              <span>00:00 (Midnight)</span>
              <span>06:00 (Sunrise)</span>
              <span>12:00 (Midday Peak)</span>
              <span>18:00 (Sunset)</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Real-Time Dashboard Output Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            
            <div className="bg-[#0a110d]/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase block mb-1">Time & Mode</span>
              <span className="text-xl font-extrabold text-white">{timeFormatted}</span>
              <span className="text-[10px] text-[#d4ff33] block mt-0.5">{isDaytime ? 'Daytime Sun' : 'Nighttime Moon'}</span>
            </div>

            <div className="bg-[#0a110d]/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase block mb-1">Solar Generation</span>
              <span className="text-xl font-extrabold text-amber-400">{solarGenKW} kW</span>
              <span className="text-[10px] text-white/40 block mt-0.5">PV Array Output</span>
            </div>

            <div className="bg-[#0a110d]/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase block mb-1">Home Consumption</span>
              <span className="text-xl font-extrabold text-emerald-400">{homeLoadKW} kW</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Active Household Load</span>
            </div>

            <div className="bg-[#0a110d]/80 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase block mb-1">Battery Storage</span>
              <span className="text-xl font-extrabold text-cyan-400">{batteryPct}%</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Charge Level</span>
            </div>

            <div className="bg-[#0a110d]/80 p-4 rounded-2xl border border-white/10 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-white/50 uppercase block mb-1">Grid Interaction</span>
              <span className="text-xl font-extrabold text-[#d4ff33]">
                {isSurplus ? `+${netPowerKW} kW (Export)` : `${netPowerKW} kW (Draw)`}
              </span>
              <span className="text-[10px] text-white/40 block mt-0.5">Net Meter Feed</span>
            </div>

          </div>

          {/* Visual Power Flow Representation */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] mb-3 block">
              Active Power Route at {timeFormatted}
            </span>

            {isDaytime ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold text-white">
                <div className="flex items-center gap-2 bg-amber-400/20 px-4 py-2 rounded-full border border-amber-400/40 text-amber-300">
                  <Sun className="w-4 h-4" /> ☀️ SOLAR ({solarGenKW} kW)
                </div>
                <span>→</span>
                <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-300">
                  <Home className="w-4 h-4" /> 🏠 HOME ({homeLoadKW} kW)
                </div>
                <span>→</span>
                <div className="flex items-center gap-2 bg-cyan-400/20 px-4 py-2 rounded-full border border-cyan-400/40 text-cyan-300">
                  <Battery className="w-4 h-4 fill-current" /> 🔋 BATTERY ({batteryPct}%)
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold text-white">
                <div className="flex items-center gap-2 bg-cyan-400/20 px-4 py-2 rounded-full border border-cyan-400/40 text-cyan-300">
                  <Battery className="w-4 h-4 fill-current" /> 🔋 BATTERY ({batteryPct}%)
                </div>
                <span>→</span>
                <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-300">
                  <Home className="w-4 h-4" /> 🏠 HOME ({homeLoadKW} kW)
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
