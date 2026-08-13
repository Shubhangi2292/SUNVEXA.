import React, { useState } from 'react';
import { Home, Building2, Factory, Sun, Cpu, Battery, Wrench, Check, ArrowRight, ShoppingCart, Sparkles } from 'lucide-react';
import { SOLAR_PRODUCTS, SolarProduct } from '../data/solarProducts';

interface BuildSolarSystemProps {
  onAddToCart: (product: SolarProduct, quantity: number) => void;
  onRequestQuote: () => void;
}

export const BuildSolarSystem: React.FC<BuildSolarSystemProps> = ({
  onAddToCart,
  onRequestQuote
}) => {
  const [property, setProperty] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [panelWattage, setPanelWattage] = useState<number>(550); // 450W, 550W, 600W
  const [panelCount, setPanelCount] = useState<number>(9);
  const [inverterType, setInverterType] = useState<'On-grid' | 'Off-grid' | 'Hybrid'>('Hybrid');
  const [batteryOption, setBatteryOption] = useState<'No Battery' | '5 kWh' | '10.2 kWh'>('10.2 kWh');
  const [installOption, setInstallOption] = useState<'Full Package' | 'Product Only'>('Full Package');

  // System Calculations
  const systemKW = Math.round((panelCount * panelWattage / 1000) * 100) / 100;
  
  // Cost calculations (demo pricing)
  const panelUnitCost = panelWattage === 600 ? 18500 : panelWattage === 550 ? 16490 : 11200;
  const panelsTotalCost = panelCount * panelUnitCost;
  
  const inverterCost = inverterType === 'Hybrid' ? 68500 : inverterType === 'On-grid' ? 45000 : 55000;
  const batteryCost = batteryOption === '10.2 kWh' ? 185000 : batteryOption === '5 kWh' ? 95000 : 0;
  const installCost = installOption === 'Full Package' ? 25000 : 0;

  const totalCostRupees = panelsTotalCost + inverterCost + batteryCost + installCost;
  const annualGenKWh = Math.round(systemKW * 1450);
  const annualSavingsRupees = Math.round(annualGenKWh * 8.0 * 0.9);

  const handleAddSystemToCart = () => {
    const customSystemProduct: SolarProduct = {
      id: `custom-sys-${Date.now()}`,
      name: `Custom ${systemKW}kW Solar System (${panelCount} × ${panelWattage}W + ${inverterType})`,
      category: 'systems',
      price: totalCostRupees,
      rating: 5.0,
      reviewsCount: 1,
      image: '/assets/panels/monocrystalline.png',
      badge: 'Custom Configuration',
      power: `${systemKW} kW`,
      capacity: `${panelCount} Panels`,
      warranty: '25-Year System Warranty',
      availability: 'In Stock',
      description: `Configured system: ${panelCount} × ${panelWattage}W Panels, ${inverterType} Inverter, ${batteryOption} Battery Storage, and ${installOption}.`,
      specs: {
        'Total Capacity': `${systemKW} kW`,
        'Panels': `${panelCount} × ${panelWattage}W`,
        'Inverter': inverterType,
        'Battery Storage': batteryOption,
        'Service Level': installOption
      },
      bestUse: `Customized for ${property} power offset.`
    };

    onAddToCart(customSystemProduct, 1);
  };

  return (
    <section id="build-system" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="bg-[#121c17]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
            <Wrench className="w-3.5 h-3.5" /> Interactive Customizer
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            "Build Your Solar System"
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Select your property category, panel wattage, inverter architecture, battery bank, and installation options to design your custom solar system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Steps Configuration Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: PROPERTY */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] block">
                STEP 1 — PROPERTY CATEGORY
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {(['Residential', 'Commercial', 'Industrial'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setProperty(p)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      property === p 
                        ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' 
                        : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: SOLAR PANELS */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33]">
                  STEP 2 — SOLAR PANELS ({panelCount} Panels)
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <button 
                    onClick={() => setPanelCount(Math.max(4, panelCount - 1))}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#d4ff33]">{panelCount}</span>
                  <button 
                    onClick={() => setPanelCount(panelCount + 1)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { watt: 450, label: '450W Poly', eff: '17.5%' },
                  { watt: 550, label: '550W Mono', eff: '22.8%' },
                  { watt: 600, label: '600W Bifacial', eff: '23.5%' }
                ].map(w => (
                  <button
                    key={w.watt}
                    onClick={() => setPanelWattage(w.watt)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      panelWattage === w.watt 
                        ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a] font-bold' 
                        : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    <span className="block font-bold text-xs">{w.label}</span>
                    <span className="text-[10px] block opacity-70">Eff: {w.eff}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: INVERTER */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] block">
                STEP 3 — INVERTER ARCHITECTURE
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {(['On-grid', 'Off-grid', 'Hybrid'] as const).map(inv => (
                  <button
                    key={inv}
                    onClick={() => setInverterType(inv)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      inverterType === inv 
                        ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' 
                        : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    {inv}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 4 & 5: BATTERY & INSTALLATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] block">
                  STEP 4 — BATTERY STORAGE
                </span>
                <div className="grid grid-cols-1 gap-2 text-xs font-bold">
                  {(['No Battery', '5 kWh', '10.2 kWh'] as const).map(b => (
                    <button
                      key={b}
                      onClick={() => setBatteryOption(b)}
                      className={`py-2 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                        batteryOption === b 
                          ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' 
                          : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] block">
                  STEP 5 — SERVICE LEVEL
                </span>
                <div className="grid grid-cols-1 gap-2 text-xs font-bold">
                  {(['Full Package', 'Product Only'] as const).map(inst => (
                    <button
                      key={inst}
                      onClick={() => setInstallOption(inst)}
                      className={`py-2 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                        installOption === inst 
                          ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' 
                          : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                      }`}
                    >
                      {inst} {inst === 'Full Package' && '(+Turnkey Install)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Dynamic Summary Card Column */}
          <div className="lg:col-span-5 bg-[#0a110d]/90 p-6 rounded-3xl border border-white/20 shadow-2xl space-y-5 sticky top-28">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-white">YOUR CUSTOM SYSTEM</h3>
              <span className="bg-[#d4ff33] text-[#0a110d] font-black text-xs px-3 py-1 rounded-full">
                {systemKW} kW Capacity
              </span>
            </div>

            {/* List of Configured Components */}
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d4ff33]" />
                <span>☀️ <strong>{panelCount} × {panelWattage}W</strong> Solar Panels</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d4ff33]" />
                <span>⚡ <strong>{inverterType}</strong> Inverter Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d4ff33]" />
                <span>🔋 <strong>{batteryOption}</strong> Battery Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d4ff33]" />
                <span>🔧 Aluminum Mounting Rails & Hardware</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d4ff33]" />
                <span>👷 <strong>{installOption}</strong></span>
              </div>
            </div>

            {/* Dynamic Calculations */}
            <div className="border-t border-b border-white/10 py-4 space-y-2 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Estimated Annual Generation:</span>
                <span className="font-bold text-white">{annualGenKWh.toLocaleString('en-IN')} kWh/yr</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Estimated Annual Savings:</span>
                <span className="font-bold text-emerald-400">₹{annualSavingsRupees.toLocaleString('en-IN')}/yr</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#d4ff33] pt-2 border-t border-white/10">
                <span>Estimated System Price:</span>
                <span>₹{totalCostRupees.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleAddSystemToCart}
                className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3.5 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 fill-current" />
                <span>Add Complete System to Cart</span>
              </button>

              <button
                onClick={onRequestQuote}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-full text-xs transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Roof Proposal</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
