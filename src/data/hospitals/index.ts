import { Hospital } from '../../types';

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: "hosp-pgh-01",
    name: "Philippine General Hospital (PGH)",
    address: "Taft Avenue, Ermita, Manila, 1000 Metro Manila",
    city: "Manila",
    region: "NCR",
    phone: "(02) 8554-8400",
    email: "pgh.assistance@up.edu.ph",
    website: "https://pgh.gov.ph",
    isVerifiedPartner: true,
    imageUrl: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    malasakitCenter: true,
    emergencyContact: "(02) 8554-8400 loc 2026",
    directionsUrl: "https://maps.google.com/?q=Philippine+General+Hospital",
    discounts: [
      {
        id: "disc-pgh-pharm",
        title: "Botika ng Bayan Subsidy",
        description: "Subsidized maintenance and specialty medicine for indigent outpatients and in-ward patients.",
        discountRate: "Up to 50% off",
        category: "Pharmacy",
        requirements: ["Valid Doctor's Prescription", "Barangay Indigency Certificate", "MSS Classification"]
      },
      {
        id: "disc-pgh-diag",
        title: "Medical Social Service (MSS) Sliding Diagnostic Scale",
        description: "Class A/B/C/D sliding scale discount on CT scan, MRI, X-ray, Ultrasound, and blood chemistry.",
        discountRate: "Sliding Scale (25%-100% Free)",
        category: "Imaging & Diagnostics",
        requirements: ["MSS Social Case Study", "PGH Consultation Slip"]
      },
      {
        id: "disc-pgh-er",
        title: "Emergency Social Service Waiver",
        description: "Emergency room stabilization and basic medications copay reduction for classified indigent patients.",
        discountRate: "₱0 - ₱200 Copay",
        category: "Emergency Care",
        requirements: ["MSS Triage Assessment"]
      },
      {
        id: "disc-pgh-mental",
        title: "Mental Health Wellness Subsidy",
        description: "Outpatient psychiatric evaluation, psychotherapy sessions, and basic psycho-pharmacological supply.",
        discountRate: "100% Free for Class C/D",
        category: "Mental Health",
        requirements: ["PGH Dept of Psychiatry Referral"]
      }
    ],
    partnerOrgs: [
      {
        id: "org-pgh-malasakit",
        name: "Malasakit Center PGH Desk",
        type: "One-Stop Government Center",
        logoText: "MC",
        supportDetails: "Houses DOH, DSWD, PCSO, and PhilHealth desks under one roof for zero-balance billing support."
      },
      {
        id: "org-pgh-fnd",
        name: "PGH Medical Foundation Inc.",
        type: "Charitable Foundation",
        logoText: "PMF",
        supportDetails: "Provides urgent donations for surgical hardware, implants, and chemotherapy medicine."
      },
      {
        id: "org-manila-health",
        name: "Manila Health Dept Assistance",
        type: "LGU Health Partner",
        logoText: "MHD",
        supportDetails: "Special supplemental assistance vouchers for bona fide Manila City residents."
      }
    ]
  },
  {
    id: "hosp-nkti-02",
    name: "National Kidney and Transplant Institute (NKTI)",
    address: "East Avenue, Diliman, Quezon City, 1100 Metro Manila",
    city: "Quezon City",
    region: "NCR",
    phone: "(02) 8981-0300",
    email: "medicalsocialservice@nkti.gov.ph",
    website: "https://nkti.gov.ph",
    isVerifiedPartner: true,
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    malasakitCenter: true,
    emergencyContact: "(02) 8981-0300 loc 1150",
    directionsUrl: "https://maps.google.com/?q=National+Kidney+and+Transplant+Institute",
    discounts: [
      {
        id: "disc-nkti-dial",
        title: "Hemodialysis Package Assistance",
        description: "Coverage for dialyzer reuse kits, erythropoietin injections, and fistula puncture needles.",
        discountRate: "100% Covered with PhilHealth",
        category: "Dialysis Care",
        requirements: ["PhilHealth MDF", "Dialysis Protocol Sheet", "Indigency Card"]
      },
      {
        id: "disc-nkti-immuno",
        title: "Post-Transplant Immunosuppressant Subsidy",
        description: "Discounted Tacrolimus and Mycophenolate Mofetil supply for kidney transplant beneficiaries.",
        discountRate: "Up to 35% discount",
        category: "Specialty Pharmacy",
        requirements: ["Transplant Registry Card", "MSS Social Assessment"]
      },
      {
        id: "disc-nkti-lab",
        title: "Renal Function Diagnostic Bundle",
        description: "Discounted serum creatinine, BUN, 24-hr urine protein, and renal ultrasound.",
        discountRate: "₱350 Flat Rate for Indigents",
        category: "Laboratory",
        requirements: ["Attending Physician Request"]
      }
    ],
    partnerOrgs: [
      {
        id: "org-nkti-kidney-fnd",
        name: "Philippine Kidney Foundation",
        type: "Non-Profit NGO",
        logoText: "PKF",
        supportDetails: "Subsidizes vascular access creation (AV Fistula) for chronic kidney disease stage 5 patients."
      },
      {
        id: "org-nkti-malasakit",
        name: "NKTI Malasakit Desk",
        type: "One-Stop Government Hub",
        logoText: "MC",
        supportDetails: "Expedited processing for PCSO guarantee letters for dialysis sessions and peritoneal dialysis catheters."
      }
    ]
  },
  {
    id: "hosp-phc-03",
    name: "Philippine Heart Center (PHC)",
    address: "East Avenue, Diliman, Quezon City, 1100 Metro Manila",
    city: "Quezon City",
    region: "NCR",
    phone: "(02) 8925-2401",
    email: "socialservice@phc.gov.ph",
    website: "https://phc.gov.ph",
    isVerifiedPartner: true,
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    malasakitCenter: true,
    emergencyContact: "(02) 8925-2401 loc 2100",
    directionsUrl: "https://maps.google.com/?q=Philippine+Heart+Center",
    discounts: [
      {
        id: "disc-phc-angio",
        title: "Coronary Angiogram & Stenting Subsidy",
        description: "DOH MAIP + PCSO co-funded subsidy for catheterization lab procedures and drug-eluting stents.",
        discountRate: "Up to ₱150,000 Support",
        category: "Surgery & Procedures",
        requirements: ["Cardiology Clinical Abstract", "Hospital Costing Sheet", "Social Case Study"]
      },
      {
        id: "disc-phc-echo",
        title: "2D Echocardiogram with Doppler Assistance",
        description: "Special social service pricing for essential pre-operative cardiac clearance tests.",
        discountRate: "60% Subsidized",
        category: "Cardio Diagnostics",
        requirements: ["PHC Consultation Card", "MSS Evaluation"]
      }
    ],
    partnerOrgs: [
      {
        id: "org-heart-fnd",
        name: "Heart Foundation of the Philippines",
        type: "Charitable Partner",
        logoText: "HFP",
        supportDetails: "Pediatric cardiac surgery subsidies (PDA closure, VSD repair, Tetralogy of Fallot)."
      },
      {
        id: "org-phc-malasakit",
        name: "PHC Malasakit One-Stop Shop",
        type: "Government Service",
        logoText: "MC",
        supportDetails: "Coordinates DOH MAIP funds with PhilHealth Z-Benefit packages for bypass surgery (CABG)."
      }
    ]
  },
  {
    id: "hosp-lcp-04",
    name: "Lung Center of the Philippines (LCP)",
    address: "Quezon Avenue, Central, Quezon City, 1100 Metro Manila",
    city: "Quezon City",
    region: "NCR",
    phone: "(02) 8924-6101",
    email: "mss@lcp.gov.ph",
    website: "https://lcp.gov.ph",
    isVerifiedPartner: true,
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    malasakitCenter: true,
    emergencyContact: "(02) 8924-6101 loc 1210",
    directionsUrl: "https://maps.google.com/?q=Lung+Center+of+the+Philippines",
    discounts: [
      {
        id: "disc-lcp-chemo",
        title: "Thoracic Oncology & Chemotherapy Grant",
        description: "Comprehensive copay coverage for lung cancer chemotherapy, targeted therapy, and immunotherapy.",
        discountRate: "Up to 80% coverage",
        category: "Chemotherapy & Oncology",
        requirements: ["Histopathology Biopsy Report", "Protocol Sheet", "Barangay Indigency"]
      },
      {
        id: "disc-lcp-tb",
        title: "National Tuberculosis Control DOTS Care",
        description: "Full free diagnosis, GeneXpert MTB testing, and 6-month anti-TB medication blister packs.",
        discountRate: "100% Free",
        category: "Respiratory Medicine",
        requirements: ["TB DOTS Referral", "Valid Government ID"]
      }
    ],
    partnerOrgs: [
      {
        id: "org-cancer-society",
        name: "Philippine Cancer Society",
        type: "Non-Government Organization",
        logoText: "PCS",
        supportDetails: "Provides patient navigation, transportation allowances, and chemotherapy medicine vouchers."
      }
    ]
  },
  {
    id: "hosp-eamc-05",
    name: "East Avenue Medical Center (EAMC)",
    address: "East Avenue, Diliman, Quezon City, 1100 Metro Manila",
    city: "Quezon City",
    region: "NCR",
    phone: "(02) 8928-0611",
    email: "eamc.medicalsocial@gmail.com",
    website: "https://eamc.doh.gov.ph",
    isVerifiedPartner: true,
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    malasakitCenter: true,
    emergencyContact: "(02) 8928-0611 loc 400",
    directionsUrl: "https://maps.google.com/?q=East+Avenue+Medical+Center",
    discounts: [
      {
        id: "disc-eamc-surgery",
        title: "General & Trauma Surgery Subsidy",
        description: "Subsidized surgical implants, OR fees, anesthesia medications, and sterile supplies for trauma & emergency cases.",
        discountRate: "Up to 90% Waiver",
        category: "Surgery",
        requirements: ["Social Case Study", "Surgery Scheduling Slip", "Barangay Indigency"]
      },
      {
        id: "disc-eamc-eye",
        title: "Ophthalmology & Cataract Clinic Care",
        description: "Affordable intraocular lens (IOL) packages and subsidized phacoemulsification cataract extraction.",
        discountRate: "₱1,500 Full Package for Indigents",
        category: "Eye Care",
        requirements: ["EAMC Eye Center Assessment", "Senior Citizen / PWD ID"]
      }
    ],
    partnerOrgs: [
      {
        id: "org-qc-health",
        name: "Quezon City Local Health Benefit Program",
        type: "LGU Partner",
        logoText: "QC",
        supportDetails: "Quezon City Resident QCitizen Card health subsidy up to ₱50,000 per family per fiscal year."
      },
      {
        id: "org-eamc-malasakit",
        name: "EAMC Malasakit Center",
        type: "One-Stop Government Center",
        logoText: "MC",
        supportDetails: "Integrates DOH MAIP, DSWD, and PCSO medical assistance for in-patient zero-out billing."
      }
    ]
  },
  {
    id: "hosp-stjude-06",
    name: "St. Jude Medical Center Manila",
    address: "Dimasalang Rd, Sampaloc, Manila, 1008 Metro Manila",
    city: "Manila",
    region: "NCR",
    phone: "(02) 8731-2761",
    email: "assistance@stjudemanila.edu.ph",
    website: "https://stjudemanila.com",
    isVerifiedPartner: true,
    imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80",
    malasakitCenter: false,
    emergencyContact: "(02) 8731-2761 loc 105",
    directionsUrl: "https://maps.google.com/?q=St+Jude+Medical+Center+Manila",
    discounts: [
      {
        id: "disc-stjude-pharm",
        title: "Community Pharmacy Subsidy",
        description: "Special discounted generic formulary for outpatient prescription drugs and antibiotics.",
        discountRate: "Up to 20% off",
        category: "Pharmacy",
        requirements: ["Prescription from St. Jude Doctor", "Valid ID"]
      },
      {
        id: "disc-stjude-imaging",
        title: "Diagnostic Imaging Sliding Scale",
        description: "Tiered discounts for ultrasound, digital mammography, and 64-slice CT examinations.",
        discountRate: "Sliding Scale (15%-40%)",
        category: "Imaging",
        requirements: ["Income Verification Document", "Doctor's Diagnostic Request"]
      },
      {
        id: "disc-stjude-er",
        title: "Emergency Room Copay Subsidy",
        description: "Capped copay fee structure for emergency triage and initial 12-hour observation beds.",
        discountRate: "₱500 Copay*",
        category: "ER Visits",
        requirements: ["Triage Assessment"]
      },
      {
        id: "disc-stjude-mental",
        title: "Psychological Counseling Outreach",
        description: "Free initial mental health and grief support consultation sessions for registered families.",
        discountRate: "3 Free Sessions",
        category: "Mental Health",
        requirements: ["Online Appointment Booking"]
      }
    ],
    partnerOrgs: [
      {
        id: "org-manila-init",
        name: "Manila Health Initiative",
        type: "Community Healthcare Partner",
        logoText: "MHI",
        supportDetails: "Local neighborhood medical vouchers for indigent Sampaloc and Sta. Cruz families."
      },
      {
        id: "org-fam-well",
        name: "Family Wellness PH",
        type: "Non-Government Organization",
        logoText: "FWP",
        supportDetails: "Sponsors pediatric diagnostic labs, neonatal incubators, and maternal vitamins."
      },
      {
        id: "org-carefirst",
        name: "CareFirst Alliance Foundation",
        type: "Charitable Trust",
        logoText: "CFA",
        supportDetails: "Emergency cash vouchers for urgent blood transfusion units and laboratory reagents."
      }
    ]
  }
];
