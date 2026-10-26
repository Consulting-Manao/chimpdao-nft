// Static list of known NFT collections
export interface Collection {
  slug: string;
  name: string;
  contractId: string;
  tokenCount: number;
  description?: string;
}

export const collections: Collection[] = [
  {
    slug: "chi1",
    name: "Palta Chimpy",
    contractId: "CCTPN4LRCNJBLC3VVEYET7MRLQHSAAXTQG4YBG7W3HORHZFHJIIQ7BLO",
    tokenCount: 100,
    description: "A collection of 100 cute Chimpys wearing the PaltaLabs shirt and different accessories.",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionByContractId(contractId: string): Collection | undefined {
  return collections.find((c) => c.contractId === contractId);
}

/**
 * Card campaigns: the `nfc-nft` contracts the terminal's enrolment station mints into.
 *
 * A card's NDEF link is `/<nfc-nft contract>/<token id>`. These differ from the collections
 * above in two ways the pages rely on. `mint` binds every token to its card's purse in the
 * same call, so an owner-less id means "not minted yet", never "unclaimed", and there is no
 * special token #0. And a token's metadata is its card design, shared by many cards: no
 * per-trait rarity.
 *
 * `chi1` is also an `nfc-nft` since mainnet's in-place upgrade, but it stays above: it is
 * a gallery of one-of-a-kind Chimpys, not a print run of designs. Mirrors `nfcNft` in
 * chimpdao-terminal's `src/chain/contracts.ts`.
 */
export type CardCollection = Collection;

export const cardCollections: CardCollection[] = [
  {
    slug: "og",
    name: "Chimp OG",
    contractId: "CD6TCEK4DUGLZJ77YGOIVLNHTQ2HDVBULNAX7MOKPMHCPB6LKSDNMEWA",
    // `max_tokens`: exactly the 195 printed cards.
    tokenCount: 195,
    description: "The 195 OG cards: tap-to-pay Chimp cards on Stellar. The card is the wallet.",
  },
];

export function getCardCollection(slugOrContractId: string | undefined): CardCollection | undefined {
  return cardCollections.find(
    (c) => c.slug === slugOrContractId || c.contractId === slugOrContractId,
  );
}
