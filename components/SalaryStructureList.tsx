import React from 'react';
import { Plus, Download, Upload, Trash2, Search, LayoutTemplate } from 'lucide-react';

const MOCK_STRUCTURES = [
  { id: 1, code: 'CTL_VP', name: 'Cấu trúc lương khối Văn phòng', description: 'Áp dụng cho nhân viên hành chính, nhân sự, kế toán' },
  { id: 2, code: 'CTL_KD', name: 'Cấu trúc lương khối Kinh doanh', description: 'Áp dụng cho nhân viên sales, bao gồm lương cứng và hoa hồng' },
  { id: 3, code: 'CTL_KT', name: 'Cấu trúc lương khối Kỹ thuật', description: 'Áp dụng cho kỹ sư, thợ sửa chữa, bảo hành' },
];

export const SalaryStructureList: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F4F6F8] p-4">
      {/* Main white container */}
      <div className="bg-white rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB] flex flex-col flex-1 min-h-0 overflow-hidden relative">
        
        {/* Action Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0 bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <button className="bg-[#2563EB] text-white px-3 py-1.5 rounded text-[13px] font-medium flex items-center gap-1.5 hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" /> Thêm
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-[13px] flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4 text-gray-500" /> Nhập excel
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-[13px] flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-gray-500" /> Xuất excel
            </button>
            <button className="bg-[#E2E8F0] border border-gray-300 text-gray-400 px-3 py-1.5 rounded text-[13px] flex items-center gap-1.5 cursor-not-allowed ml-1">
              <Trash2 className="w-4 h-4" /> Xóa
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm mã, tên"
                className="border border-gray-300 rounded px-3 py-1.5 pl-3 pr-8 text-[13px] w-[220px] focus:outline-none focus:border-blue-500 bg-white"
              />
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="bg-[#1E3A8A] text-white p-1.5 rounded hover:bg-blue-900 transition-colors">
              <LayoutTemplate className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead className="bg-[#F8FAFC] sticky top-0 z-10 border-b border-gray-200">
              <tr>
                <th className="p-3 border-r border-gray-200 font-medium text-gray-700 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="p-3 border-r border-gray-200 font-medium text-gray-700 w-16 text-center">STT</th>
                <th className="p-3 border-r border-gray-200 font-medium text-gray-700 w-[200px]">Mã</th>
                <th className="p-3 border-r border-gray-200 font-medium text-gray-700 w-[250px]">Tên Cấu trúc Lương</th>
                <th className="p-3 border-gray-200 font-medium text-gray-700">Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STRUCTURES.map((structure, index) => (
                <tr key={structure.id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="p-3 border-r border-gray-200 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
                  </td>
                  <td className="p-3 border-r border-gray-200 text-center text-gray-800">{index + 1}</td>
                  <td className="p-3 border-r border-gray-200 text-gray-800 font-medium">{structure.code}</td>
                  <td className="p-3 border-r border-gray-200 text-gray-800">{structure.name}</td>
                  <td className="p-3 border-gray-200 text-gray-600">{structure.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
