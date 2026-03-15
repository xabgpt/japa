import { useResultsStore } from '../store/resultsStore';

export function useScore() {
  const { scoreData, aiAnalysis, loading, error } = useResultsStore();
  return { scoreData, aiAnalysis, loading, error };
}
