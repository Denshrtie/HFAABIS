import { NotificationItem, ApplicationSubmission } from '../../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-01",
    title: "Action Required: Missing Medical Abstract",
    message: "Your application for Malasakit Center Universal Subsidy (#APP-2026-4928) requires an updated Clinical Abstract signed by the attending doctor.",
    timestamp: "2 hours ago",
    type: "action_required",
    read: false,
    relatedApplicationId: "APP-2026-4928",
    relatedProgramId: "prog-malasakit-01"
  },
  {
    id: "notif-02",
    title: "Application Status Update: Under Review",
    message: "PhilHealth Z-Benefits Specialized Illness Package application (#APP-2026-1804) has entered Medical Social Work review at Philippine Heart Center.",
    timestamp: "1 day ago",
    type: "info",
    read: false,
    relatedApplicationId: "APP-2026-1804",
    relatedProgramId: "prog-philhealth-z-02"
  },
  {
    id: "notif-03",
    title: "Program Quota Warning: Limited Slots",
    message: "PCSO Individual Medical Assistance Program has shifted to 'Limited' availability due to high applicant volume for the current cycle.",
    timestamp: "2 days ago",
    type: "warning",
    read: true,
    relatedProgramId: "prog-pcso-imap-03"
  },
  {
    id: "notif-04",
    title: "Guarantee Letter Approved! ₱45,000 Granted",
    message: "Congratulations! Your DSWD AICS Medical Assistance (#APP-2026-0912) has been approved. Present your digital voucher at PGH Billing.",
    timestamp: "3 days ago",
    type: "success",
    read: true,
    relatedApplicationId: "APP-2026-0912",
    relatedProgramId: "prog-dswd-aics-04"
  },
  {
    id: "notif-05",
    title: "Upcoming Deadline Reminder",
    message: "NKTI Kidney Care & Hemodialysis Grant Program cycle deadline is in 8 days. Ensure all dialysis prescription sheets are uploaded.",
    timestamp: "4 days ago",
    type: "warning",
    read: true,
    relatedProgramId: "prog-nkti-dialysis-10"
  },
  {
    id: "notif-06",
    title: "Documents Verified",
    message: "Your PhilHealth ID and Barangay Indigency verification documents have been verified and approved by the social service officer.",
    timestamp: "5 days ago",
    type: "success",
    read: true,
    relatedApplicationId: "APP-2026-4928"
  }
];

export const INITIAL_APPLICATIONS: ApplicationSubmission[] = [
  {
    id: "app-seed-01",
    referenceNumber: "APP-2026-4928",
    programId: "prog-malasakit-01",
    programName: "Malasakit Center One-Stop Medical Subsidy",
    providerName: "Department of Health & Multi-Agency Desk",
    hospitalName: "Philippine General Hospital (PGH)",
    patientName: "Juan Dela Cruz",
    patientAge: 46,
    patientContact: "+63 917 555 0192",
    patientEmail: "juan.delacruz@example.com",
    patientAddress: "142 Dimasalang St., Sampaloc, Manila",
    householdIncome: 14000,
    householdSize: 4,
    medicalCondition: "Acute Appendicitis with Localized Peritonitis (Emergency Surgery)",
    estimatedExpense: 68000,
    insuranceStatus: "philhealth",
    notes: "Patient is currently admitted at PGH Ward 4. Requesting billing subsidy for surgical materials and post-op antibiotics.",
    submissionDate: "2026-08-20T10:30:00Z",
    status: "under_review",
    estimatedResolutionDate: "August 28, 2026 (2-3 business days)",
    assistanceAmountGranted: 45000,
    documentsUploaded: [
      {
        docName: "Clinical Abstract / Medical Certificate",
        fileName: "clinical_abstract_pgh_dr_santos.pdf",
        fileSize: 1420000,
        fileType: "application/pdf",
        uploadedAt: "2026-08-20T10:25:00Z",
        status: "completed"
      },
      {
        docName: "Hospital Statement of Account (SOA) with PhilHealth deduction",
        fileName: "pgh_billing_soa_aug20.pdf",
        fileSize: 890000,
        fileType: "application/pdf",
        uploadedAt: "2026-08-20T10:26:00Z",
        status: "completed"
      },
      {
        docName: "Barangay Certificate of Indigency",
        fileName: "brgy_indigency_sampaloc.jpg",
        fileSize: 2100000,
        fileType: "image/jpeg",
        uploadedAt: "2026-08-20T10:28:00Z",
        status: "completed"
      },
      {
        docName: "Valid Government-issued ID of Patient & Representative",
        fileName: "philsys_national_id_front_back.png",
        fileSize: 1850000,
        fileType: "image/png",
        uploadedAt: "2026-08-20T10:29:00Z",
        status: "completed"
      }
    ],
    statusHistory: [
      {
        status: "submitted",
        timestamp: "2026-08-20T10:30:00Z",
        notes: "Application received and queued for Medical Social Work intake assessment."
      },
      {
        status: "under_review",
        timestamp: "2026-08-22T14:15:00Z",
        notes: "Intake officer verified PhilHealth deduction and assigned Class C2 socio-economic bracket.",
        actionRequired: "Awaiting final endorsement signature from MSS Chief."
      }
    ]
  },
  {
    id: "app-seed-02",
    referenceNumber: "APP-2026-1804",
    programId: "prog-philhealth-z-02",
    programName: "PhilHealth Z-Benefits Specialized Illness Package",
    providerName: "Philippine Health Insurance Corporation (PhilHealth)",
    hospitalName: "Philippine Heart Center (PHC)",
    patientName: "Juan Dela Cruz",
    patientAge: 46,
    patientContact: "+63 917 555 0192",
    patientEmail: "juan.delacruz@example.com",
    patientAddress: "142 Dimasalang St., Sampaloc, Manila",
    householdIncome: 14000,
    householdSize: 4,
    medicalCondition: "Coronary Artery Disease - 3 Vessel Disease (Elective CABG)",
    estimatedExpense: 350000,
    insuranceStatus: "philhealth",
    notes: "Pre-authorization request for Z-Benefit Coronary Artery Bypass Graft (CABG) package.",
    submissionDate: "2026-08-10T09:00:00Z",
    status: "approved",
    estimatedResolutionDate: "Approved",
    assistanceAmountGranted: 275000,
    documentsUploaded: [
      {
        docName: "PhilHealth Member Data Record (MDR)",
        fileName: "philhealth_mdr_2026.pdf",
        fileSize: 450000,
        fileType: "application/pdf",
        uploadedAt: "2026-08-10T08:45:00Z",
        status: "completed"
      },
      {
        docName: "Specialist Diagnostic Work-up & Biopsy / Angiogram Report",
        fileName: "phc_coronary_angiogram_report.pdf",
        fileSize: 3200000,
        fileType: "application/pdf",
        uploadedAt: "2026-08-10T08:50:00Z",
        status: "completed"
      }
    ],
    statusHistory: [
      {
        status: "submitted",
        timestamp: "2026-08-10T09:00:00Z",
        notes: "Z-Benefit Pre-authorization form submitted online."
      },
      {
        status: "under_review",
        timestamp: "2026-08-12T11:20:00Z",
        notes: "Clinical review panel approved surgical protocol eligibility."
      },
      {
        status: "approved",
        timestamp: "2026-08-15T16:00:00Z",
        notes: "Z-Benefit Pre-authorization Letter issued: ₱275,000 credited to PHC Patient Account."
      }
    ]
  }
];
