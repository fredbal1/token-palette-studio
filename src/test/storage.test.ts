import { describe, it, expect, beforeEach } from 'vitest';
import { saveConfig, loadConfig, clearConfig } from '@/lib/storage';
import { defaultConfig } from '@/data/defaults';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads config correctly', () => {
    saveConfig(defaultConfig);
    const loaded = loadConfig();
    expect(loaded).not.toBeNull();
    expect(loaded?.meta.name).toBe(defaultConfig.meta.name);
  });

  it('returns null when storage is empty', () => {
    expect(loadConfig()).toBeNull();
  });

  it('returns null for corrupted data', () => {
    localStorage.setItem('token-studio-config', '{invalid json!!!}');
    expect(loadConfig()).toBeNull();
  });

  it('returns null for valid JSON but invalid schema', () => {
    localStorage.setItem('token-studio-config', JSON.stringify({ foo: 'bar' }));
    expect(loadConfig()).toBeNull();
  });

  it('clears config', () => {
    saveConfig(defaultConfig);
    clearConfig();
    expect(loadConfig()).toBeNull();
  });
});
