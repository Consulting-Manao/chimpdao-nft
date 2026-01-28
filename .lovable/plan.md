

## Plan: Simplify Back Button Navigation

### Current Issue

The back button uses `navigate(-1)` (browser history), which is unpredictable:
- If user opened a token page directly via URL, pressing back might exit the app
- If user came from an external link, back goes to that external site
- Behavior depends on navigation history, not logical hierarchy

### Solution

Make the back button navigate to the logical parent in the hierarchy:

```
Token Page → Collection Page → Landing Page
```

### Changes

**File:** `src/components/PageHeader.tsx`

Add a `backTo` prop that specifies the explicit destination:

```typescript
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;  // NEW: explicit back destination
  icon?: string;
  yellowTitle?: boolean;
}

// Change onClick:
onClick={() => navigate(backTo || '/')}
```

**File:** `src/pages/CollectionPage.tsx`

Pass the parent route:

```typescript
<PageHeader
  title={collection.name}
  subtitle={collection.description}
  showBack
  backTo="/"
  yellowTitle
/>
```

**File:** `src/pages/TokenPage.tsx`

Pass the parent collection route:

```typescript
<PageHeader
  title={metadata?.name || `Token #${tokenId}`}
  showBack
  backTo={`/${collection.slug}`}
  yellowTitle
/>
```

### Result

| Page | Back Button Goes To |
|------|---------------------|
| Collection Page | Landing Page (`/`) |
| Token Page | Collection Page (`/:slug`) |

Simple, predictable, works correctly regardless of how the user arrived at the page.

