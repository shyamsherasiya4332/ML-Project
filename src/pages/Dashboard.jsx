import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Database, Cpu, ActivitySquare, BarChart2 } from 'lucide-react';
import { getDataStatistics } from '../services/api';
import Loading from '../components/Common/Loading';

export default function Dashboard() {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDataStatistics();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !statsData) return <Loading />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero section */}
      <div className="py-12 md:py-20 flex flex-col items-center justify-center text-center border-b border-slate-200/60 mb-8 reveal-1">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200/60 bg-white/60 text-xs font-medium text-slate-500 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-slate-900 mr-2 animate-pulse"></span>
          Powered by NIFTY50 Machine Learning API
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Stock Price <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Prediction Engine
          </span>
        </h1>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Harness the power of Linear Regression, Polynomial models, and SVR to analyze historical features and accurately predict stock high prices.
        </p>
        <div className="flex space-x-4">
          <Link to="/prediction" className="btn-primary px-8 py-3 rounded-xl font-semibold">
            Start Predicting
          </Link>
          <Link to="/model-performance" className="bg-white/60 border border-slate-200/60 text-slate-900 px-8 py-3 rounded-xl font-semibold hover:bg-white transition-colors shadow-sm">
            View Metrics
          </Link>
        </div>
      </div>

      {/* Dataset Overview */}
      <div className="reveal-2">
        <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          <Database className="w-5 h-5 mr-2 text-slate-900 animate-float" />
          Dataset Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5">
            <h4 className="text-sm font-medium text-slate-500 mb-2">Total Training Records</h4>
            <p className="text-2xl font-bold text-slate-900">{statsData.total_rows?.toLocaleString()}</p>
          </div>
          <div className="card p-5">
            <h4 className="text-sm font-medium text-slate-500 mb-2">Features Used</h4>
            <p className="text-2xl font-bold text-slate-900">{Object.keys(statsData.stats || {}).length - 1}</p>
          </div>
          <div className="card p-5">
            <h4 className="text-sm font-medium text-slate-500 mb-2">Models Available</h4>
            <p className="text-2xl font-bold text-slate-900">3 (Linear, Poly, SVR)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 reveal-3">
        <div className="card p-6 flex flex-col justify-center items-center text-center">
          <BarChart2 className="w-16 h-16 text-slate-900 opacity-80 mb-4 animate-float" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Comprehensive Analysis</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            Explore feature statistics, view dataset quality, and compare model metrics across the provided stock data.
          </p>
          <Link to="/data-analysis" className="btn-primary w-full max-w-xs text-center py-2 rounded-lg">View Data Analysis</Link>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center border-b border-slate-200/60 pb-4">
            <Cpu className="w-5 h-5 mr-2 text-slate-900 animate-pulse" />
            Machine Learning Pipeline
          </h3>
          
          <div className="space-y-6 relative before:absolute before:top-0 before:bottom-0 before:left-[11px] before:w-[2px] before:bg-slate-200">
            
            <div className="relative flex items-start group/step">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-900 shrink-0 mt-0.5 z-10 shadow-sm ring-4 ring-white"></div>
              <div className="ml-4 w-full p-4 bg-white border border-slate-200/60 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm">Data Loading & Preprocessing</h4>
                <p className="text-xs text-slate-500 mt-1">Load historical stock data, handle missing values.</p>
              </div>
            </div>
            
            <div className="relative flex items-start group/step">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-300 bg-white shrink-0 mt-0.5 z-10 shadow-sm ring-4 ring-white"></div>
              <div className="ml-4 w-full p-4 bg-white border border-slate-200/60 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm">Feature Engineering</h4>
                <p className="text-xs text-slate-500 mt-1">Scale features, log-transform skewed data (Turnover, Volume).</p>
              </div>
            </div>

            <div className="relative flex items-start group/step">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-300 bg-white shrink-0 mt-0.5 z-10 shadow-sm ring-4 ring-white"></div>
              <div className="ml-4 w-full p-4 bg-white border border-slate-200/60 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm">Model Training</h4>
                <p className="text-xs text-slate-500 mt-1">Train Linear Regression, Polynomial (deg 2), and SVR models.</p>
              </div>
            </div>

            <div className="relative flex items-start group/step">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-300 bg-white shrink-0 mt-0.5 z-10 shadow-sm ring-4 ring-white"></div>
              <div className="ml-4 w-full p-4 bg-white border border-slate-200/60 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm">Prediction API</h4>
                <p className="text-xs text-slate-500 mt-1">Serve predictions via FastAPI backend with model comparison.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
