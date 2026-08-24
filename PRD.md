FRONTEND PRODUCT REQUIREMENTS DOCUMENT (PRD)
1. Document Overview & Source of Truth
Document Title: Healthcare Financial Assistance and Benefits Information System Frontend PRD
Original Project Specification: Software Engineering Activity 2: From Problem to Prototype Plan
Target Interface: Web Application — Mobile-View First (responsive design starting at 360px–390px viewport width)
Execution Scope: Strictly Frontend-Only Prototype/MVP. All backend operations, databases, server-side authentication, real document storage, and third-party integrations are mocked via static JSON/in-memory state/localStorage.
2. Product Overview
Product Name: Healthcare Financial Assistance and Benefits Information System
Product Description: A centralized mobile-first web interface designed to help patients, families, and healthcare workers easily discover, match, apply for, and track healthcare financial assistance programs and hospital benefits across government agencies, LGUs, hospitals, and charities.
Problem Being Solved: Patients requiring medical treatment struggle to discover and evaluate scattered financial aid programs (government, insurance, hospital discounts, charitable funds). Assistance policies vary across hospitals, leading to missed financial aid opportunities and tedious manual inquiries.
Target Users: Patients, Family Members, Healthcare/Hospital Staffs, and LGU/Government Staffs.
Product Goals: Centralize financial assistance discovery, provide transparent eligibility pre-checks, standardize requirements checklists, and streamline digital application status tracking.
Frontend Prototype Goals: Provide a fully interactive, mobile-optimized client prototype demonstrating end-to-end user navigation: searching hospitals/programs, taking an eligibility assessment, completing an application with mock file uploads, tracking submission statuses, viewing saved programs, and viewing simulated provider admin portals.
Project Scope: Frontend Only. Zero live backend or cloud database services are included.
3. Functional Requirements
FR-1: Search Assistance Programs
Original Requirement: The system shall allow users to search for available healthcare financial assistance programs in hospitals or government agencies.
Frontend Interpretation: Search interface with real-time text debouncing, medical expense category tags, assistance type chips, location filters, and hospital association filters.
Inputs: Search keyword string, Expense Category filter (e.g., Surgery, Dialysis, Lab Tests, Hospital Bills, Medicine), Assistance Type filter (e.g., Financial Aid, Discounts, Subsidies, Insurance), Location string.
Outputs: Filtered list of Program Cards with availability status badges (e.g., "Available", "Limited", "Currently Unavailable", "Not Offered").
Validation: Client-side sanitization of text inputs.
Success State: Dynamic list of matching program cards rendered with clear badges and summaries.
Error/Empty State: "No programs found matching your criteria. Try adjusting your filters."
Acceptance Criteria:
GIVEN the user is on the Program Search screen
WHEN the user types "Dialysis" and selects the "Subsidy" filter
THEN only mock programs tagged with dialysis expense and subsidy type are rendered.
FR-2: View Assistance Program Information
Original Requirement: The system shall display the description, benefits, application procedure, and required documents to be submitted.
Frontend Interpretation: A structured detail view displaying program descriptions, coverage amounts/benefits, step-by-step procedures, provider info, deadlines, and a document checklist.
Inputs: Program ID (route parameter or selection).
Outputs: Rendered information tabs/sections (Overview, Benefits, Procedure, Requirements, Contact/Location).
Acceptance Criteria:
GIVEN a user clicks on an assistance program card
WHEN the Program Details view loads
THEN the system displays the full program description, benefits, document checklist, provider office location, and application deadline (if applicable).
FR-3: Eligibility Checking
Original Requirement: The system shall allow users to identify if they or their patient are qualified for a specific assistance program.
Frontend Interpretation: A multi-step client-side wizard collecting income range, diagnosis/treatment need, estimated costs, and insurance status, evaluating them against mock eligibility criteria with an explicit disclaimer.
Inputs: Patient age, monthly household income range, medical condition/expense type, estimated bill amount, existing insurance.
Outputs: Potentially eligible programs list, matching score/badge, and mandatory disclaimer modal.
Acceptance Criteria:
GIVEN the user fills out the Eligibility Wizard with income < ₱15,000 and selects "Surgery"
WHEN the user clicks "Check Potential Eligibility"
THEN the screen displays matched programs alongside a disclaimer stating that final approval is subject to agency verification.
FR-4: Submit Applications
Original Requirement: The system shall allow users to upload the required documents and submit their application online.
Frontend Interpretation: A mobile-friendly multi-step form with client-side file upload simulators (preview, file size/type check), patient detail fields, and a submission review stage.
Inputs: Personal information, valid file attachments (simulated image/PDF previews), applicant notes.
Outputs: Mock submission confirmation screen with generated Reference Number and simulated status record saved to localStorage.
Acceptance Criteria:
GIVEN the user attaches all required files (<5MB each) and completes required fields
WHEN the user taps "Submit Application"
THEN a success screen appears with a generated reference tracking ID and stores the record in mock application state.
FR-5: Track Application Status
Original Requirement: The system shall allow the users to check their application status and receive notifications about submitted applications.
Frontend Interpretation: Status tracker dashboard showing stage timelines (Submitted, Under Review, Approved, Rejected), mock notification alerts (deadline reminders, missing docs, availability updates), and application history logs.
Inputs: Application Reference Number or active user session.
Outputs: Step-by-step visual progress bar, status badges, contextual reminder alerts.
Acceptance Criteria:
GIVEN the user has submitted an application
WHEN the user navigates to the "Applications" tab
THEN they see an interactive timeline depicting current status ("Under Review") and any active notification banners (e.g., "Missing Requirement").
4. Non-Functional Requirements (Frontend-Specific Translation)
NFR-1: Security (Client-Side Focus): Protect patient personal, medical, and financial data by ensuring sensitive mock data is stored exclusively in client-side memory or encrypted localStorage, masked in UI displays (e.g., ••••-1234), and client forms purge unsubmitted data upon session reset. (Note: Real encryption/authentication is labeled as Future Backend Dependency).
NFR-2: Usability: Mobile-first layout with touch targets $\ge 44 \times 44\text{ px}$, high visual contrast, simple iconography, linear wizard steps, and concise language tailored for elderly patients or stressed family members.
NFR-3: Performance: Client bundle size <200KB initial load; instantaneous local filtering ($\le 50\text{ ms}$ debounce); smooth 60fps transitions on mobile browsers.
NFR-4: Reliability: Accurate presentation of financial requirements, consistent UI validation messages, and robust fallback states for empty searches or corrupted local state.
NFR-5: Maintainability (Frontend Component Architecture): Modular component design enabling healthcare/LGU staff mock views to dynamically update mock JSON catalogs, eligibility rules, and program listings without modifying core layout templates.
5. User Personas
Persona 1: Maria (The Patient / Family Member)


