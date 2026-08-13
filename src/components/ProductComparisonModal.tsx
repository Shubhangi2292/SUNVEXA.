import React, { useState } from 'react';
import { X, Sparkles, Check, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { SOLAR_PRODUCTS, SolarProduct } from '../data/solarProducts';

interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: SolarProduct) => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'panel-mono-550',
    'panel-poly-400',
    'panel-thin-150'
  ]);

  if (!isOpen) return null;

  const compareProducts = SOLAR_PRODUCTS.filter(p => selectedIds.includes(p.id));
  const availableToAdd = SOLAR_PRODUCTS.filter(p => !selectedIds.includes(p.id));

  const removeProduct = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const addProduct = (id: string) => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121c17] text-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Multi-Product Matrix
          </div>
          <h2 className="text-2xl font-extrabold text-white">Side-by-Side Solar Comparison</h2>
          <p className="text-xs text-white/70">Compare specs, efficiency, warranties, and pricing across solar products.</p>
        </div>

        {/* Add Product Selector if < 4 */}
        {selectedIds.length < 4 && (
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-white/60 font-semibold">Add to Comparison:</span>
            {availableToAdd.map(p => (
              <button
                key={p.id}
                onClick={() => addProduct(p.id)}
                className="bg-white/10 hover:bg-[#d4ff33] hover:text-[#0a110d] text-white px-3 py-1 rounded-full border border-white/15 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>{p.name.split(' ')[1] || p.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/15">
                <th className="p-3 text-[#d4ff33] uppercase font-bold w-1/5">Product Info</th>
                {compareProducts.map(p => (
                  <th key={p.id} className="p-3 text-center border-l border-white/10">
                    <div className="relative group">
                      {compareProducts.length > 2 && (
                        <button 
                          onClick={() => removeProduct(p.id)}
                          className="absolute -top-1 -right-1 p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl mx-auto mb-2 border border-white/10" />
                      <span className="font-bold text-white block text-xs line-clamp-2">{p.name}</span>
                      <span className="text-base font-extrabold text-[#d4ff33] block mt-1">₹{p.price.toLocaleString('en-IN')}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/90">
              <tr>
                <td className="p-3 font-semibold text-white">Category / SubType</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-3 text-center border-l border-white/10 font-bold text-[#d4ff33]">
                    {p.subCategory || p.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Rated Power Output</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-3 text-center border-l border-white/10">
                    {p.power || p.capacity || 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Efficiency Rate</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-3 text-center border-l border-white/10 font-bold text-emerald-400">
                    {p.efficiency || 'High Grade'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Warranty Coverage</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-3 text-center border-l border-white/10">
                    {p.warranty}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Best Use Case</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-3 text-center border-l border-white/10 text-[11px] text-white/70">
                    {p.bestUse}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Action</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="p-3 text-center border-l border-white/10">
                    <button
                      onClick={() => {
                        onAddToCart(p);
                        onClose();
                      }}
                      className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-2 rounded-full text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart className="w-3 h-3 fill-current" />
                      Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
