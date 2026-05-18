import { describe, expect, test } from 'bun:test';
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { constants } from 'node:fs';
import { extractZip } from '../../cli/src/utils/extract.ts';

const FIXTURE_ZIP = join(import.meta.dir, '../fixtures/minimal-release.zip');

async function hasUnzip(): Promise<boolean> {
  if (process.platform === 'win32') return true;
  const paths = ['/usr/bin/unzip', '/bin/unzip'];
  for (const p of paths) {
    try {
      await access(p, constants.X_OK);
      return true;
    } catch {
      // continue
    }
  }
  try {
    const proc = Bun.spawn(['which', 'unzip'], { stdout: 'pipe', stderr: 'ignore' });
    const code = await proc.exited;
    return code === 0;
  } catch {
    return false;
  }
}

describe('extractZip integration', () => {
  test('extracts minimal-release.zip to destination', async () => {
    if (!(await hasUnzip()) && process.platform !== 'win32') {
      console.warn('skip: unzip not found on PATH');
      return;
    }

    const destDir = await mkdtemp(join(tmpdir(), 'uipro-extract-int-'));

    try {
      await extractZip(FIXTURE_ZIP, destDir);
      const extracted = join(destDir, 'minimal-release', 'README.txt');
      const content = await readFile(extracted, 'utf-8');
      expect(content).toContain('fixture content');
    } finally {
      await rm(destDir, { recursive: true, force: true });
    }
  });
});
