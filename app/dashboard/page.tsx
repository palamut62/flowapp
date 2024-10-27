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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';
import ProjectForm from '../components/forms/ProjectForm';
import ContractorForm from '../components/forms/ContractorForm'
import InspectionForm from '../components/forms/InspectionForm';
import CostIncreaseForm from '../components/forms/CostIncreaseForm';
import TimeExtensionForm from '../components/forms/TimeExtensionForm';
import CostItemForm from '../components/forms/CostItemForm';
import ProjectNoteForm from '../components/forms/ProjectNoteForm';
import ControlForm from '../components/forms/ControlForm';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

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

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      <Toaster position="top-right" />
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="max-w-9xl mx-auto p-8 flex-grow">
        <div className="bg-white rounded-[20px] shadow-sm p-8">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid grid-cols-8 gap-4 mb-8">
              <TabsTrigger value="projects">Projeler</TabsTrigger>
              <TabsTrigger value="contractors">Yüklenici Bilgileri</TabsTrigger>
              <TabsTrigger value="inspections">Denetim Bilgileri</TabsTrigger>
              <TabsTrigger value="controls">Kontrol Bilgileri</TabsTrigger>
              <TabsTrigger value="cost-increases">Keşif Artışı</TabsTrigger>
              <TabsTrigger value="time-extensions">Süre Uzatımları</TabsTrigger>
              <TabsTrigger value="cost-items">Maliyet Kalemleri</TabsTrigger>
              <TabsTrigger value="notes">Proje Notları</TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectForm user={user} />
            </TabsContent>

            <TabsContent value="contractors">
              <ContractorForm user={user} />
            </TabsContent>

            <TabsContent value="inspections">
              <InspectionForm user={user} />
            </TabsContent>

            <TabsContent value="controls">
              <ControlForm user={user} />
            </TabsContent>

            <TabsContent value="cost-increases">
              <CostIncreaseForm user={user} />
            </TabsContent>

            <TabsContent value="time-extensions">
              <TimeExtensionForm user={user} />
            </TabsContent>

            <TabsContent value="cost-items">
              <CostItemForm user={user} />
            </TabsContent>

            <TabsContent value="notes">
              <ProjectNoteForm user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <div className="absolute bottom-0 w-full">
        <StatusBar user={user} />
      </div>
    </div>
  );
}
