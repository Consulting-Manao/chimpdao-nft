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

const CARD_GATEWAY = 'https://ipfs.filebase.io/ipfs/';

/**
 * Gateway URL for the card collections. `ipfs.io` has moved to a service-worker-only
 * gateway and answers a plain fetch with 429, so this rewrites `ipfs://<path>` and any
 * `.../ipfs/<path>` URL (which is how older token metadata names its files) onto
 * Filebase, whose CORS headers let the page read the JSON.
 */
export function toCardGatewayUrl(uri: string): string {
  if (uri.startsWith('ipfs://')) return CARD_GATEWAY + uri.slice(7);
  const m = uri.match(/^https?:\/\/[^/]+\/ipfs\/(.+)$/);
  return m ? CARD_GATEWAY + m[1] : uri;
}

export async function fetchCardMetadata(uri: string): Promise<NFTMetadata> {
  const response = await fetch(toCardGatewayUrl(uri));
  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }
  return response.json();
}
