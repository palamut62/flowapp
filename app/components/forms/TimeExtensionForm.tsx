'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface TimeExtensionFormProps {
  user: User | null;
}

export default function TimeExtensionForm({ user }: TimeExtensionFormProps) {
  const [formData, setFormData] = useState({
    project_id: '',
    date: '',
    authority_approval: '',
    duration: '',
    new_end_date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('time_extensions')
        .insert([{
          ...formData,
          project_id: parseInt(formData.project_id),
          duration: parseInt(formData.duration)
        }]);

      if (error) throw error;
      toast.success('Süre uzatımı başarıyla eklendi!');
      setFormData({
        project_id: '',
        date: '',
        authority_approval: '',
        duration: '',
        new_end_date: ''
      });
    } catch (error: any) {
      toast.error('Süre uzatımı eklenirken bir hata oluştu.');
    }
  };

  const [tempFormData, setTempFormData] = useState({
    project_id: '1',
    date: '2024-02-01',
    authority_approval: 'Onay No: 2024/123',
    duration: '90',
    new_end_date: '2024-05-01'
  });

  const [tableData, setTableData] = useState<Array<typeof tempFormData>>([]);

  const handleAddToTable = (e: React.FormEvent) => {
    e.preventDefault();
    setTableData([...tableData, tempFormData]);
    setTempFormData({
      project_id: '',
      date: '',
      authority_approval: '',
      duration: '',
      new_end_date: ''
    });
  };

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tableData.length === 0) {
      toast.error('Lütfen en az bir süre uzatımı ekleyin.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('time_extensions')
        .insert(
          tableData.map(item => ({
            project_id: parseInt(item.project_id),
            date: item.date,
            authority_approval: item.authority_approval,
            duration: parseInt(item.duration),
            new_end_date: item.new_end_date
          }))
        );

      if (error) throw error;
      toast.success('Süre uzatımı başarıyla eklendi!');
      setTableData([]); 
    } catch (error: any) {
      toast.error('Süre uzatımı eklenirken bir hata oluştu.');
    }
  };

  // Silme fonksiyonunu ekleyin
  const handleDeleteRow = (index: number) => {
    const newTableData = tableData.filter((_, i) => i !== index);
    setTableData(newTableData);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddToTable} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            value={tempFormData.project_id}
            onChange={(e) => setTempFormData({ ...tempFormData, project_id: e.target.value })}
            placeholder="Proje ID"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] text-gray-700 font-medium placeholder-gray-400"
            required
          />
          <input
            type="date"
            value={tempFormData.date}
            onChange={(e) => setTempFormData({ ...tempFormData, date: e.target.value })}
            placeholder="Tarih"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="text"
            value={tempFormData.authority_approval}
            onChange={(e) => setTempFormData({ ...tempFormData, authority_approval: e.target.value })}
            placeholder="Yetkili Onayı"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="number"
            value={tempFormData.duration}
            onChange={(e) => setTempFormData({ ...tempFormData, duration: e.target.value })}
            placeholder="Süre"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="date"
            value={tempFormData.new_end_date}
            onChange={(e) => setTempFormData({ ...tempFormData, new_end_date: e.target.value })}
            placeholder="Yeni Bitiş Tarihi"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
        >
          Tabloya Ekle
        </button>
      </form>

      {/* Tablo ekleniyor */}
      {tableData.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proje ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yetkili Onayı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Süre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yeni Bitiş Tarihi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.project_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.authority_approval}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.new_end_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteRow(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={handleTableSubmit} className="space-y-4">
        <button
          type="submit"
          className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
        >
          Süre Uzatımı Ekle
        </button>
      </form>
    </div>
  );
}
