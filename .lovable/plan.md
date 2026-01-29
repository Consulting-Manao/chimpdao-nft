

## Add Rarity Stats to Token Details Page

### Overview
Add BAYC-style rarity percentages to the token detail page. Each attribute badge will display the percentage of tokens that have that specific trait value. The MERCH attribute will be excluded from stats since all 100 tokens have the same value.

---

### Changes

#### 1. Create Stats Data File: `src/config/stats/chi1.json`

Store the stats JSON file alongside the collections config. The file will contain attribute occurrence data:

```json
{
  "attributes": [
    {
      "trait_type": "Background",
      "values": [
        { "value": "blue", "occurrence": 15 },
        { "value": "green", "occurrence": 17 },
        ...
      ]
    },
    ...
  ]
}
```

Note: Convert occurrence strings to numbers for easier calculation.

#### 2. Create Stats Service: `src/config/stats/index.ts`

Export types and helper functions for accessing stats:

```typescript
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

// Import stats per collection
import chi1Stats from './chi1.json';

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
```

#### 3. Update `src/components/AttributeBadge.tsx`

Add optional `rarity` prop to display percentage:

```typescript
interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
  highlighted?: boolean;
  link?: string;
  rarity?: number; // NEW: percentage (0-100)
}

export function AttributeBadge({ traitType, value, highlighted, link, rarity }: AttributeBadgeProps) {
  const content = (
    <>
      <p className={`text-xs uppercase tracking-wide ${highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
        {traitType}
      </p>
      <div className="flex items-baseline gap-2">
        <p className={`text-sm font-medium ${highlighted ? 'text-white' : ''}`}>{value}</p>
        {rarity !== undefined && (
          <span className={`text-xs ${highlighted ? 'text-white/60' : 'text-muted-foreground'}`}>
            {rarity.toFixed(1)}%
          </span>
        )}
      </div>
    </>
  );
  // ... rest unchanged
}
```

#### 4. Update `src/pages/TokenPage.tsx`

Import stats and pass rarity to AttributeBadge (skip MERCH):

```typescript
import { getCollectionStats, getTraitRarity } from '@/config/stats';

// Inside component, after getting collection:
const stats = collection ? getCollectionStats(collection.slug) : undefined;

// In the attributes render:
{metadata.attributes.map((attr, idx) => {
  const isMerch = attr.trait_type.toUpperCase() === 'MERCH';
  
  // Calculate rarity only for non-MERCH attributes
  const rarity = !isMerch && stats 
    ? getTraitRarity(stats, attr.trait_type, attr.value, collection.tokenCount)
    : undefined;
  
  return (
    <AttributeBadge
      key={idx}
      traitType={attr.trait_type}
      value={attr.value}
      highlighted={isMerch}
      link={isMerch ? `https://shop.chimpdao.xyz/products/${attr.value}` : undefined}
      rarity={rarity}
    />
  );
})}
```

---

### File Structure

```text
src/config/
  ├── collections.ts      (existing)
  ├── networks.ts         (existing)
  └── stats/
      ├── index.ts        (types + helpers)
      └── chi1.json       (stats data)
```

---

### Technical Notes

- Stats files are stored close to config for easy management
- Each collection has its own JSON file named by slug
- MERCH attribute excluded from rarity display (100% occurrence is not meaningful)
- Percentage calculated as: `(occurrence / totalTokens) * 100`
- Display format: value followed by percentage in lighter text (e.g., "blue 15.0%")
- TypeScript typing ensures type safety when importing JSON

