import { create } from 'zustand';
import { Hospital } from '../types';
import { INITIAL_HOSPITALS } from '../data/hospitals';

const STORAGE_KEY_HOSPITALS = 'hfaabis_hospitals_v1';

function loadHospitals(): Hospital[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HOSPITALS);
    if (!raw) return INITIAL_HOSPITALS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return INITIAL_HOSPITALS;
  } catch (e) {
    console.error('Error loading hospitals from localStorage:', e);
    return INITIAL_HOSPITALS;
  }
}

interface HospitalState {
  hospitals: Hospital[];
  getHospitalById: (id: string) => Hospital | undefined;
  updateHospitalInfo: (id: string, updates: Partial<Hospital>) => void;
  resetHospitalsToDefault: () => void;
}

export const useHospitalStore = create<HospitalState>((set, get) => ({
  hospitals: loadHospitals(),

  getHospitalById: (id: string) => {
    return get().hospitals.find((h) => h.id === id);
  },

  updateHospitalInfo: (id: string, updates: Partial<Hospital>) => {
    set((state) => {
      const updated = state.hospitals.map((h) =>
        h.id === id ? { ...h, ...updates } : h
      );
      try {
        localStorage.setItem(STORAGE_KEY_HOSPITALS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update hospital info in storage:', e);
      }
      return { hospitals: updated };
    });
  },

  resetHospitalsToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_HOSPITALS);
    } catch (e) {
      console.error('Failed to reset hospitals:', e);
    }
    set({ hospitals: INITIAL_HOSPITALS });
  },
}));
