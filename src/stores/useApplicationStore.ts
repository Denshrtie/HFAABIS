import { create } from 'zustand';
import { ApplicationSubmission, ApplicationStatus, UploadedDocument } from '../types';
import { INITIAL_APPLICATIONS } from '../data/notifications';
import { generateReferenceNumber } from '../utils';

const STORAGE_KEY_APPLICATIONS = 'hfaabis_applications_v1';

function loadApplications(): ApplicationSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
    if (!raw) return INITIAL_APPLICATIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge any initial seed applications that might be missing in older stored versions
      const existingRefs = new Set(parsed.map((a: ApplicationSubmission) => a.referenceNumber?.toLowerCase()));
      const missingSeeds = INITIAL_APPLICATIONS.filter(
        (seed) => !existingRefs.has(seed.referenceNumber.toLowerCase())
      );
      if (missingSeeds.length > 0) {
        const merged = [...parsed, ...missingSeeds];
        localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    return INITIAL_APPLICATIONS;
  } catch (e) {
    console.error('Error loading applications from localStorage:', e);
    return INITIAL_APPLICATIONS;
  }
}

interface CreateApplicationPayload {
  programId: string;
  programName: string;
  providerName: string;
  hospitalName?: string;
  patientName: string;
  patientAge: number;
  patientContact: string;
  patientEmail?: string;
  patientAddress: string;
  householdIncome: number;
  householdSize: number;
  medicalCondition: string;
  estimatedExpense: number;
  insuranceStatus: "philhealth" | "hmo" | "uninsured";
  notes?: string;
  documentsUploaded: UploadedDocument[];
}

interface ApplicationState {
  applications: ApplicationSubmission[];
  submitApplication: (payload: CreateApplicationPayload) => ApplicationSubmission;
  getApplicationById: (id: string) => ApplicationSubmission | undefined;
  getApplicationByRef: (ref: string) => ApplicationSubmission | undefined;
  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus,
    notes: string,
    actionRequired?: string,
    assistanceAmountGranted?: number
  ) => void;
  attachDocumentToApplication: (appId: string, document: UploadedDocument) => void;
  resetApplicationsToDefault: () => void;
}

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  applications: loadApplications(),

  submitApplication: (payload: CreateApplicationPayload) => {
    const referenceNumber = generateReferenceNumber();
    const newId = `app-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
    const submissionDate = new Date().toISOString();

    const newApplication: ApplicationSubmission = {
      id: newId,
      referenceNumber,
      programId: payload.programId,
      programName: payload.programName,
      providerName: payload.providerName,
      hospitalName: payload.hospitalName,
      patientName: payload.patientName,
      patientAge: payload.patientAge,
      patientContact: payload.patientContact,
      patientEmail: payload.patientEmail,
      patientAddress: payload.patientAddress,
      householdIncome: payload.householdIncome,
      householdSize: payload.householdSize,
      medicalCondition: payload.medicalCondition,
      estimatedExpense: payload.estimatedExpense,
      insuranceStatus: payload.insuranceStatus,
      notes: payload.notes,
      submissionDate,
      status: "submitted",
      estimatedResolutionDate: "Estimated in 3-5 business days",
      documentsUploaded: payload.documentsUploaded,
      statusHistory: [
        {
          status: "submitted",
          timestamp: submissionDate,
          notes: "Application officially submitted online and queued for intake verification.",
        },
      ],
    };

    set((state) => {
      const updated = [newApplication, ...state.applications];
      try {
        localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save application to localStorage:', e);
      }
      return { applications: updated };
    });

    return newApplication;
  },

  getApplicationById: (id: string) => {
    if (!id) return undefined;
    const normalized = id.trim().toLowerCase();
    const state = get();
    return state.applications.find(
      (a) =>
        a.id.toLowerCase() === normalized ||
        a.referenceNumber.toLowerCase() === normalized
    );
  },

  getApplicationByRef: (ref: string) => {
    if (!ref) return undefined;
    const normalized = ref.trim().toLowerCase();
    return get().applications.find(
      (a) => a.referenceNumber.toLowerCase() === normalized
    );
  },

  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus,
    notes: string,
    actionRequired?: string,
    assistanceAmountGranted?: number
  ) => {
    set((state) => {
      const timestamp = new Date().toISOString();
      const normalized = id.trim().toLowerCase();
      const updated = state.applications.map((app) => {
        if (
          app.id.toLowerCase() === normalized ||
          app.referenceNumber.toLowerCase() === normalized
        ) {
          const newHistory = [
            ...app.statusHistory,
            { status, timestamp, notes, actionRequired },
          ];
          return {
            ...app,
            status,
            estimatedResolutionDate: status === 'approved' ? 'Approved' : status === 'rejected' ? 'Declined' : app.estimatedResolutionDate,
            assistanceAmountGranted:
              assistanceAmountGranted !== undefined
                ? assistanceAmountGranted
                : app.assistanceAmountGranted,
            statusHistory: newHistory,
          };
        }
        return app;
      });

      try {
        localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update application status:', e);
      }
      return { applications: updated };
    });
  },

  attachDocumentToApplication: (appId: string, document: UploadedDocument) => {
    set((state) => {
      const normalized = appId.trim().toLowerCase();
      const updated = state.applications.map((app) => {
        if (
          app.id.toLowerCase() === normalized ||
          app.referenceNumber.toLowerCase() === normalized
        ) {
          const existingDocs = app.documentsUploaded.filter(
            (d) => d.docName !== document.docName
          );
          return {
            ...app,
            documentsUploaded: [...existingDocs, document],
          };
        }
        return app;
      });

      try {
        localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to attach document to storage:', e);
      }
      return { applications: updated };
    });
  },

  resetApplicationsToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_APPLICATIONS);
    } catch (e) {
      console.error('Failed to reset applications:', e);
    }
    set({ applications: INITIAL_APPLICATIONS });
  },
}));
