

## Update Smart Contract Types and URI Handling

### Overview
Update the codebase to use `u32` instead of `u64` for token IDs (matching the updated smart contract), and ensure URI handling is flexible for both `ipfs://` and `https://` formats.

---

### Changes

#### 1. `src/services/stellar.ts`

Change the token ID type from `u64` to `u32` in both contract call functions:

**Line 22** - `getTokenUri`:
```typescript
// Before
.addOperation(contract.call('token_uri', nativeToScVal(tokenId, { type: 'u64' })))

// After
.addOperation(contract.call('token_uri', nativeToScVal(tokenId, { type: 'u32' })))
```

**Line 57** - `getTokenOwner`:
```typescript
// Before
.addOperation(contract.call('owner_of', nativeToScVal(tokenId, { type: 'u64' })))

// After
.addOperation(contract.call('owner_of', nativeToScVal(tokenId, { type: 'u32' })))
```

#### 2. `src/services/ipfs.ts`

Rename the function and parameter for clarity since URIs can now be either format. The logic stays the same (already handles both):

```typescript
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

/**
 * Converts any URI to an HTTP URL.
 * - ipfs:// URIs are converted to gateway URLs
 * - https:// URLs are returned as-is
 */
export function toHttpUrl(uri: string): string {
  if (uri.startsWith('ipfs://')) {
    return IPFS_GATEWAY + uri.slice(7);
  }
  return uri;
}
```

Also rename in `fetchNFTMetadata`:
```typescript
export async function fetchNFTMetadata(uri: string): Promise<NFTMetadata> {
  const url = toHttpUrl(uri);
  // ... rest unchanged
}
```

#### 3. Update import usages across files

**`src/pages/TokenPage.tsx`**:
- Update import: `ipfsToHttp` → `toHttpUrl`
- Update usages (lines 79, 237)

**`src/pages/LandingPage.tsx`**:
- Update import: `ipfsToHttp` → `toHttpUrl`
- Update usage (line 35)

**`src/pages/CollectionPage.tsx`**:
- Update import: `ipfsToHttp` → `toHttpUrl`
- Update usage (line 75)

---

### Technical Notes
- The `u32` type matches the updated smart contract
- The renamed `toHttpUrl` function is more accurate since it handles any URI format
- The logic remains unchanged - just semantic improvements for clarity
- All existing functionality is preserved

