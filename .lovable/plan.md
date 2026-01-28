

## Filter NFTs by Ownership (with Cached Ownership)

### Overview
Only display NFTs that have been claimed (have an owner). Token #0 is always shown. Ownership data will be cached alongside metadata since once claimed, a token always has an owner. The token detail page will refresh/update the cached owner.

### Strategy
- Extend the existing cache structure to include owner data
- Collection page: use cached owner if available, otherwise fetch and cache
- Token page: always fetch fresh owner and update cache (ensures accuracy on direct visits)

---

### Changes

#### 1. `src/pages/CollectionPage.tsx`

**Add import for `getTokenOwner`:**
```typescript
import { getTokenUri, getTokenOwner } from '@/services/stellar';
```

**Update cache type and `loadToken` to include owner check:**
```typescript
const loadToken = useCallback(async (tokenId: number, contractAddress: string): Promise<TokenData | null> => {
  const cacheKey = getCacheKey(contractAddress, tokenId);
  const cached = getCached<{ metadata: NFTMetadata; imageUrl: string; owner?: string }>(cacheKey);
  
  // If cached with owner data, use it
  if (cached && (tokenId === 0 || cached.owner)) {
    return { tokenId, metadata: cached.metadata, imageUrl: cached.imageUrl, loading: false };
  }

  // Token #0 always shown; others need owner check
  if (tokenId !== 0) {
    const owner = await getTokenOwner(contractAddress, tokenId);
    if (!owner) return null; // Skip unclaimed
    
    // If we have cached metadata but no owner, update cache with owner
    if (cached) {
      setCache(cacheKey, { ...cached, owner });
      return { tokenId, metadata: cached.metadata, imageUrl: cached.imageUrl, loading: false };
    }
  }

  // Fetch metadata
  const uri = await getTokenUri(contractAddress, tokenId);
  const metadata = await fetchNFTMetadata(uri);
  const imageUrl = metadata.image ? ipfsToHttp(metadata.image) : undefined;
  
  // For token #0, fetch owner too
  const owner = tokenId === 0 ? await getTokenOwner(contractAddress, tokenId) : undefined;
  
  setCache(cacheKey, { metadata, imageUrl, owner: owner || undefined });
  return { tokenId, metadata, imageUrl, loading: false };
}, []);
```

**Update results filtering:**
```typescript
const validTokens = results
  .map(result => result.status === 'fulfilled' ? result.value : null)
  .filter((token): token is TokenData => token !== null);

setTokens(validTokens);
```

#### 2. `src/pages/TokenPage.tsx`

**Update cache type to include owner:**
The cached type becomes `{ metadata: NFTMetadata; imageUrl: string; ipfsUri: string; owner?: string }`

**Refactor loading logic to check owner first and always refresh it:**
```typescript
const loadTokenData = async () => {
  setLoading(true);
  setError(null);

  const cacheKey = getCacheKey(actualContractId, tokenIdNum);
  
  // Always fetch fresh owner (updates cache)
  const ownerAddress = await getTokenOwner(actualContractId, tokenIdNum);
  setOwner(ownerAddress);
  setOwnerLoading(false);

  // Token #0 always valid; others need owner
  if (tokenIdNum !== 0 && !ownerAddress) {
    setError('unclaimed');
    setLoading(false);
    return;
  }

  // Check cache for metadata
  const cached = getCached<{ metadata: NFTMetadata; imageUrl: string; ipfsUri: string; owner?: string }>(cacheKey);

  if (cached) {
    setMetadata(cached.metadata);
    setImageUrl(cached.imageUrl);
    setIpfsUri(cached.ipfsUri);
    // Update cache with fresh owner
    setCache(cacheKey, { ...cached, owner: ownerAddress || undefined });
    setLoading(false);
    return;
  }

  try {
    const uri = await getTokenUri(actualContractId, tokenIdNum);
    setIpfsUri(uri);
    
    const meta = await fetchNFTMetadata(uri);
    setMetadata(meta);
    
    const imgUrl = meta.image ? ipfsToHttp(meta.image) : null;
    setImageUrl(imgUrl);

    setCache(cacheKey, { metadata: meta, imageUrl: imgUrl, ipfsUri: uri, owner: ownerAddress || undefined });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to load token';
    setError(errorMsg);
  } finally {
    setLoading(false);
  }
};
```

Remove the separate `loadOwner` function and call - owner is now fetched in the main flow.

---

### Technical Notes
- Cache structure extended: `{ metadata, imageUrl, ipfsUri?, owner? }`
- Collection page uses cached owner to skip RPC calls for known-claimed tokens
- Token detail page always fetches fresh owner and updates cache (source of truth refresh)
- Token #0 is always displayed regardless of ownership status
- Once an owner is cached, collection page trusts it (owner can't become null)

