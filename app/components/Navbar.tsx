'use client';

type NavbarProps = {
  user: any;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <header className="py-2 px-4 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#FFB672] to-[#ffa54f] bg-clip-text text-transparent">
            Razor
          </h1>
         
        </div>

        <div className="flex items-center space-x-4">
          {/* Home Icon - Active State */}
          <a href="#" className="flex items-center gap-2 text-sm text-[#FFB672] font-medium">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span></span>
          </a>

          {/* Existing User Icon */}
          <div className="text-sm text-gray-600 flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">{user?.email}</span>
          </div>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-sm font-medium bg-white text-gray-700 border border-gray-300 
            rounded-full hover:bg-gray-50 hover:text-[#FFB672] hover:border-[#FFB672] 
            transition-all duration-200 flex items-center gap-2 group"
          >
            <span>Çıkış Yap</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
