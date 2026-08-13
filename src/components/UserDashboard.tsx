import React, { useState } from 'react';
import { X, User, Zap, ShieldCheck, Cpu, Calendar, Sun, Leaf, DollarSign, Activity, LogOut, PackageCheck, ShoppingCart, Bookmark, FileText, Wrench } from 'lucide-react';
import { UserData } from './AuthModal';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onLogout: () => void;
  onTrackOrder: () => void;
  onViewCart: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onTrackOrder,
  onViewCart
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'orders' | 'profile' | 'quotes' | 'warranty'>('system');

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121c17] text-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4ff33] text-[#0a110d] font-bold text-lg flex items-center justify-center shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}'s Customer Portal</h2>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span>{user.userType} Account</span>
                <span>•</span>
                <span className="text-[#d4ff33] flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#d4ff33] animate-pulse" />
                  System Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'system' ? 'bg-[#d4ff33] text-[#0a110d]' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Solar System
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-[#d4ff33] text-[#0a110d]' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" /> My Orders & Tracking
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'bg-[#d4ff33] text-[#0a110d]' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Profile & Property
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quotes' ? 'bg-[#d4ff33] text-[#0a110d]' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> My Quotes
          </button>

          <button
            onClick={() => setActiveTab('warranty')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'warranty' ? 'bg-[#d4ff33] text-[#0a110d]' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Warranty & Service
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-[#d4ff33]/10 border border-[#d4ff33]/30 rounded-2xl p-3 mb-6 flex items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#d4ff33] shrink-0" />
            <span>Demonstration sample data — Connected to Simulated Smart Inverter IoT Feed</span>
          </div>
          <span className="bg-[#d4ff33] text-[#0a110d] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">Demo Mode</span>
        </div>

        {/* TAB 1: SOLAR SYSTEM OVERVIEW */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] mb-3 flex items-center gap-1.5">
                <Zap className="w-4 h-4 fill-current" /> Generation & Energy Overview
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/15">
                  <span className="text-[11px] uppercase text-white/60 block mb-1">Today's Generation</span>
                  <span className="text-2xl font-extrabold text-[#d4ff33]">18.4 kWh</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">+12% vs avg</span>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/15">
                  <span className="text-[11px] uppercase text-white/60 block mb-1">Monthly Generation</span>
                  <span className="text-2xl font-extrabold text-white">542 kWh</span>
                  <span className="text-[10px] text-white/50 block mt-1">This month</span>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/15">
                  <span className="text-[11px] uppercase text-white/60 block mb-1">Estimated Savings</span>
                  <span className="text-2xl font-extrabold text-[#d4ff33]">₹4,850</span>
                  <span className="text-[10px] text-white/50 block mt-1">Bill offset</span>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/15">
                  <span className="text-[11px] uppercase text-white/60 block mb-1">CO₂ Avoided</span>
                  <span className="text-2xl font-extrabold text-emerald-400">380 kg</span>
                  <span className="text-[10px] text-white/50 block mt-1">18 trees equivalent</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Hardware Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-xs text-white/60 block">System Capacity</span>
                  <span className="text-base font-bold text-white">5.4 kW Roof Array</span>
                  <span className="text-[11px] text-[#d4ff33] block">Peak Output: 5,400W</span>
                </div>

                <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-xs text-white/60 block">Panel Technology</span>
                  <span className="text-base font-bold text-white">Monocrystalline (450W)</span>
                  <span className="text-[11px] text-white/70 block">12 High-Efficiency Panels</span>
                </div>

                <div className="bg-[#1c2922] p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-xs text-white/60 block">Smart Inverter</span>
                  <span className="text-base font-bold text-white">SolarEdge 6000 Inverter</span>
                  <span className="text-[11px] text-emerald-400 block">25-Year Performance Warranty</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#d4ff33] block">Order #SNR-849201</span>
                <span className="text-sm font-bold text-white block">SUNVEXA Ultra 5kW Complete System</span>
                <span className="text-xs text-white/60 block">Placed on Feb 10, 2026 • ₹2,45,000</span>
              </div>
              <button
                onClick={onTrackOrder}
                className="bg-[#d4ff33] text-[#0a110d] font-bold text-xs px-4 py-2 rounded-full cursor-pointer"
              >
                Track Live Order
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-white/50 block mb-0.5">Name</span>
              <span className="font-semibold text-white">{user.name}</span>
            </div>
            <div>
              <span className="text-white/50 block mb-0.5">Email</span>
              <span className="font-semibold text-white truncate block">{user.email}</span>
            </div>
            <div>
              <span className="text-white/50 block mb-0.5">Phone</span>
              <span className="font-semibold text-white">{user.phone}</span>
            </div>
            <div>
              <span className="text-white/50 block mb-0.5">Location</span>
              <span className="font-semibold text-white">{user.location}</span>
            </div>
          </div>
        )}

        {/* TAB 4: QUOTES */}
        {activeTab === 'quotes' && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
            <span className="text-[#d4ff33] font-bold block">Active Solar Assessment Proposal #Q-4921</span>
            <span className="text-white font-semibold block">5.4 kW Roof Microgrid Design — Estimated ₹2,45,000</span>
            <span className="text-white/60 block">Approved DISCOM Net Metering Clearance in progress.</span>
          </div>
        )}

        {/* TAB 5: WARRANTY */}
        {activeTab === 'warranty' && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
            <span className="text-[#d4ff33] font-bold block">25-Year Performance Assurance Certificate</span>
            <span className="text-white block">Coverage: 10-Year Full Hardware Replacement + 25-Year Linear Power Degradation Protection (&lt; 0.5%/yr).</span>
            <span className="text-emerald-400 block font-semibold">Active Status: Verified</span>
          </div>
        )}

      </div>
    </div>
  );
};
