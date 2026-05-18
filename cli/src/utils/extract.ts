import { mkdir, rm, access, cp, mkdtemp, readdir } from 'node:fs/promises';
import { join, basename, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import type { AIType } from '../types/index.js';
import { AI_FOLDERS } from '../types/index.js';

const execFileAsync = promisify(execFile);

const EXCLUDED_FILES = ['settings.local.json'];

function resolveExistingPath(path: string, label: string): string {
  if (!path || path.includes('\0')) {
    throw new Error(`Invalid ${label} path`);
  }
  return resolve(path);
}

export async function extractZip(zipPath: string, destDir: string): Promise<void> {
  const zip = resolveExistingPath(zipPath, 'zip');
  const dest = resolveExistingPath(destDir, 'destination');

  try {
    await access(zip);
  } catch {
    throw new Error(`Zip file not found: ${zip}`);
  }

  await mkdir(dest, { recursive: true });

  try {
    if (process.platform === 'win32') {
      await execFileAsync(
        'powershell',
        [
          '-NoProfile',
          '-Command',
          'Expand-Archive',
          '-LiteralPath',
          zip,
          '-DestinationPath',
          dest,
          '-Force',
        ],
        { windowsHide: true }
      );
    } else {
      await execFileAsync('unzip', ['-o', zip, '-d', dest]);
    }
  } catch (error) {
    throw new Error(`Failed to extract zip: ${error}`);
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function copyFolders(
  sourceDir: string,
  targetDir: string,
  aiType: AIType
): Promise<string[]> {
  const copiedFolders: string[] = [];

  const foldersToCopy = aiType === 'all'
    ? Object.values(AI_FOLDERS).flat()
    : AI_FOLDERS[aiType];

  const uniqueFolders = [...new Set(foldersToCopy)];

  for (const folder of uniqueFolders) {
    const sourcePath = join(sourceDir, folder);
    const targetPath = join(targetDir, folder);

    const sourceExists = await exists(sourcePath);
    if (!sourceExists) {
      continue;
    }

    await mkdir(targetPath, { recursive: true });

    const filterFn = (src: string): boolean => {
      const fileName = basename(src);
      return !EXCLUDED_FILES.includes(fileName);
    };

    await cp(sourcePath, targetPath, { recursive: true, filter: filterFn });
    copiedFolders.push(folder);
  }

  return copiedFolders;
}

export async function cleanup(tempDir: string): Promise<void> {
  try {
    await rm(tempDir, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors
  }
}

export async function createTempDir(): Promise<string> {
  return mkdtemp(join(tmpdir(), 'uipro-'));
}

async function findExtractedRoot(tempDir: string): Promise<string> {
  const entries = await readdir(tempDir, { withFileTypes: true });
  const dirs = entries.filter(e => e.isDirectory());

  if (dirs.length === 1) {
    return join(tempDir, dirs[0].name);
  }

  return tempDir;
}

export async function installFromZip(
  zipPath: string,
  targetDir: string,
  aiType: AIType
): Promise<{ copiedFolders: string[]; tempDir: string }> {
  const tempDir = await createTempDir();

  try {
    await extractZip(zipPath, tempDir);
    const extractedRoot = await findExtractedRoot(tempDir);
    const copiedFolders = await copyFolders(extractedRoot, targetDir, aiType);
    return { copiedFolders, tempDir };
  } catch (error) {
    await cleanup(tempDir);
    throw error;
  }
}
