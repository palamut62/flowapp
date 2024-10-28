'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { 
  HiHome, 
  HiClipboardList, 
  HiUsers, 
  HiCog, 
  HiQuestionMarkCircle, 
  HiChevronLeft, 
  HiChevronRight 
} from 'react-icons/hi';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const menuItems = [
    { title: "Ana Sayfa", icon: HiHome, path: "/" },
    { title: "Projeler", icon: HiClipboardList, path: "/projects" },
    { title: "Kullanıcılar", icon: HiUsers, path: "/users" },
    { title: "Ayarlar", icon: HiCog, path: "/settings" },
    { title: "Yardım", icon: HiQuestionMarkCircle, path: "/help" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40
          ${isOpen ? 'w-64' : 'w-20'} 
          lg:translate-x-0
        `}
      >
        {/* Logo alanı */}
        <div className="flex items-center justify-between h-20 border-b px-4">
          <span className={`text-xl font-bold text-gray-800 ${!isOpen && 'hidden'}`}>
            Logo
          </span>
          
          {/* Yeni eklenen toggle butonu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            {isOpen ? (
              <HiChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <HiChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Menü öğeleri */}
        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center px-6 py-4 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
            >
              <item.icon className="w-6 h-6" />
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>
                {item.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobil overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
