const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

/**
 * Converts any URI to an HTTP URL.
 * - ipfs:// URIs are converted to gateway URLs
 * - https:// URLs are returned as-is
 */
export function toHttpUrl(uri: string): string {
  if (uri.startsWith('ipfs://')) {
    return IPFS_GATEWAY + uri.slice(7);
  }
  return uri;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
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
