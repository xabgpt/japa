import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Lock, AlertTriangle, RefreshCw } from 'lucide-react';
import { useScore } from '../hooks/useScore';
import { useQuizStore } from '../store/quizStore';
import { generateJapaAnalysis } from '../lib/anthropic';
import { useResultsStore } from '../store/resultsStore';
import ScoreCard from '../components/results/ScoreCard';
import ScoreBreakdown from '../components/results/ScoreBreakdown';
import GapAnalysis from '../components/results/GapAnalysis';
import ActionPlan from '../components/results/ActionPlan';
import CountryMatch from '../components/results/CountryMatch';
import ShareModal from '../components/results/ShareModal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function Results() {
  const navigate = useNavigate();
  const { scoreData, aiAnalysis, loading, error } = useScore();
  const { answers } = useQuizStore();
  const { setAiAnalysis, setError } = useResultsStore();
  const scoreCardRef = useRef(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const retryAnalysis = async () => {
    if (!scoreData) return;
    setRetrying(true);
    setError(null);
    try {
      const analysis = await generateJapaAnalysis(answers, scoreData);
      setAiAnalysis(analysis);
    } catch (err) {
      console.error('Retry failed:', err);
      setError('AI analysis is still unavailable. Please try again later.');
    } finally {
      setRetrying(false);
    }
  };

  // Redirect if no score data
  useEffect(() => {
    if (!scoreData && !loading) {
      navigate('/quiz');
    }
  }, [scoreData, loading, navigate]);

  if (!scoreData) {
    return (
      <div className="min-h-screen bg-[var(--primary)] flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  const { total, breakdown, grade, percentile } = scoreData;
  const bestCountry = aiAnalysis?.country_matches?.[0];
  const firstName = answers.fullName?.split(' ')[0] || '';
  const shareUrl = `${window.location.origin}/score/demo`;

  return (
    <div className="min-h-screen bg-[var(--primary)]">
      <Navbar />

      {/* Score Hero */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--text-secondary)] mb-2"
          >
            Your Japa Score
          </motion.p>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="score-display score-display-lg"
          >
            <AnimatedCounter value={total} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-[var(--text-muted)] font-light mb-4"
          >
            out of 100
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Badge color={grade.color}>
              {grade.emoji} {grade.label}
            </Badge>
            {bestCountry && (
              <span className="text-sm text-[var(--text-secondary)]">
                Best match: {bestCountry.flag} {bestCountry.country} ({bestCountry.compatibility_score}%)
              </span>
            )}
          </motion.div>

          {firstName && aiAnalysis?.summary && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[var(--text-secondary)] italic max-w-2xl mx-auto text-lg leading-relaxed"
            >
              "{aiAnalysis.summary}"
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6"
          >
            <Button variant="secondary" onClick={() => setShareOpen(true)}>
              <Share2 className="w-4 h-4" />
              Share My Score
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Results Content */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Score Breakdown */}
          <ScoreBreakdown breakdown={breakdown} />

          {/* AI Analysis Section */}
          {aiAnalysis ? (
            <>
              {aiAnalysis._isFallback && (
                <div className="bg-[var(--surface)] border border-[var(--accent-warm)]/30 rounded-2xl p-4 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-[var(--accent-warm)] flex-shrink-0" />
                  <p className="text-sm text-[var(--text-secondary)]">
                    AI analysis timed out. Showing general recommendations. You can retry for personalized analysis.
                  </p>
                  <Button size="sm" variant="ghost" onClick={retryAnalysis} disabled={retrying}>
                    <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
                    Retry
                  </Button>
                </div>
              )}
              <GapAnalysis blockers={aiAnalysis.top_blockers} />
              <CountryMatch matches={aiAnalysis.country_matches} />
              <ActionPlan actionPlan={aiAnalysis.action_plan} quickWins={aiAnalysis.quick_wins} />

              {/* Motivational Close */}
              {aiAnalysis.motivational_close && (
                <div className="bg-[var(--surface)] border border-[var(--accent)]/20 rounded-2xl p-8 text-center">
                  <p className="text-lg italic text-[var(--text-primary)] leading-relaxed">
                    "{aiAnalysis.motivational_close}"
                  </p>
                </div>
              )}
            </>
          ) : error ? (
            <div className="bg-[var(--surface)] border border-[var(--accent-danger)]/30 rounded-2xl p-8 text-center">
              <AlertTriangle className="w-10 h-10 text-[var(--accent-danger)] mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">AI Analysis Unavailable</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-md mx-auto">
                {error}
              </p>
              <Button variant="secondary" onClick={retryAnalysis} disabled={retrying}>
                <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
                {retrying ? 'Retrying...' : 'Try Again'}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="skeleton h-48 rounded-2xl" />
              <div className="skeleton h-48 rounded-2xl" />
              <p className="text-center text-sm text-[var(--text-muted)]">
                Generating your personalized AI analysis...
              </p>
            </div>
          )}

          {/* Share Card (hidden for capture) */}
          <div className="flex justify-center">
            <ScoreCard
              ref={scoreCardRef}
              score={total}
              grade={grade}
              bestCountry={bestCountry}
              name={answers.fullName}
            />
          </div>

          {/* Premium Upgrade CTA */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary)]" />
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 text-center relative">
              <Lock className="w-8 h-8 text-[var(--accent-warm)] mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">PREMIUM ANALYSIS — Unlock for ₦2,500/month</h3>
              <div className="text-sm text-[var(--text-secondary)] space-y-1 mb-6">
                <p>✓ Monthly score recalculation as you improve</p>
                <p>✓ Full document checklist per country</p>
                <p>✓ Step-by-step visa application guide</p>
                <p>✓ Bank statement optimization tips</p>
                <p>✓ Direct connection to verified Japa consultants</p>
                <p>✓ Progress tracking dashboard</p>
              </div>
              <Button onClick={() => navigate('/pricing')}>
                Unlock Premium — ₦2,500/month
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        score={total}
        grade={grade}
        bestCountry={bestCountry}
        shareUrl={shareUrl}
        scoreCardRef={scoreCardRef}
      />

      <Footer />
    </div>
  );
}

function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    'Analyzing your education...',
    'Checking visa requirements...',
    'Comparing 50+ pathways...',
    'Generating your action plan...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Calculating your score...</h2>
      <div className="w-64 h-2 bg-[var(--surface-2)] rounded-full overflow-hidden mx-auto mb-6">
        <motion.div
          className="h-full bg-[var(--accent)] rounded-full"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </div>
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-[var(--text-secondary)]"
      >
        {messages[messageIndex]}
      </motion.p>
    </div>
  );
}
