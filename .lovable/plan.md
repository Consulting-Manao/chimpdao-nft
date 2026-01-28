

## Restore Full Grid with Placeholder Cards for Unclaimed NFTs

### Overview
Restore the grid to show all tokens (0 to tokenCount-1). Claimed tokens display their images and metadata. Unclaimed tokens appear as placeholder cards showing just the token number.

### Current Problem
The `loadToken` function returns `null` for unclaimed tokens, which then get filtered out entirely from the grid.

### Solution
Change the approach so unclaimed tokens are included in the grid but marked as "unclaimed" with no metadata/image. They'll render as placeholder cards.

---

### Changes

#### `src/pages/CollectionPage.tsx`

**1. Update `TokenData` interface to include ownership status:**
```typescript
interface TokenData {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  loading: boolean;
  error?: boolean;
  claimed: boolean; // NEW: track if token has an owner
}
```

**2. Modify `loadToken` to return placeholder data for unclaimed tokens instead of null:**
```typescript
const loadToken = useCallback(async (tokenId: number, contractAddress: string): Promise<TokenData> => {
  const cacheKey = getCacheKey(contractAddress, tokenId);
  const cached = getCached<{ metadata: NFTMetadata; imageUrl: string; owner?: string }>(cacheKey);
  
  // If cached with owner data, use it
  if (cached && (tokenId === 0 || cached.owner)) {
    return { tokenId, metadata: cached.metadata, imageUrl: cached.imageUrl, loading: false, claimed: true };
  }

  // Check ownership for tokens other than #0
  if (tokenId !== 0) {
    const owner = await getTokenOwner(contractAddress, tokenId);
    if (!owner) {
      // Return placeholder for unclaimed token (don't return null)
      return { tokenId, loading: false, claimed: false };
    }
    
    // Has owner but no cached metadata - update cache and fetch metadata
    if (cached) {
      setCache(cacheKey, { ...cached, owner });
      return { tokenId, metadata: cached.metadata, imageUrl: cached.imageUrl, loading: false, claimed: true };
    }
  }

  // Fetch metadata for claimed tokens
  const uri = await getTokenUri(contractAddress, tokenId);
  const metadata = await fetchNFTMetadata(uri);
  const imageUrl = metadata.image ? ipfsToHttp(metadata.image) : undefined;
  
  const owner = tokenId === 0 ? await getTokenOwner(contractAddress, tokenId) : undefined;
  
  setCache(cacheKey, { metadata, imageUrl, owner: owner || undefined });
  return { tokenId, metadata, imageUrl, loading: false, claimed: true };
}, []);
```

**3. Update the results processing to handle all tokens (no filtering):**
```typescript
const results = await Promise.allSettled(
  tokenIds.map(id => loadToken(id, collection.contractId))
);

const allTokens = results
  .map((result, idx) => 
    result.status === 'fulfilled' 
      ? result.value 
      : { tokenId: idx, loading: false, claimed: false } // Fallback for errors
  );

setTokens(allTokens);
```

**4. Update NFTCard rendering to handle unclaimed tokens:**
The NFTCard already handles missing metadata/imageUrl gracefully - it shows a placeholder with `#{tokenId}`. We just need to make unclaimed tokens non-clickable:

```typescript
<NFTCard
  tokenId={token.tokenId}
  metadata={token.metadata}
  imageUrl={token.imageUrl}
  isLoading={token.loading}
  onClick={token.claimed ? () => navigate(`/${collection.slug}/${token.tokenId}`) : undefined}
/>
```

---

### Technical Notes
- Return type of `loadToken` changes from `TokenData | null` to `TokenData`
- New `claimed` boolean in `TokenData` indicates if token has an owner
- Unclaimed tokens render as placeholders (existing NFTCard behavior)
- Unclaimed tokens are not clickable (no navigation)
- Grid remains full with all token positions visible

