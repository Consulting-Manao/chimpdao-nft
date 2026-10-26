import { Collection } from '@/config/collections';

interface CollectionCardProps {
  collection: Collection;
  previewImage?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export const CollectionCard = ({ collection, previewImage, isLoading, onClick }: CollectionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="glass-card-hover w-full text-left overflow-hidden group"
      aria-label={`View ${collection.name} collection`}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {isLoading ? (
          <div className="w-full h-full bg-muted animate-pulse" aria-hidden="true" />
        ) : previewImage ? (
          <img
            src={previewImage}
            alt={`Preview image from ${collection.name} collection`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{collection.name}</h3>
        {collection.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {collection.description}
          </p>
        )}
      </div>
    </button>
  );
};
