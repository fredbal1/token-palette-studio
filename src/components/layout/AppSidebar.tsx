import {
  Palette, Type, Space, Circle, Layers, Zap, Monitor,
  Eye, Download, ShieldCheck, LayoutDashboard,
} from 'lucide-react';
import type { Section } from '@/types/tokens';
import { cn } from '@/lib/utils';

const NAV_ITEMS: { section: Section; label: string; icon: typeof Palette }[] = [
  { section: 'overview', label: 'Overview', icon: LayoutDashboard },
  { section: 'colors', label: 'Colors', icon: Palette },
  { section: 'typography', label: 'Typography', icon: Type },
  { section: 'spacing', label: 'Spacing', icon: Space },
  { section: 'radii', label: 'Radii', icon: Circle },
  { section: 'shadows', label: 'Shadows', icon: Layers },
  { section: 'motion', label: 'Motion', icon: Zap },
  { section: 'breakpoints', label: 'Breakpoints', icon: Monitor },
  { section: 'preview', label: 'Preview', icon: Eye },
  { section: 'export', label: 'Export', icon: Download },
  { section: 'audit', label: 'Audit', icon: ShieldCheck },
];

interface AppSidebarProps {
  current: Section;
  onNavigate: (section: Section) => void;
}

export function AppSidebar({ current, onNavigate }: AppSidebarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="flex w-56 shrink-0 flex-col border-r border-border bg-muted/30"
    >
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <Palette className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold text-foreground">Token Studio</span>
      </div>
      <ul className="flex flex-1 flex-col gap-0.5 p-2" role="list">
        {NAV_ITEMS.map(({ section, label, icon: Icon }) => (
          <li key={section}>
            <button
              type="button"
              onClick={() => onNavigate(section)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                current === section
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
              )}
              aria-current={current === section ? 'page' : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
