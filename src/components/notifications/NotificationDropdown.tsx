import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { Bell, CheckCheck, AlertCircle, Info, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface NotificationDropdownProps {
  onClose?: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markAsRead(notif.id);
    if (onClose) onClose();

    if (notif.relatedApplicationId) {
      navigate(`/applications/${notif.relatedApplicationId}`);
    } else if (notif.relatedProgramId) {
      navigate(`/programs/${notif.relatedProgramId}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'action_required':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-brand-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          {notifications.filter((n) => !n.read).length} unread alerts
        </span>
        <button
          type="button"
          onClick={markAllAsRead}
          className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 p-1"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8 text-slate-500 space-y-2">
          <Bell className="w-8 h-8 mx-auto text-slate-300" />
          <p className="text-sm font-medium">No new notifications</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 ${
                n.read
                  ? 'bg-slate-50/70 border-slate-200/70 opacity-80'
                  : 'bg-white border-brand-200 shadow-soft hover:border-brand-400'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="shrink-0 mt-0.5">{getIcon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-0.5">
                    {n.message}
                  </p>
                </div>
              </div>

              {(n.relatedApplicationId || n.relatedProgramId) && (
                <div className="flex justify-end pt-1">
                  <span className="text-[11px] font-bold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {onClose && (
        <Button variant="outline" size="sm" fullWidth onClick={onClose}>
          Close
        </Button>
      )}
    </div>
  );
};
