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
    default: "Styles Bazar",
    template: "%s | Styles Bazar",
  },

  description:
    "Pakistan's Online Shopping Store for Clothes, Shoes, Watches, Perfumes and Fashion Accessories.",

  keywords: [
    "Pakistan Online Shopping",
    "Styles Bazar",
    "Clothes",
    "Shoes",
    "Perfumes",
    "Watches",
    "Fashion",
    "Online Store",
  ],

  verification: {
    google: "TyXrrIEqPppIZRGx69QM2g7ofr-RxMTFy3iGaFEyGZ0",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Styles Bazar",
    description:
      "Pakistan's Online Shopping Store for Clothes, Shoes, Watches and Perfumes.",
    url: "https://styles-bazar.vercel.app",
    siteName: "Styles Bazar",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Styles Bazar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Styles Bazar",
    description:
      "Pakistan's Online Shopping Store for Clothes, Shoes, Watches and Perfumes.",
    images: ["/logo.png"],
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