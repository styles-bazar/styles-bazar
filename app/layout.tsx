import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Styles Bazar",
    template: "%s | Styles Bazar",
  },
  description:
    "Pakistan's online shopping store for clothes, shoes, watches, perfumes and more.",
  keywords: [
    "Pakistan online shopping",
    "Styles Bazar",
    "Clothes",
    "Shoes",
    "Perfumes",
    "Watches",
  ],

  verification: {
    google: "TyXrrIEqPppIZRGx69QM2g7ofr-RxMTFy3iGaFEyGZ0",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </SearchProvider>
      </body>
    </html>
  );
}