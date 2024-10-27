'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface ContractorFormProps {
  user: User | null;
}

export default function ContractorForm({ user }: ContractorFormProps) {
  const [formData, setFormData] = useState({
    project_id: '',
    name: '',
    number: '',
    address: '',
    tax_number: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('contractor_info')
        .insert([{
          ...formData,
          project_id: parseInt(formData.project_id)
        }]);

      if (error) throw error;
      toast.success('Yüklenici bilgileri başarıyla eklendi!');
      setFormData({
        project_id: '',
        name: '',
        number: '',
        address: '',
        tax_number: '',
        email: ''
      });
    } catch (error: any) {
      toast.error('Yüklenici bilgileri eklenirken bir hata oluştu.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proje ID
          </label>
          <input
            type="number"
            value={formData.project_id}
            onChange={(e) => setFormData({...formData, project_id: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yüklenici Adı
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon Numarası
          </label>
          <input
            type="text"
            value={formData.number}
            onChange={(e) => setFormData({...formData, number: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adres
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vergi Numarası
          </label>
          <input
            type="text"
            value={formData.tax_number}
            onChange={(e) => setFormData({...formData, tax_number: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
      >
        Yüklenici Bilgisi Ekle
      </button>
    </form>
  );
}
