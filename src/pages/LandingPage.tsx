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

  useEffect(() => {
    // Load preview images for each collection (token 0)
    collections.forEach(async (collection) => {
      try {
        const uri = await getTokenUri(collection.contractId, 0);
        const metadata = await fetchNFTMetadata(uri);
        if (metadata.image) {
          setPreviews(prev => ({
            ...prev,
            [collection.contractId]: ipfsToHttp(metadata.image!)
          }));
        }
      } catch {
        // Silently fail for preview
      }
    });
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <PageHeader
        title="NFT Collections"
        subtitle="Explore Stellar NFT collections"
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
              onClick={() => navigate(`/${collection.slug}`)}
            />
          </div>
        ))}
      </div>

      {collections.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-muted-foreground">No collections configured</p>
        </div>
      )}
    </div>
  );
}
