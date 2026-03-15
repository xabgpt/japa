import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ label, options = [], error, placeholder = 'Select...', className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-[var(--text-secondary)] font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl appearance-none cursor-pointer
            bg-[var(--surface-2)] text-[var(--text-primary)]
            border border-[var(--border)]
            outline-none transition-all duration-200
            focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
            ${error ? 'border-[var(--accent-danger)]' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled className="text-[var(--text-muted)]">
            {placeholder}
          </option>
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const label = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={value} value={value} className="bg-[var(--surface-2)]">
                {label}
              </option>
            );
          })}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
      </div>
      {error && (
        <span className="text-xs text-[var(--accent-danger)]">{error}</span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
