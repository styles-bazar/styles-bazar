"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const router = useRouter();

async function handleLogin() {
  try {
    await signInWithEmailAndPassword(
  auth,
  email.trim().toLowerCase(),
  password.trim()
);

    // Cookie save
document.cookie = "admin=true; path=/";

// Success
alert("Login Successful ✅");

// Admin Dashboard
router.push("/admin/dashboard");
  } catch (error: any) {
    alert(error.message);
  }
}
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
  onClick={handleLogin}
  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
>
  Login
</button>

        <p className="text-center mt-5">
          Don't have an account?
          <a
            href="/signup"
            className="text-blue-600 font-bold ml-2"
          >
            Signup
          </a>
        </p>

      </div>
    </main>
  );
}