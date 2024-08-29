'use client';

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Product } from '@/types/product';

interface CartItem extends Product {
  href: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  updateQuantity: (product: Product, quantity: number) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  totalPrice: number;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartCount: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setIsHydrated(true);
    }
  }, []);

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ensure href and quantity are included in the new CartItem
        return [...prevCart, { ...product, href: product.href || '', quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const updateQuantity = (product: Product, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const increaseQuantity = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return prevCart;
    });
  };

  const decreaseQuantity = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevCart.filter(item => item.id !== product.id);
        }
      }
      return prevCart;
    });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * (item.discountPrice ?? item.price),
    0
  );

  const cartCount = cart.length; // Number of unique items

  if (!isHydrated) {
    return null; // Prevent rendering until hydrated
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, totalPrice, setCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
