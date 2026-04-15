import { describe, it, expect } from 'vitest';
import { contrastRatio, hexToRgb, isValidHex, relativeLuminance } from '@/utils/color';

describe('color utils', () => {
  it('parses valid hex', () => {
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('returns null for invalid hex', () => {
    expect(hexToRgb('not-a-color')).toBeNull();
    expect(hexToRgb('#GGG')).toBeNull();
  });

  it('calculates luminance correctly', () => {
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 2);
    expect(relativeLuminance('#000000')).toBeCloseTo(0, 2);
  });

  it('calculates contrast ratio', () => {
    // Black on white = 21:1
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 0);
    // Same color = 1:1
    expect(contrastRatio('#FF0000', '#FF0000')).toBeCloseTo(1, 0);
  });

  it('validates hex format', () => {
    expect(isValidHex('#FF00FF')).toBe(true);
    expect(isValidHex('#ff00ff')).toBe(true);
    expect(isValidHex('FF00FF')).toBe(false);
    expect(isValidHex('#FFF')).toBe(false);
  });
});
