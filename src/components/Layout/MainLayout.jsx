import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import StockBackground from './StockBackground';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-transparent overflow-hidden text-slate-900 relative">
      <StockBackground />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto min-h-[calc(100vh-10rem)]">
            <Outlet />
          </div>
          <footer className="max-w-7xl mx-auto mt-12 py-6 border-t border-slate-200/60/50 text-center">
            <p className="text-sm font-medium text-slate-500 mb-1">
              AI Stock Prediction — Machine Learning Project
            </p>
            <p className="text-xs text-slate-500/70">
              Predictions are based on historical data and model output. They are not financial advice.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
