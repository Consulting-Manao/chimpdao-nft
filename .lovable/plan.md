

## Plan: Add Yellow Glow to NFT Name

### Overview

Add the electric yellow glow effect to the NFT name in the header for visual impact matching the ChimpDAO branding.

---

### Solution

The `PageHeader` component already supports a `yellowTitle` prop that applies the `.text-glow` class (yellow color with glowing text-shadow effect).

**File:** `src/pages/TokenPage.tsx`

### Change: Enable yellowTitle prop (Line 161-164)

```typescript
// Before:
<PageHeader
  title={metadata?.name || `Token #${tokenId}`}
  showBack
/>

// After:
<PageHeader
  title={metadata?.name || `Token #${tokenId}`}
  showBack
  yellowTitle
/>
```

---

### Result

The NFT name "ChimpDAO" (or any token name) will display with:
- Electric yellow color: `hsl(50 100% 50%)`
- Multi-layer glow effect from the existing `.text-glow` class:
  ```css
  text-shadow:
    0 0 10px hsl(50 100% 50% / 0.5),
    0 0 20px hsl(50 100% 50% / 0.3),
    0 0 40px hsl(50 100% 50% / 0.15);
  ```

This matches the ChimpDAO branding system already used elsewhere in the app.

