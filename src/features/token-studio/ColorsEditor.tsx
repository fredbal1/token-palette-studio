import { useCallback } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { FieldRow } from '@/components/editors/FieldRow';
import { ColorInput } from '@/components/editors/ColorInput';
import { SEMANTIC_COLOR_KEYS, type SemanticColorKey } from '@/types/tokens';
import { camelToLabel } from '@/utils/color';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function ColorsEditor() {
  const { config, updateConfig } = useTokenStore();
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#000000');

  const updatePrimitiveColor = useCallback(
    (key: string, value: string) => {
      updateConfig((prev) => ({
        ...prev,
        primitives: {
          ...prev.primitives,
          colors: { ...prev.primitives.colors, [key]: value },
        },
      }));
    },
    [updateConfig]
  );

  const removePrimitiveColor = useCallback(
    (key: string) => {
      updateConfig((prev) => {
        const colors = { ...prev.primitives.colors };
        delete colors[key];
        return { ...prev, primitives: { ...prev.primitives, colors } };
      });
    },
    [updateConfig]
  );

  const addPrimitiveColor = useCallback(() => {
    const name = newColorName.trim().toLowerCase().replace(/\s+/g, '-');
    if (!name) return;
    updateConfig((prev) => ({
      ...prev,
      primitives: {
        ...prev.primitives,
        colors: { ...prev.primitives.colors, [name]: newColorValue },
      },
    }));
    setNewColorName('');
    setNewColorValue('#000000');
  }, [newColorName, newColorValue, updateConfig]);

  const updateSemanticMapping = useCallback(
    (key: SemanticColorKey, mode: 'light' | 'dark', primitiveKey: string) => {
      updateConfig((prev) => ({
        ...prev,
        semantic: {
          ...prev.semantic,
          [key]: { ...prev.semantic[key], [mode]: primitiveKey },
        },
      }));
    },
    [updateConfig]
  );

  const primitiveKeys = Object.keys(config.primitives.colors);

  return (
    <SectionPanel>
      <SectionHeader
        title="Colors"
        description="Define your raw color palette (primitives) and map them to semantic roles."
      />

      {/* Primitives */}
      <section className="mb-8">
        <h2 className="mb-1 text-sm font-semibold text-foreground">Palette (Primitives)</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          These are the raw color values. Semantic tokens below reference them by name.
        </p>
        <div className="space-y-0 divide-y divide-border rounded-lg border border-border">
          {Object.entries(config.primitives.colors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-28 shrink-0 truncate text-xs font-mono text-muted-foreground">
                {key}
              </span>
              <ColorInput value={value} onChange={(v) => updatePrimitiveColor(key, v)} />
              <button
                type="button"
                onClick={() => removePrimitiveColor(key)}
                className="ml-auto rounded p-1 text-muted-foreground hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Remove ${key}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        {/* Add color */}
        <div className="mt-3 flex items-center gap-2">
          <Input
            placeholder="color-name"
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
            className="w-40 text-xs"
          />
          <ColorInput value={newColorValue} onChange={setNewColorValue} />
          <Button size="sm" variant="outline" onClick={addPrimitiveColor} disabled={!newColorName.trim()}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </section>

      {/* Semantic Mapping */}
      <section>
        <h2 className="mb-1 text-sm font-semibold text-foreground">Semantic Mapping</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Semantic tokens give meaning to colors. Each one references a palette color for light and dark modes.
        </p>
        <div className="space-y-0 divide-y divide-border rounded-lg border border-border">
          {SEMANTIC_COLOR_KEYS.map((key) => {
            const token = config.semantic[key];
            return (
              <div key={key} className="flex flex-wrap items-center gap-4 px-4 py-3">
                <span className="w-36 shrink-0 text-sm font-medium text-foreground">
                  {camelToLabel(key)}
                </span>
                <FieldRow label="Light" htmlFor={`sem-${key}-light`} hint="">
                  <select
                    id={`sem-${key}-light`}
                    value={token.light}
                    onChange={(e) => updateSemanticMapping(key, 'light', e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {primitiveKeys.map((pk) => (
                      <option key={pk} value={pk}>{pk}</option>
                    ))}
                  </select>
                </FieldRow>
                <FieldRow label="Dark" htmlFor={`sem-${key}-dark`} hint="">
                  <select
                    id={`sem-${key}-dark`}
                    value={token.dark}
                    onChange={(e) => updateSemanticMapping(key, 'dark', e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {primitiveKeys.map((pk) => (
                      <option key={pk} value={pk}>{pk}</option>
                    ))}
                  </select>
                </FieldRow>
                {/* Swatch preview */}
                <span
                  className="h-6 w-6 rounded border border-border"
                  style={{ backgroundColor: config.primitives.colors[token.light] ?? '#FF00FF' }}
                  title={`Light: ${token.light}`}
                />
              </div>
            );
          })}
        </div>
      </section>
    </SectionPanel>
  );
}
