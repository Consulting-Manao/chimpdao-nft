interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
  highlighted?: boolean;
  link?: string;
  rarity?: number;
}

export function AttributeBadge({ traitType, value, highlighted, link, rarity }: AttributeBadgeProps) {
  const content = (
    <>
      <p className={`text-[10px] uppercase tracking-wide ${highlighted ? 'text-white/70' : 'text-white/50'}`}>
        {traitType}
      </p>
      <div className="flex items-baseline gap-1.5 min-w-0">
        <p className={`text-xs font-medium break-words min-w-0 ${highlighted ? 'text-white' : 'text-white/90'}`}>{value}</p>
        {rarity !== undefined && (
          <span className={`text-[10px] flex-shrink-0 ${highlighted ? 'text-white/60' : 'text-white/50'}`}>
            {rarity.toFixed(0)}%
          </span>
        )}
      </div>
    </>
  );

  if (link && highlighted) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block p-3 space-y-1 bg-chimp-purple transition-all duration-200 hover:bg-[hsl(270_100%_55%)] hover:scale-[1.02] hover:-translate-y-1"
        aria-label={`${traitType}: ${value} - opens shop in new tab`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-lg p-3 space-y-1 bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
      {content}
    </div>
  );
}