Goals: Quickly locate subsidies or financial aid for an upcoming surgery to reduce out-of-pocket expenses.
Needs: Straightforward checklist of physical papers required and clear status tracking.
Pain Points: Overwhelmed by navigating different hospital desks, government agencies, and confusing requirements.
Persona 2: Kuya Jun (Healthcare / Hospital Social Work Staff)


Goals: Guide admitted patients to available hospital-specific discounts, partner NGOs, and government assistance funds.
Needs: Fast search tool to verify program availability and document checklists for patients.
Pain Points: High queue volumes and answering repetitive questions about program availability.
Persona 3: Elena (LGU / Government Agency Staff)


Goals: Keep published medical assistance programs, subsidy quotas, and eligibility requirements up to date.
Needs: Simple UI to update program status (Available, Limited, Unavailable) and required documents.
Pain Points: Outdated public information leading to incomplete application submissions.
6. Information Architecture (Mobile-First)
Root (Mobile Shell: Header & Bottom Nav)
├── [Tab 1] Explore / Home
│   ├── Hospital Directory (Search by Name/Location)
│   │   └── Hospital Detail View (Profile, Discounts, Programs, Partner Orgs)
│   ├── Assistance Directory (Search by Expense/Type/Location)
│   │   └── Program Detail View (Benefits, Steps, Requirements, Deadlines)
│   └── General Directory (Govt, Insurance, Charities)
├── [Tab 2] Eligibility Wizard
│   ├── Step 1: Patient & Financial Info
│   ├── Step 2: Medical Needs & Estimated Expenses
│   └── Step 3: Match Results & Disclaimer
├── [Tab 3] Applications & Tracker
│   ├── Active & Past Applications List
│   ├── Application Status Details & Timeline
│   ├── Requirements Checklist & File Upload Manager
│   └── New Application Submission Flow
├── [Tab 4] Saved Programs & Reminders
│   ├── Bookmarked Programs
│   └── Notifications / Reminders Feed
└── [Tab 5] Profile / Provider Portal
    ├── Patient Profile & Healthcare Data Settings
    └── [Mock Toggle] Provider / LGU Management Console
        ├── Add / Edit Assistance Program
        ├── Update Program Availability & Requirements
        └── Provider Directory Info Editor

