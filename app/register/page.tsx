'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      router.push('/success');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
      <div className="max-w-md w-full p-8 bg-white rounded-[20px] shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-600">Hey, Enter your details to create a new account</p>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              placeholder="Enter Email / Phone No"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Create Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 px-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or Sign up with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <span>Apple ID</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <span>Facebook</span>
            </button>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#FFB672] hover:text-[#ffa54f]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
