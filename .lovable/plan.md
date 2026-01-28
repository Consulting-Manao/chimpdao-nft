

## Plan: Optimize Page Loading Performance

### Current Issues Identified

#### Landing Page (LandingPage.tsx)
1. **Blocking render** - Shows only "Loading collections..." text until ALL preview images are fetched
2. **No caching** - Token #0 metadata/images are fetched fresh every time, even though they never change
3. **Sequential blocking** - The entire grid waits for Promise.allSettled to complete

#### Collection Page (CollectionPage.tsx)  
1. **Good pattern already** - Shows loading skeletons while tokens load (line 69-70)
2. **Uses cache** - Already caches each token's metadata
3. **Minor issue** - Initial loading state shows "Loading..." title instead of the collection name (which is known synchronously from config)

#### Shared Problem
- Landing page doesn't use the same cache system as CollectionPage
- When you view a collection, token #0 is cached
- But the landing page doesn't read from that cache, so it re-fetches

---

### Solution Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                             │
├─────────────────────────────────────────────────────────────┤
│  1. Render collection cards IMMEDIATELY (from static config)│
│  2. Each card shows skeleton placeholder for image          │
│  3. Load previews async, update cards as they arrive        │
│  4. Check cache first (same cache as CollectionPage)        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  COLLECTION PAGE                            │
├─────────────────────────────────────────────────────────────┤
│  1. Show collection name/description IMMEDIATELY            │
│  2. Show token grid with skeletons (already does this)      │
│  3. Tokens load progressively (already does this)           │
└─────────────────────────────────────────────────────────────┘
```

---

### Changes Required

#### File: `src/pages/LandingPage.tsx`

**Change 1: Show cards immediately with loading placeholders**

Instead of:
```typescript
{loading ? (
  <div>Loading collections...</div>
) : (
  collections.map(...)
)}
```

Render all cards immediately:
```typescript
collections.map((collection, idx) => (
  <CollectionCard
    collection={collection}
    previewImage={previews[collection.contractId]}
    isLoading={!previews[collection.contractId] && loading}
    onClick={() => navigate(`/${collection.slug}`)}
  />
))
```

**Change 2: Use shared cache for token #0 previews**

Add cache lookup before fetching:
```typescript
const loadPreviews = async () => {
  const results = await Promise.allSettled(
    collections.map(async (collection) => {
      // Check cache first (same cache CollectionPage uses)
      const cacheKey = getCacheKey(collection.contractId, 0);
      const cached = getCached<{ metadata: NFTMetadata; imageUrl: string }>(cacheKey);
      
      if (cached) {
        return { contractId: collection.contractId, image: cached.imageUrl };
      }
      
      // Fetch if not cached
      const uri = await getTokenUri(collection.contractId, 0);
      const metadata = await fetchNFTMetadata(uri);
      const imageUrl = metadata.image ? ipfsToHttp(metadata.image) : undefined;
      
      // Store in shared cache
      setCache(cacheKey, { metadata, imageUrl });
      
      return { contractId: collection.contractId, image: imageUrl };
    })
  );
  // ... rest unchanged
};
```

**Change 3: Progressive loading with state updates**

Update previews as each one completes (not waiting for all):
```typescript
useEffect(() => {
  collections.forEach(async (collection) => {
    // Check cache first
    const cacheKey = getCacheKey(collection.contractId, 0);
    const cached = getCached<{ metadata: NFTMetadata; imageUrl: string }>(cacheKey);
    
    if (cached) {
      setPreviews(prev => ({ ...prev, [collection.contractId]: cached.imageUrl }));
      return;
    }
    
    try {
      const uri = await getTokenUri(collection.contractId, 0);
      const metadata = await fetchNFTMetadata(uri);
      const imageUrl = metadata.image ? ipfsToHttp(metadata.image) : undefined;
      
      if (imageUrl) {
        setCache(cacheKey, { metadata, imageUrl });
        setPreviews(prev => ({ ...prev, [collection.contractId]: imageUrl }));
      }
    } catch {
      // Silent fail - card will show without image
    }
  });
}, []);
```

---

#### File: `src/components/CollectionCard.tsx`

**Change: Add loading state support**

Add `isLoading` prop to show skeleton while preview loads:
```typescript
interface CollectionCardProps {
  collection: Collection;
  previewImage?: string;
  isLoading?: boolean;  // NEW
  onClick?: () => void;
}

// In the image area:
{isLoading ? (
  <div className="w-full h-full bg-muted animate-pulse" />
) : previewImage ? (
  <img ... />
) : (
  <div>No image</div>
)}
```

---

#### File: `src/pages/CollectionPage.tsx`

**Change: Show collection name immediately**

The collection name comes from static config, so show it right away instead of "Loading...":

```typescript
// Before (line 98-116):
if (loading || !collection) {
  return (
    <PageHeader title="Loading..." showBack />
    ...
  );
}

// After:
if (!collection) {
  // Only show "Loading..." if collection lookup is pending
  return (
    <PageHeader title="Loading..." showBack />
    ...
  );
}

// Main render - show immediately with name, tokens load async
return (
  <PageHeader title={collection.name} subtitle={collection.description} showBack />
  {tokens.map(...)} // already shows skeletons
);
```

---

### Summary of Changes

| File | Change | Benefit |
|------|--------|---------|
| `LandingPage.tsx` | Render cards immediately, load images progressively | Instant page structure |
| `LandingPage.tsx` | Use shared cache for token #0 | Skip fetch if already visited collection |
| `CollectionCard.tsx` | Add `isLoading` prop for skeleton state | Smooth loading animation |
| `CollectionPage.tsx` | Show collection name from config immediately | No "Loading..." flash |

---

### User Experience Improvement

**Before:**
1. Landing page: Blank grid → "Loading..." text → Sudden appearance of all cards
2. Collection page: "Loading..." title → Real title appears

**After:**
1. Landing page: Instant card grid with skeletons → Images fade in progressively
2. Collection page: Real title shown immediately → Token grid with skeletons → Tokens load progressively
3. Revisiting: Images appear instantly from cache

