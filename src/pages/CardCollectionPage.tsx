import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackgroundPattern } from '@/components/BackgroundPattern';
import { ErrorState } from '@/components/ErrorState';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { getCardCollection } from '@/config/collections';
import { loadCardToken, type CardToken } from '@/services/cards';
import { getNextTokenId } from '@/services/stellar';

type Slot = { tokenId: number; token?: CardToken; failed?: boolean };

/** The cards minted so far in a card campaign, read from the chain rather than a fixed count. */
export default function CardCollectionPage() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const collection = getCardCollection(contractId);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collection) return;
    let live = true;
    getNextTokenId(collection.contractId, collection.network).then(
      (next) => {
        if (!live) return;
        const ids = Array.from({ length: Math.min(next, collection.tokenCount) }, (_, i) => i);
        setSlots(ids.map((tokenId) => ({ tokenId })));
        ids.forEach((tokenId) =>
          loadCardToken(collection, tokenId).then(
            (token) => live && setSlots((s) => s?.map((x) => (x.tokenId === tokenId ? { tokenId, token: token ?? undefined, failed: !token } : x)) ?? s),
            () => live && setSlots((s) => s?.map((x) => (x.tokenId === tokenId ? { tokenId, failed: true } : x)) ?? s),
          ),
        );
      },
      (err) => live && setError(err instanceof Error ? err.message : 'Failed to load collection'),
    );
    return () => {
      live = false;
    };
  }, [collection]);

  if (!collection) {
    return (
      <ErrorState
        title="Collection not found"
        message="The collection you're looking for doesn't exist."
        action={{ label: 'Go Home', to: '/' }}
      />
    );
  }
  if (error) {
    return <ErrorState title="Error loading collection" message={error} action={{ label: 'Go Home', to: '/' }} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
      <BackgroundPattern />
      <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10">
        <PageHeader
          title={collection.name}
          subtitle={collection.description}
          showBack
          backTo="/"
          backLabel="Back to the jungle"
        />

        {slots?.length === 0 && (
          <div className="rounded-lg p-12 text-center bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
            <p className="text-white/60">No cards have been issued yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(slots ?? []).map(({ tokenId, token, failed }) => (
            <button
              key={tokenId}
              onClick={() => navigate(`/${collection.slug}/${tokenId}`)}
              className="glass-card-hover w-full text-left overflow-hidden group"
              aria-label={`View details for ${token?.metadata.name ?? `Card #${tokenId}`}`}
            >
              <div className="aspect-[2022/1276] overflow-hidden bg-muted">
                {token?.frontUrl ? (
                  <img
                    src={token.frontUrl}
                    alt={token.metadata.name ?? `Card #${tokenId}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${failed ? '' : 'animate-pulse'}`}>
                    <span className="text-muted-foreground text-sm">#{tokenId}</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{token?.metadata.name ?? `Card #${tokenId}`}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
