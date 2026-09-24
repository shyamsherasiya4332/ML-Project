import { useState, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function PredictionForm({ onPredict, loading, initialData }) {
  const [formData, setFormData] = useState({
    prev_close: '',
    open_price: '',
    low_price: '',
    close_price: '',
    vwap: '',
    volume: '',
    turnover: '',
    deliverable_volume: '',
    percent_deliverable: '',
    model_type: 'linear'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({...prev, ...initialData}));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'model_type' ? value : (value === '' ? '' : Number(value))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  const formFields = [
    { name: 'prev_close', label: 'Previous Close' },
    { name: 'open_price', label: 'Open Price' },
    { name: 'low_price', label: 'Low Price' },
    { name: 'close_price', label: 'Close Price' },
    { name: 'vwap', label: 'VWAP' },
    { name: 'volume', label: 'Volume' },
    { name: 'turnover', label: 'Turnover' },
    { name: 'deliverable_volume', label: 'Deliverable Volume' },
    { name: 'percent_deliverable', label: '% Deliverable' },
  ];

  return (
    <div className="card p-6 reveal-1">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
        <Sparkles className="w-5 h-5 text-indigo-500 mr-2 animate-pulse" />
        Configure Prediction Features
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map(field => (
            <div key={field.name}>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">{field.label}</label>
              <input
                type="number"
                step="any"
                required
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200/60 text-slate-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm placeholder:text-slate-500/50"
                placeholder={`0.00`}
              />
            </div>
          ))}
          
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Model</label>
            <div className="relative">
              <select 
                name="model_type"
                value={formData.model_type}
                onChange={handleChange}
                className="w-full appearance-none bg-white border border-slate-200/60 text-slate-900 rounded-xl pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all cursor-pointer shadow-sm"
              >
                <option value="linear">Linear Regression</option>
                <option value="polynomial">Polynomial Regression</option>
                <option value="svr">Support Vector Regression (SVR)</option>
                <option value="all">Compare All Models</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 btn-primary flex justify-center items-center h-11 relative overflow-hidden group"
        >
          {loading ? (
            <span className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Predicting...
            </span>
          ) : (
            <span className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Predict High Price
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 -translate-x-full"></div>
        </button>
      </form>
    </div>
  );
}
