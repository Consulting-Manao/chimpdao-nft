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

// Cards of one design share a metadata file, so a campaign of 195 cards asks the gateway
// for a handful of files, not 195. The promise is shared while the request is in flight and
// after it succeeds; a failure is dropped so the next ask tries again.
const metadataRequests = new Map<string, Promise<NFTMetadata>>();

export function fetchNFTMetadata(uri: string): Promise<NFTMetadata> {
  const url = toHttpUrl(uri);
  let request = metadataRequests.get(url);
  if (!request) {
    request = fetch(url).then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch metadata: ${response.status}`);
      return response.json() as Promise<NFTMetadata>;
    });
    request.catch(() => metadataRequests.delete(url));
    metadataRequests.set(url, request);
  }
  return request;
}
