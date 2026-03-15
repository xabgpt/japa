import Card from '../ui/Card';
import Badge from '../ui/Badge';

const milestones = [
  { label: 'Get passport', key: 'passport', icon: '📄' },
  { label: 'Take IELTS', key: 'ielts', icon: '📝' },
  { label: 'Reach 70+ score', key: 'score70', icon: '🎯' },
  { label: 'Save ₦5M', key: 'savings', icon: '💰' },
  { label: 'Get WES evaluation', key: 'wes', icon: '🎓' },
];

export default function ProgressChart({ latestScore }) {
  const checkMilestone = (key) => {
    if (!latestScore) return 'pending';
    const breakdown = latestScore.breakdown;
    if (!breakdown) return 'pending';

    switch (key) {
      case 'passport': return breakdown.documents >= 5 ? 'done' : 'pending';
      case 'ielts': return breakdown.language >= 12 ? 'done' : 'in_progress';
      case 'score70': return latestScore.total_score >= 70 ? 'done' : 'pending';
      case 'savings': return breakdown.financial >= 13 ? 'done' : 'pending';
      case 'wes': return breakdown.education >= 15 ? 'done' : 'pending';
      default: return 'pending';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Milestone Progress</h3>
      <div className="flex flex-col gap-3">
        {milestones.map((m) => {
          const status = checkMilestone(m.key);
          return (
            <div key={m.key} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]">
              <span className="text-xl">{m.icon}</span>
              <span className="flex-1 text-sm text-[var(--text-primary)]">{m.label}</span>
              <Badge color={status === 'done' ? 'green' : status === 'in_progress' ? 'amber' : 'red'}>
                {status === 'done' ? '✅ Done' : status === 'in_progress' ? '🔄 In Progress' : '⏳ Pending'}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
