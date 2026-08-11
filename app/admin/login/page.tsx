"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShoppingBag,
  FaShieldAlt,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      router.push("/admin");
    } catch (error: any) {
      console.error(error);

      if (
        error?.code === "auth/invalid-credential" ||
        error?.code === "auth/wrong-password" ||
        error?.code === "auth/user-not-found"
      ) {
        alert("Email ya password ghalat hai.");
      } else {
        alert("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-10">

        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b] shadow-[0_30px_100px_rgba(0,0,0,0.7)] lg:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}
          <div className="relative hidden min-h-[650px] overflow-hidden border-r border-white/10 bg-[#0f0f0f] lg:flex lg:flex-col lg:justify-between">

            {/* Orange Glow */}
            <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />

            <div className="relative z-10 p-10">

              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-[0_10px_35px_rgba(249,115,22,0.25)]">
                  <FaShoppingBag className="text-lg text-white" />
                </div>

                <div>
                  <h1 className="text-xl font-black tracking-tight">
                    Styles<span className="text-orange-500">Bazar</span>
                  </h1>

                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600">
                    Online Store
                  </p>
                </div>

              </Link>

            </div>

            {/* Center Content */}
            <div className="relative z-10 px-10">

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                  Admin Panel
                </span>
              </div>

              <h2 className="max-w-md text-5xl font-black leading-[1.05] tracking-tight">
                Welcome Back
                <span className="block text-orange-500">
                  To Your Store.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
                Manage your products, orders and store from one powerful
                dashboard.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-orange-500">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Secure Access
                    </p>
                    <p className="text-xs text-gray-600">
                      Protected admin dashboard
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-orange-500">
                    <FaShoppingBag />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Manage Your Store
                    </p>
                    <p className="text-xs text-gray-600">
                      Products & orders in one place
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom */}
            <div className="relative z-10 p-10">
              <p className="text-xs text-gray-700">
                © {new Date().getFullYear()} Styles Bazar. All rights reserved.
              </p>
            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex min-h-[650px] items-center justify-center px-6 py-10 sm:px-10 lg:px-14">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-10 flex justify-center lg:hidden">

                <Link href="/" className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-[0_10px_35px_rgba(249,115,22,0.25)]">
                    <FaShoppingBag />
                  </div>

                  <div>
                    <h1 className="text-xl font-black">
                      Styles<span className="text-orange-500">Bazar</span>
                    </h1>

                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600">
                      Online Store
                    </p>
                  </div>

                </Link>

              </div>

              {/* Heading */}
              <div className="mb-8">

                <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                  Secure Login
                </p>

                <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                  Sign In
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Enter your admin credentials to continue.
                </p>

              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email */}
                <div>

                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email Address
                  </label>

                  <div className="group relative">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-600 transition-colors group-focus-within:text-orange-500" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-700 focus:border-orange-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-orange-500/5"
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Password
                    </label>

                  </div>

                  <div className="group relative">

                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-600 transition-colors group-focus-within:text-orange-500" />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-12 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-700 focus:border-orange-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-orange-500/5"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-orange-500"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                  </div>

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 text-sm font-black text-white shadow-[0_15px_40px_rgba(249,115,22,0.18)] transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_20px_50px_rgba(249,115,22,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}

                </button>

              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
                  Styles Bazar
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              {/* Back Home */}
              <Link
                href="/"
                className="flex h-12 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-xs font-bold text-gray-500 transition-all hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500"
              >
                Back To Store
              </Link>

              {/* Security Text */}
              <p className="mt-6 text-center text-[10px] leading-5 text-gray-700">
                Your login information is securely handled by Firebase
                Authentication.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}