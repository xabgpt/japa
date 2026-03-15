import Input from '../../ui/Input';
import Select from '../../ui/Select';

const englishLevels = [
  { value: 'Basic', label: 'Basic — can hold simple conversations' },
  { value: 'Intermediate', label: 'Intermediate — comfortable in professional settings' },
  { value: 'Advanced', label: 'Advanced — near-native fluency' },
  { value: 'Native/Bilingual', label: 'Native/Bilingual' },
];

const testOptions = ['Yes', 'No', 'Planning to soon'];

const testTypes = [
  { value: 'ielts', label: 'IELTS' },
  { value: 'toefl', label: 'TOEFL iBT' },
  { value: 'pte', label: 'PTE Academic' },
  { value: 'duolingo', label: 'Duolingo English Test' },
];

const languages = ['French', 'German', 'Spanish', 'Portuguese', 'Dutch', 'Mandarin', 'Arabic', 'None'];

export default function LanguageSkills({ answers, setAnswer }) {
  const selectedLangs = answers.otherLanguages || [];

  const toggleLang = (lang) => {
    if (lang === 'None') {
      setAnswer('otherLanguages', ['None']);
      return;
    }
    const updated = selectedLangs.includes(lang)
      ? selectedLangs.filter((l) => l !== lang)
      : [...selectedLangs.filter((l) => l !== 'None'), lang];
    setAnswer('otherLanguages', updated);
  };

  return (
    <div className="flex flex-col gap-5">
      <Select
        label="How would you rate your English?"
        options={englishLevels}
        value={answers.englishProficiency || ''}
        onChange={(e) => setAnswer('englishProficiency', e.target.value)}
      />
      <Select
        label="Have you taken an English proficiency test?"
        options={testOptions}
        value={answers.englishTest || ''}
        onChange={(e) => setAnswer('englishTest', e.target.value)}
      />

      {answers.englishTest === 'Yes' && (
        <div className="flex flex-col gap-4 p-4 bg-[var(--surface-2)] rounded-xl border border-[var(--border)]">
          <Select
            label="Which test?"
            options={testTypes}
            value={answers.testType || ''}
            onChange={(e) => setAnswer('testType', e.target.value)}
          />
          {answers.testType === 'ielts' && (
            <Input
              label="IELTS Overall Band"
              type="number"
              min={1}
              max={9}
              step={0.5}
              placeholder="e.g., 7.0"
              value={answers.ieltsScore || ''}
              onChange={(e) => setAnswer('ieltsScore', parseFloat(e.target.value))}
            />
          )}
          {answers.testType === 'toefl' && (
            <Input
              label="TOEFL iBT Total Score"
              type="number"
              min={0}
              max={120}
              placeholder="0-120"
              value={answers.toeflScore || ''}
              onChange={(e) => setAnswer('toeflScore', parseInt(e.target.value))}
            />
          )}
          {answers.testType === 'pte' && (
            <Input
              label="PTE Academic Score"
              type="number"
              min={10}
              max={90}
              placeholder="10-90"
              value={answers.pteScore || ''}
              onChange={(e) => setAnswer('pteScore', parseInt(e.target.value))}
            />
          )}
          {answers.testType === 'duolingo' && (
            <Input
              label="Duolingo English Test Score"
              type="number"
              min={10}
              max={160}
              placeholder="10-160"
              value={answers.duolingoScore || ''}
              onChange={(e) => setAnswer('duolingoScore', parseInt(e.target.value))}
            />
          )}
        </div>
      )}

      <div>
        <label className="text-sm text-[var(--text-secondary)] font-medium mb-2 block">
          Do you speak any other languages?
        </label>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => toggleLang(lang)}
              className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-all
                ${selectedLangs.includes(lang)
                  ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]'
                  : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
