
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      <div className="relative overflow-hidden h-56">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-900 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-grow flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto space-y-2 mb-6">
          {product.features.slice(0, 2).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              {feature}
            </div>
          ))}
        </div>
        
        <button className="w-full py-2.5 text-blue-600 font-bold text-sm border-2 border-blue-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-lg transition-all duration-300">
          Request Specs
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
