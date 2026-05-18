import { writeFile } from 'node:fs/promises';
import type { Release } from '../types/index.js';
import {
  computeSha256Hex,
  parseSha256Sidecar,
  parseSha256SumForFile,
} from './checksum.js';

const REPO_OWNER = 'nextlevelbuilder';
const REPO_NAME = 'ui-ux-pro-max-skill';
const API_BASE = 'https://api.github.com';

export class GitHubRateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitHubRateLimitError';
  }
}

export class GitHubDownloadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitHubDownloadError';
  }
}

export class GitHubChecksumError extends GitHubDownloadError {
  constructor(message: string) {
    super(message);
    this.name = 'GitHubChecksumError';
  }
}

function checkRateLimit(response: Response): void {
  const remaining = response.headers.get('x-ratelimit-remaining');
  if (response.status === 403 && remaining === '0') {
    const resetTime = response.headers.get('x-ratelimit-reset');
    const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000).toLocaleTimeString() : 'unknown';
    throw new GitHubRateLimitError(`GitHub API rate limit exceeded. Resets at ${resetDate}`);
  }
  if (response.status === 429) {
    throw new GitHubRateLimitError('GitHub API rate limit exceeded (429 Too Many Requests)');
  }
}

export async function fetchReleases(): Promise<Release[]> {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'uipro-cli',
    },
  });

  checkRateLimit(response);

  if (!response.ok) {
    throw new GitHubDownloadError(`Failed to fetch releases: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getLatestRelease(): Promise<Release> {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'uipro-cli',
    },
  });

  checkRateLimit(response);

  if (!response.ok) {
    throw new GitHubDownloadError(`Failed to fetch latest release: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchReleaseAssetText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'uipro-cli',
      'Accept': 'application/octet-stream',
    },
  });

  checkRateLimit(response);

  if (!response.ok) {
    throw new GitHubDownloadError(`Failed to fetch checksum asset: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

/**
 * Resolve expected SHA-256 for a release ZIP when maintainers publish checksums.
 * Returns undefined if no checksum asset exists (download proceeds without verification).
 */
export async function findExpectedSha256(
  release: Release,
  zipAssetName: string
): Promise<string | undefined> {
  const sidecar = release.assets.find(
    (a) =>
      a.name === `${zipAssetName}.sha256` ||
      a.name === `${zipAssetName}.sha256.txt`
  );
  if (sidecar?.browser_download_url) {
    const text = await fetchReleaseAssetText(sidecar.browser_download_url);
    return parseSha256Sidecar(text);
  }

  const sumsAsset = release.assets.find((a) =>
    /^(SHA256SUMS|sha256sums|checksums\.sha256)$/i.test(a.name)
  );
  if (sumsAsset?.browser_download_url) {
    const text = await fetchReleaseAssetText(sumsAsset.browser_download_url);
    return parseSha256SumForFile(text, zipAssetName);
  }

  return undefined;
}

export interface DownloadReleaseOptions {
  /** When set, verify buffer SHA-256 before writing. Omit to skip verification. */
  expectedSha256?: string;
}

export async function downloadRelease(
  url: string,
  dest: string,
  options?: DownloadReleaseOptions
): Promise<void> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'uipro-cli',
      'Accept': 'application/octet-stream',
    },
  });

  checkRateLimit(response);

  if (!response.ok) {
    throw new GitHubDownloadError(`Failed to download: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  if (options?.expectedSha256) {
    const expected = options.expectedSha256.toLowerCase();
    const actual = computeSha256Hex(buffer);
    if (actual !== expected) {
      throw new GitHubChecksumError(
        `Checksum mismatch for download: expected ${expected}, got ${actual}`
      );
    }
  }

  await writeFile(dest, buffer);
}

export function getAssetUrl(release: Release): string | null {
  const asset = release.assets.find((a) => a.name.endsWith('.zip'));
  if (asset?.browser_download_url) {
    return asset.browser_download_url;
  }

  if (release.tag_name) {
    return `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/${release.tag_name}.zip`;
  }

  return null;
}

/** Primary ZIP asset name for checksum lookup, or a sensible default from the tag. */
export function getZipAssetName(release: Release): string {
  const asset = release.assets.find((a) => a.name.endsWith('.zip'));
  if (asset?.name) return asset.name;
  if (release.tag_name) {
    return `${REPO_NAME}-${release.tag_name.replace(/^v/, '')}.zip`;
  }
  return 'release.zip';
}
