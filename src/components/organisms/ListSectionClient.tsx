"use client";

import React, { useState, useOptimistic, startTransition } from 'react'
import { HeroCard } from '../molecules/HeroCard';
import { Search } from 'lucide-react';
import { EmptyListState } from '../molecules/EmptyListState';
import { ListCard } from '../molecules/ListCard';
import { NewListDialog } from './NewListDialog';
import { GradientColor } from '@/styles/gradients';
import { createList } from '@/lib/server/actions/lists';
import { useRouter } from 'next/navigation';

interface List {
  id: string;
  name: string;
  description?: string;
  members: number;
  totalTasks: number;
  completedTasks: number;
  progress: number;
  color: GradientColor;
}

interface Color {
  id: string;
  class: GradientColor;
}

interface ListSectionClientProps {
  initialLists: List[];
  colors: Color[];
}

export const ListSectionClient = ({initialLists, colors}: ListSectionClientProps ) => {
  const [showNewList, setShowNewList] = useState(false);
  const router = useRouter();

  const [optimisticLists, addOptimisticList] = useOptimistic(
    initialLists,
    (state, newList: List) => [...state, newList]
  );

  const handleCreateList = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const colorId = formData.get("colorId") as string;
    
    const optimisticList: List = {
      id: `temp-${Date.now()}`,
      name,
      description,
      members: 1,
      totalTasks: 0,
      completedTasks: 0,
      progress: 0,
      color: colors.find(c => c.id === colorId)?.class || colors[0]?.class || ''
    };

    startTransition(() => {
      addOptimisticList(optimisticList);
    });
    
    const result = await createList(formData);
    
    router.refresh();

    return result;
  };

  return (
    <div className="container mx-auto px-6 pb-8 flex-1">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column (Hero) */}
        <div className="lg:col-span-1 lg:sticky top-8 h-min">
          <div className="mx-auto mt-10 px-2">
            <HeroCard onNewList={() => setShowNewList(true)} />
          </div>
        </div>

        {/* Right Column (Lists) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between my-4">
            <h3 className="text-lg font-bold text-slate-800">Your lists</h3>
            <button className="p-2.5 hover:bg-white/50 rounded-full transition-all active:scale-95">
              <Search size={20} className="text-slate-600" />
            </button>
          </div>

          {optimisticLists.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {optimisticLists.map((list) => (
                <ListCard key={list.id} {...list} onClick={() => {}} />
              ))}
            </div>
          ) : (
            <EmptyListState onNewList={() => setShowNewList(true)} />
          )}
        </div>
      </div>

      <NewListDialog
        open={showNewList}
        onOpenChange={setShowNewList}
        onCreateAction={handleCreateList}
        colors={colors.map(c => ({ $id: c.id, class: c.class }))}
      />
    </div>
  );
}
