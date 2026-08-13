import React, { useState } from 'react';
import { X, CheckCircle2, ShoppingBag, Truck, Wrench, CreditCard, ShieldCheck, ArrowRight, ArrowLeft, Check, Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';
import { SolarProduct } from '../data/solarProducts';

interface BuyNowCheckoutModalProps {
  product: SolarProduct | null;
  initialQuantity?: number;
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const BuyNowCheckoutModal: React.FC<BuyNowCheckoutModalProps> = ({
  product,
  initialQuantity = 1,
  isOpen,
  onClose,
  onTrackOrder
}) => {
  const [step, setStep] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  // Step 2: Customer Details State
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: ''
  });
  const [detailsErrors, setDetailsErrors] = useState<{ [key: string]: string }>({});

  // Step 3: Delivery & Installation State
  const [needsInstallation, setNeedsInstallation] = useState<boolean>(true);
  const [installAddress, setInstallAddress] = useState<string>('');
  const [installDate, setInstallDate] = useState<string>('2026-02-18');
  const [installTimeSlot, setInstallTimeSlot] = useState<string>('09:00 AM - 01:00 PM');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Step 4: Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState<string>('customer@okaxis');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8912',
    name: 'Customer Name',
    expiry: '08/29',
    cvv: '•••'
  });
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Step 5: Order Confirmation State
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!isOpen || !product) return null;

  // Price Calculations
  const productSubtotal = product.price * quantity;
  const installationFee = needsInstallation ? 25000 : 0;
  const deliveryFee = 0; // Free pan-India solar freight
  const gstTax = Math.round((productSubtotal + installationFee) * 0.12);
  const grandTotal = productSubtotal + installationFee + gstTax;

  // Step 2 Validation
  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    if (!customerDetails.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!customerDetails.email.trim() || !customerDetails.email.includes('@')) errors.email = 'Valid Email is required';
    if (!customerDetails.phone.trim() || customerDetails.phone.length < 10) errors.phone = 'Valid 10-digit Phone Number is required';
    if (!customerDetails.address.trim()) errors.address = 'Street Address is required';
    if (!customerDetails.city.trim()) errors.city = 'City is required';
    if (!customerDetails.state.trim()) errors.state = 'State is required';
    if (!customerDetails.pinCode.trim() || customerDetails.pinCode.length < 6) errors.pinCode = 'Valid 6-digit PIN Code is required';

    setDetailsErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToInstallation = () => {
    if (validateStep2()) {
      if (!installAddress) setInstallAddress(customerDetails.address);
      setStep(3);
    }
  };

  const handlePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedId = `SNR-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(generatedId);
      setStep(5);
    }, 1500);
  };

  const resetModal = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121c17] text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={resetModal}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Tracker (Steps 1 to 5) */}
        <div className="mb-6 border-b border-white/10 pb-4">
          <div className="flex justify-between items-center text-[11px] text-white/60 font-semibold uppercase tracking-wider mb-2">
            <span className={step >= 1 ? 'text-[#d4ff33] font-bold' : ''}>1. Review</span>
            <span className={step >= 2 ? 'text-[#d4ff33] font-bold' : ''}>2. Details</span>
            <span className={step >= 3 ? 'text-[#d4ff33] font-bold' : ''}>3. Delivery & Install</span>
            <span className={step >= 4 ? 'text-[#d4ff33] font-bold' : ''}>4. Payment</span>
            <span className={step >= 5 ? 'text-[#d4ff33] font-bold' : ''}>5. Confirmation</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#d4ff33] h-full transition-all duration-300" 
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* ==================== STEP 1: REVIEW PRODUCT ==================== */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" /> Step 1: Review Solar Hardware Selection
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start bg-white/5 p-5 rounded-2xl border border-white/10">
              <div className="md:col-span-4 h-48 rounded-xl overflow-hidden border border-white/10 bg-[#0a110d]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] uppercase font-bold text-[#d4ff33] bg-[#d4ff33]/10 px-2.5 py-0.5 rounded-full border border-[#d4ff33]/30">
                  {product.subCategory || product.category}
                </span>

                <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-xs text-white/70">{product.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-white/40 block text-[10px]">Warranty Coverage:</span>
                    <span className="font-semibold text-white">{product.warranty}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Availability:</span>
                    <span className="font-semibold text-emerald-400">{product.availability}</span>
                  </div>
                </div>

                {/* Quantity Controls & Unit Price */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/70">Quantity:</span>
                    <div className="flex items-center border border-white/20 rounded-full bg-white/10 text-xs">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 font-bold hover:text-[#d4ff33]"
                      >
                        -
                      </button>
                      <span className="px-2 font-extrabold">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 font-bold hover:text-[#d4ff33]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <span className="text-lg font-extrabold text-[#d4ff33]">
                    ₹{productSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Subtotal & Estimated Total Summary */}
            <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Hardware Subtotal ({quantity} Unit):</span>
                <span>₹{productSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Estimated Solar Freight Shipping:</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#d4ff33] pt-2 border-t border-white/10">
                <span>Estimated Subtotal:</span>
                <span>₹{productSubtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-2">
              <button
                onClick={resetModal}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-full transition-all cursor-pointer"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => setStep(2)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <span>Continue to Customer Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 2: CUSTOMER DETAILS ==================== */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider">
              <User className="w-4 h-4" /> Step 2: Customer Contact & Dispatch Information
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div>
                <label className="block font-medium text-white/80 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  value={customerDetails.fullName}
                  onChange={e => setCustomerDetails({...customerDetails, fullName: e.target.value})}
                  placeholder="e.g. Rajesh Sharma"
                  className={`w-full bg-white/10 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none ${
                    detailsErrors.fullName ? 'border-red-400' : 'border-white/20 focus:border-[#d4ff33]'
                  }`}
                />
                {detailsErrors.fullName && <span className="text-[10px] text-red-400">{detailsErrors.fullName}</span>}
              </div>

              <div>
                <label className="block font-medium text-white/80 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  value={customerDetails.email}
                  onChange={e => setCustomerDetails({...customerDetails, email: e.target.value})}
                  placeholder="rajesh@example.com"
                  className={`w-full bg-white/10 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none ${
                    detailsErrors.email ? 'border-red-400' : 'border-white/20 focus:border-[#d4ff33]'
                  }`}
                />
                {detailsErrors.email && <span className="text-[10px] text-red-400">{detailsErrors.email}</span>}
              </div>

              <div>
                <label className="block font-medium text-white/80 mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  value={customerDetails.phone}
                  onChange={e => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-white/10 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none ${
                    detailsErrors.phone ? 'border-red-400' : 'border-white/20 focus:border-[#d4ff33]'
                  }`}
                />
                {detailsErrors.phone && <span className="text-[10px] text-red-400">{detailsErrors.phone}</span>}
              </div>

              <div>
                <label className="block font-medium text-white/80 mb-1">PIN / Postal Code *</label>
                <input 
                  type="text" 
                  value={customerDetails.pinCode}
                  onChange={e => setCustomerDetails({...customerDetails, pinCode: e.target.value})}
                  placeholder="411001"
                  className={`w-full bg-white/10 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none ${
                    detailsErrors.pinCode ? 'border-red-400' : 'border-white/20 focus:border-[#d4ff33]'
                  }`}
                />
                {detailsErrors.pinCode && <span className="text-[10px] text-red-400">{detailsErrors.pinCode}</span>}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-white/80 mb-1">Street Address *</label>
                <input 
                  type="text" 
                  value={customerDetails.address}
                  onChange={e => setCustomerDetails({...customerDetails, address: e.target.value})}
                  placeholder="Flat No, Building, Street, Landmark"
                  className={`w-full bg-white/10 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none ${
                    detailsErrors.address ? 'border-red-400' : 'border-white/20 focus:border-[#d4ff33]'
                  }`}
                />
                {detailsErrors.address && <span className="text-[10px] text-red-400">{detailsErrors.address}</span>}
              </div>

              <div>
                <label className="block font-medium text-white/80 mb-1">City *</label>
                <input 
                  type="text" 
                  value={customerDetails.city}
                  onChange={e => setCustomerDetails({...customerDetails, city: e.target.value})}
                  placeholder="Pune"
                  className={`w-full bg-white/10 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none ${
                    detailsErrors.city ? 'border-red-400' : 'border-white/20 focus:border-[#d4ff33]'
                  }`}
                />
                {detailsErrors.city && <span className="text-[10px] text-red-400">{detailsErrors.city}</span>}
              </div>

              <div>
                <label className="block font-medium text-white/80 mb-1">State *</label>
                <input 
                  type="text" 
                  value={customerDetails.state}
                  onChange={e => setCustomerDetails({...customerDetails, state: e.target.value})}
                  placeholder="Maharashtra"
                  className={`w-full bg-white/10 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none ${
                    detailsErrors.state ? 'border-red-400' : 'border-white/20 focus:border-[#d4ff33]'
                  }`}
                />
                {detailsErrors.state && <span className="text-[10px] text-red-400">{detailsErrors.state}</span>}
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Review
              </button>

              <button
                onClick={handleNextToInstallation}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Continue to Delivery & Installation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 3: DELIVERY & INSTALLATION (SOLAR SPECIFIC) ==================== */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider">
              <Wrench className="w-4 h-4" /> Step 3: Solar Installation & Delivery Preference
            </div>

            {/* Choice: Product Only vs Product + Professional Installation */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-white block">Do you need professional SUNVEXA certified installation?</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Option A: Product Only */}
                <div 
                  onClick={() => setNeedsInstallation(false)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    !needsInstallation 
                      ? 'bg-[#d4ff33]/15 border-[#d4ff33] text-white' 
                      : 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#d4ff33]" /> Product Only
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400">FREE Freight</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/70">
                    Express freight delivery of solar hardware to your doorstep. Self-installation or local electrician mounting.
                  </p>
                </div>

                {/* Option B: Product + Professional Installation */}
                <div 
                  onClick={() => setNeedsInstallation(true)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    needsInstallation 
                      ? 'bg-[#d4ff33]/15 border-[#d4ff33] text-white shadow-xl' 
                      : 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#d4ff33]" /> Product + Turnkey Installation
                    </span>
                    <span className="text-xs font-extrabold text-[#d4ff33]">+₹25,000</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/70">
                    Full rooftop mounting structure, certified electrical wiring, inverter sync, testing & DISCOM net-metering clearance.
                  </p>
                </div>

              </div>
            </div>

            {/* If Installation Selected: Installation Date & Schedule Form */}
            {needsInstallation && (
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4 text-xs animate-in fade-in duration-200">
                <h4 className="font-bold text-[#d4ff33] uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Schedule Engineering Installation Site Visit
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-white/80 mb-1">Installation Address</label>
                    <input 
                      type="text" 
                      value={installAddress}
                      onChange={e => setInstallAddress(e.target.value)}
                      placeholder="Roof Site Address"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-white/80 mb-1">Preferred Installation Date</label>
                    <input 
                      type="date" 
                      value={installDate}
                      onChange={e => setInstallDate(e.target.value)}
                      className="w-full bg-[#1c2922] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-white/80 mb-1">Preferred Time Slot</label>
                    <select
                      value={installTimeSlot}
                      onChange={e => setInstallTimeSlot(e.target.value)}
                      className="w-full bg-[#1c2922] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    >
                      <option value="09:00 AM - 01:00 PM">Morning Slot (09:00 AM - 01:00 PM)</option>
                      <option value="02:00 PM - 06:00 PM">Afternoon Slot (02:00 PM - 06:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-white/80 mb-1">Additional Rooftop Notes (Optional)</label>
                    <input 
                      type="text" 
                      value={additionalNotes}
                      onChange={e => setAdditionalNotes(e.target.value)}
                      placeholder="e.g. Flat RCC roof, 3rd floor tin shed"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Line Item Cost Breakdown Display */}
            <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Product Cost ({quantity} × ₹{product.price.toLocaleString('en-IN')}):</span>
                <span>₹{productSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Pan-India Solar Express Freight Delivery:</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Turnkey Rooftop Engineering & Installation:</span>
                <span>{needsInstallation ? `₹${installationFee.toLocaleString('en-IN')}` : 'N/A (Product Only)'}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>GST (12% Solar Tariff):</span>
                <span>₹{gstTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#d4ff33] pt-2 border-t border-white/10">
                <span>Estimated Grand Total:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Details
              </button>

              <button
                onClick={() => setStep(4)}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 4: PAYMENT (DEMO GATEWAY) ==================== */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider">
                <CreditCard className="w-4 h-4" /> Step 4: Final Order Summary & Payment Gateway
              </div>
              <span className="bg-[#d4ff33]/10 text-[#d4ff33] text-[10px] font-bold px-3 py-1 rounded-full border border-[#d4ff33]/30">
                Demo Gateway Mode
              </span>
            </div>

            {/* Order Summary Recap Card */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-white">{product.name} ({quantity}x)</span>
                <span className="font-extrabold text-[#d4ff33]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Deliver To:</span>
                <span className="text-white font-medium">{customerDetails.fullName}, {customerDetails.city} ({customerDetails.pinCode})</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Installation Service:</span>
                <span className="text-emerald-400 font-semibold">{needsInstallation ? `Scheduled for ${installDate}` : 'Product Only'}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-white block">Select Preferred Payment Method:</span>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                    paymentMethod === 'upi' ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' : 'bg-white/10 text-white border-white/15'
                  }`}
                >
                  ⚡ Instant UPI
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' : 'bg-white/10 text-white border-white/15'
                  }`}
                >
                  💳 Credit/Debit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                    paymentMethod === 'netbanking' ? 'bg-[#d4ff33] text-[#0a110d] border-[#bce61a]' : 'bg-white/10 text-white border-white/15'
                  }`}
                >
                  🏦 Net Banking
                </button>
              </div>

              {/* Payment Details Sub-Inputs */}
              <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/10 space-y-3">
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-white/70 mb-1">Enter UPI VPA ID (Google Pay / PhonePe / Paytm):</label>
                    <input 
                      type="text" 
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-white/70 mb-1">Card Number:</label>
                      <input 
                        type="text" 
                        value={cardDetails.number}
                        onChange={e => setCardDetails({...cardDetails, number: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Expiry (MM/YY):</label>
                      <input 
                        type="text" 
                        value={cardDetails.expiry}
                        onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">CVV:</label>
                      <input 
                        type="password" 
                        value={cardDetails.cvv}
                        onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-white/70 mb-1">Select Bank:</label>
                    <select
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                      className="w-full bg-[#121c17] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(3)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Delivery
              </button>

              <button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-extrabold text-xs px-7 py-3.5 rounded-full flex items-center gap-2 shadow-xl cursor-pointer"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0a110d] border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{grandTotal.toLocaleString('en-IN')} & Place Order</span>
                    <ShieldCheck className="w-4 h-4 fill-current" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 5: ORDER CONFIRMATION ==================== */}
        {step === 5 && (
          <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-[#d4ff33] text-[#0a110d] rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-white mb-1">🎉 Order Confirmed!</h2>
              <p className="text-sm font-semibold text-[#d4ff33]">Thank you for choosing SUNVEXA.</p>
            </div>

            {/* Confirmed Order Details Grid */}
            <div className="bg-[#1c2922] p-5 rounded-2xl border border-white/15 text-left text-xs space-y-3 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Order Reference ID:</span>
                <span className="font-extrabold text-[#d4ff33] text-sm">{confirmedOrderId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">Product Purchased:</span>
                <span className="font-bold text-white">{product.name} ({quantity}x)</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">Amount Paid:</span>
                <span className="font-extrabold text-emerald-400">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">Delivery Address:</span>
                <span className="font-medium text-white">{customerDetails.address}, {customerDetails.city} ({customerDetails.pinCode})</span>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white/60">Installation Service:</span>
                <span className="font-semibold text-[#d4ff33]">
                  {needsInstallation ? `Scheduled for ${installDate} (${installTimeSlot})` : 'Product Freight Delivery Only'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                onClick={() => {
                  onTrackOrder(confirmedOrderId);
                  resetModal();
                }}
                className="bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-extrabold py-3.5 px-6 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track My Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={resetModal}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-full text-xs transition-all border border-white/20 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
