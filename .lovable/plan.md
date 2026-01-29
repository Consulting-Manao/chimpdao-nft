

## Create Social Card for Open Graph Sharing

### The Issue
The current `chimp-joystick.png` has a transparent background. When shared on social platforms (Twitter, LinkedIn, Facebook), transparent images appear on a white or light gray background - which doesn't match the warm brown aesthetic of your site.

### Solution
Create a dedicated social card generator page that produces a properly branded 1200x630px image with:
- Warm brown background matching the site
- Doodle pattern overlay
- Chimp joystick logo centered
- "ChimpDAO NFT" branding text
- Tagline "NFC powered NFT collections"

### Implementation

#### 1. Create Social Card Generator Page (`src/pages/OGCard.tsx`)

A standalone page at `/og-card` that renders the social card design. You can then screenshot this page and save it as `og-card.png`.

```tsx
// 1200x630px social card layout
<div className="w-[1200px] h-[630px] bg-[hsl(30_25%_32%)] relative flex flex-col items-center justify-center">
  {/* Background pattern */}
  <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage: 'url(/token-bg-pattern.png)', ...}} />
  
  {/* Logo */}
  <img src="/chimp-joystick.png" className="w-40 h-40 mb-6 relative z-10" />
  
  {/* Title */}
  <h1 className="text-5xl font-bold text-white mb-2 relative z-10">ChimpDAO NFT</h1>
  
  {/* Tagline */}
  <p className="text-xl text-white/70 relative z-10">NFC powered NFT collections</p>
</div>
```

#### 2. Add Route (`src/App.tsx`)

Add a route for the generator page:
```tsx
<Route path="/og-card" element={<OGCard />} />
```

#### 3. Take Screenshot and Save

After implementation:
1. Navigate to `/og-card` in your browser
2. Take a screenshot at exactly 1200x630px
3. Save as `public/og-card.png`

#### 4. Update Meta Tags (`index.html`)

Update the og:image and twitter:image to use the new card:
```html
<meta property="og:image" content="/og-card.png" />
<meta name="twitter:image" content="/og-card.png" />
```

### Files to Create/Modify

| File | Change |
|------|--------|
| `src/pages/OGCard.tsx` | Create new social card generator page |
| `src/App.tsx` | Add `/og-card` route |
| `public/og-card.png` | Save screenshot of the generated card |
| `index.html` | Update og:image and twitter:image paths |

### Result Preview

The social card will show:
- Warm brown background matching site aesthetic
- Subtle doodle pattern
- Chimp joystick logo prominently displayed
- Clear "ChimpDAO NFT" branding
- Tagline for context

This ensures when anyone shares your site on social media, they see a cohesive, branded preview that matches the warm BAYC aesthetic.

