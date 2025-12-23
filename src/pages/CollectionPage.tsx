import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NFTCard } from '@/components/NFTCard';
import { PageHeader } from '@/components/PageHeader';
import { getCollectionBySlug, getCollectionByContractId, type Collection } from '@/config/collections';
import { getTokenUri } from '@/services/stellar';
import { fetchNFTMetadata, ipfsToHttp, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';

interface TokenData {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  loading: boolean;
}

export default function CollectionPage() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  
  const [collection, setCollection] = useState<Collection | null>(null);
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contractId) return;
    
    // Try to find by slug first, then by contract ID
    const found = getCollectionBySlug(contractId) || getCollectionByContractId(contractId);
    setCollection(found || null);
  }, [contractId]);

  const loadToken = useCallback(async (tokenId: number, contractAddress: string) => {
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
      setLoading(true);
      
      // Create array of token IDs from 0 to tokenCount - 1
      const tokenIds = Array.from({ length: collection.tokenCount }, (_, i) => i);
      
      // Add placeholders
      setTokens(tokenIds.map(id => ({ tokenId: id, loading: true })));

      // Load all tokens in parallel
      const results = await Promise.all(
        tokenIds.map(id => loadToken(id, collection.contractId))
      );

      setTokens(results);
      setLoading(false);
    };

    loadAllTokens();
  }, [collection, loadToken]);

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
            style={{ animationDelay: `${token.tokenId * 50}ms` }}
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

    </div>
  );
}
