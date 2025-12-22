import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export function PageHeader({ title, subtitle, showBack }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="mb-8">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>
      )}
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
    </header>
  );
}
