import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { TokenConfig } from '@/types/tokens';
import { tokenConfigSchema } from '@/types/tokens';
import { defaultConfig } from '@/data/defaults';
import { saveConfig, loadConfig } from '@/lib/storage';

interface TokenStoreContextValue {
  config: TokenConfig;
  setConfig: (config: TokenConfig) => void;
  updateConfig: (updater: (prev: TokenConfig) => TokenConfig) => void;
  importConfig: (json: string) => { success: boolean; error?: string };
  resetConfig: () => void;
  loadError: string | null;
}

const TokenStoreContext = createContext<TokenStoreContextValue | null>(null);

export function TokenStoreProvider({ children }: { children: ReactNode }) {
  const [loadError, setLoadError] = useState<string | null>(null);

  const [config, setConfigState] = useState<TokenConfig>(() => {
    const saved = loadConfig();
    if (saved) return saved;
    try {
      const raw = localStorage.getItem('token-studio-config');
      if (raw) setLoadError('Saved configuration was invalid and has been reset to defaults.');
    } catch {
      // ignore
    }
    return { ...defaultConfig, meta: { ...defaultConfig.meta, updatedAt: new Date().toISOString() } };
  });

  useEffect(() => {
    const timer = setTimeout(() => saveConfig(config), 500);
    return () => clearTimeout(timer);
  }, [config]);

  const updateConfig = useCallback((updater: (prev: TokenConfig) => TokenConfig) => {
    setConfigState((prev) => {
      const next = updater(prev);
      return { ...next, meta: { ...next.meta, updatedAt: new Date().toISOString() } };
    });
  }, []);

  const setConfig = useCallback((newConfig: TokenConfig) => {
    setConfigState({
      ...newConfig,
      meta: { ...newConfig.meta, updatedAt: new Date().toISOString() },
    });
  }, []);

  const importConfig = useCallback(
    (json: string): { success: boolean; error?: string } => {
      try {
        const parsed: unknown = JSON.parse(json);
        const result = tokenConfigSchema.safeParse(parsed);
        if (!result.success) {
          const firstIssue = result.error.issues[0];
          return {
            success: false,
            error: `Invalid configuration: ${firstIssue?.path.join('.')} — ${firstIssue?.message}`,
          };
        }
        setConfigState(result.data);
        return { success: true };
      } catch {
        return { success: false, error: 'Invalid JSON format. Please check the file contents.' };
      }
    },
    []
  );

  const resetConfig = useCallback(() => {
    setConfigState({
      ...defaultConfig,
      meta: { ...defaultConfig.meta, updatedAt: new Date().toISOString() },
    });
    setLoadError(null);
  }, []);

  const value = useMemo(
    () => ({ config, setConfig, updateConfig, importConfig, resetConfig, loadError }),
    [config, setConfig, updateConfig, importConfig, resetConfig, loadError]
  );

  return <TokenStoreContext.Provider value={value}>{children}</TokenStoreContext.Provider>;
}

export function useTokenStore(): TokenStoreContextValue {
  const ctx = useContext(TokenStoreContext);
  if (!ctx) throw new Error('useTokenStore must be used within TokenStoreProvider');
  return ctx;
}
