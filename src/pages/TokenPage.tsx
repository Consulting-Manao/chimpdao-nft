import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { AttributeBadge } from '@/components/AttributeBadge';
import { CopyButton } from '@/components/CopyButton';
import { ErrorState } from '@/components/ErrorState';
import { Footer } from '@/components/Footer';
import { getCollectionByContractId, getCollectionBySlug } from '@/config/collections';
import { getTokenUri, getTokenOwner } from '@/services/stellar';
import { fetchNFTMetadata, ipfsToHttp, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';

export default function TokenPage() {
  const { contractId, tokenId } = useParams<{ contractId: string; tokenId: string }>();
  
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

    // Load metadata (cached)
    const loadMetadata = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(actualContractId, tokenIdNum);
      const cached = getCached<{ metadata: NFTMetadata; imageUrl: string; ipfsUri: string }>(cacheKey);

      if (cached) {
        setMetadata(cached.metadata);
        setImageUrl(cached.imageUrl);
        setIpfsUri(cached.ipfsUri);
        setLoading(false);
        return;
      }

      try {
        const uri = await getTokenUri(actualContractId, tokenIdNum);
        setIpfsUri(uri);
        
        const meta = await fetchNFTMetadata(uri);
        setMetadata(meta);
        
        const imgUrl = meta.image ? ipfsToHttp(meta.image) : null;
        setImageUrl(imgUrl);

        setCache(cacheKey, { metadata: meta, imageUrl: imgUrl, ipfsUri: uri });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load token';
        // Contract error #200 or simulation errors typically mean token not yet minted
        if (errorMsg.includes('Simulation error') || errorMsg.includes('#200')) {
          setError('unclaimed');
        } else {
          setError(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    };

    // Load owner (not cached - can change)
    const loadOwner = async () => {
      setOwnerLoading(true);
      const ownerAddress = await getTokenOwner(actualContractId, tokenIdNum);
      setOwner(ownerAddress);
      setOwnerLoading(false);
    };

    loadMetadata();
    loadOwner();
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
      <div className="min-h-screen flex flex-col">
        <main id="main-content" className="flex-1 p-6 max-w-5xl mx-auto w-full">
          <PageHeader title="Loading..." showBack />
          <div 
            className="rounded-3xl overflow-hidden max-w-lg mx-auto"
            role="status"
            aria-label="Loading token details"
          >
            <div className="aspect-square bg-muted animate-pulse" />
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
    <div className="min-h-screen flex flex-col relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/token-bg-pattern.png)',
          backgroundSize: '800px',
          backgroundRepeat: 'repeat'
        }}
        aria-hidden="true"
      />
      <main id="main-content" className="flex-1 p-6 max-w-5xl mx-auto w-full relative z-10">
        <PageHeader
          title={metadata?.name || `Token #${tokenId}`}
          showBack
          backTo={`/${collection.slug}`}
          yellowTitle
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={metadata?.name || `Token #${tokenId}`}
                className="w-full h-auto rounded-3xl"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center bg-muted rounded-3xl" aria-hidden="true">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Attributes */}
            {metadata?.attributes && metadata.attributes.length > 0 && (
              <section aria-labelledby="attributes-heading">
                <h2 id="attributes-heading" className="text-sm font-medium text-muted-foreground mb-3">Attributes</h2>
                <div className="grid grid-cols-2 gap-3">
                  {metadata.attributes.map((attr, idx) => (
                    <AttributeBadge
                      key={idx}
                      traitType={attr.trait_type}
                      value={attr.value}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Technical Info */}
            <div className="glass-card p-4 space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">Details</h2>
              
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Contract</dt>
                  <dd>
                    <CopyButton value={collection.contractId} label={`${collection.contractId.slice(0, 8)}...${collection.contractId.slice(-4)}`} />
                  </dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Owner</dt>
                  <dd>
                    {ownerLoading ? (
                      <span className="text-muted-foreground text-xs">Loading...</span>
                    ) : owner ? (
                      <CopyButton value={owner} label={`${owner.slice(0, 8)}...${owner.slice(-4)}`} />
                    ) : (
                      <span className="text-muted-foreground">No owner</span>
                    )}
                  </dd>
                </div>

                {ipfsUri && (
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">IPFS</dt>
                    <dd>
                      <a
                        href={ipfsToHttp(ipfsUri)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
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
