'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface ProjectFormProps {
  user: User | null;
}

export default function ProjectForm({ user }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    jobName: 'Ankara Metro İnşaatı',
    contractor: 'ABC İnşaat Ltd. Şti.',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    contractAmount: '1500000',
    contractDate: '2023-12-15',
    bidDate: '2023-12-01',
    projectDuration: '365'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('projects')
        .insert([{
          ...formData,
          contractAmount: parseFloat(formData.contractAmount),
          user_id: user?.id // Kullanıcı ID'sini ekliyoruz
        }]);

      if (error) throw error;
      toast.success('Proje başarıyla eklendi!');
      setFormData({
        jobName: '',
        contractor: '',
        startDate: '',
        endDate: '',
        contractAmount: '',
        contractDate: '',
        bidDate: '',
        projectDuration: ''
      });
    } catch (error: any) {
      toast.error('Proje eklenirken bir hata oluştu.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İş Adı
          </label>
          <input
            type="text"
            value={formData.jobName}
            onChange={(e) => setFormData({...formData, jobName: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-white text-gray-700 font-medium placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yüklenici
          </label>
          <input
            type="text"
            value={formData.contractor}
            onChange={(e) => setFormData({...formData, contractor: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-gray-50 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İhale Tarihi
          </label>
          <input
            type="date"
            value={formData.bidDate}
            onChange={(e) => setFormData({...formData, bidDate: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-gray-50 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sözleşme Tarihi
          </label>
          <input
            type="date"
            value={formData.contractDate}
            onChange={(e) => setFormData({...formData, contractDate: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-gray-50 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sözleşme Tutarı
          </label>
          <input
            type="number"
            value={formData.contractAmount}
            onChange={(e) => setFormData({...formData, contractAmount: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-gray-50 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İşe Başlangıç Tarihi
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-gray-50 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İşin Süresi
          </label>
          <input
            type="number"
            value={formData.projectDuration}
            onChange={(e) => setFormData({...formData, projectDuration: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-gray-50 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İş Bitim Tarihi
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-gray-50 text-gray-900"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
      >
        Proje Ekle
      </button>
    </form>
  );
}
