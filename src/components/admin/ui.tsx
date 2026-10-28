import type { ReactNode } from 'react';
import { iconKeys, gradientPresets, renderIcon } from '../../data/icons';

// Shared, lightweight form primitives for the admin editors. Styled to match
// the portfolio's dark glass theme.

export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="text-xs text-theme-muted mb-1.5 block">{label}</span>
    {children}
  </label>
);

const inputClass =
  'w-full px-3 py-2 rounded-lg bg-white/5 border border-theme-cardBorder text-white text-sm placeholder-theme-muted/50 focus:outline-none focus:border-theme-purple/50 focus:ring-1 focus:ring-theme-purple/30 transition-all';

export const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={inputClass} />
);

export const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`${inputClass} resize-y`} />
);

// Comma-separated list helper for tags / string arrays.
export const TagsInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) => (
  <input
    className={inputClass}
    value={value.join(', ')}
    placeholder={placeholder ?? 'tag1, tag2, tag3'}
    onChange={(e) =>
      onChange(
        e.target.value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      )
    }
  />
);

export const IconPicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (key: string) => void;
}) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-theme-purple/10 text-theme-purple shrink-0">
      {renderIcon(value, 18)}
    </div>
    <select
      className={inputClass}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {iconKeys.map((k) => (
        <option key={k} value={k} className="bg-theme-bg">
          {k}
        </option>
      ))}
    </select>
  </div>
);

export const GradientPicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (g: string) => void;
}) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${value} shrink-0`} />
    <select
      className={inputClass}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {gradientPresets.map((g) => (
        <option key={g} value={g} className="bg-theme-bg">
          {g}
        </option>
      ))}
    </select>
  </div>
);

export const Btn = ({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
}) => {
  const styles = {
    primary:
      'bg-gradient-primary text-white hover:opacity-90 hover:shadow-lg hover:shadow-theme-purple/25',
    ghost:
      'bg-white/5 text-theme-muted border border-theme-cardBorder hover:text-white hover:border-theme-purple/40',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
  }[variant];
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 ${styles} ${props.className ?? ''}`}
    >
      {children}
    </button>
  );
};

export const Card = ({ children }: { children: ReactNode }) => (
  <div className="glass rounded-xl p-5 border border-theme-cardBorder">{children}</div>
);

export const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    {subtitle && <p className="text-theme-muted text-sm mt-1">{subtitle}</p>}
  </div>
);
