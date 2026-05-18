import { createHash } from 'node:crypto';

/** Compute lowercase hex SHA-256 of a buffer. */
export function computeSha256Hex(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex');
}

/**
 * Parse GNU-style SHA256SUMS content for a given filename.
 * Format: `<hash>  <filename>` or `<hash> *<filename>`
 */
export function parseSha256SumForFile(sumsContent: string, filename: string): string | undefined {
  const baseName = filename.split('/').pop() ?? filename;
  for (const line of sumsContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([a-fA-F0-9]{64})\s+[\* ]?(.+)$/);
    if (!match) continue;
    const [, hash, listed] = match;
    const listedBase = listed.trim().split('/').pop();
    if (listedBase === baseName || listed.trim() === filename) {
      return hash.toLowerCase();
    }
  }
  return undefined;
}

/** Parse a sidecar file that contains only a hex digest (optional `SHA256 (file)=` prefix). */
export function parseSha256Sidecar(content: string): string | undefined {
  const trimmed = content.trim();
  const match = trimmed.match(/([a-fA-F0-9]{64})/);
  return match ? match[1].toLowerCase() : undefined;
}
