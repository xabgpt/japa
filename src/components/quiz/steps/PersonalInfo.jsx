import Input from '../../ui/Input';
import Select from '../../ui/Select';

const cities = [
  'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu',
  'Benin City', 'Calabar', 'Jos', 'Abeokuta', 'Warri', 'Owerri', 'Other',
];

const maritalOptions = ['Single', 'Married', 'Divorced'];
const childrenOptions = ['0', '1', '2', '3+'];
const occupations = [
  'Student', 'Employed-Private', 'Employed-Government',
  'Self-Employed/Freelancer', 'Unemployed', 'Medical Professional',
  'Tech Worker', 'Engineer', 'Teacher/Academic', 'Finance/Banking',
  'Creative/Media', 'Other',
];

export default function PersonalInfo({ answers, setAnswer }) {
  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={answers.fullName || ''}
        onChange={(e) => setAnswer('fullName', e.target.value)}
      />
      <Input
        label="Age"
        type="number"
        min={18}
        max={65}
        placeholder="18-65"
        value={answers.age || ''}
        onChange={(e) => setAnswer('age', e.target.value)}
      />
      <Select
        label="Current City in Nigeria"
        options={cities}
        value={answers.city || ''}
        onChange={(e) => setAnswer('city', e.target.value)}
      />
      <Select
        label="Marital Status"
        options={maritalOptions}
        value={answers.maritalStatus || ''}
        onChange={(e) => setAnswer('maritalStatus', e.target.value)}
      />
      <Select
        label="Number of Children"
        options={childrenOptions}
        value={answers.children || ''}
        onChange={(e) => setAnswer('children', e.target.value)}
      />
      <Select
        label="Current Occupation"
        options={occupations}
        value={answers.occupation || ''}
        onChange={(e) => setAnswer('occupation', e.target.value)}
      />
    </div>
  );
}
