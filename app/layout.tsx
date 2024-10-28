import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Dashboard",
  description: "Authentication and Dashboard Application",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // URL'yi kontrol etmek için
  const isAuthPage = typeof window !== 'undefined' && 
    (window.location.pathname === '/login' || 
     window.location.pathname === '/signup');

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        {isAuthPage ? (
          children
        ) : (
          <ClientLayout>
            {children}
          </ClientLayout>
        )}
      </body>
    </html>
  );
}
