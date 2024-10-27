'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface InspectionFormProps {
  user: User | null;
}

export default function InspectionForm({ user }: InspectionFormProps) {
  const [formData, setFormData] = useState({
    project_id: '',
    upper_institution: '',
    lower_institution: '',
    supervisor_name: '',
    supervisor_title: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('inspection_info')
        .insert([{
          ...formData,
          project_id: parseInt(formData.project_id)
        }]);

      if (error) throw error;
      toast.success('Denetim bilgileri başarıyla eklendi!');
      setFormData({
        project_id: '',
        upper_institution: '',
        lower_institution: '',
        supervisor_name: '',
        supervisor_title: ''
      });
    } catch (error: any) {
      toast.error('Denetim bilgileri eklenirken bir hata oluştu.');
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
            Üst Kurum
          </label>
          <input
            type="text"
            value={formData.upper_institution}
            onChange={(e) => setFormData({...formData, upper_institution: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Kurum
          </label>
          <input
            type="text"
            value={formData.lower_institution}
            onChange={(e) => setFormData({...formData, lower_institution: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Denetçi Adı
          </label>
          <input
            type="text"
            value={formData.supervisor_name}
            onChange={(e) => setFormData({...formData, supervisor_name: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Denetçi Ünvanı
          </label>
          <input
            type="text"
            value={formData.supervisor_title}
            onChange={(e) => setFormData({...formData, supervisor_title: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
      >
        Denetim Bilgisi Ekle
      </button>
    </form>
  );
}
