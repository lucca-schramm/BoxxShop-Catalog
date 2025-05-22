export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  available: boolean;
}

export interface ProductWithVariants extends Product {
  sizes: ProductVariant[];
  colors: ProductVariant[];
  alternativeImages?: string[];
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
} 