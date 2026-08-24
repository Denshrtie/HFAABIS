import { create } from 'zustand';
import { NotificationItem } from '../types';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';

const STORAGE_KEY_NOTIFICATIONS = 'hfaabis_notifications_v1';

function loadNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (!raw) return INITIAL_NOTIFICATIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return INITIAL_NOTIFICATIONS;
  } catch (e) {
    console.error('Error loading notifications:', e);
    return INITIAL_NOTIFICATIONS;
  }
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: () => number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  resetNotificationsToDefault: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: loadNotifications(),

  unreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },

  markAsRead: (id: string) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save notifications:', e);
      }
      return { notifications: updated };
    });
  },

  markAllAsRead: () => {
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, read: true }));
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save notifications:', e);
      }
      return { notifications: updated };
    });
  },

  addNotification: (payload) => {
    const newId = `notif-${Date.now()}`;
    const newNotif: NotificationItem = {
      ...payload,
      id: newId,
      timestamp: 'Just now',
      read: false,
    };

    set((state) => {
      const updated = [newNotif, ...state.notifications];
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save notification:', e);
      }
      return { notifications: updated };
    });
  },

  resetNotificationsToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_NOTIFICATIONS);
    } catch (e) {
      console.error('Failed to reset notifications:', e);
    }
    set({ notifications: INITIAL_NOTIFICATIONS });
  },
}));
