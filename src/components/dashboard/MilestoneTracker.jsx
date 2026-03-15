import Card from '../ui/Card';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';

export default function MilestoneTracker({ latestScore, isPremium }) {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Current Score</h3>
        {latestScore && (
          <div className="score-display text-3xl">{latestScore.total_score}/100</div>
        )}
      </div>

      {latestScore ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-secondary)]">Grade:</span>
            <Badge color={latestScore.grade?.color || 'green'}>
              {latestScore.grade?.emoji} {latestScore.grade?.label}
            </Badge>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/quiz')}
            className="mt-2"
          >
            {isPremium ? 'Retake Quiz' : 'Retake Quiz (1 per 30 days)'}
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            You haven't taken the quiz yet.
          </p>
          <Button size="sm" onClick={() => navigate('/quiz')}>
            Take the Quiz
          </Button>
        </div>
      )}
    </Card>
  );
}
