

## Complete Site-Wide Style Consistency Update

### Overview
Apply the warm BAYC-style aesthetic consistently across ALL pages, remove yellow/purple glows, update social card icon, and fix token page layout issues.

---

### Changes by File

#### 1. `index.html` - Social Card Icon
Update to use the chimp-joystick icon (already in footer) instead of chimpdao-logo:

```html
<!-- Line 13 -->
<meta property="og:image" content="/chimp-joystick.png" />

<!-- Line 17 -->
<meta name="twitter:image" content="/chimp-joystick.png" />
```

Delete `/public/chimpdao-logo.png` (no longer used).

---

#### 2. `src/index.css` - Remove Glow Effects
Remove the `.text-glow` yellow glow effect (or make it just use regular color without shadow):

```css
/* Replace text-glow - remove the text-shadow, keep just the color */
.text-glow {
  color: hsl(50 100% 50%);
  /* Remove text-shadow completely */
}

/* Remove text-glow-purple or simplify */
.text-glow-purple {
  color: hsl(270 100% 60%);
  /* Remove text-shadow completely */
}
```

Also remove `electric-glow` and `electric-glow-hover` classes since they don't fit the warm aesthetic.

---

#### 3. `src/pages/LandingPage.tsx` - Warm Background
Add warm brown background and doodle pattern:

```tsx
return (
  <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
    {/* Background Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.08] pointer-events-none"
      style={{
        backgroundImage: 'url(/token-bg-pattern.png)',
        backgroundSize: '600px',
        backgroundRepeat: 'repeat'
      }}
      aria-hidden="true"
    />
    <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10">
      <PageHeader
        title="ChimpDAO"
        subtitle="Explore the NFT collections"
        icon="/icon-nft.png"
        {/* Remove yellowTitle prop */}
      />
      ...
    </main>
    <Footer />
  </div>
);
```

---

#### 4. `src/pages/CollectionPage.tsx` - Warm Background
Apply same warm background to both loading and main states:

```tsx
// Loading state (line 123)
<div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{...}} />
  <main className="... relative z-10">
    ...
  </main>
</div>

// Main state (line 141)
<div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{...}} />
  <main className="... relative z-10">
    <PageHeader
      title={collection.name}
      subtitle={collection.description}
      showBack
      backTo="/"
      backLabel="Back to the jungle"
      {/* Remove yellowTitle prop */}
    />
    ...
  </main>
</div>
```

---

#### 5. `src/pages/NotFound.tsx` - Warm Background + Remove Glow
```tsx
<div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{...}} />
  <main className="flex-1 flex items-center justify-center relative z-10">
    <div className="text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
      {/* Remove text-glow class */}
      ...
    </div>
  </main>
  <Footer />
</div>
```

---

#### 6. `src/pages/PrivacyPolicy.tsx` - Warm Background
```tsx
<div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{...}} />
  <main className="flex-1 relative z-10">
    ...
  </main>
  <Footer />
</div>
```

---

#### 7. `src/components/ErrorState.tsx` - Warm Background
```tsx
<div className="min-h-screen p-6 flex items-center justify-center relative bg-[hsl(30_25%_32%)]">
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{...}} />
  <div className="rounded-lg p-8 text-center max-w-md relative z-10 bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
    {/* Replace glass-card with warm styling */}
    ...
  </div>
</div>
```

---

#### 8. `src/pages/TokenPage.tsx` - Header + Grid Fixes

**A. Replace PageHeader with just back button, move name to h2:**
```tsx
// Remove PageHeader, add just back button
<button
  onClick={() => navigate(`/${collection.slug}`)}
  className="mb-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
>
  <ArrowLeft className="h-4 w-4" />
  <span className="text-sm">Back to collection</span>
</button>

// In details column, show metadata name as h2 (not token ID)
<h2 className="text-3xl font-bold text-white">
  {metadata?.name || `Chimp #${tokenIdNum}`}
</h2>
```

**B. Responsive attribute grid:**
```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
```

**C. Loading state also needs warm background.**

---

#### 9. `src/components/AttributeBadge.tsx` - MERCH Button + Font Fixes

**A. MERCH button - square corners, no glow:**
```tsx
<a 
  href={link} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="block p-4 space-y-1 bg-chimp-purple transition-all duration-200 hover:bg-[hsl(270_100%_55%)] hover:scale-[1.02] hover:-translate-y-1"
  {/* Remove borderRadius style and glow shadows */}
>
```

**B. Smaller fonts + word wrap for long values:**
```tsx
<p className="text-[10px] uppercase tracking-wide opacity-70">{traitType}</p>
<p className="text-xs font-medium break-words">{value}</p>
<span className="text-[10px] opacity-60">{rarity}%</span>
```

---

#### 10. `src/components/PageHeader.tsx` - Remove yellowTitle
Remove the `yellowTitle` prop and `text-glow` class usage since we're removing glows:

```tsx
<h1 className="text-3xl font-bold text-white">
  {title}
</h1>
{/* Remove yellowTitle prop handling entirely */}
```

---

### Files Summary

| File | Changes |
|------|---------|
| `index.html` | Update og:image and twitter:image to chimp-joystick.png |
| `public/chimpdao-logo.png` | Delete (unused) |
| `src/index.css` | Remove text-shadow from text-glow classes |
| `src/pages/LandingPage.tsx` | Add warm background + pattern, remove yellowTitle |
| `src/pages/CollectionPage.tsx` | Add warm background + pattern (both states), remove yellowTitle |
| `src/pages/NotFound.tsx` | Add warm background + pattern, remove text-glow |
| `src/pages/PrivacyPolicy.tsx` | Add warm background + pattern |
| `src/components/ErrorState.tsx` | Add warm background + pattern, warm card styling |
| `src/pages/TokenPage.tsx` | Replace PageHeader with back button, h2 shows name, responsive grid, loading state warm bg |
| `src/components/AttributeBadge.tsx` | Square MERCH button, no glow, smaller fonts, word wrap |
| `src/components/PageHeader.tsx` | Remove yellowTitle prop entirely |

---

### Visual Consistency Result

| Element | Before | After |
|---------|--------|-------|
| All page backgrounds | Pure black | Warm brown hsl(30 25% 32%) |
| Background pattern | Only token page (or none) | All pages at 8% opacity |
| Title text | Yellow with glow | White (no glow) |
| 404 text | Yellow glow | White |
| MERCH button | Rounded + purple glow | Square corners, no glow |
| Attribute fonts | Regular size | Smaller (10px/xs) with word wrap |
| Token page header | Shows name as h1 | Just back button, name as h2 |
| Social card image | chimpdao-logo.png | chimp-joystick.png |

---

### Verification Plan
After implementation, take screenshots on:
1. **Landing Page** - Desktop, Tablet, Mobile
2. **Collection Page** - Desktop, Tablet, Mobile
3. **Token Details Page** - Desktop, Tablet, Mobile

This confirms all pages have consistent warm background, no glows, and proper responsive behavior.

