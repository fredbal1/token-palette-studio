import type { ReactNode } from 'react';

interface FieldRowProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}

export function FieldRow({ label, htmlFor, hint, children }: FieldRowProps) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div className="w-36 shrink-0 pt-2">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
