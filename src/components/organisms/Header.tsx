'use client';

import React from 'react';
import { Bell, User, Users, LogOut } from 'lucide-react';
import { Avatar } from '../atoms/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// interface HeaderProps {
//   notificationCount: number;
//   userName: string;
//   userEmail: string;
//   userInitials: string;
//   userImage?: string;
// }

export const Header = () => {
  const handleProfile = () => {
    console.log('Navigate to profile');
  };

  const handleCollaborators = () => {
    console.log('Navigate to collaborators');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <header className="w-full px-6 pt-8 pb-4 flex items-center justify-between">
      {/* Left side: App name */}
      <h1 className="text-2xl font-bold text-deep-teal">Taskly</h1>

      <div className="flex items-center gap-6">        
        <div className="relative">
          <Bell size={24} strokeWidth={2.5} className="text-slate-600" />
          {/* {notificationCount > 0 && ( */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 leading-none">
              2
            </span>
          {/* )} */}
        </div>

        {/* User Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Avatar initials="SH" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCollaborators}>
              <Users className="mr-2 h-4 w-4" />
              <span>Colaboradores</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
