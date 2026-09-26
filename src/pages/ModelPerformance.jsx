import { useState, useEffect } from 'react';
import { getModelPerformance, getModelWeights } from '../services/api';
import Loading from '../components/Common/Loading';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ModelPerformance() {
  const [metrics, setMetrics] = useState(null);
  const [weights, setWeights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, weightsData] = await Promise.all([
          getModelPerformance(),
          getModelWeights()
        ]);
        setMetrics(metricsData);
        
        // Sort weights by absolute magnitude for better charting
        const sortedWeights = [...weightsData.weights].sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
        setWeights(sortedWeights);
        
      } catch (error) {
        console.error("Failed to load model metrics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !metrics || !weights) return <Loading />;

  // Prepare data for charting accuracy
  const chartData = Object.keys(metrics).map(key => ({
    name: metrics[key].model_name.split(' ')[0], // short name
    r2: (metrics[key].r2_score * 100).toFixed(2),
    accuracy: metrics[key].accuracy_pct
  }));

  return (
    <div className="space-y-6">
      <div className="reveal-1">
        <h1 className="text-2xl font-bold text-slate-900">Model Performance</h1>
        <p className="text-slate-500 text-sm mt-1">Evaluate the Machine Learning models used for prediction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-2">
        {Object.keys(metrics).map(key => {
          const model = metrics[key];
          const isPolynomial = key === 'polynomial' || model.model_name.toLowerCase().includes('poly');
          return (
            <div key={key} className={`card p-6 ${isPolynomial ? 'ring-2 ring-indigo-500 bg-indigo-50/40 scale-[1.02] shadow-lg' : ''}`}>
              <div className="flex justify-between items-start mb-6 gap-2">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {model.model_name}
                </h3>
                {isPolynomial && (
                  <span className="shrink-0 px-2.5 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-sm animate-pulse flex items-center">
                    ★ Final Model
                  </span>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                  <span className="text-slate-500 text-sm">Accuracy</span>
                  <span className="text-lg font-bold text-financial-green">{model.accuracy_pct}%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                  <span className="text-slate-500 text-sm">R² Score</span>
                  <span className="text-lg font-bold text-slate-900">{model.r2_score.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                  <span className="text-slate-500 text-sm">RMSE</span>
                  <span className="text-lg font-bold text-slate-900">{model.rmse.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                  <span className="text-slate-500 text-sm">MAE</span>
                  <span className="text-lg font-bold text-slate-900">{model.mae.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 reveal-3">
        <div className="card p-6 h-[300px] md:h-[400px]">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Model Accuracy Comparison</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[0, 100]} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a' }} />
              <Bar dataKey="accuracy" name="Accuracy %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6 h-[300px] md:h-[400px]">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Feature Weights (Linear Regression)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weights} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" horizontal={false} />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="feature" type="category" stroke="#64748b" width={90} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a' }} />
              <Bar dataKey="weight" name="Model Weight" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
