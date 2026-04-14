import { useMemo, useState, useCallback, useRef } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { generateGlobalsCss } from '@/lib/export-css';
import { generateExportJson, downloadJson, downloadCss } from '@/lib/export-json';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';
import { Button } from '@/components/ui/button';
import { Copy, Download, Check, Upload } from 'lucide-react';

type Tab = 'css' | 'json';

export function ExportPanel() {
  const { config, importConfig } = useTokenStore();
  const [tab, setTab] = useState<Tab>('css');
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const css = useMemo(() => generateGlobalsCss(config), [config]);
  const json = useMemo(() => generateExportJson(config), [config]);

  const content = tab === 'css' ? css : json;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  const handleDownload = useCallback(() => {
    if (tab === 'css') {
      downloadCss(css, config.meta.name);
    } else {
      downloadJson(config);
    }
  }, [tab, css, config]);

  const handleImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImportError(null);
      setImportSuccess(false);
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = importConfig(reader.result as string);
        if (result.success) {
          setImportSuccess(true);
          setTimeout(() => setImportSuccess(false), 3000);
        } else {
          setImportError(result.error ?? 'Unknown error');
        }
      };
      reader.readAsText(file);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [importConfig]
  );

  return (
    <SectionPanel>
      <SectionHeader
        title="Export"
        description="Copy or download your tokens. CSS is derived from the JSON source of truth."
      />

      <p className="mb-4 text-xs text-muted-foreground">
        <strong>globals.css</strong> — Drop this into your Tailwind v4 project. It uses <code>@theme</code> for token variables.
        <br />
        <strong>JSON</strong> — The full configuration. Use it to restore or share your theme.
      </p>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg border border-border p-1" role="tablist">
        {(['css', 'json'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              tab === t
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'css' ? 'globals.css' : 'JSON'}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="mb-3 flex gap-2">
        <Button size="sm" variant="outline" onClick={handleCopy}>
          {copied ? <Check className="mr-1 h-3.5 w-3.5" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button size="sm" variant="outline" onClick={handleDownload}>
          <Download className="mr-1 h-3.5 w-3.5" />
          Download
        </Button>
      </div>

      {/* Code block */}
      <div className="relative max-h-[60vh] overflow-auto rounded-lg border border-border bg-muted/50">
        <pre className="p-4 text-xs leading-relaxed text-foreground">
          <code>{content}</code>
        </pre>
      </div>

      {/* Import */}
      <div className="mt-8 border-t border-border pt-6">
        <h2 className="mb-2 text-sm font-semibold text-foreground">Import JSON</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Upload a previously exported JSON file to restore a theme. The file is validated before applying.
        </p>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-1 h-3.5 w-3.5" />
            Choose File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="sr-only"
            aria-label="Import JSON configuration"
          />
        </div>
        {importError && (
          <div role="alert" className="mt-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
            {importError}
          </div>
        )}
        {importSuccess && (
          <div role="status" className="mt-3 rounded-md border border-green-500/50 bg-green-500/10 p-3 text-xs text-green-700">
            Configuration imported successfully!
          </div>
        )}
      </div>
    </SectionPanel>
  );
}
