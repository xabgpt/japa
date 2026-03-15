import Select from '../../ui/Select';

const incomeOptions = [
  { value: 'below_100k', label: 'Below ₦100,000' },
  { value: '100k_300k', label: '₦100,000 - ₦300,000' },
  { value: '300k_500k', label: '₦300,000 - ₦500,000' },
  { value: '500k_1m', label: '₦500,000 - ₦1,000,000' },
  { value: '1m_3m', label: '₦1,000,000 - ₦3,000,000' },
  { value: 'above_3m', label: 'Above ₦3,000,000' },
  { value: 'prefer_not', label: 'I prefer not to say' },
];

const savingsOptions = [
  { value: 'below_500k', label: 'Below ₦500,000' },
  { value: '500k_2m', label: '₦500,000 - ₦2,000,000' },
  { value: '2m_5m', label: '₦2,000,000 - ₦5,000,000' },
  { value: '5m_15m', label: '₦5,000,000 - ₦15,000,000' },
  { value: '15m_30m', label: '₦15,000,000 - ₦30,000,000' },
  { value: 'above_30m', label: 'Above ₦30,000,000' },
];

const yesNo = ['Yes', 'No'];
const savingOptions = ['Yes, actively', 'Somewhat', 'Not yet but planning to', 'No'];

export default function Finances({ answers, setAnswer }) {
  return (
    <div className="flex flex-col gap-5">
      <Select
        label="Monthly Income Range (in Naira)"
        options={incomeOptions}
        value={answers.monthlyIncome || ''}
        onChange={(e) => setAnswer('monthlyIncome', e.target.value)}
      />
      <Select
        label="Current Savings (in Naira)"
        options={savingsOptions}
        value={answers.savings || ''}
        onChange={(e) => setAnswer('savings', e.target.value)}
      />
      <Select
        label="Do you own property in Nigeria?"
        options={yesNo}
        value={answers.ownsProperty || ''}
        onChange={(e) => setAnswer('ownsProperty', e.target.value)}
      />
      <Select
        label="Do you have a sponsor abroad willing to support you financially?"
        options={yesNo}
        value={answers.sponsor || ''}
        onChange={(e) => setAnswer('sponsor', e.target.value)}
      />
      <Select
        label="Are you currently saving specifically for relocation?"
        options={savingOptions}
        value={answers.activelySaving || ''}
        onChange={(e) => setAnswer('activelySaving', e.target.value)}
      />
    </div>
  );
}
