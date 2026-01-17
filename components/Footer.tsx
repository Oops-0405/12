
import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-4 md:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">H</div>
            <span className="text-xl font-bold text-white tracking-tight uppercase">Hangte Oil</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Leading the path in lubrication technology since 1998. Committed to quality, innovation, and sustainable energy solutions.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Links</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-blue-500">Home</button></li>
            <li><button onClick={() => onNavigate('products')} className="hover:text-blue-500">Products</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-blue-500">About Us</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-500">Contact</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-blue-500">Technical Sheets</a></li>
            <li><a href="#" className="hover:text-blue-500">Certifications</a></li>
            <li><a href="#" className="hover:text-blue-500">Safety Data</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-xs mb-4">Get technical updates and market insights.</p>
          <div className="flex">
            <input type="text" placeholder="Email address" className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full text-sm outline-none" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">Join</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-xs flex flex-col md:flex-row justify-between gap-4">
        <p>© 2024 Hangte Lubricating Oil Co., Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
