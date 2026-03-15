import { create } from 'zustand';

const STORAGE_KEY = 'japa_quiz_progress';

function loadSavedProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

const savedProgress = loadSavedProgress();

export const useQuizStore = create((set, get) => ({
  currentStep: savedProgress?.currentStep || 0,
  answers: savedProgress?.answers || {},

  setCurrentStep: (step) => {
    set({ currentStep: step });
    get().saveProgress();
  },

  setAnswer: (key, value) => {
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    }));
    get().saveProgress();
  },

  setAnswers: (newAnswers) => {
    set((state) => ({
      answers: { ...state.answers, ...newAnswers },
    }));
    get().saveProgress();
  },

  saveProgress: () => {
    const { currentStep, answers } = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep, answers }));
  },

  clearProgress: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ currentStep: 0, answers: {} });
  },

  isStepComplete: (step) => {
    const { answers } = get();
    const requiredFields = {
      0: ['fullName', 'age', 'city', 'maritalStatus', 'occupation'],
      1: ['educationLevel', 'fieldOfStudy', 'institutionType', 'graduationYear'],
      2: ['yearsExperience', 'industry', 'remoteWork'],
      3: ['englishProficiency', 'englishTest'],
      4: ['monthlyIncome', 'savings', 'activelySaving'],
      5: ['passportStatus', 'policeReport', 'visaRefused'],
      6: ['targetCountry', 'relocateReason', 'immigrationPathway', 'timelineToLeave'],
    };

    const fields = requiredFields[step] || [];
    return fields.every((f) => answers[f] && answers[f] !== '');
  },
}));
