"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaArrowUp,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080808]">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/[0.05] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">

        {/* Brand Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">

          <div className="max-w-2xl">

            <Link href="/" className="group inline-block">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-orange-500 sm:text-4xl">
                Styles
                <span className="text-orange-500 transition-colors group-hover:text-white">
                  {" "}Bazar
                </span>
              </h2>
            </Link>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
              Your trusted online shopping destination in Pakistan.
              Discover fashion, shoes, watches, perfumes and more,
              carefully selected for quality, style and value.
            </p>

            {/* Trust line */}
            <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-gray-600">
              <FaShieldAlt className="text-orange-500" />
              <span>Secure Shopping Experience</span>
            </div>

          </div>

          {/* CTA */}
          <Link
            href="/products"
            className="group inline-flex w-fit items-center gap-3 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-[0_15px_40px_rgba(249,115,22,0.25)]"
          >
            Start Shopping

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 group-hover:bg-white/20">
              <FaArrowRight className="text-[9px] transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Shop */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-white">
              Shop
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              <Link
                href="/products"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                All Products
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link
                href="/products"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                New Arrivals
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link
                href="/products"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Best Sellers
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link
                href="/products"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Special Offers
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-white">
              Company
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              <Link
                href="/"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Home
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link
                href="/about"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                About Us
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Contact Us
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link
                href="/cart"
                className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Shopping Cart
                <FaArrowRight className="text-[7px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-white">
              Policies
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              <Link
                href="/privacy-policy"
                className="text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/shipping-policy"
                className="text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Shipping Policy
              </Link>

              <Link
                href="/contact"
                className="text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                Refund Policy
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <a
                href="mailto:stylesbazar247@gmail.com"
                className="group flex items-start gap-3 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                <FaEnvelope className="mt-1 shrink-0 text-orange-500" />
                <span className="break-all">
                  stylesbazar247@gmail.com
                </span>
              </a>

              <a
                href="tel:+923356891247"
                className="group flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-orange-500"
              >
                <span className="font-bold text-orange-500">
                  +
                </span>
                <span>
                  92 335 6891247
                </span>
              </a>

              {/* Socials */}
              <div className="flex flex-wrap gap-3 pt-2">

                <a
                  href="https://www.facebook.com/share/1JLjxXFNHT/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                >
                  <FaFacebookF className="text-xs" />
                </a>

                <a
                  href="https://www.instagram.com/stylesbazar247?igsh=MXI0M3dsMHJtamljNQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                >
                  <FaInstagram className="text-xs" />
                </a>

                <a
                  href="https://wa.me/923356891247"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                >
                  <FaWhatsapp className="text-xs" />
                </a>

                <a
                  href="mailto:stylesbazar247@gmail.com"
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                >
                  <FaEnvelope className="text-xs" />
                </a>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/30">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-6 text-center sm:flex-row sm:px-6 sm:text-left">

          <p className="text-[11px] text-gray-600">
            © 2026 Styles Bazar. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-700 sm:block">
              Premium Shopping Experience
            </span>

            <Link
              href="/"
              aria-label="Back to top"
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <FaArrowUp className="text-[10px] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}