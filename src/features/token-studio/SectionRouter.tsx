import type { Section } from '@/types/tokens';
import { OverviewEditor } from './OverviewEditor';
import { ColorsEditor } from './ColorsEditor';
import { TypographyEditor } from './TypographyEditor';
import { SpacingEditor } from './SpacingEditor';
import { RadiiEditor } from './RadiiEditor';
import { ShadowsEditor } from './ShadowsEditor';
import { MotionEditor } from './MotionEditor';
import { BreakpointsEditor } from './BreakpointsEditor';
import { PreviewPanel } from '@/components/preview/PreviewPanel';
import { ExportPanel } from '@/features/export/ExportPanel';
import { AuditPanel } from '@/features/audit/AuditPanel';

interface SectionRouterProps {
  section: Section;
}

export function SectionRouter({ section }: SectionRouterProps) {
  switch (section) {
    case 'overview':
      return <OverviewEditor />;
    case 'colors':
      return <ColorsEditor />;
    case 'typography':
      return <TypographyEditor />;
    case 'spacing':
      return <SpacingEditor />;
    case 'radii':
      return <RadiiEditor />;
    case 'shadows':
      return <ShadowsEditor />;
    case 'motion':
      return <MotionEditor />;
    case 'breakpoints':
      return <BreakpointsEditor />;
    case 'preview':
      return <PreviewPanel />;
    case 'export':
      return <ExportPanel />;
    case 'audit':
      return <AuditPanel />;
  }
}
