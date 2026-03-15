import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { categoryLabels, categoryMaxScores } from '../../lib/scoring';
import Card from '../ui/Card';

function getBarColor(value, max) {
  const pct = (value / max) * 100;
  if (pct >= 80) return '#00E5A0';
  if (pct >= 50) return '#FFB800';
  return '#FF4D4D';
}

export default function ScoreBreakdown({ breakdown }) {
  if (!breakdown) return null;

  const data = Object.entries(breakdown).map(([key, value]) => ({
    name: categoryLabels[key]?.replace(' Score', '') || key,
    score: value,
    max: categoryMaxScores[key] || 20,
    fullName: categoryLabels[key] || key,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Score Breakdown</h3>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
            <XAxis type="number" domain={[0, 20]} tick={{ fill: '#888888', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#F5F5F5', fontSize: 12 }}
              width={130}
            />
            <Tooltip
              contentStyle={{
                background: '#1A1A1A',
                border: '1px solid #222222',
                borderRadius: '12px',
                color: '#F5F5F5',
              }}
              formatter={(value, name, props) => [
                `${value}/${props.payload.max}`,
                props.payload.fullName,
              ]}
            />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(entry.score, entry.max)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
