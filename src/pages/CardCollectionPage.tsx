import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackgroundPattern } from '@/components/BackgroundPattern';
import { ErrorState } from '@/components/ErrorState';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { getCardCollection } from '@/config/collections';
import { groupByDesign, loadCardTokens, type CardToken } from '@/services/cards';

/**
 * The cards minted so far in a card campaign, read from the chain. Cards of one design are
 * the same artwork, so they are shown once per design with their numbers listed beneath.
 */
export default function CardCollectionPage() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const collection = getCardCollection(contractId);
  const [minted, setMinted] = useState<number | null>(null);
  const [tokens, setTokens] = useState<CardToken[]>([]);
  const [failed, setFailed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collection) return;
    let live = true;
    loadCardTokens(collection, (token) => {
      if (!live) return;
      if (token) setTokens((all) => [...all, token]);
      else setFailed((n) => n + 1);
    }).then(
      (count) => live && setMinted(count),
      (err) => live && setError(err instanceof Error ? err.message : 'Failed to load collection'),
    );
    return () => {
      live = false;
    };
  }, [collection]);

  const { groups, rest } = useMemo(() => groupByDesign(tokens), [tokens]);

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

  const open = (tokenId: number) => navigate(`/${collection.slug}/${tokenId}`);
  const pending = minted === null ? 0 : minted - tokens.length - failed;

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

        {minted === 0 && (
          <div className="rounded-lg p-12 text-center bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
            <p className="text-white/60">No cards have been issued yet.</p>
          </div>
        )}

        <div className="space-y-4">
          {groups.map(({ design, edition, sample, tokens: cards }) => (
            <section
              key={design}
              aria-label={`${design}, ${cards.length} ${cards.length === 1 ? 'card' : 'cards'}`}
              className="glass-card p-4 grid sm:grid-cols-[minmax(0,320px)_1fr] gap-4 items-start"
            >
              <button
                onClick={() => open(cards[0].tokenId)}
                className="block w-full overflow-hidden rounded-lg"
                aria-label={`View ${design} card #${cards[0].tokenId}`}
              >
                {sample.frontUrl ? (
                  <img
                    src={sample.frontUrl}
                    alt={`${design} card, front`}
                    className="w-full aspect-[2022/1276] object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full aspect-[2022/1276] bg-muted" aria-hidden="true" />
                )}
              </button>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold">{design}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edition ? `${edition} edition · ` : ''}
                    {cards.length} {cards.length === 1 ? 'card' : 'cards'}
                  </p>
                </div>
                {sample.metadata.description && (
                  <p className="text-sm text-muted-foreground">{sample.metadata.description}</p>
                )}
                <ul className="flex flex-wrap gap-2" aria-label={`${design} cards`}>
                  {cards.map((card) => (
                    <li key={card.tokenId}>
                      <button
                        onClick={() => open(card.tokenId)}
                        className="rounded-full px-3 py-1 text-sm bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)] hover:bg-[hsl(30_15%_34%/0.8)] transition-colors"
                        aria-label={`View ${design} card #${card.tokenId}`}
                      >
                        #{card.tokenId}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          {pending > 0 && (
            <div
              className="glass-card h-40 animate-pulse"
              role="status"
              aria-label={`Loading ${pending} more ${pending === 1 ? 'card' : 'cards'}`}
            />
          )}

          {rest.length > 0 && (
            <section aria-label="Earlier cards" className="space-y-3 pt-4">
              <h3 className="text-lg font-semibold text-white/80">Earlier cards</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {rest.map((token) => (
                  <button
                    key={token.tokenId}
                    onClick={() => open(token.tokenId)}
                    className="glass-card-hover w-full text-left overflow-hidden group"
                    aria-label={`View details for ${token.metadata.name ?? `Card #${token.tokenId}`}`}
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      {token.frontUrl && (
                        <img
                          src={token.frontUrl}
                          alt={token.metadata.name ?? `Card #${token.tokenId}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">
                        {token.metadata.name ?? `Card #${token.tokenId}`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
