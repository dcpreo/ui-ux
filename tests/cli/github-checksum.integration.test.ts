import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { computeSha256Hex } from '../../cli/src/utils/checksum.ts';
import {
  downloadRelease,
  GitHubChecksumError,
} from '../../cli/src/utils/github.ts';

const FIXTURE_ZIP = join(import.meta.dir, '../fixtures/minimal-release.zip');

describe('downloadRelease checksum verification', () => {
  test('passes when expectedSha256 matches file content', async () => {
    const buffer = readFileSync(FIXTURE_ZIP);
    const expectedSha256 = computeSha256Hex(buffer);
    const destDir = await mkdtemp(join(tmpdir(), 'uipro-dl-'));
    const dest = join(destDir, 'out.zip');

    try {
      const server = Bun.serve({
        port: 0,
        fetch() {
          return new Response(buffer, {
            headers: { 'Content-Type': 'application/octet-stream' },
          });
        },
      });

      await downloadRelease(`http://127.0.0.1:${server.port}/release.zip`, dest, {
        expectedSha256,
      });

      server.stop();
      const written = readFileSync(dest);
      expect(computeSha256Hex(written)).toBe(expectedSha256);
    } finally {
      await rm(destDir, { recursive: true, force: true });
    }
  });

  test('throws GitHubChecksumError on mismatch', async () => {
    const buffer = readFileSync(FIXTURE_ZIP);
    const destDir = await mkdtemp(join(tmpdir(), 'uipro-dl-'));
    const dest = join(destDir, 'out.zip');

    try {
      const server = Bun.serve({
        port: 0,
        fetch() {
          return new Response(buffer);
        },
      });

      await expect(
        downloadRelease(`http://127.0.0.1:${server.port}/release.zip`, dest, {
          expectedSha256: '0'.repeat(64),
        })
      ).rejects.toBeInstanceOf(GitHubChecksumError);

      server.stop();
    } finally {
      await rm(destDir, { recursive: true, force: true });
    }
  });
});
