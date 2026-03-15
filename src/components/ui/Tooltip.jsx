import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Tooltip({ children, content, className = '' }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2
              bg-[var(--surface-2)] border border-[var(--border)] rounded-lg text-sm
              text-[var(--text-secondary)] whitespace-nowrap z-50 shadow-lg"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
