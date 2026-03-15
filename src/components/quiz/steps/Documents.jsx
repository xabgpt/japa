import Select from '../../ui/Select';

const passportOptions = [
  { value: 'valid_2plus', label: 'Yes, valid for 2+ years' },
  { value: 'valid_under2', label: 'Yes, but expires within 2 years' },
  { value: 'expired', label: 'Yes, but currently expired' },
  { value: 'none', label: "No, I don't have a passport yet" },
  { value: 'in_progress', label: 'Application in progress' },
];

const policeOptions = ['Yes', 'No', 'Expired'];
const visaOptions = ['Yes', 'No', 'Not applied yet'];
const yesNo = ['Yes', 'No'];
const medicalOptions = ['Yes', 'No', 'Not needed yet'];
const wesOptions = ['Yes (WES or equivalent)', 'No', 'In progress', 'Not sure what this means'];
const planningOptions = [
  { value: 'just_started', label: 'Just started thinking about it' },
  { value: '1_6_months', label: '1-6 months' },
  { value: '6_12_months', label: '6-12 months' },
  { value: '1_2_years', label: '1-2 years' },
  { value: '2_plus', label: '2+ years' },
];

export default function Documents({ answers, setAnswer }) {
  return (
    <div className="flex flex-col gap-5">
      <Select
        label="Do you have a valid Nigerian passport?"
        options={passportOptions}
        value={answers.passportStatus || ''}
        onChange={(e) => setAnswer('passportStatus', e.target.value)}
      />
      <Select
        label="Do you have a police clearance certificate?"
        options={policeOptions}
        value={answers.policeReport || ''}
        onChange={(e) => setAnswer('policeReport', e.target.value)}
      />
      <Select
        label="Have you ever been refused a visa?"
        options={visaOptions}
        value={answers.visaRefused || ''}
        onChange={(e) => setAnswer('visaRefused', e.target.value)}
      />
      <Select
        label="Do you have a valid driver's license?"
        options={yesNo}
        value={answers.driversLicense || ''}
        onChange={(e) => setAnswer('driversLicense', e.target.value)}
      />
      <Select
        label="Do you have a medical report/fitness certificate?"
        options={medicalOptions}
        value={answers.medicalReport || ''}
        onChange={(e) => setAnswer('medicalReport', e.target.value)}
      />
      <Select
        label="Have academic credentials been evaluated/verified internationally?"
        options={wesOptions}
        value={answers.wesEvaluation || ''}
        onChange={(e) => setAnswer('wesEvaluation', e.target.value)}
      />
      <Select
        label="How long have you been planning to Japa?"
        options={planningOptions}
        value={answers.planningDuration || ''}
        onChange={(e) => setAnswer('planningDuration', e.target.value)}
      />
    </div>
  );
}
