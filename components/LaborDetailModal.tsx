import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Calendar, Download, AlertTriangle, Search, ChevronDown, Check, FileText, Briefcase, DollarSign, ShieldCheck } from 'lucide-react';
import { MOCK_EMPLOYEES } from './EmployeeList';

export interface Laborer {
  id?: string;
  code?: string;
  status?: string;
  contractTargetType?: string;
  name: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  cccd: string;
  nationality: string;
  address: string;
  department?: string;
  position?: string;
  contractType?: string;
}

export const CONTRACT_TARGET_OPTIONS = ['Người lao động', 'Cộng tác viên', 'Môi giới', 'Nhân sự B2B'] as const;
export type ContractTargetType = typeof CONTRACT_TARGET_OPTIONS[number];

interface LaborDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingLaborers: Laborer[];
  onAddLaborer?: (laborer: Laborer) => void;
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

export const LaborDetailModal: React.FC<LaborDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  existingLaborers,
  onAddLaborer 
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'skills' | 'salary' | 'contract_setup'>('personal');
  const [certificates, setCertificates] = useState<CertificateRow[]>([
    {
      id: '1',
      type: 'Chứng chỉ nghề',
      description: 'Chứng chỉ an toàn vệ sinh lao động',
      institution: 'Trung tâm Huấn luyện An toàn',
      issueDate: '12/03/2022',
      expirationDate: '12/03/2027',
      link: '',
      file: 'chung_chi_atld.pdf'
    }
  ]);
  
  const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);
  const [contractTargetType, setContractTargetType] = useState<ContractTargetType>('Người lao động');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const objectSelectRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cccd, setCccd] = useState('');
  const [nationality, setNationality] = useState('Việt Nam');
  const [address, setAddress] = useState('');
  const [cccdError, setCccdError] = useState<{isError: boolean, message: string}>({isError: false, message: ''});

  // Thiết lập Hợp đồng States
  const [contractCode, setContractCode] = useState('HĐLĐ-2026/001');
  const [contractType, setContractType] = useState('Hợp đồng lao động xác định thời hạn (12 tháng)');
  const [contractStatus, setContractStatus] = useState('Đang hiệu lực');
  const [signDate, setSignDate] = useState('15/01/2026');
  const [effectiveStartDate, setEffectiveStartDate] = useState('01/02/2026');
  const [effectiveEndDate, setEffectiveEndDate] = useState('31/01/2027');
  const [isIndefinite, setIsIndefinite] = useState(false);
  const [signerRepresentative, setSignerRepresentative] = useState('Nguyễn Văn Quản Lý');
  const [signerRole, setSignerRole] = useState('Giám Đốc Điều Hành');

  const [department, setDepartment] = useState('Xưởng Dịch vụ & Sửa chữa');
  const [jobPosition, setJobPosition] = useState('Kỹ thuật viên gầm - máy');
  const [workLocation, setWorkLocation] = useState('Garage Du Mục - Trụ sở chính (TP. Hồ Chí Minh)');
  const [workScheduleType, setWorkScheduleType] = useState('Toàn thời gian cố định');
  const [workHours, setWorkHours] = useState('44 giờ/tuần (Thứ 2 - Thứ 7, nghỉ CN)');

  const [salaryGradeStep, setSalaryGradeStep] = useState('Bậc 3/7 - Thợ kỹ thuật chuyên môn');
  const [baseSalary, setBaseSalary] = useState('12,500,000');
  const [responsibilityAllowance, setResponsibilityAllowance] = useState('1,500,000');
  const [otherAllowances, setOtherAllowances] = useState('1,200,000');
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản ATM ngân hàng');
  const [salaryPaymentDay, setSalaryPaymentDay] = useState('Ngày 05 hàng tháng');
  const [insuranceEnrolled, setInsuranceEnrolled] = useState(true);

  const [probationPeriod, setProbationPeriod] = useState('30 ngày');
  const [probationSalaryRate, setProbationSalaryRate] = useState('85%');
  const [confidentialityAgreed, setConfidentialityAgreed] = useState(true);
  const [contractNotes, setContractNotes] = useState('Tuân thủ quy chế vận hành garage và an toàn kỹ thuật xưởng.');

  // States specifically for "Người lao động" in Thiết lập Hợp đồng (như hình ảnh đính kèm)
  const [officialWorkDate, setOfficialWorkDate] = useState('');
  const [isStillWorking, setIsStillWorking] = useState(true);
  const [probationStartDate, setProbationStartDate] = useState('');
  const [probationEndDate, setProbationEndDate] = useState('');
  const [laborPosition, setLaborPosition] = useState('Quản lý xưởng');
  const [laborDepartment, setLaborDepartment] = useState('Phòng Tư vấn, Dịch vụ');
  const [directManager, setDirectManager] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  const [laborContractType, setLaborContractType] = useState('HĐ Thử Việc 2T');
  const [laborContractCode, setLaborContractCode] = useState('HDTV_2T');
  const [contractSignDate, setContractSignDate] = useState('');
  const [contractExpiryDate, setContractExpiryDate] = useState('');
  const [resignationDate, setResignationDate] = useState('');
  const [workStatus, setWorkStatus] = useState('Đang làm việc');
  const [resignationReason, setResignationReason] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setSelectedEmployee(null);
      setContractTargetType('Người lao động');
      setSearchQuery('');
      setIsDropdownOpen(false);
      setName('');
      setGender('Nam');
      setDob('');
      setPhone('');
      setEmail('');
      setCccd('');
      setNationality('Việt Nam');
      setAddress('');
      setCccdError({isError: false, message: ''});
      setActiveTab('personal');

      // Reset form Người lao động
      setOfficialWorkDate('');
      setIsStillWorking(true);
      setProbationStartDate('');
      setProbationEndDate('');
      setLaborPosition('Quản lý xưởng');
      setLaborDepartment('Phòng Tư vấn, Dịch vụ');
      setDirectManager('');
      setCompanyEmail('');
      setLaborContractType('HĐ Thử Việc 2T');
      setLaborContractCode('HDTV_2T');
      setContractSignDate('');
      setContractExpiryDate('');
      setResignationDate('');
      setWorkStatus('Đang làm việc');
      setResignationReason('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (objectSelectRef.current && !objectSelectRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredEmployees = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MOCK_EMPLOYEES;
    // If the query matches the currently selected employee label, display all to allow easy re-selection
    if (selectedEmployee && (
      q === `${selectedEmployee.name} - cccd: ${selectedEmployee.cccd}`.toLowerCase() ||
      q === selectedEmployee.name.toLowerCase() ||
      q === selectedEmployee.cccd.toLowerCase()
    )) {
      return MOCK_EMPLOYEES;
    }
    const cleanQ = q.replace(/\s+/g, '');
    return MOCK_EMPLOYEES.filter(emp => 
      emp.name.toLowerCase().includes(q) || 
      emp.cccd.toLowerCase().includes(q) ||
      emp.cccd.replace(/\s+/g, '').includes(cleanQ)
    );
  }, [searchQuery, selectedEmployee]);

  const handleSelectEmployee = (emp: typeof MOCK_EMPLOYEES[0]) => {
    setSelectedEmployee(emp);
    setSearchQuery(`${emp.name} - CCCD: ${emp.cccd}`);
    setIsDropdownOpen(false);
    
    setName(emp.name);
    setGender(emp.gender);
    setDob(emp.dob);
    setCccd(emp.cccd);
    setPhone(emp.phone);
    setEmail(emp.email);
    setCompanyEmail(emp.email || '');
    setNationality(emp.nationality || 'Việt Nam');
    setAddress(emp.address || '');
    handleCccdChange(emp.cccd);
  };

  const handleClearSelection = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedEmployee(null);
    setSearchQuery('');
    setIsDropdownOpen(false);
    
    setName('');
    setGender('Nam');
    setDob('');
    setCccd('');
    setPhone('');
    setEmail('');
    setCompanyEmail('');
    setNationality('Việt Nam');
    setAddress('');
    setCccdError({ isError: false, message: '' });
  };

  const handleCccdChange = (value: string) => {
    setCccd(value);
    if (!value) {
      setCccdError({isError: false, message: ''});
      return;
    }
    const duplicate = existingLaborers.find(lab => lab.cccd === value);
    if (duplicate) {
      setCccdError({
        isError: true,
        message: `Số CCCD bị trùng với lao động: ${duplicate.name}`
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

  const handleSubmit = () => {
    if (cccdError.isError) return;
    if (onAddLaborer && name.trim()) {
      const target = contractTargetType || 'Người lao động';
      let assignedCode = laborContractCode;
      let assignedType = laborContractType;
      let assignedStatus = workStatus || 'Còn hiệu lực';

      if (target === 'Cộng tác viên') {
        assignedCode = contractCode || 'HĐCTV-2026/01';
        assignedType = contractType || 'Hợp đồng cộng tác viên';
      } else if (target === 'Môi giới') {
        assignedCode = contractCode || 'HĐMG-2026/01';
        assignedType = 'Hợp đồng môi giới';
      } else if (target === 'Nhân sự B2B') {
        assignedCode = contractCode || 'HĐB2B-2026/01';
        assignedType = 'Hợp đồng thuê ngoài';
      }

      onAddLaborer({
        code: assignedCode || `HĐ-${Math.floor(1000 + Math.random() * 9000)}`,
        status: assignedStatus,
        contractTargetType: target,
        name: name.trim().toUpperCase(),
        gender: gender || 'Nam',
        dob: dob || '01/01/1992',
        phone: phone || '0901 000 111',
        email: email || 'laodong@garage.vn',
        cccd: cccd || `0790${Math.floor(10000000 + Math.random() * 90000000)}`,
        nationality: nationality || 'Việt Nam',
        address: address || 'TP. Hồ Chí Minh',
        department: laborDepartment || department || 'Phòng Tư vấn, Dịch vụ',
        position: laborPosition || jobPosition || 'Kỹ thuật viên',
        contractType: assignedType || 'Hợp đồng lao động xác định thời hạn'
      });
    }
    onClose();
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#F8FAFC] overflow-hidden animate-fadeIn">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between px-8 py-3.5 border-b border-gray-200 bg-white shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-bold text-gray-800">Chi tiết Hồ sơ Hợp đồng</h2>
          <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded font-medium">
            Toàn màn hình
          </span>
        </div>
        <button 
          onClick={onClose} 
          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
          title="Đóng (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-8 pt-3 bg-white border-b border-gray-200 shrink-0">
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
        <button 
          onClick={() => setActiveTab('contract_setup')}
          className={`px-4 py-2 text-[14px] font-medium rounded-t-md border-b-2 ${activeTab === 'contract_setup' ? 'text-gray-900 bg-[#FFF3C4] border-transparent' : 'text-gray-600 hover:text-gray-900 border-transparent transition-colors'}`}
        >
          Thiết lập Hợp đồng
        </button>
      </div>

      {/* Persistent Bar under Tabs: Xác định đối tượng, Họ tên đầy đủ, Ngày sinh, Giới tính, Đối tượng Hợp đồng */}
      <div className="bg-white px-8 py-3.5 border-b border-gray-200 shrink-0 shadow-xs relative z-40 overflow-visible">
        <div className="flex items-end gap-3 w-full flex-nowrap overflow-visible">
          {/* Field 1: Xác định đối tượng: */}
          <div className="flex-1 min-w-[360px] max-w-[460px] relative shrink-0" ref={objectSelectRef}>
            <label className="block text-gray-700 font-semibold text-xs mb-1">
              Xác định đối tượng: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Tìm theo CCCD hoặc Họ tên từ Hồ sơ Nhân sự..."
                  className="w-full pl-9 pr-14 py-2 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white transition-all placeholder:text-gray-400 h-[38px]"
                />
                <div className="absolute right-2.5 flex items-center gap-1">
                  {(selectedEmployee || searchQuery) && (
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                      title="Xóa lựa chọn và chọn lại (Clear)"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Mở danh sách nhân sự"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Dropdown Menu - nổi phủ lên toàn bộ màn hình phía dưới */}
              {isDropdownOpen && (
                <div className="absolute left-0 w-full min-w-[440px] top-full mt-1.5 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto divide-y divide-gray-100 ring-1 ring-black/5 animate-fadeIn">
                  <div className="px-3.5 py-2 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 flex items-center justify-between">
                    <span>Nguồn: Hồ sơ Nhân sự ({filteredEmployees.length} nhân sự)</span>
                    <span className="text-[11px] text-gray-400 font-normal">Hiển thị Họ tên & CCCD</span>
                  </div>
                  {filteredEmployees.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-500">
                      Không tìm thấy nhân sự nào khớp với từ khóa "{searchQuery}"
                    </div>
                  ) : (
                    filteredEmployees.map((emp) => {
                      const isSelected = selectedEmployee?.cccd === emp.cccd;
                      return (
                        <div
                          key={emp.cccd}
                          onClick={() => handleSelectEmployee(emp)}
                          className={`px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/80 text-blue-900' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-gray-900">{emp.name}</span>
                              <span className="text-[11px] font-mono px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-semibold">
                                CCCD: {emp.cccd}
                              </span>
                            </div>
                            <div className="text-[12px] text-gray-500 flex items-center gap-2">
                              <span>Ngày sinh: <strong className="font-medium text-gray-700">{emp.dob}</strong></span>
                              <span>•</span>
                              <span>Giới tính: <strong className="font-medium text-gray-700">{emp.gender}</strong></span>
                              <span>•</span>
                              <span>ĐT: {emp.phone}</span>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Field 2: Họ tên đầy đủ */}
          <div className="w-[180px] shrink-0">
            <label className="block text-gray-700 font-semibold text-xs mb-1">
              Họ tên đầy đủ
            </label>
            <input
              type="text"
              readOnly
              value={selectedEmployee ? selectedEmployee.name : ''}
              placeholder="Chưa chọn đối tượng"
              title={selectedEmployee ? selectedEmployee.name : ''}
              className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-800 font-semibold border border-gray-300 rounded cursor-not-allowed outline-none select-none h-[38px] truncate"
            />
          </div>

          {/* Field 3: Ngày sinh */}
          <div className="w-[110px] shrink-0">
            <label className="block text-gray-700 font-semibold text-xs mb-1">
              Ngày sinh
            </label>
            <input
              type="text"
              readOnly
              value={selectedEmployee ? selectedEmployee.dob : ''}
              placeholder="DD/MM/YYYY"
              className="w-full px-2 py-2 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded cursor-not-allowed outline-none select-none text-center font-medium h-[38px]"
            />
          </div>

          {/* Field 4: Giới tính */}
          <div className="w-[85px] shrink-0">
            <label className="block text-gray-700 font-semibold text-xs mb-1">
              Giới tính
            </label>
            <input
              type="text"
              readOnly
              value={selectedEmployee ? selectedEmployee.gender : ''}
              placeholder="---"
              className="w-full px-2 py-2 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded cursor-not-allowed outline-none select-none text-center font-medium h-[38px]"
            />
          </div>

          {/* Field 5: Đối tượng Hợp đồng */}
          <div className="shrink-0">
            <label className="block text-gray-700 font-semibold text-xs mb-1">
              Đối tượng Hợp đồng: <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4 h-[38px] px-3.5 bg-white border border-gray-300 rounded">
              {CONTRACT_TARGET_OPTIONS.map((opt) => {
                const isChecked = contractTargetType === opt;
                return (
                  <label
                    key={opt}
                    onClick={() => setContractTargetType(opt)}
                    className="flex items-center gap-2 cursor-pointer select-none group py-1"
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                        isChecked
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'border-gray-400 bg-white group-hover:border-blue-500'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={`text-xs whitespace-nowrap ${isChecked ? 'text-blue-900 font-semibold' : 'text-gray-700 font-medium'}`}>
                      {opt}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 text-[14px]">
          
          {activeTab === 'personal' && (
            <>
              <div className="flex gap-6 items-start">
                
                {/* Column 1: Identity Info */}
                <div className="flex-1 bg-white p-6 rounded-md shadow-sm border border-gray-200">
                  <h3 className="text-blue-600 font-medium mb-6">Thông tin định danh</h3>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-gray-700 font-medium">Họ tên người lao động <span className="text-red-500">*</span></label>
                        <span className="text-[11px] text-gray-400 italic">(Từ Xác định đối tượng)</span>
                      </div>
                      <input 
                        type="text" 
                        readOnly
                        value={selectedEmployee ? selectedEmployee.name : ''}
                        placeholder="Chưa chọn đối tượng (ở trên)" 
                        className="w-full border border-gray-300 rounded px-3 py-2 outline-none bg-gray-100 text-gray-800 font-semibold cursor-not-allowed" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-gray-700 font-medium">Giới tính</label>
                        <span className="text-[11px] text-gray-400 italic">(Từ Xác định đối tượng)</span>
                      </div>
                      <input 
                        type="text"
                        readOnly
                        value={selectedEmployee ? selectedEmployee.gender : ''}
                        placeholder="---"
                        className="w-full border border-gray-300 rounded px-3 py-2 outline-none bg-gray-100 text-gray-800 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-gray-700 font-medium">Ngày sinh</label>
                        <span className="text-[11px] text-gray-400 italic">(Từ Xác định đối tượng)</span>
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          readOnly
                          value={selectedEmployee ? selectedEmployee.dob : ''}
                          placeholder="DD/MM/YYYY" 
                          className="w-full border border-gray-300 rounded px-3 py-2 outline-none bg-gray-100 text-gray-800 cursor-not-allowed" 
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Nơi sinh</label>
                      <input type="text" placeholder="Nhập nơi sinh" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Quốc tịch</label>
                      <input 
                        type="text" 
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder="Nhập quốc tịch" 
                        className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Column 2: Contact Info */}
                <div className="flex-1 bg-white p-6 rounded-md shadow-sm border border-gray-200">
                  <h3 className="text-blue-600 font-medium mb-6">Thông tin liên hệ</h3>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Điện thoại <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại" 
                        className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1.5">Email</label>
                      <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email" 
                        className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" 
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* CCCD section */}
              <div className="mt-6 bg-white p-6 rounded-md shadow-sm border border-gray-200">
                <h3 className="text-blue-600 font-medium mb-6">Căn cước công dân (CCCD)</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-gray-700 font-medium">Số CCCD</label>
                      <span className="text-[11px] text-gray-400 italic">(Từ Xác định đối tượng)</span>
                    </div>
                    <input 
                      type="text" 
                      readOnly
                      placeholder="Chưa chọn đối tượng" 
                      value={selectedEmployee ? selectedEmployee.cccd : ''}
                      className="w-full border border-gray-300 rounded px-3 py-2 outline-none bg-gray-100 text-gray-800 font-mono font-medium cursor-not-allowed" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Ngày cấp</label>
                    <div className="relative">
                      <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Nơi cấp</label>
                    <input type="text" placeholder="Nhập nơi cấp" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-gray-700 font-medium mb-1.5">Địa chỉ thường trú / Chỗ ở hiện nay</label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Nhập địa chỉ chỗ ở hiện nay" 
                      className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'skills' && (
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 w-full">
                <h3 className="text-blue-600 font-medium mb-6 text-[15px]">Trình độ tay nghề & Kỹ thuật</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Bậc thợ / Trình độ</label>
                    <select defaultValue="Bậc 3/7" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 bg-white">
                      <option value="Bậc 1/7">Bậc 1/7</option>
                      <option value="Bậc 2/7">Bậc 2/7</option>
                      <option value="Bậc 3/7">Bậc 3/7</option>
                      <option value="Bậc 4/7">Bậc 4/7</option>
                      <option value="Bậc 5/7">Bậc 5/7</option>
                      <option value="Trung cấp nghề">Trung cấp nghề</option>
                      <option value="Cao đẳng nghề">Cao đẳng nghề</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Năm tốt nghiệp / cấp bằng</label>
                    <div className="relative">
                      <input type="text" placeholder="YYYY" className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Chuyên ngành kỹ thuật</label>
                    <input type="text" placeholder="Kỹ thuật cơ khí động lực, sơn ô tô, điện tử..." className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5">Nơi đào tạo</label>
                    <input type="text" placeholder="Trường Cao đẳng Kỹ thuật Cao Thắng..." className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1.5">Kinh nghiệm làm việc thực tế</label>
                    <textarea rows={3} placeholder="Mô tả các công việc, dự án hoặc kinh nghiệm thực tế đã thực hiện..." className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 resize-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'salary' && (
            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-600 font-medium text-[15px]">Danh mục Văn bằng / Hồ sơ an toàn lao động</h3>
                <button 
                  type="button" 
                  onClick={addCertificateRow}
                  className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                >
                  + Thêm tài liệu
                </button>
              </div>
              <div className="border border-blue-200 rounded-md overflow-hidden">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead className="bg-[#EBF5FF]">
                    <tr>
                      <th className="p-2.5 border-r border-b border-blue-200 w-12 text-center text-gray-700 font-medium">#</th>
                      <th className="p-2.5 border-r border-b border-blue-200 text-gray-700 font-medium w-[140px]">Loại</th>
                      <th className="p-2.5 border-r border-b border-blue-200 text-gray-700 font-medium">Mô tả loại</th>
                      <th className="p-2.5 border-r border-b border-blue-200 text-gray-700 font-medium">Trường/Trung tâm</th>
                      <th className="p-2.5 border-r border-b border-blue-200 text-gray-700 font-medium w-[110px]">Ngày cấp</th>
                      <th className="p-2.5 border-b border-blue-200 text-center w-14">File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert, idx) => (
                      <tr key={cert.id} className="border-b border-dashed border-gray-200 hover:bg-gray-50">
                        <td className="p-2.5 border-r border-dashed border-gray-200 text-center">{idx + 1}</td>
                        <td className="p-2.5 border-r border-dashed border-gray-200 font-medium text-blue-700">{cert.type || 'Hồ sơ kỹ thuật'}</td>
                        <td className="p-2.5 border-r border-dashed border-gray-200">{cert.description || 'Chứng nhận chuyên môn'}</td>
                        <td className="p-2.5 border-r border-dashed border-gray-200">{cert.institution || 'Cơ sở đào tạo'}</td>
                        <td className="p-2.5 border-r border-dashed border-gray-200">{cert.issueDate || '10/01/2023'}</td>
                        <td className="p-2.5 text-center">
                          <button className="text-blue-600 hover:text-blue-800" title="Tải về">
                            <Download className="w-4 h-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'contract_setup' && (
            <div className="flex flex-col gap-6">
              {contractTargetType === 'Người lao động' ? (
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Bên trái: Thông tin Hợp đồng */}
                  <div className="flex-1 bg-white p-6 rounded-md shadow-sm border border-gray-200 w-full">
                    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="text-blue-600 font-semibold text-[15px]">Thông tin Hợp đồng</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Loại hợp đồng <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={laborContractType}
                          onChange={(e) => setLaborContractType(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="HĐ Thử Việc 2T">HĐ Thử Việc 2T</option>
                          <option value="Hợp đồng lao động xác định thời hạn (12 tháng)">Hợp đồng lao động xác định thời hạn (12 tháng)</option>
                          <option value="Hợp đồng lao động xác định thời hạn (24 tháng)">Hợp đồng lao động xác định thời hạn (24 tháng)</option>
                          <option value="Hợp đồng lao động không xác định thời hạn">Hợp đồng lao động không xác định thời hạn</option>
                          <option value="Hợp đồng khoán việc / Theo dự án">Hợp đồng khoán việc / Theo dự án</option>
                          <option value="Hợp đồng giao khoán">Hợp đồng giao khoán</option>
                          <option value="Hợp đồng môi giới">Hợp đồng môi giới</option>
                          <option value="Hợp đồng thuê ngoài">Hợp đồng thuê ngoài</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Mã hợp đồng <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          value={laborContractCode}
                          onChange={(e) => setLaborContractCode(e.target.value)}
                          placeholder="VD: HDTV_2T"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Tình trạng làm việc
                        </label>
                        <select
                          value={workStatus}
                          onChange={(e) => {
                            setWorkStatus(e.target.value);
                            if (e.target.value === 'Đang làm việc') {
                              setIsStillWorking(true);
                            } else if (e.target.value === 'Đã nghỉ việc') {
                              setIsStillWorking(false);
                            }
                          }}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Đang làm việc">Đang làm việc</option>
                          <option value="Tạm hoãn hợp đồng">Tạm hoãn hợp đồng</option>
                          <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày ký hợp đồng
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={contractSignDate}
                            onChange={(e) => setContractSignDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày hết hạn hợp đồng
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={contractExpiryDate}
                            onChange={(e) => setContractExpiryDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày nghỉ việc
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            disabled={isStillWorking}
                            value={isStillWorking ? '' : resignationDate}
                            onChange={(e) => setResignationDate(e.target.value)}
                            placeholder={isStillWorking ? 'Đang làm việc' : 'DD/MM/YYYY'}
                            className={`w-full border rounded px-3 py-2 text-sm outline-none ${isStillWorking ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-blue-500 text-gray-800'}`}
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Lý do nghỉ việc
                        </label>
                        <input 
                          type="text"
                          disabled={isStillWorking}
                          value={isStillWorking ? '' : resignationReason}
                          onChange={(e) => setResignationReason(e.target.value)}
                          placeholder={isStillWorking ? 'Nhân sự đang làm việc tại đơn vị' : 'Nhập lý do nghỉ việc...'}
                          className={`w-full border rounded px-3 py-2 text-sm outline-none ${isStillWorking ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'border-gray-300 focus:border-blue-500 text-gray-800'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bên phải: Thông tin công việc */}
                  <div className="flex-1 bg-white p-6 rounded-md shadow-sm border border-gray-200 w-full">
                    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <h3 className="text-blue-600 font-semibold text-[15px]">Thông tin công việc</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày đi làm chính thức
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={officialWorkDate}
                            onChange={(e) => setOfficialWorkDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center h-[38px] mt-auto pb-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={isStillWorking}
                            onChange={(e) => {
                              setIsStillWorking(e.target.checked);
                              if (e.target.checked) {
                                setWorkStatus('Đang làm việc');
                                setResignationDate('');
                              } else {
                                setWorkStatus('Đã nghỉ việc');
                              }
                            }}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                          />
                          <span className="text-sm font-medium text-gray-700">Còn làm việc</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày thử việc: Từ ngày
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={probationStartDate}
                            onChange={(e) => setProbationStartDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Đến ngày
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={probationEndDate}
                            onChange={(e) => setProbationEndDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Vị trí công việc <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={laborPosition}
                          onChange={(e) => setLaborPosition(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Quản lý xưởng">Quản lý xưởng</option>
                          <option value="Cố Vấn Garage">Cố Vấn Garage</option>
                          <option value="Kỹ thuật viên gầm - máy">Kỹ thuật viên gầm - máy</option>
                          <option value="Thợ đồng sơn">Thợ đồng sơn</option>
                          <option value="Kỹ thuật viên điện lạnh">Kỹ thuật viên điện lạnh</option>
                          <option value="Kỹ thuật viên bảo dưỡng nhanh">Kỹ thuật viên bảo dưỡng nhanh</option>
                          <option value="Thợ hàn công nghệ cao">Thợ hàn công nghệ cao</option>
                          <option value="Thủ kho vật tư xưởng">Thủ kho vật tư xưởng</option>
                          <option value="Kế toán xưởng">Kế toán xưởng</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Bộ phận <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={laborDepartment}
                          onChange={(e) => setLaborDepartment(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Phòng Tư vấn, Dịch vụ">Phòng Tư vấn, Dịch vụ</option>
                          <option value="Xưởng Dịch vụ & Sửa chữa">Xưởng Dịch vụ & Sửa chữa</option>
                          <option value="Phòng Kỹ Thuật">Phòng Kỹ Thuật</option>
                          <option value="Kho & Phụ tùng">Kho & Phụ tùng</option>
                          <option value="Phòng Kế toán">Phòng Kế toán</option>
                          <option value="Ban Giám Đốc">Ban Giám Đốc</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Quản lý trực tiếp
                        </label>
                        <input 
                          type="text"
                          value={directManager}
                          onChange={(e) => setDirectManager(e.target.value)}
                          placeholder="Họ tên quản lý"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Email công ty
                        </label>
                        <input 
                          type="email"
                          value={companyEmail}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                          placeholder="email@company.vn"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : contractTargetType === 'Cộng tác viên' ? (
                <>
                  {/* Card cho Cộng tác viên */}
                  <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 w-full">
                    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <h3 className="text-purple-600 font-semibold text-[15px]">1. Thiết lập Hợp đồng Cộng tác viên</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Số / Mã Hợp đồng CTV <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          value={contractCode || 'HĐCTV-2026/01'}
                          onChange={(e) => setContractCode(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Lĩnh vực / Chuyên môn hỗ trợ
                        </label>
                        <input 
                          type="text"
                          placeholder="VD: Cố vấn kỹ thuật sơn, điện tử ô tô..."
                          defaultValue="Tư vấn dịch vụ & hỗ trợ kỹ thuật"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Hình thức thù lao / Hoa hồng
                        </label>
                        <select
                          defaultValue="Theo ca / công việc phát sinh"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Theo ca / công việc phát sinh">Theo ca / công việc phát sinh</option>
                          <option value="Khoán định kỳ hàng tháng">Khoán định kỳ hàng tháng</option>
                          <option value="Hoa hồng theo % doanh số dịch vụ">Hoa hồng theo % doanh số dịch vụ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày bắt đầu cộng tác
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            defaultValue="01/02/2026"
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày kết thúc thỏa thuận
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            defaultValue="31/12/2026"
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Mức thù lao thỏa thuận (VND)
                        </label>
                        <input 
                          type="text"
                          defaultValue="8,000,000"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : contractTargetType === 'Môi giới' ? (
                <>
                  {/* Card cho Môi giới */}
                  <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 w-full">
                    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-emerald-600 font-semibold text-[15px]">1. Thiết lập Hợp đồng Môi giới</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Số / Mã Hợp đồng Môi giới <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          value={contractCode || 'HĐMG-2026/01'}
                          onChange={(e) => setContractCode(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Phạm vi / Lĩnh vực môi giới
                        </label>
                        <select
                          defaultValue="Giới thiệu khách hàng dịch vụ sửa chữa, phụ tùng"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Giới thiệu khách hàng dịch vụ sửa chữa, phụ tùng">Giới thiệu khách hàng dịch vụ sửa chữa, phụ tùng</option>
                          <option value="Môi giới mua bán xe và phụ kiện garage">Môi giới mua bán xe và phụ kiện garage</option>
                          <option value="Kết nối garage đối tác và nhà cung cấp">Kết nối garage đối tác và nhà cung cấp</option>
                          <option value="Môi giới hợp đồng dịch vụ fleet / doanh nghiệp">Môi giới hợp đồng dịch vụ fleet / doanh nghiệp</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Hình thức hoa hồng môi giới
                        </label>
                        <select
                          defaultValue="Tỷ lệ % trên giá trị hợp đồng / đơn hàng"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Tỷ lệ % trên giá trị hợp đồng / đơn hàng">Tỷ lệ % trên giá trị hợp đồng / đơn hàng</option>
                          <option value="Mức phí cố định trên mỗi lượt giới thiệu thành công">Mức phí cố định trên mỗi lượt giới thiệu thành công</option>
                          <option value="Hoa hồng định kỳ theo doanh thu phát sinh">Hoa hồng định kỳ theo doanh thu phát sinh</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày bắt đầu thỏa thuận
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            defaultValue="01/02/2026"
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày kết thúc thỏa thuận
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            defaultValue="31/12/2026"
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Tỷ lệ / Mức phí hoa hồng thỏa thuận
                        </label>
                        <input 
                          type="text"
                          defaultValue="5% - 10% doanh số dịch vụ"
                          placeholder="VD: 5% hoặc 1.000.000 đ/xe"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium text-gray-800"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Kỳ đối soát & Điều khoản thanh toán
                        </label>
                        <input 
                          type="text"
                          defaultValue="Đối soát vào ngày 25 hàng tháng, thanh toán chuyển khoản trước ngày 05 tháng kế tiếp."
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Trạng thái thỏa thuận
                        </label>
                        <select
                          defaultValue="Đang hợp tác"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Đang hợp tác">Đang hợp tác</option>
                          <option value="Tạm dừng">Tạm dừng</option>
                          <option value="Đã chấm dứt">Đã chấm dứt</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Card cho Nhân sự B2B */}
                  <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 w-full">
                    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-indigo-600 font-semibold text-[15px]">1. Thiết lập Hợp đồng Dịch vụ Nhân sự B2B</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Số / Mã Hợp đồng B2B <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          value={contractCode || 'HĐB2B-2026/01'}
                          onChange={(e) => setContractCode(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Đơn vị / Công ty cung ứng đối tác
                        </label>
                        <input 
                          type="text"
                          defaultValue="Công ty Cổ phần Dịch vụ Kỹ thuật Ô tô Việt"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Gói dịch vụ / SLA cam kết
                        </label>
                        <select
                          defaultValue="Cung ứng kỹ thuật viên chuyên sâu theo dự án"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white text-gray-800"
                        >
                          <option value="Cung ứng kỹ thuật viên chuyên sâu theo dự án">Cung ứng kỹ thuật viên chuyên sâu theo dự án</option>
                          <option value="Bảo trì hệ thống xưởng định kỳ">Bảo trì hệ thống xưởng định kỳ</option>
                          <option value="Cố vấn chẩn đoán & nghiệm thu xe">Cố vấn chẩn đoán & nghiệm thu xe</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày bắt đầu hiệu lực
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            defaultValue="01/01/2026"
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Ngày kết thúc hợp đồng
                        </label>
                        <div className="relative">
                          <input 
                            type="text"
                            defaultValue="31/12/2026"
                            placeholder="DD/MM/YYYY"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium text-xs mb-1.5">
                          Giá trị hợp đồng khung (VND/tháng)
                        </label>
                        <input 
                          type="text"
                          defaultValue="25,000,000"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-4 border-t border-gray-200 bg-white shrink-0">
          <button onClick={onClose} className="px-5 py-2 bg-white border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition-colors text-[14px]">
            Đóng
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={cccdError.isError}
            className={`px-5 py-2 text-white rounded font-medium transition-colors text-[14px] ${cccdError.isError ? 'bg-blue-300 cursor-not-allowed' : 'bg-[#2563EB] hover:bg-blue-700'}`}
          >
            Ghi nhận
          </button>
        </div>
    </div>
  );
};
