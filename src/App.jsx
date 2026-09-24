import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Loading from './components/Common/Loading';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Prediction = lazy(() => import('./pages/Prediction'));
const ModelPerformance = lazy(() => import('./pages/ModelPerformance'));
const DataAnalysis = lazy(() => import('./pages/DataAnalysis'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="prediction" element={<Prediction />} />
            <Route path="model-performance" element={<ModelPerformance />} />
            <Route path="data-analysis" element={<DataAnalysis />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
