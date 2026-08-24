import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Bell, HeartPulse, Building2, User, Sparkles } from 'lucide-react';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { useUserStore } from '../../stores/useUserStore';
import { Modal } from '../common/Modal';
import { NotificationDropdown } from '../notifications/NotificationDropdown';

interface AppHeaderProps {
  title?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const unreadCount = useNotificationStore((state) => state.unreadCount());
  const { isStaffMode, toggleStaffMode } = useUserStore();
  const [showNotifModal, setShowNotifModal] = useState(false);

  const isRootTab = ['/', '/eligibility', '/applications', '/saved', '/profile'].includes(
    location.pathname
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/80 shadow-soft transition-all">
        {/* Prototype Staff Mode banner if active */}
        {isStaffMode && (
          <div className="bg-amber-500 text-slate-900 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>PROTOTYPE STAFF MODE (LGU / Hospital Social Work View)</span>
            </div>
            <button
              type="button"
              onClick={toggleStaffMode}
              className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold hover:bg-slate-800 transition"
            >
              Exit Staff Mode
            </button>
          </div>
        )}

        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between gap-2">
          {/* Left side: Back Button or Logo */}
          <div className="flex items-center gap-2 min-w-0">
            {!isRootTab ? (
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Go back to previous page"
                className="touch-target p-2 -ml-2 text-brand-700 hover:text-brand-900 hover:bg-brand-50 rounded-full transition-colors flex items-center gap-1 font-semibold text-xs"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden xs:inline">Back</span>
              </button>
            ) : (
              <Link
                to="/"
                className="flex items-center gap-2 text-brand-700 font-extrabold tracking-tight group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-sage-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-base font-extrabold tracking-tight text-brand-900 flex items-center gap-1">
                    HFAABIS
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-sage-100 text-sage-800 rounded-full border border-sage-200">
                      PH
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Health Financial Aid PH
                  </span>
                </div>
              </Link>
            )}

            {/* Custom page title for inner screens */}
            {!isRootTab && title && (
              <h1 className="text-sm font-bold text-slate-800 truncate ml-1">
                {title}
              </h1>
            )}
          </div>

          {/* Right side: Prototype Switch & Notification Bell */}
          <div className="flex items-center gap-1">
            {/* Quick Switch to Staff / Patient View */}
            <button
              type="button"
              onClick={toggleStaffMode}
              title={isStaffMode ? "Switch to Patient View" : "Switch to Hospital / LGU Staff Mode"}
              className={`touch-target px-2.5 py-1 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
                isStaffMode
                  ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200'
              }`}
            >
              {isStaffMode ? (
                <>
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Patient View</span>
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5 text-brand-600" />
                  <span className="hidden sm:inline">Staff Mode</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setShowNotifModal(true)}
              aria-label={`View notifications (${unreadCount} unread)`}
              className="touch-target relative p-2 text-slate-600 hover:text-brand-700 hover:bg-brand-50 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse border border-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      <Modal
        isOpen={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        title="Notifications & Action Alerts"
        maxWidth="md"
      >
        <NotificationDropdown onClose={() => setShowNotifModal(false)} />
      </Modal>
    </>
  );
};
