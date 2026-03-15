import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Progress from '../ui/Progress';
import { Clock, DollarSign, Route, AlertTriangle } from 'lucide-react';

function CountryCard({ match, rank }) {
  return (
    <Card hover className="p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{match.flag}</span>
        <Badge color={match.compatibility_score >= 70 ? 'green' : match.compatibility_score >= 50 ? 'amber' : 'red'}>
          {match.compatibility_score}% match
        </Badge>
      </div>

      <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">{match.country}</h4>

      <div className="flex items-center gap-2 mb-3">
        <Route className="w-4 h-4 text-[var(--accent)]" />
        <span className="text-sm text-[var(--accent)]">{match.best_pathway}</span>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">{match.why_good_fit}</p>

      <div className="flex flex-col gap-2 pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 text-sm">
          <AlertTriangle className="w-3.5 h-3.5 text-[var(--accent-warm)]" />
          <span className="text-[var(--text-secondary)]">{match.main_challenge}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span className="text-[var(--text-secondary)]">{match.estimated_timeline}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span className="text-[var(--text-secondary)]">${match.estimated_cost_usd}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CountryMatch({ matches }) {
  if (!matches?.length) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Country Matches</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matches.map((match, i) => (
          <CountryCard key={i} match={match} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
