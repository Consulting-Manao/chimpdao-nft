import { ExternalLink } from 'lucide-react';

interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
  highlighted?: boolean;
  link?: string;
}

export function AttributeBadge({ traitType, value, highlighted, link }: AttributeBadgeProps) {
  const valueContent = (
    <p className={`text-sm font-medium ${highlighted ? 'text-glow-purple' : ''}`}>
      {value}
      {link && <ExternalLink className="inline h-3 w-3 ml-1" aria-hidden="true" />}
    </p>
  );

  return (
    <div className={`glass-card p-3 space-y-1 ${highlighted ? 'border-chimp-purple/30' : ''}`}>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {traitType}
      </p>
      {link ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline"
          aria-label={`${value} - opens shop in new tab`}
        >
          {valueContent}
        </a>
      ) : (
        valueContent
      )}
    </div>
  );
}
