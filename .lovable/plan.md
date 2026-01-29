

## Redesign Token Details Page - BAYC-Inspired Style

### Overview
Update the token details page to match the BAYC aesthetic with a cleaner, more elegant design. Use the provided doodle pattern as a subtle background element and refine the attribute badge styling.

---

### Visual Changes

#### 1. Background Pattern Update
Replace the current `token-bg-pattern.png` with the new doodle pattern asset (Rectangle-2.png). Apply it with very low opacity (~3%) to create a subtle textured background like BAYC uses.

**File**: Copy `user-uploads://Rectangle-2.png` → `public/token-bg-pattern.png`

#### 2. Attribute Badge Styling
Keep the current 2-column layout (works well for your 8 attributes) but refine the styling:

**Current**: `glass-card` with borders
**New**: Cleaner cards with:
- Slightly more padding
- Trait type in small uppercase (keep existing)
- Value and percentage on same line with proper spacing
- Percentage shown in lighter text inline with value

The MERCH attribute keeps its purple highlighted style with hover glow effects.

---

### Files to Modify

**`public/token-bg-pattern.png`**
- Replace with the new doodle pattern asset

**`src/components/AttributeBadge.tsx`**
- Already looks good, minor spacing adjustments if needed

**`src/pages/TokenPage.tsx`**
- Keep the existing layout (already matches BAYC 2-column approach)
- Pattern is already applied with 3% opacity - just needs the new image

---

### Technical Notes

- The new pattern is a lighter, more playful doodle design
- At 3% opacity, it will be very subtle like the BAYC background
- No structural changes needed - just swapping the background image asset
- The current attribute layout and styling already works well

### Result
The page will have a cleaner, more refined look with the playful doodle pattern subtly visible in the background, matching the BAYC aesthetic while maintaining the ChimpDAO brand identity.

