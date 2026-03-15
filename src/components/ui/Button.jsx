import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-[var(--accent)] text-[var(--primary)] hover:brightness-110',
  secondary: 'bg-[var(--surface-2)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent)]',
  danger: 'bg-[var(--accent-danger)] text-white hover:brightness-110',
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        rounded-full font-semibold cursor-pointer transition-all duration-200
        inline-flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        border-none outline-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
