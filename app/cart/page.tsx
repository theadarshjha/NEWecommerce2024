'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/components/contexts/CartContext';
import { useRouter } from 'next/navigation'; // Correct import for client-side navigation

const CartPage: React.FC = () => {
  const { cart, setCart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsMounted(true);
  }, [setCart]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const handleQuantityChange = (product: any, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(product);
    } else {
      updateQuantity(product, quantity);
    }
  };

  const discount = 466; // Example discount value
  const finalTotal = totalPrice - discount;

  const handleCheckout = () => {
    Router.push('/checkout'); // Correct function call
  };

  return (
    <main className="mt-10 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <section className="lg:col-span-2">
          <div className="box p-5 space-y-3 bg-white shadow rounded-md">
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <React.Fragment key={product.id}>
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg text-black font-semibold">{product.name}</h2>
                        <p className="text-sm text-black">{product.description}</p>
                        <p className="text-md text-black font-bold">₹{product.discountPrice ?? product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-black space-x-2 mt-4 md:mt-0">
                      <button
                        onClick={() => handleQuantityChange(product, product.quantity - 1)}
                        className="px-3 py-1 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="text-black">{product.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(product, product.quantity + 1)}
                        className="px-3 py-1 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(product)}
                        className="ml-4 px-3 py-1 bg-blue-200 text-black rounded-lg hover:bg-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {index < cart.length - 1 && <hr className="my-4" />}
                </React.Fragment>
              ))
            ) : (
              <h1 className="text-black text-center">Your cart is empty.</h1>
            )}
          </div>
        </section>

        <section className="lg:sticky top-0 h-auto lg:h-[100vh]">
          {cart.length > 0 && (
            <div className="box p-5 rounded-md bg-white shadow">
              <p className="font-bold text-black pb-4">PRICE DETAILS</p>
              <hr />
              <div className="space-y-3">
                <div className="flex justify-between text-black pt-3">
                  <span>Total Price</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-black pt-3">
                  <span>Discount</span>
                  <span className="text-green-700">₹-{discount}</span>
                </div>
                <div className="flex justify-between text-black pt-3">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <div className="flex justify-between text-black font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">₹{finalTotal}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout} // Correct function call
                className="text-lg mt-8 px-4 py-2 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                CHECKOUT
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CartPage;
