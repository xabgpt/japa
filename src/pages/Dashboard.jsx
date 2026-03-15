import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getUserScores } from '../lib/supabase';
import ScoreHistory from '../components/dashboard/ScoreHistory';
import ProgressChart from '../components/dashboard/ProgressChart';
import MilestoneTracker from '../components/dashboard/MilestoneTracker';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuthStore();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    async function fetchScores() {
      if (user) {
        try {
          const data = await getUserScores(user.id);
          setScores(data);
        } catch (err) {
          console.error('Failed to fetch scores:', err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchScores();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[var(--primary)]">
        <Navbar />
        <div className="pt-24 px-4 max-w-6xl mx-auto">
          <div className="skeleton h-8 w-48 mb-8 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="skeleton h-64 rounded-2xl" />
            <div className="skeleton h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const latestScore = scores[0] || null;
  const isPremium = profile?.is_premium || false;

  return (
    <div className="min-h-screen bg-[var(--primary)]">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Track your Japa journey progress
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <MilestoneTracker latestScore={latestScore} isPremium={isPremium} />
            <ProgressChart latestScore={latestScore} />
          </div>

          <ScoreHistory scores={scores} />

          {latestScore?.ai_analysis?.country_matches?.[0] && (
            <div className="mt-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-2">Country Watch</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                You're tracking {latestScore.ai_analysis.country_matches[0].flag}{' '}
                {latestScore.ai_analysis.country_matches[0].country}
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
