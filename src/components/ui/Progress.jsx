import { motion } from 'framer-motion';

export default function Progress({ value = 0, max = 100, className = '', showLabel = false, color }) {
  const percentage = Math.min((value / max) * 100, 100);
  const barColor = color || (percentage >= 80 ? 'var(--accent)' : percentage >= 50 ? 'var(--accent-warm)' : 'var(--accent-danger)');

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[var(--text-secondary)]">{value}/{max}</span>
          <span className="text-[var(--text-muted)]">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}
