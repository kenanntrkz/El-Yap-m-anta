export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  materials: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  inStock: boolean;
  stockQuantity: number; // Yeni eklenen alan
  featured: boolean;
}