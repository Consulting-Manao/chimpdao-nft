interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
  highlighted?: boolean;
  link?: string;
}

export function AttributeBadge({ traitType, value, highlighted, link }: AttributeBadgeProps) {
  const content = (
    <>
      <p className={`text-xs uppercase tracking-wide ${highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
        {traitType}
      </p>
      <p className={`text-sm font-medium ${highlighted ? 'text-white' : ''}`}>{value}</p>
    </>
  );

  if (link && highlighted) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ borderRadius: 'var(--radius-lg)' }}
        className="block p-3 space-y-1 bg-chimp-purple transition-all duration-200 hover:shadow-[0_0_25px_hsl(270_100%_60%/0.5),0_0_50px_hsl(270_100%_60%/0.25)] hover:scale-[1.02] hover:-translate-y-1"
        aria-label={`${traitType}: ${value} - opens shop in new tab`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="glass-card p-3 space-y-1">
      {content}
    </div>
  );
}
