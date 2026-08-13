import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle, Grid, Zap, Sparkles, Image as ImageIcon, RotateCcw } from 'lucide-react';

export const RoofAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1000&auto=format&fit=crop'
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisDone, setAnalysisDone] = useState<boolean>(true);

  const sampleRoofImages = [
    { label: 'Gable Roof Villa', url: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Flat RCC Roof', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Modern Urban Home', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop' }
  ];

  const handleImageSelect = (url: string) => {
    setIsAnalyzing(true);
    setSelectedImage(url);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      handleImageSelect(objectUrl);
    }
  };

  return (
    <section id="roof-analysis" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="bg-[#121c17]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#d4ff33]/20 text-[#d4ff33] text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-[#d4ff33]/30">
            <Camera className="w-3.5 h-3.5" /> AI Satellite Vision
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            "Analyze My Roof" — Rooftop Solar Potential
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Upload or select a rooftop photo to generate a preliminary AI panel layout overlay, usable roof area, and estimated kW system potential.
          </p>
        </div>

        {/* Upload / Sample Selector Bar */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="border-2 border-dashed border-white/20 rounded-3xl p-6 text-center hover:border-[#d4ff33] transition-colors bg-white/5 relative">
            <input 
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload className="w-8 h-8 text-[#d4ff33] mx-auto mb-2" />
            <span className="text-sm font-bold text-white block">Upload a Photo of Your Rooftop</span>
            <span className="text-xs text-white/50 block mt-1">Drag & drop or click to upload PNG/JPG</span>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/70">
            <span>Or test with sample roof photos:</span>
            {sampleRoofImages.map((s) => (
              <button
                key={s.label}
                onClick={() => handleImageSelect(s.url)}
                className="bg-white/10 hover:bg-[#d4ff33] hover:text-[#0a110d] px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer border border-white/15"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Analysis Output Canvas Frame */}
        {selectedImage && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0a110d]/90 p-6 rounded-3xl border border-white/15 shadow-2xl">
            
            {/* Image Overlay Preview Column */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/20">
              <img 
                src={selectedImage} 
                alt="Selected Roof" 
                className="w-full h-full object-cover"
              />

              {/* Panel Grid Overlay */}
              {analysisDone && !isAnalyzing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col justify-center items-center p-4">
                  <div className="grid grid-cols-5 gap-2 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-[#d4ff33]/50 shadow-2xl max-w-sm">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="h-10 bg-[#d4ff33]/20 border border-[#d4ff33] rounded-lg flex items-center justify-center text-[10px] font-bold text-[#d4ff33] shadow-md">
                        PV #{i + 1}
                      </div>
                    ))}
                  </div>
                  <span className="mt-3 bg-[#d4ff33] text-[#0a110d] font-extrabold text-xs px-3 py-1 rounded-full shadow-lg">
                    ✓ 10 Solar Panels Overlay Placed
                  </span>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center text-white space-y-3">
                  <div className="w-10 h-10 border-4 border-[#d4ff33] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold text-[#d4ff33]">Analyzing Roof Angles & Solar Irradiance...</span>
                </div>
              )}
            </div>

            {/* Analysis Stats Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff33] bg-[#d4ff33]/10 px-3 py-1 rounded-full border border-[#d4ff33]/30">
                  AI Roof Assessment
                </span>
                <span className="text-xs text-emerald-400 font-bold">Solar Potential: HIGH (94%)</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">Estimated Roof Capacity</h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <span className="text-white/50 block text-[10px]">Estimated Capacity</span>
                  <span className="text-xl font-extrabold text-[#d4ff33]">4.5 – 5.5 kW</span>
                </div>

                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <span className="text-white/50 block text-[10px]">Potential Panels</span>
                  <span className="text-xl font-extrabold text-white">8 – 10 Panels</span>
                </div>

                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <span className="text-white/50 block text-[10px]">Usable Roof Area</span>
                  <span className="text-base font-bold text-white">~420 sq. ft</span>
                </div>

                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                  <span className="text-white/50 block text-[10px]">Shading Risk</span>
                  <span className="text-base font-bold text-emerald-400">Minimal / Optimal</span>
                </div>
              </div>

              {/* Mandatory AI Disclaimer Requirement */}
              <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 text-[11px] text-amber-200/90 leading-snug flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>AI-assisted preliminary visualization</strong> — not a professional engineering or site assessment.
                </span>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
