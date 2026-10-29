import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NFTCard } from '@/components/NFTCard';
import { PageHeader } from '@/components/PageHeader';
import { ErrorState } from '@/components/ErrorState';
import { Footer } from '@/components/Footer';
import { getCollectionBySlug, getCollectionByContractId, type Collection } from '@/config/collections';
import { getTokenUris } from '@/services/stellar';
import { fetchNFTMetadata, toHttpUrl, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';

interface TokenData {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  loading: boolean;
  error?: boolean;
  claimed: boolean;
}

const BackgroundPattern = () => (
  <div 
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage: 'url(token-bg-pattern.png)',
      backgroundSize: '600px',
      backgroundRepeat: 'repeat'
    }}
    aria-hidden="true"
  />
);

export default function CollectionPage() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  
  const [collection, setCollection] = useState<Collection | null>(null);
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!contractId) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    
    // Try slug first, then contract ID
    const found = getCollectionBySlug(contractId) || getCollectionByContractId(contractId);
    if (!found) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    
    setCollection(found);
  }, [contractId]);

  // Minted ids are dense, so the chain is asked once for every minted token's URI and the
  // rest are placeholders; only the metadata of a minted token costs another request.
  const loadToken = useCallback(async (tokenId: number, contractAddress: string, uri: string): Promise<TokenData> => {
    const cacheKey = getCacheKey(contractAddress, tokenId);
    const cached = getCached<{ metadata: NFTMetadata; imageUrl: string }>(cacheKey);
    if (cached) {
      return { tokenId, metadata: cached.metadata, imageUrl: cached.imageUrl, loading: false, claimed: true };
    }

    const metadata = await fetchNFTMetadata(uri);
    const imageUrl = metadata.image ? toHttpUrl(metadata.image) : undefined;
    setCache(cacheKey, { metadata, imageUrl });
    return { tokenId, metadata, imageUrl, loading: false, claimed: true };
  }, []);

  useEffect(() => {
    if (!collection) return;
    let live = true;

    const loadAllTokens = async () => {
      const unminted = (id: number): TokenData => ({ tokenId: id, loading: false, claimed: false });
      if (live) setTokens(Array.from({ length: collection.tokenCount }, (_, id) => ({ tokenId: id, loading: true, claimed: false })));
      let uris: string[];
      try {
        uris = await getTokenUris(collection.contractId, collection.tokenCount);
      } catch {
        if (live) {
          setTokens(Array.from({ length: collection.tokenCount }, (_, id) => unminted(id)));
          setLoading(false);
        }
        return;
      }

      // Minted tokens fill in as their metadata arrives
      const slots: TokenData[] = Array.from({ length: collection.tokenCount }, (_, id) =>
        id < uris.length ? { tokenId: id, loading: true, claimed: false } : unminted(id)
      );
      if (live) setTokens([...slots]);

      await Promise.all(
        uris.map(async (uri, id) => {
          try {
            slots[id] = await loadToken(id, collection.contractId, uri);
          } catch {
            slots[id] = unminted(id);
          }
          if (live) setTokens([...slots]);
        })
      );
      if (live) setLoading(false);
    };

    loadAllTokens();
    return () => {
      live = false;
    };
  }, [collection, loadToken]);

  if (notFound) {
    return (
      <ErrorState
        title="Collection not found"
        message="The collection you're looking for doesn't exist."
        action={{ label: "Go Home", to: "/" }}
      />
    );
  }

  // Show skeleton only if collection lookup is pending (not for token loading)
  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
        <BackgroundPattern />
        <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10">
          <PageHeader title="Loading..." showBack />
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            role="status"
            aria-label="Loading collection"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg aspect-square animate-pulse bg-[hsl(30_15%_28%/0.6)]" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tokens.map((token) => (
            <div
              key={token.tokenId}
              className="animate-fade-in"
              style={{ animationDelay: `${token.tokenId * 50}ms` }}
            >
              <NFTCard
                tokenId={token.tokenId}
                metadata={token.metadata}
                imageUrl={token.imageUrl}
                isLoading={token.loading}
                claimed={token.claimed}
                onClick={() => navigate(`/${collection.slug}/${token.tokenId}`)}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
