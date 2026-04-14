import { useMemo } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { resolveSemanticColor } from '@/lib/token-resolver';
import { checkContrast, type ContrastResult } from '@/lib/contrast';
import { SEMANTIC_COLOR_KEYS, type SemanticColorKey } from '@/types/tokens';
import { camelToLabel } from '@/utils/color';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface AuditIssue {
  type: 'error' | 'warning' | 'pass';
  category: string;
  message: string;
  detail?: string;
}

function useAuditResults() {
  const { config } = useTokenStore();

  return useMemo(() => {
    const issues: AuditIssue[] = [];
    const contrastChecks: { pair: string; fg: string; bg: string; result: ContrastResult }[] = [];

    // 1. Contrast checks
    const contrastPairs: [string, SemanticColorKey, SemanticColorKey][] = [
      ['Text on Background', 'foreground', 'background'],
      ['Text on Surface', 'foreground', 'surface'],
      ['Text on Surface Muted', 'foreground', 'surfaceMuted'],
      ['Primary on Background', 'primary', 'background'],
      ['Primary Foreground on Primary', 'primaryForeground', 'primary'],
      ['Secondary Foreground on Secondary', 'secondaryForeground', 'secondary'],
    ];

    for (const [label, fgKey, bgKey] of contrastPairs) {
      const fg = resolveSemanticColor(config, fgKey, 'light');
      const bg = resolveSemanticColor(config, bgKey, 'light');
      const result = checkContrast(fg, bg);
      contrastChecks.push({ pair: label, fg, bg, result });

      if (result.normalText === 'fail' && result.largeText === 'fail') {
        issues.push({
          type: 'error',
          category: 'Contrast',
          message: `${label}: ratio ${result.ratio.toFixed(2)}:1 — fails WCAG AA for all text.`,
          detail: 'Minimum 4.5:1 for normal text, 3:1 for large text (18px+ or 14px bold).',
        });
      } else if (result.normalText === 'fail') {
        issues.push({
          type: 'warning',
          category: 'Contrast',
          message: `${label}: ratio ${result.ratio.toFixed(2)}:1 — passes for large text only (AA).`,
          detail: 'Consider increasing contrast to at least 4.5:1 for normal-sized text.',
        });
      } else {
        issues.push({
          type: 'pass',
          category: 'Contrast',
          message: `${label}: ratio ${result.ratio.toFixed(2)}:1 — ${result.label}.`,
        });
      }
    }

    // 2. Missing primitives referenced by semantic tokens
    for (const key of SEMANTIC_COLOR_KEYS) {
      const token = config.semantic[key];
      if (!config.primitives.colors[token.light]) {
        issues.push({
          type: 'error',
          category: 'Missing Reference',
          message: `Semantic token "${camelToLabel(key)}" (light) references primitive "${token.light}" which does not exist.`,
          detail: 'Add this color to your palette or update the mapping.',
        });
      }
      if (!config.primitives.colors[token.dark]) {
        issues.push({
          type: 'error',
          category: 'Missing Reference',
          message: `Semantic token "${camelToLabel(key)}" (dark) references primitive "${token.dark}" which does not exist.`,
          detail: 'Add this color to your palette or update the mapping.',
        });
      }
    }

    // 3. Unused primitives
    const usedPrimitives = new Set<string>();
    for (const key of SEMANTIC_COLOR_KEYS) {
      usedPrimitives.add(config.semantic[key].light);
      usedPrimitives.add(config.semantic[key].dark);
    }
    const unusedPrimitives = Object.keys(config.primitives.colors).filter(
      (k) => !usedPrimitives.has(k)
    );
    if (unusedPrimitives.length > 0) {
      issues.push({
        type: 'warning',
        category: 'Unused Colors',
        message: `${unusedPrimitives.length} palette color(s) are not referenced by any semantic token.`,
        detail: unusedPrimitives.join(', '),
      });
    }

    const errorCount = issues.filter((i) => i.type === 'error').length;
    const warningCount = issues.filter((i) => i.type === 'warning').length;
    const passCount = issues.filter((i) => i.type === 'pass').length;

    return { issues, contrastChecks, errorCount, warningCount, passCount };
  }, [config]);
}

function StatusIcon({ type }: { type: AuditIssue['type'] }) {
  switch (type) {
    case 'pass':
      return <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />;
    case 'error':
      return <XCircle className="h-4 w-4 shrink-0 text-red-500" />;
  }
}

export function AuditPanel() {
  const { issues, errorCount, warningCount, passCount } = useAuditResults();

  return (
    <SectionPanel>
      <SectionHeader
        title="Audit"
        description="Automated checks for accessibility and consistency. Fix issues to ensure your design system is usable by everyone."
      />

      {/* Summary */}
      <div className="mb-6 flex gap-4">
        <div className="rounded-md border border-border bg-card px-4 py-3 text-center">
          <p className="text-2xl font-bold text-green-600">{passCount}</p>
          <p className="text-xs text-muted-foreground">Passing</p>
        </div>
        <div className="rounded-md border border-border bg-card px-4 py-3 text-center">
          <p className="text-2xl font-bold text-amber-500">{warningCount}</p>
          <p className="text-xs text-muted-foreground">Warnings</p>
        </div>
        <div className="rounded-md border border-border bg-card px-4 py-3 text-center">
          <p className="text-2xl font-bold text-red-500">{errorCount}</p>
          <p className="text-xs text-muted-foreground">Errors</p>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-6 rounded-md border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
        <p className="mb-1 font-medium text-foreground">What does this check?</p>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>Contrast</strong> — Ensures text is readable. WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18px+ or 14px bold).</li>
          <li><strong>Missing references</strong> — Detects semantic tokens pointing to nonexistent palette colors.</li>
          <li><strong>Unused colors</strong> — Flags palette colors not used by any semantic token.</li>
        </ul>
      </div>

      {/* Issues list */}
      <div className="space-y-2">
        {issues.map((issue, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-md border border-border p-3"
          >
            <StatusIcon type={issue.type} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">{issue.message}</p>
              {issue.detail && (
                <p className="mt-0.5 text-xs text-muted-foreground">{issue.detail}</p>
              )}
            </div>
            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {issue.category}
            </span>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
