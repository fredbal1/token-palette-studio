import { contrastRatio } from '@/utils/color';

export type WcagLevel = 'AAA' | 'AA' | 'fail';

export interface ContrastResult {
  ratio: number;
  normalText: WcagLevel;
  largeText: WcagLevel;
  label: string;
  description: string;
}

export function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = contrastRatio(foreground, background);

  let normalText: WcagLevel = 'fail';
  let largeText: WcagLevel = 'fail';

  if (ratio >= 7) {
    normalText = 'AAA';
    largeText = 'AAA';
  } else if (ratio >= 4.5) {
    normalText = 'AA';
    largeText = 'AAA';
  } else if (ratio >= 3) {
    largeText = 'AA';
  }

  const label =
    normalText !== 'fail'
      ? normalText
      : largeText !== 'fail'
        ? `${largeText} (large only)`
        : 'Insufficient';

  const description =
    ratio >= 4.5
      ? 'Good contrast for all text sizes.'
      : ratio >= 3
        ? 'Acceptable for large text (18px+ or 14px bold) only.'
        : 'Insufficient contrast. Text may be hard to read.';

  return { ratio, normalText, largeText, label, description };
}
