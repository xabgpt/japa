import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const plans = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    description: 'Get your base score and start your journey',
    features: [
      { text: 'Full quiz', included: true },
      { text: 'Base Japa Score (0-100)', included: true },
      { text: 'Grade + Top Country Match', included: true },
      { text: '3 top blockers', included: true },
      { text: 'Basic action plan', included: true },
      { text: 'Shareable score card', included: true },
      { text: '1 quiz per 30 days', included: true },
      { text: 'Monthly progress tracking', included: false },
      { text: 'Full document checklist', included: false },
      { text: 'Bank statement optimization', included: false },
      { text: 'Visa consultant connection', included: false },
    ],
    cta: 'Start Free',
    variant: 'secondary',
  },
  {
    name: 'Premium',
    price: '₦2,500',
    period: '/month',
    description: 'Full analysis, tracking, and expert guidance',
    popular: true,
    features: [
      { text: 'Full quiz', included: true },
      { text: 'Base Japa Score (0-100)', included: true },
      { text: 'Grade + All Country Matches', included: true },
      { text: 'All blockers (5+) with detailed fix guides', included: true },
      { text: 'Full phased action plan with resources', included: true },
      { text: 'Shareable score card', included: true },
      { text: 'Unlimited retakes', included: true },
      { text: 'Monthly progress tracking & dashboard', included: true },
      { text: 'Full document checklist per country', included: true },
      { text: 'Bank statement optimization guide', included: true },
      { text: 'Visa consultant connection', included: true },
    ],
    cta: 'Go Premium',
    variant: 'primary',
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--primary)]">
      <Navbar />

      <section className="pt-36 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Start free, upgrade when you're ready for the full experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-8 h-full flex flex-col relative ${
                    plan.popular ? 'border-[var(--accent)] glow-green' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-[var(--primary)] text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{plan.description}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Bricolage Grotesque' }}>
                      {plan.price}
                    </span>
                    <span className="text-[var(--text-muted)]">{plan.period}</span>
                  </div>

                  <div className="flex flex-col gap-3 flex-1 mb-8">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {f.included ? (
                          <Check className="w-4 h-4 text-[var(--accent)] shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                        )}
                        <span className={`text-sm ${f.included ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={plan.variant}
                    className="w-full"
                    onClick={() => navigate(plan.popular ? '/login' : '/quiz')}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
