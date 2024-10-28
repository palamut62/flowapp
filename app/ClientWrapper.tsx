"use client"
import { usePathname } from 'next/navigation';
import { Sidebar } from "lucide-react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <div className="flex">
      {!isAuthPage && <Sidebar />}
      <main className={`flex-1 ${!isAuthPage ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
}

