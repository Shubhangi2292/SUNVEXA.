import React, { useState } from 'react';
import { X, Star, ShoppingCart, Zap, ShieldCheck, Check, Truck, Wrench, ArrowRight } from 'lucide-react';
import { SolarProduct } from '../data/solarProducts';

interface ProductDetailModalProps {
  product: SolarProduct | null;
  onClose: () => void;
  onAddToCart: (product: SolarProduct, quantity: number) => void;
  onBuyNow: (product: SolarProduct, quantity: number) => void;
  onRequestInstall: (product: SolarProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onRequestInstall
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121c17] text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Product Image Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 relative bg-[#0a110d]">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#0a110d]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#d4ff33] border border-[#d4ff33]/30">
                  {product.badge}
                </div>
              )}
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#d4ff33]" />
                <span>Pan-India Express Freight Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4ff33]" />
                <span>{product.warranty} Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#d4ff33]" />
                <span>Certified Engineer Installation Available</span>
              </div>
            </div>
          </div>

          {/* Right Product Specs & Purchase Column */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#d4ff33] bg-[#d4ff33]/10 px-2.5 py-0.5 rounded-full border border-[#d4ff33]/30">
                  {product.subCategory || product.category}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">{product.availability}</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 text-xs text-white/80">
                <div className="flex items-center text-amber-400 gap-1 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewsCount} Customer Reviews</span>
              </div>
            </div>

            <div className="text-3xl font-black text-[#d4ff33]">
              ₹{product.price.toLocaleString('en-IN')}
              <span className="text-xs text-white/50 font-normal ml-2">/ Unit (Inclusive of GST)</span>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">
              {product.description}
            </p>

            {/* Specs Grid */}
            <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] mb-2">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-white/40 block text-[10px]">{key}</span>
                    <span className="font-semibold text-white">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/70 font-semibold">Quantity:</span>
              <div className="flex items-center border border-white/20 rounded-full bg-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-white hover:text-[#d4ff33] text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-white hover:text-[#d4ff33] text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* 3 Required Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-3 rounded-full text-xs transition-all border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  onBuyNow(product, quantity);
                  onClose();
                }}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3 px-3 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Buy Now</span>
              </button>

              <button
                onClick={() => {
                  onRequestInstall(product);
                  onClose();
                }}
                className="bg-[#121c17] hover:bg-[#1c2922] text-[#d4ff33] border border-[#d4ff33]/40 font-bold py-3 px-3 rounded-full text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Request Install</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
