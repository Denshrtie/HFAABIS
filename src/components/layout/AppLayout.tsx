import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { BottomNavBar } from './BottomNavBar';

interface AppLayoutProps {
  title?: string;
  hideHeader?: boolean;
  hideBottomNav?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  hideHeader = false,
  hideBottomNav = false,
}) => {
  return (
    <div className="min-h-screen bg-[#F4F8F7] flex flex-col justify-between antialiased">
      {/* Centered Mobile Shell Frame */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col relative border-x border-slate-100/80">
        {!hideHeader && <AppHeader title={title} />}

        <main className="flex-1 pb-24 overscroll-y-contain animate-fade-in">
          <Outlet />
        </main>

        {!hideBottomNav && <BottomNavBar />}
      </div>
    </div>
  );
};
