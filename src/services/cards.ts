import type { CardCollection } from '@/config/collections';
import { fetchNFTMetadata, toHttpUrl, type NFTMetadata } from '@/services/ipfs';
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
  const owner = await getCardOwner(collection.contractId, tokenId);
  if (!owner) return null;

  const metadataUri = await getTokenUri(collection.contractId, tokenId);
  const metadata = await fetchNFTMetadata(metadataUri);
  return {
    tokenId,
    owner,
    metadataUri,
    metadata,
    frontUrl: metadata.image ? toHttpUrl(metadata.image) : undefined,
    backUrl: metadata.back_image ? toHttpUrl(metadata.back_image) : undefined,
  };
}

function attribute(token: CardToken, traitType: string): string | undefined {
  const found = token.metadata.attributes?.find((a) => a.trait_type === traitType);
  return found === undefined ? undefined : String(found.value);
}

/** The printed design (`Hamac`). Tokens minted before designs existed have none. */
export const designOf = (token: CardToken) => attribute(token, 'Design');

/**
 * The print file's code (`1a`). It is the prefix of the design's id, so it adds nothing to
 * the design's name on screen; it is only the order the designs were printed in.
 */
export const printOrderOf = (token: CardToken) => attribute(token, 'Code');

export interface DesignGroup {
  design: string;
  edition?: string;
  /** Any one card of the design: they share one metadata file. */
  sample: CardToken;
  tokens: CardToken[];
}

/** Designs in print order; `rest` is every token that carries none. */
export function groupByDesign(tokens: CardToken[]): { groups: DesignGroup[]; rest: CardToken[] } {
  const byDesign = new Map<string, DesignGroup>();
  const rest: CardToken[] = [];
  for (const token of tokens) {
    const design = designOf(token);
    if (!design) {
      rest.push(token);
      continue;
    }
    const group = byDesign.get(design);
    if (group) group.tokens.push(token);
    else byDesign.set(design, { design, edition: attribute(token, 'Edition'), sample: token, tokens: [token] });
  }
  const groups = [...byDesign.values()].sort((a, b) =>
    (printOrderOf(a.sample) ?? a.design).localeCompare(printOrderOf(b.sample) ?? b.design),
  );
  for (const g of groups) g.tokens.sort((a, b) => a.tokenId - b.tokenId);
  return { groups, rest: rest.sort((a, b) => a.tokenId - b.tokenId) };
}
