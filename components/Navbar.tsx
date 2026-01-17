
import React, { useState } from 'react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
  language: 'EN' | 'ZH';
  setLanguage: (lang: 'EN' | 'ZH') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: language === 'EN' ? 'Home' : '首页', id: 'home' },
    { label: language === 'EN' ? 'Products' : '产品中心', id: 'products' },
    { label: language === 'EN' ? 'About Us' : '关于我们', id: 'about' },
    { label: language === 'EN' ? 'Contact' : '联系我们', id: 'contact' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">H</div>
            <span className="text-xl font-bold tracking-tight text-blue-900">HANGTE<span className="text-blue-600">OIL</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => handleNav(item.id)}
                className={`text-sm font-semibold transition-colors uppercase tracking-wider ${
                  currentView === item.id ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center gap-2 border-l pl-6 border-gray-200">
              <button 
                onClick={() => setLanguage('EN')}
                className={`text-xs font-bold ${language === 'EN' ? 'text-blue-600' : 'text-gray-400'}`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setLanguage('ZH')}
                className={`text-xs font-bold ${language === 'ZH' ? 'text-blue-600' : 'text-gray-400'}`}
              >
                中文
              </button>
            </div>

            <button 
              onClick={() => handleNav('contact')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md"
            >
              {language === 'EN' ? 'Inquiry' : '立即咨询'}
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => handleNav(item.id)}
              className={`block w-full text-left text-lg font-medium ${currentView === item.id ? 'text-blue-600' : 'text-gray-800'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-4 pt-4 border-t">
             <button onClick={() => setLanguage('EN')} className={language === 'EN' ? 'text-blue-600 font-bold' : ''}>English</button>
             <button onClick={() => setLanguage('ZH')} className={language === 'ZH' ? 'text-blue-600 font-bold' : ''}>中文</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
