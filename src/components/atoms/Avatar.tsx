import React from 'react';
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarProps {
  initials: string;
  imageUrl?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ initials, imageUrl, onClick }) => {
  return (
    <ShadcnAvatar onClick={onClick} className="cursor-pointer h-10 w-10 ring-2 ring-indigo-500/20 hover:ring-indigo-500/40 transition-all">
      <AvatarImage src={imageUrl} alt="User" />
      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold">
        {initials}
      </AvatarFallback>
    </ShadcnAvatar>
  );
};