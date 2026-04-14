import { useCallback } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { Input } from '@/components/ui/input';

export function SpacingEditor() {
  const { config, updateConfig } = useTokenStore();

  const update = useCallback(
    (key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          spacing: { ...prev.primitives.spacing, [key]: value },
        },
      }));
    },
    [updateConfig]
  );

  return (
    <SectionPanel>
      <SectionHeader
        title="Spacing"
        description="Define the spacing scale used for padding, margin, and gaps."
      />
      <p className="mb-4 text-xs text-muted-foreground">
        Spacing tokens create consistent rhythm. Use rem or px values.
      </p>
      <div className="divide-y divide-border rounded-lg border border-border">
        {Object.entries(config.primitives.spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4 px-4 py-2.5">
            <span className="w-12 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
            <Input
              value={value}
              onChange={(e) => update(key, e.target.value)}
              className="w-28 text-xs"
            />
            <div
              className="h-4 rounded bg-primary/30"
              style={{ width: value }}
              title={value}
            />
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
