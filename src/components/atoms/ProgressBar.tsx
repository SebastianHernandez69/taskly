import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
  colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, colorClass }) => {
  return (
    <Progress 
      value={progress} 
      className={`h-1.5 ${colorClass || ''}`}
    />
  );
};