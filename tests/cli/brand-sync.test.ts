import { describe, expect, test } from 'bun:test';
import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const require = createRequire(import.meta.url);
const brandSync = require('../../.claude/skills/brand/scripts/sync-brand-to-tokens.cjs');

describe('sync-brand-to-tokens.cjs', () => {
  test('runTokenCssRegeneration uses execFile argv (no shell)', async () => {
    const calls: { file: string; args: string[]; opts: { cwd?: string } }[] = [];
    const generateScript = join(tmpdir(), `gen-tokens-${Date.now()}.cjs`);
    await writeFile(generateScript, '// fixture\n');

    const ok = brandSync.runTokenCssRegeneration(
      {
        generateScript,
        configPath: 'assets/design-tokens.json',
        outputPath: 'assets/design-tokens.css',
        cwd: '/tmp/project',
      },
      (file: string, args: string[], opts: { cwd?: string }) => {
        calls.push({ file, args, opts });
      }
    );

    expect(ok).toBe(true);
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe(process.execPath);
    expect(calls[0].args).toEqual([
      generateScript,
      '--config',
      'assets/design-tokens.json',
      '-o',
      'assets/design-tokens.css',
    ]);
    expect(calls[0].opts.cwd).toBe('/tmp/project');
    expect(calls[0].args.join(' ')).not.toMatch(/[;&|`$]/);
  });

  test('runTokenCssRegeneration returns false when script missing', () => {
    const ok = brandSync.runTokenCssRegeneration(
      {
        generateScript: join(import.meta.dir, 'nonexistent-generate-tokens.cjs'),
        configPath: 'a.json',
        outputPath: 'b.css',
        cwd: import.meta.dir,
      },
      () => {
        throw new Error('should not run');
      }
    );
    expect(ok).toBe(false);
  });
});
