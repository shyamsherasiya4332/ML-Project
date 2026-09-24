import { useState, useEffect } from 'react';
import { predictStock, getRandomSample } from '../services/api';
import PredictionForm from '../components/Prediction/PredictionForm';
import PredictionCard from '../components/Prediction/PredictionCard';

export default function Prediction() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  
  const [sampleLoading, setSampleLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const handlePredict = async (features) => {
    setIsPredicting(true);
    try {
      const result = await predictStock(features);
      setPredictionResult(result);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleLoadSample = async () => {
    setSampleLoading(true);
    try {
      const sample = await getRandomSample();
      setInitialData(sample.sample);
    } catch (error) {
      console.error("Failed to load sample:", error);
    } finally {
      setSampleLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Stock High Price Prediction</h1>
          <p className="text-slate-500 text-sm mt-1">Predict the next High price using ML models</p>
        </div>
        <button 
          onClick={handleLoadSample}
          disabled={sampleLoading}
          className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-xl text-slate-900 font-medium hover:bg-slate-100 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          {sampleLoading ? "Loading..." : "Load Random Sample"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <PredictionForm 
            onPredict={handlePredict} 
            loading={isPredicting}
            initialData={initialData}
          />
        </div>
        <div>
          <PredictionCard result={predictionResult} />
        </div>
      </div>
    </div>
  );
}
