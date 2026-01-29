import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionCard } from '@/components/CollectionCard';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/Footer';
import { collections } from '@/config/collections';
import { getTokenUri } from '@/services/stellar';
import { fetchNFTMetadata, toHttpUrl, type NFTMetadata } from '@/services/ipfs';
import { getCached, setCache, getCacheKey } from '@/services/cache';

export default function LandingPage() {
  const navigate = useNavigate();
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set(collections.map(c => c.contractId)));

  useEffect(() => {
    // Load previews progressively - each collection updates as it completes
    collections.forEach(async (collection) => {
      const cacheKey = getCacheKey(collection.contractId, 0);
      const cached = getCached<{ metadata: NFTMetadata; imageUrl: string }>(cacheKey);
      
      if (cached?.imageUrl) {
        setPreviews(prev => ({ ...prev, [collection.contractId]: cached.imageUrl }));
        setLoadingIds(prev => {
          const next = new Set(prev);
          next.delete(collection.contractId);
          return next;
        });
        return;
      }
      
      try {
        const uri = await getTokenUri(collection.contractId, 0);
        const metadata = await fetchNFTMetadata(uri);
        const imageUrl = metadata.image ? toHttpUrl(metadata.image) : undefined;
        
        if (imageUrl) {
          setCache(cacheKey, { metadata, imageUrl });
          setPreviews(prev => ({ ...prev, [collection.contractId]: imageUrl }));
        }
      } catch {
        // Silent fail - card will show without image
      } finally {
        setLoadingIds(prev => {
          const next = new Set(prev);
          next.delete(collection.contractId);
          return next;
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'url(/token-bg-pattern.png)',
          backgroundSize: '600px',
          backgroundRepeat: 'repeat'
        }}
        aria-hidden="true"
      />
      <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10">
        <PageHeader
          title="ChimpDAO"
          subtitle="Explore the NFT collections"
          icon="/monkey-head.png"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, idx) => (
            <div
              key={collection.contractId}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CollectionCard
                collection={collection}
                previewImage={previews[collection.contractId]}
                isLoading={loadingIds.has(collection.contractId)}
                onClick={() => navigate(`/${collection.slug}`)}
              />
            </div>
          ))}
        </div>

        {collections.length === 0 && (
          <div className="rounded-lg p-12 text-center bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
            <p className="text-white/60">No collections configured</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
