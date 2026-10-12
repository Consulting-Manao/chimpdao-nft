const IPFS_GATEWAY = 'https://ipfs.filebase.io/ipfs/';

/**
 * Converts any URI to an HTTP URL, always through Filebase.
 * - ipfs://<path> becomes a Filebase URL
 * - any http(s)://<host>/ipfs/<path> (how older token metadata names its files, mostly
 *   ipfs.io, which now answers a plain fetch with 429) is moved onto Filebase too
 * - every other URL is returned as-is
 */
export function toHttpUrl(uri: string): string {
  if (uri.startsWith('ipfs://')) return IPFS_GATEWAY + uri.slice(7);
  const m = uri.match(/^https?:\/\/[^/]+\/ipfs\/(.+)$/);
  return m ? IPFS_GATEWAY + m[1] : uri;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  /** Card designs: the reverse of the card, as printed. */
  back_image?: string;
  attributes?: NFTAttribute[];
  [key: string]: unknown;
}

export async function fetchNFTMetadata(uri: string): Promise<NFTMetadata> {
  const url = toHttpUrl(uri);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }
  return response.json();
}
