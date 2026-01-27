
## Plan: Fix Footer Styling & Card Visibility

### Issue Summary

| Issue | Description |
|-------|-------------|
| **Footer styling** | Multiple differences from landing page - icon sizes, backgrounds, image aspect ratios |
| **Card visibility** | Cards use 18% gray on 4% background - not visible enough, especially on collection page |

---

## 1. Footer Fixes

**File:** `src/components/Footer.tsx`

Comparing current footer to landing page source (`https://github.com/Consulting-Manao/chimpdao-landing`):

| Element | Current | Landing Page |
|---------|---------|--------------|
| Footer border | `border-white/10` | `border-border` |
| Logo size | `h-8 w-8` | `w-10 h-10 object-contain` |
| Social container size | `w-9 h-9` | `w-8 h-8` |
| Social background | `bg-white/10` | `bg-secondary` |
| Social hover | `hover:text-foreground hover:bg-white/15` | `hover:text-primary hover:bg-primary/10` |
| Transition | `transition-colors` | `transition-all duration-300` |
| Stellar image | `h-4 w-4` (forced square) | `h-4 w-auto` (natural aspect ratio) |
| SCF image | `h-4` | `h-4 w-auto` |

### Changes

**Line 5** - Footer border:
```
border-white/10  →  border-border
```

**Line 14** - Logo size:
```
className="h-8 w-8"  →  className="w-10 h-10 object-contain"
```

**Lines 26 and 37** - Social icon containers:
```
className="w-9 h-9 rounded-full bg-white/10 ... hover:text-foreground hover:bg-white/15 transition-colors"

→

className="w-8 h-8 rounded-full bg-secondary ... hover:text-primary hover:bg-primary/10 transition-all duration-300"
```

**Line 60** - Stellar image (fixes aspect ratio):
```
className="h-4 w-4 invert opacity-70"  →  className="h-4 w-auto invert opacity-70"
```

**Line 77** - SCF image:
```
className="h-4"  →  className="h-4 w-auto"
```

---

## 2. Card Visibility Fix

**File:** `src/index.css`

The cards need to be more visible against the dark background. Currently:
- Background: 4% lightness
- Cards (`--color-glass`): 18% lightness

This is too subtle. Increasing to ~25% will make cards clearly distinguishable.

### Change

**Line 42** - Increase glass lightness:
```
--color-glass: hsl(0 0% 18%);  →  --color-glass: hsl(0 0% 25%);
```

No changes to hover behavior - keeping existing glow/zoom/border effects exactly as they are.

---

## Summary

| File | Lines | Change |
|------|-------|--------|
| `Footer.tsx` | 5 | `border-white/10` → `border-border` |
| `Footer.tsx` | 14 | `h-8 w-8` → `w-10 h-10 object-contain` |
| `Footer.tsx` | 26 | Social container class update |
| `Footer.tsx` | 37 | Social container class update |
| `Footer.tsx` | 60 | `h-4 w-4` → `h-4 w-auto` |
| `Footer.tsx` | 77 | `h-4` → `h-4 w-auto` |
| `index.css` | 42 | `--color-glass: hsl(0 0% 18%)` → `hsl(0 0% 25%)` |
