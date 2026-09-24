import { useState, useEffect } from 'react';
import { Menu, Database, Server, Wifi, WifiOff } from 'lucide-react';
import { checkApiHealth } from '../../services/api';
import clsx from 'clsx';

export default function Header({ setIsSidebarOpen }) {
  const [isOnline, setIsOnline] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      setIsChecking(true);
      const res = await checkApiHealth();
      setIsOnline(res.status === 'ok' || res.status === 'online' || res.status === 'healthy');
      setIsChecking(false);
    };
    checkStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 bg-slate-100/20 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 z-30 sticky top-0">
      <div className="flex items-center">
        <button 
          className="lg:hidden p-2 -ml-2 mr-4 text-slate-500 hover:text-slate-900 transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="hidden sm:flex items-center text-lg font-bold text-slate-900 ml-2 tracking-wide">
          <Server className="w-5 h-5 mr-2 text-slate-900" />
          NIFTY50 Predictor
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className={clsx(
          "flex items-center px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-500",
          isChecking 
            ? "bg-white border-slate-200/60 text-slate-500"
            : isOnline 
              ? "bg-green-100 border-green-300 text-green-700 shadow-[0_0_15px_rgba(74,222,128,0.3)]"
              : "bg-red-100 border-red-300 text-red-700 shadow-[0_0_15px_rgba(248,113,113,0.3)]"
        )}>
          {isChecking ? (
            <Database className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
          ) : isOnline ? (
            <Wifi className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
          ) : (
            <WifiOff className="w-3.5 h-3.5 mr-1.5" />
          )}
          <span>{isChecking ? 'CHECKING API...' : isOnline ? 'API ONLINE' : 'API OFFLINE'}</span>
        </div>
      </div>
    </header>
  );
}
