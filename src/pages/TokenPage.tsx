import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { AttributeBadge } from '@/components/AttributeBadge';
import { CopyButton } from '@/components/CopyButton';
import { getCollectionByContractId } from '@/config/collections';
import { getTokenUri } from '@/services/stellar';
import { fetchNFTMetadata, ipfsToHttp, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';

export default function TokenPage() {
  const { contractId, tokenId } = useParams<{ contractId: string; tokenId: string }>();
  
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [ipfsUri, setIpfsUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collection = contractId ? getCollectionByContractId(contractId) : null;
  const tokenIdNum = tokenId ? parseInt(tokenId, 10) : 0;

  useEffect(() => {
    if (!contractId || tokenId === undefined) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(contractId, tokenIdNum);
      const cached = getCached<{ metadata: NFTMetadata; imageUrl: string; ipfsUri: string }>(cacheKey);

      if (cached) {
        setMetadata(cached.metadata);
        setImageUrl(cached.imageUrl);
        setIpfsUri(cached.ipfsUri);
        setLoading(false);
        return;
      }

      try {
        const uri = await getTokenUri(contractId, tokenIdNum);
        setIpfsUri(uri);
        
        const meta = await fetchNFTMetadata(uri);
        setMetadata(meta);
        
        const imgUrl = meta.image ? ipfsToHttp(meta.image) : null;
        setImageUrl(imgUrl);

        setCache(cacheKey, { metadata: meta, imageUrl: imgUrl, ipfsUri: uri });
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [contractId, tokenId, tokenIdNum, collection]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 max-w-5xl mx-auto">
        <PageHeader title="Loading..." showBack />
        <div className="glass-card aspect-square max-w-lg mx-auto animate-pulse">
          <div className="w-full h-full bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 max-w-5xl mx-auto">
        <PageHeader title="Error" showBack />
        <div className="glass-card p-6 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <PageHeader
        title={metadata?.name || `Token #${tokenId}`}
        showBack
      />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="glass-card overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={metadata?.name || `Token #${tokenId}`}
              className="w-full h-auto"
            />
          ) : (
            <div className="aspect-square flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {metadata?.description && (
            <div className="glass-card p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
              <p className="text-sm">{metadata.description}</p>
            </div>
          )}

          {/* Attributes */}
          {metadata?.attributes && metadata.attributes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Attributes</h3>
              <div className="grid grid-cols-2 gap-3">
                {metadata.attributes.map((attr, idx) => (
                  <AttributeBadge
                    key={idx}
                    traitType={attr.trait_type}
                    value={attr.value}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Technical Info */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Details</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Contract</span>
                <CopyButton value={contractId || ''} label={`${contractId?.slice(0, 8)}...${contractId?.slice(-4)}`} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Token ID</span>
                <span className="font-mono">{tokenId}</span>
              </div>

              {ipfsUri && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">IPFS</span>
                  <a
                    href={ipfsToHttp(ipfsUri)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {collection && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Collection</span>
                  <Link
                    to={`/${collection.slug}`}
                    className="text-primary hover:underline"
                  >
                    {collection.name}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
