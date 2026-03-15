import Input from '../../ui/Input';
import Select from '../../ui/Select';

const educationLevels = [
  { value: 'waec', label: 'WAEC/NECO only' },
  { value: 'ond', label: 'OND / NCE' },
  { value: 'hnd', label: 'HND' },
  { value: 'bachelors', label: "Bachelor's Degree (BSc/BA/BEng)" },
  { value: 'pgd', label: 'Postgraduate Diploma (PGD)' },
  { value: 'masters', label: "Master's Degree (MSc/MA/MBA)" },
  { value: 'phd', label: 'PhD / Doctorate' },
  { value: 'professional', label: 'Professional Certification only' },
];

const fields = [
  'Medicine', 'Nursing', 'Engineering', 'Computer Science/IT',
  'Finance/Accounting', 'Law', 'Education', 'Business/Management',
  'Architecture', 'Pharmacy', 'Other',
];

const institutions = [
  'Nigerian Public University',
  'Nigerian Private University',
  'Polytechnic',
  'Foreign University',
  'Professional Body',
];

const certifications = [
  'CISA', 'CISSP', 'PMP', 'CPA/ACCA/ICAN', 'AWS/Azure/GCP',
  'CFA', 'COREN', 'MDCN', 'NMC (Nursing)', 'NYSC Certificate', 'Other', 'None',
];

export default function Education({ answers, setAnswer }) {
  const selectedCerts = answers.certifications || [];

  const toggleCert = (cert) => {
    if (cert === 'None') {
      setAnswer('certifications', ['None']);
      return;
    }
    const updated = selectedCerts.includes(cert)
      ? selectedCerts.filter((c) => c !== cert)
      : [...selectedCerts.filter((c) => c !== 'None'), cert];
    setAnswer('certifications', updated);
  };

  return (
    <div className="flex flex-col gap-5">
      <Select
        label="Highest Education Level"
        options={educationLevels}
        value={answers.educationLevel || ''}
        onChange={(e) => setAnswer('educationLevel', e.target.value)}
      />
      <Select
        label="Field of Study"
        options={fields}
        value={answers.fieldOfStudy || ''}
        onChange={(e) => setAnswer('fieldOfStudy', e.target.value)}
      />
      <Select
        label="Institution Type"
        options={institutions}
        value={answers.institutionType || ''}
        onChange={(e) => setAnswer('institutionType', e.target.value)}
      />
      <Input
        label="Year of Graduation"
        type="number"
        min={1980}
        max={2026}
        placeholder="e.g., 2020"
        value={answers.graduationYear || ''}
        onChange={(e) => setAnswer('graduationYear', e.target.value)}
      />
      <div>
        <label className="text-sm text-[var(--text-secondary)] font-medium mb-2 block">
          Professional Certifications (select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <button
              key={cert}
              type="button"
              onClick={() => toggleCert(cert)}
              className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-all
                ${selectedCerts.includes(cert)
                  ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]'
                  : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                }`}
            >
              {cert}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
