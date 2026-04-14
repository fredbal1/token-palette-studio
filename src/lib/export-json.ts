import type { TokenConfig } from '@/types/tokens';

export function generateExportJson(config: TokenConfig): string {
  return JSON.stringify(config, null, 2);
}

export function downloadJson(config: TokenConfig): void {
  const json = generateExportJson(config);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${config.meta.name.toLowerCase().replace(/\s+/g, '-')}-tokens.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadCss(css: string, name: string): void {
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.toLowerCase().replace(/\s+/g, '-')}-globals.css`;
  a.click();
  URL.revokeObjectURL(url);
}
