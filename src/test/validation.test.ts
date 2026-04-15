import { describe, it, expect } from 'vitest';
import { tokenConfigSchema } from '@/types/tokens';
import { defaultConfig } from '@/data/defaults';
import { presets } from '@/data/presets';

describe('tokenConfigSchema', () => {
  it('validates the default config', () => {
    const result = tokenConfigSchema.safeParse(defaultConfig);
    expect(result.success).toBe(true);
  });

  it('validates all presets', () => {
    for (const preset of presets) {
      const result = tokenConfigSchema.safeParse(preset.config);
      expect(result.success).toBe(true);
    }
  });

  it('rejects config with missing meta name', () => {
    const bad = { ...defaultConfig, meta: { ...defaultConfig.meta, name: '' } };
    const result = tokenConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it('rejects config with broken semantic reference', () => {
    const bad = {
      ...defaultConfig,
      semantic: {
        ...defaultConfig.semantic,
        primary: { light: 'nonexistent-color', dark: 'blue-400' },
      },
    };
    const result = tokenConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('nonexistent-color');
    }
  });

  it('rejects config with invalid component semantic key', () => {
    const bad = {
      ...defaultConfig,
      components: {
        ...defaultConfig.components,
        button: { ...defaultConfig.components.button, background: 'notASemanticKey' },
      },
    };
    const result = tokenConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it('rejects config with broken component spacing reference', () => {
    const bad = {
      ...defaultConfig,
      components: {
        ...defaultConfig.components,
        button: { ...defaultConfig.components.button, paddingX: 'nonexistent' },
      },
    };
    const result = tokenConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it('rejects completely invalid JSON shape', () => {
    const result = tokenConfigSchema.safeParse({ foo: 'bar' });
    expect(result.success).toBe(false);
  });

  it('rejects null', () => {
    const result = tokenConfigSchema.safeParse(null);
    expect(result.success).toBe(false);
  });
});
