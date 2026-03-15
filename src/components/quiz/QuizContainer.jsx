import { useState, useCallback } from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import QuizProgress, { QuizSidebar } from './QuizProgress';
import QuizStep from './QuizStep';
import PersonalInfo from './steps/PersonalInfo';
import Education from './steps/Education';
import WorkExperience from './steps/WorkExperience';
import LanguageSkills from './steps/LanguageSkills';
import Finances from './steps/Finances';
import Documents from './steps/Documents';
import TargetCountry from './steps/TargetCountry';
import Button from '../ui/Button';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const stepComponents = [
  PersonalInfo,
  Education,
  WorkExperience,
  LanguageSkills,
  Finances,
  Documents,
  TargetCountry,
];

export default function QuizContainer() {
  const {
    currentStep, answers, totalSteps,
    setAnswer, goNext, goBack, submitQuiz,
    canContinue, isLastStep, isStepComplete,
  } = useQuiz();

  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    setDirection(1);
    if (isLastStep) {
      submitQuiz();
    } else {
      goNext();
    }
  }, [isLastStep, submitQuiz, goNext]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    goBack();
  }, [goBack]);

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="min-h-screen bg-[var(--primary)] pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <QuizProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          isStepComplete={isStepComplete}
        />
        <div className="flex gap-8">
          <QuizSidebar
            currentStep={currentStep}
            isStepComplete={isStepComplete}
          />
          <div className="flex-1 min-w-0">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
              <QuizStep step={currentStep} direction={direction}>
                <StepComponent answers={answers} setAnswer={setAnswer} />
              </QuizStep>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  size="md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canContinue}
                  size="md"
                >
                  {isLastStep ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Get My Score
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
