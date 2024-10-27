'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Ana sayfa: Oturum kontrolü yapılıyor...');
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('Ana sayfa: Oturum bulundu, dashboard\'a yönlendiriliyor...');
          router.push('/dashboard');
        } else {
          console.log('Ana sayfa: Oturum bulunamadı, login sayfasına yönlendiriliyor...');
          router.push('/login');
        }
      } catch (error) {
        console.error('Ana sayfa: Oturum kontrolü hatası:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return null;
}
