
import React from 'react';
import { Product, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#products' },
  { label: 'Applications', href: '#applications' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Advanced Synthetic Engine Oil',
    category: 'Automotive',
    description: 'Fully synthetic high-performance oil designed for modern high-output engines.',
    image: 'https://picsum.photos/seed/oil1/600/400',
    features: ['Low friction', 'High temperature stability', 'Engine longevity']
  },
  {
    id: '2',
    name: 'Heavy Duty Industrial Lubricant',
    category: 'Industrial',
    description: 'Specialized formula for mining, construction, and heavy machinery equipment.',
    image: 'https://picsum.photos/seed/oil2/600/400',
    features: ['Extreme pressure resistance', 'Water separation', 'Corrosion protection']
  },
  {
    id: '3',
    name: 'Hydraulic System Fluid',
    category: 'Hydraulic',
    description: 'Premium hydraulic fluid for precise control systems and efficient power transfer.',
    image: 'https://picsum.photos/seed/oil3/600/400',
    features: ['Anti-wear', 'Oxidation resistance', 'Wide temperature range']
  },
  {
    id: '4',
    name: 'Marine Engine Lubricant',
    category: 'Marine',
    description: 'Durable lubrication specifically engineered for harsh marine environments.',
    image: 'https://picsum.photos/seed/oil4/600/400',
    features: ['Saltwater resistance', 'Clean burn technology', 'Extended drain intervals']
  }
];
