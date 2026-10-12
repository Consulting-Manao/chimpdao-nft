import type { CardCollection } from '@/config/collections';
import { fetchCardMetadata, toCardGatewayUrl, type NFTMetadata } from '@/services/ipfs';
import { getCardOwner, getTokenUri } from '@/services/stellar';

export interface CardToken {
  tokenId: number;
  /** The card's purse. */
  owner: string;
  metadataUri: string;
  metadata: NFTMetadata;
  frontUrl?: string;
  backUrl?: string;
}

/** `null` when the token has not been minted; throws when the chain or gateway cannot answer. */
export async function loadCardToken(
  collection: CardCollection,
  tokenId: number,
): Promise<CardToken | null> {
  const owner = await getCardOwner(collection.contractId, tokenId, collection.network);
  if (!owner) return null;

  const metadataUri = await getTokenUri(collection.contractId, tokenId, collection.network);
  const metadata = await fetchCardMetadata(metadataUri);
  return {
    tokenId,
    owner,
    metadataUri,
    metadata,
    frontUrl: metadata.image ? toCardGatewayUrl(metadata.image) : undefined,
    backUrl: metadata.back_image ? toCardGatewayUrl(metadata.back_image) : undefined,
  };
}
