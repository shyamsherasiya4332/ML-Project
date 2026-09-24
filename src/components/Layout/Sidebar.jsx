import { NavLink } from 'react-router-dom';
import { Home, LineChart, Cpu, BarChart2, Database } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/', name: 'Dashboard', icon: Home },
  { path: '/prediction', name: 'AI Prediction', icon: Cpu },
  { path: '/model-performance', name: 'Model Performance', icon: BarChart2 },
  { path: '/data-analysis', name: 'Data Analysis', icon: Database },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={clsx(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/20 backdrop-blur-md border-r border-slate-200/60 transform transition-transform duration-300 ease-in-out flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-20 flex items-center px-6 border-b border-slate-200/60">
          <Cpu className="w-8 h-8 text-slate-900 mr-3" />
          <span className="text-lg font-bold tracking-tight text-slate-900">ML Predictor</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div className="px-6 mb-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">NIFTY50 Analysis</p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => clsx(
                  "flex items-center px-6 py-3 text-sm font-semibold transition-colors duration-200 group border-l-2",
                  isActive 
                    ? "bg-slate-100 text-slate-900 border-black shadow-[inset_4px_0_0_0_black]" 
                    : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 border-transparent"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={clsx(
                      "w-5 h-5 mr-3 transition-colors duration-200",
                      isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-900"
                    )} />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
