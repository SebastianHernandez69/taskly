"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HeroCardProps {
    onNewList: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onNewList }) => {
  return (
    <Card className="border-2 border-slate-200 rounded-3xl p-8 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-2 text-center">
          Taskly
        </h2>
        <p className="text-sm text-slate-600 text-center mb-6 font-medium">
          Simplify your lists, together
        </p>

        <div className="flex justify-center">
          <Button
            onClick={onNewList}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full py-3.5 px-6 font-semibold hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Plus size={20} strokeWidth={2.5} />
            New list
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
          Real-time sync keeps everyone on the same page. Open, add, mark as done
          and delete - That's it.
        </p>
      </CardContent>
    </Card>
  );
};