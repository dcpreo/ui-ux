import { describe, expect, test } from 'bun:test';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  generatePlatformFiles,
  getSupportedAITypes,
  loadPlatformConfig,
  renderSkillFile,
} from '../../cli/src/utils/template.ts';

/** Stable lines for snapshot comparison (ignore full SKILL body). */
function excerptSkillContent(content: string): string {
  const lines = content.split('\n');
  const nameLine = lines.find((l) => l.startsWith('name:')) ?? '';
  const scriptLine = lines.find((l) => l.includes('python3') && l.includes('search.py')) ?? '';
  const titleLine = lines.find((l) => l.startsWith('# ')) ?? '';
  return [nameLine, titleLine, scriptLine].filter(Boolean).join('\n');
}

describe('template utils', () => {
  test('getSupportedAITypes includes core platforms', () => {
    const types = getSupportedAITypes();
    expect(types).toContain('cursor');
    expect(types).toContain('claude');
    expect(types.length).toBeGreaterThan(5);
  });

  test('renderSkillFile snapshot excerpt — cursor', async () => {
    const config = await loadPlatformConfig('cursor');
    const content = await renderSkillFile(config);
    expect(excerptSkillContent(content)).toMatchSnapshot('cursor-skill-excerpt');
  });

  test('renderSkillFile snapshot excerpt — claude', async () => {
    const config = await loadPlatformConfig('claude');
    const content = await renderSkillFile(config);
    expect(excerptSkillContent(content)).toMatchSnapshot('claude-skill-excerpt');
  });
});

describe('generatePlatformFiles', () => {
  test('installs cursor skill tree in temp directory', async () => {
    const root = join(tmpdir(), `uipro-test-${Date.now()}`);
    await mkdir(root, { recursive: true });

    try {
      const folders = await generatePlatformFiles(root, 'cursor');
      expect(folders.length).toBeGreaterThan(0);

      const config = await loadPlatformConfig('cursor');
      const skillFile = join(
        root,
        config.folderStructure.root,
        config.folderStructure.skillPath,
        config.folderStructure.filename,
      );
      const skillContent = await readFile(skillFile, 'utf-8');
      expect(skillContent.length).toBeGreaterThan(500);
      expect(skillContent).toContain('search.py');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
