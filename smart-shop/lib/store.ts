import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './api';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getBnplTotal: () => number;
  getNonBnplTotal: () => number;
  getAmountToPayNow: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId: string) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getBnplTotal: () => {
        return get().items
          .filter(item => item.bnpl_available)
          .reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getNonBnplTotal: () => {
        return get().items
          .filter(item => !item.bnpl_available)
          .reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getAmountToPayNow: () => {
        const bnplTotal = get().getBnplTotal();
        const nonBnplTotal = get().getNonBnplTotal();
        const bnplDeposit = bnplTotal * 0.4;
        return nonBnplTotal + bnplDeposit;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
