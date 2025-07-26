// components/ui/LoadingSpinner.tsx
import { cn } from '@/lib/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'secondary' | 'white';
}

const LoadingSpinner = ({ 
  size = 'md', 
  className,
  variant = 'primary' 
}: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const variants = {
    primary: 'border-amber-200 border-t-amber-600',
    secondary: 'border-orange-200 border-t-orange-600', 
    white: 'border-white/30 border-t-white',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'border-4 rounded-full animate-spin',
          sizes[size],
          variants[variant],
          className
        )}
      />
    </div>
  );
};

export { LoadingSpinner };