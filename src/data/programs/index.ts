import { AssistanceProgram } from '../../types';

export const INITIAL_PROGRAMS: AssistanceProgram[] = [
  {
    id: "prog-malasakit-01",
    name: "Malasakit Center One-Stop Medical Subsidy",
    providerName: "Department of Health & Multi-Agency Desk",
    providerType: "government_lgu",
    hospitalId: "hosp-pgh-01",
    category: ["hospital_bills", "surgery", "medicine", "laboratory", "dialysis"],
    assistanceType: "subsidy",
    location: "Nationwide DOH & Public Hospitals (NCR, Luzon, Visayas, Mindanao)",
    availability: "available",
    description: "A one-stop shop in government hospitals that brings together DOH, DSWD, PCSO, and PhilHealth to cover out-of-pocket medical bills, laboratory fees, and hospital stay charges towards zero-balance billing for qualified patients.",
    benefitsSummary: "Up to 100% coverage of remaining hospital billing balance after PhilHealth deduction.",
    maxAmountCovered: 150000,
    eligibilityRules: {
      maxMonthlyIncome: 30000,
      requiresIndigency: true,
      coveredTreatments: [
        "Inpatient Hospitalization",
        "Emergency Surgery",
        "Intensive Care Unit (ICU)",
        "Laboratory & Imaging Tests",
        "Chemotherapy Drugs",
        "Dialysis Sessions"
      ],
      allowedInsurance: ["philhealth", "uninsured", "hmo", "any"]
    },
    requiredDocuments: [
      "Clinical Abstract / Medical Certificate",
      "Hospital Statement of Account (SOA) with PhilHealth deduction",
      "Barangay Certificate of Indigency",
      "Valid Government-issued ID of Patient & Representative",
      "Social Case Study Report (for bills > ₱50k)"
    ],
    applicationProcedure: [
      "Obtain an updated Statement of Account (SOA) and Clinical Abstract from the hospital billing/nursing station.",
      "Proceed to the on-site Malasakit Center desk located within the hospital premises.",
      "Submit the required documents and fill out the Unified Intake Sheet (UIS).",
      "Undergo a brief interview by the Medical Social Worker for classification.",
      "Receive the Guarantee Letter / Billing Credit Slip applied directly to your hospital discharge bill."
    ],
    applicationDeadline: undefined, // Continuous
    contactInfo: {
      phone: "(02) 8651-7800 loc 1105",
      email: "malasakit@doh.gov.ph",
      officeAddress: "Ground Floor Malasakit Center Desks at all DOH Hospitals",
      operatingHours: "Monday to Friday: 8:00 AM - 5:00 PM"
    },
    featured: true,
    processingDays: "1 to 2 business days",
    tags: ["Zero Billing", "Universal Aid", "Multi-Agency", "Government", "One-Stop"]
  },
  {
    id: "prog-philhealth-z-02",
    name: "PhilHealth Z-Benefits Specialized Illness Package",
    providerName: "Philippine Health Insurance Corporation (PhilHealth)",
    providerType: "insurance",
    hospitalId: "hosp-phc-03",
    category: ["surgery", "hospital_bills", "dialysis"],
    assistanceType: "insurance_benefit",
    location: "Contracted Z-Benefit Hospitals Nationwide",
    availability: "available",
    description: "Comprehensive financial risk protection package targeting catastrophic illnesses requiring prolonged hospital stays, costly surgeries, and specialized therapeutic interventions.",
    benefitsSummary: "Fixed package subsidies ranging from ₱100,000 up to ₱600,000 for critical surgeries and cancer therapies.",
    maxAmountCovered: 550000,
    eligibilityRules: {
      maxMonthlyIncome: 50000,
      requiresIndigency: false,
      coveredTreatments: [
        "Coronary Artery Bypass Graft (CABG)",
        "Breast Cancer (Early Stage)",
        "Cervical Cancer Treatment",
        "Kidney Transplantation",
        "Peritoneal Dialysis (First-line)",
        "Ventricular Septal Defect Repair"
      ],
      allowedInsurance: ["philhealth", "any"]
    },
    requiredDocuments: [
      "PhilHealth Member Data Record (MDR)",
      "PhilHealth Claim Form 1 & Claim Form 2",
      "Specialist Diagnostic Work-up & Biopsy / Angiogram Report",
      "Z-Benefit Pre-Authorization Clearance Checklist",
      "Approved Z-Benefit Enrollment Slip from Hospital Social Service"
    ],
    applicationProcedure: [
      "Consult with a PhilHealth-contracted specialist at an accredited hospital (e.g. PHC, PGH, NKTI).",
      "Attending doctor fills out the Z-Benefit Pre-Authorization Assessment.",
      "Submit forms to the hospital's PhilHealth desk for eligibility verification and electronic pre-authorization.",
      "Undergo approved treatment; package coverage is automatically credited towards the final hospital bill."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8441-7442 (Action Center Hotlines)",
      email: "actioncenter@philhealth.gov.ph",
      officeAddress: "Citystate Centre, 709 Shaw Blvd, Pasig City / Hospital PhilHealth Desks",
      operatingHours: "24/7 Hotline Support"
    },
    featured: true,
    processingDays: "3 to 5 business days",
    tags: ["Specialty Illness", "Catastrophic Care", "PhilHealth", "High Value", "Cancer & Cardiac"]
  },
  {
    id: "prog-pcso-imap-03",
    name: "PCSO Individual Medical Assistance Program (IMAP)",
    providerName: "Philippine Charity Sweepstakes Office",
    providerType: "charity",
    hospitalId: "hosp-lcp-04",
    category: ["hospital_bills", "medicine", "surgery", "dialysis", "laboratory"],
    assistanceType: "financial_aid",
    location: "PCSO Branch Offices & Partner Hospital Desks Nationwide",
    availability: "limited",
    description: "Direct charitable financial assistance program providing Guarantee Letters (GL) to partner health facilities to cover hospital bills, chemotherapy, implant devices, radiation therapy, and specialized laboratory requests for disadvantaged Filipinos.",
    benefitsSummary: "Guarantee Letter assistance ranging from ₱20,000 to ₱100,000 per request depending on social classification.",
    maxAmountCovered: 100000,
    eligibilityRules: {
      maxMonthlyIncome: 35000,
      requiresIndigency: true,
      coveredTreatments: [
        "Confinement Bills",
        "Chemotherapy Drugs",
        "Hemodialysis (Erythropoietin)",
        "Post-Surgical Implants & Hardware",
        "Specialized Laboratory / MRI / CT Scans"
      ],
      allowedInsurance: ["philhealth", "uninsured", "any"]
    },
    requiredDocuments: [
      "Original Clinical Abstract with Doctor's License Number and Signature",
      "Official Hospital Billing Statement with PhilHealth deduction",
      "Official Quotation / Costing from Hospital Pharmacy or Implant Supplier",
      "Barangay Certificate of Indigency of the Patient",
      "Valid Government ID of Patient and Authorized Representative",
      "Authorization Letter (if processed by family representative)"
    ],
    applicationProcedure: [
      "Gather updated clinical abstract and itemized hospital quotation.",
      "Submit documents via the PCSO Digital Assistance Portal or on-site PCSO Hospital Help Desk.",
      "Complete the Social Case Assessment interview.",
      "Receive approved PCSO Guarantee Letter (GL) directly or via electronic transmission to the hospital credit office."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8838-8888 loc 1520",
      email: "imap.support@pcso.gov.ph",
      officeAddress: "PCSO Main Office, Sun Plaza Bldg., Shaw Blvd., Mandaluyong City",
      operatingHours: "Monday to Friday: 7:00 AM - 4:00 PM"
    },
    featured: true,
    processingDays: "2 to 4 business days",
    tags: ["Guarantee Letter", "Charity Aid", "Chemotherapy", "Surgery Implants"]
  },
  {
    id: "prog-dswd-aics-04",
    name: "DSWD AICS Medical Assistance in Crisis Situations",
    providerName: "Department of Social Welfare and Development",
    providerType: "government_lgu",
    hospitalId: "hosp-eamc-05",
    category: ["medicine", "hospital_bills", "laboratory", "surgery"],
    assistanceType: "financial_aid",
    location: "DSWD Central Office, Field Offices & Satellite Crisis Intervention Units",
    availability: "available",
    description: "Immediate financial assistance and social welfare service providing outright cash grants or Guarantee Letters to individuals and families who are unable to cope with medical emergencies and prescription costs.",
    benefitsSummary: "Direct financial assistance of ₱5,000 to ₱50,000 for medicines, diagnostic procedures, or hospital billing balance.",
    maxAmountCovered: 50000,
    eligibilityRules: {
      maxMonthlyIncome: 25000,
      requiresIndigency: true,
      coveredTreatments: [
        "Prescription Medicines & Antibiotics",
        "Emergency Hospital Confinement",
        "Diagnostic Procedures (MRI, CT Scan, Biopsy)",
        "Assistive Devices (Wheelchairs, Hearing Aids)",
        "Medical Transportation Subsidy"
      ],
      allowedInsurance: ["philhealth", "uninsured", "hmo", "any"]
    },
    requiredDocuments: [
      "Original Medical Certificate / Clinical Abstract (issued within 3 months)",
      "Doctor's Prescription with Cost Estimate or Pharmacy Quotation",
      "Barangay Certificate of Indigency / Certificate of Residency",
      "Valid Government-issued ID of Applicant and Patient",
      "Social Case Study Report (for assistance requests exceeding ₱10,000)"
    ],
    applicationProcedure: [
      "Present original requirements at the nearest DSWD Crisis Intervention Unit (CIU).",
      "Undergo intake interview and assessment with a licensed DSWD Social Worker.",
      "Verification and calculation of assistance amount based on socio-economic assessment.",
      "Disbursement of medical cash grant or issuance of DSWD Guarantee Letter."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8931-8101 to 07 loc 412",
      email: "aics@dswd.gov.ph",
      officeAddress: "DSWD Central Office, Batasang Pambansa Complex, Constitution Hills, Quezon City",
      operatingHours: "Monday to Friday: 8:00 AM - 5:00 PM"
    },
    featured: false,
    processingDays: "1 to 3 business days",
    tags: ["Crisis Intervention", "Immediate Cash Assistance", "Medicine Vouchers", "Government"]
  },
  {
    id: "prog-doh-maip-05",
    name: "DOH Medical Assistance for Indigent Patients (MAIP)",
    providerName: "Department of Health (DOH)",
    providerType: "government_lgu",
    hospitalId: "hosp-pgh-01",
    category: ["hospital_bills", "medicine", "surgery", "laboratory", "dialysis"],
    assistanceType: "subsidy",
    location: "All DOH-Retained, Specialty, and Selected LGU Hospitals Nationwide",
    availability: "available",
    description: "Government subsidy program ensuring that indigent and financially incapacitated Filipino patients have access to inpatient care, surgical operations, medical devices, diagnostic workups, and medicines.",
    benefitsSummary: "Full or partial subsidy of hospital bill balance, specialized procedures, and operating room charges.",
    maxAmountCovered: 120000,
    eligibilityRules: {
      maxMonthlyIncome: 28000,
      requiresIndigency: true,
      coveredTreatments: [
        "General and Orthopedic Surgery",
        "Pediatric Intensive Care",
        "Hemodialysis Supplies",
        "Laboratory Reagents and Blood Products",
        "Specialized Radiologic Imaging"
      ],
      allowedInsurance: ["philhealth", "uninsured", "any"]
    },
    requiredDocuments: [
      "Medical Certificate / Abstract stating diagnosis and treatment plan",
      "Final or Partial Statement of Account (SOA)",
      "Certificate of Indigency from Barangay / MSS Social Classification",
      "Valid ID of Patient / Caregiver",
      "Physician's Treatment & Costing Protocol"
    ],
    applicationProcedure: [
      "Visit the Hospital Medical Social Service (MSS) office inside your admitted public hospital.",
      "Submit the medical documents for social classification (Class C3 or Class D).",
      "MSS issues MAIP billing endorsement to the hospital cashier / billing department.",
      "Subsidy is credited directly against the patient's hospital ledger."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8651-7800 loc 2200",
      email: "maip.central@doh.gov.ph",
      officeAddress: "San Lazaro Compound, Rizal Avenue, Sta. Cruz, Manila",
      operatingHours: "Monday to Friday: 8:00 AM - 5:00 PM"
    },
    featured: false,
    processingDays: "1 to 2 business days",
    tags: ["DOH Subsidy", "Indigent Care", "Surgery", "Diagnostics", "Inpatient"]
  },
  {
    id: "prog-ovp-med-06",
    name: "OVP Medical & Dialysis Assistance Program",
    providerName: "Office of the Vice President of the Philippines",
    providerType: "government_lgu",
    hospitalId: "hosp-nkti-02",
    category: ["medicine", "dialysis", "hospital_bills", "surgery"],
    assistanceType: "financial_aid",
    location: "OVP Central Office & Regional Satellite Offices (NCR, Cebu, Davao, Panay, etc.)",
    availability: "limited",
    description: "Medical support program providing Guarantee Letters for indigent patients needing dialysis sessions, chemotherapy medication, hospitalization copays, and major surgical operations at partner medical institutions.",
    benefitsSummary: "Guarantee Letter grant up to ₱30,000 for medicines and hospital billing assistance.",
    maxAmountCovered: 30000,
    eligibilityRules: {
      maxMonthlyIncome: 25000,
      requiresIndigency: true,
      coveredTreatments: [
        "Hemodialysis Treatment Kits",
        "Cancer Chemotherapy Medications",
        "Hospital Confinement Balance",
        "Pre-operative Diagnostic Clearance",
        "Prescribed Injectables & Antibiotics"
      ],
      allowedInsurance: ["philhealth", "uninsured", "any"]
    },
    requiredDocuments: [
      "Original or Certified True Copy of Medical Abstract / Certificate",
      "Official Hospital Quotation / Prescription with estimated price",
      "Certificate of Indigency issued by Barangay Chairman or Social Worker",
      "Valid Government ID of Patient & Representative",
      "Proof of Relationship (Birth Certificate or Marriage Contract)"
    ],
    applicationProcedure: [
      "Register via the OVP Public Assistance Online Portal or visit the nearest OVP Satellite Office.",
      "Submit digital scans or physical copies of the required clinical abstract and costing.",
      "Wait for eligibility assessment and approval SMS confirmation.",
      "Collect the OVP Guarantee Letter to present to the partner hospital billing division."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8370-1700 loc 104",
      email: "medicalassistance@ovp.gov.ph",
      officeAddress: "Robinsons Cybergate Plaza, EDSA cor. Pioneer St., Mandaluyong City",
      operatingHours: "Monday to Friday: 8:30 AM - 4:30 PM"
    },
    featured: false,
    processingDays: "3 to 5 business days",
    tags: ["OVP Grant", "Guarantee Letter", "Dialysis", "Chemotherapy"]
  },
  {
    id: "prog-qc-qcitizen-07",
    name: "Quezon City QCitizen Health Care & Hospital Bill Subsidy",
    providerName: "Quezon City Local Government Unit",
    providerType: "government_lgu",
    hospitalId: "hosp-eamc-05",
    category: ["hospital_bills", "surgery", "medicine", "dialysis"],
    assistanceType: "subsidy",
    location: "Quezon City Residents only (Valid in QC Partner Hospitals)",
    availability: "available",
    description: "Citywide healthcare financial safety net for registered Quezon City residents holding a valid QCitizen ID, offering direct hospital bill subsidies and maintenance medicine allocations.",
    benefitsSummary: "Up to ₱50,000 per family annually for hospital bills, surgeries, and specialty procedures in partner hospitals.",
    maxAmountCovered: 50000,
    eligibilityRules: {
      maxMonthlyIncome: 35000,
      requiresIndigency: false,
      coveredTreatments: [
        "Emergency & Elective Surgical Operations",
        "Pediatric and Adult Ward Confinement",
        "Laboratory and Diagnostic Scans",
        "Maintenance Hypertension and Diabetes Meds",
        "Outpatient Dialysis Sessions"
      ],
      allowedInsurance: ["philhealth", "hmo", "uninsured", "any"]
    },
    requiredDocuments: [
      "Valid Quezon City QCitizen ID / QC Resident Card",
      "Barangay Certificate of Residency in Quezon City",
      "Clinical Abstract from Admitting Hospital",
      "Current Hospital Bill / Statement of Account",
      "Social Assessment Slip from QC Social Services Development Dept (SSDD)"
    ],
    applicationProcedure: [
      "Present QCitizen ID at the hospital's QC SSDD Help Desk or District Action Office.",
      "Submit proof of hospital charges and medical certificate.",
      "Social worker validates residency and generates QC Health Voucher.",
      "Voucher amount is deducted from the final hospital bill upon discharge."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8988-4242 loc 8112",
      email: "ssdd.medical@quezoncity.gov.ph",
      officeAddress: "Quezon City Hall Compound, Elliptical Road, Diliman, Quezon City",
      operatingHours: "Monday to Friday: 8:00 AM - 5:00 PM"
    },
    featured: true,
    processingDays: "1 to 2 business days",
    tags: ["LGU Aid", "Quezon City", "QCitizen", "Local Subsidy"]
  },
  {
    id: "prog-manila-che-08",
    name: "Manila City Orange Card Free Healthcare & Dialysis Subsidy",
    providerName: "Manila Health Department / City of Manila",
    providerType: "government_lgu",
    hospitalId: "hosp-pgh-01",
    category: ["hospital_bills", "dialysis", "medicine", "laboratory"],
    assistanceType: "subsidy",
    location: "City of Manila Residents (Valid across 6 Manila City Hospitals & PGH)",
    availability: "available",
    description: "Free medical services, free outpatient dialysis, free maintenance medicines, and full hospital subsidies for bona fide residents of Manila City possessing an Orange Card.",
    benefitsSummary: "100% Free medical services & laboratory in 6 Manila City hospitals, and up to ₱40,000 copay grant at PGH.",
    maxAmountCovered: 40000,
    eligibilityRules: {
      maxMonthlyIncome: 30000,
      requiresIndigency: true,
      coveredTreatments: [
        "Free Hemodialysis (Flora V. Valisno Dialysis Center)",
        "Free Inpatient Stay at 6 Manila District Hospitals",
        "Free CT Scan and Digital X-rays",
        "Essential Maintenance Medications",
        "Normal and Cesarean Delivery Services"
      ],
      allowedInsurance: ["philhealth", "uninsured", "any"]
    },
    requiredDocuments: [
      "Manila Orange Card / Green Health Card",
      "Voter's Certificate / Proof of Manila Residency",
      "Barangay Certificate of Indigency (Manila Barangay)",
      "Medical Certificate / Diagnostic Request",
      "Valid Government ID"
    ],
    applicationProcedure: [
      "Apply for or present your Manila Orange Card at the hospital social service.",
      "Submit medical request or hospitalization admission order.",
      "Hospital applies Orange Card waiver on billing and pharmacy requisitions."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8527-5174",
      email: "health@manila.gov.ph",
      officeAddress: "Manila City Hall, Padre Burgos Ave, Ermita, Manila",
      operatingHours: "Monday to Friday: 8:00 AM - 5:00 PM"
    },
    featured: false,
    processingDays: "Instant to 1 day",
    tags: ["LGU Aid", "City of Manila", "Orange Card", "Free Dialysis"]
  },
  {
    id: "prog-pgh-charity-09",
    name: "PGH Medical Social Services Patient Assistance Fund",
    providerName: "PGH Medical Social Service & Foundation",
    providerType: "hospital",
    hospitalId: "hosp-pgh-01",
    category: ["surgery", "hospital_bills", "medicine", "laboratory"],
    assistanceType: "financial_aid",
    location: "Philippine General Hospital, Ermita, Manila",
    availability: "available",
    description: "Dedicated patient charity fund established by PGH to provide direct assistance for specialized orthopedic implants, neurosurgical clips, cardio-thoracic supplies, and orphan medicines for charity ward patients.",
    benefitsSummary: "Up to ₱80,000 surgical implant and specialized therapy assistance.",
    maxAmountCovered: 80000,
    eligibilityRules: {
      maxMonthlyIncome: 20000,
      requiresIndigency: true,
      coveredTreatments: [
        "Orthopedic Bone Implants & Titanium Plates",
        "Neurosurgery Shunts & Clips",
        "Charity Ward Bed & OR Supplies",
        "Chemotherapy Drugs & Blood Reagents",
        "Pediatric Intensive Care Support"
      ],
      allowedInsurance: ["philhealth", "uninsured", "any"]
    },
    requiredDocuments: [
      "PGH MSS White Card / Classification Slip",
      "Official Surgery Request & Attending Consultant Endorsement",
      "Supplier Quotation for Titanium Implants / Surgical Consumables",
      "Barangay Certificate of Indigency",
      "Valid ID of Patient / Representative"
    ],
    applicationProcedure: [
      "Consult with your PGH attending resident for surgical supply requirement list.",
      "Bring costing quotations and requirement checklist to PGH MSS Division.",
      "MSS evaluates patient classification and approves purchase voucher for medical suppliers."
    ],
    applicationDeadline: undefined,
    contactInfo: {
      phone: "(02) 8554-8400 loc 2045",
      email: "mss.pgh@up.edu.ph",
      officeAddress: "Medical Social Service, PGH Compound, Taft Ave, Manila",
      operatingHours: "Monday to Friday: 8:00 AM - 4:00 PM"
    },
    featured: false,
    processingDays: "2 to 3 business days",
    tags: ["Hospital Charity", "PGH Fund", "Surgical Implants", "Charity Ward"]
  },
  {
    id: "prog-nkti-dialysis-10",
    name: "NKTI Kidney Care & Hemodialysis Grant Program",
    providerName: "National Kidney and Transplant Institute",
    providerType: "hospital",
    hospitalId: "hosp-nkti-02",
    category: ["dialysis", "medicine", "laboratory"],
    assistanceType: "subsidy",
    location: "NKTI, East Avenue, Quezon City",
    availability: "limited",
    description: "Specialized hospital assistance program bridging gap funding for end-stage renal disease (ESRD) patients exceeding PhilHealth annual dialysis session limits.",
    benefitsSummary: "Subsidized dialyzer packages, blood transfusion assistance, and immunosuppressant discounts.",
    maxAmountCovered: 60000,
    eligibilityRules: {
      maxMonthlyIncome: 28000,
      requiresIndigency: true,
      coveredTreatments: [
        "Hemodialysis Dialyzer Reuse Kits & Acid Concentrates",
        "Erythropoietin Alpha Injections",
        "Peritoneal Dialysis Solution Bags",
        "Arteriovenous (AV) Fistula Surgery Supplies",
        "Renal Function Blood Chemistry Labs"
      ],
      allowedInsurance: ["philhealth", "uninsured", "any"]
    },
    requiredDocuments: [
      "NKTI Nephrology Consultation Summary",
      "Dialysis Prescription and Protocol Sheet",
      "PhilHealth Dialysis Benefit Exhaustion Certification",
      "Barangay Certificate of Indigency",
      "Valid Government Identification"
    ],
    applicationProcedure: [
      "Submit Dialysis Protocol Sheet to NKTI Medical Social Service.",
      "Undergo financial intake assessment to determine grant allocation.",
      "Approved dialysis vouchers credited to NKTI Hemodialysis Center accounts."
    ],
    applicationDeadline: "2026-10-31", // Upcoming deadline example
    contactInfo: {
      phone: "(02) 8981-0300 loc 1155",
      email: "mss@nkti.gov.ph",
      officeAddress: "NKTI Medical Social Service Bldg., East Ave, Quezon City",
      operatingHours: "Monday to Friday: 8:00 AM - 5:00 PM"
    },
    featured: false,
    processingDays: "2 to 3 business days",
    tags: ["Renal Care", "Dialysis", "NKTI", "Kidney Health"]
  }
];
