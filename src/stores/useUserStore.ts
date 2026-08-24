import { create } from 'zustand';
import { UserProfile } from '../types';

const STORAGE_KEY_PROFILE = 'hfaabis_user_profile_v1';
const STORAGE_KEY_STAFF_MODE = 'hfaabis_staff_mode_v1';

const DEFAULT_PROFILE: UserProfile = {
  name: "Juan Dela Cruz",
  email: "juan.delacruz@example.com",
  phone: "+63 917 555 0192",
  address: "142 Dimasalang St., Sampaloc",
  city: "Manila",
  philhealthNumber: "12-345678901-2",
  monthlyHouseholdIncome: 14000,
  householdSize: 4,
  isIndigentCertified: true,
  preferredHospitalId: "hosp-pgh-01",
};

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading user profile:', e);
    return DEFAULT_PROFILE;
  }
}

function loadStaffMode(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STAFF_MODE);
    return raw === 'true';
  } catch {
    return false;
  }
}

interface UserState {
  profile: UserProfile;
  isStaffMode: boolean;
  setStaffMode: (isStaff: boolean) => void;
  toggleStaffMode: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetAllMockData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: loadProfile(),
  isStaffMode: loadStaffMode(),

  setStaffMode: (isStaff: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY_STAFF_MODE, String(isStaff));
    } catch (e) {
      console.error('Failed to set staff mode:', e);
    }
    set({ isStaffMode: isStaff });
  },

  toggleStaffMode: () => {
    set((state) => {
      const next = !state.isStaffMode;
      try {
        localStorage.setItem(STORAGE_KEY_STAFF_MODE, String(next));
      } catch (e) {
        console.error('Failed to toggle staff mode:', e);
      }
      return { isStaffMode: next };
    });
  },

  updateProfile: (updates: Partial<UserProfile>) => {
    set((state) => {
      const updated = { ...state.profile, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save profile:', e);
      }
      return { profile: updated };
    });
  },

  resetAllMockData: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
    window.location.reload();
  },
}));
