import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { AttributeBadge } from '@/components/AttributeBadge';
import { BackgroundPattern } from '@/components/BackgroundPattern';
import { CopyButton } from '@/components/CopyButton';
import { ErrorState } from '@/components/ErrorState';
import { FlipCard } from '@/components/FlipCard';
import { Footer } from '@/components/Footer';
import { getCardCollection } from '@/config/collections';
import { loadCardToken, type CardToken } from '@/services/cards';
import { toHttpUrl } from '@/services/ipfs';

type State =
  | { kind: 'loading' }
  | { kind: 'minted'; token: CardToken }
  | { kind: 'unminted' }
  | { kind: 'error'; message: string };

/** Redundant with the design's name (`1a` is the prefix of `1a-Hamac`). */
const HIDDEN_ATTRIBUTES = new Set(['Code']);

const short = (a: string) => `${a.slice(0, 8)}...${a.slice(-4)}`;

/** A token of a card campaign (`CardCollection`): the card as printed, front and back. */
export default function CardTokenPage() {
  const { contractId, tokenId } = useParams<{ contractId: string; tokenId: string }>();
  const navigate = useNavigate();
  const collection = getCardCollection(contractId);
  const id = tokenId !== undefined && /^\d+$/.test(tokenId) ? Number(tokenId) : NaN;
  const valid = collection !== undefined && Number.isSafeInteger(id) && id < collection.tokenCount;
  const [state, setState] = useState<State>({ kind: 'loading' });

  useEffect(() => {
    if (!collection || !valid) return;
    let live = true;
    loadCardToken(collection, id).then(
      (token) => live && setState(token ? { kind: 'minted', token } : { kind: 'unminted' }),
      (err) => live && setState({ kind: 'error', message: err instanceof Error ? err.message : 'Failed to load token' }),
    );
    return () => {
      live = false;
    };
  }, [collection, id, valid]);

  if (!collection || !valid) {
    return (
      <ErrorState
        title="Token not found"
        message="This card isn't part of a collection we know."
        action={{ label: 'Go Home', to: '/' }}
      />
    );
  }
  if (state.kind === 'unminted') {
    return (
      <ErrorState
        title="Card not minted yet"
        message={`No card has been issued as #${id} in this collection.`}
        action={{ label: 'View Collection', to: `/${collection.slug}` }}
      />
    );
  }
  if (state.kind === 'error') {
    return (
      <ErrorState
        title="Error loading token"
        message={state.message}
        action={{ label: 'View Collection', to: `/${collection.slug}` }}
      />
    );
  }

  const token = state.kind === 'minted' ? state.token : undefined;
  // Older tokens already carry their number in the name ("Palta Chimpy #8").
  const named = token?.metadata.name?.includes('#') ?? false;
  const attributes = (token?.metadata.attributes ?? []).filter((a) => !HIDDEN_ATTRIBUTES.has(a.trait_type));

  return (
    <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
      <BackgroundPattern />
      <main id="main-content" className="flex-1 p-6 max-w-5xl mx-auto w-full relative z-10">
        <button
          onClick={() => navigate(`/${collection.slug}`)}
          className="mb-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label="Back to collection"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm">Back to collection</span>
        </button>

        {!token ? (
          <div
            className="aspect-[2022/1276] max-w-lg mx-auto rounded-3xl bg-[hsl(30_15%_28%/0.6)] animate-pulse"
            role="status"
            aria-label="Loading card"
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <FlipCard
              front={token.frontUrl}
              back={token.backUrl}
              alt={named ? token.metadata.name! : `${token.metadata.name || 'Card'} #${id}`}
            />

            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold text-white">{token.metadata.name || `Card #${id}`}</h2>
              {!named && <p className="text-sm text-white/60">Card #{id}</p>}
              {token.metadata.description && (
                <p className="text-sm text-white/70">{token.metadata.description}</p>
              )}

              {attributes.length > 0 && (
                <section aria-label="Card attributes">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {attributes.map((attr, idx) => (
                      <AttributeBadge key={idx} traitType={attr.trait_type} value={attr.value} />
                    ))}
                  </div>
                </section>
              )}

              <div className="rounded-lg p-4 bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-white/50">Contract</dt>
                    <dd><CopyButton value={collection.contractId} label={short(collection.contractId)} /></dd>
                  </div>
                  {token.owner && (
                    <div className="flex items-center justify-between">
                      <dt className="text-white/50">Purse</dt>
                      <dd><CopyButton value={token.owner} label={short(token.owner)} /></dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <dt className="text-white/50">Metadata</dt>
                    <dd>
                      <a
                        href={toHttpUrl(token.metadataUri)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white/70 hover:text-white hover:underline"
                        aria-label="View metadata on IPFS (opens in new tab)"
                      >
                        View <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
