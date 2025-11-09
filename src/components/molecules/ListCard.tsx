"use client";

import React from 'react';
import { Users } from 'lucide-react';
import { gradientColors, GradientColor } from '@/styles/gradients';

interface ListCardProps {
  id: string;
  name: string;
  members: number;
  totalTasks: number;
  completedTasks: number;
  progress: number;
  color: GradientColor;
  onClick: () => void;
}

export const ListCard: React.FC<ListCardProps> = ({
  name,
  members,
  totalTasks,
  completedTasks,
  progress,
  color,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-slate-200 rounded-2xl p-5 bg-white hover:shadow-md active:scale-98 transition-all text-left group"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
          {name}
        </h4>
        <span className={`text-2xl font-bold bg-gradient-to-r ${gradientColors[color]} bg-clip-text text-transparent`}>
          {progress}%
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <Users size={12} strokeWidth={2.5} className="text-slate-600" />
          </div>
          <span className="font-semibold">{members}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-400">•</span>
          <span className="font-medium">
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>
      </div>

      <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${gradientColors[color]} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  );
};