export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Anthropic API key not configured on server' });
  }

  try {
    const { quizData, localScore } = req.body;

    if (!quizData || !localScore) {
      return res.status(400).json({ error: 'Missing quizData or localScore in request body' });
    }

    const firstName = quizData.fullName?.split(' ')[0] || 'there';

    const systemPrompt = `You are an expert Nigerian immigration advisor with 15 years of experience helping Nigerians relocate to Canada, UK, USA, Germany, Australia, Netherlands, and other countries. You are deeply familiar with: Express Entry, UK Skilled Worker visa, US EB visas, Australian General Skilled Migration, and other pathways. You understand the Nigerian context: NYSC, WAEC, HND vs BSc issues, WES evaluation, IELTS preparation in Nigeria, OPay/bank statement issues, Nigerian passport challenges, and the emotional weight of wanting to Japa.

Be direct, specific, warm but honest. Use the person's first name. Do NOT give generic advice. Reference actual visa programs by name. Mention real financial thresholds.

Respond ONLY with valid JSON matching the exact schema provided. No preamble, no markdown.`;

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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', response.status, errorData);
      return res.status(response.status).json({
        error: `Anthropic API returned ${response.status}`,
        details: errorData,
      });
    }

    const data = await response.json();
    const text = data.content[0].text;

    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch {
      const cleaned = text.replace(/```json|```/g, '').trim();
      analysis = JSON.parse(cleaned);
    }

    return res.status(200).json(analysis);
  } catch (err) {
    console.error('Server error in /api/analyze:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
