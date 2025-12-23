import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionCard } from '@/components/CollectionCard';
import { PageHeader } from '@/components/PageHeader';
import { collections } from '@/config/collections';
import { getTokenUri } from '@/services/stellar';
import { fetchNFTMetadata, ipfsToHttp } from '@/services/ipfs';

export default function LandingPage() {
  const navigate = useNavigate();
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreviews = async () => {
      setLoading(true);
      const results = await Promise.allSettled(
        collections.map(async (collection) => {
          const uri = await getTokenUri(collection.contractId, 0);
          const metadata = await fetchNFTMetadata(uri);
          return { contractId: collection.contractId, image: metadata.image };
        })
      );
      
      const newPreviews: Record<string, string> = {};
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.image) {
          newPreviews[result.value.contractId] = ipfsToHttp(result.value.image);
        }
      });
      setPreviews(newPreviews);
      setLoading(false);
    };
    
    loadPreviews();
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <PageHeader
        title="ChimpDAO"
        subtitle="Explore the NFT collections"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Loading collections...</p>
          </div>
        ) : (
          collections.map((collection, idx) => (
            <div
              key={collection.contractId}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CollectionCard
                collection={collection}
                previewImage={previews[collection.contractId]}
                onClick={() => navigate(`/${collection.slug}`)}
              />
            </div>
          ))
        )}
      </div>

      {collections.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-muted-foreground">No collections configured</p>
        </div>
      )}
    </div>
  );
}