7. Detailed Screen Requirements
Screen 1: Home & Search Hub
Purpose: Direct access to hospital search, assistance categories, quick filters, and announcements.
Navigation: Accessible via bottom nav "Explore" tab.
UI Components: Sticky mobile top bar, search bar with debounce, category carousel chips (Hospital Bills, Surgery, Dialysis, Medicine, Lab Tests), quick-filter drawer, hospital and program card lists.
UI States:
Default: Displays top assistance categories and featured hospital programs.
Loading: Skeleton pulse cards.
Empty: Illustration with "No programs found matching filters."
Acceptance Criteria:
GIVEN the user taps the "Surgery" category chip
WHEN the filter applies
THEN the list filters to programs offering surgical subsidies.
Screen 2: Hospital Profile & Assistance Overview
Purpose: Display a specific hospital's available aid programs, benefits, discounts, partner organizations, and real-time status.
Navigation: From Hospital Search results.
UI Components: Hospital header card (Name, Address, Contact), availability tags ("Available", "Limited", "Currently Unavailable"), segmented tabs (Assistance Programs, Hospital Discounts, Partner NGOs).
Acceptance Criteria:
GIVEN a user views "General Hospital"
WHEN viewing the "Assistance Programs" tab
THEN each program lists its specific availability status badge and partner org list.
Screen 3: Program Details & Requirements
Purpose: Comprehensive overview of benefits, step-by-step procedures, and required documentation.
Navigation: From Program list or Hospital details.
UI Components: Benefit summary banner, deadline counter (if applicable), provider contact card, accordion for application procedures, requirements checklist, "Bookmark" button, and "Apply Online" primary action button.
Acceptance Criteria:
GIVEN a program has an upcoming deadline
WHEN the screen renders
THEN a deadline warning banner displays the remaining days.
Screen 4: Preliminary Eligibility Matching Wizard
Purpose: Multi-step questionnaire to match patient profiles against program eligibility rules.
Navigation: Dedicated Bottom Nav "Check Eligibility" tab.
UI Components: Linear progress bar (Steps 1–3), segmented radio selectors (Income brackets), multi-select dropdown (Medical treatments needed), number input (Estimated expense), insurance checklist, and mandatory disclaimer modal.
Acceptance Criteria:
GIVEN the user submits the questionnaire
WHEN the results generate
THEN a list of eligible programs is displayed with a visible disclaimer stating results are non-binding estimates.
Screen 5: Application Submission & Document Upload Flow
Purpose: Complete online application and upload simulated requirement files.
Navigation: Triggered via "Apply Online" from Program Details.
UI Components: Step-based form, file uploader drag-and-drop zone with camera capture trigger, file list with preview/remove actions, validation badges ("Missing", "Attached"), review summary, "Submit" button.
Acceptance Criteria:
GIVEN a user attaches a valid .pdf or .png


WHEN the file is selected
THEN the document status changes to "Completed/Attached" and updates the submission checklist.
Screen 6: Application Status Tracker & History
Purpose: Monitor progress of submitted assistance applications and view reminders.
Navigation: Bottom Nav "Applications" tab.
UI Components: Timeline tracker (Stages: Submitted  Under Review  Approved / Rejected), action alerts ("Upload Missing ID"), downloadable mock confirmation PDF, submission history log.
Acceptance Criteria:
GIVEN an application with status "Under Review"
WHEN the user opens the tracker details
THEN the active step is highlighted on the vertical mobile timeline with an estimated resolution note.
Screen 7: Provider & LGU Management Console (Mock Portal)
Purpose: Interface for hospital/government personnel to manage programs, eligibility rules, and quotas.
Navigation: Header toggle or Profile  "Switch to Staff Mode".
UI Components: Program data table/cards, "Add New Program" modal, toggle switches for status (Available/Limited/Unavailable), inline editable fields for required documents and contact info.
Acceptance Criteria:
GIVEN staff changes program status from "Available" to "Limited"
WHEN saved
THEN the local mock state updates immediately across all patient search views.
8. Frontend User Flows
Flow 1: Search & Filter Assistance Programs
[Home Screen] 
  → User enters keyword (e.g. "Surgery") or taps filter chip
  → Client-side filter updates list instantly (<50ms)
  → User selects "Hospital Assistance" or "LGU Program"
  → Filtered Program Cards rendered
  → User taps card → Navigates to [Program Details Screen]

