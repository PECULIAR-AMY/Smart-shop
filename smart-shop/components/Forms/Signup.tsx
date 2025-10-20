"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
      try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
    
  });

    alert(`Welcome, ${formData.name}! Your account has been created.`);
      console.log("User created:", userCredential.user);

      // Optionally, redirect user (if using next/navigation)
      // router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup error:", error.message);
        alert(error.message);
      } else {
        console.error("Signup error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
