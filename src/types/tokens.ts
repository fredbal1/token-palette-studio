import { z } from 'zod';

export const SEMANTIC_COLOR_KEYS = [
  'background', 'foreground', 'surface', 'surfaceMuted', 'border',
  'primary', 'primaryForeground', 'secondary', 'secondaryForeground',
  'success', 'warning', 'danger',
] as const;

export type SemanticColorKey = (typeof SEMANTIC_COLOR_KEYS)[number];

export const semanticColorKeySchema = z.enum(SEMANTIC_COLOR_KEYS);

export const SECTIONS = [
  'overview', 'colors', 'typography', 'spacing', 'radii',
  'shadows', 'motion', 'breakpoints', 'preview', 'export', 'audit',
] as const;

export type Section = (typeof SECTIONS)[number];

const tokenMetaSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  author: z.string(),
  updatedAt: z.string(),
});

const primitiveMotionSchema = z.object({
  durations: z.record(z.string(), z.string()),
  easings: z.record(z.string(), z.string()),
});

const primitiveTypographySchema = z.object({
  fontFamilies: z.record(z.string(), z.string()),
  fontSizes: z.record(z.string(), z.string()),
  fontWeights: z.record(z.string(), z.string()),
  lineHeights: z.record(z.string(), z.string()),
});

const primitivesSchema = z.object({
  colors: z.record(z.string(), z.string()),
  spacing: z.record(z.string(), z.string()),
  radii: z.record(z.string(), z.string()),
  shadows: z.record(z.string(), z.string()),
  motion: primitiveMotionSchema,
  typography: primitiveTypographySchema,
  breakpoints: z.record(z.string(), z.string()),
});

const semanticColorTokenSchema = z.object({
  light: z.string().min(1),
  dark: z.string().min(1),
});

const semanticTokensSchema = z.object({
  background: semanticColorTokenSchema,
  foreground: semanticColorTokenSchema,
  surface: semanticColorTokenSchema,
  surfaceMuted: semanticColorTokenSchema,
  border: semanticColorTokenSchema,
  primary: semanticColorTokenSchema,
  primaryForeground: semanticColorTokenSchema,
  secondary: semanticColorTokenSchema,
  secondaryForeground: semanticColorTokenSchema,
  success: semanticColorTokenSchema,
  warning: semanticColorTokenSchema,
  danger: semanticColorTokenSchema,
});

const buttonTokensSchema = z.object({
  background: semanticColorKeySchema,
  foreground: semanticColorKeySchema,
  border: semanticColorKeySchema,
  radius: z.string(),
  paddingX: z.string(),
  paddingY: z.string(),
  fontSize: z.string(),
});

const inputTokensSchema = z.object({
  background: semanticColorKeySchema,
  foreground: semanticColorKeySchema,
  border: semanticColorKeySchema,
  radius: z.string(),
  paddingX: z.string(),
  paddingY: z.string(),
  fontSize: z.string(),
});

const cardTokensSchema = z.object({
  background: semanticColorKeySchema,
  foreground: semanticColorKeySchema,
  border: semanticColorKeySchema,
  radius: z.string(),
  padding: z.string(),
  shadow: z.string(),
});

const badgeTokensSchema = z.object({
  background: semanticColorKeySchema,
  foreground: semanticColorKeySchema,
  border: semanticColorKeySchema,
  radius: z.string(),
  paddingX: z.string(),
  paddingY: z.string(),
  fontSize: z.string(),
});

const focusRingTokensSchema = z.object({
  color: semanticColorKeySchema,
  width: z.string(),
  offset: z.string(),
});

const overlayTokensSchema = z.object({
  background: semanticColorKeySchema,
  opacity: z.string(),
});

const componentTokensSchema = z.object({
  button: buttonTokensSchema,
  input: inputTokensSchema,
  card: cardTokensSchema,
  badge: badgeTokensSchema,
  focusRing: focusRingTokensSchema,
  overlay: overlayTokensSchema,
});

export const tokenConfigSchema = z.object({
  meta: tokenMetaSchema,
  primitives: primitivesSchema,
  semantic: semanticTokensSchema,
  components: componentTokensSchema,
});

export type TokenMeta = z.infer<typeof tokenMetaSchema>;
export type Primitives = z.infer<typeof primitivesSchema>;
export type PrimitiveMotion = z.infer<typeof primitiveMotionSchema>;
export type PrimitiveTypography = z.infer<typeof primitiveTypographySchema>;
export type SemanticColorToken = z.infer<typeof semanticColorTokenSchema>;
export type SemanticTokens = z.infer<typeof semanticTokensSchema>;
export type ButtonComponentTokens = z.infer<typeof buttonTokensSchema>;
export type InputComponentTokens = z.infer<typeof inputTokensSchema>;
export type CardComponentTokens = z.infer<typeof cardTokensSchema>;
export type BadgeComponentTokens = z.infer<typeof badgeTokensSchema>;
export type FocusRingTokens = z.infer<typeof focusRingTokensSchema>;
export type OverlayTokens = z.infer<typeof overlayTokensSchema>;
export type ComponentTokens = z.infer<typeof componentTokensSchema>;
export type TokenConfig = z.infer<typeof tokenConfigSchema>;
