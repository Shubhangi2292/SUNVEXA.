import React, { useState } from 'react';
import { Calculator, Sparkles, AlertTriangle, ArrowRight, Zap, DollarSign, Home, MapPin, Grid, ShoppingCart, Eye } from 'lucide-react';
import { SOLAR_PRODUCTS, SolarProduct } from '../data/solarProducts';

interface SolarCalculatorProps {
  onSelectProduct?: (product: SolarProduct) => void;
  onAddToCart?: (product: SolarProduct) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(8500); // ₹
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [location, setLocation] = useState<string>('Mumbai, Maharashtra');
  const [roofArea, setRoofArea] = useState<number>(450); // sq ft

  // Tariff rate per kWh (₹) based on property type
  const tariffRate = propertyType === 'Industrial' ? 9.5 : propertyType === 'Commercial' ? 8.5 : 7.2;

  // Monthly kWh consumption
  const monthlyKWh = Math.round(monthlyBill / tariffRate);

  // Recommended kW system size (approx 1 kW produces 120 kWh/month)
  const recommendedKW = Math.max(1, Math.round((monthlyKWh / 120) * 10) / 10);

  // Approx panels needed (550W panel = 0.55 kW)
  const panelCount = Math.ceil((recommendedKW * 1000) / 550);

  // Estimated annual generation (kWh)
  const annualGenKWh = Math.round(recommendedKW * 1450);

  // Estimated annual savings (₹)
  const annualSavingsRupees = Math.round(annualGenKWh * tariffRate * 0.9);

  // Estimated capital cost (approx ₹48,000 per kW)
  const estCostRupees = Math.round(recommendedKW * 48000);

  // Payback period (years)
  const paybackYears = Math.max(3.2, Math.round((estCostRupees / annualSavingsRupees) * 10) / 10);

  // Filter recommended products based on calculated capacity
  const recommendedPanel = SOLAR_PRODUCTS.find(p => p.id === 'panel-mono-550') || SOLAR_PRODUCTS[0];
  const recommendedSystem = SOLAR_PRODUCTS.find(p => p.id === 'sys-res-5k') || SOLAR_PRODUCTS[SOLAR_PRODUCTS.length - 1];

  return (
    <section id="calculator" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="bg-[#121c17]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 bg-cover bg-center pointer-events-none hidden lg:block"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop')` }}
        />

        <div className="relative z-10">
          
          {/* Header */}
          <div className="max-w-2xl mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4ff33] text-[#0a110d] text-xs font-bold uppercase rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Solar Estimator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Solar Financial Savings Calculator
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Calculate your custom solar capacity, estimated annual electricity savings, and return on investment timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-6 space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
              
              {/* Monthly Bill Input */}
              <div>
                <div className="flex justify-between items-center text-sm font-medium mb-2">
                  <label className="text-xs text-white/80 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#d4ff33]" /> Monthly Electricity Bill (₹)
                  </label>
                  <span className="text-[#d4ff33] font-extrabold text-base">
                    ₹{monthlyBill.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1500" 
                  max="100000" 
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-[#d4ff33] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>₹1,500/mo</span>
                  <span>₹50,000/mo</span>
                  <span>₹1,00,000/mo</span>
                </div>
              </div>

              {/* Property Type Selector */}
              <div>
                <label className="block text-xs font-medium text-white/80 mb-2 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#d4ff33]" /> Property Category
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['Residential', 'Commercial', 'Industrial'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        propertyType === type 
                          ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' 
                          : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Rooftop Area Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d4ff33]" /> Location / City
                  </label>
                  <input 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Pune, MH"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1 flex items-center gap-1">
                    <Grid className="w-3.5 h-3.5 text-[#d4ff33]" /> Rooftop Area (sq ft)
                  </label>
                  <input 
                    type="number"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    placeholder="450"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                  />
                </div>
              </div>

            </div>

            {/* Calculated Output Stats Column */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/15">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Recommended Solar Capacity</span>
                  <span className="text-2xl font-extrabold text-[#d4ff33]">{recommendedKW} kW</span>
                </div>

                <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/15">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Approx. Panels Needed</span>
                  <span className="text-2xl font-extrabold text-white">{panelCount} Panels (550W)</span>
                </div>

                <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/15">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Est. Annual Generation</span>
                  <span className="text-xl font-bold text-white">{annualGenKWh.toLocaleString('en-IN')} kWh</span>
                </div>

                <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/15">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Est. Annual Savings</span>
                  <span className="text-xl font-extrabold text-emerald-400">₹{annualSavingsRupees.toLocaleString('en-IN')}/yr</span>
                </div>
              </div>

              <div className="bg-[#d4ff33]/15 p-4 rounded-2xl border border-[#d4ff33]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/70 block">Estimated Payback Period</span>
                  <span className="text-2xl font-extrabold text-[#d4ff33]">{paybackYears} Years</span>
                </div>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/30">
                  25-Yr Free Power Thereafter
                </span>
              </div>

              {/* Recommended Products for Property */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] block">
                  Recommended Products for Your Property ({recommendedKW} kW)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#121c17] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block line-clamp-1">{recommendedPanel.name}</span>
                      <span className="text-[#d4ff33] font-bold">₹{recommendedPanel.price.toLocaleString('en-IN')}</span>
                    </div>
                    {onSelectProduct && (
                      <button 
                        onClick={() => onSelectProduct(recommendedPanel)}
                        className="bg-[#d4ff33] text-[#0a110d] font-bold px-3 py-1.5 rounded-full text-[10px] cursor-pointer shrink-0"
                      >
                        View Recommended Panels
                      </button>
                    )}
                  </div>

                  <div className="bg-[#121c17] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block line-clamp-1">{recommendedSystem.name}</span>
                      <span className="text-[#d4ff33] font-bold">₹{recommendedSystem.price.toLocaleString('en-IN')}</span>
                    </div>
                    {onSelectProduct && (
                      <button 
                        onClick={() => onSelectProduct(recommendedSystem)}
                        className="bg-[#d4ff33] text-[#0a110d] font-bold px-3 py-1.5 rounded-full text-[10px] cursor-pointer shrink-0"
                      >
                        View Complete System
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Mandatory Disclaimer Requirement */}
              <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 text-[11px] text-amber-200/90 leading-snug flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>These are estimates.</strong> Actual system performance and savings depend on location, electricity tariff, roof orientation, shading, equipment, system design and other factors.
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
