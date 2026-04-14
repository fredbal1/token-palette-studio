import { useCallback } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { Input } from '@/components/ui/input';

export function ShadowsEditor() {
  const { config, updateConfig } = useTokenStore();

  const update = useCallback(
    (key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          shadows: { ...prev.primitives.shadows, [key]: value },
        },
      }));
    },
    [updateConfig]
  );

  return (
    <SectionPanel>
      <SectionHeader
        title="Shadows"
        description="Define elevation levels with box-shadow values."
      />
      <p className="mb-4 text-xs text-muted-foreground">
        Shadows provide depth cues. Use standard CSS box-shadow syntax.
      </p>
      <div className="space-y-4">
        {Object.entries(config.primitives.shadows).map(([key, value]) => (
          <div key={key} className="flex items-start gap-4">
            <div className="w-36 shrink-0">
              <span className="text-xs font-mono text-muted-foreground">{key}</span>
              <Input
                value={value}
                onChange={(e) => update(key, e.target.value)}
                className="mt-1 text-xs"
              />
            </div>
            <div
              className="h-16 w-32 rounded-md border border-border bg-card"
              style={{ boxShadow: value }}
            />
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
