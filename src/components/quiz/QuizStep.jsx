import { motion, AnimatePresence } from 'framer-motion';

const microCopy = [
  "Let's get to know you. This helps us match you with the right countries.",
  "Education matters for immigration points. Be accurate — it directly affects your score.",
  "Work experience is one of the biggest factors in immigration scoring. Don't undersell yourself.",
  "Language scores can make or break your application. Be honest — we'll show you exactly what to do.",
  "Financial proof is the #1 reason Nigerian visa applications get rejected. Be honest — we'll show you exactly what to do.",
  "Documents ready = faster processing. Missing documents = months of delays.",
  "Almost done! Let's find your best country match and pathway.",
];

export default function QuizStep({ step, direction, children }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        <p className="text-sm text-[var(--accent)]/80 italic mb-6 leading-relaxed">
          {microCopy[step]}
        </p>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
