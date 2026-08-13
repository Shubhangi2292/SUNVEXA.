import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, Zap, ShieldCheck, ShoppingCart } from 'lucide-react';
import { SOLAR_PRODUCTS, SolarProduct } from '../data/solarProducts';

interface SolarQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: SolarProduct) => void;
  onAddToCart: (product: SolarProduct) => void;
}

export const SolarQuizModal: React.FC<SolarQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart
}) => {
  const [step, setStep] = useState<number>(1);

  // User Quiz Choices
  const [property, setProperty] = useState<'Home' | 'Business' | 'Industrial'>('Home');
  const [bill, setBill] = useState<number>(6500); // ₹
  const [roofArea, setRoofArea] = useState<number>(400); // sq ft
  const [goal, setGoal] = useState<string>('Reduce electricity bills');

  if (!isOpen) return null;

  // Calculate recommendation estimates
  const systemKW = Math.max(2, Math.round((bill / 1200) * 10) / 10);
  const panelCount = Math.ceil((systemKW * 1000) / 550);
  const recommendedPanelType = property === 'Home' ? 'Monocrystalline 550W (Highest Efficiency)' : 'Polycrystalline / Industrial High Output';
  const recommendedInverter = systemKW > 8 ? '10kW On-Grid 3-Phase Inverter' : '6kW Hybrid Smart Inverter';
  const batteryNeeded = goal === 'Backup power' || goal === 'Energy independence';

  // Recommended Products from Catalog
  const recommendedProducts = SOLAR_PRODUCTS.filter(p => {
    if (systemKW >= 5 && p.id === 'sys-res-5k') return true;
    if (p.id === 'panel-mono-550') return true;
    if (batteryNeeded && p.id === 'bat-lfp-10k') return true;
    if (!batteryNeeded && p.id === 'inv-hybrid-6k') return true;
    return false;
  }).slice(0, 3);

  const resetQuiz = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121c17] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={resetQuiz}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" /> AI Solar System Recommendation Wizard
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-1">Find the Right Solar System</h2>
        <p className="text-xs text-white/70 mb-6">Answer 4 quick questions to receive a tailored solar system sizing recommendation.</p>

        {/* Step Progress Bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-[#d4ff33] h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* STEP 1: Property Type */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white">Question 1 of 4: What type of property do you have?</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['Home', 'Business', 'Industrial'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setProperty(p)}
                  className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    property === p 
                      ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a] scale-105 shadow-xl' 
                      : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <button 
                onClick={() => setStep(2)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Monthly Electricity Bill */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white">Question 2 of 4: What is your average monthly electricity bill (₹)?</h3>
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-xs text-white/70">Selected Bill:</span>
                <span className="text-[#d4ff33] font-extrabold text-lg">₹{bill.toLocaleString('en-IN')}/mo</span>
              </div>
              <input 
                type="range"
                min="2000"
                max="80000"
                step="1000"
                value={bill}
                onChange={e => setBill(Number(e.target.value))}
                className="w-full accent-[#d4ff33] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>₹2,000/mo</span>
                <span>₹40,000/mo</span>
                <span>₹80,000/mo</span>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setStep(1)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Rooftop Area */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white">Question 3 of 4: What is your approximate rooftop area (sq ft)?</h3>
            <div>
              <input 
                type="number"
                value={roofArea}
                onChange={e => setRoofArea(Number(e.target.value))}
                placeholder="400"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
              />
              <span className="text-[11px] text-white/50 mt-1 block">Each 1 kW of solar capacity requires approximately 80 – 100 sq. ft of unshaded roof area.</span>
            </div>
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setStep(2)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={() => setStep(4)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Main Solar Goal */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white">Question 4 of 4: What is your primary solar goal?</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Reduce electricity bills',
                'Backup power',
                'Energy independence',
                'Commercial energy savings'
              ].map(g => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`p-4 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer ${
                    goal === g 
                      ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a] shadow-xl' 
                      : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setStep(3)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={() => setStep(5)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Generate Recommendation</span>
                <Zap className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Recommendation Output */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="bg-[#1c2922] p-5 rounded-2xl border border-[#d4ff33]/40 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33]">Tailored Solar Sizing</span>
                <span className="bg-[#d4ff33] text-[#0a110d] font-bold text-[10px] px-2.5 py-0.5 rounded-full">Estimated Sizing</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-white/50 block text-[10px]">System Size</span>
                  <span className="font-extrabold text-[#d4ff33] text-lg">{systemKW} kW</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Panel Count</span>
                  <span className="font-bold text-white text-base">{panelCount} Panels (550W)</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Inverter Type</span>
                  <span className="font-semibold text-white">{recommendedInverter}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Battery Storage</span>
                  <span className="font-semibold text-[#d4ff33]">{batteryNeeded ? 'Recommended (10.2kWh)' : 'Optional'}</span>
                </div>
              </div>
            </div>

            {/* Recommended Products Catalog Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] mb-3">Recommended Products from Catalog</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendedProducts.map(prod => (
                  <div key={prod.id} className="bg-white/10 p-3 rounded-2xl border border-white/15 flex flex-col justify-between">
                    <div>
                      <img src={prod.image} alt={prod.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                      <span className="text-xs font-bold text-white block line-clamp-1">{prod.name}</span>
                      <span className="text-xs font-extrabold text-[#d4ff33]">₹{prod.price.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(prod);
                        resetQuiz();
                      }}
                      className="mt-3 w-full bg-[#d4ff33] text-[#0a110d] font-bold py-1.5 rounded-full text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart className="w-3 h-3 fill-current" /> Add Product
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-white/50 text-center italic">
              "This recommendation is an estimate. Final system design depends on roof orientation, shading, and DISCOM net metering regulations."
            </div>

            <div className="flex justify-center">
              <button 
                onClick={resetQuiz}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-2.5 rounded-full cursor-pointer"
              >
                Close & Return to Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
