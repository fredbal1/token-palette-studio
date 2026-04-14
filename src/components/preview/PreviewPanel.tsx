import { useMemo } from 'react';
import { useTokenStore } from '@/hooks/useTokenStore';
import { generatePreviewCssVars } from '@/lib/token-resolver';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { SectionPanel } from '@/components/layout/SectionPanel';

export function PreviewPanel() {
  const { config } = useTokenStore();

  const vars = useMemo(() => generatePreviewCssVars(config, 'light'), [config]);

  return (
    <SectionPanel>
      <SectionHeader
        title="Live Preview"
        description="See how your tokens look on real components. This panel is visually isolated from the app shell."
      />
      <div
        className="rounded-xl border-2 border-dashed border-border p-6"
        style={vars as React.CSSProperties}
      >
        <PreviewContent />
      </div>
    </SectionPanel>
  );
}

function PreviewContent() {
  return (
    <div
      className="space-y-8 rounded-lg p-6"
      style={{
        backgroundColor: 'var(--preview-background)',
        color: 'var(--preview-foreground)',
        fontFamily: 'var(--preview-font-sans)',
      }}
    >
      {/* Typography */}
      <section>
        <h2
          className="mb-3 font-semibold"
          style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Typography
        </h2>
        <h1 style={{ fontSize: 'var(--preview-text-4xl)', fontWeight: 'var(--preview-font-weight-bold)', lineHeight: 'var(--preview-leading-tight)' }}>
          Heading 1
        </h1>
        <h2 style={{ fontSize: 'var(--preview-text-2xl)', fontWeight: 'var(--preview-font-weight-semibold)' }}>
          Heading 2
        </h2>
        <h3 style={{ fontSize: 'var(--preview-text-xl)', fontWeight: 'var(--preview-font-weight-medium)' }}>
          Heading 3
        </h3>
        <p style={{ fontSize: 'var(--preview-text-base)', lineHeight: 'var(--preview-leading-normal)' }}>
          Body text — The quick brown fox jumps over the lazy dog. This demonstrates regular paragraph text with your chosen typography tokens.
        </p>
        <small style={{ fontSize: 'var(--preview-text-xs)' }} className="block opacity-70">
          Small text / caption
        </small>
      </section>

      {/* Buttons */}
      <section>
        <h2
          className="mb-3 font-semibold"
          style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Buttons
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            style={{
              backgroundColor: 'var(--preview-btn-bg)',
              color: 'var(--preview-btn-fg)',
              borderRadius: 'var(--preview-btn-radius)',
              padding: `var(--preview-btn-py) var(--preview-btn-px)`,
              fontSize: 'var(--preview-btn-font-size)',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Primary Button
          </button>
          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--preview-btn-bg)',
              borderRadius: 'var(--preview-btn-radius)',
              padding: `var(--preview-btn-py) var(--preview-btn-px)`,
              fontSize: 'var(--preview-btn-font-size)',
              fontWeight: 500,
              border: `1px solid var(--preview-btn-border)`,
              cursor: 'pointer',
            }}
          >
            Outline
          </button>
          <button
            type="button"
            disabled
            style={{
              backgroundColor: 'var(--preview-btn-bg)',
              color: 'var(--preview-btn-fg)',
              borderRadius: 'var(--preview-btn-radius)',
              padding: `var(--preview-btn-py) var(--preview-btn-px)`,
              fontSize: 'var(--preview-btn-font-size)',
              fontWeight: 500,
              border: 'none',
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            Disabled
          </button>
        </div>
      </section>

      {/* Card */}
      <section>
        <h2
          className="mb-3 font-semibold"
          style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Card
        </h2>
        <div
          style={{
            backgroundColor: 'var(--preview-card-bg)',
            color: 'var(--preview-card-fg)',
            border: `1px solid var(--preview-card-border)`,
            borderRadius: 'var(--preview-card-radius)',
            boxShadow: 'var(--preview-card-shadow)',
            padding: 'var(--preview-card-padding)',
          }}
        >
          <h3 style={{ fontSize: 'var(--preview-text-lg)', fontWeight: 'var(--preview-font-weight-semibold)', marginBottom: '0.5rem' }}>
            Card Title
          </h3>
          <p style={{ fontSize: 'var(--preview-text-sm)', opacity: 0.8 }}>
            This is a card component using your card tokens — background, border, radius, shadow, and padding.
          </p>
        </div>
      </section>

      {/* Input */}
      <section>
        <h2
          className="mb-3 font-semibold"
          style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Form Input
        </h2>
        <div className="max-w-xs space-y-1.5">
          <label style={{ fontSize: 'var(--preview-text-sm)', fontWeight: 'var(--preview-font-weight-medium)' }}>
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            readOnly
            style={{
              width: '100%',
              backgroundColor: 'var(--preview-input-bg)',
              color: 'var(--preview-input-fg)',
              border: `1px solid var(--preview-input-border)`,
              borderRadius: 'var(--preview-input-radius)',
              padding: `var(--preview-input-py) var(--preview-input-px)`,
              fontSize: 'var(--preview-text-sm)',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: 'var(--preview-text-xs)', opacity: 0.6 }}>
            Helper text — We'll never share your email.
          </p>
          <p style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-danger)' }}>
            Error — This field is required.
          </p>
        </div>
      </section>

      {/* Badge */}
      <section>
        <h2
          className="mb-3 font-semibold"
          style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Badges
        </h2>
        <div className="flex flex-wrap gap-2">
          <span
            style={{
              backgroundColor: 'var(--preview-badge-bg)',
              color: 'var(--preview-badge-fg)',
              borderRadius: 'var(--preview-badge-radius)',
              padding: `var(--preview-badge-py) var(--preview-badge-px)`,
              fontSize: 'var(--preview-text-xs)',
              fontWeight: 500,
            }}
          >
            Default
          </span>
          <span
            style={{
              backgroundColor: 'var(--preview-success)',
              color: 'var(--preview-background)',
              borderRadius: 'var(--preview-badge-radius)',
              padding: `var(--preview-badge-py) var(--preview-badge-px)`,
              fontSize: 'var(--preview-text-xs)',
              fontWeight: 500,
            }}
          >
            Success
          </span>
          <span
            style={{
              backgroundColor: 'var(--preview-warning)',
              color: 'var(--preview-background)',
              borderRadius: 'var(--preview-badge-radius)',
              padding: `var(--preview-badge-py) var(--preview-badge-px)`,
              fontSize: 'var(--preview-text-xs)',
              fontWeight: 500,
            }}
          >
            Warning
          </span>
          <span
            style={{
              backgroundColor: 'var(--preview-danger)',
              color: 'var(--preview-background)',
              borderRadius: 'var(--preview-badge-radius)',
              padding: `var(--preview-badge-py) var(--preview-badge-px)`,
              fontSize: 'var(--preview-text-xs)',
              fontWeight: 500,
            }}
          >
            Danger
          </span>
        </div>
      </section>

      {/* Surface muted */}
      <section>
        <h2
          className="mb-3 font-semibold"
          style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Surfaces
        </h2>
        <div className="flex gap-3">
          <div
            className="flex-1 rounded-md p-4"
            style={{ backgroundColor: 'var(--preview-surface)', border: `1px solid var(--preview-border)` }}
          >
            <p style={{ fontSize: 'var(--preview-text-sm)' }}>Surface</p>
          </div>
          <div
            className="flex-1 rounded-md p-4"
            style={{ backgroundColor: 'var(--preview-surface-muted)', border: `1px solid var(--preview-border)` }}
          >
            <p style={{ fontSize: 'var(--preview-text-sm)' }}>Surface Muted</p>
          </div>
        </div>
      </section>

      {/* Focus ring */}
      <section>
        <h2
          className="mb-3 font-semibold"
          style={{ fontSize: 'var(--preview-text-xs)', color: 'var(--preview-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Focus Ring
        </h2>
        <button
          type="button"
          style={{
            backgroundColor: 'var(--preview-btn-bg)',
            color: 'var(--preview-btn-fg)',
            borderRadius: 'var(--preview-btn-radius)',
            padding: `var(--preview-btn-py) var(--preview-btn-px)`,
            fontSize: 'var(--preview-btn-font-size)',
            fontWeight: 500,
            border: 'none',
            outline: `var(--preview-focus-width) solid var(--preview-focus-color)`,
            outlineOffset: 'var(--preview-focus-offset)',
          }}
        >
          Focused Button
        </button>
        <p className="mt-2" style={{ fontSize: 'var(--preview-text-xs)', opacity: 0.6 }}>
          This button shows the focus ring style. Tab to interactive elements to test keyboard focus.
        </p>
      </section>
    </div>
  );
}
