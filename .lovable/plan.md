
## Token Details Page Redesign - Proper BAYC Style

### The Problem
The current implementation doesn't match the BAYC aesthetic at all. I was too conservative. Looking at the BAYC reference:
- BAYC uses a **warm brown/tan background** (not black with subtle pattern)
- The **doodle pattern is clearly visible** in the background
- Attribute cards are **semi-transparent matching the warm tone**
- Layout uses **3 columns** for a cleaner look
- The design has a cohesive warm color palette

### Visual Reference Comparison

**BAYC Style:**
- Background: Warm brown/tan (~hsl(30 30% 35%))
- Pattern: Doodle visible at ~10-15% opacity
- Cards: Semi-transparent brownish cards
- Token ID: Large "#0" display
- 3-column attribute grid

**Current ChimpDAO:**
- Background: Pure black
- Pattern: Nearly invisible at 3% opacity
- Cards: Gray glass cards (cold feel)
- Layout: 2-column grid

---

### Changes

#### 1. Token Page Background and Layout (`src/pages/TokenPage.tsx`)

Replace the black background with a warm brown background that matches BAYC. Increase pattern visibility and update the layout:

```tsx
// New warm background with visible doodle pattern
<div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
  {/* Background Pattern - more visible like BAYC */}
  <div 
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage: 'url(/token-bg-pattern.png)',
      backgroundSize: '600px',
      backgroundRepeat: 'repeat'
    }}
  />
  ...
```

**Layout changes:**
- Switch to 3-column grid for attributes (like BAYC)
- Add large token ID display "#0" before attributes
- Remove the "Details" card header for cleaner look

#### 2. Attribute Badge Styling (`src/components/AttributeBadge.tsx`)

Update to match BAYC's warm transparent card style:

```tsx
// Regular attributes: warm semi-transparent cards
<div className="rounded-lg p-4 space-y-1 bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
  {content}
</div>

// MERCH attribute: keeps purple but with warm undertone
```

#### 3. Details Section Styling (`src/pages/TokenPage.tsx`)

Update the technical details card to match the warm theme:

```tsx
<div className="rounded-lg p-4 space-y-3 bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
```

---

### Color Palette

| Element | Current | New (BAYC-inspired) |
|---------|---------|---------------------|
| Page Background | `hsl(0 0% 4%)` | `hsl(30 25% 32%)` |
| Pattern Opacity | 3% | 8% |
| Card Background | `hsl(0 0% 25%)` | `hsl(30 15% 28% / 0.6)` |
| Card Border | `hsl(0 0% 40% / 0.25)` | `hsl(30 15% 40% / 0.3)` |
| Text | White | White (unchanged) |

---

### Files to Modify

1. **`src/pages/TokenPage.tsx`**
   - Add warm background color to page container
   - Increase pattern opacity from 3% to 8%
   - Change attribute grid to 3 columns
   - Add prominent token ID display
   - Update Details card styling

2. **`src/components/AttributeBadge.tsx`**
   - Replace glass-card with warm transparent styling
   - Keep MERCH purple highlighting

---

### Technical Notes

- Colors are inline for token page only (doesn't affect rest of app)
- The warm aesthetic is isolated to the token details page
- MERCH attribute keeps its purple identity
- Pattern is the doodle asset you provided, just more visible
- 3-column grid works well for 8 attributes (2 full rows + remainder)

### Result
The token page will have a warm, inviting BAYC-style aesthetic with visible doodle background pattern and cohesive semi-transparent cards.
