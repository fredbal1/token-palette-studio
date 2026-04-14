import { useCallback } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { FieldRow } from '@/components/editors/FieldRow';
import { Input } from '@/components/ui/input';

export function TypographyEditor() {
  const { config, updateConfig } = useTokenStore();
  const { fontFamilies, fontSizes, fontWeights, lineHeights } = config.primitives.typography;

  const update = useCallback(
    (group: 'fontFamilies' | 'fontSizes' | 'fontWeights' | 'lineHeights', key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          typography: {
            ...prev.primitives.typography,
            [group]: { ...prev.primitives.typography[group], [key]: value },
          },
        },
      }));
    },
    [updateConfig]
  );

  return (
    <SectionPanel>
      <SectionHeader
        title="Typography"
        description="Configure font families, sizes, weights, and line heights used throughout your design system."
      />

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Font Families</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Define named font stacks. Use CSS font-family syntax with fallbacks.
        </p>
        {Object.entries(fontFamilies).map(([key, value]) => (
          <FieldRow key={key} label={key} htmlFor={`ff-${key}`}>
            <Input
              id={`ff-${key}`}
              value={value}
              onChange={(e) => update('fontFamilies', key, e.target.value)}
              className="text-xs"
            />
          </FieldRow>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Font Sizes</h2>
        <div className="divide-y divide-border rounded-lg border border-border">
          {Object.entries(fontSizes).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 px-4 py-2.5">
              <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
              <Input
                value={value}
                onChange={(e) => update('fontSizes', key, e.target.value)}
                className="w-28 text-xs"
              />
              <span className="text-sm text-foreground" style={{ fontSize: value }}>
                Aa
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Font Weights</h2>
        <div className="divide-y divide-border rounded-lg border border-border">
          {Object.entries(fontWeights).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 px-4 py-2.5">
              <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
              <Input
                value={value}
                onChange={(e) => update('fontWeights', key, e.target.value)}
                className="w-20 text-xs"
              />
              <span className="text-sm text-foreground" style={{ fontWeight: value }}>
                Sample
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Line Heights</h2>
        <div className="divide-y divide-border rounded-lg border border-border">
          {Object.entries(lineHeights).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 px-4 py-2.5">
              <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground">{key}</span>
              <Input
                value={value}
                onChange={(e) => update('lineHeights', key, e.target.value)}
                className="w-20 text-xs"
              />
            </div>
          ))}
        </div>
      </section>
    </SectionPanel>
  );
}
