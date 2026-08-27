export type AvailabilityStatus = "available" | "limited" | "currently_unavailable" | "not_offered";

export type ApplicationStatus = "submitted" | "under_review" | "approved" | "rejected";

export type ExpenseCategory = "hospital_bills" | "medicine" | "surgery" | "laboratory" | "dialysis" | "other";

export type AssistanceType = "financial_aid" | "discount" | "subsidy" | "insurance_benefit";

export type ProviderType = "hospital" | "government_lgu" | "insurance" | "charity";

export interface ContactInfo {
  phone: string;
  email: string;
  officeAddress: string;
  operatingHours?: string;
}

export interface EligibilityRules {
  maxMonthlyIncome: number;
  requiresIndigency: boolean;
  coveredTreatments: string[];
  minAge?: number;
  maxAge?: number;
  allowedInsurance?: ("philhealth" | "hmo" | "uninsured" | "any")[];
}

export interface AssistanceProgram {
  id: string;
  name: string;
  providerName: string;
  providerType: ProviderType;
  hospitalId?: string;
  category: ExpenseCategory[];
  assistanceType: AssistanceType;
  location: string;
  availability: AvailabilityStatus;
  description: string;
  benefitsSummary: string;
  maxAmountCovered?: number;
  eligibilityRules: EligibilityRules;
  requiredDocuments: string[];
  applicationProcedure: string[];
  applicationDeadline?: string;
  contactInfo: ContactInfo;
  featured?: boolean;
  processingDays?: string;
  tags?: string[];
}

export interface HospitalDiscount {
  id: string;
  title: string;
  description: string;
  discountRate: string;
  category: string;
  requirements: string[];
}

export interface PartnerOrg {
  id: string;
  name: string;
  type: string;
  logoText: string;
  supportDetails: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  website: string;
  isVerifiedPartner: boolean;
  imageUrl: string;
  malasakitCenter: boolean;
  emergencyContact: string;
  discounts: HospitalDiscount[];
  partnerOrgs: PartnerOrg[];
  directionsUrl?: string;
}

export interface UploadedDocument {
  docName: string;
  fileName: string;
  fileSize?: number;
  fileType?: string;
  uploadedAt: string;
  status: "completed" | "missing";
  previewUrl?: string;
}

export interface StatusHistoryEntry {
  status: ApplicationStatus;
  timestamp: string;
  notes: string;
  actionRequired?: string;
}

export interface ApplicationSubmission {
  id: string;
  referenceNumber: string; // e.g. APP-2026-8942
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
  submissionDate: string;
  status: ApplicationStatus;
  documentsUploaded: UploadedDocument[];
  statusHistory: StatusHistoryEntry[];
  estimatedResolutionDate?: string;
  assistanceAmountGranted?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "info" | "action_required" | "success" | "warning";
  read: boolean;
  relatedApplicationId?: string;
  relatedProgramId?: string;
}

export interface EligibilityFormState {
  patientName?: string;
  patientAge: number | "";
  householdSize: number;
  monthlyIncome: number | "";
  location: string;
  primaryCondition: string;
  expenseCategories: ExpenseCategory[];
  estimatedExpenseRange: "under_50k" | "50k_250k" | "250k_500k" | "over_500k" | "";
  estimatedExpenseAmount?: number;
  insuranceStatus: "philhealth" | "hmo" | "uninsured" | "";
  hasBarangayIndigency: boolean;
}

export type MatchConfidence = "high" | "potential" | "not_met";

export interface ProgramMatchResult {
  program: AssistanceProgram;
  confidence: MatchConfidence;
  matchScore: number; // 0 to 100
  matchReasons: string[];
  unmetCriteria: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  philhealthNumber: string;
  monthlyHouseholdIncome: number;
  householdSize: number;
  isIndigentCertified: boolean;
  preferredHospitalId?: string;
}

export type MessageSender = "user" | "provider";

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  providerId: string;
  providerName: string;
  providerType?: ProviderType | string;
  programId?: string;
  programName?: string;
  applicationId?: string;
  messages: Message[];
  unreadCount: number;
  updatedAt: string;
  isOnline?: boolean;
}
