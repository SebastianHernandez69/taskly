"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyListStateProps {
  onNewList: () => void;
}

export const EmptyListState: React.FC<EmptyListStateProps> = ({ onNewList }) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Plus size={32} className="text-indigo-600" />
      </div>
      <p className="text-slate-500 font-medium mb-4">No lists yet</p>
      <Button
        onClick={onNewList}
        className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full py-3 px-6 font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
      >
        <Plus size={20} />
        Create your first list
      </Button>
    </div>
  );
};