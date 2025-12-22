interface AttributeBadgeProps {
  traitType: string;
  value: string | number;
}

export function AttributeBadge({ traitType, value }: AttributeBadgeProps) {
  return (
    <div className="glass-card p-3 space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {traitType}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
