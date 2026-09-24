import clsx from 'clsx';
import { TrendingUp, TrendingDown, Target, Zap, Activity } from 'lucide-react';

export default function PredictionCard({ result }) {
  if (!result || !result.success) {
    return (
      <div className="card h-full flex flex-col items-center justify-center p-8 text-center min-h-[350px] border-dashed border-2 border-slate-200/60 bg-white/50 reveal-2">
        <Target className="w-12 h-12 text-slate-400 mb-4 opacity-50 animate-float" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No Prediction Generated</h3>
        <p className="text-slate-500 max-w-sm">
          Enter features and select a model to predict the Next High Price.
        </p>
      </div>
    );
  }

  const { predicted_high, model_name_display, metrics, active_model, all_models, inputs } = result;
  
  // We'll use diff_from_close to determine if positive or negative trend compared to close
  const isPositive = metrics.diff_from_close >= 0;

  return (
    <div className={clsx(
      "card h-full p-6 sm:p-8 relative overflow-hidden min-h-[350px] flex flex-col justify-between transition-colors duration-200 reveal-2 bg-white/80",
    )}>

      <div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <span className={clsx(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4",
              isPositive ? "bg-financial-green/20 text-financial-green" : "bg-financial-red/20 text-financial-red"
            )}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {isPositive ? "HIGHER THAN CLOSE" : "LOWER THAN CLOSE"}
            </span>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">₹{predicted_high?.toFixed(2)}</h2>
            <p className="text-slate-500 mt-1">Predicted High Price</p>
          </div>
          
          <div className="text-right">
            <h3 className="text-xl font-semibold text-slate-900">₹{inputs?.close_price?.toFixed(2)}</h3>
            <p className="text-slate-500 mt-1 text-sm">Last Close Price</p>
            <div className="mt-2 inline-flex items-center text-xs font-medium bg-white px-2 py-1 rounded border border-slate-200/60">
              <Activity className="w-3 h-3 mr-1 text-slate-900" />
              {model_name_display}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
          <div className="bg-white/50 p-4 rounded-xl border border-slate-200/60 backdrop-blur-sm">
            <p className="text-xs text-slate-500 mb-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> Diff From Close
            </p>
            <p className={clsx(
              "text-lg font-bold",
              isPositive ? "text-financial-green" : "text-financial-red"
            )}>
              {isPositive ? '+' : ''}₹{metrics?.diff_from_close?.toFixed(2)}
            </p>
          </div>
          
          <div className="bg-white/50 p-4 rounded-xl border border-slate-200/60 backdrop-blur-sm">
            <p className="text-xs text-slate-500 mb-1 flex items-center">
              <Zap className="w-3 h-3 mr-1" /> % From Close
            </p>
            <p className={clsx(
              "text-lg font-bold",
              isPositive ? "text-financial-green" : "text-financial-red"
            )}>
              {isPositive ? '+' : ''}{metrics?.pct_from_close?.toFixed(2)}%
            </p>
          </div>
        </div>
        
        {active_model === 'all' && all_models && (
          <div className="mt-4 bg-white/50 p-3 rounded-xl border border-slate-200/60 text-sm">
            <p className="text-slate-500 mb-2 font-medium">All Models Comparison:</p>
            <div className="flex justify-between text-xs">
              <span className="text-slate-900">Linear: ₹{all_models.linear?.toFixed(2)}</span>
              <span className="text-slate-900">Poly: ₹{all_models.polynomial?.toFixed(2)}</span>
              <span className="text-slate-900">SVR: ₹{all_models.svr?.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-end items-center text-xs text-slate-500 relative z-10">
        <div>
          Based on model output. Not financial advice.
        </div>
      </div>
    </div>
  );
}
