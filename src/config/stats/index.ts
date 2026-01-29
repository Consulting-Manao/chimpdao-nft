import chi1Stats from './chi1.json';

export interface TraitValue {
  value: string;
  occurrence: number;
}

export interface TraitStats {
  trait_type: string;
  values: TraitValue[];
}

export interface CollectionStats {
  attributes: TraitStats[];
}

const statsMap: Record<string, CollectionStats> = {
  chi1: chi1Stats,
};

export function getCollectionStats(slug: string): CollectionStats | undefined {
  return statsMap[slug];
}

export function getTraitRarity(
  stats: CollectionStats,
  traitType: string,
  value: string | number,
  totalTokens: number
): number | undefined {
  const trait = stats.attributes.find(
    (a) => a.trait_type.toLowerCase() === traitType.toLowerCase()
  );
  if (!trait) return undefined;

  const traitValue = trait.values.find(
    (v) => v.value.toLowerCase() === String(value).toLowerCase()
  );
  if (!traitValue) return undefined;

  return (traitValue.occurrence / totalTokens) * 100;
}
