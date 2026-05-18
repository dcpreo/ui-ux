import { describe, expect, test } from 'bun:test';
import { getSupportedAITypes } from '../../cli/src/utils/template.ts';

describe('template utils', () => {
  test('getSupportedAITypes includes core platforms', () => {
    const types = getSupportedAITypes();
    expect(types).toContain('cursor');
    expect(types).toContain('claude');
    expect(types.length).toBeGreaterThan(5);
  });
});
