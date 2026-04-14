import { useState, type ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import type { Section } from '@/types/tokens';

interface AppShellProps {
  children: (section: Section) => ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [section, setSection] = useState<Section>('overview');

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar current={section} onNavigate={setSection} />
      <main className="flex-1 overflow-y-auto">
        {children(section)}
      </main>
    </div>
  );
}
