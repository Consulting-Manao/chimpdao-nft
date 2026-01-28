

## Plan: Remove Gray Card from NFT Image

### Problem

The NFT image on the token detail page is wrapped in a `glass-card` container, which adds a gray background. The BAYC reference shows the image displayed directly with just rounded corners, sitting on the page background without any card wrapper.

### Current State (Line 158)

```html
<div className="glass-card overflow-hidden">
  <img ... />
</div>
```

### Solution

Remove `glass-card` and replace with simple rounded corners styling.

**File:** `src/pages/TokenPage.tsx`

### Change 1: Main image container (Line 158)

Replace `glass-card` with just `rounded-xl overflow-hidden`:

```
Before:
<div className="glass-card overflow-hidden">

After:
<div className="rounded-xl overflow-hidden">
```

### Change 2: Loading state image container (Line 122)

Also update the loading skeleton for consistency:

```
Before:
<div className="glass-card overflow-hidden max-w-lg mx-auto" ...>

After:
<div className="rounded-xl overflow-hidden max-w-lg mx-auto" ...>
```

---

### Summary

| Location | Change |
|----------|--------|
| Line 122 | Loading skeleton: `glass-card` to `rounded-xl` |
| Line 158 | Main image: `glass-card` to `rounded-xl` |

The image will now display cleanly with just rounded corners, matching the BAYC style - no gray card background.

