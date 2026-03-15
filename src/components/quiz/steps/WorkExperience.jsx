import Input from '../../ui/Input';
import Select from '../../ui/Select';

const yearsOptions = [
  { value: '0', label: '0 (Student/Fresh graduate)' },
  { value: 'less_1', label: 'Less than 1 year' },
  { value: '1_2', label: '1-2 years' },
  { value: '3_5', label: '3-5 years' },
  { value: '6_10', label: '6-10 years' },
  { value: '10+', label: '10+ years' },
];

const industries = [
  'Technology/IT', 'Healthcare/Medical', 'Finance/Banking', 'Engineering',
  'Education/Academia', 'Oil & Gas', 'Legal', 'Creative/Media',
  'NGO/International Org', 'Government/Public Service', 'Hospitality',
  'Construction', 'Agriculture', 'Other',
];

const yesNo = ['Yes', 'No'];
const intlOptions = ['Yes', 'No', 'Currently working internationally'];
const jobOfferOptions = ['Yes', 'No', 'In progress'];

const skills = [
  'Programming/Software Development', 'Data Analysis/Science', 'Project Management',
  'Digital Marketing', 'Graphic Design', 'Nursing/Clinical Skills', 'Teaching/Training',
  'Financial Analysis', 'Legal Research', 'Welding/Trades', 'Driving/Logistics',
  'Research/Academic Writing', 'Sales/Business Development', 'Other',
];

export default function WorkExperience({ answers, setAnswer }) {
  const selectedSkills = answers.skills || [];

  const toggleSkill = (skill) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setAnswer('skills', updated);
  };

  return (
    <div className="flex flex-col gap-5">
      <Select
        label="Total Years of Work Experience"
        options={yearsOptions}
        value={answers.yearsExperience || ''}
        onChange={(e) => setAnswer('yearsExperience', e.target.value)}
      />
      <Input
        label="Current/Most Recent Job Title"
        placeholder="e.g., Software Engineer"
        value={answers.jobTitle || ''}
        onChange={(e) => setAnswer('jobTitle', e.target.value)}
      />
      <Select
        label="Industry"
        options={industries}
        value={answers.industry || ''}
        onChange={(e) => setAnswer('industry', e.target.value)}
      />
      <Select
        label="Do you have remote work experience?"
        options={yesNo}
        value={answers.remoteWork || ''}
        onChange={(e) => setAnswer('remoteWork', e.target.value)}
      />
      <Select
        label="Any international work experience?"
        options={intlOptions}
        value={answers.internationalExperience || ''}
        onChange={(e) => setAnswer('internationalExperience', e.target.value)}
      />
      <Select
        label="Do you have a job offer from a foreign company?"
        options={jobOfferOptions}
        value={answers.foreignJobOffer || ''}
        onChange={(e) => setAnswer('foreignJobOffer', e.target.value)}
      />
      <div>
        <label className="text-sm text-[var(--text-secondary)] font-medium mb-2 block">
          Skills (pick all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-all
                ${selectedSkills.includes(skill)
                  ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]'
                  : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
