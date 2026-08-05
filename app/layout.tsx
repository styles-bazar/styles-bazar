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
  metadataBase: new URL("https://styles-bazar.vercel.app"),

  title: {
    default: "Styles Bazar | Pakistan Online Shopping Store",
    template: "%s | Styles Bazar",
  },

  description:
    "Styles Bazar is Pakistan's online shopping store for Clothing, Shoes, Watches, Perfumes, Beauty Products and more with Cash on Delivery.",

  keywords: [
    "Styles Bazar",
    "Online Shopping Pakistan",
    "Pakistan Shopping",
    "Clothes Pakistan",
    "Shoes Pakistan",
    "Perfume Pakistan",
    "Watches Pakistan",
    "Beauty Products",
    "Cash on Delivery Pakistan",
  ],

  authors: [{ name: "Styles Bazar" }],

  creator: "Styles Bazar",

  publisher: "Styles Bazar",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Styles Bazar",
    description:
      "Pakistan's Online Shopping Store for Clothing, Shoes, Watches, Perfumes and Beauty Products.",
    url: "https://styles-bazar.vercel.app",
    siteName: "Styles Bazar",
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Styles Bazar",
    description:
      "Pakistan's Online Shopping Store for Clothing, Shoes, Watches and Beauty Products.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <SearchProvider>
    <WishlistProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </WishlistProvider>
  </SearchProvider>
</body>
    </html>
  );
}