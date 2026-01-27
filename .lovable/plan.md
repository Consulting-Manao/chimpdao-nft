
## Plan: Unified ChimpDAO Design System for NFT App

This plan transforms the NFT app to match the ChimpDAO landing page's visual identity, including the color scheme, glow effects, background styling, footer, and header.

### Current vs Target Design

| Element | Current (NFT App) | Target (Landing Page) |
|---------|-------------------|----------------------|
| **Background** | Blue-ish dark (hsl 230 25% 8%) | Pure black (hsl 0 0% 4%) |
| **Primary Color** | Cyan blue (hsl 200 100% 60%) | Electric yellow (hsl 50 100% 50%) |
| **Accent** | Purple (hsl 280) | Purple (hsl 270) - keep similar |
| **Card Glow** | Blue glow on hover | Yellow electric glow on hover |
| **Text Glow** | None | Yellow text-shadow effect |
| **Grid** | None | Subtle grid background pattern |

---

### Summary of Changes

| Component | Change |
|-----------|--------|
| **CSS Theme** | Replace blue palette with electric yellow, pure black backgrounds |
| **Card Effects** | Yellow underglow instead of blue on hover |
| **Header** | Add NFT icon + yellow "ChimpDAO" text with glow |
| **Footer** | New footer matching landing page |
| **Background** | Grid pattern + gradient overlay |
| **Assets** | Add required brand images |

---

### 1. Add Required Assets

Download from the landing page repo to `public/`:

| File | Purpose |
|------|---------|
| `icon-nft.png` | NFT icon for header (from user upload) |
| `chimp-joystick.png` | Small chimp icon for footer |
| `stellar-symbol.png` | Stellar logo for footer badge |
| `scf-logo.svg` | Stellar Community Fund logo |

---

### 2. Complete CSS Theme Overhaul

**File: `src/index.css`**

Replace the current blue-based theme with the ChimpDAO design system:

```text
Color Changes:
- Background: hsl(230 25% 8%) -> hsl(0 0% 4%)  (pure black)
- Primary: hsl(200 100% 60%) -> hsl(50 100% 50%)  (electric yellow)
- Card backgrounds: Adjust to neutral grays
- Border colors: Neutral instead of blue-tinted
- Ring/focus: Yellow instead of blue

New Effects:
- .electric-glow: Yellow box-shadow glow for buttons
- .electric-glow-hover: Enhanced yellow glow on hover
- .text-glow: Yellow text-shadow for headlines
- .grid-background: Subtle grid pattern overlay
```

**Key CSS additions:**

```css
/* ChimpDAO Color Tokens */
--color-chimp-yellow: hsl(50 100% 50%);
--color-chimp-yellow-glow: hsl(50 100% 60%);
--color-chimp-purple: hsl(270 100% 60%);
--color-chimp-surface: hsl(0 0% 8%);

/* Electric glow effect for cards */
.electric-glow-hover:hover {
  box-shadow:
    0 0 25px hsl(50 100% 50% / 0.5),
    0 0 50px hsl(50 100% 50% / 0.3);
}

/* Text glow for yellow headlines */
.text-glow {
  text-shadow:
    0 0 10px hsl(50 100% 50% / 0.5),
    0 0 20px hsl(50 100% 50% / 0.3);
}

/* Subtle grid background */
.grid-background {
  background-image:
    linear-gradient(hsl(0 0% 18% / 0.3) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0 0% 18% / 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

---

### 3. Update Card Hover Effects

**File: `src/index.css`**

Change `.glass-card-hover` to use yellow underglow:

```text
Before (blue glow):
  box-shadow: 0 20px 40px -10px hsl(200 100% 50% / 0.2)
  border-color: hsl(200 100% 70% / 0.3)

After (yellow glow):
  box-shadow: 0 20px 40px -10px hsl(50 100% 50% / 0.25)
  border-color: hsl(50 100% 50% / 0.4)
```

---

### 4. Update Background Styling

**File: `src/index.css`**

Change the body background from blue gradient to pure black with optional grid:

```css
body {
  background: hsl(0 0% 4%);
  /* Or with subtle gradient */
  background:
    radial-gradient(ellipse at top, hsl(0 0% 10% / 0.4) 0%, transparent 50%),
    hsl(0 0% 4%);
}
```

---

### 5. Create Footer Component

**File: `src/components/Footer.tsx`**

New footer matching the landing page (without framer-motion to maintain minimal dependencies):

- Left: Chimp joystick icon + "ChimpDAO" text + social icons (GitHub, X)
- Right: "Built on" Stellar badge + "Funded by" SCF badge + Copyright + Privacy link
- Responsive: Stacks on mobile, row on desktop
- Border-top separator

---

### 6. Update PageHeader Component

**File: `src/components/PageHeader.tsx`**

Add optional props for landing page styling:

```typescript
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  icon?: string;      // Optional icon path
  yellowTitle?: boolean;  // Enable yellow glow effect
}
```

When `yellowTitle` is true, apply `.text-glow` class and yellow color.

---

### 7. Update All Pages

Add Footer and update styling across pages:

**LandingPage.tsx:**
- Use PageHeader with `icon="/icon-nft.png"` and `yellowTitle={true}`
- Add grid-background overlay (optional, subtle)
- Add Footer component

**CollectionPage.tsx, TokenPage.tsx, PrivacyPolicy.tsx, NotFound.tsx:**
- Add Footer component
- Page content uses updated card styles automatically

---

### Technical Details

**New Files:**
- `src/components/Footer.tsx`
- `public/icon-nft.png`
- `public/chimp-joystick.png`
- `public/stellar-symbol.png`
- `public/scf-logo.svg`

**Modified Files:**
- `src/index.css` - Complete theme overhaul
- `src/components/PageHeader.tsx` - Add icon and yellowTitle props
- `src/pages/LandingPage.tsx` - Use new header props, add Footer
- `src/pages/CollectionPage.tsx` - Add Footer
- `src/pages/TokenPage.tsx` - Add Footer
- `src/pages/PrivacyPolicy.tsx` - Add Footer
- `src/pages/NotFound.tsx` - Add Footer

**No new dependencies** - uses CSS-only animations to maintain the minimal dependency policy.

---

### Visual Preview

```text
BEFORE (Blue Theme):
+----------------------------------------+
|  ChimpDAO                              |  <- White text
|  Explore the NFT collections           |
|                                        |
|  [Card]     [Card]                     |  <- Blue underglow on hover
|                                        |
+----------------------------------------+

AFTER (Yellow Theme):
+----------------------------------------+
|  [NFT Icon] ChimpDAO                   |  <- Yellow text with glow
|  Explore the NFT collections           |
|                                        |
|  [Card]     [Card]                     |  <- Yellow underglow on hover
|                                        |
|----------------------------------------|
|  [Chimp] ChimpDAO [GitHub][X]  | Built on [Stellar] Funded by [SCF] |
+----------------------------------------+
```
