"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <h2 className="text-3xl font-bold text-orange-500">
            Styles Bazar
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            Styles Bazar is your trusted online shopping destination in
            Pakistan. We provide quality products at affordable prices.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="font-bold text-xl mb-4">
            Quick Links
          </h3>

          <div className="space-y-3 flex flex-col">

            <Link href="/">Home</Link>

            <Link href="/about">About Us</Link>

            <Link href="/contact">Contact Us</Link>

            <Link href="/cart">Cart</Link>

          </div>

        </div>

        {/* Policies */}

        <div>

          <h3 className="font-bold text-xl mb-4">
            Policies
          </h3>

          <div className="space-y-3 flex flex-col">

            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>

            <Link href="/shipping-policy">
              Shipping Policy
            </Link>

            <Link href="/refund-policy">
              Refund Policy
            </Link>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="font-bold text-xl mb-4">
            Contact
          </h3>

          <p className="mb-2">
            📧 support@stylesbazar.com
          </p>

          <p className="mb-4">
            📱 +92 335 6891247
          </p>

          <div className="flex gap-5 text-3xl">

            <a
              href="https://facebook.com"
              target="_blank"
            >
              <FaFacebook className="hover:text-blue-500" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
            >
              <FaInstagram className="hover:text-pink-500" />
            </a>

            <a
              href="https://wa.me/923356891247"
              target="_blank"
            >
              <FaWhatsapp className="hover:text-green-500" />
            </a>

            <a
              href="mailto:support@stylesbazar.com"
            >
              <FaEnvelope className="hover:text-orange-500" />
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 py-6 text-center text-gray-400">

        © 2026 Styles Bazar. All Rights Reserved.

      </div>

    </footer>
  );
}