import React, { useState } from 'react';
import { 
  Sun, 
  ChevronDown, 
  ArrowRight, 
  Zap, 
  Award, 
  ShieldCheck, 
  DollarSign, 
  Leaf, 
  Home, 
  Check, 
  Star, 
  X, 
  Calculator, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Battery,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function App() {
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [monthlyBill, setMonthlyBill] = useState(250);
  const [homeSize, setHomeSize] = useState('medium');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'residential',
    monthlyBill: '$200 - $300',
    zipCode: ''
  });

  // Calculate solar estimates
  const estimated25YrSavings = Math.round(monthlyBill * 12 * 25 * 0.75);
  const estimatedCo2Reduction = Math.round(monthlyBill * 0.45); // Tons
  const equivalentTrees = Math.round(estimatedCo2Reduction * 15);
  const paybackYears = (monthlyBill > 350) ? 4.5 : (monthlyBill > 200) ? 5.8 : 7.2;

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setIsQuoteModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: 'residential',
        monthlyBill: '$200 - $300',
        zipCode: ''
      });
    }, 2500);
  };

  const accordionItems = [
    {
      id: 0,
      title: "Massive Savings",
      icon: DollarSign,
      img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop",
      bullets: [
        "Save 70% – 90% on monthly electricity bills",
        "Lock in energy costs for 25+ years against inflation",
        "Increase home equity value by $15,000+ on average"
      ]
    },
    {
      id: 1,
      title: "Environmental Impact",
      icon: Leaf,
      img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=800&auto=format&fit=crop",
      bullets: [
        "Reduce household carbon footprint by up to 80%",
        "Equivalent to planting 150+ mature trees every year",
        "Support clean, sustainable 100% renewable grid energy"
      ]
    },
    {
      id: 2,
      title: "Increase Home Value",
      icon: Home,
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      bullets: [
        "Boost total property valuation by 4% – 6% instantly",
        "Solar-equipped homes sell 20% faster than average",
        "Highly attractive feature for eco-conscious home buyers"
      ]
    },
    {
      id: 3,
      title: "Energy Independence",
      icon: Zap,
      img: "https://images.unsplash.com/photo-1584279893976-1e66c9ff99a5?q=80&w=800&auto=format&fit=crop",
      bullets: [
        "Eliminate reliance on volatile traditional utility companies",
        "Complete protection against sudden rate spikes and surges",
        "Seamless emergency backup power with integrated storage"
      ]
    },
    {
      id: 4,
      title: "Reliable Technology",
      icon: ShieldCheck,
      img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop",
      bullets: [
        "Comprehensive 25-year manufacturer performance warranty",
        "Retains over 90% operational efficiency after 25 years",
        "Weatherproof construction with virtually zero maintenance"
      ]
    }
  ];

  const partners = [
    { name: "Minty", icon: "☘️" },
    { name: "Luminous", icon: "☀️" },
    { name: "Blossom", icon: "🌸" },
    { name: "ICEBERG", icon: "🧊" },
    { name: "Leafe", icon: "🍃" },
    { name: "VoltCore", icon: "⚡" },
    { name: "EcoLife", icon: "🌍" },
    { name: "SolPower", icon: "🔋" }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0a110d] selection:bg-[#d4ff33] selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[92vh] bg-[#121c17] text-white pt-28 pb-16 px-4 md:px-10 flex flex-col justify-center overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-2xl">
        {/* Parallax / Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-overlay pointer-events-none scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2000&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a110d]/60 via-[#121c17]/80 to-[#0a110d] pointer-events-none" />

        {/* Faded Background Watermark Text */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[17vw] font-black text-white/[0.03] whitespace-nowrap select-none pointer-events-none tracking-tighter">
          SOLAR ENERGY
        </div>

        {/* Navigation Bar */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-50">
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 px-4 md:px-6 py-2.5 rounded-full shadow-2xl transition-all hover:bg-white/15">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-white group">
              <div className="w-7 h-7 rounded-full bg-[#d4ff33] flex items-center justify-center shadow-[0_0_15px_rgba(212,255,51,0.5)] transition-transform group-hover:scale-110">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a110d]" />
              </div>
              <span>Sonar</span>
            </a>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/80">
              <a href="#features" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d4ff33] after:transition-all">Features</a>
              <a href="#why-solar" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d4ff33] after:transition-all">Why Solar</a>
              <a href="#benefits" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d4ff33] after:transition-all">Benefits</a>
              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="flex items-center gap-1.5 hover:text-[#d4ff33] transition-colors py-1 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                Calculator
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-semibold text-xs md:text-sm px-4 md:px-5 py-2 rounded-full transition-all shadow-[0_4px_15px_rgba(212,255,51,0.25)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile menu toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`h-0.5 w-full bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 bg-[#121c17]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 flex flex-col gap-3 text-sm text-white/90 shadow-2xl">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-white/10">Features</a>
              <a href="#why-solar" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-white/10">Why Solar</a>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-white/10">Benefits</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsCalculatorOpen(true); }}
                className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/10 text-left text-[#d4ff33]"
              >
                <Calculator className="w-4 h-4" />
                Savings Calculator
              </button>
            </div>
          )}
        </header>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 md:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* User Rating Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-lg">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-[#121c17] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" alt="User 1" />
                <img className="w-8 h-8 rounded-full border-2 border-[#121c17] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop" alt="User 2" />
                <img className="w-8 h-8 rounded-full border-2 border-[#121c17] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop" alt="User 3" />
                <div className="w-8 h-8 rounded-full border-2 border-[#121c17] bg-[#d4ff33] text-[#0a110d] font-bold text-xs flex items-center justify-center">
                  +
                </div>
              </div>
              <div className="text-xs text-white/90">
                <div className="flex text-amber-400 gap-0.5 text-[10px] mb-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <div><span className="font-semibold text-white">90k+</span> Users Worldwide</div>
              </div>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06]">
              Next-Generation <br className="hidden sm:inline" />
              Solar Energy <br className="hidden sm:inline" />
              <span className="font-serif-italic font-normal text-[#d4ff33] italic">Solutions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/80 max-w-xl font-normal leading-relaxed">
              Delivering reliable, eco-friendly solar solutions designed to reduce energy costs while minimizing environmental impact. Power your sustainable home today.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-base px-7 py-4 rounded-full transition-all shadow-[0_10px_30px_rgba(212,255,51,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Explore Innovation</span>
                <Zap className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
              </button>

              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-base px-6 py-4 rounded-full transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#d4ff33]" />
                <span>Estimate Savings</span>
              </button>
            </div>
          </div>

          {/* Right Hero Column: Glass Cards & Metrics */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-8">
            
            {/* Glass Cards Row */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl text-white transition-all hover:-translate-y-1.5 hover:bg-white/15 hover:border-[#d4ff33]/50 group shadow-xl">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#d4ff33] mb-1.5 tracking-tight group-hover:scale-105 transition-transform origin-left">
                  35%
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-snug">
                  Reduced Carbon <br /> Footprint
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl text-white transition-all hover:-translate-y-1.5 hover:bg-white/15 hover:border-[#d4ff33]/50 group shadow-xl">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#d4ff33] mb-1.5 tracking-tight group-hover:scale-105 transition-transform origin-left">
                  25%
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-snug">
                  Reduced Electricity <br /> Expense
                </p>
              </div>

            </div>

            {/* Metrics & Awards */}
            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full border-t border-white/10 pt-6">
              
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <span className="text-2xl font-bold text-white mb-2 group-hover:text-[#d4ff33] transition-colors">7.9X</span>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2 group-hover:border-[#d4ff33] group-hover:bg-[#d4ff33]/10 transition-all">
                  <Award className="w-5 h-5 text-[#d4ff33]" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 max-w-[100px] leading-tight">
                  GreenTech Award 2023
                </p>
              </div>

              <div className="flex flex-col items-center text-center group cursor-pointer">
                <span className="text-2xl font-bold text-white mb-2 group-hover:text-[#d4ff33] transition-colors">5.0X</span>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2 group-hover:border-[#d4ff33] group-hover:bg-[#d4ff33]/10 transition-all">
                  <Award className="w-5 h-5 text-[#d4ff33]" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 max-w-[100px] leading-tight">
                  GreenTech Award 2024
                </p>
              </div>

              <div className="flex flex-col items-center text-center group cursor-pointer">
                <span className="text-2xl font-bold text-white mb-2 group-hover:text-[#d4ff33] transition-colors">1.2X</span>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2 group-hover:border-[#d4ff33] group-hover:bg-[#d4ff33]/10 transition-all">
                  <Award className="w-5 h-5 text-[#d4ff33]" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-white/60 max-w-[100px] leading-tight">
                  GreenTech Award 2025
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- DYNAMIC LOGOS MARQUEE --- */}
      <section className="py-12 border-b border-gray-100 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Trusted by top global agriculture & energy leaders
          </p>
        </div>

        {/* Marquee container with edge masks */}
        <div className="relative w-full overflow-hidden py-2 mask-gradient">
          <div className="animate-scroll">
            {/* First Set */}
            {partners.concat(partners).concat(partners).map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-8 py-2 text-gray-400 font-bold text-lg hover:text-[#0a110d] transition-colors cursor-pointer select-none group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">{item.icon}</span>
                <span className="tracking-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE SECTION --- */}
      <section id="why-solar" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-14">
          <div className="md:col-span-7">
            <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#0a110d] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Proven Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a110d] tracking-tight leading-tight">
              Why 50,000+ Homeowners And Companies Choose Solar Energy
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-gray-600 text-base leading-relaxed">
              Discover the life-changing benefits of switching to clean solar power. From massive financial savings to total grid independence, solar is the smartest long-term investment for your modern property.
            </p>
          </div>
        </div>

        {/* 3-Image Grid showcasing solar technology */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Grid Item 1 */}
          <div className="group relative h-96 rounded-3xl overflow-hidden shadow-md transition-all hover:shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800&auto=format&fit=crop" 
              alt="Residential Solar Installation" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs font-bold text-[#d4ff33] uppercase tracking-wider mb-1">Residential</span>
              <h3 className="text-xl font-bold mb-1">Smart Roof Integrations</h3>
              <p className="text-xs text-white/80 line-clamp-2">High-efficiency sleek rooftop panel setups engineered for maximum sunlight absorption.</p>
            </div>
          </div>

          {/* Grid Item 2 */}
          <div className="group relative h-96 rounded-3xl overflow-hidden shadow-md transition-all hover:shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=800&auto=format&fit=crop" 
              alt="Solar Technology close up" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs font-bold text-[#d4ff33] uppercase tracking-wider mb-1">Technology</span>
              <h3 className="text-xl font-bold mb-1">Monocrystalline Cells</h3>
              <p className="text-xs text-white/80 line-clamp-2">Next-gen multi-busbar solar cells ensuring peak performance even on cloudy days.</p>
            </div>
          </div>

          {/* Grid Item 3 */}
          <div className="group relative h-96 rounded-3xl overflow-hidden shadow-md transition-all hover:shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop" 
              alt="Clean green environment" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs font-bold text-[#d4ff33] uppercase tracking-wider mb-1">Sustainability</span>
              <h3 className="text-xl font-bold mb-1">Zero-Emission Future</h3>
              <p className="text-xs text-white/80 line-clamp-2">Drastically cut household carbon emissions and power clean eco-communities.</p>
            </div>
          </div>

        </div>

      </section>

      {/* --- BENEFITS ACCORDION SECTION --- */}
      <section id="benefits" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Key Advantages</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a110d]">
            Everything You Gain With Sonar
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {accordionItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAccordion === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveAccordion(item.id)}
                className={`relative rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 border ${
                  isActive 
                    ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a] shadow-xl py-8 md:py-10' 
                    : 'bg-[#f4f7f5] hover:bg-[#eaefe8] text-[#0a110d] border-transparent'
                }`}
              >
                {/* Floating Preview Image for Active Item */}
                {isActive && (
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white pointer-events-none animate-float z-20">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  
                  {/* Left Title & Icon */}
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                      isActive ? 'bg-white text-[#0a110d] scale-105' : 'bg-white text-[#0a110d] border border-gray-200'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ChevronRight className={`w-6 h-6 transition-transform ${isActive ? 'rotate-90 text-[#0a110d]' : 'text-gray-400'}`} />
                      <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isActive ? 'font-extrabold' : ''}`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bullet points on the right */}
                  <div className="md:max-w-md w-full">
                    <ul className="space-y-2.5">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base leading-snug">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isActive ? 'bg-[#0a110d]' : 'bg-gray-400'}`} />
                          <span className={isActive ? 'font-semibold text-[#0a110d]' : 'text-gray-600'}>
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- SOLAR SAVINGS CALCULATOR CALLOUT BANNER --- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#121c17] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none hidden md:block"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop')` }}
          />

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4ff33] text-[#0a110d] text-xs font-bold uppercase rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Estimator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              How Much Can You Save With Solar Power?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8 leading-relaxed">
              Use our real-time solar calculator to estimate your 25-year financial savings, CO2 offset, and return on investment timeline.
            </p>

            <button 
              onClick={() => setIsCalculatorOpen(true)}
              className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold px-8 py-4 rounded-full transition-all shadow-[0_10px_25px_rgba(212,255,51,0.2)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              <span>Launch Solar Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0a110d] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            
            {/* Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
                <div className="w-7 h-7 rounded-full bg-[#d4ff33] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a110d]" />
                </div>
                <span>Sonar</span>
              </div>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                Empowering homes and businesses across the globe with next-generation solar energy technology, clean battery storage, and zero-emission solutions.
              </p>
              <div className="flex items-center gap-4 text-xs text-white/50 pt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#d4ff33]" /> Palo Alto, CA</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#d4ff33]" /> +1 (800) 555-SONAR</span>
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-sm font-semibold text-[#d4ff33] tracking-wider uppercase">Solutions</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Residential Solar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Commercial Solar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Battery Storage</a></li>
                <li><a href="#" className="hover:text-white transition-colors">EV Chargers</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h4 className="text-sm font-semibold text-[#d4ff33] tracking-wider uppercase">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-semibold text-[#d4ff33] tracking-wider uppercase">Stay Updated</h4>
              <p className="text-xs text-white/60">Subscribe to our newsletter for the latest solar tech news.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Sonar updates!'); }} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter email..." 
                  required
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33] w-full"
                />
                <button type="submit" className="bg-[#d4ff33] text-[#0a110d] font-bold px-4 py-2 rounded-full text-xs hover:bg-[#bce61a] transition-colors shrink-0">
                  Join
                </button>
              </form>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} Sonar Energy Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Warranty Info</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- MODAL: CALCULATOR --- */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121c17] text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsCalculatorOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" /> Real-time Estimator
            </div>
            <h3 className="text-2xl font-bold mb-1">Solar Savings Calculator</h3>
            <p className="text-xs text-white/70 mb-6">Adjust your current monthly electricity bill to calculate potential savings.</p>

            <div className="space-y-6">
              {/* Slider */}
              <div>
                <div className="flex justify-between items-center text-sm font-medium mb-2">
                  <span>Current Monthly Electricity Bill:</span>
                  <span className="text-[#d4ff33] font-bold text-lg">${monthlyBill}/mo</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  step="25"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-[#d4ff33] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>$50/mo</span>
                  <span>$500/mo</span>
                  <span>$1,000/mo</span>
                </div>
              </div>

              {/* Calculated Stats Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">25-Year Net Savings</span>
                  <span className="text-2xl font-extrabold text-[#d4ff33]">${estimated25YrSavings.toLocaleString()}</span>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Estimated Payback Period</span>
                  <span className="text-2xl font-extrabold text-white">{paybackYears} Years</span>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">CO2 Offset</span>
                  <span className="text-xl font-bold text-white">{estimatedCo2Reduction} Tons</span>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Trees Planted Equivalent</span>
                  <span className="text-xl font-bold text-white">{equivalentTrees} Trees</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsCalculatorOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3.5 rounded-full text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Get a Customized Roof Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: GET STARTED / CUSTOM QUOTE --- */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121c17] text-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#d4ff33] text-[#0a110d] rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Proposal Request Received!</h3>
                <p className="text-sm text-white/70">
                  Thank you, <span className="text-[#d4ff33] font-semibold">{formData.name}</span>! One of our solar energy specialists will contact you within 24 hours with your custom roof design and savings proposal.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider mb-1">
                  <Zap className="w-4 h-4 fill-current" /> Free Solar Assessment
                </div>
                <h3 className="text-2xl font-bold mb-1">Get Your Solar Quote</h3>
                <p className="text-xs text-white/70 mb-6">Zero commitment. Find out how much you can save.</p>

                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="sarah@example.com"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">Phone</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="(555) 000-0000"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">Property Type</label>
                      <select 
                        value={formData.propertyType}
                        onChange={e => setFormData({...formData, propertyType: e.target.value})}
                        className="w-full bg-[#1c2922] border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4ff33]"
                      >
                        <option value="residential">Single Family Home</option>
                        <option value="commercial">Commercial Business</option>
                        <option value="agricultural">Agricultural / Farm</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">ZIP Code</label>
                      <input 
                        type="text" 
                        required
                        value={formData.zipCode}
                        onChange={e => setFormData({...formData, zipCode: e.target.value})}
                        placeholder="94301"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3.5 rounded-full text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Request Free Custom Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
