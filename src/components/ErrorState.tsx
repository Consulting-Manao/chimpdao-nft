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

const BackgroundPattern = () => (
  <div 
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage: 'url(/token-bg-pattern.png)',
      backgroundSize: '600px',
      backgroundRepeat: 'repeat'
    }}
    aria-hidden="true"
  />
);

export function ErrorState({ title, message, action }: ErrorStateProps) {
  return (
    <div className="min-h-screen p-6 flex items-center justify-center relative bg-[hsl(30_25%_32%)]">
      <BackgroundPattern />
      <div className="rounded-lg p-8 text-center max-w-md relative z-10 bg-[hsl(30_15%_28%/0.6)] border border-[hsl(30_15%_40%/0.3)]">
        <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
        <p className="text-white/60 mb-6">{message}</p>
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
