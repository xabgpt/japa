import { create } from 'zustand';

export const useResultsStore = create((set) => ({
  scoreData: null,
  aiAnalysis: null,
  loading: false,
  error: null,

  setScoreData: (data) => set({ scoreData: data }),
  setAiAnalysis: (analysis) => set({ aiAnalysis: analysis }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clear: () => set({ scoreData: null, aiAnalysis: null, loading: false, error: null }),
}));
