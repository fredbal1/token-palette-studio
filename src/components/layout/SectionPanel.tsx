import type { ReactNode } from 'react';

interface SectionPanelProps {
  children: ReactNode;
}

export function SectionPanel({ children }: SectionPanelProps) {
  return (
    <div className="mx-auto w-full max-w-4xl p-6 lg:p-8">
      {children}
    </div>
  );
}
