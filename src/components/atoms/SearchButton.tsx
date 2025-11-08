import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchButtonProps {
  onClick?: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="rounded-full hover:bg-white/50 transition-all active:scale-95"
    >
      <Search size={20} className="text-slate-600" />
    </Button>
  );
};
