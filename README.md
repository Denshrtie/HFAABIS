# Healthcare Financial Assistance and Benefits Information System (HFAABIS)

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange.svg)](https://zustand.docs.pmnd.rs/)

> A centralized mobile-view first web application designed to help Filipino patients, families, and hospital social workers discover, evaluate eligibility for, apply for, and track healthcare financial assistance programs, hospital subsidies, and government aid across the Philippines.

---

## 🏥 Overview

HFAABIS solves the fragmented medical aid discovery problem in the Philippines by providing a unified, mobile-first digital platform connecting:
- **Government Assistance**: PhilHealth Z-Benefits, Malasakit Center One-Stop Desks, DSWD AICS, PCSO IMAP, DOH MAIP, Office of the Vice President (OVP).
- **LGU Health Subsidies**: Quezon City QCitizen Health Care, Manila City Orange Card Free Dialysis & Care.
- **Hospital Charity & Discounts**: Philippine General Hospital (PGH), National Kidney and Transplant Institute (NKTI), Philippine Heart Center (PHC), Lung Center of the Philippines (LCP), East Avenue Medical Center (EAMC), St. Jude Medical Center Manila.

---

## ✨ Key Interactive Features

1. **Explore & Multi-Tag Search Hub** (`/`):
   - Real-time search with client-side debouncing across program names, providers, locations, and treatment keywords.
   - Horizontally scrollable medical expense category chips (*Hospital Bills, Surgery, Dialysis, Medicine, Lab Tests, Other*).
   - Quick Filter Drawer by expense type, provider category (DOH/LGU, Charity, Hospital), and live availability.
   - Interactive Active Claims card with visual step progress bar.

2. **3-Step Preliminary Eligibility Matching Wizard** (`/eligibility`):
   - Step 1: Household size, monthly household income (PHP ₱), and Barangay Indigency status.
   - Step 2: Medical expense categories, estimated hospital bill range, and insurance coverage (*PhilHealth, HMO, Uninsured*).
   - Step 3: Dynamic matching evaluation engine ranking programs into **High Match**, **Potential Match**, and **Criteria Not Met** with clear reasonings and non-binding legal disclaimers.

3. **Assistance Program Details & Requirements Checklist** (`/programs/:id`):
   - Benefit coverage caps, turnaround time, upcoming deadline warning counters, and step-by-step application procedures.
   - Complete document requirements checklist and direct hospital contact cards.

4. **Multi-Step Digital Application & File Upload Simulator** (`/apply/:programId`):
   - Client-side document uploader supporting PDF, PNG, JPG, and JPEG (< 5MB limit).
   - Realistic 500ms upload scanning animation and thumbnail preview modals.
   - Auto-generated official Reference Tracking ID (e.g., `APP-2026-8942`).

5. **Applications Dashboard & Vertical Timeline Tracker** (`/applications`, `/applications/:id`):
   - Real-time vertical stepper tracking: *Submitted ➔ Medical Social Work Review ➔ Approved / Guarantee Issuance*.
   - Contextual alerts for missing documentation and estimated resolution dates.
   - Printable official acknowledgement slip/receipt view.

6. **Hospital Directory & Profile View** (`/hospitals/:id`):
   - Profile header with verified partner badges, direct call, directions, and website links.
   - Segmented tabs for on-site assistance desks, hospital discount sliding scales, and partner NGOs.

7. **Saved / Bookmarked Programs** (`/saved`):
   - Instant 1-tap bookmarking with persistent `localStorage` synchronization.

8. **Notifications & Reminders Center**:
   - Header badge with unread counters, action alerts (missing documents, upcoming deadlines, status changes), and mark-as-read controls.

9. **Provider & LGU Staff Management Console** (`/portal/manage`):
   - Prototype Staff Mode toggle for hospital social workers and LGU administrators.
   - Instant live availability toggle (*Available, Limited, Currently Unavailable*) that immediately propagates to the patient-facing explore view.
   - Full program authoring & editing modal.

---

## 🎨 Visual Design & Theme

- **Primary Color**: `#2C6975` (Deep Slate Teal)
- **Secondary / Accent**: `#68B2A0` (Sage Mint)
- **Typography**: Plus Jakarta Sans & Inter
- **Mobile First Target**: 360px – 430px (responsive on tablet and desktop)
- **Accessibility**: Minimum 44 × 44 px touch targets, high contrast ratios (WCAG AA), accessible labels and keyboard focus states.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler / Dev Server**: Vite 6
- **Styling**: Tailwind CSS (mobile-first utility classes)
- **State Management & Persistence**: Zustand with `localStorage`
- **Routing**: React Router v6
- **Icons**: Lucide React

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js v18+ or v20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/hfaabis.git
cd HFAABIS

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Use mobile device inspection (e.g. iPhone 14/15 or Samsung Galaxy 390px width) for the optimal experience.

### Building for Production
```bash
npm run build
```
Generates a production bundle in `dist/`.

---

## 🚀 Vercel Deployment

HFAABIS is fully configured for zero-configuration Vercel deployment:
1. Push this repository to GitHub/GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. The framework preset is automatically detected as **Vite**.
4. Single Page Application routing rewrites are configured in `vercel.json`.

---

## 🔒 Scope & Simulated Frontend Behavior

- **Frontend-Only Prototype**: There is zero live backend database or cloud storage.
- **Client Persistence**: All programs, applications, bookmarks, user profiles, and notifications are managed via Zustand stores and persisted in `localStorage`.
- **Uploads**: File uploads are processed in client memory with URL object previews and do not transmit files externally.
- **Reset Data**: To restore all mock programs and applications to default initial state, navigate to the **Profile** tab and tap **"Reset All Mock Data to Default"**.

---

## 📄 License
MIT License. Built for healthcare financial assistance education and prototype evaluation.
