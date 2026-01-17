
import React, { useState, useMemo } from 'react';
import { NAV_ITEMS, PRODUCTS } from './constants';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

type View = 'home' | 'products' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [language, setLanguage] = useState<'EN' | 'ZH'>('EN');

  const categories = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))], []);

  const filteredProducts = useMemo(() => 
    activeCategory === 'All' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeCategory)
  , [activeCategory]);

  const navigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return (
          <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
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
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
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
          <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-blue-900">
                    {language === 'EN' ? 'Expertise in Lubrication' : '专业的润滑技术'}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {language === 'EN' 
                      ? 'Hangte has established itself as a leader in petroleum technology. We operate state-of-the-art facilities ensuring every drop of oil meets rigorous international certifications.'
                      : '航特已确立了其在石油技术领域的领导地位。我们运营着最先进的设施，确保每一滴油都符合严格的国际认证。'}
                  </p>
                  <div className="space-y-4">
                    {['ISO 9001', 'Eco-Friendly', 'Global Supply', '24/7 Support'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">✓</div>
                        <span className="font-semibold text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <img src="https://picsum.photos/seed/about-page/800/600" className="rounded-2xl shadow-xl" alt="About" />
             </div>
          </section>
        );
      case 'contact':
        return (
          <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">{language === 'EN' ? 'Global Sales Inquiry' : '全球销售咨询'}</h2>
                <p className="text-gray-600 mb-8">Contact us for distribution opportunities or technical data sheets.</p>
                <div className="space-y-4">
                  <p><strong>HQ:</strong> Dongguan, China</p>
                  <p><strong>Email:</strong> sales@hangteoil.com</p>
                  <p><strong>Tel:</strong> +86 769 XXXX XXXX</p>
                </div>
              </div>
              <ContactForm />
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
                {PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <button onClick={() => navigate('products')} className="text-blue-600 font-bold hover:underline">View All Products →</button>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onNavigate={(view: string) => navigate(view as View)} 
        currentView={currentView}
        language={language}
        setLanguage={setLanguage}
      />
      
      <main className="flex-grow bg-white">
        {renderView()}
      </main>

      <Footer onNavigate={(view: string) => navigate(view as View)} />
      <ChatBot />
    </div>
  );
};

export default App;
