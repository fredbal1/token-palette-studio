import type { TokenConfig, SemanticColorKey } from '@/types/tokens';
import { SEMANTIC_COLOR_KEYS } from '@/types/tokens';

const FALLBACK_COLOR = '#FF00FF';

export function resolveSemanticColor(
  config: TokenConfig,
  key: SemanticColorKey,
  mode: 'light' | 'dark' = 'light'
): string {
  const token = config.semantic[key];
  const primitiveKey = token[mode];
  return config.primitives.colors[primitiveKey] ?? FALLBACK_COLOR;
}

export function generatePreviewCssVars(
  config: TokenConfig,
  mode: 'light' | 'dark' = 'light'
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const key of SEMANTIC_COLOR_KEYS) {
    const kebab = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    vars[`--preview-${kebab}`] = resolveSemanticColor(config, key, mode);
  }

  for (const [key, value] of Object.entries(config.primitives.spacing)) {
    vars[`--preview-spacing-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.radii)) {
    vars[`--preview-radius-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.shadows)) {
    vars[`--preview-shadow-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.typography.fontFamilies)) {
    vars[`--preview-font-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.typography.fontSizes)) {
    vars[`--preview-text-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.typography.fontWeights)) {
    vars[`--preview-font-weight-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.typography.lineHeights)) {
    vars[`--preview-leading-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.motion.durations)) {
    vars[`--preview-duration-${key}`] = value;
  }
  for (const [key, value] of Object.entries(config.primitives.motion.easings)) {
    vars[`--preview-ease-${key}`] = value;
  }

  const btn = config.components.button;
  vars['--preview-btn-bg'] = resolveSemanticColor(config, btn.background, mode);
  vars['--preview-btn-fg'] = resolveSemanticColor(config, btn.foreground, mode);
  vars['--preview-btn-border'] = resolveSemanticColor(config, btn.border, mode);
  vars['--preview-btn-radius'] = config.primitives.radii[btn.radius] ?? '0.375rem';
  vars['--preview-btn-px'] = config.primitives.spacing[btn.paddingX] ?? '1rem';
  vars['--preview-btn-py'] = config.primitives.spacing[btn.paddingY] ?? '0.5rem';
  vars['--preview-btn-font-size'] = config.primitives.typography.fontSizes[btn.fontSize] ?? '0.875rem';

  const inp = config.components.input;
  vars['--preview-input-bg'] = resolveSemanticColor(config, inp.background, mode);
  vars['--preview-input-fg'] = resolveSemanticColor(config, inp.foreground, mode);
  vars['--preview-input-border'] = resolveSemanticColor(config, inp.border, mode);
  vars['--preview-input-radius'] = config.primitives.radii[inp.radius] ?? '0.375rem';
  vars['--preview-input-px'] = config.primitives.spacing[inp.paddingX] ?? '0.75rem';
  vars['--preview-input-py'] = config.primitives.spacing[inp.paddingY] ?? '0.5rem';

  const crd = config.components.card;
  vars['--preview-card-bg'] = resolveSemanticColor(config, crd.background, mode);
  vars['--preview-card-fg'] = resolveSemanticColor(config, crd.foreground, mode);
  vars['--preview-card-border'] = resolveSemanticColor(config, crd.border, mode);
  vars['--preview-card-radius'] = config.primitives.radii[crd.radius] ?? '0.5rem';
  vars['--preview-card-shadow'] = config.primitives.shadows[crd.shadow] ?? 'none';
  vars['--preview-card-padding'] = config.primitives.spacing[crd.padding] ?? '1.5rem';

  const bdg = config.components.badge;
  vars['--preview-badge-bg'] = resolveSemanticColor(config, bdg.background, mode);
  vars['--preview-badge-fg'] = resolveSemanticColor(config, bdg.foreground, mode);
  vars['--preview-badge-radius'] = config.primitives.radii[bdg.radius] ?? '9999px';
  vars['--preview-badge-px'] = config.primitives.spacing[bdg.paddingX] ?? '0.625rem';
  vars['--preview-badge-py'] = config.primitives.spacing[bdg.paddingY] ?? '0.125rem';

  const focus = config.components.focusRing;
  vars['--preview-focus-color'] = resolveSemanticColor(config, focus.color, mode);
  vars['--preview-focus-width'] = focus.width + 'px';
  vars['--preview-focus-offset'] = focus.offset + 'px';

  return vars;
}
