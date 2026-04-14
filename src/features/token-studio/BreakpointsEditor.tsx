import { useCallback } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { Input } from '@/components/ui/input';

export function BreakpointsEditor() {
  const { config, updateConfig } = useTokenStore();

  const update = useCallback(
    (key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          breakpoints: { ...prev.primitives.breakpoints, [key]: value },
        },
      }));
    },
    [updateConfig]
  );

  return (
    <SectionPanel>
      <SectionHeader
        title="Breakpoints"
        description="Responsive breakpoints for media queries. Values are minimum widths."
      />
      <div className="divide-y divide-border rounded-lg border border-border">
        {Object.entries(config.primitives.breakpoints).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4 px-4 py-2.5">
            <span className="w-12 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
            <Input
              value={value}
              onChange={(e) => update(key, e.target.value)}
              className="w-28 text-xs"
            />
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
