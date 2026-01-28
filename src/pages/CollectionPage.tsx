import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NFTCard } from '@/components/NFTCard';
import { PageHeader } from '@/components/PageHeader';
import { ErrorState } from '@/components/ErrorState';
import { Footer } from '@/components/Footer';
import { getCollectionBySlug, getCollectionByContractId, type Collection } from '@/config/collections';
import { getTokenUri } from '@/services/stellar';
import { fetchNFTMetadata, ipfsToHttp, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';

interface TokenData {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  loading: boolean;
  error?: boolean;
}

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

  const loadToken = useCallback(async (tokenId: number, contractAddress: string): Promise<TokenData> => {
    const cacheKey = getCacheKey(contractAddress, tokenId);
    const cached = getCached<{ metadata: NFTMetadata; imageUrl: string }>(cacheKey);
    
    if (cached) {
      return { tokenId, metadata: cached.metadata, imageUrl: cached.imageUrl, loading: false };
    }

    const uri = await getTokenUri(contractAddress, tokenId);
    const metadata = await fetchNFTMetadata(uri);
    const imageUrl = metadata.image ? ipfsToHttp(metadata.image) : undefined;
    
    setCache(cacheKey, { metadata, imageUrl });
    return { tokenId, metadata, imageUrl, loading: false };
  }, []);

  useEffect(() => {
    if (!collection) return;

    const loadAllTokens = async () => {
      const tokenIds = Array.from({ length: collection.tokenCount }, (_, i) => i);
      
      // Add placeholders
      setTokens(tokenIds.map(id => ({ tokenId: id, loading: true })));

      // Load all tokens in parallel with error handling per token
      const results = await Promise.allSettled(
        tokenIds.map(id => loadToken(id, collection.contractId))
      );

      setTokens(results.map((result, idx) => 
        result.status === 'fulfilled' 
          ? result.value 
          : { tokenId: idx, loading: false, error: true }
      ));
      setLoading(false);
    };

    loadAllTokens();
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
      <div className="min-h-screen flex flex-col">
        <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <PageHeader title="Loading..." showBack />
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            role="status"
            aria-label="Loading collection"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card aspect-square animate-pulse" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto w-full">
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
              style={{ animationDelay: `${token.tokenId * 50}ms` }}
            >
              <NFTCard
                tokenId={token.tokenId}
                metadata={token.metadata}
                imageUrl={token.imageUrl}
                isLoading={token.loading}
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
