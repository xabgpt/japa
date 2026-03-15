import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { useResultsStore } from '../store/resultsStore';
import { calculateScore } from '../lib/scoring';
import { generateJapaAnalysis } from '../lib/anthropic';

export function useQuiz() {
  const navigate = useNavigate();
  const { currentStep, answers, setCurrentStep, setAnswer, setAnswers, isStepComplete, clearProgress } = useQuizStore();
  const { setScoreData, setAiAnalysis, setLoading, setError } = useResultsStore();

  const totalSteps = 7;

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, setCurrentStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const submitQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const localScore = calculateScore(answers);
      setScoreData(localScore);

      // Navigate to results immediately with local score
      navigate('/results');

      // Then fetch AI analysis in background
      try {
        const analysis = await generateJapaAnalysis(answers, localScore);
        setAiAnalysis(analysis);
      } catch (err) {
        console.error('AI analysis failed:', err);
        setError('AI analysis unavailable. Showing local score.');
      }
    } catch (err) {
      setError('Failed to calculate score. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [answers, navigate, setScoreData, setAiAnalysis, setLoading, setError]);

  return {
    currentStep,
    answers,
    totalSteps,
    setAnswer,
    setAnswers,
    goNext,
    goBack,
    submitQuiz,
    isStepComplete,
    clearProgress,
    canContinue: isStepComplete(currentStep),
    isLastStep: currentStep === totalSteps - 1,
  };
}
