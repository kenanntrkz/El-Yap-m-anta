import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vintage Deri Omuz Çantası',
    description: 'El yapımı, doğal deri kullanılarak üretilen şık ve dayanıklı omuz çantası. Her çanta benzersiz doku ve renk tonlarına sahiptir.',
    price: 1250,
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
    ],
    materials: ['Doğal deri', 'Pirinç aksesuar'],
    dimensions: {
      width: 30,
      height: 25,
      depth: 10
    },
    inStock: true,
    stockQuantity: 5,
    featured: true
  },
  {
    id: '2',
    name: 'Bohem Tarz El Çantası',
    description: 'Özel dokuma tekniği ile üretilen, renkli ve özgün tasarımlı el çantası. Günlük kullanım için ideal.',
    price: 850,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
    ],
    materials: ['Pamuk iplik', 'Deri detay'],
    dimensions: {
      width: 25,
      height: 20,
      depth: 8
    },
    inStock: true,
    stockQuantity: 3,
    featured: true
  }
];