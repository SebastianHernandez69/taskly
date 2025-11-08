"use client";

import React, { useState } from 'react'
import { HeroCard } from '../molecules/HeroCard';
import { Search } from 'lucide-react';
import { EmptyListState } from '../molecules/EmptyListState';
import { ListCard } from '../molecules/ListCard';
import { NewListDialog } from './NewListDialog';

interface List {
  id: string;
  name: string;
  description?: string;
  members: number;
  totalTasks: number;
  completedTasks: number;
  progress: number;
  color: string;
}

interface ListSectionClientProps {
  initialLists: List[];
}

export const ListSectionClient = ({initialLists}: ListSectionClientProps ) => {
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');

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

          {initialLists.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {initialLists.map((list) => (
                <ListCard key={list.id} {...list} onClick={() => {}} />
              ))}
            </div>
          ) : (
            <EmptyListState onNewList={() => setShowNewList(true)} />
          )}
        </div>
      </div>


      {/* <NewListDialog
        open={showNewList}
        onOpenChange={setShowNewList}
        newListName={newListName}
        onNewListNameChange={setNewListName}
        newListDescription={newListDescription}
        onNewListDescriptionChange={setNewListDescription}
        onCreate={() => {}}
      /> */}
    </div>
  );
}
