
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative bg-gray-900 h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/oilhero/1920/1080" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="max-w-2xl animate-in slide-in-from-left duration-700">
          <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Global Industrial Leader
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Engineering <span className="text-blue-500">Excellence</span> in Every Drop
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Leading manufacturer of industrial and automotive lubricants. Exporting to over 50 countries with unmatched quality and durability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onCtaClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              View Catalog
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all">
              Technical Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
