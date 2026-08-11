"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password.trim()
      );

      document.cookie = "admin=true; path=/";

      alert("Login Successful ✅");

      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b] shadow-[0_30px_100px_rgba(0,0,0,0.8)] lg:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div className="relative hidden min-h-[680px] flex-col justify-between overflow-hidden border-r border-white/10 bg-[#0f0f0f] p-10 lg:flex">

            <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />

            {/* Logo */}
            <div className="relative z-10">

              <Link href="/" className="inline-flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-[0_12px_35px_rgba(249,115,22,0.3)]">
                  <FaShoppingBag className="text-lg text-white" />
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

            {/* Center */}
            <div className="relative z-10">

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                  Admin Panel
                </span>

              </div>

              <h2 className="max-w-lg text-5xl font-black leading-[1.05] tracking-tight">
                Welcome Back
                <span className="block text-orange-500">
                  To Styles Bazar.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
                Manage your products, orders and online store from one
                powerful dashboard.
              </p>

              {/* Features */}
              <div className="mt-9 space-y-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-orange-500">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Secure Admin Access
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Your store dashboard is protected.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-orange-500">
                    <FaShoppingBag />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Manage Everything
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Products, orders and customers in one place.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom */}
            <p className="relative z-10 text-[10px] text-gray-700">
              © {new Date().getFullYear()} Styles Bazar
            </p>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex min-h-[680px] items-center justify-center px-6 py-12 sm:px-12 lg:px-16">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-10 flex justify-center lg:hidden">

                <Link href="/" className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500">
                    <FaShoppingBag />
                  </div>

                  <div>
                    <h1 className="text-xl font-black">
                      Styles<span className="text-orange-500">Bazar</span>
                    </h1>

                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600">
                      Online Store
                    </p>
                  </div>

                </Link>

              </div>

              {/* Heading */}
              <div className="mb-9">

                <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-orange-500">
                  Secure Login
                </p>

                <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                  Sign In
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Login to access your Styles Bazar admin dashboard.
                </p>

              </div>

              {/* Email */}
              <div className="mb-5">

                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Email Address
                </label>

                <div className="group relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-600 transition group-focus-within:text-orange-500" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-700 focus:border-orange-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-orange-500/5"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="mb-7">

                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Password
                </label>

                <div className="group relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-600 transition group-focus-within:text-orange-500" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-700 focus:border-orange-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-orange-500/5"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-orange-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

              </div>

              {/* Login */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 text-sm font-black text-white shadow-[0_15px_40px_rgba(249,115,22,0.2)] transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_20px_50px_rgba(249,115,22,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </>
                )}

              </button>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-700">
                  Styles Bazar
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              {/* Signup */}
              <p className="text-center text-sm text-gray-600">

                Don't have an account?

                <Link
                  href="/signup"
                  className="ml-2 font-black text-orange-500 transition hover:text-orange-400"
                >
                  Create Account
                </Link>

              </p>

              {/* Back Store */}
              <Link
                href="/"
                className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-xs font-bold text-gray-500 transition-all hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500"
              >
                Back To Store
              </Link>

              {/* Security */}
              <p className="mt-6 text-center text-[9px] leading-5 text-gray-700">
                Secure authentication powered by Firebase.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}