import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const stepNames = [
  'Personal Info',
  'Education',
  'Work Experience',
  'Language Skills',
  'Financial Profile',
  'Documents',
  'Target Country',
];

export default function QuizProgress({ currentStep, totalSteps, isStepComplete }) {
  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[var(--text-secondary)]">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-[var(--accent)]">
          {stepNames[currentStep]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-[var(--accent)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

export function QuizSidebar({ currentStep, isStepComplete }) {
  return (
    <div className="hidden lg:flex flex-col gap-1 min-w-[200px]">
      {stepNames.map((name, i) => {
        const isActive = i === currentStep;
        const isComplete = i < currentStep;
        return (
          <div
            key={name}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm
              ${isActive ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : ''}
              ${isComplete ? 'text-[var(--text-secondary)]' : ''}
              ${!isActive && !isComplete ? 'text-[var(--text-muted)]' : ''}
            `}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
              ${isActive ? 'bg-[var(--accent)] text-[var(--primary)]' : ''}
              ${isComplete ? 'bg-[var(--accent)]/20 text-[var(--accent)]' : ''}
              ${!isActive && !isComplete ? 'bg-[var(--surface-2)] text-[var(--text-muted)]' : ''}
            `}>
              {isComplete ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            {name}
          </div>
        );
      })}
    </div>
  );
}
