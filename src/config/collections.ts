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
    contractId: "CDCSKCHEMLOIXXYVQHJRGHBIWRPE6MS27MJMTWQF36CUBJDRHFLSWFFD",
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
