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
    slug: "pudgy",
    name: "Pudgy Penguin",
    contractId: "CCKHNE3SOVW3OQRFEES6O2KGZMU2BTS2GT4SMLOWVOOLZ7D6IUTMVEKP",
    tokenCount: 2,
    description: "Pudgy Penguin NFT collection",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionByContractId(contractId: string): Collection | undefined {
  return collections.find((c) => c.contractId === contractId);
}
