import { describe, it, expect } from 'vitest';
import { generateGlobalsCss } from '@/lib/export-css';
import { exportConfigJson } from '@/lib/export-json';
import { defaultConfig } from '@/data/defaults';

describe('export-css', () => {
  it('generates valid CSS with @theme block', () => {
    const css = generateGlobalsCss(defaultConfig);
    expect(css).toContain('@theme {');
    expect(css).toContain('--color-primary');
    expect(css).toContain('--spacing-');
    expect(css).toContain('--radius-');
    expect(css).toContain('--shadow-');
    expect(css).toContain('--font-');
    expect(css).toContain('--duration-');
    expect(css).toContain('--breakpoint-');
  });

  it('generates :root and .dark layers', () => {
    const css = generateGlobalsCss(defaultConfig);
    expect(css).toContain(':root {');
    expect(css).toContain('.dark {');
  });

  it('resolves semantic colors to hex values', () => {
    const css = generateGlobalsCss(defaultConfig);
    // primary light is blue-600 = #2563EB
    expect(css).toContain('#2563EB');
  });
});

describe('export-json', () => {
  it('returns valid JSON string', () => {
    const json = exportConfigJson(defaultConfig);
    const parsed = JSON.parse(json);
    expect(parsed.meta.name).toBe(defaultConfig.meta.name);
  });

  it('round-trips correctly', () => {
    const json = exportConfigJson(defaultConfig);
    const parsed = JSON.parse(json);
    expect(parsed).toEqual(defaultConfig);
  });
});
