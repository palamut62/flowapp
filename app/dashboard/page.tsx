'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { Transaction } from '@/types/database.types';
import { User } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import StatusBar from '../components/StatusBar';



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
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      <Toaster position="top-right" />
      
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8 flex-grow">
        <div className="bg-white rounded-[20px] shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">İşlemler</h2>
            <p className="text-gray-600">İşlemlerinizi ve harcamalarınızı yönetin</p>
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

      {/* StatusBar'ı masaüstü uygulamalarındaki gibi sabitleyelim */}
      <div className="absolute bottom-0 w-full">
        <StatusBar user={user} />
      </div>
    </div>
  );
}
