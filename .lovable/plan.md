

## Plan: Fix Footer Social Icon Styling

### Problem

The social icon buttons are the wrong color. Currently using `bg-secondary` (12% gray) which appears as light gray, but the reference image shows dark circular buttons that blend more with the background.

---

## Fix

**File:** `src/components/Footer.tsx`

### Lines 26 and 37 - Social icon button backgrounds

Change from light gray to dark background:

```
Current:  bg-secondary
Correct:  bg-white/10
```

This makes the circles dark with just a hint of visibility (10% white on black = ~10% gray), matching the reference where the icons are in subtle dark circles.

### Full class changes:

**Line 26:**
```
w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300

→

w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/15 transition-colors
```

**Line 37:** Same change

---

## Summary

| Line | Change |
|------|--------|
| 26 | `bg-secondary` → `bg-white/10`, hover states adjusted |
| 37 | Same change |

The border is already `border-transparent` (correct - no visible line).

