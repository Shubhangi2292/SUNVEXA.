import React, { useState } from 'react';
import { Zap, ArrowRight, Check, Send, Phone, Mail, MapPin } from 'lucide-react';

interface ContactQuoteProps {
  defaultPropertyType?: string;
}

export const ContactQuoteSection: React.FC<ContactQuoteProps> = ({ defaultPropertyType = 'residential' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState(defaultPropertyType);
  const [monthlyBill, setMonthlyBill] = useState('₹5,000 - ₹10,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="bg-[#121c17]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4ff33] text-[#0a110d] text-xs font-bold uppercase rounded-full">
              <Zap className="w-3.5 h-3.5 fill-current" /> Zero Commitment Consultation
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Get Your Custom Solar Quote
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Find out exactly how many panels your property needs, your 25-year return on investment, and available government subsidies.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#d4ff33]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Headquarters: Palo Alto, CA & Regional Offices Across India</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#d4ff33]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>Toll-Free Assistance: +1 (800) 555-SUNVEXA</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#d4ff33]">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Direct Quotes: quotes@sunvexa.com</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#d4ff33] text-[#0a110d] rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Solar Proposal Request Submitted!</h3>
                <p className="text-sm text-white/70">
                  Thank you, <span className="text-[#d4ff33] font-semibold">{name || 'Customer'}</span>! A certified SUNVEXA engineer will analyze your location irradiance and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rao"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="vikram@example.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Location / Pincode</label>
                    <input 
                      type="text" 
                      required
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Pune 411001"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Property Category</label>
                    <select
                      value={propertyType}
                      onChange={e => setPropertyType(e.target.value)}
                      className="w-full bg-[#1c2922] border border-white/20 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    >
                      <option value="residential">Residential Home</option>
                      <option value="commercial">Commercial Enterprise</option>
                      <option value="industrial">Industrial Plant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Est. Monthly Bill</label>
                    <select
                      value={monthlyBill}
                      onChange={e => setMonthlyBill(e.target.value)}
                      className="w-full bg-[#1c2922] border border-white/20 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    >
                      <option value="Under ₹5,000">Under ₹5,000</option>
                      <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</option>
                      <option value="₹15,000 - ₹50,000">₹15,000 - ₹50,000</option>
                      <option value="Above ₹50,000">Above ₹50,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">Message / Roof Details (Optional)</label>
                  <textarea 
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about your roof area, shading, or energy requirements..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                  />
                </div>

                {/* Reusing existing button styling */}
                <button 
                  type="submit"
                  className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3.5 rounded-full text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>Get a Solar Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
