

## Plan: Highlight MERCH Attribute with Purple Glow Link

### Overview

Add special styling and linking for the "MERCH" attribute on the NFT detail page, with a purple glow effect matching the ChimpDAO design system. The architecture will support future linking strategies (slugs, IPFS metadata).

### Design

The MERCH attribute will stand out with:
- Purple text color using the existing `--color-chimp-purple`
- Purple glow effect (similar to the yellow `.text-glow` but purple)
- Clickable link to `shop.chimpdao.xyz`
- External link icon to indicate it opens a new tab

### Architecture for Future Linking

The solution will be extensible for future link types:

```
Current:     MERCH value → shop.chimpdao.xyz (base shop URL)
Future v1:   MERCH value → shop.chimpdao.xyz/{slug} (e.g., /palta_shirt)
Future v2:   MERCH value → IPFS metadata link (from additional NFT metadata)
```

The `AttributeBadge` component will accept an optional `link` prop, making it easy to later derive links from:
- A slug mapping config
- Additional metadata fields in the NFT JSON
- A separate IPFS link field

---

### Changes

#### File: `src/index.css`

Add a purple glow utility class to match the yellow one:

```css
/* Purple glow effect for MERCH highlights */
.text-glow-purple {
  color: hsl(270 100% 60%);
  text-shadow:
    0 0 10px hsl(270 100% 60% / 0.5),
    0 0 20px hsl(270 100% 60% / 0.3),
    0 0 40px hsl(270 100% 60% / 0.15);
}
```

---

#### File: `src/components/AttributeBadge.tsx`

Extend the component to support:
- `highlighted` prop for purple glow styling
- `link` prop for making the value clickable

```typescript
interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
  highlighted?: boolean;  // Purple glow styling
  link?: string;          // External link URL
}

export function AttributeBadge({ traitType, value, highlighted, link }: AttributeBadgeProps) {
  const valueContent = (
    <p className={`text-sm font-medium ${highlighted ? 'text-glow-purple' : ''}`}>
      {value}
      {link && <ExternalLink className="inline h-3 w-3 ml-1" />}
    </p>
  );

  return (
    <div className={`glass-card p-3 space-y-1 ${highlighted ? 'border-purple-500/30' : ''}`}>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {traitType}
      </p>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {valueContent}
        </a>
      ) : (
        valueContent
      )}
    </div>
  );
}
```

---

#### File: `src/pages/TokenPage.tsx`

Update the attributes rendering to detect "MERCH" and apply special treatment:

```typescript
{metadata.attributes.map((attr, idx) => {
  const isMerch = attr.trait_type.toUpperCase() === 'MERCH';
  
  return (
    <AttributeBadge
      key={idx}
      traitType={attr.trait_type}
      value={attr.value}
      highlighted={isMerch}
      link={isMerch ? 'https://shop.chimpdao.xyz' : undefined}
    />
  );
})}
```

---

### Future Extensibility

When you're ready for slug-based linking:

```typescript
// Option 1: Derive slug from value
link={isMerch ? `https://shop.chimpdao.xyz/${slugify(attr.value)}` : undefined}

// Option 2: Add a linkable_traits config
const LINKABLE_TRAITS = {
  'MERCH': (value) => `https://shop.chimpdao.xyz/${value.toLowerCase().replace(/ /g, '_')}`
};

// Option 3: Read from NFT metadata extension
// If the NFT JSON includes: { "merch_link": "ipfs://..." }
link={isMerch ? metadata.merch_link : undefined}
```

---

### Summary

| File | Change |
|------|--------|
| `src/index.css` | Add `.text-glow-purple` class |
| `src/components/AttributeBadge.tsx` | Add `highlighted` and `link` props |
| `src/pages/TokenPage.tsx` | Detect MERCH attribute and apply special styling/link |

