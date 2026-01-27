

## Plan: Footer Border & Card Visibility Fix

### Summary

| Issue | Fix |
|-------|-----|
| **Footer border** | Use subtle gray line matching landing page: `border-t border-white/10` |
| **Social icon circles** | Use darker background matching landing page styling |
| **Card visibility** | Increase `--color-glass` lightness so cards are visible at rest |

---

### 1. Footer Border Fix

**File:** `src/components/Footer.tsx`

**Current:** `border-t border-border` → results in `hsl(0 0% 18%)` solid line which is too visible

**Fix:** Change to a subtle white line with low opacity to match landing page:

```text
Current:
  <footer className="mt-auto border-t border-border py-8">

Updated:
  <footer className="mt-auto border-t border-white/10 py-8">
```

This creates the subtle thin gray line shown in the screenshot.

---

### 2. Social Icon Styling Fix

**File:** `src/components/Footer.tsx`

Looking at the screenshot, the social icons have:
- Darker circular backgrounds (more visible against the dark footer)
- Gray icon color (not bright white)

**Current:** `bg-secondary` which is `hsl(0 0% 12%)`

**Fix:** Use a slightly more visible background:

```text
Current:
  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center 
             text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"

Updated:
  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center 
             text-muted-foreground hover:text-foreground hover:bg-white/15 transition-colors"
```

Using `bg-white/10` creates the visible dark circles that match the landing page screenshot.

---

### 3. Card Visibility Fix

**File:** `src/index.css`

**Issue:** Cards on landing page and collection page use `glass-card-hover` with `--color-glass: hsl(0 0% 14%)` which is only 10% lighter than the background `hsl(0 0% 4%)`. User says the detail page cards are fine, but they use the same class - so we need to increase the glass value more.

**Fix:** Increase `--color-glass` to `hsl(0 0% 18%)` for better visibility:

```text
Current:
  --color-glass: hsl(0 0% 14%);

Updated:
  --color-glass: hsl(0 0% 18%);
```

This gives 14% lightness difference from background (4% → 18%) making cards clearly visible at rest.

---

### Technical Details

**Files to modify:**

1. **`src/components/Footer.tsx`**
   - Line 5: Change `border-t border-border` to `border-t border-white/10`
   - Lines 26, 37: Change social icon classes from `bg-secondary` to `bg-white/10` and `hover:bg-secondary/80` to `hover:bg-white/15`
   - Increase icon container size from `w-8 h-8` to `w-9 h-9` (matches screenshot proportions)

2. **`src/index.css`**
   - Line 42: Change `--color-glass: hsl(0 0% 14%)` to `--color-glass: hsl(0 0% 18%)`

