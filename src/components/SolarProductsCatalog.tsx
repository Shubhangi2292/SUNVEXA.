import React, { useState } from 'react';
import { ShoppingCart, Eye, Star, Check, Sparkles, Filter, Search, ShieldCheck, Zap } from 'lucide-react';
import { SOLAR_PRODUCTS, SolarProduct } from '../data/solarProducts';

interface SolarProductsCatalogProps {
  onSelectProduct: (product: SolarProduct) => void;
  onAddToCart: (product: SolarProduct) => void;
}

export const SolarProductsCatalog: React.FC<SolarProductsCatalogProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'panels', label: 'Solar Panels' },
    { id: 'inverters', label: 'Inverters' },
    { id: 'batteries', label: 'Batteries' },
    { id: 'mounting', label: 'Mounting Systems' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'systems', label: 'Complete Systems' }
  ];

  const filteredProducts = SOLAR_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: SolarProduct) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedNotice(`Added ${product.name} to Cart!`);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  return (
    <section id="products" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Hardware Store & Catalog
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Tier-1 Solar Products & Systems
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          Explore high-efficiency solar panels, smart hybrid inverters, LFP battery banks, mounting rails, and complete turnkey kits.
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/40" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solar panels, 6kW inverters, lithium batteries..."
              className="w-full bg-white/10 border border-white/20 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-[#d4ff33] text-[#0a110d] shadow-lg' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Added Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#d4ff33] text-[#0a110d] font-bold text-xs px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <ShoppingCart className="w-4 h-4 fill-current" />
          <span>{addedNotice}</span>
        </div>
      )}

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="bg-[#121c17]/75 backdrop-blur-xl border border-white/15 rounded-3xl p-6 text-white flex flex-col justify-between shadow-2xl transition-all hover:-translate-y-1.5 hover:border-[#d4ff33]/50 group cursor-pointer"
          >
            <div>
              {/* Product Image */}
              <div className="h-52 rounded-2xl overflow-hidden mb-5 border border-white/10 relative bg-[#0a110d]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#0a110d]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#d4ff33] border border-[#d4ff33]/30">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/90 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating} ({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="text-[11px] font-bold text-[#d4ff33] uppercase tracking-wider mb-1">
                {product.subCategory || product.category}
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug line-clamp-2">
                {product.name}
              </h3>

              <p className="text-xs text-white/70 line-clamp-2 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-3 mb-4">
                {product.power && (
                  <div>
                    <span className="text-white/40 block text-[10px]">Power</span>
                    <span className="font-semibold text-white">{product.power}</span>
                  </div>
                )}
                {product.efficiency && (
                  <div>
                    <span className="text-white/40 block text-[10px]">Efficiency</span>
                    <span className="font-extrabold text-[#d4ff33]">{product.efficiency}</span>
                  </div>
                )}
                {product.capacity && (
                  <div>
                    <span className="text-white/40 block text-[10px]">Capacity</span>
                    <span className="font-semibold text-white">{product.capacity}</span>
                  </div>
                )}
                <div>
                  <span className="text-white/40 block text-[10px]">Warranty</span>
                  <span className="font-medium text-white/90 truncate block">{product.warranty}</span>
                </div>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-white/50 block">Price (Incl. Taxes)</span>
                <span className="text-xl font-extrabold text-[#d4ff33]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold px-4 py-2.5 rounded-full text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5 fill-current" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
