import React, { useState } from 'react';
import { COLORS } from './constants';
import { Header } from './components/Header';
import { ProductTypeSelector } from './components/ProductTypeSelector';
import { MainForm } from './components/MainForm';
import { TabsSection } from './components/TabsSection';
import { ActionFooter } from './components/ActionFooter';
import { ProductType } from './types';
import { Layout } from './components/Layout';
import { CategoryList } from './components/CategoryList';
import { OmnichannelConfig } from './components/OmnichannelConfig';
import { MarketplaceManagement } from './components/MarketplaceManagement';
import { OnlineOrdering } from './components/OnlineOrdering';
import { SupplierHomepage } from './components/SupplierHomepage';
import { CommercialSales } from './components/CommercialSales';
import { PurchaseOrders } from './components/PurchaseOrders';
import { RepairService } from './components/RepairService';
import { EventsModule } from './components/EventsModule';
import { RegistrationApprovalModule } from './components/RegistrationApprovalModule';
import { EmployeeList } from './components/EmployeeList';
import { DepartmentList } from './components/DepartmentList';
import { PositionList } from './components/PositionList';
import { SalaryGradeList } from './components/SalaryGradeList';
import { ContractTypeList } from './components/ContractTypeList';
import { SalaryRuleGroupList } from './components/SalaryRuleGroupList';
import { SalaryStructureList } from './components/SalaryStructureList';
import { OrderProvider } from './context/OrderContext';

const App: React.FC = () => {
  const [productType, setProductType] = useState<ProductType>(ProductType.SPARE_PART);
  const [currentView, setCurrentView] = useState<'categories' | 'spare_parts' | 'omnichannel' | 'online_ordering' | 'commercial_sales' | 'purchase_orders' | 'supplier_homepage' | 'marketplace' | 'repair_service' | 'events' | 'registration_approval' | 'employee_list' | 'department_list' | 'position_list' | 'salary_grade_list' | 'contract_type_list' | 'salary_rule_group' | 'salary_structure'>('employee_list');
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);

  return (
    <OrderProvider>
      <Layout currentView={currentView} onNavigate={(view) => setCurrentView(view as any)}>
        {currentView === 'categories' ? (
          <CategoryList 
            onSelectSpareParts={() => setCurrentView('spare_parts')} 
            onSelectOmnichannel={() => setCurrentView('omnichannel')}
          />
        ) : currentView === 'omnichannel' ? (
          <OmnichannelConfig onBack={() => setCurrentView('categories')} />
        ) : currentView === 'online_ordering' ? (
          <OnlineOrdering onNavigateToSupplier={(id) => {
            setSelectedSupplierId(id);
            setCurrentView('supplier_homepage');
          }} />
        ) : currentView === 'supplier_homepage' && selectedSupplierId ? (
          <SupplierHomepage supplierId={selectedSupplierId} onBack={() => setCurrentView('online_ordering')} />
        ) : currentView === 'commercial_sales' ? (
          <CommercialSales />
        ) : currentView === 'purchase_orders' ? (
          <PurchaseOrders />
        ) : currentView === 'marketplace' ? (
          <MarketplaceManagement />
        ) : currentView === 'repair_service' ? (
          <RepairService />
        ) : currentView === 'employee_list' ? (
          <EmployeeList />
        ) : currentView === 'department_list' ? (
          <DepartmentList />
        ) : currentView === 'position_list' ? (
          <PositionList />
        ) : currentView === 'salary_grade_list' ? (
          <SalaryGradeList />
        ) : currentView === 'contract_type_list' ? (
          <ContractTypeList />
        ) : currentView === 'salary_rule_group' ? (
          <SalaryRuleGroupList />
        ) : currentView === 'salary_structure' ? (
          <SalaryStructureList />
        ) : currentView === 'events' ? (
          <EventsModule />
        ) : currentView === 'registration_approval' ? (
          <RegistrationApprovalModule />
        ) : (
          <div className="min-h-full font-sans bg-[#F2FBF5] text-gray-800 flex flex-col">
            <Header />
            
            <main className="flex-1 max-w-[1440px] w-full mx-auto px-8 py-8 animate-fadeIn">
              {/* Product Type Selection */}
              <ProductTypeSelector selected={productType} onChange={setProductType} />

              {/* Main Form Area */}
              <MainForm productType={productType} />

              {/* Detailed Tabs Area */}
              <TabsSection productType={productType} />
            </main>

            <ActionFooter onBack={() => setCurrentView('categories')} />
            
            {/* Global CSS for custom animations if needed */}
            <style>{`
              @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
              }
              .animate-fadeIn {
                  animation: fadeIn 0.4s ease-out forwards;
              }
            `}</style>
          </div>
        )}
      </Layout>
    </OrderProvider>
  );
};

export default App;