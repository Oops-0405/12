
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { db } from './services/db';
import { Product, Inquiry } from './types';

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [tab, setTab] = useState<'products' | 'inquiries'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const refreshData = async () => {
    const p = await db.getProducts();
    const i = await db.getInquiries();
    setProducts(p || []);
    setInquiries(i || []);
  };

  useEffect(() => { refreshData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await db.saveProduct(editingProduct as Product);
      setEditingProduct(null);
      refreshData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this item?')) {
      await db.deleteProduct(id);
      refreshData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">HQ DASHBOARD</h1>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Global Operations Control</p>
        </div>
        <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          <button onClick={() => setTab('products')} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${tab === 'products' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>CATALOG</button>
          <button onClick={() => setTab('inquiries')} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${tab === 'inquiries' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>INQUIRIES ({inquiries.length})</button>
        </div>
      </div>

      {tab === 'products' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-blue-600 p-6 rounded-[2rem] shadow-xl shadow-blue-500/20 text-white">
            <div>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Stock Overview</p>
              <h3 className="text-2xl font-bold">{products.length} Professional Products</h3>
            </div>
            <button 
              onClick={() => setEditingProduct({ name: '', category: 'Industrial', description: '', features: [], image: 'https://picsum.photos/seed/new/800/600' })}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
            >
              + ADD NEW SKU
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4 mb-4">
                  <img src={p.image} className="w-16 h-16 rounded-2xl object-cover shadow-inner" />
                  <div>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">{p.category}</span>
                    <h4 className="font-bold text-gray-800 mt-1">{p.name}</h4>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingProduct(p)} className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">EDIT</button>
                  <button onClick={() => handleDelete(p.id)} className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors">DELETE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map(inq => (
            <div key={inq.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">{inq.name}</h4>
                  <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded border">{inq.date}</span>
                </div>
                <p className="text-blue-600 text-xs font-bold mb-3">{inq.company} • {inq.email}</p>
                <div className="bg-gray-50 p-4 rounded-2xl text-gray-600 text-sm leading-relaxed italic border border-gray-100">
                  "{inq.message}"
                </div>
              </div>
              <div className="flex md:flex-col gap-2 shrink-0">
                <a href={`mailto:${inq.email}`} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-bold text-center hover:bg-blue-700 transition-colors">REPLY EMAIL</a>
                <button className="flex-1 bg-gray-100 text-gray-400 px-6 py-3 rounded-xl text-xs font-bold cursor-not-allowed">ARCHIVE</button>
              </div>
            </div>
          ))}
          {inquiries.length === 0 && <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">No Incoming Inquiries</div>}
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-xl animate-in zoom-in duration-200">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Product Metadata</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Product Name</label>
                  <input required value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Category</label>
                  <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-medium">
                    <option>Automotive</option><option>Industrial</option><option>Hydraulic</option><option>Marine</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Description</label>
                <textarea required value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-medium" rows={3} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20">COMMIT CHANGES</button>
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold">DISCARD</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const AdminApp = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-sm:max-w-xs max-w-sm border border-white/20">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/40">H</div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Security</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">Access Terminal</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if(pass === 'hangte2024') setIsAuth(true); else alert('INVALID KEY'); }} className="space-y-4">
            <input 
              autoFocus
              type="password" 
              placeholder="••••" 
              className="w-full p-5 bg-gray-50 rounded-2xl text-center text-2xl tracking-[0.5em] outline-none border-2 border-transparent focus:border-blue-600 transition-all" 
              onChange={e => setPass(e.target.value)} 
            />
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 uppercase">Login</button>
          </form>
          <div className="mt-8 text-center">
            <a href="index.html" className="text-[10px] font-black text-gray-300 hover:text-blue-600 uppercase tracking-widest transition-colors">← Exit</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-[100] backdrop-blur-md bg-white/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-sm">H</div>
          <span className="font-black text-xs tracking-widest text-gray-900 uppercase">Hangte Systems <span className="text-blue-600">v4.0.1</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded">SYSTEMS ONLINE</span>
          <button onClick={() => setIsAuth(false)} className="text-[10px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest">Logout</button>
        </div>
      </header>
      <AdminPanel />
    </div>
  );
};

const root = createRoot(document.getElementById('admin-root')!);
root.render(<AdminApp />);
