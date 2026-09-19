import React, { useState } from 'react';
import { Plus, Download, Upload, Trash2, Search, Filter, RefreshCcw, LayoutTemplate, UserCheck, FileText, CheckCircle2 } from 'lucide-react';
import { LaborDetailModal, Laborer } from './LaborDetailModal';

export const MOCK_LABORERS: Laborer[] = [];

export const LaborList: React.FC = () => {
  const [laborers, setLaborers] = useState<Laborer[]>(MOCK_LABORERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRow, setActiveRow] = useState<Laborer | null>(null);

  const getRecordId = (lab: Laborer, idx: number) => lab.code || lab.cccd || `${lab.name}-${idx}`;

  const filteredLaborers = laborers.filter(lab => 
    (lab.name && lab.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.code && lab.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.phone && lab.phone.includes(searchTerm)) ||
    (lab.department && lab.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.position && lab.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.contractTargetType && lab.contractTargetType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.contractType && lab.contractType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.status && lab.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lab.cccd && lab.cccd.includes(searchTerm))
  );

  const handleSelect = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredLaborers.map((emp, idx) => getRecordId(emp, idx)));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setLaborers(prev => prev.filter((lab, idx) => !selectedIds.includes(getRecordId(lab, idx))));
    if (activeRow && selectedIds.includes(getRecordId(activeRow, 0))) {
      setActiveRow(null);
    }
    setSelectedIds([]);
  };

  const handleDeleteItem = (targetLab: Laborer, idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const id = getRecordId(targetLab, idx);
    setLaborers(prev => prev.filter((lab, i) => getRecordId(lab, i) !== id));
    setSelectedIds(prev => prev.filter(item => item !== id));
    if (activeRow && getRecordId(activeRow, 0) === id) {
      setActiveRow(null);
    }
  };

  const handleAddLaborer = (newLaborer: Laborer) => {
    setLaborers(prev => [newLaborer, ...prev]);
    setActiveRow(newLaborer);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F4F6F8] p-4">
      {/* Main white container */}
      <div className="bg-white rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB] flex flex-col flex-1 min-h-0 overflow-hidden relative">
        
        {/* Action Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0 bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1A4B9F] text-white px-3 py-1.5 rounded text-[13px] font-medium flex items-center gap-1.5 hover:bg-blue-800 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-[13px] flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4 text-gray-500" /> Nhập excel
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-[13px] flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-gray-500" /> Xuất excel
            </button>
            <button 
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0}
              className={`border px-3 py-1.5 rounded text-[13px] flex items-center gap-1.5 transition-colors ${
                selectedIds.length > 0 
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 cursor-pointer' 
                  : 'bg-[#F3F4F6] border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-4 h-4" /> Xóa {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm mã, họ tên, SĐT, bộ phận, loại HĐ..." 
                className="border border-gray-300 rounded px-3 py-1.5 pl-3 pr-8 text-[13px] w-72 focus:outline-none focus:border-blue-500 bg-white" 
              />
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="bg-[#1A4B9F] text-white p-1.5 rounded hover:bg-blue-800 transition-colors">
              <LayoutTemplate className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 shrink-0 bg-white">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button className="border border-gray-300 text-gray-700 bg-[#EBF5FF] text-blue-700 border-blue-200 rounded-full px-3 py-1 text-[13px] flex items-center gap-1.5 whitespace-nowrap font-medium">
              Tất cả <span className="bg-blue-100 text-blue-700 px-1.5 rounded-full text-xs font-semibold">{filteredLaborers.length}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <button className="bg-[#1A4B9F] text-white px-3 py-1.5 rounded text-[13px] font-medium flex items-center gap-1.5 hover:bg-blue-800 transition-colors">
              <Filter className="w-3.5 h-3.5" fill="currentColor" /> Lọc
            </button>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedIds([]);
                setActiveRow(null);
              }}
              className="bg-[#F8F9FA] border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-[13px] flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Làm mới
            </button>
          </div>
        </div>

        {/* Table Viewlist: Thứ tự cột "Tình trạng", "Đối tượng", "Mã", "Họ tên", "Số điện thoại", "Bộ phận", "Chức vụ", "Loại hợp đồng" */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full min-w-[1280px] text-left border-collapse text-[13px]">
            <thead className="sticky top-0 bg-[#F9FAFB] z-10 border-b border-gray-200">
              <tr>
                <th className="p-3 border-r border-gray-200 w-12 min-w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 cursor-pointer"
                    checked={filteredLaborers.length > 0 && selectedIds.length === filteredLaborers.length}
                    onChange={handleSelectAll} 
                  />
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 w-[140px] min-w-[140px] text-center whitespace-nowrap">
                  Tình trạng
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 w-[150px] min-w-[150px] whitespace-nowrap">
                  Đối tượng
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 w-[140px] min-w-[140px] whitespace-nowrap">
                  Mã
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 min-w-[220px] whitespace-nowrap">
                  Họ tên
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 w-[140px] min-w-[140px] whitespace-nowrap">
                  Số điện thoại
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 min-w-[190px] whitespace-nowrap">
                  Bộ phận
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 min-w-[180px] whitespace-nowrap">
                  Chức vụ
                </th>
                <th className="p-3 border-r border-gray-200 font-semibold text-gray-700 min-w-[250px] whitespace-nowrap">
                  Loại hợp đồng
                </th>
                <th className="p-3 border-gray-200 w-14 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLaborers.map((lab, idx) => {
                const recId = getRecordId(lab, idx);
                const isChecked = selectedIds.includes(recId);
                const isActive = activeRow && getRecordId(activeRow, 0) === recId;

                return (
                  <tr 
                    key={recId} 
                    onClick={() => setActiveRow(lab)}
                    className={`cursor-pointer transition-colors ${
                      isActive 
                        ? 'bg-blue-50/90 font-medium' 
                        : isChecked 
                          ? 'bg-blue-50/50' 
                          : 'hover:bg-blue-50/30'
                    }`}
                  >
                    <td className="p-3 border-r border-gray-200 text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 cursor-pointer" 
                        checked={isChecked}
                        onChange={() => handleSelect(recId)}
                      />
                    </td>

                    {/* 1. Tình trạng */}
                    <td className="p-3 border-r border-gray-200 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-medium border ${
                        lab.status === 'Đã chấm dứt' || lab.status === 'Hết hiệu lực'
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : lab.status === 'Chờ ký'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      }`}>
                        {lab.status || 'Còn hiệu lực'}
                      </span>
                    </td>

                    {/* 2. Đối tượng */}
                    <td className="p-3 border-r border-gray-200 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {lab.contractTargetType || 'Người lao động'}
                      </span>
                    </td>

                    {/* 3. Mã */}
                    <td className="p-3 border-r border-gray-200 text-gray-800 font-mono font-medium whitespace-nowrap">
                      {lab.code || '—'}
                    </td>

                    {/* 4. Họ tên */}
                    <td className="p-3 border-r border-gray-200 text-gray-900 font-semibold whitespace-nowrap">
                      {lab.name}
                    </td>

                    {/* 5. Số điện thoại */}
                    <td className="p-3 border-r border-gray-200 text-gray-700 font-medium whitespace-nowrap">
                      {lab.phone || '—'}
                    </td>

                    {/* 6. Bộ phận */}
                    <td className="p-3 border-r border-gray-200 text-gray-700 whitespace-nowrap">
                      {lab.department || '—'}
                    </td>

                    {/* 7. Chức vụ */}
                    <td className="p-3 border-r border-gray-200 text-gray-700 whitespace-nowrap">
                      {lab.position || '—'}
                    </td>

                    {/* 8. Loại hợp đồng */}
                    <td className="p-3 border-r border-gray-200 text-gray-800 whitespace-nowrap font-medium">
                      {lab.contractType || '—'}
                    </td>

                    {/* Hành động */}
                    <td className="p-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={(e) => handleDeleteItem(lab, idx, e)}
                        className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                        title="Xóa hồ sơ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredLaborers.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-10 h-10 text-gray-300 stroke-1" />
                      <span className="text-[14px] text-gray-600 font-medium">Chưa có hồ sơ hợp đồng nào</span>
                      <p className="text-xs text-gray-400">Bấm nút "Thêm" ở góc trên bên trái để tạo hồ sơ hợp đồng mới</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Split Pane - Chi tiết hồ sơ đang chọn */}
        <div className="h-[210px] border-t-2 border-blue-500 bg-white flex flex-col relative shrink-0 overflow-y-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-b-md cursor-row-resize"></div>
          
          {activeRow ? (
            <div className="p-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2.5 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 text-sm">{activeRow.name}</h4>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                        {activeRow.contractTargetType || 'Người lao động'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Mã: <strong className="font-mono text-gray-700">{activeRow.code || '—'}</strong> • Chức vụ: <strong className="text-gray-700">{activeRow.position || '—'}</strong></p>
                  </div>
                </div>
                <div className="text-xs text-gray-600 flex gap-4">
                  <span>Tình trạng: <strong className="text-emerald-700 font-medium">{activeRow.status || 'Còn hiệu lực'}</strong></span>
                  <span>Điện thoại: <strong className="text-gray-800">{activeRow.phone}</strong></span>
                  <span>CCCD: <strong className="text-gray-800 font-mono">{activeRow.cccd}</strong></span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3.5 text-xs">
                <div className="bg-gray-50 p-2.5 rounded border border-gray-200">
                  <span className="text-gray-500 block mb-1">Bộ phận:</span>
                  <span className="font-medium text-gray-800">{activeRow.department || '—'}</span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-200">
                  <span className="text-gray-500 block mb-1">Loại hợp đồng:</span>
                  <span className="font-medium text-gray-800">{activeRow.contractType || '—'}</span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-200">
                  <span className="text-gray-500 block mb-1">Ngày sinh & Giới tính:</span>
                  <span className="font-medium text-gray-800">{activeRow.dob} ({activeRow.gender})</span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-200">
                  <span className="text-gray-500 block mb-1">Chỗ ở hiện nay:</span>
                  <span className="font-medium text-gray-800 truncate block" title={activeRow.address}>{activeRow.address}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-6">
              <div className="w-12 h-10 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                <LayoutTemplate className="w-6 h-6 text-gray-300" />
              </div>
              <span className="text-[13px] text-gray-500">Chọn một hồ sơ hợp đồng bên trên để xem thông tin chi tiết</span>
            </div>
          )}
        </div>

        {/* Footer Pagination */}
        <div className="border-t border-gray-200 bg-white p-3 flex items-center justify-between text-[13px] text-gray-600 shrink-0">
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-[4px] px-2 py-1 outline-none text-gray-700">
              <option>20 Dòng</option>
              <option>50 Dòng</option>
              <option>100 Dòng</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="p-1 text-gray-400 hover:text-gray-600 cursor-not-allowed">&lt;</button>
              <button className="w-7 h-7 flex items-center justify-center bg-[#E5F0FF] text-blue-600 border border-blue-200 rounded-[4px] font-medium">1</button>
              <button className="p-1 text-gray-400 hover:text-gray-600 cursor-not-allowed">&gt;</button>
            </div>
            <span>Hiển thị 1 - {filteredLaborers.length} / {laborers.length} kết quả</span>
          </div>
        </div>
      </div>

      <LaborDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        existingLaborers={laborers}
        onAddLaborer={handleAddLaborer}
      />
    </div>
  );
};
