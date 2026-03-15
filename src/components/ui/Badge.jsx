const colorMap = {
  green: 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30',
  amber: 'bg-[var(--accent-warm)]/15 text-[var(--accent-warm)] border-[var(--accent-warm)]/30',
  red: 'bg-[var(--accent-danger)]/15 text-[var(--accent-danger)] border-[var(--accent-danger)]/30',
  blue: 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border-[var(--accent-blue)]/30',
};

export default function Badge({ children, color = 'green', className = '' }) {
  return (
    <span className={`
      inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border
      ${colorMap[color]}
      ${className}
    `}>
      {children}
    </span>
  );
}
