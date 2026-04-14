import type { TokenConfig } from '@/types/tokens';
import { defaultConfig } from './defaults';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};

function deepMerge<T extends Record<string, unknown>>(base: T, override: DeepPartial<T>): T {
  const result = { ...base } as Record<string, unknown>;
  for (const key in override) {
    const baseVal = base[key];
    const overVal = override[key];
    if (
      overVal !== undefined &&
      typeof overVal === 'object' &&
      overVal !== null &&
      !Array.isArray(overVal) &&
      typeof baseVal === 'object' &&
      baseVal !== null
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overVal as Record<string, unknown>
      );
    } else if (overVal !== undefined) {
      result[key] = overVal;
    }
  }
  return result as T;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: TokenConfig;
}

const minimalConfig: TokenConfig = {
  ...defaultConfig,
  meta: { ...defaultConfig.meta, name: 'Minimal' },
};

const saasConfig: TokenConfig = deepMerge(defaultConfig, {
  meta: { name: 'SaaS', version: '1.0.0', author: '', updatedAt: new Date().toISOString() },
  primitives: {
    colors: {
      ...defaultConfig.primitives.colors,
      'indigo-400': '#818CF8',
      'indigo-500': '#6366F1',
      'indigo-600': '#4F46E5',
      'indigo-700': '#4338CA',
      'slate-50': '#F8FAFC',
      'slate-100': '#F1F5F9',
      'slate-200': '#E2E8F0',
      'slate-700': '#334155',
      'slate-800': '#1E293B',
      'slate-900': '#0F172A',
      'slate-950': '#020617',
    },
  },
  semantic: {
    background: { light: 'white', dark: 'slate-950' },
    foreground: { light: 'slate-900', dark: 'slate-50' },
    surface: { light: 'slate-50', dark: 'slate-900' },
    surfaceMuted: { light: 'slate-100', dark: 'slate-800' },
    border: { light: 'slate-200', dark: 'slate-700' },
    primary: { light: 'indigo-600', dark: 'indigo-400' },
    primaryForeground: { light: 'white', dark: 'slate-950' },
    secondary: { light: 'slate-100', dark: 'slate-800' },
    secondaryForeground: { light: 'slate-900', dark: 'slate-100' },
    success: { light: 'green-600', dark: 'green-500' },
    warning: { light: 'amber-600', dark: 'amber-500' },
    danger: { light: 'red-600', dark: 'red-500' },
  },
}) as TokenConfig;

const darkConfig: TokenConfig = deepMerge(defaultConfig, {
  meta: { name: 'Dark', version: '1.0.0', author: '', updatedAt: new Date().toISOString() },
  primitives: {
    colors: {
      ...defaultConfig.primitives.colors,
      'cyan-400': '#22D3EE',
      'cyan-500': '#06B6D4',
      'cyan-600': '#0891B2',
      'zinc-50': '#FAFAFA',
      'zinc-100': '#F4F4F5',
      'zinc-200': '#E4E4E7',
      'zinc-700': '#3F3F46',
      'zinc-800': '#27272A',
      'zinc-900': '#18181B',
      'zinc-950': '#09090B',
    },
  },
  semantic: {
    background: { light: 'zinc-950', dark: 'zinc-50' },
    foreground: { light: 'zinc-50', dark: 'zinc-900' },
    surface: { light: 'zinc-900', dark: 'zinc-100' },
    surfaceMuted: { light: 'zinc-800', dark: 'zinc-200' },
    border: { light: 'zinc-700', dark: 'zinc-200' },
    primary: { light: 'cyan-500', dark: 'cyan-400' },
    primaryForeground: { light: 'zinc-950', dark: 'zinc-950' },
    secondary: { light: 'zinc-800', dark: 'zinc-100' },
    secondaryForeground: { light: 'zinc-100', dark: 'zinc-900' },
    success: { light: 'green-500', dark: 'green-600' },
    warning: { light: 'amber-500', dark: 'amber-600' },
    danger: { light: 'red-500', dark: 'red-600' },
  },
}) as TokenConfig;

export const presets: Preset[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and neutral. A solid starting point for any project.',
    config: minimalConfig,
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Professional indigo tones. Great for dashboards and web apps.',
    config: saasConfig,
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Dark background with vibrant cyan accents. Modern and bold.',
    config: darkConfig,
  },
];
