
import { Product, Inquiry } from '../types';

/**
 * 本地模拟数据库服务层 (LocalStorage 实现)
 * 模拟后端存储，无需外部数据库即可在本地保存数据
 */

const STORAGE_KEYS = {
  PRODUCTS: 'hangte_local_products',
  INQUIRIES: 'hangte_local_inquiries'
};

// 初始化默认数据
const initData = async () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    const { PRODUCTS } = await import('../constants.tsx');
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([]));
  }
};

export const db = {
  // 获取所有产品
  getProducts: async (): Promise<Product[]> => {
    await initData();
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  // 保存/更新产品
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

  // 删除产品
  deleteProduct: async (id: string) => {
    const products = await db.getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    return { success: true };
  },

  // 获取客户询盘
  getInquiries: async (): Promise<Inquiry[]> => {
    await initData();
    const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return data ? JSON.parse(data) : [];
  },

  // 提交询盘 (前台调用)
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
