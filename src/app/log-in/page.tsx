"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }

    if (res?.error) {
      console.error("Login failed:", res.error);
      toast.error(res.error);
    }
  };


  return (
    <div className="min-w-md max-w-md mx-auto mt-12 p-6 border rounded-lg">
      <h1 className='text-8xl font-bold bagel-fat-one-regular text-secondary mb-6'>Log In</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded hover:bg-accent transition duration-350 ease-in-out"
        >
          Log In
        </button>
        <p className="text-sm mt-2 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-accent hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
