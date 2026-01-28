

## Plan: BAYC-Style NFT Detail Page Redesign

### Overview

Transform the NFT detail page to match the premium BAYC aesthetic with a cool doodle background, cleaner layout, and properly rounded image display.

---

### Issues to Fix

1. **Bottom corners not rounded** - The NFT image itself has a white/solid background, so the container rounding doesn't show on all corners
2. **Redundant content** - Description already shown on collection page, Token ID and Collection name already in title
3. **Missing visual impact** - Need the cool doodle background pattern like BAYC

---

### Solution

**File:** `src/pages/TokenPage.tsx`

#### Change 1: Add Background Pattern Image

Copy the uploaded doodle pattern to the public folder and use it as a subtle background:

```
public/token-bg-pattern.png
```

Add a background wrapper with the pattern applied with low opacity for a subtle effect.

#### Change 2: Remove Description Section (Lines 174-179)

Delete the entire description card block:

```typescript
// REMOVE THIS BLOCK:
{metadata?.description && (
  <div className="glass-card p-4">
    <h2 className="text-sm font-medium text-muted-foreground mb-2">Description</h2>
    <p className="text-sm">{metadata.description}</p>
  </div>
)}
```

#### Change 3: Remove Token ID from Details (Lines 209-212)

Delete the Token ID row:

```typescript
// REMOVE THIS BLOCK:
<div className="flex items-center justify-between">
  <dt className="text-muted-foreground">Token ID</dt>
  <dd className="font-mono">{tokenId}</dd>
</div>
```

#### Change 4: Remove Collection Link from Details (Lines 244-254)

Delete the Collection row:

```typescript
// REMOVE THIS BLOCK:
<div className="flex items-center justify-between">
  <dt className="text-muted-foreground">Collection</dt>
  <dd>
    <Link to={`/${collection.slug}`} className="text-primary hover:underline">
      {collection.name}
    </Link>
  </dd>
</div>
```

#### Change 5: Fix Image Rounding Issue (Line 158-169)

The issue is that the NFT image has its own background color (white), so the container corners don't appear rounded because the image fills them. Solution: add `rounded-3xl` directly to the `<img>` tag:

```typescript
// Before:
<div className="rounded-3xl overflow-hidden">
  <img src={imageUrl} alt={...} className="w-full h-auto" />
</div>

// After:
<div className="rounded-3xl overflow-hidden">
  <img 
    src={imageUrl} 
    alt={...} 
    className="w-full h-auto rounded-3xl" 
  />
</div>
```

#### Change 6: Add Background Pattern Styling (Line 148-149)

Wrap the page content in a container with the background pattern:

```typescript
// Before:
<div className="min-h-screen flex flex-col">

// After:
<div className="min-h-screen flex flex-col relative">
  {/* Background Pattern */}
  <div 
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: 'url(/token-bg-pattern.png)',
      backgroundSize: '800px',
      backgroundRepeat: 'repeat'
    }}
    aria-hidden="true"
  />
```

---

### Files to Modify

| File | Action |
|------|--------|
| `public/token-bg-pattern.png` | Copy uploaded background image |
| `src/pages/TokenPage.tsx` | Add background, remove redundant elements, fix image rounding |

---

### Before/After Comparison

| Element | Before | After |
|---------|--------|-------|
| Image corners | Only container rounded (white fills corners) | Image itself rounded |
| Description card | Visible | Removed |
| Token ID in details | Visible | Removed (already in title) |
| Collection link | Visible | Removed (already in header) |
| Background | Plain black | Subtle doodle pattern |

---

### Technical Notes

- Background pattern uses very low opacity (3%) to be subtle and not distract from the NFT
- The `pointer-events-none` ensures the background doesn't interfere with interactions
- Adding `rounded-3xl` to the image itself ensures all corners appear rounded regardless of image background color

