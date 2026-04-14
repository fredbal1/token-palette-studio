import { useCallback } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { Input } from '@/components/ui/input';

export function MotionEditor() {
  const { config, updateConfig } = useTokenStore();

  const updateDuration = useCallback(
    (key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          motion: {
            ...prev.primitives.motion,
            durations: { ...prev.primitives.motion.durations, [key]: value },
          },
        },
      }));
    },
    [updateConfig]
  );

  const updateEasing = useCallback(
    (key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          motion: {
            ...prev.primitives.motion,
            easings: { ...prev.primitives.motion.easings, [key]: value },
          },
        },
      }));
    },
    [updateConfig]
  );

  return (
    <SectionPanel>
      <SectionHeader
        title="Motion"
        description="Define animation durations and easing curves for transitions."
      />

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Durations</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          How long transitions take. Use ms units (e.g., 200ms).
        </p>
        <div className="divide-y divide-border rounded-lg border border-border">
          {Object.entries(config.primitives.motion.durations).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 px-4 py-2.5">
              <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
              <Input
                value={value}
                onChange={(e) => updateDuration(key, e.target.value)}
                className="w-28 text-xs"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Easings</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Easing functions control the acceleration curve of animations.
        </p>
        <div className="divide-y divide-border rounded-lg border border-border">
          {Object.entries(config.primitives.motion.easings).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 px-4 py-2.5">
              <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
              <Input
                value={value}
                onChange={(e) => updateEasing(key, e.target.value)}
                className="w-28 text-xs font-mono"
              />
            </div>
          ))}
        </div>
      </section>
    </SectionPanel>
  );
}
