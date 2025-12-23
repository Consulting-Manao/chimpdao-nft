import { Collection } from '@/config/collections';

interface CollectionCardProps {
  collection: Collection;
  previewImage: string;
  onClick?: () => void;
}

export function CollectionCard({ collection, previewImage, onClick }: CollectionCardProps) {
  return (
    <button
      onClick={onClick}
      className="glass-card-hover w-full text-left overflow-hidden group"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={previewImage}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
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
}
