import { ExternalLink } from 'lucide-react';

interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
  highlighted?: boolean;
  link?: string;
}

export function AttributeBadge({ traitType, value, highlighted, link }: AttributeBadgeProps) {
  return (
    <div className="glass-card p-3 space-y-2">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {traitType}
      </p>
      {link && highlighted ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chimp-purple text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_25px_hsl(270_100%_60%/0.5),0_0_50px_hsl(270_100%_60%/0.25)] hover:scale-105"
          aria-label={`${value} - opens shop in new tab`}
        >
          {value}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ) : link ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          aria-label={`${value} - opens in new tab`}
        >
          {value}
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      ) : (
        <p className="text-sm font-medium">{value}</p>
      )}
    </div>
  );
}
