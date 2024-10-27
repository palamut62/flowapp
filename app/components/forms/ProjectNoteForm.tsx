'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface ProjectNoteFormProps {
  user: User | null;
}

export default function ProjectNoteForm({ user }: ProjectNoteFormProps) {
  const [formData, setFormData] = useState({
    project_id: '',
    date: '',
    description: '',
    correspondence_no: '',
    reminder: '',
    reminder_date: '',
    is_reminder_active: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('project_notes')
        .insert([{
          ...formData,
          project_id: parseInt(formData.project_id)
        }]);

      if (error) throw error;
      toast.success('Proje notu başarıyla eklendi!');
      setFormData({
        project_id: '',
        date: '',
        description: '',
        correspondence_no: '',
        reminder: '',
        reminder_date: '',
        is_reminder_active: false
      });
    } catch (error: any) {
      toast.error('Proje notu eklenirken bir hata oluştu.');
    }
  };

  const [tempFormData, setTempFormData] = useState({
    project_id: '1',
    date: '2024-02-01',
    description: 'Haftalık ilerleme toplantısı yapıldı',
    correspondence_no: 'MKT-2024/001',
    reminder: 'Demir siparişi kontrol edilecek',
    reminder_date: '2024-02-15',
    is_reminder_active: true
  });

  const [tableData, setTableData] = useState<Array<typeof tempFormData>>([]);

  const handleAddToTable = (e: React.FormEvent) => {
    e.preventDefault();
    setTableData([...tableData, tempFormData]);
    setTempFormData({
      project_id: '',
      date: '',
      description: '',
      correspondence_no: '',
      reminder: '',
      reminder_date: '',
      is_reminder_active: false
    });
  };

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tableData.length === 0) {
      toast.error('Lütfen en az bir proje notu ekleyin.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('project_notes')
        .insert(
          tableData.map(item => ({
            project_id: parseInt(item.project_id),
            date: item.date,
            description: item.description,
            correspondence_no: item.correspondence_no,
            reminder: item.reminder,
            reminder_date: item.reminder_date,
            is_reminder_active: item.is_reminder_active
          }))
        );

      if (error) throw error;
      toast.success('Proje notu başarıyla eklendi!');
      setTableData([]); 
    } catch (error: any) {
      toast.error('Proje notu eklenirken bir hata oluştu.');
    }
  };

  const handleDeleteRow = (index: number) => {
    setTableData(tableData.filter((_, i) => i !== index));
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
          <textarea
            value={tempFormData.description}
            onChange={(e) => setTempFormData({ ...tempFormData, description: e.target.value })}
            placeholder="Açıklama"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="text"
            value={tempFormData.correspondence_no}
            onChange={(e) => setTempFormData({ ...tempFormData, correspondence_no: e.target.value })}
            placeholder="Mektup No"
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-white text-gray-700 font-medium placeholder-gray-400"
            required
          />
          <input
            type="text"
            value={tempFormData.reminder}
            onChange={(e) => setTempFormData({ ...tempFormData, reminder: e.target.value })}
            placeholder="Hatırlatma"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
          />
          <input
            type="date"
            value={tempFormData.reminder_date}
            onChange={(e) => setTempFormData({ ...tempFormData, reminder_date: e.target.value })}
            placeholder="Hatırlatma Tarihi"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={tempFormData.is_reminder_active}
              onChange={(e) => setTempFormData({ ...tempFormData, is_reminder_active: e.target.checked })}
              className="mr-2 text-[#FFB672] border-gray-300 rounded focus:ring-[#FFB672]"
            />
            <label>Hatırlatma Aktif</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
        >
         Tabloya Ekle
        </button>
      </form>
      <button
        type="button"
        onClick={handleTableSubmit}
        className="w-full py-4 bg-[#FFB672] text-black rounded-lg font-medium hover:bg-[#ffa54f] transition-colors"
      >
        Proje Notu Ekle
      </button>
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
                    Tarih
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Açıklama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Mektup No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Hatırlatma
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Hatırlatma Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Hatırlatma Aktif
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
                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.correspondence_no}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.reminder}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.reminder_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.is_reminder_active}
                        disabled
                        className="mr-2"
                      />
                    </td>
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
        </div>
      )}
    </div>
  );
}
