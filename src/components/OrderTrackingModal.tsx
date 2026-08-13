import React from 'react';
import { X, CheckCircle2, Clock, Truck, Wrench, ShieldCheck, PackageCheck } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orderId = 'SNR-849201'
}) => {
  if (!isOpen) return null;

  const trackingSteps = [
    { label: 'Order Confirmed', date: 'Feb 10, 2026', done: true, current: false },
    { label: 'Payment Confirmed', date: 'Feb 10, 2026', done: true, current: false },
    { label: 'Preparing Order', date: 'Feb 11, 2026', done: true, current: true },
    { label: 'Dispatched', date: 'Est. Feb 13, 2026', done: false, current: false },
    { label: 'Installation Scheduled', date: 'Est. Feb 15, 2026', done: false, current: false },
    { label: 'Installation Completed', date: 'Est. Feb 16, 2026', done: false, current: false }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121c17] text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider mb-1">
          <PackageCheck className="w-4 h-4" /> Real-time Logistics Tracker
        </div>

        <h2 className="text-2xl font-extrabold text-white">Solar Order #{orderId}</h2>
        <p className="text-xs text-white/70 mb-6">Track your hardware dispatch and rooftop installation engineering schedule.</p>

        {/* 6-Stage Tracking Steps */}
        <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 pl-2">
          {trackingSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 relative z-10">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                step.done 
                  ? 'bg-[#d4ff33] text-[#0a110d]' 
                  : step.current 
                  ? 'bg-amber-400 text-[#0a110d] animate-pulse ring-4 ring-amber-400/20' 
                  : 'bg-white/10 text-white/40'
              }`}>
                {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
              </div>

              <div className="flex-1 bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className={`font-bold block ${step.done ? 'text-white' : step.current ? 'text-amber-300' : 'text-white/50'}`}>
                    {step.label}
                  </span>
                  {step.current && (
                    <span className="text-[10px] text-[#d4ff33] block mt-0.5">In Progress at Warehouse Hub</span>
                  )}
                </div>
                <span className="text-[10px] text-white/50">{step.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-2.5 rounded-full cursor-pointer"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
