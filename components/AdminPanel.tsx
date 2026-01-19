
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Product, Inquiry } from '../types';

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [tab, setTab] = useState<'products' | 'inquiries'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Fix: db.getProducts() and db.getInquiries() return Promises, need to await them
  useEffect(() => {
    const fetchData = async () => {
      const prodData = await db.getProducts();
      const inqData = await db.getInquiries();
      setProducts(prodData);
      setInquiries(inqData);
    };
    fetchData();
  }, []);

  // Fix: db.saveProduct and db.getProducts are async
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await db.saveProduct(editingProduct as Product);
      const updatedProducts = await db.getProducts();
      setProducts(updatedProducts);
      setEditingProduct(null);
    }
  };

  // Fix: db.deleteProduct and db.getProducts are async
  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      await db.deleteProduct(id);
      const updatedProducts = await db.getProducts();
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Hangte Management System</h1>
        <div className="flex gap-4">
          <button onClick={() => setTab('products')} className={`px-4 py-2 rounded ${tab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Products</button>
          <button onClick={() => setTab('inquiries')} className={`px-4 py-2 rounded ${tab === 'inquiries' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Inquiries ({inquiries.length})</button>
        </div>
      </div>

      {tab === 'products' ? (
        <div className="space-y-6">
          <button 
            onClick={() => setEditingProduct({ name: '', category: 'Automotive', description: '', features: [], image: 'https://picsum.photos/seed/new/600/400' })}
            className="bg-green-600 text-white px-6 py-2 rounded font-bold"
          >
            + Add New Product
          </button>

          {editingProduct && (
            <form onSubmit={handleSaveProduct} className="bg-gray-50 p-6 rounded-xl border border-blue-100 space-y-4">
              <h3 className="font-bold text-lg">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} placeholder="Product Name" className="p-2 border rounded" />
                <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="p-2 border rounded">
                  <option>Automotive</option>
                  <option>Industrial</option>
                  <option>Hydraulic</option>
                  <option>Marine</option>
                </select>
              </div>
              <textarea required value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} placeholder="Description" className="w-full p-2 border rounded" rows={3} />
              <div className="flex gap-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={() => setEditingProduct(null)} className="text-gray-500">Cancel</button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">{p.category}</span></td>
                    <td className="p-4 space-x-2">
                      <button onClick={() => setEditingProduct(p)} className="text-blue-600 text-sm font-bold">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 text-sm font-bold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.length === 0 ? <p className="text-center py-12 text-gray-400">No messages yet.</p> : (
            inquiries.map(inq => (
              <div key={inq.id} className="bg-white p-6 rounded-xl border hover:border-blue-300 transition-all shadow-sm">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-lg">{inq.name} <span className="text-sm font-normal text-gray-400">from {inq.company}</span></h4>
                  <span className="text-xs text-gray-400">{inq.date}</span>
                </div>
                <p className="text-blue-600 text-sm mb-4 font-medium">{inq.email}</p>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">"{inq.message}"</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;