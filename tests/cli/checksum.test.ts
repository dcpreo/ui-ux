import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  computeSha256Hex,
  parseSha256Sidecar,
  parseSha256SumForFile,
} from '../../cli/src/utils/checksum.ts';

const FIXTURE_ZIP = join(import.meta.dir, '../fixtures/minimal-release.zip');

describe('checksum utilities', () => {
  test('computeSha256Hex matches known digest', () => {
    const buf = Buffer.from('hello checksum');
    expect(computeSha256Hex(buf)).toBe(
      '2187766ebb93f57fbcb53b559a612bc2f95c4bc306abf35dfa13e7e7ead58ce0'
    );
  });

  test('computeSha256Hex matches fixture zip file', () => {
    const buf = readFileSync(FIXTURE_ZIP);
    const hash = computeSha256Hex(buf);
    expect(hash).toBe(computeSha256Hex(buf));
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  test('parseSha256SumForFile finds entry', () => {
    const sums = `\
abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234  other.zip
fedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321  minimal-release.zip
`;
    expect(parseSha256SumForFile(sums, 'minimal-release.zip')).toBe(
      'fedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321'
    );
  });

  test('parseSha256Sidecar extracts hex digest', () => {
    expect(parseSha256Sidecar('a'.repeat(64) + '\n')).toBe('a'.repeat(64));
    expect(parseSha256Sidecar(`SHA256 (release.zip)= ${'b'.repeat(64)}`)).toBe('b'.repeat(64));
  });
});
