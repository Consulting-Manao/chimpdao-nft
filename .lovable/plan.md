
## Plan: Footer & Card Visibility Adjustments

### Summary

| Change | Description |
|--------|-------------|
| **Footer Reorder** | Move Privacy link before copyright |
| **Footer Styling** | Match landing page exactly - remove spacers, add circular social buttons, apply `invert` to Stellar logo |
| **Card Visibility** | Increase card background lightness for better visibility at rest |

---

### 1. Footer Changes

**File: `src/components/Footer.tsx`**

Update to match the landing page structure:

**Left side (keep similar):**
- Chimp icon + "ChimpDAO" text
- Social icons in rounded circles with `bg-secondary` styling

**Right side (reorder + restyle):**
- "Built on" + Stellar logo (with `invert opacity-70` class)
- "Funded by" + SCF logo
- Privacy link (NEW position - before copyright)
- Copyright text

**Key styling changes:**
- Remove pipe separators (`|`)
- Social icons: `w-8 h-8 rounded-full bg-secondary` with hover effects
- Use `text-xs` instead of `text-sm` for badge text
- Add `invert opacity-70` to Stellar logo for proper display
- Reorder: Privacy before Copyright

---

### 2. Card Visibility Changes

**File: `src/index.css`**

Current issue: Cards at `hsl(0 0% 10%)` on background `hsl(0 0% 4%)` = only 6% lightness difference

**Fix:** Increase card background lightness:

```text
Current:
  --color-glass: hsl(0 0% 10%)
  .glass-card border: hsl(0 0% 30% / 0.15)

Updated:
  --color-glass: hsl(0 0% 14%)
  .glass-card border: hsl(0 0% 40% / 0.25)
```

This gives 10% lightness difference and more visible borders at rest.

---

### Technical Details

**Files to modify:**

1. **`src/components/Footer.tsx`**
   - Restructure right side to put Privacy before copyright
   - Add rounded circle styling to social icons
   - Add `invert opacity-70` to Stellar logo
   - Remove pipe separators
   - Use `text-xs` for smaller text

2. **`src/index.css`**
   - Update `--color-glass` from `hsl(0 0% 10%)` to `hsl(0 0% 14%)`
   - Update `--color-glass-border` from `hsl(0 0% 22%)` to `hsl(0 0% 30%)`
   - Update `.glass-card` border from `hsl(0 0% 30% / 0.15)` to `hsl(0 0% 40% / 0.25)`
