export interface SolarProduct {
  id: string;
  name: string;
  category: 'panels' | 'inverters' | 'batteries' | 'mounting' | 'accessories' | 'systems';
  subCategory?: string;
  price: number; // in ₹
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  power?: string;
  efficiency?: string;
  capacity?: string;
  warranty: string;
  availability: 'In Stock' | 'Limited Stock' | 'Pre-Order';
  description: string;
  specs: {
    [key: string]: string;
  };
  bestUse: string;
}

export const SOLAR_PRODUCTS: SolarProduct[] = [
  // --- PANELS ---
  {
    id: 'panel-mono-550',
    name: 'SUNVEXA Apex 550W Monocrystalline PERC Panel',
    category: 'panels',
    subCategory: 'Monocrystalline',
    price: 16490,
    rating: 4.9,
    reviewsCount: 128,
    image: '/assets/panels/monocrystalline.png',
    badge: 'Best Seller',
    power: '550 Watt',
    efficiency: '22.8%',
    warranty: '25-Year Performance',
    availability: 'In Stock',
    description: 'Tier-1 ultra-high efficiency monocrystalline half-cell PERC module engineered with anti-reflective tempered glass for maximum solar energy yield in all weather conditions.',
    specs: {
      'Cell Type': 'Monocrystalline PERC Half-Cell',
      'Max Power Output': '550 Watt',
      'Module Efficiency': '22.8%',
      'Dimensions': '2278 x 1134 x 35 mm',
      'Weight': '27.5 kg',
      'Open Circuit Voltage (Voc)': '49.8V',
      'Short Circuit Current (Isc)': '14.0A',
      'Temperature Coefficient': '-0.34%/°C',
      'Glass Type': '3.2mm Anti-Reflective Tempered Glass'
    },
    bestUse: 'High-density residential rooftops & commercial installations requiring maximum wattage per square meter.'
  },
  {
    id: 'panel-poly-400',
    name: 'SUNVEXA Volt 400W Polycrystalline Panel',
    category: 'panels',
    subCategory: 'Polycrystalline',
    price: 11200,
    rating: 4.7,
    reviewsCount: 84,
    image: '/assets/panels/polycrystalline.png',
    badge: 'Value Choice',
    power: '400 Watt',
    efficiency: '17.5%',
    warranty: '25-Year Performance',
    availability: 'In Stock',
    description: 'Heavy-duty polycrystalline module featuring high thermal stability and multi-busbar solar cells designed for cost-effective large rooftop solar arrays.',
    specs: {
      'Cell Type': 'Polycrystalline 72-Cell Grid',
      'Max Power Output': '400 Watt',
      'Module Efficiency': '17.5%',
      'Dimensions': '1960 x 992 x 40 mm',
      'Weight': '22.0 kg',
      'Open Circuit Voltage (Voc)': '46.2V',
      'Short Circuit Current (Isc)': '9.8A',
      'Temperature Coefficient': '-0.38%/°C',
      'Frame Material': 'Anodized Aluminum Alloy'
    },
    bestUse: 'Large agricultural sheds, commercial roofs, & budget-friendly residential installations.'
  },
  {
    id: 'panel-thin-150',
    name: 'SUNVEXA Flex 150W Flexible Thin-Film Panel',
    category: 'panels',
    subCategory: 'Thin-Film',
    price: 8900,
    rating: 4.6,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    badge: 'Flexible & Lightweight',
    power: '150 Watt',
    efficiency: '13.2%',
    warranty: '15-Year Performance',
    availability: 'In Stock',
    description: 'Bendable thin-film solar module with ETFE polymer coating designed for curved architectural roofs, RVs, marine vessels, and lightweight structures.',
    specs: {
      'Cell Type': 'CIGS Flexible Thin-Film',
      'Max Power Output': '150 Watt',
      'Module Efficiency': '13.2%',
      'Dimensions': '1350 x 680 x 2.5 mm',
      'Weight': '2.8 kg',
      'Flexibility Angle': 'Up to 30 Degrees Curve',
      'Waterproof Rating': 'IP68 Sealed Junction Box'
    },
    bestUse: 'Curved metal roofs, caravans, boats, and weight-sensitive building facades.'
  },

  // --- INVERTERS ---
  {
    id: 'inv-hybrid-6k',
    name: 'SUNVEXA SmartGrid 6kW Hybrid Solar Inverter',
    category: 'inverters',
    subCategory: 'Hybrid',
    price: 68500,
    rating: 4.9,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop',
    badge: 'Smart IoT Grid',
    power: '6.0 kW',
    capacity: 'Dual MPPT',
    warranty: '10-Year Warranty',
    availability: 'In Stock',
    description: 'Advanced dual-MPPT hybrid inverter with built-in Wi-Fi monitoring, automatic grid/battery switching, and smart load management for 100% zero-drop power supply.',
    specs: {
      'Nominal AC Output': '6,000 Watts',
      'Max DC Input Voltage': '550 V',
      'MPPT Efficiency': '99.9%',
      'Battery Support': 'Lithium-ion & LFP (48V)',
      'Display & Connectivity': 'Color LCD + Wi-Fi App Monitoring',
      'Protection Rating': 'IP65 Outdoor Rated'
    },
    bestUse: 'Homes & businesses wanting seamless grid export combined with battery backup during outages.'
  },
  {
    id: 'inv-ongrid-10k',
    name: 'SUNVEXA MaxGrid 10kW On-Grid String Inverter',
    category: 'inverters',
    subCategory: 'On-grid',
    price: 84900,
    rating: 4.8,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1584279893976-1e66c9ff99a5?q=80&w=800&auto=format&fit=crop',
    badge: 'Commercial Grade',
    power: '10.0 kW',
    capacity: 'Triple MPPT',
    warranty: '10-Year Warranty',
    availability: 'In Stock',
    description: 'Industrial-grade three-phase on-grid string inverter with 98.6% peak efficiency, anti-PID protection, and real-time discom net metering synchronization.',
    specs: {
      'Nominal AC Output': '10,000 Watts (3-Phase)',
      'Peak Efficiency': '98.6%',
      'MPPT Tracking Channels': '3 Independent MPPTs',
      'Communication': 'RS485, Wi-Fi, 4G Cellular',
      'Cooling': 'Smart Quiet Fan Forced Cooling'
    },
    bestUse: 'Commercial offices, manufacturing plants, and net-metered 3-phase industrial solar arrays.'
  },

  // --- BATTERIES ---
  {
    id: 'bat-lfp-10k',
    name: 'SUNVEXA WallVault 10.2kWh LiFePO4 Battery Bank',
    category: 'batteries',
    subCategory: 'Lithium-ion',
    price: 185000,
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800&auto=format&fit=crop',
    badge: '6000+ Cycles',
    capacity: '10.2 kWh',
    warranty: '10-Year Full Replacement Warranty',
    availability: 'In Stock',
    description: 'High-safety wall-mounted Lithium Iron Phosphate (LiFePO4) energy storage system with integrated Smart BMS, active cell balancing, and rapid 1C charge/discharge.',
    specs: {
      'Usable Energy Capacity': '10.2 kWh',
      'Battery Cell Chemistry': 'Lithium Iron Phosphate (LiFePO4)',
      'Nominal Voltage': '51.2 V',
      'Depth of Discharge (DoD)': '90%',
      'Cycle Life': '6,000+ Cycles @ 80% DoD',
      'Safety Compliance': 'UL1973, CE, IEC62619'
    },
    bestUse: 'Whole-home 24/7 emergency blackout backup & nighttime solar self-consumption.'
  },

  // --- MOUNTING SYSTEMS ---
  {
    id: 'mount-roof-kit',
    name: 'SUNVEXA HeavyRail Aluminum Rooftop Mounting Kit (4 Panels)',
    category: 'mounting',
    price: 6490,
    rating: 4.8,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=800&auto=format&fit=crop',
    badge: '150 km/h Wind Rated',
    capacity: 'Supports 4 Panels',
    warranty: '15-Year Structural Warranty',
    availability: 'In Stock',
    description: 'Corrosion-resistant anodized 6063-T6 aluminum mounting rail kit complete with mid-clamps, end-clamps, roof L-feet, and waterproof EPDM sealant gaskets.',
    specs: {
      'Material Grade': '6063-T6 Structural Anodized Aluminum',
      'Wind Load Resistance': 'Up to 150 km/h',
      'Snow Load Rating': '1.4 kN/m²',
      'Fasteners': 'SUS304 Stainless Steel Bolts & Nuts'
    },
    bestUse: 'Securing solar panels on RCC flat roofs, tin sheds, or clay tile rooftops.'
  },

  // --- ACCESSORIES ---
  {
    id: 'acc-cable-kit',
    name: 'SUNVEXA UltraShield 4mm² Solar DC Cable (50 Meter Roll)',
    category: 'accessories',
    price: 3800,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop',
    badge: 'TUV Certified',
    warranty: '25-Year Weathering Resistance',
    availability: 'In Stock',
    description: 'Dual-core tin-plated copper solar DC cable with halogen-free cross-linked XLPO insulation, UV resistance, and flame retardancy.',
    specs: {
      'Conductor Area': '4.0 mm²',
      'Conductor Material': 'Class 5 Tinned Copper Strands',
      'Voltage Rating': '1500V DC',
      'Temperature Range': '-40°C to +120°C'
    },
    bestUse: 'High-voltage rooftop DC string wiring between panels and solar inverter.'
  },

  // --- COMPLETE SYSTEMS ---
  {
    id: 'sys-res-5k',
    name: 'SUNVEXA Ultra 5kW Complete Residential Solar System',
    category: 'systems',
    subCategory: 'Residential System',
    price: 245000,
    rating: 5.0,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    badge: 'Turnkey Solution',
    power: '5.0 kW Pack',
    capacity: 'Est. 600 kWh/month',
    warranty: '25-Year System Assurance',
    availability: 'In Stock',
    description: 'Complete all-in-one residential solar power package including 10 × 500W Monocrystalline PERC panels, 5kW Smart Inverter, rooftop mounting structure, cables, & turn-key installation service.',
    specs: {
      'Solar Panel Array': '10 × 500W Monocrystalline PERC (5000W Total)',
      'Inverter System': 'SUNVEXA 5kW Smart Grid Tie Inverter',
      'Est. Monthly Generation': '580 – 650 kWh / month',
      'Rooftop Area Required': '380 – 420 sq. ft',
      'Includes': 'Turnkey Installation, Net Metering Approval & 5-Year Maintenance'
    },
    bestUse: '3 to 5 BHK homes looking to eliminate monthly electricity bills up to ₹6,500/month.'
  }
];

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  productPurchased: string;
  comment: string;
  verified: boolean;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Rajesh Sharma',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: 'February 2, 2026',
    productPurchased: 'SUNVEXA Ultra 5kW Complete System',
    comment: 'Installed 5kW system last month. Electricity bill dropped from ₹7,200 to just ₹450 fixed grid charge! The scroll installation tracking made everything seamless.',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Ananya Deshmukh',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: 'January 18, 2026',
    productPurchased: 'SUNVEXA Apex 550W Monocrystalline Panels',
    comment: 'The 550W mono panels look sleek and all-black on our roof. Even during overcast Bangalore mornings, generation stays high.',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Sunil Verma',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    date: 'December 24, 2025',
    productPurchased: 'SUNVEXA WallVault 10.2kWh Battery Bank',
    comment: 'Power outages during summer monsoons used to kill our AC units. Now the WallVault battery kicks in instantly without flickering the lights.',
    verified: true
  }
];
