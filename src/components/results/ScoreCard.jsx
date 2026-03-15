import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';

const ScoreCard = forwardRef(({ score, grade, bestCountry, name }, ref) => {
  const firstName = name?.split(' ')[0] || '';
  const initial = firstName?.[0]?.toUpperCase() || 'J';

  return (
    <div
      ref={ref}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-[400px]"
    >
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-[var(--accent)]" />
        <span className="text-sm font-bold tracking-wide text-[var(--text-primary)]" style={{ fontFamily: 'Bricolage Grotesque' }}>
          JAPA SCORE
        </span>
      </div>

      <p className="text-lg font-semibold text-[var(--text-primary)] mb-3">
        {firstName} {name?.split(' ')[1]?.[0]?.toUpperCase()}.
      </p>

      <div className="flex items-end gap-3 mb-2">
        <Progress value={score} max={100} className="flex-1" color="var(--accent)" />
        <span className="score-display text-3xl">{score}/100</span>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text-secondary)]">Grade:</span>
          <Badge color={grade?.color}>{grade?.emoji} {grade?.label}</Badge>
        </div>
        {bestCountry && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-secondary)]">Best Match:</span>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {bestCountry.flag} {bestCountry.country} ({bestCountry.compatibility_score}%)
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-muted)]">getjapascore.com</p>
      </div>
    </div>
  );
});

ScoreCard.displayName = 'ScoreCard';
export default ScoreCard;
