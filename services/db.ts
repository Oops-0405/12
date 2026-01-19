
import { Product, Inquiry } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'hangte_local_products',
  INQUIRIES: 'hangte_local_inquiries'
};

const initData = async () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    // 移除 .tsx
    const { PRODUCTS } = await import('../constants');
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([]));
  }
};

export const db = {
  getProducts: async (): Promise<Product[]> => {
    await initData();
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProduct: async (product: Product) => {
    const products = await db.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    
    let updatedProducts;
    if (index > -1) {
      updatedProducts = [...products];
      updatedProducts[index] = product;
    } else {
      const newProduct = { ...product, id: Date.now().toString() };
      updatedProducts = [newProduct, ...products];
    }
    
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updatedProducts));
    return { success: true, product };
  },

  deleteProduct: async (id: string) => {
    const products = await db.getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    return { success: true };
  },

  getInquiries: async (): Promise<Inquiry[]> => {
    await initData();
    const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return data ? JSON.parse(data) : [];
  },

  addInquiry: async (inquiry: Omit<Inquiry, 'id' | 'date'>) => {
    const inquiries = await db.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Date.now().toString(),
      date: new Date().toLocaleString()
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    return { success: true, id: newInquiry.id };
  }
};
