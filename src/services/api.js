const API_BASE_URL = 'https://stock-price-prediction-4v92.onrender.com/api';

export const getStocks = async () => {
  // Since the backend doesn't have a stocks list, we return an empty array or basic mock if needed.
  // Actually, we can just remove this if we rewrite DataAnalysis to not use it.
  return [];
};

export const predictStock = async (features) => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(features)
  });
  
  if (!response.ok) {
    throw new Error('Prediction failed');
  }
  
  return await response.json();
};

export const getModelPerformance = async () => {
  const response = await fetch(`${API_BASE_URL}/model-metrics`);
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  const data = await response.json();
  return data.metrics;
};

export const getDataStatistics = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return await response.json();
};

export const getModelWeights = async () => {
  const response = await fetch(`${API_BASE_URL}/model-weights`);
  if (!response.ok) {
    throw new Error('Failed to fetch weights');
  }
  return await response.json();
};

export const getRandomSample = async () => {
  const response = await fetch(`${API_BASE_URL}/sample`);
  if (!response.ok) {
    throw new Error('Failed to fetch sample');
  }
  return await response.json();
};
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      return await response.json();
    }
    return { status: 'error' };
  } catch (error) {
    return { status: 'error', error };
  }
};
