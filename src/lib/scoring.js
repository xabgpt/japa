export function calculateScore(quizData) {
  let scores = {
    education: 0,
    experience: 0,
    language: 0,
    financial: 0,
    documents: 0,
    completeness: 0,
    countryFit: 0,
  };

  // EDUCATION (max 20)
  const eduMap = {
    'waec': 3,
    'ond': 5,
    'hnd': 8,
    'bachelors': 12,
    'pgd': 13,
    'masters': 17,
    'phd': 20,
    'professional': 10,
  };
  scores.education = eduMap[quizData.educationLevel] || 0;
  if (quizData.certifications?.length > 0) scores.education = Math.min(20, scores.education + 2);
  if (quizData.institutionType === 'Foreign University') scores.education = Math.min(20, scores.education + 3);

  // WORK EXPERIENCE (max 20)
  const expMap = {
    '0': 2, 'less_1': 4, '1_2': 7, '3_5': 12, '6_10': 17, '10+': 20,
  };
  scores.experience = expMap[quizData.yearsExperience] || 0;
  if (quizData.remoteWork === 'Yes') scores.experience = Math.min(20, scores.experience + 2);
  if (quizData.internationalExperience && quizData.internationalExperience !== 'No') scores.experience = Math.min(20, scores.experience + 3);
  if (quizData.foreignJobOffer === 'Yes') scores.experience = Math.min(20, scores.experience + 5);

  // LANGUAGE (max 15)
  if (quizData.englishProficiency === 'Native/Bilingual') scores.language = 12;
  else if (quizData.englishProficiency === 'Advanced') scores.language = 10;
  else if (quizData.englishProficiency === 'Intermediate') scores.language = 6;
  else scores.language = 3;

  if (quizData.ieltsScore >= 7.5) scores.language = 15;
  else if (quizData.ieltsScore >= 6.5) scores.language = Math.max(scores.language, 12);
  else if (quizData.ieltsScore >= 6.0) scores.language = Math.max(scores.language, 10);
  else if (quizData.ieltsScore) scores.language = Math.max(scores.language, 7);

  if (quizData.toeflScore >= 100) scores.language = 15;
  else if (quizData.toeflScore >= 80) scores.language = Math.max(scores.language, 12);

  if (quizData.pteScore >= 75) scores.language = 15;
  else if (quizData.pteScore >= 60) scores.language = Math.max(scores.language, 12);

  if (quizData.duolingoScore >= 130) scores.language = 15;
  else if (quizData.duolingoScore >= 110) scores.language = Math.max(scores.language, 12);

  if (quizData.otherLanguages?.length > 0) scores.language = Math.min(15, scores.language + 1);

  // FINANCIAL (max 20)
  const savingsMap = {
    'below_500k': 2,
    '500k_2m': 5,
    '2m_5m': 9,
    '5m_15m': 13,
    '15m_30m': 17,
    'above_30m': 20,
  };
  scores.financial = savingsMap[quizData.savings] || 2;
  if (quizData.sponsor === 'Yes') scores.financial = Math.min(20, scores.financial + 3);
  if (quizData.activelySaving === 'Yes, actively') scores.financial = Math.min(20, scores.financial + 2);
  if (quizData.ownsProperty === 'Yes') scores.financial = Math.min(20, scores.financial + 1);

  // DOCUMENTS (max 15)
  if (quizData.passportStatus === 'valid_2plus') scores.documents += 7;
  else if (quizData.passportStatus === 'valid_under2') scores.documents += 5;
  else if (quizData.passportStatus === 'expired') scores.documents += 2;
  else scores.documents += 0;

  if (quizData.policeReport === 'Yes') scores.documents += 3;
  if (quizData.visaRefused === 'No') scores.documents += 3;
  if (quizData.wesEvaluation === 'Yes (WES or equivalent)') scores.documents += 2;
  scores.documents = Math.min(15, scores.documents);

  // COMPLETENESS BONUS (max 5)
  const filledFields = Object.values(quizData).filter(v => v && v !== '').length;
  scores.completeness = Math.min(5, Math.floor(filledFields / 10));

  // COUNTRY FIT (max 5)
  scores.countryFit = calculateCountryFit(quizData);

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  return {
    total: Math.min(100, total),
    breakdown: scores,
    grade: getGrade(Math.min(100, total)),
    percentile: estimatePercentile(Math.min(100, total)),
  };
}

function calculateCountryFit(quizData) {
  let fit = 2; // base
  const country = quizData.targetCountry;
  const occupation = quizData.occupation;
  const field = quizData.fieldOfStudy;

  if (!country) return fit;

  // Medical/nursing + Canada/UK = good fit
  if ((occupation === 'Medical Professional' || field === 'Nursing' || field === 'Medicine') &&
      (country === 'Canada' || country === 'United Kingdom')) {
    fit = 5;
  }
  // Tech + Canada/Germany/Netherlands = good fit
  if ((occupation === 'Tech Worker' || field === 'Computer Science/IT' || occupation === 'Self-Employed/Freelancer') &&
      (country === 'Canada' || country === 'Germany' || country === 'Netherlands' || country === 'United States')) {
    fit = 5;
  }
  // Engineering + Germany/Canada = good fit
  if ((occupation === 'Engineer' || field === 'Engineering') &&
      (country === 'Germany' || country === 'Canada')) {
    fit = 5;
  }
  // Finance/Banking + UK/Canada
  if ((occupation === 'Finance/Banking' || field === 'Finance/Accounting') &&
      (country === 'United Kingdom' || country === 'Canada')) {
    fit = 4;
  }

  return Math.min(5, fit);
}

function getGrade(total) {
  if (total >= 90) return { label: 'Japa Ready', emoji: '🏆', color: 'green' };
  if (total >= 75) return { label: 'Strong Profile', emoji: '✅', color: 'green' };
  if (total >= 60) return { label: 'Almost There', emoji: '⚡', color: 'amber' };
  if (total >= 45) return { label: 'Needs Work', emoji: '🔧', color: 'amber' };
  return { label: 'Early Stage', emoji: '🏗️', color: 'red' };
}

function estimatePercentile(total) {
  if (total >= 85) return 95;
  if (total >= 75) return 85;
  if (total >= 65) return 70;
  if (total >= 55) return 50;
  if (total >= 45) return 35;
  return 20;
}

export const categoryLabels = {
  education: 'Education Score',
  experience: 'Work Experience Score',
  language: 'Language Skills Score',
  financial: 'Financial Readiness Score',
  documents: 'Document Readiness Score',
  completeness: 'Profile Completeness Score',
  countryFit: 'Country Fit Score',
};

export const categoryMaxScores = {
  education: 20,
  experience: 20,
  language: 15,
  financial: 20,
  documents: 15,
  completeness: 5,
  countryFit: 5,
};
