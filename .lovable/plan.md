

## Fix Unclaimed Token Click Behavior

### Overview
Restore navigation for unclaimed tokens so users see the "Token Not Yet Claimed" message, and suppress the gorilla sound for unclaimed tokens only.

### Current Problem
1. `onClick` is set to `undefined` for unclaimed tokens, preventing navigation to the token page
2. The gorilla sound still plays because `handleClick` always calls `playGorillaSound()` before checking `onClick`
3. Users can't see the helpful "unclaimed" message on the TokenPage

### Solution
Pass a `claimed` prop to NFTCard to control sound behavior, but always allow navigation.

---

### Changes

#### `src/components/NFTCard.tsx`

**1. Add `claimed` prop to interface:**
```typescript
interface NFTCardProps {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  isLoading?: boolean;
  onClick?: () => void;
  claimed?: boolean; // NEW: controls whether sound plays
}
```

**2. Update component to only play sound when claimed:**
```typescript
export function NFTCard({ tokenId, metadata, imageUrl, isLoading, onClick, claimed = true }: NFTCardProps) {
  const name = metadata?.name || `Token #${tokenId}`;

  const handleClick = () => {
    if (claimed) {
      playGorillaSound();
    }
    onClick?.();
  };
  // ... rest unchanged
}
```

#### `src/pages/CollectionPage.tsx`

**Update NFTCard usage to always navigate but pass `claimed` prop:**
```typescript
<NFTCard
  tokenId={token.tokenId}
  metadata={token.metadata}
  imageUrl={token.imageUrl}
  isLoading={token.loading}
  claimed={token.claimed}
  onClick={() => navigate(`/${collection.slug}/${token.tokenId}`)}
/>
```

---

### Technical Notes
- Navigation always happens (so unclaimed tokens show the "Token Not Yet Claimed" page)
- Sound only plays for claimed tokens
- `claimed` defaults to `true` so existing usages don't break
- TokenPage already handles unclaimed tokens with a user-friendly error message

