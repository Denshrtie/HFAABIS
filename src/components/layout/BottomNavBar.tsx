import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Sparkles, ClipboardList, Bookmark, User, Building2 } from 'lucide-react';
import { useProgramStore } from '../../stores/useProgramStore';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { useUserStore } from '../../stores/useUserStore';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const savedCount = useProgramStore((state) => state.savedProgramIds.length);
  const applicationCount = useApplicationStore((state) => state.applications.length);
  const isStaffMode = useUserStore((state) => state.isStaffMode);

  const tabs = [
    {
      to: '/',
      label: 'Explore',
      icon: Home,
      exact: true,
    },
    {
      to: '/eligibility',
      label: 'Eligibility',
      icon: Sparkles,
    },
    {
      to: '/applications',
      label: 'Applications',
      icon: ClipboardList,
      badge: applicationCount > 0 ? applicationCount : undefined,
    },
    {
      to: '/saved',
      label: 'Saved',
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    {
      to: isStaffMode ? '/portal/manage' : '/profile',
      label: isStaffMode ? 'Staff Portal' : 'Profile',
      icon: isStaffMode ? Building2 : User,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-nav pb-safe"
    >
      <div className="max-w-md mx-auto px-2 flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact
            ? location.pathname === tab.to
            : location.pathname.startsWith(tab.to);

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`relative flex flex-col items-center justify-center flex-1 h-full min-h-[44px] min-w-[44px] py-1 transition-all duration-200 ${
                isActive
                  ? 'text-brand-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-brand-50 text-brand-600 scale-105' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-extrabold flex items-center justify-center border border-white ${
                      isActive ? 'bg-brand-600 text-white' : 'bg-slate-500 text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
