import { NFTMetadata } from '@/services/ipfs';

interface NFTCardProps {
  tokenId: number;
  metadata?: NFTMetadata;
  imageUrl?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const playGorillaSound = () => {
  const audio = new Audio('/sounds/gorilla-chest.m4a');
  audio.volume = 0.5;
  audio.play().catch(() => {});
};

export function NFTCard({ tokenId, metadata, imageUrl, isLoading, onClick }: NFTCardProps) {
  const name = metadata?.name || `Token #${tokenId}`;

  const handleClick = () => {
    playGorillaSound();
    onClick?.();
  };

  if (isLoading) {
    return (
      <div className="glass-card overflow-hidden" role="status" aria-label="Loading token">
        <div className="aspect-square bg-muted animate-pulse" />
        <div className="p-3">
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="glass-card-hover w-full text-left overflow-hidden group"
      aria-label={`View details for ${name}`}
    >
      <div className="aspect-square overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center" aria-hidden="true">
            <span className="text-muted-foreground">#{tokenId}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium truncate">{name}</p>
      </div>
    </button>
  );
}
