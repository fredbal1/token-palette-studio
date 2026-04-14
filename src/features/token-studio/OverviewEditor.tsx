import { useTokenStore } from '@/hooks/useTokenStore';
import { presets } from '@/data/presets';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { Button } from '@/components/ui/button';
import { resolveSemanticColor } from '@/lib/token-resolver';
import { SEMANTIC_COLOR_KEYS } from '@/types/tokens';
import { camelToLabel } from '@/utils/color';
import { RotateCcw } from 'lucide-react';

export function OverviewEditor() {
  const { config, setConfig, resetConfig } = useTokenStore();

  return (
    <SectionPanel>
      <SectionHeader
        title="Overview"
        description="A summary of your current theme. Apply a preset or start from scratch."
      />

      {/* Meta */}
      <div className="mb-8 rounded-lg border border-border bg-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Theme Info</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Name</dt>
          <dd className="text-foreground">{config.meta.name}</dd>
          <dt className="text-muted-foreground">Version</dt>
          <dd className="text-foreground">{config.meta.version}</dd>
          <dt className="text-muted-foreground">Last updated</dt>
          <dd className="text-foreground">{new Date(config.meta.updatedAt).toLocaleString()}</dd>
        </dl>
      </div>

      {/* Presets */}
      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Quick Start — Presets</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Presets replace all current tokens. Pick one as a starting point, then customise.
        </p>
        <div className="flex flex-wrap gap-3">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setConfig(p.config)}
              className="flex flex-col rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="text-sm font-medium text-foreground">{p.name}</span>
              <span className="mt-1 text-xs text-muted-foreground">{p.description}</span>
              {/* Color swatches */}
              <div className="mt-3 flex gap-1">
                {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((k) => (
                  <span
                    key={k}
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: resolveSemanticColor(p.config, k, 'light') }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Semantic Color Summary */}
      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Color Map</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {SEMANTIC_COLOR_KEYS.map((key) => {
            const hex = resolveSemanticColor(config, key, 'light');
            return (
              <div key={key} className="flex items-center gap-2 rounded border border-border p-2">
                <span
                  className="h-6 w-6 shrink-0 rounded border border-border"
                  style={{ backgroundColor: hex }}
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">{camelToLabel(key)}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{hex}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button variant="outline" size="sm" onClick={resetConfig}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Restore Defaults
        </Button>
        <p className="text-xs text-muted-foreground">
          Reset all tokens to the default configuration.
        </p>
      </div>
    </SectionPanel>
  );
}
