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

/**
 * Base schema — validates structure and types.
 * Use `tokenConfigSchema` (with refinements) for import/hydration.
 */
const tokenConfigBaseSchema = z.object({
  meta: tokenMetaSchema,
  primitives: primitivesSchema,
  semantic: semanticTokensSchema,
  components: componentTokensSchema,
});

/**
 * Full schema with cross-field refinements.
 * Validates that semantic tokens reference existing primitive color keys.
 */
export const tokenConfigSchema = tokenConfigBaseSchema.superRefine((config, ctx) => {
  const colorKeys = Object.keys(config.primitives.colors);
  const spacingKeys = Object.keys(config.primitives.spacing);
  const radiiKeys = Object.keys(config.primitives.radii);
  const shadowKeys = Object.keys(config.primitives.shadows);
  const fontSizeKeys = Object.keys(config.primitives.typography.fontSizes);

  // Validate semantic → primitive color references
  for (const key of SEMANTIC_COLOR_KEYS) {
    const token = config.semantic[key];
    for (const mode of ['light', 'dark'] as const) {
      if (!colorKeys.includes(token[mode])) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['semantic', key, mode],
          message: `Semantic token "${key}.${mode}" references unknown primitive color "${token[mode]}"`,
        });
      }
    }
  }

  // Validate component → primitive references for non-color fields
  const components = config.components;

  const validateRef = (
    path: string[],
    value: string,
    validKeys: string[],
    label: string,
  ) => {
    if (!validKeys.includes(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path,
        message: `${path.join('.')} references unknown ${label} "${value}"`,
      });
    }
  };

  // Button
  validateRef(['components', 'button', 'radius'], components.button.radius, radiiKeys, 'radius');
  validateRef(['components', 'button', 'paddingX'], components.button.paddingX, spacingKeys, 'spacing');
  validateRef(['components', 'button', 'paddingY'], components.button.paddingY, spacingKeys, 'spacing');
  validateRef(['components', 'button', 'fontSize'], components.button.fontSize, fontSizeKeys, 'fontSize');

  // Input
  validateRef(['components', 'input', 'radius'], components.input.radius, radiiKeys, 'radius');
  validateRef(['components', 'input', 'paddingX'], components.input.paddingX, spacingKeys, 'spacing');
  validateRef(['components', 'input', 'paddingY'], components.input.paddingY, spacingKeys, 'spacing');
  validateRef(['components', 'input', 'fontSize'], components.input.fontSize, fontSizeKeys, 'fontSize');

  // Card
  validateRef(['components', 'card', 'radius'], components.card.radius, radiiKeys, 'radius');
  validateRef(['components', 'card', 'padding'], components.card.padding, spacingKeys, 'spacing');
  validateRef(['components', 'card', 'shadow'], components.card.shadow, shadowKeys, 'shadow');

  // Badge
  validateRef(['components', 'badge', 'radius'], components.badge.radius, radiiKeys, 'radius');
  validateRef(['components', 'badge', 'paddingX'], components.badge.paddingX, spacingKeys, 'spacing');
  validateRef(['components', 'badge', 'paddingY'], components.badge.paddingY, spacingKeys, 'spacing');
  validateRef(['components', 'badge', 'fontSize'], components.badge.fontSize, fontSizeKeys, 'fontSize');
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
export type TokenConfig = z.infer<typeof tokenConfigBaseSchema>;
