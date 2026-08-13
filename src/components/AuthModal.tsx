import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Building, ArrowRight, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserData) => void;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  userType: 'Residential' | 'Commercial' | 'Industrial';
  location: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your passwords.');
        setLoading(false);
        return;
      }

      try {
        const response = await registerUser({
          fullName,
          email,
          phone: phoneNumber,
          password,
          address: location,
          city: location.split(',')[0] || location,
          state: location.split(',')[1]?.trim() || 'Maharashtra',
          pinCode: '400001',
        });

        const loggedInUser: UserData = {
          name: response.user?.fullName || fullName,
          email: response.user?.email || email,
          phone: response.user?.phone || phoneNumber,
          userType: userType,
          location: location || 'Mumbai, MH',
        };

        setSuccessMsg('Account created successfully! Logging you in...');
        setTimeout(() => {
          onLoginSuccess(loggedInUser);
          setSuccessMsg('');
          onClose();
        }, 1200);
      } catch (err: any) {
        setErrorMsg(err.message || 'Registration failed. Email may already be in use.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await loginUser(email, password);

        const loggedInUser: UserData = {
          name: response.user?.fullName || email.split('@')[0],
          email: response.user?.email || email,
          phone: response.user?.phone || '+91 98765 43210',
          userType: 'Residential',
          location: response.user?.city ? `${response.user.city}, ${response.user.state || ''}` : 'Mumbai, MH',
        };

        setSuccessMsg('Authenticated! Welcome back...');
        setTimeout(() => {
          onLoginSuccess(loggedInUser);
          setSuccessMsg('');
          onClose();
        }, 1000);
      } catch (err: any) {
        setErrorMsg(err.message || 'Authentication failed. Account not found or wrong password.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121c17] text-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 text-[#d4ff33] font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 fill-current" /> Secure Customer Portal
        </div>

        <h3 className="text-2xl font-extrabold mb-1">
          {mode === 'login' ? 'Welcome Back to SUNVEXA' : 'Create Your Solar Account'}
        </h3>
        <p className="text-xs text-white/70 mb-6">
          {mode === 'login' 
            ? 'Sign in to access your system dashboard and generation metrics.' 
            : 'Join 50,000+ homeowners and businesses powering a clean future.'}
        </p>

        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs px-4 py-3 rounded-xl mb-4 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-[#d4ff33] text-[#0a110d] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <p className="text-sm font-semibold text-[#d4ff33]">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-white/40" />
                      <input 
                        type="tel" 
                        required
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765..."
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">User Type</label>
                    <select
                      value={userType}
                      onChange={e => setUserType(e.target.value as any)}
                      className="w-full bg-[#1c2922] border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4ff33]"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">City / Location</label>
                  <input 
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, KA"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-white/80 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
                    <input 
                      type="password" 
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
                    />
                  </div>
                </div>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs text-white/70 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="accent-[#d4ff33] rounded"
                  />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => alert('Demo Mode: Password reset link sent to your email.')}
                  className="text-[#d4ff33] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4ff33] hover:bg-[#bce61a] text-[#0a110d] font-bold py-3.5 rounded-full text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Processing...' : (mode === 'login' ? 'Sign In to Portal' : 'Create Account')}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="text-center pt-3 text-xs text-white/60">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => { setMode('signup'); setErrorMsg(''); }}
                    className="text-[#d4ff33] font-semibold hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => { setMode('login'); setErrorMsg(''); }}
                    className="text-[#d4ff33] font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
