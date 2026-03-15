import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-[var(--text-secondary)] font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-xl
          bg-[var(--surface-2)] text-[var(--text-primary)]
          border border-[var(--border)]
          outline-none transition-all duration-200
          placeholder:text-[var(--text-muted)]
          focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
          ${error ? 'border-[var(--accent-danger)]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-[var(--accent-danger)]">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
