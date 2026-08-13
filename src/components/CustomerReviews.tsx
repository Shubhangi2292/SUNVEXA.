import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/solarProducts';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
          Verified Customer Feedback
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          What SUNVEXA Owners Say
        </h2>
        <p className="text-white/80 text-base leading-relaxed">
          Over 50,000 installations completed across India and worldwide. Read real customer experiences.
        </p>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CUSTOMER_REVIEWS.map((rev) => (
          <div 
            key={rev.id}
            className="bg-[#121c17]/75 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl relative group hover:border-[#d4ff33]/50 transition-all"
          >
            <div>
              {/* Stars & Verified Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle className="w-3 h-3" /> Verified Owner
                  </span>
                )}
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Customer & Product Info */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-sm block">{rev.name}</span>
                <span className="text-[11px] text-[#d4ff33] block">{rev.productPurchased}</span>
              </div>
              <span className="text-[10px] text-white/40">{rev.location}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
