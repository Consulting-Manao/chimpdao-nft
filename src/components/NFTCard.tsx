import { NFTMetadata } from '@/services/ipfs';

interface NFTCardProps {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export function NFTCard({ tokenId, metadata, imageUrl, isLoading, onClick }: NFTCardProps) {
  if (isLoading) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="aspect-square bg-muted animate-pulse" />
        <div className="p-3">
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="glass-card-hover w-full text-left overflow-hidden group"
    >
      <div className="aspect-square overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={metadata?.name || `Token #${tokenId}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">#{tokenId}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium truncate">
          {metadata?.name || `Token #${tokenId}`}
        </p>
      </div>
    </button>
  );
}
