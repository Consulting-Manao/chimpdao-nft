

## Plan: User-Friendly "Token Not Claimed" Message

### Problem

When a token hasn't been claimed yet, the contract returns error code `#200`. Currently, the raw technical error is shown to users:

> "Simulation error: HostError: Error(Contract, #200)"

This is confusing and not helpful. Users just need to know the token hasn't been claimed yet.

---

## Solution

Detect when the error indicates an unclaimed token and show a friendly message instead.

**File:** `src/pages/TokenPage.tsx`

### Change 1: Detect unclaimed token errors (Lines 69-70)

In the catch block, check if the error message contains contract error indicators (like `#200` or simulation errors) and set a user-friendly message:

```typescript
// Before
catch (err) {
  setError(err instanceof Error ? err.message : 'Failed to load token');
}

// After
catch (err) {
  const errorMsg = err instanceof Error ? err.message : 'Failed to load token';
  // Contract error #200 or simulation errors typically mean token not yet minted
  if (errorMsg.includes('Simulation error') || errorMsg.includes('#200')) {
    setError('unclaimed');
  } else {
    setError(errorMsg);
  }
}
```

### Change 2: Show friendly unclaimed message (Lines 128-136)

Update the error display to show a welcoming message for unclaimed tokens:

```typescript
// Before
if (error) {
  return (
    <ErrorState
      title="Error loading token"
      message={error}
      action={{ label: "View Collection", to: `/${collection.slug}` }}
    />
  );
}

// After
if (error) {
  const isUnclaimed = error === 'unclaimed';
  return (
    <ErrorState
      title={isUnclaimed ? "Token Not Yet Claimed" : "Error loading token"}
      message={isUnclaimed 
        ? "This token hasn't been claimed yet. Once claimed, you'll be able to view its details here."
        : error
      }
      action={{ label: "View Collection", to: `/${collection.slug}` }}
    />
  );
}
```

---

## Result

| Before | After |
|--------|-------|
| "Error loading token" | "Token Not Yet Claimed" |
| "Simulation error: HostError: Error(Contract, #200)..." | "This token hasn't been claimed yet. Once claimed, you'll be able to view its details here." |

Clean, friendly, and tells users exactly what's happening.

