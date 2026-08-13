import React, { useState } from 'react';
import { Sun, Check, Zap, ArrowRight, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export const SolarPanelTypes: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'mono' | 'poly' | 'thin'>('all');

  const panelData = [
    {
      id: 'mono',
      name: 'Monocrystalline Solar Panels',
      badge: 'Highest Efficiency & Premium Sleek Aesthetic',
      efficiency: '20% – 24%',
      lifespan: '25 – 30+ Years',
      spaceRequirement: 'Lowest (Ideal for limited space)',
      cost: 'Higher upfront investment',
      flexibility: 'Rigid glass panel structure',
      bestUse: 'Residential rooftops with limited space requiring maximum power output',
      image: '/assets/panels/monocrystalline.png',
      description: 'Engineered from a single pure silicon crystal structure. Monocrystalline panels deliver unmatched efficiency, sleek modern dark aesthetics, and industry-leading performance under high temperature conditions.',
      highlights: [
        'Highest power output per square meter',
        'Sleek all-black architectural appearance',
        'Lowest degradation rate over 25+ years'
      ]
    },
    {
      id: 'poly',
      name: 'Polycrystalline Solar Panels',
      badge: 'Best Value & Proven Cost-Effectiveness',
      efficiency: '15% – 18%',
      lifespan: '25 Years',
      spaceRequirement: 'Moderate',
      cost: 'Cost-Effective / Affordable',
      flexibility: 'Rigid glass panel structure',
      bestUse: 'Larger residential roofs, commercial warehouses, & budget-conscious installations',
      image: '/assets/panels/polycrystalline.png',
      description: 'Manufactured by melting multiple raw silicon fragments together. Polycrystalline panels offer a budget-friendly alternative with reliable long-term generation and distinct blue crystal patterning.',
      highlights: [
        'Lower manufacturing cost passed on to buyer',
        'Proven track record across millions of roofs',
        'Ideal when ample roof area is available'
      ]
    },
    {
      id: 'thin',
      name: 'Thin-Film & Flexible Solar Panels',
      badge: 'Ultra-Lightweight & Versatile Architecture',
      efficiency: '10% – 13%',
      lifespan: '15 – 20 Years',
      spaceRequirement: 'Higher space required',
      cost: 'Lowest cost per panel unit',
      flexibility: 'High flexibility / Bendable',
      bestUse: 'Curved roofs, RVs, marine vessels, temporary structures, & specialized facades',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
      description: 'Produced by depositing thin photovoltaic layers onto flexible substrates like metal, glass, or plastic. Ultra-lightweight and bendable for specialized building-integrated applications.',
      highlights: [
        'Bendable to match curved architecture',
        'Extremely lightweight for weak structures',
        'Unaffected by minor shading or high heat'
      ]
    }
  ];

  const filteredPanels = selectedTab === 'all' 
    ? panelData 
    : panelData.filter(p => p.id === selectedTab);

  return (
    <section id="panel-types" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Technology Comparison
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Types of Solar Panels Explained
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          Choosing the right solar panel technology depends on your available rooftop area, budget, efficiency requirements, and aesthetic preference.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedTab === 'all' 
                ? 'bg-[#d4ff33] text-[#0a110d] shadow-lg' 
                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15'
            }`}
          >
            All Panel Technologies
          </button>
          <button
            onClick={() => setSelectedTab('mono')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedTab === 'mono' 
                ? 'bg-[#d4ff33] text-[#0a110d] shadow-lg' 
                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15'
            }`}
          >
            Monocrystalline
          </button>
          <button
            onClick={() => setSelectedTab('poly')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedTab === 'poly' 
                ? 'bg-[#d4ff33] text-[#0a110d] shadow-lg' 
                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15'
            }`}
          >
            Polycrystalline
          </button>
          <button
            onClick={() => setSelectedTab('thin')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedTab === 'thin' 
                ? 'bg-[#d4ff33] text-[#0a110d] shadow-lg' 
                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15'
            }`}
          >
            Thin-Film
          </button>
        </div>
      </div>

      {/* Panels Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {filteredPanels.map((panel) => (
          <div 
            key={panel.id}
            className="bg-[#121c17]/70 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl transition-all hover:-translate-y-1.5 hover:border-[#d4ff33]/50 group"
          >
            <div>
              {/* Card Image */}
              <div className="h-48 rounded-2xl overflow-hidden mb-6 border border-white/10 relative">
                <img 
                  src={panel.image} 
                  alt={panel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0a110d]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#d4ff33] border border-[#d4ff33]/30">
                  {panel.badge}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{panel.name}</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                {panel.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                {panel.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/90">
                    <Check className="w-4 h-4 text-[#d4ff33] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white/50 block text-[10px]">Efficiency</span>
                <span className="font-extrabold text-[#d4ff33]">{panel.efficiency}</span>
              </div>
              <div>
                <span className="text-white/50 block text-[10px]">Space Needed</span>
                <span className="font-semibold text-white">{panel.spaceRequirement.split(' ')[0]}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-[#121c17]/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-x-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Solar Panel Feature Comparison</h3>
            <p className="text-xs text-white/70">Compare technical parameters at a glance to make an informed choice.</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-[#d4ff33] text-xs font-semibold rounded-full border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> Direct Side-by-Side
          </span>
        </div>

        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/15 text-xs text-[#d4ff33] uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">Feature</th>
              <th className="py-3 px-4 font-bold">Monocrystalline</th>
              <th className="py-3 px-4 font-bold">Polycrystalline</th>
              <th className="py-3 px-4 font-bold">Thin-Film</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-xs sm:text-sm text-white/90">
            <tr>
              <td className="py-4 px-4 font-semibold text-white">Efficiency Rate</td>
              <td className="py-4 px-4 font-bold text-[#d4ff33]">High (20% – 24%)</td>
              <td className="py-4 px-4">Moderate (15% – 18%)</td>
              <td className="py-4 px-4">Lower (10% – 13%)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-white">Space Requirement</td>
              <td className="py-4 px-4 font-semibold text-emerald-400">Lower (Compact)</td>
              <td className="py-4 px-4">Moderate</td>
              <td className="py-4 px-4">Higher (Needs large area)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-white">Capital Cost</td>
              <td className="py-4 px-4">Higher upfront</td>
              <td className="py-4 px-4 font-semibold text-[#d4ff33]">Moderate / Value</td>
              <td className="py-4 px-4">Lower per unit</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-white">Flexibility</td>
              <td className="py-4 px-4">Low (Rigid glass frame)</td>
              <td className="py-4 px-4">Low (Rigid glass frame)</td>
              <td className="py-4 px-4 font-bold text-[#d4ff33]">High (Bendable)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-semibold text-white">Best Application</td>
              <td className="py-4 px-4 text-white/80">Limited roof space requiring max output</td>
              <td className="py-4 px-4 text-white/80">Larger roofs with budget priority</td>
              <td className="py-4 px-4 text-white/80">Specialized facades & curved surfaces</td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>
  );
};
