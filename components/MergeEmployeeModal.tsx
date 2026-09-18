import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { MOCK_EMPLOYEES } from './EmployeeList';

interface MergeEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCccds: string[];
  onMergeComplete: () => void;
}

export const MergeEmployeeModal: React.FC<MergeEmployeeModalProps> = ({ isOpen, onClose, selectedCccds, onMergeComplete }) => {
  const [rootCccd, setRootCccd] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setRootCccd('');
      setShowConfirm(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen || selectedCccds.length !== 2) return null;

  const emp1 = MOCK_EMPLOYEES.find(e => e.cccd === selectedCccds[0]);
  const emp2 = MOCK_EMPLOYEES.find(e => e.cccd === selectedCccds[1]);

  if (!emp1 || !emp2) return null;

  const handleMergeClick = () => {
    if (!rootCccd) return;
    setShowConfirm(true);
  };

  const handleConfirmMerge = () => {
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onMergeComplete();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg shadow-xl w-[900px] flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Gộp Hồ sơ</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            <div className="mb-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-100 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p>Vui lòng chọn 1 hồ sơ làm gốc. Hồ sơ gốc sẽ được giữ lại, các thông tin từ hồ sơ kia sẽ được gộp vào hồ sơ gốc và sau đó hồ sơ kia sẽ bị xóa.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Profile 1 */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${rootCccd === emp1.cccd ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setRootCccd(emp1.cccd)}
              >
                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                  <input 
                    type="radio" 
                    name="rootProfile" 
                    checked={rootCccd === emp1.cccd}
                    onChange={() => setRootCccd(emp1.cccd)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                  />
                  <span className="font-semibold text-[15px] text-gray-800">Hồ sơ 1</span>
                </div>
                <div className="space-y-3 text-[13px]">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Họ và tên:</span>
                    <span className="font-medium text-gray-900">{emp1.name}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Giới tính:</span>
                    <span className="text-gray-900">{emp1.gender}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Ngày sinh:</span>
                    <span className="text-gray-900">{emp1.dob}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Điện thoại:</span>
                    <span className="text-gray-900">{emp1.phone}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900">{emp1.email}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Số CCCD:</span>
                    <span className="text-gray-900">{emp1.cccd}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Quốc tịch:</span>
                    <span className="text-gray-900">{emp1.nationality}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Địa chỉ:</span>
                    <span className="text-gray-900">{emp1.address}</span>
                  </div>
                </div>
              </div>

              {/* Profile 2 */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${rootCccd === emp2.cccd ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setRootCccd(emp2.cccd)}
              >
                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                  <input 
                    type="radio" 
                    name="rootProfile" 
                    checked={rootCccd === emp2.cccd}
                    onChange={() => setRootCccd(emp2.cccd)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                  />
                  <span className="font-semibold text-[15px] text-gray-800">Hồ sơ 2</span>
                </div>
                <div className="space-y-3 text-[13px]">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Họ và tên:</span>
                    <span className="font-medium text-gray-900">{emp2.name}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Giới tính:</span>
                    <span className="text-gray-900">{emp2.gender}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Ngày sinh:</span>
                    <span className="text-gray-900">{emp2.dob}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Điện thoại:</span>
                    <span className="text-gray-900">{emp2.phone}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900">{emp2.email}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Số CCCD:</span>
                    <span className="text-gray-900">{emp2.cccd}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Quốc tịch:</span>
                    <span className="text-gray-900">{emp2.nationality}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-gray-500">Địa chỉ:</span>
                    <span className="text-gray-900">{emp2.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 bg-white rounded text-gray-700 font-medium hover:bg-gray-100 transition-colors text-[14px]">
              Hủy
            </button>
            <button 
              onClick={handleMergeClick}
              disabled={!rootCccd}
              className={`px-4 py-2 text-white rounded font-medium transition-colors text-[14px] ${!rootCccd ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Xác nhận gộp
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[400px] p-6 animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Xác nhận gộp hồ sơ</h3>
            <p className="text-gray-600 text-[14px] mb-6">
              Hồ sơ được chọn sẽ giữ lại, hồ sơ không được chọn sẽ được gộp vào hồ sơ gốc. Sau đó hồ sơ không được chọn sẽ bị xóa. Bạn đồng ý thì nhấn Xác nhận.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition-colors text-[14px]"
              >
                Hủy
              </button>
              <button 
                onClick={handleConfirmMerge}
                className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors text-[14px]"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[400px] p-6 animate-fadeIn text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Đã gộp thành công</h3>
            <p className="text-gray-600 text-[14px] mb-6">
              Hai hồ sơ đã được gộp lại.
            </p>
            <button 
              onClick={handleSuccessClose}
              className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors text-[14px] w-full"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};
