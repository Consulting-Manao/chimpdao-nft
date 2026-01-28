import { ExternalLink } from 'lucide-react';

interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
  highlighted?: boolean;
  link?: string;
}

export function AttributeBadge({ traitType, value, highlighted, link }: AttributeBadgeProps) {
  return (
    <div className="glass-card p-3 space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {traitType}
      </p>
      {link ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
            transition-all duration-200
            ${highlighted 
              ? 'bg-chimp-purple/20 text-chimp-purple border border-chimp-purple/30 hover:bg-chimp-purple/30 hover:shadow-[0_0_20px_hsl(270_100%_60%/0.4),0_0_40px_hsl(270_100%_60%/0.2)]' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }
          `}
          aria-label={`${value} - opens shop in new tab`}
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
