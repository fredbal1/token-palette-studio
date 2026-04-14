import { useCallback } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { Input } from '@/components/ui/input';

export function RadiiEditor() {
  const { config, updateConfig } = useTokenStore();

  const update = useCallback(
    (key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          radii: { ...prev.primitives.radii, [key]: value },
        },
      }));
    },
    [updateConfig]
  );

  return (
    <SectionPanel>
      <SectionHeader
        title="Border Radius"
        description="Control the roundness of UI elements like buttons, cards, and inputs."
      />
      <div className="divide-y divide-border rounded-lg border border-border">
        {Object.entries(config.primitives.radii).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4 px-4 py-2.5">
            <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
            <Input
              value={value}
              onChange={(e) => update(key, e.target.value)}
              className="w-28 text-xs"
            />
            <div
              className="h-10 w-10 shrink-0 border-2 border-primary bg-primary/10"
              style={{ borderRadius: value }}
            />
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
