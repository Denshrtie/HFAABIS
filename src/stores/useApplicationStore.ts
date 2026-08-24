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
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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
  updateApplicationStatus: (id: string, status: ApplicationStatus, notes: string, actionRequired?: string) => void;
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
    const state = get();
    return state.applications.find((a) => a.id === id || a.referenceNumber === id);
  },

  getApplicationByRef: (ref: string) => {
    return get().applications.find((a) => a.referenceNumber === ref);
  },

  updateApplicationStatus: (id: string, status: ApplicationStatus, notes: string, actionRequired?: string) => {
    set((state) => {
      const timestamp = new Date().toISOString();
      const updated = state.applications.map((app) => {
        if (app.id === id || app.referenceNumber === id) {
          const newHistory = [
            ...app.statusHistory,
            { status, timestamp, notes, actionRequired },
          ];
          return {
            ...app,
            status,
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
      const updated = state.applications.map((app) => {
        if (app.id === appId || app.referenceNumber === appId) {
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
