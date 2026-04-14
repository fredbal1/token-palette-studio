import type { TokenConfig, SemanticColorKey } from '@/types/tokens';
import { SEMANTIC_COLOR_KEYS } from '@/types/tokens';
import { resolveSemanticColor } from './token-resolver';
import { camelToKebab } from '@/utils/color';

export function generateGlobalsCss(config: TokenConfig): string {
  const lines: string[] = [];
  const { primitives, meta } = config;

  lines.push(`/* Token Studio — ${meta.name} v${meta.version} */`);
  lines.push(`/* Generated: ${new Date().toISOString()} */`);
  lines.push(`/* Source of truth: JSON config. Do not edit manually. */`);
  lines.push('');

  lines.push('@theme {');

  lines.push('  /* Semantic Colors */');
  for (const key of SEMANTIC_COLOR_KEYS) {
    const kebab = camelToKebab(key);
    const lightVal = resolveSemanticColor(config, key as SemanticColorKey, 'light');
    lines.push(`  --color-${kebab}: ${lightVal};`);
  }
  lines.push('');

  lines.push('  /* Spacing */');
  for (const [key, value] of Object.entries(primitives.spacing)) {
    lines.push(`  --spacing-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Border Radius */');
  for (const [key, value] of Object.entries(primitives.radii)) {
    lines.push(`  --radius-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Shadows */');
  for (const [key, value] of Object.entries(primitives.shadows)) {
    lines.push(`  --shadow-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Typography */');
  for (const [key, value] of Object.entries(primitives.typography.fontFamilies)) {
    lines.push(`  --font-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(primitives.typography.fontSizes)) {
    lines.push(`  --font-size-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Motion */');
  for (const [key, value] of Object.entries(primitives.motion.durations)) {
    lines.push(`  --duration-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(primitives.motion.easings)) {
    lines.push(`  --ease-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Breakpoints */');
  for (const [key, value] of Object.entries(primitives.breakpoints)) {
    lines.push(`  --breakpoint-${key}: ${value};`);
  }

  lines.push('}');
  lines.push('');

  lines.push('@layer base {');
  lines.push('  :root {');
  for (const key of SEMANTIC_COLOR_KEYS) {
    const kebab = camelToKebab(key);
    const lightVal = resolveSemanticColor(config, key as SemanticColorKey, 'light');
    lines.push(`    --${kebab}: ${lightVal};`);
  }
  lines.push('  }');
  lines.push('');
  lines.push('  .dark {');
  for (const key of SEMANTIC_COLOR_KEYS) {
    const kebab = camelToKebab(key);
    const darkVal = resolveSemanticColor(config, key as SemanticColorKey, 'dark');
    lines.push(`    --${kebab}: ${darkVal};`);
  }
  lines.push('  }');
  lines.push('}');

  return lines.join('\n');
}
