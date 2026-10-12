import type { Network } from "./networks";

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
 * A card's NDEF link is `/<nfc-nft contract>/<token id>` and carries no network, so the
 * network is recorded here. These differ from the collections above in two ways the pages
 * rely on. `mint` binds every token to its card's purse in the same call, so an owner-less
 * id means "not minted yet", never "unclaimed", and there is no special token #0. And a
 * token's metadata is its card design, shared by many cards: no per-trait rarity.
 *
 * Not listed on the landing page: a campaign is reached by its card's link until it has a
 * mainnet deployment to advertise. Mirrors `nfcNft` in chimpdao-terminal's
 * `src/chain/contracts.ts`.
 */
export interface CardCollection extends Collection {
  network: Network;
}

export const cardCollections: CardCollection[] = [
  {
    slug: "chi4",
    name: "ChimpDAO Cards",
    contractId: "CC6Z7JDXX2RXULI2TMY7OGJJ57WXTBRCQDRR4W4IFEJZZ7SPGCPYJEJT",
    // `max_tokens`: the ceiling `create_collection` is deployed with.
    tokenCount: 100,
    network: "testnet",
    description: "Tap-to-pay Chimp cards on Stellar testnet. The card is the wallet.",
  },
];

export function getCardCollection(slugOrContractId: string | undefined): CardCollection | undefined {
  return cardCollections.find(
    (c) => c.slug === slugOrContractId || c.contractId === slugOrContractId,
  );
}
