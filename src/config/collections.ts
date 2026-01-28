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
    contractId: "CA67FDVEK423XXYAU65VVAQYJDS4CVAH7UZICXTOOLVKXOUI4HHPNMRS",
    tokenCount: 100,
    description: "A collection of 100 cute Chimpys wearing the PaltaLabs shirt and different accessories.",
  },
  {
    slug: "pudgy-2",
    name: "Pudgy Penguin",
    contractId: "CCKHNE3SOVW3OQRFEES6O2KGZMU2BTS2GT4SMLOWVOOLZ7D6IUTMVEKP",
    tokenCount: 5,
    description: "Pudgy Penguin NFT collection 2",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionByContractId(contractId: string): Collection | undefined {
  return collections.find((c) => c.contractId === contractId);
}
