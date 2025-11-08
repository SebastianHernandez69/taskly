import React from 'react';
import { Badge as ShadcnBadge } from '@/components/ui/badge';

interface BadgeProps {
  count: number;
}

export const Badge: React.FC<BadgeProps> = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <ShadcnBadge 
      variant="destructive" 
      className="absolute top-0.5 right-0.5 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold rounded-full bg-gradient-to-br from-red-500 to-pink-500 border-0"
    >
      {count}
    </ShadcnBadge>
  );
};