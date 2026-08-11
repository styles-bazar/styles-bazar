"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import {
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password.trim()
      );

      alert("Account Created Successfully ✅");

      router.push("/login");
    } catch (error: unknown) {
      console.error(error);

      // Firebase error ko safely handle karna
      const firebaseError = error as {
        code?: string;
        message?: string;
      };

      if (firebaseError.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } else if (firebaseError.code === "auth/invalid-email") {
        alert("Please enter a valid email.");
      } else if (firebaseError.code === "auth/weak-password") {
        alert("Password is too weak.");
      } else if (firebaseError.code === "auth/network-request-failed") {
        alert("Network error. Please check your internet connection.");
      } else {
        alert(
          firebaseError.message ||
            "Account create nahi ho saka. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-10 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 shadow-[0_0_40px_rgba(249,115,22,0.12)]">
            <FaShoppingBag className="text-2xl text-orange-500" />
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight">
            Styles <span className="text-orange-500">Bazar</span>
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gray-600">
            Create Your Account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[28px] border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.65)] sm:p-8">
          {/* Heading */}
          <div className="mb-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <FaUserPlus />
              </div>

              <div>
                <h2 className="text-xl font-black">Sign Up</h2>

                <p className="text-xs text-gray-600">
                  Create your Styles Bazar account
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
              Email Address
            </label>

            <div className="group flex items-center rounded-xl border border-white/10 bg-black transition-all duration-300 focus-within:border-orange-500/60 focus-within:shadow-[0_0_25px_rgba(249,115,22,0.08)]">
              <FaEnvelope className="ml-4 text-sm text-gray-600 transition-colors group-focus-within:text-orange-500" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignup();
                  }
                }}
                className="w-full bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-gray-700"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
              Password
            </label>

            <div className="group flex items-center rounded-xl border border-white/10 bg-black transition-all duration-300 focus-within:border-orange-500/60 focus-within:shadow-[0_0_25px_rgba(249,115,22,0.08)]">
              <FaLock className="ml-4 text-sm text-gray-600 transition-colors group-focus-within:text-orange-500" />

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignup();
                  }
                }}
                className="w-full bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-gray-700"
              />
            </div>

            <p className="mt-2 text-[10px] text-gray-700">
              Password must contain at least 6 characters.
            </p>
          </div>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={handleSignup}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-4 text-sm font-black text-white shadow-[0_12px_35px_rgba(249,115,22,0.18)] transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_15px_45px_rgba(249,115,22,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          {/* Login */}
          <div className="mt-7 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="mt-2 inline-flex items-center gap-2 text-sm font-black text-orange-500 transition hover:text-orange-400"
            >
              Login
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-gray-700">
          © {new Date().getFullYear()} Styles Bazar
        </p>
      </div>
    </main>
  );
}