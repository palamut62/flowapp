'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface CostItemFormProps {
  user: User | null;
}

export default function CostItemForm({ user }: CostItemFormProps) {
  const [formData, setFormData] = useState({
    project_id: '',
    poz_no: '',
    description: '',
    unit: '',
    quantity: '',
    unit_price: '',
    amount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('cost_items')
        .insert([{
          ...formData,
          project_id: parseInt(formData.project_id),
          quantity: parseFloat(formData.quantity),
          unit_price: parseFloat(formData.unit_price),
          amount: parseFloat(formData.amount)
        }]);

      if (error) throw error;
      toast.success('Maliyet kalemi başarıyla eklendi!');
      setFormData({
        project_id: '',
        poz_no: '',
        description: '',
        unit: '',
        quantity: '',
        unit_price: '',
        amount: ''
      });
    } catch (error: any) {
      toast.error('Maliyet kalemi eklenirken bir hata oluştu.');
    }
  };

  const [tempFormData, setTempFormData] = useState({
    project_id: '',
    poz_no: '',
    description: '',
    unit: '',
    quantity: '',
    unit_price: '',
    amount: ''
  });

  const [tableData, setTableData] = useState<Array<typeof tempFormData>>([]);

  const handleAddToTable = (e: React.FormEvent) => {
    e.preventDefault();
    setTableData([...tableData, tempFormData]);
    setTempFormData({
      project_id: '',
      poz_no: '',
      description: '',
      unit: '',
      quantity: '',
      unit_price: '',
      amount: ''
    });
  };

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tableData.length === 0) {
      toast.error('Lütfen en az bir maliyet kalemi ekleyin.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('cost_items')
        .insert(
          tableData.map(item => ({
            project_id: parseInt(item.project_id),
            poz_no: item.poz_no,
            description: item.description,
            unit: item.unit,
            quantity: parseFloat(item.quantity),
            unit_price: parseFloat(item.unit_price),
            amount: parseFloat(item.amount)
          }))
        );

      if (error) throw error;
      toast.success('Maliyet kalemi başarıyla eklendi!');
      setTableData([]); // Tabloyu temizle
    } catch (error: any) {
      toast.error('Maliyet kalemi eklenirken bir hata oluştu.');
    }
  };

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
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="text"
            value={tempFormData.poz_no}
            onChange={(e) => setTempFormData({ ...tempFormData, poz_no: e.target.value })}
            placeholder="Poz No"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="text"
            value={tempFormData.description}
            onChange={(e) => setTempFormData({ ...tempFormData, description: e.target.value })}
            placeholder="Açıklama"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="text"
            value={tempFormData.unit}
            onChange={(e) => setTempFormData({ ...tempFormData, unit: e.target.value })}
            placeholder="Birim"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="number"
            value={tempFormData.quantity}
            onChange={(e) => setTempFormData({ ...tempFormData, quantity: e.target.value })}
            placeholder="Miktar"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="number"
            value={tempFormData.unit_price}
            onChange={(e) => setTempFormData({ ...tempFormData, unit_price: e.target.value })}
            placeholder="Birim Fiyatı"
            className="p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FFB672]"
            required
          />
          <input
            type="number"
            value={tempFormData.amount}
            onChange={(e) => setTempFormData({ ...tempFormData, amount: e.target.value })}
            placeholder="Toplam Tutar"
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
                    Poz No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Açıklama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Birim
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Miktar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Birim Fiyatı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Toplam Tutar
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
                    <td className="px-6 py-4 whitespace-nowrap">{item.poz_no}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.unit_price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
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
          <button
            onClick={handleTableSubmit}
            className="mt-4 w-full py-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Maliyet Kalemlerini Kaydet
          </button>
        </div>
      )}
    </div>
  );
}

