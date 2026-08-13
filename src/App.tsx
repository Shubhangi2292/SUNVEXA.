import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
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
  MapPin,
  User,
  LogIn,
  ShoppingCart,
  Layers,
  HelpCircle,
  PackageCheck,
  Bot,
  Activity,
  Camera,
  Wrench,
  Clock
} from 'lucide-react';
import { ScrollCanvas } from './ScrollCanvas';

// Solar Data & E-Commerce Components
import { SOLAR_PRODUCTS, SolarProduct } from './data/solarProducts';
import { SolarProductsCatalog } from './components/SolarProductsCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { SolarQuizModal } from './components/SolarQuizModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { BuyNowCheckoutModal } from './components/BuyNowCheckoutModal';
import { CustomerReviews } from './components/CustomerReviews';

// 5 Advanced Unique Solar Feature Components
import { SolarDigitalTwin } from './components/SolarDigitalTwin';
import { EnergySimulator24H } from './components/EnergySimulator24H';
import { RoofAnalysis } from './components/RoofAnalysis';
import { BuildSolarSystem } from './components/BuildSolarSystem';
import { SolarCopilotModal } from './components/SolarCopilotModal';

// Platform Extension Components
import { AuthModal, UserData } from './components/AuthModal';
import { UserDashboard } from './components/UserDashboard';
import { SolarPanelTypes } from './components/SolarPanelTypes';
import { HowSolarWorks } from './components/HowSolarWorks';
import { InstallationProcess } from './components/InstallationProcess';
import { SolarCalculator } from './components/SolarCalculator';
import { SolarSolutions } from './components/SolarSolutions';
import { BatteryStorage } from './components/BatteryStorage';
import { SolarComponents } from './components/SolarComponents';
import { FAQSection } from './components/FAQSection';
import { ContactQuoteSection } from './components/ContactQuoteSection';

