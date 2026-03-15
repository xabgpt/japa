import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, ChevronDown } from 'lucide-react';
import Card from '../ui/Card';

const severityConfig = {
  high: { icon: AlertTriangle, color: 'var(--accent-danger)', bg: 'rgba(255, 77, 77, 0.1)', border: 'rgba(255, 77, 77, 0.3)' },
  medium: { icon: AlertCircle, color: 'var(--accent-warm)', bg: 'rgba(255, 184, 0, 0.1)', border: 'rgba(255, 184, 0, 0.3)' },
  low: { icon: Info, color: 'var(--accent)', bg: 'rgba(0, 229, 160, 0.1)', border: 'rgba(0, 229, 160, 0.3)' },
};

function BlockerCard({ blocker }) {
  const [expanded, setExpanded] = useState(false);
  const config = severityConfig[blocker.severity] || severityConfig.medium;
  const Icon = config.icon;

  return (
    <div
      className="rounded-2xl border p-4 cursor-pointer transition-all"
      style={{ backgroundColor: config.bg, borderColor: config.border }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: config.color }} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[var(--text-primary)]">{blocker.title}</h4>
            <ChevronDown
              className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{blocker.explanation}</p>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t" style={{ borderColor: config.border }}>
                  <p className="text-sm font-medium" style={{ color: config.color }}>How to Fix:</p>
                  <p className="text-sm text-[var(--text-primary)] mt-1">{blocker.fix}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function GapAnalysis({ blockers }) {
  if (!blockers?.length) return null;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-2">Gap Analysis</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        These are the top factors holding back your score. Click to see how to fix each one.
      </p>
      <div className="flex flex-col gap-3">
        {blockers.map((blocker, i) => (
          <BlockerCard key={i} blocker={blocker} />
        ))}
      </div>
    </Card>
  );
}
