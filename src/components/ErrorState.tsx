import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    to?: string;
    onClick?: () => void;
  };
}

export function ErrorState({ title, message, action }: ErrorStateProps) {
  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="glass-card p-8 text-center max-w-md">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        {action && (
          action.to ? (
            <Button asChild>
              <Link to={action.to}>{action.label}</Link>
            </Button>
          ) : (
            <Button onClick={action.onClick}>{action.label}</Button>
          )
        )}
      </div>
    </div>
  );
}
