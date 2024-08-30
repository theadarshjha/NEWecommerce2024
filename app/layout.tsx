import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from '@/components/contexts/CartContext';
import { Navbar } from "@/components/home/Navbar";


export const metadata: Metadata = {
  title: "Ecommerce 4x4",
  description: "futurz 4x4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <CartProvider>
        <Navbar/>
        {children}
        </CartProvider>
        </body>
    </html>
  );
}
