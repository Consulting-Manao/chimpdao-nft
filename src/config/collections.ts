// Static list of known NFT collections
export interface Collection {
  slug: string;
  name: string;
  contractId: string;
  network: 'testnet' | 'mainnet';
  description?: string;
}

export const collections: Collection[] = [
  {
    slug: 'stellar-merch',
    name: 'Stellar Merch',
    contractId: 'CCKHNE3SOVW3OQRFEES6O2KGZMU2BTS2GT4SMLOWVOOLZ7D6IUTMVEKP',
    network: 'testnet',
    description: 'Official Stellar merchandise NFT collection',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionByContractId(contractId: string): Collection | undefined {
  return collections.find((c) => c.contractId === contractId);
}
