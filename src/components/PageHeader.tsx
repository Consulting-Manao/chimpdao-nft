import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
  backLabel?: string;
  icon?: string;
  yellowTitle?: boolean;
}

export function PageHeader({ title, subtitle, showBack, backTo, backLabel, icon, yellowTitle }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="mb-8">
      {showBack && (
        <button
          onClick={() => navigate(backTo || '/')}
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={backLabel || "Go back"}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm">{backLabel || "Back"}</span>
        </button>
      )}
      <div className="flex items-center gap-3">
        {icon && (
          <img
            src={icon}
            alt=""
            className="h-10 w-10"
            aria-hidden="true"
          />
        )}
        <h1 className={`text-3xl font-bold ${yellowTitle ? 'text-glow' : ''}`}>
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
    </header>
  );
}
