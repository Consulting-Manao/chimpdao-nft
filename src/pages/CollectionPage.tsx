import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NFTCard } from '@/components/NFTCard';
import { PageHeader } from '@/components/PageHeader';
import { getCollectionBySlug, getCollectionByContractId, type Collection } from '@/config/collections';
import { getTokenUri } from '@/services/stellar';
import { fetchNFTMetadata, ipfsToHttp, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';

const TOKENS_PER_PAGE = 20;

interface TokenData {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  loading: boolean;
  error?: string;
}

export default function CollectionPage() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  
  const [collection, setCollection] = useState<Collection | null>(null);
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!contractId) return;
    
    // Try to find by slug first, then by contract ID
    const found = getCollectionBySlug(contractId) || getCollectionByContractId(contractId);
    setCollection(found || {
      slug: contractId,
      name: `Collection ${contractId.slice(0, 8)}...`,
      contractId: contractId,
      network: 'testnet',
    });
  }, [contractId]);

  const loadToken = useCallback(async (tokenId: number, contractId: string, network: 'testnet' | 'mainnet') => {
    const cacheKey = getCacheKey(contractId, tokenId);
    const cached = getCached<{ metadata: NFTMetadata; imageUrl: string }>(cacheKey);
    
    if (cached) {
      return { tokenId, metadata: cached.metadata, imageUrl: cached.imageUrl, loading: false };
    }

    try {
      const uri = await getTokenUri(contractId, tokenId, network);
      const metadata = await fetchNFTMetadata(uri);
      const imageUrl = metadata.image ? ipfsToHttp(metadata.image) : undefined;
      
      setCache(cacheKey, { metadata, imageUrl });
      return { tokenId, metadata, imageUrl, loading: false };
    } catch (error) {
      return { tokenId, loading: false, error: String(error) };
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!collection || loading) return;
    
    setLoading(true);
    const startId = tokens.length;
    const newTokenIds = Array.from({ length: TOKENS_PER_PAGE }, (_, i) => startId + i);
    
    // Add placeholders
    setTokens(prev => [
      ...prev,
      ...newTokenIds.map(id => ({ tokenId: id, loading: true }))
    ]);

    // Load tokens in parallel
    const results = await Promise.all(
      newTokenIds.map(id => loadToken(id, collection.contractId, collection.network))
    );

    // Check if we got any errors (means we've run out of tokens)
    const hasErrors = results.some(r => r.error);
    if (hasErrors) {
      setHasMore(false);
    }

    setTokens(prev => {
      const updated = [...prev];
      results.forEach(result => {
        const idx = updated.findIndex(t => t.tokenId === result.tokenId);
        if (idx !== -1) {
          updated[idx] = result;
        }
      });
      return updated.filter(t => !t.error);
    });

    setLoading(false);
  }, [collection, loading, tokens.length, loadToken]);

  useEffect(() => {
    if (collection && tokens.length === 0) {
      loadMore();
    }
  }, [collection]);

  if (!collection) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Collection not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <PageHeader
        title={collection.name}
        subtitle={collection.description}
        showBack
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tokens.map((token) => (
          <div
            key={token.tokenId}
            className="animate-fade-in"
            style={{ animationDelay: `${(token.tokenId % TOKENS_PER_PAGE) * 50}ms` }}
          >
            <NFTCard
              tokenId={token.tokenId}
              metadata={token.metadata}
              imageUrl={token.imageUrl}
              isLoading={token.loading}
              onClick={() => navigate(`/${collection.contractId}/${token.tokenId}`)}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 glass-card-hover font-medium disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
