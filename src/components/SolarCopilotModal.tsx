import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, User, Sun, ArrowRight, Zap, ShoppingCart } from 'lucide-react';
import { SOLAR_PRODUCTS, SolarProduct } from '../data/solarProducts';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  actionButton?: {
    label: string;
    action: () => void;
  };
}

interface SolarCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator: () => void;
  onSelectProduct: (product: SolarProduct) => void;
}

export const SolarCopilotModal: React.FC<SolarCopilotModalProps> = ({
  isOpen,
  onClose,
  onOpenCalculator,
  onSelectProduct
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Solar Copilot ☀️. How can I assist with your solar panels, inverter selection, battery storage, or monthly bill savings today?'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');

    // Generate intelligent AI demo response based on user query
    setTimeout(() => {
      let responseText = '';
      let actionBtn: { label: string; action: () => void } | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('6,000') || lower.includes('6000') || lower.includes('bill')) {
        responseText = 'Based on an average monthly electricity bill of ₹6,000, a solar system around 5 kW (approx 9 to 10 × 550W panels) is worth evaluating. This is a preliminary estimate. Your exact requirement depends on your location, shading, and DISCOM tariff.';
        actionBtn = {
          label: 'Calculate My Solar System',
          action: () => {
            onClose();
            onOpenCalculator();
          }
        };
      } else if (lower.includes('450w') || lower.includes('550w') || lower.includes('wattage')) {
        responseText = 'Monocrystalline 550W PERC panels offer ~22.8% efficiency, requiring significantly less roof area per kilowatt than 450W panels (~17.5% efficiency). 550W panels are ideal for maximum output on limited rooftops.';
        actionBtn = {
          label: 'View 550W Monocrystalline Panels',
          action: () => {
            const p = SOLAR_PRODUCTS.find(item => item.id === 'panel-mono-550');
            if (p) onSelectProduct(p);
            onClose();
          }
        };
      } else if (lower.includes('battery') || lower.includes('backup')) {
        responseText = 'A Lithium Iron Phosphate (LiFePO4) battery stores excess daytime solar energy for nighttime consumption or grid blackouts. If your local power grid has frequent outages, a 10.2kWh battery wall provides total energy independence.';
        actionBtn = {
          label: 'View 10.2kWh LiFePO4 Battery',
          action: () => {
            const p = SOLAR_PRODUCTS.find(item => item.id === 'bat-lfp-10k');
            if (p) onSelectProduct(p);
            onClose();
          }
        };
      } else if (lower.includes('inverter') || lower.includes('hybrid')) {
        responseText = 'Hybrid solar inverters manage both solar panel generation and battery charge/discharge simultaneously, with automatic zero-drop grid switching during power cuts.';
        actionBtn = {
          label: 'View 6kW Hybrid Inverter',
          action: () => {
            const p = SOLAR_PRODUCTS.find(item => item.id === 'inv-hybrid-6k');
            if (p) onSelectProduct(p);
            onClose();
          }
        };
      } else {
        responseText = 'I can help you size your rooftop solar system, compare Monocrystalline vs Polycrystalline panels, calculate return on investment, or select hybrid inverters. Feel free to ask!';
      }

      setMessages(prev => [...prev, { sender: 'ai', text: responseText, actionButton: actionBtn }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="bg-[#121c17] text-white w-full max-w-md h-full p-6 border-l border-white/20 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Copilot Header */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#d4ff33] text-[#0a110d] flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  Solar Copilot <Sparkles className="w-3.5 h-3.5 text-[#d4ff33]" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold block">AI Knowledge Assistant</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white p-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Preset Prompts */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {[
              'Bill ₹6,000/mo?',
              '450W vs 550W panels?',
              'Do I need a battery?',
              'Hybrid inverters?'
            ].map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="bg-white/10 hover:bg-[#d4ff33] hover:text-[#0a110d] px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/80 transition-all border border-white/15 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat History Messages */}
          <div className="space-y-3 max-h-[58vh] overflow-y-auto pr-1">
            {messages.map((m, idx) => (
              <div 
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#d4ff33] text-[#0a110d] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#d4ff33] text-[#0a110d] font-semibold rounded-br-none'
                    : 'bg-white/10 text-white border border-white/10 rounded-bl-none space-y-2'
                }`}>
                  <p>{m.text}</p>
                  
                  {m.actionButton && (
                    <button
                      onClick={m.actionButton.action}
                      className="mt-2 w-full bg-[#d4ff33] text-[#0a110d] font-bold py-1.5 px-3 rounded-full text-[11px] flex items-center justify-center gap-1 cursor-pointer hover:bg-[#bce61a]"
                    >
                      <span>{m.actionButton.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-white/10 pt-4 flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Copilot about solar panels, inverters..."
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4ff33]"
          />
          <button
            onClick={() => handleSend()}
            className="bg-[#d4ff33] text-[#0a110d] p-2.5 rounded-full hover:bg-[#bce61a] transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
