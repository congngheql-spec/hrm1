import React, { useState } from 'react';
import { X, Calendar, HelpCircle, Download, AlertTriangle } from 'lucide-react';
import { MOCK_EMPLOYEES } from './EmployeeList';

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CertificateRow {
  id: string;
  type: string;
  description: string;
  institution: string;
  issueDate: string;
  expirationDate: string;
  link: string;
  file: string;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'skills' | 'salary'>('personal');
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  
  const [cccd, setCccd] = useState('');
  const [cccdError, setCccdError] = useState<{isError: boolean, message: string}>({isError: false, message: ''});

  React.useEffect(() => {
    if (isOpen) {
      setCccd('');
      setCccdError({isError: false, message: ''});
    }
  }, [isOpen]);

  const handleCccdChange = (value: string) => {
    setCccd(value);
    if (!value) {
      setCccdError({isError: false, message: ''});
      return;
    }
    const duplicate = MOCK_EMPLOYEES.find(emp => emp.cccd === value);
    if (duplicate) {
      setCccdError({
        isError: true,
        message: `Số CCCD bị trùng với nhân sự: ${duplicate.name}`
      });
    } else {
      setCccdError({isError: false, message: ''});
    }
  };

  const addCertificateRow = () => {
    setCertificates([...certificates, {
      id: Date.now().toString(),
      type: '',
      description: '',
      institution: '',
      issueDate: '',
      expirationDate: '',
      link: '',
      file: ''
    }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F8FAFC] w-full max-w-7xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-slideUp">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0">
          <h2 className="text-[20px] font-bold text-gray-800">Chi tiết nhân sự</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 bg-white border-b border-gray-200 shrink-0">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 text-[14px] font-medium rounded-t-md border-b-2 ${activeTab === 'personal' ? 'text-gray-900 bg-[#FFF3C4] border-transparent' : 'text-gray-600 hover:text-gray-900 border-transparent transition-colors'}`}
          >
            Thông tin cá nhân
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 text-[14px] font-medium rounded-t-md border-b-2 ${activeTab === 'skills' ? 'text-gray-900 bg-[#FFF3C4] border-transparent' : 'text-gray-600 hover:text-gray-900 border-transparent transition-colors'}`}
          >
            Trình độ & Kỹ năng
          </button>
          <button 
            onClick={() => setActiveTab('salary')}
            className={`px-4 py-2 text-[14px] font-medium rounded-t-md border-b-2 ${activeTab === 'salary' ? 'text-gray-900 bg-[#FFF3C4] border-transparent' : 'text-gray-600 hover:text-gray-900 border-transparent transition-colors'}`}
          >
            Danh mục Tài liệu
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 text-[14px]">
          
          {activeTab === 'personal' && (
            <>
              <div className="flex gap-6 items-start">
                
                {/* Column 1: Identity Info */}
                <div className="flex-1 bg-white p-6 rounded-md shadow-sm border border-gray-200">
                  <h3 className="text-blue-600 font-medium mb-6">Thông tin định danh</h3>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Tên nhân sự <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Nhập tên nhân sự" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Giới tính</label>
                      <select defaultValue="" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 bg-white appearance-none">
                        <option value="" disabled className="text-gray-400">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Ngày sinh</label>
                      <div className="relative">
                        <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Nơi sinh</label>
                      <input type="text" placeholder="Nhập nơi sinh" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Quốc tịch</label>
                      <input type="text" placeholder="Nhập quốc tịch" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Column 2: Contact Info */}
                <div className="flex-1 bg-white p-6 rounded-md shadow-sm border border-gray-200">
                  <h3 className="text-blue-600 font-medium mb-6">Thông tin liên hệ</h3>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Điện thoại <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Nhập số điện thoại" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Email</label>
                      <input type="text" placeholder="Nhập email" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Section: CCCD */}
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 mt-6">
                <h3 className="text-blue-600 font-medium mb-6">CCCD</h3>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Số CCCD</label>
                    <input 
                      type="text" 
                      placeholder="Nhập số CCCD" 
                      className={`w-full border ${cccdError.isError ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'} rounded px-3 py-2 outline-none transition-colors`} 
                      value={cccd}
                      onChange={(e) => handleCccdChange(e.target.value)}
                    />
                    {cccdError.isError && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-[13px]">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{cccdError.message}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Ngày cấp CCCD</label>
                    <div className="relative">
                      <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Nơi cấp CCCD</label>
                    <input type="text" placeholder="Nhập nơi cấp CCCD" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div></div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Hộ khẩu thường trú</label>
                    <textarea rows={3} placeholder="Nhập địa chỉ" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Chỗ ở hiện nay</label>
                    <textarea rows={3} placeholder="Nhập địa chỉ" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 resize-none"></textarea>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === 'salary' && (
            <div className="flex-1 overflow-y-auto p-6 bg-[#F4F6F8]">
              {/* Danh mục Văn bằng / Chứng chỉ / CV */}
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
                <h3 className="text-blue-600 font-medium mb-6 text-[15px]">Danh mục Văn bằng / Chứng chỉ / CV</h3>
                
                <div className="border border-blue-200 rounded-md overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#EBF5FF]">
                      <tr>
                        <th className="p-3 border-r border-b border-blue-200 w-12 text-center text-gray-700 font-medium text-[13px]">#</th>
                        <th className="p-3 border-r border-b border-blue-200 text-gray-700 font-medium text-[13px] w-[140px]">Loại</th>
                        <th className="p-3 border-r border-b border-blue-200 text-gray-700 font-medium text-[13px] min-w-[150px]">Mô tả loại</th>
                        <th className="p-3 border-r border-b border-blue-200 text-gray-700 font-medium text-[13px] w-[200px]">Trường/ Trung tâm đào tạo</th>
                        <th className="p-3 border-r border-b border-blue-200 text-gray-700 font-medium text-[13px] w-[120px]">Ngày cấp</th>
                        <th className="p-3 border-r border-b border-blue-200 text-gray-700 font-medium text-[13px] w-[160px]">Ngày hết hạn (nếu có)</th>
                        <th className="p-3 border-r border-b border-blue-200 text-gray-700 font-medium text-[13px] w-[120px]">Link</th>
                        <th className="p-3 border-r border-b border-blue-200 text-gray-700 font-medium text-[13px] w-[120px]">File tải lên</th>
                        <th className="p-3 border-b border-blue-200 bg-[#EBF5FF] text-[13px] w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((cert, index) => (
                        <tr key={cert.id} className="border-b border-dashed border-gray-200">
                          <td className="p-3 border-r border-dashed border-gray-200 text-center text-[13px]">{index + 1}</td>
                          <td className="p-2 border-r border-dashed border-gray-200">
                            <select className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 bg-white text-[13px]">
                              <option value="">Chọn loại</option>
                              <option value="Văn bằng">Văn bằng</option>
                              <option value="Chứng chỉ">Chứng chỉ</option>
                              <option value="CV">CV</option>
                              <option value="Giấy khám sức khỏe">Giấy khám sức khỏe</option>
                              <option value="CCCD">CCCD</option>
                              <option value="GPLX">GPLX</option>
                              <option value="Khác">Khác</option>
                            </select>
                          </td>
                          <td className="p-2 border-r border-dashed border-gray-200">
                            <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 text-[13px]" placeholder="Mô tả" />
                          </td>
                          <td className="p-2 border-r border-dashed border-gray-200">
                            <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 text-[13px]" placeholder="Trường/Trung tâm" />
                          </td>
                          <td className="p-2 border-r border-dashed border-gray-200">
                            <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 text-[13px]" placeholder="DD/MM/YYYY" />
                          </td>
                          <td className="p-2 border-r border-dashed border-gray-200">
                            <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 text-[13px]" placeholder="DD/MM/YYYY" />
                          </td>
                          <td className="p-2 border-r border-dashed border-gray-200">
                            <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 text-[13px]" placeholder="Link" />
                          </td>
                          <td className="p-2 border-r border-dashed border-gray-200">
                            <button className="text-blue-600 hover:text-blue-700 text-[13px] font-medium w-full text-left">Chọn file...</button>
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                className="text-gray-500 hover:text-blue-600 transition-colors"
                                title="Tải về"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setCertificates(certificates.filter(c => c.id !== cert.id))}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Xóa"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="p-3 border-r border-b border-dashed border-gray-200"></td>
                        <td colSpan={8} className="p-3 border-b border-dashed border-gray-200 text-gray-500 italic bg-white text-[13px] cursor-pointer hover:bg-gray-50" onClick={addCertificateRow}>
                          Bấm vào đây để thêm dòng mới
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-3 flex items-center gap-1.5 bg-white text-gray-700 font-medium text-[13px] cursor-pointer hover:text-blue-600" onClick={addCertificateRow}>
                    Thêm dòng (F2) 
                    <div className="w-4 h-4 bg-gray-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">?</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'skills' && (
            <div className="flex flex-col gap-6">
              
              {/* Trình độ học vấn */}
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 w-full">
                <h3 className="text-blue-600 font-medium mb-6 text-[15px]">Trình độ học vấn</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Trình độ học vấn</label>
                    <div className="relative">
                      <select defaultValue="" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 bg-white appearance-none">
                        <option value="" disabled className="text-gray-400">Chọn trình độ học vấn</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Năm tốt nghiệp</label>
                    <div className="relative">
                      <input type="text" placeholder="YYYY" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Chuyên ngành đào tạo</label>
                    <input type="text" placeholder="Nhập chuyên ngành" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Trường/Trung tâm đào tạo</label>
                    <input type="text" placeholder="Nhập trường/trung tâm đào tạo" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Số năm kinh nghiệm</label>
                    <input type="text" placeholder="Nhập số năm" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1.5">Kinh nghiệm trước đây</label>
                    <textarea rows={3} placeholder="Nhập kinh nghiệm trước đây" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 resize-none"></textarea>
                  </div>
                </div>
              </div>

            </div>
          )}
          
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white shrink-0">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition-colors text-[14px]">
            Đóng
          </button>
          <button 
            onClick={onClose} 
            disabled={cccdError.isError}
            className={`px-4 py-2 text-white rounded font-medium transition-colors text-[14px] ${cccdError.isError ? 'bg-blue-300 cursor-not-allowed' : 'bg-[#2563EB] hover:bg-blue-700'}`}
          >
            Ghi nhận
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slideUp {
            animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
