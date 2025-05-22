import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

interface ProductState {
  selectedSize: string | null;
  selectedColor: string | null;
  shippingAddress: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
  } | null;
  cart: CartItem[];
  setSelectedSize: (size: string | null) => void;
  setSelectedColor: (color: string | null) => void;
  setShippingAddress: (address: ProductState['shippingAddress']) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      selectedSize: null,
      selectedColor: null,
      shippingAddress: null,
      cart: [],
      setSelectedSize: (size) => set({ selectedSize: size }),
      setSelectedColor: (color) => set({ selectedColor: color }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (i) =>
              i.id === item.id &&
              i.selectedSize === item.selectedSize &&
              i.selectedColor === item.selectedColor
          );

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i === existingItem
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })),
    }),
    {
      name: 'product-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({
        selectedSize: state.selectedSize,
        selectedColor: state.selectedColor,
        shippingAddress: state.shippingAddress,
        cart: state.cart,
      }),
    }
  )
); 