Flow 2: Preliminary Eligibility Check
[Eligibility Tab] 
  → Step 1: Input Household Income & Location
  → Step 2: Select Medical Expense Type & Bill Estimate
  → Step 3: Select Existing Insurance Coverage
  → Taps "Calculate Match"
  → Displays Potentially Eligible Programs + Legal Disclaimer Banner
  → User taps "Save Program" or "Start Application"

Flow 3: Complete Application & Document Upload
[Program Details] 
  → Taps "Apply Now"
  → [Application Form]: Pre-fills user profile info
  → [Upload Step]: User selects required documents (e.g., Medical Certificate, Barangay Indigency)
  → Client validates file formats (.pdf, .jpg, .png) & sizes (<5MB)
  → User reviews checklist
  → Taps "Confirm & Submit"
  → Generates Mock Reference ID (e.g., `APP-2026-8942`)
  → Stored in localStorage → Redirects to [Application Tracker Screen]

9. Reusable Component Requirements
AppHeader: Mobile top bar with logo, back navigation arrow, and notification bell badge.
BottomNavBar: Fixed 5-tab navigation (Explore, Eligibility, Applications, Saved, Profile) with active state indicators.
ProgramCard: Displays title, provider name, badge (Available/Limited/Unavailable), max benefit amount, and quick-save bookmark icon.
StatusTimeline: Mobile vertical stepper rendering submitted/under review/approved/rejected states with timestamp tooltips.
DocumentUploadRow: Row component with document title, required/optional badge, upload button, file thumbnail, and remove action.
EligibilityBadge: Visual pill badge indicating match confidence (e.g., "High Match", "Potential Match", "Criteria Not Met").
DisclaimerCard: Callout box highlighting that results and applications are preliminary evaluations.
10. Frontend Mock Data Schema
All data will be loaded from static JSON and managed via client state / localStorage.
TypeScript
// Types for Mock State
export type AvailabilityStatus = "available" | "limited" | "currently_unavailable" | "not_offered";
export type ApplicationStatus = "submitted" | "under_review" | "approved" | "rejected";
export type ExpenseCategory = "hospital_bills" | "medicine" | "surgery" | "laboratory" | "dialysis" | "other";

export interface AssistanceProgram {
  id: string;
  name: string;
  providerName: string;
  providerType: "hospital" | "government_lgu" | "insurance" | "charity";
  hospitalId?: string;
  category: ExpenseCategory[];
  assistanceType: "financial_aid" | "discount" | "subsidy" | "insurance_benefit";
  location: string;
  availability: AvailabilityStatus;
  description: string;
  benefitsSummary: string;
  maxAmountCovered?: number;
  eligibilityRules: {
    maxMonthlyIncome: number;
    requiresIndigency: boolean;
    coveredTreatments: string[];
  };
  requiredDocuments: string[];
  applicationProcedure: string[];
  applicationDeadline?: string;
  contactInfo: { phone: string; email: string; officeAddress: string };
}

export interface ApplicationSubmission {
  id: string;
  programId: string;
  programName: string;
  patientName: string;
  submissionDate: string;
  status: ApplicationStatus;
  documentsUploaded: { docName: string; fileName: string; status: "completed" | "missing" }[];
  statusHistory: { status: ApplicationStatus; timestamp: string; notes: string }[];
}