export default function App() {
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [monthlyBill, setMonthlyBill] = useState(250);
  const [homeSize, setHomeSize] = useState('medium');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme Mode State: 'dark' (default) or 'light'
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Authentication & Dashboard State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedSolutionType, setSelectedSolutionType] = useState('residential');

  // E-Commerce Modals & Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SolarProduct | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);

  // Feature 2: AI Solar Copilot State
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

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
  const estimatedCo2Reduction = Math.round(monthlyBill * 0.45);
  const equivalentTrees = Math.round(estimatedCo2Reduction * 15);
  const paybackYears = (monthlyBill > 350) ? 4.5 : (monthlyBill > 200) ? 5.8 : 7.2;

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Cart Handlers
  const handleAddToCart = (product: SolarProduct, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Buy Now Dedicated Flow State
  const [buyNowProduct, setBuyNowProduct] = useState<SolarProduct | null>(null);
  const [buyNowQuantity, setBuyNowQuantity] = useState<number>(1);
  const [isBuyNowCheckoutOpen, setIsBuyNowCheckoutOpen] = useState<boolean>(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('SNR-849201');

  const handleBuyNow = (product: SolarProduct, quantity: number = 1) => {
    setBuyNowProduct(product);
    setBuyNowQuantity(quantity);
    setIsBuyNowCheckoutOpen(true);
  };

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

  const handleOpenSolutionQuote = (type: string) => {
    setSelectedSolutionType(type.toLowerCase());
    setIsQuoteModalOpen(true);
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
    <div className={`relative min-h-screen selection:bg-[#d4ff33] selection:text-black transition-colors duration-500 ${theme === 'light' ? 'bg-[#f4f7f4] text-[#0a110d]' : 'bg-transparent text-white'
      }`}>

      {/* Dynamic Scroll-Based Video Animation Background (PRESERVED EXACTLY) */}
      <ScrollCanvas />

      {/* Main Page Content Layer */}
      <div className="relative z-10">

        {/* --- HERO SECTION --- */}
        <section className={`relative min-h-[92vh] backdrop-blur-md pt-28 pb-16 px-4 md:px-10 flex flex-col justify-center overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-2xl border-b transition-colors duration-500 ${theme === 'light'
            ? 'bg-[#ffffff]/80 text-[#0a110d] border-black/10'
            : 'bg-[#121c17]/65 text-white border-white/10'
          }`}>

          <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${theme === 'light'
              ? 'bg-gradient-to-b from-[#ffffff]/90 via-[#f4f7f4]/70 to-[#e5ebe5]/90'
              : 'bg-gradient-to-b from-[#0a110d]/80 via-[#121c17]/60 to-[#0a110d]/90'
            }`} />

          {/* Faded Background Watermark Text */}
          <div className={`absolute top-12 left-1/2 -translate-x-1/2 text-[14vw] font-black whitespace-nowrap select-none pointer-events-none tracking-tighter transition-colors duration-500 ${theme === 'light' ? 'text-black/[0.04]' : 'text-white/[0.03]'
            }`}>
            SOLAR ENERGY
          </div>

          {/* Extended Navigation Bar */}
          <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
            <div className={`flex items-center justify-between backdrop-blur-xl px-4 md:px-6 py-2.5 rounded-full shadow-2xl transition-all ${theme === 'light'
                ? 'bg-white/90 border border-black/10 text-[#0a110d] hover:bg-white'
                : 'bg-[#0a110d]/85 border border-white/20 text-white hover:bg-[#0a110d]/95'
              }`}>
              {/* Logo */}
              <a href="#" className="flex items-center gap-2.5 font-bold text-lg tracking-tight group">
                <div className="w-7 h-7 rounded-full bg-[#d4ff33] flex items-center justify-center shadow-[0_0_15px_rgba(212,255,51,0.5)] transition-transform group-hover:scale-110">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a110d]" />
                </div>
                <span className={theme === 'light' ? 'text-[#0a110d]' : 'text-white'}>SUNVEXA</span>
              </a>

              {/* Nav Links */}
              <nav className={`hidden xl:flex items-center gap-4 text-xs font-medium ${theme === 'light' ? 'text-[#0a110d]/80' : 'text-white/80'
                }`}>
                <a href="#" className="hover:text-[#d4ff33] transition-colors py-1">Home</a>
                <a href="#digital-twin" className="hover:text-[#d4ff33] transition-colors py-1 font-semibold text-[#d4ff33]">Digital Twin</a>
                <a href="#simulator-24h" className="hover:text-[#d4ff33] transition-colors py-1">24H Sim</a>
                <a href="#roof-analysis" className="hover:text-[#d4ff33] transition-colors py-1">Roof AI</a>
                <a href="#build-system" className="hover:text-[#d4ff33] transition-colors py-1 font-semibold text-[#d4ff33]">Build System</a>
                <a href="#products" className="hover:text-[#d4ff33] transition-colors py-1 font-semibold">Products</a>
                <a href="#solutions" className="hover:text-[#d4ff33] transition-colors py-1">Solutions</a>
                <a href="#calculator" className="hover:text-[#d4ff33] transition-colors py-1">Calculator</a>
                <button onClick={() => setIsComparisonOpen(true)} className="hover:text-[#d4ff33] transition-colors py-1 cursor-pointer">Compare</button>
                <a href="#faq" className="hover:text-[#d4ff33] transition-colors py-1">FAQ</a>
              </nav>

              {/* Header Action Buttons: Theme Toggle + Cart + Login */}
              <div className="flex items-center gap-2">

                {/* Dark / Light Mode Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-all cursor-pointer ${theme === 'light'
                      ? 'bg-black/10 text-[#0a110d] hover:bg-black/20'
                      : 'bg-white/10 text-amber-300 hover:bg-white/20'
                    }`}
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#0a110d]" />
                  )}
                </button>

                {/* Cart Icon Counter Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`relative p-2 rounded-full transition-all cursor-pointer ${theme === 'light' ? 'bg-black/10 text-[#0a110d] hover:bg-black/20' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  title="Shopping Cart"
                >
                  <ShoppingCart className="w-4 h-4 text-[#d4ff33]" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4ff33] text-[#0a110d] font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-lg">
                      {cartItems.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </button>

                {/* Login / Customer Portal Button */}
                {currentUser ? (
                  <button
                    onClick={() => setIsDashboardOpen(true)}
                    className={`flex items-center gap-2 font-semibold text-xs px-3.5 py-2 rounded-full border transition-all cursor-pointer ${theme === 'light'
                        ? 'bg-black/10 text-[#0a110d] border-black/20 hover:bg-black/20'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#d4ff33] text-[#0a110d] font-bold flex items-center justify-center text-[10px]">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span>Portal</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAuthInitialMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className={`flex items-center gap-1.5 font-semibold text-xs px-3 py-2 rounded-full border transition-all cursor-pointer ${theme === 'light'
                        ? 'bg-black/10 text-[#0a110d] border-black/20 hover:bg-black/20'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#d4ff33]" />
                    <span>Login</span>
                  </button>
                )}

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
                  className="xl:hidden p-2"
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
              <div className={`xl:hidden mt-3 backdrop-blur-2xl border rounded-2xl p-4 flex flex-col gap-2.5 text-xs shadow-2xl ${theme === 'light' ? 'bg-white/95 border-black/10 text-[#0a110d]' : 'bg-[#121c17]/95 border-white/20 text-white'
                }`}>
                <a href="#digital-twin" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-[#d4ff33]/10 text-[#d4ff33] font-bold">Solar Digital Twin</a>
                <a href="#simulator-24h" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-black/10">24-Hour Energy Simulator</a>
                <a href="#roof-analysis" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-black/10">Analyze My Roof AI</a>
                <a href="#build-system" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-black/10 text-[#d4ff33]">Build Your Solar System</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-black/10">Solar Products Catalog</a>
                <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-black/10">Solutions</a>
                <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-black/10">Savings Calculator</a>
                <button onClick={() => { setMobileMenuOpen(false); setIsCopilotOpen(true); }} className="py-2 px-3 rounded-lg hover:bg-black/10 text-left text-[#d4ff33] font-bold">AI Solar Copilot</button>
              </div>
            )}
          </header>

          {/* Hero Main Content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">

            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

              {/* Display Headline */}
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] ${theme === 'light' ? 'text-[#0a110d]' : 'text-white'
                }`}>
                Next-Generation <br className="hidden sm:inline" />
                Solar Energy <br className="hidden sm:inline" />
                <span className="font-serif-italic font-normal text-[#d4ff33] italic">Solutions</span>
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${theme === 'light' ? 'text-[#0a110d]/80' : 'text-white/80'
                }`}>
                <strong className="text-[#d4ff33] block text-lg font-bold mb-1">Smarter Solar. Brighter Future.</strong>
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
                  className={`border font-medium text-base px-6 py-4 rounded-full transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer ${theme === 'light' ? 'bg-black/5 text-[#0a110d] border-black/15 hover:bg-black/10' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                >
                  <Calculator className="w-4 h-4 text-[#d4ff33]" />
                  <span>Estimate Savings</span>
                </button>

                <button
                  onClick={() => setIsCopilotOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-[#d4ff33] border border-[#d4ff33]/40 font-bold text-base px-6 py-4 rounded-full transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Bot className="w-4 h-4" />
                  <span>AI Copilot</span>
                </button>
              </div>
            </div>

            {/* Right Hero Column: Glass Cards & Metrics */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-8">
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className={`backdrop-blur-xl border p-5 rounded-2xl transition-all hover:-translate-y-1.5 hover:border-[#d4ff33]/50 group shadow-xl ${theme === 'light' ? 'bg-white/80 border-black/10 text-[#0a110d]' : 'bg-white/10 border-white/20 text-white'
                  }`}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#d4ff33] mb-1.5 tracking-tight group-hover:scale-105 transition-transform origin-left">
                    35%
                  </div>
                  <p className="text-xs sm:text-sm leading-snug">
                    Reduced Carbon <br /> Footprint
                  </p>
                </div>

                <div className={`backdrop-blur-xl border p-5 rounded-2xl transition-all hover:-translate-y-1.5 hover:border-[#d4ff33]/50 group shadow-xl ${theme === 'light' ? 'bg-white/80 border-black/10 text-[#0a110d]' : 'bg-white/10 border-white/20 text-white'
                  }`}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#d4ff33] mb-1.5 tracking-tight group-hover:scale-105 transition-transform origin-left">
                    25%
                  </div>
                  <p className="text-xs sm:text-sm leading-snug">
                    Reduced Electricity <br /> Expense
                  </p>
                </div>
              </div>

              {/* Metrics & Awards */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full border-t border-white/10 pt-6">
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <span className="text-2xl font-bold mb-2 group-hover:text-[#d4ff33] transition-colors">7.9X</span>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2 group-hover:border-[#d4ff33] group-hover:bg-[#d4ff33]/10 transition-all">
                    <Award className="w-5 h-5 text-[#d4ff33]" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 max-w-[100px] leading-tight">
                    GreenTech Award 2023
                  </p>
                </div>

                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <span className="text-2xl font-bold mb-2 group-hover:text-[#d4ff33] transition-colors">5.0X</span>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2 group-hover:border-[#d4ff33] group-hover:bg-[#d4ff33]/10 transition-all">
                    <Award className="w-5 h-5 text-[#d4ff33]" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 max-w-[100px] leading-tight">
                    GreenTech Award 2024
                  </p>
                </div>

                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <span className="text-2xl font-bold mb-2 group-hover:text-[#d4ff33] transition-colors">1.2X</span>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2 group-hover:border-[#d4ff33] group-hover:bg-[#d4ff33]/10 transition-all">
                    <Award className="w-5 h-5 text-[#d4ff33]" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 max-w-[100px] leading-tight">
                    GreenTech Award 2025
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* --- DYNAMIC LOGOS MARQUEE --- */}
        <section className={`py-12 border-b overflow-hidden backdrop-blur-md transition-colors duration-500 ${theme === 'light' ? 'bg-white/80 border-black/10 text-[#0a110d]' : 'bg-[#0a110d]/85 border-white/10 text-white'
          }`}>
          <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-60">
              Trusted by top global agriculture & energy leaders
            </p>
          </div>

          <div className="relative w-full overflow-hidden py-2 mask-gradient">
            <div className="animate-scroll">
              {partners.concat(partners).concat(partners).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-8 py-2 font-bold text-lg opacity-70 hover:text-[#d4ff33] hover:opacity-100 transition-all cursor-pointer select-none group"
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-14">
            <div className="md:col-span-7">
              <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
                Proven Excellence
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Why 50,000+ Homeowners And Companies Choose Solar Energy
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="opacity-80 text-base leading-relaxed">
                Discover the life-changing benefits of switching to clean solar power. From massive financial savings to total grid independence, solar is the smartest long-term investment for your modern property.
              </p>
            </div>
          </div>

          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#121c17]/60 backdrop-blur-md transition-all hover:shadow-2xl hover:border-[#d4ff33]/50">
              <img
                src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800&auto=format&fit=crop"
                alt="Residential Solar Installation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a110d]/90 via-[#0a110d]/40 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold text-[#d4ff33] uppercase tracking-wider mb-1">Residential</span>
                <h3 className="text-xl font-bold mb-1">Smart Roof Integrations</h3>
                <p className="text-xs text-white/80 line-clamp-2">High-efficiency sleek rooftop panel setups engineered for maximum sunlight absorption.</p>
              </div>
            </div>

            <div className="group relative h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#121c17]/60 backdrop-blur-md transition-all hover:shadow-2xl hover:border-[#d4ff33]/50">
              <img
                src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=800&auto=format&fit=crop"
                alt="Solar Technology close up"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a110d]/90 via-[#0a110d]/40 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold text-[#d4ff33] uppercase tracking-wider mb-1">Technology</span>
                <h3 className="text-xl font-bold mb-1">Monocrystalline Cells</h3>
                <p className="text-xs text-white/80 line-clamp-2">Next-gen multi-busbar solar cells ensuring peak performance even on cloudy days.</p>
              </div>
            </div>

            <div className="group relative h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#121c17]/60 backdrop-blur-md transition-all hover:shadow-2xl hover:border-[#d4ff33]/50">
              <img
                src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop"
                alt="Clean green environment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a110d]/90 via-[#0a110d]/40 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold text-[#d4ff33] uppercase tracking-wider mb-1">Sustainability</span>
                <h3 className="text-xl font-bold mb-1">Zero-Emission Future</h3>
                <p className="text-xs text-white/80 line-clamp-2">Drastically cut household carbon emissions and power clean eco-communities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURE 1: SOLAR DIGITAL TWIN --- */}
        <SolarDigitalTwin />

        {/* --- FEATURE 5: 24-HOUR ENERGY SIMULATOR --- */}
        <EnergySimulator24H />

        {/* --- HOW SOLAR WORKS --- */}
        <HowSolarWorks />

        {/* --- FEATURE 3: ROOF ANALYSIS --- */}
        <RoofAnalysis />

        {/* --- FEATURE 4: BUILD YOUR SOLAR SYSTEM --- */}
        <BuildSolarSystem
          onAddToCart={(product, qty) => handleAddToCart(product, qty)}
          onRequestQuote={() => setIsQuoteModalOpen(true)}
        />

        {/* --- E-COMMERCE PRODUCTS CATALOG --- */}
        <SolarProductsCatalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* --- SOLAR PANEL TYPES --- */}
        <SolarPanelTypes />

        {/* --- INSTALLATION PROCESS ROADMAP --- */}
        <InstallationProcess />

        {/* --- SOLUTIONS --- */}
        <SolarSolutions onOpenQuote={handleOpenSolutionQuote} />

        {/* --- BATTERY STORAGE EDUCATION --- */}
        <BatteryStorage />

        {/* --- SOLAR HARDWARE COMPONENTS --- */}
        <SolarComponents />

        {/* --- SOLAR CALCULATOR WITH RECOMMENDED PRODUCTS --- */}
        <SolarCalculator
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* --- VERIFIED CUSTOMER REVIEWS --- */}
        <CustomerReviews />

        {/* --- FAQ SECTION --- */}
        <FAQSection />

        {/* --- CONTACT & GET A QUOTE FORM --- */}
        <ContactQuoteSection defaultPropertyType={selectedSolutionType} />

        {/* --- FOOTER --- */}
        <footer className={`backdrop-blur-xl pt-16 pb-12 border-t transition-colors duration-500 ${theme === 'light' ? 'bg-white/90 border-black/10 text-[#0a110d]' : 'bg-[#0a110d]/95 border-white/10 text-white'
          }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

              {/* Brand Info */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
                  <div className="w-7 h-7 rounded-full bg-[#d4ff33] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a110d]" />
                  </div>
                  <span>SUNVEXA</span>
                </div>
                <p className="opacity-60 text-sm max-w-sm leading-relaxed">
                  Empowering homes and businesses across the globe with next-generation solar energy technology, clean battery storage, and zero-emission solutions.
                </p>
                <div className="flex items-center gap-4 text-xs opacity-50 pt-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#d4ff33]" /> Mumbai, Maharashtra, India</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#d4ff33]" /> +91 98765 43210</span>
                </div>
              </div>

              {/* Links Columns */}
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-sm font-semibold text-[#d4ff33] tracking-wider uppercase">Products</h4>
                <ul className="space-y-2 text-sm opacity-70">
                  <li><a href="#products" className="hover:text-[#d4ff33] transition-colors">Solar Panels</a></li>
                  <li><a href="#products" className="hover:text-[#d4ff33] transition-colors">Solar Inverters</a></li>
                  <li><a href="#battery-storage" className="hover:text-[#d4ff33] transition-colors">Batteries</a></li>
                  <li><a href="#build-system" className="hover:text-[#d4ff33] transition-colors">Build Custom System</a></li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-3">
                <h4 className="text-sm font-semibold text-[#d4ff33] tracking-wider uppercase">Platform</h4>
                <ul className="space-y-2 text-sm opacity-70">
                  <li><a href="#digital-twin" className="hover:text-[#d4ff33] transition-colors">Solar Digital Twin</a></li>
                  <li><a href="#simulator-24h" className="hover:text-[#d4ff33] transition-colors">24H Energy Simulator</a></li>
                  <li><a href="#roof-analysis" className="hover:text-[#d4ff33] transition-colors">Roof AI Analysis</a></li>
                  <li><a href="#calculator" className="hover:text-[#d4ff33] transition-colors">ROI Calculator</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="text-sm font-semibold text-[#d4ff33] tracking-wider uppercase">Stay Updated</h4>
                <p className="text-xs opacity-60">Subscribe to our newsletter for the latest solar tech news.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to SUNVEXA updates!'); }} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email..."
                    required
                    className={`border rounded-full px-4 py-2 text-xs placeholder-white/40 focus:outline-none focus:border-[#d4ff33] w-full ${theme === 'light' ? 'bg-black/5 border-black/15 text-[#0a110d]' : 'bg-white/10 border-white/20 text-white'
                      }`}
                  />
                  <button type="submit" className="bg-[#d4ff33] text-[#0a110d] font-bold px-4 py-2 rounded-full text-xs hover:bg-[#bce61a] transition-colors shrink-0">
                    Join
                  </button>
                </form>
              </div>

            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-50">
              <p>© {new Date().getFullYear()} SUNVEXA Energy Technologies Inc. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#d4ff33] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#d4ff33] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#d4ff33] transition-colors">Warranty Info</a>
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* --- FEATURE 2: FLOATING AI SOLAR COPILOT TRIGGER BUTTON --- */}
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-extrabold text-xs px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(212,255,51,0.4)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border-2 border-[#0a110d] cursor-pointer"
      >
        <Bot className="w-4 h-4" />
        <span>☀️ Solar Copilot</span>
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
      </button>

      {/* --- MODALS & DRAWERS --- */}

      {/* Feature 2: Solar Copilot Drawer */}
      <SolarCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty) => handleAddToCart(product, qty)}
        onBuyNow={(product, qty) => handleBuyNow(product, qty)}
        onRequestInstall={(product) => {
          setSelectedProduct(null);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Product Comparison Matrix Modal */}
      <ProductComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      {/* Solar Quiz Wizard Modal */}
      <SolarQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsOrderTrackingOpen(true);
        }}
      />

      {/* Dedicated Buy Now Solar Multi-step Checkout Modal */}
      <BuyNowCheckoutModal
        product={buyNowProduct}
        initialQuantity={buyNowQuantity}
        isOpen={isBuyNowCheckoutOpen}
        onClose={() => setIsBuyNowCheckoutOpen(false)}
        onTrackOrder={(orderId) => {
          setTrackingOrderId(orderId);
          setIsBuyNowCheckoutOpen(false);
          setIsOrderTrackingOpen(true);
        }}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        orderId={trackingOrderId}
      />

      {/* Auth Modal (Login / Signup) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authInitialMode}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsDashboardOpen(true);
        }}
      />

      {/* Customer Portal Dashboard */}
      <UserDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setIsDashboardOpen(false);
        }}
        onTrackOrder={() => {
          setIsDashboardOpen(false);
          setIsOrderTrackingOpen(true);
        }}
        onViewCart={() => {
          setIsDashboardOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Calculator Quick Modal */}
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
                  Thank you, <span className="text-[#d4ff33] font-semibold">{formData.name || 'Customer'}</span>! One of our solar energy specialists will contact you within 24 hours with your custom roof design and savings proposal.
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
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">Property Type</label>
                      <select
                        value={selectedSolutionType || formData.propertyType}
                        onChange={e => {
                          setSelectedSolutionType(e.target.value);
                          setFormData({ ...formData, propertyType: e.target.value });
                        }}
                        className="w-full bg-[#1c2922] border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4ff33]"
                      >
                        <option value="residential">Single Family Home</option>
                        <option value="commercial">Commercial Business</option>
                        <option value="industrial">Agricultural / Industrial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">ZIP / Pincode</label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
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
