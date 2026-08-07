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
    <footer className="bg-[#111827] text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-orange-500">
              Styles Bazar
            </h2>

            <p className="text-gray-400 mt-5 leading-7">
              Styles Bazar is your trusted online shopping destination
              in Pakistan. We provide quality products at affordable prices.
            </p>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-300">

              <Link
                href="/"
                className="hover:text-orange-500 transition"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="hover:text-orange-500 transition"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="hover:text-orange-500 transition"
              >
                Contact Us
              </Link>

              <Link
                href="/cart"
                className="hover:text-orange-500 transition"
              >
                Cart
              </Link>

            </div>
          </div>


          {/* Policies */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Policies
            </h3>

            <div className="flex flex-col gap-4 text-gray-300">

              <Link
                href="/privacy-policy"
                className="hover:text-orange-500 transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="hover:text-orange-500 transition"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/shipping-policy"
                className="hover:text-orange-500 transition"
              >
                Shipping Policy
              </Link>

              <Link
                href="/contact"
                className="hover:text-orange-500 transition"
              >
                Refund Policy
              </Link>

            </div>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">

              {/* Email */}
              <a
                href="mailto:stylesbazar247@gmail.com"
                className="flex items-center gap-3 hover:text-orange-500 transition"
              >
                <FaEnvelope className="text-xl" />
                <span>stylesbazar247@gmail.com</span>
              </a>


              {/* Phone */}
              <a
                href="tel:+923356891247"
                className="flex items-center gap-3 hover:text-orange-500 transition"
              >
                <span className="text-xl">📱</span>
                <span>+92 335 6891247</span>
              </a>


              {/* Social Media */}
              <div className="flex items-center gap-6 pt-3">

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1JLjxXFNHT/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-3xl hover:text-orange-500 transition"
                >
                  <FaFacebook />
                </a>


                {/* Instagram */}
                <a
                  href="https://www.instagram.com/stylesbazar247?igsh=MXI0M3dsMHJtamljNQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-3xl hover:text-orange-500 transition"
                >
                  <FaInstagram />
                </a>


                {/* WhatsApp */}
                <a
                  href="https://wa.me/923356891247"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-3xl hover:text-orange-500 transition"
                >
                  <FaWhatsapp />
                </a>


                {/* Email */}
                <a
                  href="mailto:stylesbazar247@gmail.com"
                  aria-label="Email"
                  className="text-3xl hover:text-orange-500 transition"
                >
                  <FaEnvelope />
                </a>

              </div>

            </div>
          </div>

        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center">

          <p className="text-gray-400">
            © 2026 Styles Bazar. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}