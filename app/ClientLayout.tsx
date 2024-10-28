'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './components/theme-provider';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || 
                    pathname === '/signup' || 
                    pathname === '/register';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main 
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
