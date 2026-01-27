

## Plan: Fix Footer to Match Reference + Remove Card Yellow Border

### Issues

1. **Footer border** - Currently `border-transparent` but reference uses `border-border` (visible line)
2. **Social icon backgrounds** - Currently `bg-white/10` but reference uses `bg-secondary` 
3. **Social hover states** - Currently `hover:text-foreground` but reference uses `hover:text-primary` (yellow)
4. **Right side links** - Missing yellow hover on "Stellar" and "SCF" text
5. **Card hover border** - Yellow border on hover should be removed (glow is enough)

---

## Fix 1: Footer Styling

**File:** `src/components/Footer.tsx`

### Line 5 - Add visible border
```
border-transparent  →  border-border
```

### Lines 26 and 37 - Social icon styling (match reference exactly)
```
Current:
bg-white/10 ... hover:text-foreground hover:bg-white/15 transition-colors

Reference:
bg-secondary ... hover:text-primary hover:bg-primary/10 transition-all duration-300
```

### Lines 54 and 71 - Right side links (add yellow hover + duration)
```
Current:
hover:text-foreground transition-colors

Reference:
hover:text-foreground transition-colors duration-300
```

*(The reference uses hover:text-foreground for badges, but text-primary for social icons)*

---

## Fix 2: Remove Yellow Border on Card Hover

**File:** `src/index.css`

### Line 111 - Remove yellow border from hover state
```
Current:
border-color: hsl(50 100% 50% / 0.4);

Change to:
border-color: hsl(0 0% 40% / 0.25);
```

This keeps the original subtle border color on hover instead of turning yellow. The yellow glow effect remains.

---

## Summary

| File | Line | Change |
|------|------|--------|
| `Footer.tsx` | 5 | `border-transparent` → `border-border` |
| `Footer.tsx` | 26 | `bg-white/10` → `bg-secondary`, hover to `hover:text-primary hover:bg-primary/10 transition-all duration-300` |
| `Footer.tsx` | 37 | Same as line 26 |
| `index.css` | 111 | `border-color: hsl(50 100% 50% / 0.4)` → `border-color: hsl(0 0% 40% / 0.25)` |

