import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Globe2, BarChart3, Zap, CheckCircle, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const avatarInitials = ['AO', 'TN', 'CO', 'NE', 'BI'];

const testimonials = [
  {
    name: 'Amaka O.',
    score: 78,
    text: "I thought I was ready to japa until I took this quiz. It showed me I was missing 3 critical documents. Saved me months of wasted time!",
  },
  {
    name: 'Tunde B.',
    score: 65,
    text: "The action plan was incredibly specific to my situation as a software engineer. Not generic advice — actual steps with links.",
  },
  {
    name: 'Ngozi E.',
    score: 82,
    text: "Shared my score card on Twitter and 4 of my friends took it the same day. The country match feature is spot on!",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="particle-grid" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: 'Bricolage Grotesque' }}
            >
              Find Out Exactly How Ready You Are to{' '}
              <span className="text-[var(--accent)]">Japa</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg"
            >
              Answer 7 quick sections. Get your personalized Japa Score, gap analysis, and step-by-step action plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Button size="lg" onClick={() => navigate('/quiz')}>
                Get My Japa Score — It's Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-[var(--text-muted)] mt-4 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[var(--accent-warm)]" />
              Takes 5 minutes · Used by 10,000+ Nigerians
            </motion.p>
          </div>

          {/* Mock Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="animate-float">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 glow-green max-w-[360px] mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Globe2 className="w-5 h-5 text-[var(--accent)]" />
                  <span className="text-sm font-bold tracking-wide">JAPA SCORE</span>
                </div>
                <p className="text-lg font-semibold mb-3">Chidi O.</p>
                <div className="flex items-end gap-3 mb-3">
                  <Progress value={78} max={100} color="var(--accent)" className="flex-1" />
                  <span className="score-display text-2xl">78/100</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-[var(--text-secondary)]">Grade:</span>
                  <Badge color="green">✅ Strong Profile</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--text-secondary)]">Best Match:</span>
                  <span className="text-sm font-medium">🇨🇦 Canada (78%)</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-4 pt-3 border-t border-[var(--border)]">
                  getjapascore.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-[var(--surface)] border-y border-[var(--border)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {avatarInitials.map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[var(--accent)]/20 border-2 border-[var(--surface)] flex items-center justify-center text-xs font-bold text-[var(--accent)]"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-[var(--text-secondary)]">
                Join 10,000+ Nigerians tracking their Japa journey
              </span>
            </div>
            <div className="flex items-center gap-8">
              {[
                { label: '50+ Countries Analyzed', icon: Globe2 },
                { label: '7 Scoring Categories', icon: BarChart3 },
                { label: 'Free to Start', icon: CheckCircle },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--text-primary)] font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[var(--primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Answer 7 quick sections about yourself', icon: '📝' },
              { step: 2, title: 'AI analyzes your profile against real visa requirements', icon: '🤖' },
              { step: 3, title: 'Get your score, gaps, and exact action plan', icon: '🎯' },
            ].map((item) => (
              <Card key={item.step} hover className="p-8 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--primary)] flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                  {item.step}
                </div>
                <p className="text-[var(--text-primary)] font-medium">{item.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Score Card Preview */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Your Shareable Score Card</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Share on Twitter, WhatsApp, Instagram — show your network you're making moves.
          </p>
          <div className="flex justify-center">
            <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-6 max-w-[360px] w-full">
              <div className="flex items-center gap-2 mb-4">
                <Globe2 className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-sm font-bold tracking-wide">JAPA SCORE</span>
              </div>
              <p className="text-lg font-semibold mb-2 text-left">Chidi O.</p>
              <div className="flex items-end gap-3 mb-2">
                <Progress value={72} max={100} color="var(--accent)" className="flex-1" />
                <span className="score-display text-2xl">72/100</span>
              </div>
              <div className="text-left space-y-1 mb-3">
                <p className="text-sm"><span className="text-[var(--text-secondary)]">Grade:</span> ⚡ Almost There</p>
                <p className="text-sm"><span className="text-[var(--text-secondary)]">Best Match:</span> 🇨🇦 Canada (78%)</p>
                <p className="text-sm"><span className="text-[var(--text-secondary)]">Top Gap:</span> Language Score</p>
                <p className="text-sm"><span className="text-[var(--text-secondary)]">Next Step:</span> Book IELTS test</p>
              </div>
              <p className="text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border)]">
                getjapascore.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Nigerians Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6 border-l-4 border-l-[var(--accent)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-sm font-bold text-[var(--accent)]">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[var(--accent)]">Score: {t.score}/100</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">"{t.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Free Forever for Your Base Score</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
            Unlock deep analysis and monthly tracking from ₦2,500/month
          </p>
          <Button onClick={() => navigate('/quiz')}>
            Start Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
