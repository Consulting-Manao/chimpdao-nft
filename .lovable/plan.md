
## Update MERCH Button URL

### Overview
Update the MERCH attribute link to point to the specific product page by appending the attribute value to the URL.

### Change

**File: `src/pages/TokenPage.tsx`**

Update line 178 from:
```typescript
link={isMerch ? 'https://shop.chimpdao.xyz' : undefined}
```

To:
```typescript
link={isMerch ? `https://shop.chimpdao.xyz/products/${attr.value}` : undefined}
```

### Notes
- The `attr.value` will be appended as-is to the URL
- If the shop requires a specific format (lowercase, slugified), let me know and I can add transformation logic