11. Interactive Element States
Element
Default
Hover / Focus
Active / Pressed
Disabled
Loading State
Primary CTA Button
Solid blue (#1E40AF), white text
Dark blue (#1D4ED8), outline
Scaled 0.98, deep navy
Gray background (#9CA3AF), cursor not-allowed
Spinner replaces text, pointer disabled
Bookmark / Save Icon
Outline heart/ribbon icon
Color accent fill highlight
Fill red (#DC2626), micro-bounce
Opacity 40%
N/A
File Upload Zone
Dashed border, upload icon
Dashed border highlight (#2563EB)
Background #EFF6FF
Grayed out
Progress ring (0% to 100%)
Filter Chip
Border gray, transparent bg
Border blue, light hover tint
Solid blue bg, white text
Opacity 50%
N/A

12. Client-Side Form Validation Rules
Patient Name: Required, min 2 characters, alphabetic + spaces only.
Monthly Household Income: Required, positive numeric input $\ge 0$.
Medical Expense Type: At least 1 selection required.
File Uploads: Required documents must be present before final submission; permitted file types: .pdf, .png, .jpg, .jpeg; max size per file: 5MB.
Error Display: Red text below the respective input field with aria-live="polite" feedback.
13. Navigation & Route Hierarchy
/                         -> Explore / Hospital & Program Hub
/hospitals/:id            -> Hospital Profile & Specific Benefits
/programs/:id             -> Program Details & Requirements Breakdown
/eligibility              -> 3-Step Eligibility Matching Wizard
/apply/:programId         -> Multi-Step Application & File Submission
/applications             -> Application Status Tracking & History List
/applications/:id         -> Detailed Application Status Timeline
/saved                    -> Bookmarked Programs & Notifications List
/portal/manage            -> Mock Hospital/LGU Staff Management View

Back Behavior: Mobile header displays a back navigation chevron returning to the previous route; browser back button behaves identically.
Page Refresh: State is preserved via localStorage for applications, bookmarks, and updated programs.
14. Responsive Layout Behavior (Mobile-View First)
Mobile Viewport (360px-480px): Primary design target. Single column layout, full-width cards, fixed bottom navigation bar, swipeable horizontal category filter pills.
Tablet Viewport (481px-768px): 2-column card grid for program listings; wizard forms centered with max-width 600px.
Desktop Viewport (>768px): Max application width constrained to 1024px (or mobile device frame preview); bottom navigation moves to a fixed top header / sidebar.
15. Frontend Accessibility (a11y)
Semantic HTML: <main>, <nav>, <section>, <article>, <header>, <footer>.
Touch Target Size: Minimum 4444px for all mobile buttons, tabs, and interactive chips.
Form Accessibility: All inputs explicitly paired with <label> tags; error states communicate via aria-invalid and aria-describedby.
Color Contrast: Minimum 4.5:1 ratio for standard text and 3:1 for large headers/badges (WCAG AA).
Focus Indicators: High-contrast 2px outline rings on all interactive elements during keyboard navigation.
16. Frontend Technology Stack
Required Constraints: Client-side only web prototype; no backend servers.
Recommended Framework: React (Next.js or Vite) with TypeScript for type-safe mock data management.
Recommended Styling: Tailwind CSS (utility-first, mobile-friendly responsive breakpoints).
Recommended Icons: Lucide Icons (lightweight SVG icons).
Recommended Local Storage / State: React Context API or Zustand with localStorage persistence.
17. Mock Prototype Functionality (Simulated Backend)
Mock Application Submission: When a user submits an application, the system generates a local tracking ID, stores the record in localStorage, and appends it to the "Applications" screen.
Mock File Uploader: Simulates file processing with a 500ms upload animation, generating in-memory object URLs for preview.
Mock Notifications & Reminders: Pre-populated simulated alerts for application status changes, missing documents, and program deadline reminders.
Mock Provider Management Console: Allows users to simulate LGU/Hospital staff actions—adding a program, editing availability, or updating required documents—which immediately updates the local mock catalog in real time.
18. Frontend Acceptance Criteria (Summary Examples)
Search & Filters:
GIVEN the user is on the main search page
WHEN they choose "Hospital Bills" and enter location "Quezon City"
THEN only programs matching those criteria are rendered.
Eligibility Matching:
GIVEN a user enters household income of ₱10,000
WHEN they complete the eligibility wizard
THEN the system lists programs whose maxMonthlyIncome is $\ge \text{₱}10,000$ and displays an eligibility disclaimer.
Document Checklist & Status:
GIVEN an active application with a missing document
WHEN the user navigates to the tracker details
THEN the tracker highlights "Under Review" with an alert badge specifying "Action Required: Missing Medical Certificate".
19. Scope and Limitations
In Scope (Frontend MVP Prototype):
Mobile-first responsive UI for all target screens.
Program search, filtering, and hospital-specific benefit directory.
3-step interactive eligibility matching simulator with disclaimer.
Application submission form with mock document uploads.
Application status tracking timeline and mock notification triggers.
Saved programs/bookmarks and local reminders.
Mock Provider/LGU portal to demonstrate program maintainability.
Out of Scope (Backend & Future Implementation):
Real database integration (PostgreSQL/MongoDB).
Real user authentication, SMS verification, or OAuth.
Live document cloud storage (e.g., AWS S3).
Actual government agency/hospital API integrations.
Real-time push notification servers.
20. Requirements Traceability Matrix
Original Requirement (from Source)
Frontend Prototype Feature
Primary Screen(s)
User Flow
Acceptance Criteria Ref
FR-1: Search Assistance Programs
Real-time Search & Multi-Tag Category Filters
Home & Search Hub
Flow 1: Search & Filter
FR-1 Acceptance Criteria
FR-2: View Program Information
Detail View (Benefits, Steps, Requirements, Deadlines)
Program Details Screen
Flow 1: Search & Filter
FR-2 Acceptance Criteria
FR-3: Eligibility Checking
3-Step Eligibility Matching Wizard with Disclaimer
Eligibility Wizard Screen
Flow 2: Eligibility Check
FR-3 Acceptance Criteria
FR-4: Submit Applications
Application Form with Mock File Upload & Checklist
Application Submission Flow
Flow 3: Submit Application[cite: 1]
FR-4 Acceptance Criteria
FR-5: Track Application Status
[cite: 1]
Application Timeline Tracker & Notification Center[cite: 1]
Status Tracker & Details[cite: 1]
Flow 3 / Tracker Flow[cite: 1]
FR-5 Acceptance Criteria
NFR-1: Security
[cite: 1]
Client-side input sanitization, data masking, zero server leaks[cite: 1]
All Screens[cite: 1]
All Flows[cite: 1]
NFR-1 Specification
NFR-2: Usability
[cite: 1]
Mobile-view-first touch UI ($\ge 44\text{px}$ targets, clear steps)[cite: 1]
All Screens[cite: 1]
All Flows[cite: 1]
NFR-2 Specification
NFR-3: Performance
[cite: 1]
Instant client filtering ($\le 50\text{ms}$), lightweight bundle[cite: 1]
Search & Directory[cite: 1]
Flow 1[cite: 1]
NFR-3 Specification
NFR-4: Reliability
[cite: 1]
Accurate mock requirement rules & clear empty/error fallbacks[cite: 1]
Wizard & Details[cite: 1]
Flow 2[cite: 1]
NFR-4 Specification
NFR-5: Maintainability
[cite: 1]
Mock Provider/Staff Management Portal to update programs[cite: 1]
Provider Management Console[cite: 1]
Staff Edit Flow[cite: 1]
Screen 7 Criteria

21. MVP Priority Matrix
P0 (Essential - Core MVP):
Mobile Header & Bottom Navigation Shell.
Program & Hospital Search with Expense Category Filters[cite: 1].
Assistance Program Details & Requirements Checklist[cite: 1].
Multi-step Eligibility Calculator with Disclaimer[cite: 1].
Mock Application Form with File Upload & Success State[cite: 1].
Application Status Tracker Timeline[cite: 1].
P1 (Important - Full Prototype Flow):
Saved / Bookmarked Programs tab[cite: 1].
Notifications and Document Reminders Feed[cite: 1].
Hospital Profile view with partner organizations and discounts[cite: 1].
Mock Provider/LGU Admin View to edit program availability[cite: 1].
P2 (Nice to Have):
Export/Download application summary as mock PDF.
Dark/Light mode theme switch.
22. Open Questions & TBDs
Document File Constraints [TBD]: The exact maximum file size or format limits were not specified in the original proposal; set to standard 5MB (.pdf, .jpg, .png) for this frontend prototype.
LGU/Hospital Staff Authentication [TBD / Backend Dependency]: Role-based permission controls for provider management are simulated via a simple UI toggle in the prototype header.
Notification Delivery [TBD / Backend Dependency]: Real-time SMS/Email notification delivery is simulated via local client banners and a notification badge feed.

