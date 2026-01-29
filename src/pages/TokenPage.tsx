import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { AttributeBadge } from '@/components/AttributeBadge';
import { CopyButton } from '@/components/CopyButton';
import { ErrorState } from '@/components/ErrorState';
import { Footer } from '@/components/Footer';
import { getCollectionByContractId, getCollectionBySlug } from '@/config/collections';
import { getTokenUri, getTokenOwner } from '@/services/stellar';
import { fetchNFTMetadata, toHttpUrl, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';
import { getCollectionStats, getTraitRarity } from '@/config/stats';

const BackgroundPattern = () => (
  <div 
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage: 'url(/token-bg-pattern.png)',
      backgroundSize: '600px',
      backgroundRepeat: 'repeat'
    }}
    aria-hidden="true"
  />
);

export default function TokenPage() {
  const { contractId, tokenId } = useParams<{ contractId: string; tokenId: string }>();
  const navigate = useNavigate();
  
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [ipfsUri, setIpfsUri] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [ownerLoading, setOwnerLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dual lookup: slug or contractId
  const collection = contractId 
    ? getCollectionBySlug(contractId) || getCollectionByContractId(contractId)
    : null;
  
  const tokenIdNum = tokenId !== undefined ? parseInt(tokenId, 10) : NaN;

  // Validate tokenId
  const isValidTokenId = !isNaN(tokenIdNum) && tokenIdNum >= 0 && 
    (collection ? tokenIdNum < collection.tokenCount : true);

  useEffect(() => {
    if (!contractId || !collection) return;
    if (!isValidTokenId) return;

    const actualContractId = collection.contractId;
    const cacheKey = getCacheKey(actualContractId, tokenIdNum);

    const loadTokenData = async () => {
      setLoading(true);
      setError(null);

      // Always fetch fresh owner (updates cache)
      const ownerAddress = await getTokenOwner(actualContractId, tokenIdNum);
      setOwner(ownerAddress);
      setOwnerLoading(false);

      // Token #0 always valid; others need owner
      if (tokenIdNum !== 0 && !ownerAddress) {
        setError('unclaimed');
        setLoading(false);
        return;
      }

      // Check cache for metadata
      const cached = getCached<{ metadata: NFTMetadata; imageUrl: string; ipfsUri: string; owner?: string }>(cacheKey);

      if (cached) {
        setMetadata(cached.metadata);
        setImageUrl(cached.imageUrl);
        setIpfsUri(cached.ipfsUri);
        // Update cache with fresh owner
        setCache(cacheKey, { ...cached, owner: ownerAddress || undefined });
        setLoading(false);
        return;
      }

      try {
        const uri = await getTokenUri(actualContractId, tokenIdNum);
        setIpfsUri(uri);
        
        const meta = await fetchNFTMetadata(uri);
        setMetadata(meta);
        
        const imgUrl = meta.image ? toHttpUrl(meta.image) : null;
        setImageUrl(imgUrl);

        setCache(cacheKey, { metadata: meta, imageUrl: imgUrl, ipfsUri: uri, owner: ownerAddress || undefined });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load token';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadTokenData();
  }, [contractId, tokenIdNum, collection, isValidTokenId]);

  // Collection not found
  if (!collection) {
    return (
      <ErrorState
        title="Collection not found"
        message="The collection you're looking for doesn't exist."
        action={{ label: "Go Home", to: "/" }}
      />
    );
  }

  // Invalid token ID
  if (!isValidTokenId) {
    return (
      <ErrorState
        title="Token not found"
        message={`Token #${tokenId} doesn't exist in this collection.`}
        action={{ label: "View Collection", to: `/${collection.slug}` }}
      />
    );
  }

  if (loading) {
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
          <div 
            className="rounded-3xl overflow-hidden max-w-lg mx-auto"
            role="status"
            aria-label="Loading token details"
          >
            <div className="aspect-square bg-[hsl(30_15%_28%/0.6)] animate-pulse rounded-3xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
      <BackgroundPattern />
      <main id="main-content" className="flex-1 p-6 max-w-5xl mx-auto w-full relative z-10">
        {/* Back button only - no title in header */}
        <button
          onClick={() => navigate(`/${collection.slug}`)}
          className="mb-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label="Back to collection"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm">Back to collection</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={metadata?.name || `Token #${tokenId}`}
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center bg-[hsl(30_15%_28%/0.6)] rounded-3xl" aria-hidden="true">
                <span className="text-white/50">No image</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            {/* Name as h2 */}
            <h2 className="text-3xl font-bold text-white">
              {metadata?.name || `Chimp #${tokenIdNum}`}
            </h2>
            
            {/* Attributes - responsive grid */}
            {metadata?.attributes && metadata.attributes.length > 0 && (
              <section aria-label="Token attributes">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {metadata.attributes.map((attr, idx) => {
                    const isMerch = attr.trait_type.toUpperCase() === 'MERCH';
                    const stats = collection ? getCollectionStats(collection.slug) : undefined;
                    const rarity = !isMerch && stats
                      ? getTraitRarity(stats, attr.trait_type, attr.value, collection.tokenCount)
                      : undefined;
                    return (
                      <AttributeBadge
                        key={idx}
                        traitType={attr.trait_type}
                        value={attr.value}
                        highlighted={isMerch}
                        link={isMerch ? `https://shop.chimpdao.xyz/products/${attr.value}` : undefined}
                        rarity={rarity}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* Technical Info - warm styled */}
            <div className="rounded-lg p-4 space-y-3 flex-1 flex flex-col bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
              
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-white/50">Contract</dt>
                  <dd>
                    <CopyButton value={collection.contractId} label={`${collection.contractId.slice(0, 8)}...${collection.contractId.slice(-4)}`} />
                  </dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-white/50">Owner</dt>
                  <dd>
                    {ownerLoading ? (
                      <span className="text-white/40 text-xs">Loading...</span>
                    ) : owner ? (
                      <CopyButton value={owner} label={`${owner.slice(0, 8)}...${owner.slice(-4)}`} />
                    ) : (
                      <span className="text-white/50">No owner</span>
                    )}
                  </dd>
                </div>

                {ipfsUri && (
                  <div className="flex items-center justify-between">
                    <dt className="text-white/50">IPFS</dt>
                    <dd>
                      <a
                        href={toHttpUrl(ipfsUri)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white/70 hover:text-white hover:underline"
                        aria-label="View metadata on IPFS (opens in new tab)"
                      >
                        View <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}

              </dl>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
