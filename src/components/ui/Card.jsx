import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = false, glow = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`
        bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6
        ${glow ? 'glow-green' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
