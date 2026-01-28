

## Plan: Increase NFT Image Rounding

### Problem

The current `rounded-xl` class provides only 12px of corner rounding, which looks too subtle compared to the BAYC reference that has a much more pronounced, smooth rounded appearance.

### Solution

Increase the border radius from `rounded-xl` to `rounded-3xl` (1.5rem = 24px) for a more visually appealing, fully rounded look.

**File:** `src/pages/TokenPage.tsx`

### Change 1: Main image container (Line 158)

```
Before:
<div className="rounded-xl overflow-hidden">

After:
<div className="rounded-3xl overflow-hidden">
```

### Change 2: Loading state container (Line 122)

```
Before:
<div className="rounded-xl overflow-hidden max-w-lg mx-auto" ...>

After:
<div className="rounded-3xl overflow-hidden max-w-lg mx-auto" ...>
```

---

### Rounding Comparison

| Class | Radius | Visual |
|-------|--------|--------|
| `rounded-xl` | 12px | Current - too subtle |
| `rounded-2xl` | 16px | Medium |
| `rounded-3xl` | 24px | **Proposed** - matches BAYC style |

The `rounded-3xl` provides that smooth, premium look matching the BAYC reference.

