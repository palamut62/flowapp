'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface ControlFormProps {
  user: User | null;
}

export default function ControlForm({ user }: ControlFormProps) {
  const [tempFormData, setTempFormData] = useState({
    project_id: '1',
    control_name: 'Mehmet Yılmaz',
    control_title: 'İnşaat Yüksek Mühendisi',
    control_institution: 'Yapı Denetim A.Ş.'
  });
  
  const [tableData, setTableData] = useState<Array<typeof tempFormData>>([]);

  const handleAddToTable = (e: React.FormEvent) => {
    e.preventDefault();
    setTableData([...tableData, tempFormData]);
    setTempFormData({
      project_id: '',
      control_name: '',
      control_title: '',
      control_institution: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tableData.length === 0) {
      toast.error('Lütfen en az bir kontrol elemanı ekleyin.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('control_personnel')
        .insert(
          tableData.map(item => ({
            ...item,
            project_id: parseInt(item.project_id)
          }))
        );

      if (error) throw error;
      toast.success('Kontrol elemanı bilgileri başarıyla eklendi!');
      setTableData([]); // Tabloyu temizle
    } catch (error: any) {
      toast.error('Kontrol elemanı bilgileri eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddToTable} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="number"
            value={tempFormData.project_id}
            onChange={(e) => setTempFormData({...tempFormData, project_id: e.target.value})}
            placeholder="Proje ID"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-white text-gray-700 font-medium placeholder-gray-400"
            required
          />
          <input
            type="text"
            value={tempFormData.control_name}
            onChange={(e) => setTempFormData({...tempFormData, control_name: e.target.value})}
            placeholder="Kontrol Elemanı Adı"
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-white text-gray-700 font-medium placeholder-gray-400"
            required
          />
          <input
            type="text"
            value={tempFormData.control_title}
            onChange={(e) => setTempFormData({...tempFormData, control_title: e.target.value})}
            placeholder="Kontrol Elemanı Ünvanı"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="text"
            value={tempFormData.control_institution}
            onChange={(e) => setTempFormData({...tempFormData, control_institution: e.target.value})}
            placeholder="Kontrol Elemanı Kurumu"
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

      {tableData.length > 0 && (
        <div className="mt-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Proje ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Kontrol Elemanı Adı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Kontrol Elemanı Ünvanı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Kontrol Elemanı Kurumu
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.project_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.control_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.control_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.control_institution}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setTableData(tableData.filter((_, i) => i !== index))}
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
          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Kontrol Elemanlarını Kaydet
          </button>
        </div>
      )}
    </div>
  );
}
