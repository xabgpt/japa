import Select from '../../ui/Select';

const countries = [
  { value: 'Canada', label: '🇨🇦 Canada' },
  { value: 'United Kingdom', label: '🇬🇧 United Kingdom' },
  { value: 'United States', label: '🇺🇸 United States' },
  { value: 'Germany', label: '🇩🇪 Germany' },
  { value: 'Netherlands', label: '🇳🇱 Netherlands' },
  { value: 'Australia', label: '🇦🇺 Australia' },
  { value: 'Ireland', label: '🇮🇪 Ireland' },
  { value: 'Belgium', label: '🇧🇪 Belgium' },
  { value: 'Scandinavia', label: '🇳🇴 Norway / 🇸🇪 Sweden / 🇩🇰 Denmark' },
  { value: 'UAE (Dubai)', label: '🇦🇪 UAE (Dubai)' },
  { value: 'Not sure yet', label: 'Not sure yet — show me the best match' },
];

const reasons = [
  'Better career opportunities',
  'Higher income / better standard of living',
  'Education (study abroad)',
  'Safety and security',
  'Better healthcare',
  'Family reunion',
  'Business/entrepreneurship',
  'Adventure and personal growth',
];

const pathways = [
  { value: 'skilled_worker', label: 'Skilled worker / Work visa' },
  { value: 'student', label: 'Student visa (study first, work later)' },
  { value: 'family', label: 'Family sponsorship / Reunion' },
  { value: 'business', label: 'Business / Entrepreneur visa' },
  { value: 'humanitarian', label: 'Humanitarian / Asylum' },
  { value: 'unsure', label: "I don't know — help me figure it out" },
];

const timelineOptions = [
  { value: 'within_6m', label: 'Within 6 months' },
  { value: '6_12m', label: '6-12 months' },
  { value: '1_2y', label: '1-2 years' },
  { value: '2_5y', label: '2-5 years' },
  { value: 'exploring', label: 'Just exploring for now' },
];

export default function TargetCountry({ answers, setAnswer }) {
  const selectedReasons = answers.relocateReason || [];

  const toggleReason = (reason) => {
    const updated = selectedReasons.includes(reason)
      ? selectedReasons.filter((r) => r !== reason)
      : [...selectedReasons, reason];
    setAnswer('relocateReason', updated);
  };

  return (
    <div className="flex flex-col gap-5">
      <Select
        label="Which country is your top choice?"
        options={countries}
        value={answers.targetCountry || ''}
        onChange={(e) => setAnswer('targetCountry', e.target.value)}
      />

      <div>
        <label className="text-sm text-[var(--text-secondary)] font-medium mb-2 block">
          Why do you want to relocate? (select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {reasons.map((reason) => (
            <button
              key={reason}
              type="button"
              onClick={() => toggleReason(reason)}
              className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-all
                ${selectedReasons.includes(reason)
                  ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]'
                  : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                }`}
            >
              {reason}
            </button>
          ))}
        </div>
      </div>

      <Select
        label="What is your preferred immigration pathway?"
        options={pathways}
        value={answers.immigrationPathway || ''}
        onChange={(e) => setAnswer('immigrationPathway', e.target.value)}
      />
      <Select
        label="How soon are you hoping to leave?"
        options={timelineOptions}
        value={answers.timelineToLeave || ''}
        onChange={(e) => setAnswer('timelineToLeave', e.target.value)}
      />
    </div>
  );
}
