'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { Transaction } from '@/types/database.types';
import { User } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Dashboard: Oturum kontrolü başlıyor...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Dashboard: Oturum durumu:', session ? 'Var' : 'Yok');
        if (!session) {
          console.log('Dashboard: Oturum bulunamadı, login sayfasına yönlendiriliyor...');
          router.push('/login');
        } else {
          console.log('Dashboard: Oturum bulundu, kullanıcı:', session.user);
          setUser(session.user);
          setLoading(false);
        }
      } catch (error) {
        console.error('Dashboard: Oturum kontrolü hatası:', error);
        setLoading(false);
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  useEffect(() => {
    if (user) {
      console.log('İşlemler yükleniyor...');
      fetchTransactions();
    }
  }, [user]);

  // ... existing code ...

const fetchTransactions = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    setTransactions(data || []);
  } catch (error: any) {
  } finally {
    setLoading(false);
  }
};

// ... existing code ...

  // ... existing code ...

const handleAddTransaction = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: user?.id,
          amount: parseFloat(amount),
          description,
        },
      ]);

    if (error) throw error;
    fetchTransactions();
    setAmount('');
    setDescription('');
    toast.success('İşlem başarıyla eklendi!');
  } catch (error: any) {
    toast.error('İşlem eklenirken bir hata oluştu.');
  }
};

// ... existing code ...

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Yükleniyor...</p>
    </div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Oturum bulunamadı. Lütfen tekrar giriş yapın.</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="p-4 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold">Razor</h1>
            <div className="flex items-center text-gray-500 text-sm">
              <span>Sales@Razor.uk</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8" />
              </svg>
            </button>

            {/* Sign Up Button */}
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
              Sign up
            </button>

            {/* Request Demo Button */}
            <button className="px-4 py-2 bg-[#FFB672] text-black rounded-lg hover:bg-[#ffa54f] transition-colors">
              Request Demo
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-[20px] shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Transactions</h2>
              <p className="text-gray-600">Manage your transactions and expenses</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#FFB672] text-black rounded-lg hover:bg-[#ffa54f] transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Add Transaction Form */}
          <div className="mb-8">
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
              >
                Add Transaction
              </button>
            </form>
          </div>

          {/* Transactions List */}
          {loading ? (
            <p className="text-center text-gray-600">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-600">No transactions found.</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{transaction.description}</span>
                    <span className={`font-medium ${
                      transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {new Intl.NumberFormat('tr-TR', { 
                        style: 'currency', 
                        currency: 'TRY' 
                      }).format(transaction.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto p-4 text-center text-sm text-gray-600">
        <p>Copyright @wework 2022 | Privacy Policy</p>
      </footer>
    </div>
  );
}
