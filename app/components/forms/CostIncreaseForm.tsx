'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface CostIncreaseFormProps {
  user: User | null;
}

export default function CostIncreaseForm({ user }: CostIncreaseFormProps) {
  const [formData, setFormData] = useState({
    project_id: '1',
    date: '2024-02-01',
    amount: '500000',
    percentage: '15',
    authority_approval: 'Onay No: 2024/FY-001'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('cost_increases')
        .insert([{
          ...formData,
          project_id: parseInt(formData.project_id),
          amount: parseFloat(formData.amount),
          percentage: parseFloat(formData.percentage)
        }]);

      if (error) throw error;
      toast.success('Fiyat farkı başarıyla eklendi!');
      setFormData({
        project_id: '',
        date: '',
        amount: '',
        percentage: '',
        authority_approval: ''
      });
    } catch (error: any) {
      toast.error('Fiyat farkı eklenirken bir hata oluştu.');
    }
  };

  const [tempFormData, setTempFormData] = useState({
    project_id: '1',
    date: '2024-02-01',
    amount: '500000',
    percentage: '15',
    authority_approval: 'Onay No: 2024/FY-001'
  });

  const [tableData, setTableData] = useState<Array<typeof tempFormData>>([]);

  const handleAddToTable = (e: React.FormEvent) => {
    e.preventDefault();
    setTableData([...tableData, tempFormData]);
    setTempFormData({
      project_id: '',
      date: '',
      amount: '',
      percentage: '',
      authority_approval: ''
    });
  };

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tableData.length === 0) {
      toast.error('Lütfen en az bir fiyat farkı ekleyin.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('cost_increases')
        .insert(
          tableData.map(item => ({
            ...item,
            project_id: parseInt(item.project_id),
            amount: parseFloat(item.amount),
            percentage: parseFloat(item.percentage)
          }))
        );

      if (error) throw error;
      toast.success('Fiyat farkı başarıyla eklendi!');
      setTableData([]); // Tabloyu temizle
    } catch (error: any) {
      toast.error('Fiyat farkı eklenirken bir hata oluştu.');
    }
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
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-white text-gray-700 font-medium placeholder-gray-400"
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
            type="number"
            value={tempFormData.amount}
            onChange={(e) => setTempFormData({ ...tempFormData, amount: e.target.value })}
            placeholder="Tutar"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="number"
            value={tempFormData.percentage}
            onChange={(e) => setTempFormData({ ...tempFormData, percentage: e.target.value })}
            placeholder="Yüzde"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <textarea
            value={tempFormData.authority_approval}
            onChange={(e) => setTempFormData({ ...tempFormData, authority_approval: e.target.value })}
            placeholder="Yetkili Onayı"
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672] bg-white text-gray-700 font-medium placeholder-gray-400 resize-none"
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
                    Tarih
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Tutar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Yüzde
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Yetkili Onayı
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
                    <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.percentage}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.authority_approval}</td>
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
            Fiyat Farklarını Kaydet
          </button>
        </div>
      )}
    </div>
  );
}
