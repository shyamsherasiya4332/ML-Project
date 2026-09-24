import { useState, useEffect } from 'react';
import { getDataStatistics } from '../services/api';
import Loading from '../components/Common/Loading';
import { Database, FileDigit, BarChart } from 'lucide-react';

export default function DataAnalysis() {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const data = await getDataStatistics();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to load analysis data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysisData();
  }, []);

  if (loading || !statsData) return <Loading />;

  const { total_rows, stats } = statsData;

  return (
    <div className="space-y-6">
      <div className="reveal-1">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <Database className="w-6 h-6 mr-3 text-indigo-500 animate-float" />
          Dataset Analysis
        </h1>
        <p className="text-slate-500 text-sm mt-1">Exploratory Data Analysis (EDA) of the Stock High Price Prediction dataset</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-2">
        <div className="card p-5 flex items-center">
          <FileDigit className="w-10 h-10 text-slate-900 mr-4 opacity-80" />
          <div>
            <h4 className="text-sm font-medium text-slate-500 mb-1">Total Records</h4>
            <p className="text-2xl font-bold text-slate-900">{total_rows.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden mt-6">
        <div className="p-5 border-b border-slate-200/60 flex items-center">
          <BarChart className="w-5 h-5 text-slate-900 mr-2" />
          <h3 className="text-lg font-bold text-slate-900">Feature Statistics</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200/60">
              <tr>
                <th className="px-6 py-4 font-medium">Feature</th>
                <th className="px-6 py-4 font-medium text-right">Mean</th>
                <th className="px-6 py-4 font-medium text-right">Min</th>
                <th className="px-6 py-4 font-medium text-right">Max</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats).map(([feature, metrics], idx) => (
                <tr key={feature} className="border-b border-slate-200/60 hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{feature}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{metrics.mean?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{metrics.min?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{metrics.max?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
