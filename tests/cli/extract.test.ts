import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const EXTRACT_SRC = join(import.meta.dir, '../../cli/src/utils/extract.ts');

describe('extract.ts hardening', () => {
  test('uses execFile instead of shell exec for archive extraction', () => {
    const src = readFileSync(EXTRACT_SRC, 'utf-8');
    expect(src).toContain('execFile');
    expect(src).not.toMatch(/execAsync\(`/);
    expect(src).toContain("execFileAsync('unzip', ['-o', zip, '-d', dest])");
  });

  test('does not use shell fallback for folder copy', () => {
    const src = readFileSync(EXTRACT_SRC, 'utf-8');
    expect(src).not.toContain('xcopy');
    expect(src).not.toMatch(/execAsync\(`cp /);
  });
});
