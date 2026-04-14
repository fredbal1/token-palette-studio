import { tokenConfigSchema, type TokenConfig } from '@/types/tokens';

const STORAGE_KEY = 'token-studio-config';

export function saveConfig(config: TokenConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Storage full or unavailable
  }
}

export function loadConfig(): TokenConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const result = tokenConfigSchema.safeParse(parsed);
    if (result.success) return result.data;
    return null;
  } catch {
    return null;
  }
}

export function clearConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silent fail
  }
}
