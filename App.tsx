
import React, { useState, useMemo, useEffect } from 'react';
import { db } from './services/db';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { Product } from './types';

type View = 'home' | 'products' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [language, setLanguage] = useState<'EN' | 'ZH'>('EN');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await db.getProducts();
      // 如果 API 没返回数据，使用常量兜底确保前端不空白
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        import('./constants.tsx').then(m => setProducts(m.PRODUCTS));
      }
    };
    loadData();
  }, [currentView]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  const filteredProducts = useMemo(() => 
    activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory)
  , [activeCategory, products]);

  const navigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return (
          <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'EN' ? 'Our Premium Solutions' : '我们的优质解决方案'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                      activeCategory === cat 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      case 'about':
        return (
          <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-blue-900">
                    {language === 'EN' ? 'Expertise in Lubrication' : '专业的润滑技术'}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    {language === 'EN' 
                      ? 'Hangte has established itself as a leader in petroleum technology.'
                      : '航特已确立了其在石油技术领域的领导地位。'}
                  </p>
                </div>
                <img src="https://picsum.photos/seed/about-page/800/600" className="rounded-2xl shadow-xl" />
             </div>
          </section>
        );
      case 'contact':
        return (
          <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">{language === 'EN' ? 'Global Sales Inquiry' : '全球销售咨询'}</h2>
                <ContactForm />
              </div>
            </div>
          </section>
        );
      default:
        return (
          <>
            <Hero onCtaClick={() => navigate('products')} />
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
               <h2 className="text-center text-3xl font-bold mb-12">Featured Products</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onNavigate={(view: string) => navigate(view as View)} 
        currentView={currentView}
        language={language}
        setLanguage={setLanguage}
      />
      <main className="flex-grow">{renderView()}</main>
      <Footer onNavigate={(view: string) => navigate(view as View)} />
      <ChatBot />
      {/* 移除了左下角的后台管理跳转，通过 /admin 直接访问 */}
    </div>
  );
};

export default App;
