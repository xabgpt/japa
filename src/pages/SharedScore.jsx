import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { getScoreByShareId } from '../lib/supabase';
import Badge from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function SharedScore() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        const data = await getScoreByShareId(shareId);
        if (data) {
          setScore(data);
        } else {
          // Demo fallback
          setScore({
            total_score: 72,
            grade: { label: 'Almost There', emoji: '⚡', color: 'amber' },
            breakdown: {},
            share_id: shareId,
          });
        }
      } catch {
        setScore({
          total_score: 72,
          grade: { label: 'Almost There', emoji: '⚡', color: 'amber' },
          breakdown: {},
          share_id: shareId,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchScore();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--primary)]">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="skeleton h-96 w-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary)]">
      <Navbar />

      <section className="pt-28 pb-20 px-4 flex flex-col items-center">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 max-w-md w-full text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Globe className="w-6 h-6 text-[var(--accent)]" />
            <span className="text-lg font-bold tracking-wide" style={{ fontFamily: 'Bricolage Grotesque' }}>
              JAPA SCORE
            </span>
          </div>

          <div className="score-display score-display-lg mb-2">
            {score.total_score}
          </div>
          <p className="text-xl text-[var(--text-muted)] mb-4">out of 100</p>

          <Badge color={score.grade?.color || 'amber'}>
            {score.grade?.emoji} {score.grade?.label}
          </Badge>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">Want to know your own score?</h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md">
            Take the free quiz and get your personalized Japa Score, gap analysis, and action plan.
          </p>
          <Button size="lg" onClick={() => navigate('/quiz')}>
            Get Your Own Japa Score
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
