import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

export default function ScoreHistory({ scores }) {
  if (!scores?.length) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-2">Score History</h3>
        <p className="text-sm text-[var(--text-secondary)]">Take the quiz to see your score history here.</p>
      </Card>
    );
  }

  const data = scores.map((s) => ({
    date: new Date(s.created_at).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }),
    score: s.total_score,
  })).reverse();

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Score History</h3>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fill: '#888888', fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#888888', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: '#1A1A1A',
                border: '1px solid #222222',
                borderRadius: '12px',
                color: '#F5F5F5',
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#00E5A0"
              strokeWidth={2}
              dot={{ fill: '#00E5A0', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
