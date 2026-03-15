export async function generateJapaAnalysis(quizData, localScore) {
  const systemPrompt = `You are an expert Nigerian immigration advisor with 15 years of experience helping Nigerians relocate to Canada, UK, USA, Germany, Australia, Netherlands, and other countries. You are deeply familiar with: Express Entry, UK Skilled Worker visa, US EB visas, Australian General Skilled Migration, and other pathways. You understand the Nigerian context: NYSC, WAEC, HND vs BSc issues, WES evaluation, IELTS preparation in Nigeria, OPay/bank statement issues, Nigerian passport challenges, and the emotional weight of wanting to Japa.

Be direct, specific, warm but honest. Use the person's first name. Do NOT give generic advice. Reference actual visa programs by name. Mention real financial thresholds.

Respond ONLY with valid JSON matching the exact schema provided. No preamble, no markdown.`;

  const firstName = quizData.fullName?.split(' ')[0] || 'there';

  const userPrompt = `Analyze this Nigerian's Japa readiness and generate a comprehensive immigration analysis.

PROFILE DATA:
${JSON.stringify(quizData, null, 2)}

LOCAL SCORE (for reference, do not just echo this):
${JSON.stringify(localScore, null, 2)}

Generate the analysis JSON with these exact keys:
{
  "summary": string,
  "top_blockers": array of {title, severity, explanation, fix},
  "country_matches": array of {country, flag, compatibility_score, best_pathway, why_good_fit, main_challenge, estimated_timeline, estimated_cost_usd},
  "action_plan": array of {phase, title, tasks: [{task, priority, resource_hint}]},
  "quick_wins": array of strings,
  "motivational_close": string
}

Use the person's first name (${firstName}). Be specific to their exact profile.
If they're a nurse, reference NMC registration for UK. If they're in tech, mention specific visa categories.
If their savings are low, give specific savings targets in Naira. Make this feel personally crafted.`;

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    return getMockAnalysis(quizData, localScore);
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;

  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }
}

function getMockAnalysis(quizData, localScore) {
  const firstName = quizData.fullName?.split(' ')[0] || 'Friend';
  const country = quizData.targetCountry || 'Canada';

  return {
    summary: `${firstName}, you're making real progress on your Japa journey. Your profile shows strong potential, but there are specific areas that need attention before you'll be competitive for immigration to ${country}.`,
    top_blockers: [
      {
        title: 'IELTS/Language Test Required',
        severity: 'high',
        explanation: 'Most immigration pathways require a minimum IELTS score of 6.5-7.0. Without this, your application cannot proceed.',
        fix: 'Register for IELTS at the British Council Lagos or Abuja. Book at least 2 months ahead. Target overall band 7.0+.',
      },
      {
        title: 'Savings Below Threshold',
        severity: 'medium',
        explanation: 'Proof of funds is critical for most visa applications. You need to show sufficient settlement funds.',
        fix: 'Start saving aggressively. Target at least ₦5,000,000 in a dedicated savings account. Avoid round-number deposits.',
      },
      {
        title: 'Credential Evaluation Pending',
        severity: 'medium',
        explanation: 'Your Nigerian degree needs to be evaluated by WES or a recognized body for it to count toward immigration points.',
        fix: 'Start your WES evaluation now — it takes 3-5 months. Request transcripts from your university immediately.',
      },
    ],
    country_matches: [
      {
        country: 'Canada',
        flag: '🇨🇦',
        compatibility_score: 72,
        best_pathway: 'Express Entry - Federal Skilled Worker',
        why_good_fit: `Canada's Express Entry system values your education and work experience. The Nigerian diaspora community is well-established.`,
        main_challenge: 'CRS score competitiveness — you may need provincial nomination to boost your points.',
        estimated_timeline: '12-18 months',
        estimated_cost_usd: '3000-5000',
      },
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        compatibility_score: 65,
        best_pathway: 'Skilled Worker Visa',
        why_good_fit: 'The UK has shortage occupations that may match your profile, and the process is faster than other countries.',
        main_challenge: 'You need a job offer from a licensed sponsor employer before applying.',
        estimated_timeline: '6-12 months',
        estimated_cost_usd: '2000-4000',
      },
      {
        country: 'Germany',
        flag: '🇩🇪',
        compatibility_score: 58,
        best_pathway: 'Opportunity Card (Chancenkarte)',
        why_good_fit: 'Germany\'s new points-based system is accessible and doesn\'t always require a job offer upfront.',
        main_challenge: 'German language skills would significantly boost your chances and integration.',
        estimated_timeline: '8-14 months',
        estimated_cost_usd: '2000-3500',
      },
    ],
    action_plan: [
      {
        phase: 1,
        title: 'Immediate (0-3 months)',
        tasks: [
          { task: 'Book and prepare for IELTS exam', priority: 'critical', resource_hint: 'British Council Nigeria — book online' },
          { task: 'Begin WES credential evaluation', priority: 'critical', resource_hint: 'wes.org — start application immediately' },
          { task: 'Ensure passport is valid for 2+ years', priority: 'high', resource_hint: 'NIS online portal for renewal' },
        ],
      },
      {
        phase: 2,
        title: 'Short-term (3-9 months)',
        tasks: [
          { task: 'Build savings to ₦5M+ target', priority: 'high', resource_hint: 'Set up automatic monthly transfers' },
          { task: 'Get police clearance certificate', priority: 'medium', resource_hint: 'Nigeria Police Force HQ, Abuja' },
          { task: 'Update CV to international format', priority: 'medium', resource_hint: 'Use Canadian/UK CV formats' },
        ],
      },
      {
        phase: 3,
        title: 'Long-term (9-24 months)',
        tasks: [
          { task: 'Submit Express Entry profile', priority: 'high', resource_hint: 'IRCC website — create GCKey account' },
          { task: 'Apply for provincial nomination if needed', priority: 'medium', resource_hint: 'Research PNP streams matching your NOC code' },
          { task: 'Prepare for landing and settlement', priority: 'medium', resource_hint: 'Join Nigerian communities in target city' },
        ],
      },
    ],
    quick_wins: [
      'Create a LinkedIn profile optimized for international recruiters this week',
      'Download the IELTS prep app and do 30 minutes daily practice',
      'Open a dedicated "Japa Fund" savings account today',
    ],
    motivational_close: `${firstName}, your journey to ${country} is absolutely possible. Thousands of Nigerians with similar profiles have successfully relocated. The key is taking consistent action — start with your IELTS booking this week, and everything else will follow. You've got this! 🇳🇬✈️`,
  };
}
