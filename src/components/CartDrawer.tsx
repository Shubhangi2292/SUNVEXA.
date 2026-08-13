import React from 'react';
import { X, ShoppingCart, Trash2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SolarProduct } from '../data/solarProducts';

export interface CartItem {
  product: SolarProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const gstTax = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + gstTax;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="bg-[#121c17] text-white w-full max-w-md h-full p-6 border-l border-white/20 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Cart Header */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#d4ff33]" />
              <h3 className="text-lg font-bold text-white">Your Solar Shopping Cart</h3>
              <span className="bg-[#d4ff33] text-[#0a110d] font-bold text-xs px-2 py-0.5 rounded-full">
                {items.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingCart className="w-12 h-12 text-white/20 mx-auto" />
              <p className="text-sm font-semibold text-white/70">Your cart is currently empty</p>
              <p className="text-xs text-white/40">Explore our solar panels, inverters, and lithium battery storage catalog.</p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#d4ff33] text-[#0a110d] font-bold px-5 py-2.5 rounded-full text-xs cursor-pointer"
              >
                Explore Solar Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="bg-white/5 p-3 rounded-2xl border border-white/10 flex gap-3 items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl border border-white/10 shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-white block truncate">{product.name}</span>
                    <span className="text-xs font-extrabold text-[#d4ff33] block">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-white/20 rounded-full bg-white/10 text-xs">
                        <button 
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-white hover:text-[#d4ff33]"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold">{quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-white hover:text-[#d4ff33]"
                        >
                          +
                        </button>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(product.id)}
                        className="text-red-400 hover:text-red-300 text-xs p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>GST (12% Solar Tariff):</span>
                <span>₹{gstTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#d4ff33] pt-2 border-t border-white/10">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3.5 rounded-full text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout & Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
