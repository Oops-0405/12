
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  message: string;
  date: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum Language {
  EN = 'English',
  ZH = '中文',
  RU = 'Русский'
}
