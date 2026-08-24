import { create } from 'zustand';
import { AssistanceProgram, AvailabilityStatus } from '../types';
import { INITIAL_PROGRAMS } from '../data/programs';

const STORAGE_KEY_PROGRAMS = 'hfaabis_programs_v1';
const STORAGE_KEY_BOOKMARKS = 'hfaabis_bookmarks_v1';

function loadPrograms(): AssistanceProgram[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRAMS);
    if (!raw) return INITIAL_PROGRAMS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return INITIAL_PROGRAMS;
  } catch (e) {
    console.error('Error loading programs from localStorage:', e);
    return INITIAL_PROGRAMS;
  }
}

function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
    if (!raw) return ["prog-malasakit-01", "prog-philhealth-z-02"];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    console.error('Error loading bookmarks from localStorage:', e);
    return [];
  }
}

interface ProgramState {
  programs: AssistanceProgram[];
  savedProgramIds: string[];
  toggleBookmark: (programId: string) => void;
  isBookmarked: (programId: string) => boolean;
  addProgram: (program: Omit<AssistanceProgram, 'id'>) => AssistanceProgram;
  updateProgram: (id: string, updates: Partial<AssistanceProgram>) => void;
  updateAvailability: (id: string, availability: AvailabilityStatus) => void;
  resetProgramsToDefault: () => void;
  getProgramById: (id: string) => AssistanceProgram | undefined;
}

export const useProgramStore = create<ProgramState>((set, get) => ({
  programs: loadPrograms(),
  savedProgramIds: loadBookmarks(),

  toggleBookmark: (programId: string) => {
    set((state) => {
      const exists = state.savedProgramIds.includes(programId);
      const updated = exists
        ? state.savedProgramIds.filter((id) => id !== programId)
        : [...state.savedProgramIds, programId];

      try {
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save bookmarks:', e);
      }
      return { savedProgramIds: updated };
    });
  },

  isBookmarked: (programId: string) => {
    return get().savedProgramIds.includes(programId);
  },

  addProgram: (newProgData) => {
    const newId = `prog-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
    const newProgram: AssistanceProgram = {
      ...newProgData,
      id: newId,
    };

    set((state) => {
      const updated = [newProgram, ...state.programs];
      try {
        localStorage.setItem(STORAGE_KEY_PROGRAMS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save programs:', e);
      }
      return { programs: updated };
    });

    return newProgram;
  },

  updateProgram: (id: string, updates: Partial<AssistanceProgram>) => {
    set((state) => {
      const updated = state.programs.map((prog) =>
        prog.id === id ? { ...prog, ...updates } : prog
      );
      try {
        localStorage.setItem(STORAGE_KEY_PROGRAMS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save programs update:', e);
      }
      return { programs: updated };
    });
  },

  updateAvailability: (id: string, availability: AvailabilityStatus) => {
    set((state) => {
      const updated = state.programs.map((prog) =>
        prog.id === id ? { ...prog, availability } : prog
      );
      try {
        localStorage.setItem(STORAGE_KEY_PROGRAMS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update availability:', e);
      }
      return { programs: updated };
    });
  },

  resetProgramsToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_PROGRAMS);
    } catch (e) {
      console.error('Failed to remove programs from localStorage:', e);
    }
    set({ programs: INITIAL_PROGRAMS });
  },

  getProgramById: (id: string) => {
    return get().programs.find((p) => p.id === id);
  },
}));
