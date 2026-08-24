import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgramStore } from '../../stores/useProgramStore';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { useUserStore } from '../../stores/useUserStore';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { UploadedDocument } from '../../types';
import { DocumentUploadRow } from '../../components/documents/DocumentUploadRow';
import { Button } from '../../components/common/Button';
import { DisclaimerCard } from '../../components/common/DisclaimerCard';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  User, 
  Building2, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Share2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { formatPHP, formatDate } from '../../utils';

export const ApplyPage: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const program = useProgramStore((state) => state.getProgramById(programId || ''));
  const user = useUserStore((state) => state.profile);
  const submitApplication = useApplicationStore((state) => state.submitApplication);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 4 = Success screen
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppRef, setSubmittedAppRef] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Form Fields
  const [patientName, setPatientName] = useState(user.name || '');
  const [patientAge, setPatientAge] = useState<number | ''>(46);
  const [patientContact, setPatientContact] = useState(user.phone || '');
  const [patientEmail, setPatientEmail] = useState(user.email || '');
  const [patientAddress, setPatientAddress] = useState(user.address || '');
  const [householdIncome, setHouseholdIncome] = useState<number | ''>(user.monthlyHouseholdIncome || 14000);
  const [householdSize, setHouseholdSize] = useState(user.householdSize || 4);
  const [medicalCondition, setMedicalCondition] = useState('Hospital Confinement / Surgical Procedure');
  const [estimatedExpense, setEstimatedExpense] = useState<number | ''>(55000);
  const [insuranceStatus, setInsuranceStatus] = useState<'philhealth' | 'hmo' | 'uninsured'>('philhealth');
  const [notes, setNotes] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Uploaded Documents state
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!program) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Program not found</h3>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Explore
        </Button>
      </div>
    );
  }

  const validateStep1 = () => {
    const err: Record<string, string> = {};
    if (!patientName.trim() || patientName.trim().length < 2) {
      err.patientName = 'Please enter a valid patient full name (at least 2 characters).';
    }
    if (!patientAge || Number(patientAge) <= 0) {
      err.patientAge = 'Please enter a valid patient age.';
    }
    if (!patientContact.trim() || patientContact.length < 7) {
      err.patientContact = 'Please enter an active contact number.';
    }
    if (!patientAddress.trim()) {
      err.patientAddress = 'Please enter current residential address.';
    }
    if (householdIncome === '' || Number(householdIncome) < 0) {
      err.householdIncome = 'Please provide monthly household income.';
    }
    if (!medicalCondition.trim()) {
      err.medicalCondition = 'Please enter primary medical diagnosis.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep2 = () => {
    const err: Record<string, string> = {};
    const attachedNames = uploadedDocs
      .filter((d) => d.status === 'completed')
      .map((d) => d.docName);

    const missingRequired = program.requiredDocuments.filter(
      (docName) => !attachedNames.includes(docName)
    );

    if (missingRequired.length > 0) {
      err.documents = `Please attach all ${program.requiredDocuments.length} required documents before proceeding. (Missing: ${missingRequired[0]})`;
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleFileSelected = (docName: string, file: File) => {
    const newDoc: UploadedDocument = {
      docName,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      status: 'completed',
    };

    setUploadedDocs((prev) => {
      const filtered = prev.filter((d) => d.docName !== docName);
      return [...filtered, newDoc];
    });

    if (errors.documents) {
      setErrors((prev) => ({ ...prev, documents: '' }));
    }
  };

  const handleRemoveDoc = (docName: string) => {
    setUploadedDocs((prev) => prev.filter((d) => d.docName !== docName));
  };

  const handleSubmit = () => {
    if (!agreeTerms) {
      setErrors({ terms: 'Please confirm and agree that the submitted information is true.' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const createdApp = submitApplication({
        programId: program.id,
        programName: program.name,
        providerName: program.providerName,
        patientName,
        patientAge: Number(patientAge),
        patientContact,
        patientEmail,
        patientAddress,
        householdIncome: Number(householdIncome),
        householdSize,
        medicalCondition,
        estimatedExpense: Number(estimatedExpense) || 0,
        insuranceStatus,
        notes,
        documentsUploaded: uploadedDocs,
      });

      // Add mock notification
      addNotification({
        title: `Application Submitted: ${createdApp.referenceNumber}`,
        message: `Your application for ${program.name} has been queued for medical social service assessment.`,
        type: 'info',
        relatedApplicationId: createdApp.id,
      });

      setIsSubmitting(false);
      setSubmittedAppRef(createdApp.referenceNumber);
      setStep(4);
    }, 700);
  };

  const handleCopyRef = () => {
    if (submittedAppRef) {
      navigator.clipboard.writeText(submittedAppRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Step Header (only for steps 1-3) */}
      {step < 4 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
              {program.name}
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
              Step {step} of 3
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
            {step === 1 && 'Patient Information & Diagnosis'}
            {step === 2 && 'Upload Required Verification Documents'}
            {step === 3 && 'Review & Confirm Submission'}
          </h2>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Applicant Details */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3.5">
            {/* Patient Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Patient Full Name *
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Juan Santos Dela Cruz"
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.patientName && (
                <p className="text-xs text-rose-600 font-semibold">{errors.patientName}</p>
              )}
            </div>

            {/* Age + Contact grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  Patient Age *
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={patientAge}
                  onChange={(e) =>
                    setPatientAge(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                {errors.patientAge && (
                  <p className="text-xs text-rose-600 font-semibold">{errors.patientAge}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={patientContact}
                  onChange={(e) => setPatientContact(e.target.value)}
                  placeholder="+63 917 000 0000"
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                {errors.patientContact && (
                  <p className="text-xs text-rose-600 font-semibold">{errors.patientContact}</p>
                )}
              </div>
            </div>

            {/* Residential Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Residential Address in the Philippines *
              </label>
              <input
                type="text"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="House No., Street, Barangay, City, Province"
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.patientAddress && (
                <p className="text-xs text-rose-600 font-semibold">{errors.patientAddress}</p>
              )}
            </div>

            {/* Monthly Household Income */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Monthly Household Income (PHP ₱) *
              </label>
              <input
                type="number"
                value={householdIncome}
                onChange={(e) =>
                  setHouseholdIncome(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.householdIncome && (
                <p className="text-xs text-rose-600 font-semibold">{errors.householdIncome}</p>
              )}
            </div>

            {/* Medical Condition */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Medical Diagnosis / Treatment Needed *
              </label>
              <input
                type="text"
                value={medicalCondition}
                onChange={(e) => setMedicalCondition(e.target.value)}
                placeholder="e.g. End-stage Renal Disease (Hemodialysis) or Acute Appendicitis"
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {errors.medicalCondition && (
                <p className="text-xs text-rose-600 font-semibold">{errors.medicalCondition}</p>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Continue to Document Upload
          </Button>
        </div>
      )}

      {/* STEP 2: Document Uploads */}
      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200 text-xs text-brand-900 space-y-1">
            <span className="font-bold block">Document Upload Instructions</span>
            <p>
              Please attach scanned copies or clear smartphone photos of the required documents (PDF, JPG, PNG &lt; 5MB).
            </p>
          </div>

          {/* List of Required Documents */}
          <div className="space-y-3">
            {program.requiredDocuments.map((docName) => {
              const uploaded = uploadedDocs.find((d) => d.docName === docName);
              return (
                <DocumentUploadRow
                  key={docName}
                  docName={docName}
                  isRequired={true}
                  uploadedDoc={uploaded}
                  onFileSelected={handleFileSelected}
                  onRemove={handleRemoveDoc}
                />
              );
            })}
          </div>

          {errors.documents && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.documents}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Review Application
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Review & Submit */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Summary of Application
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 font-medium block">Program</span>
                <span className="font-bold text-slate-900">{program.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Provider</span>
                <span className="font-bold text-slate-900">{program.providerName}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Patient Name</span>
                <span className="font-bold text-slate-900">{patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Patient Age / Contact</span>
                <span className="font-bold text-slate-900">{patientAge} yrs • {patientContact}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 font-medium block">Diagnosis / Care</span>
                <span className="font-bold text-slate-900">{medicalCondition}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Monthly Income</span>
                <span className="font-bold text-slate-900">₱{Number(householdIncome).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Attached Files</span>
                <span className="font-bold text-emerald-700">
                  {uploadedDocs.length} of {program.requiredDocuments.length} Complete
                </span>
              </div>
            </div>

            {/* Optional Applicant Notes */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Additional Notes or Special Circumstances (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Currently admitted at Ward 3; scheduled for surgery on Friday..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 text-brand-600 rounded focus:ring-brand-500"
                />
                <span className="text-[11px] text-slate-700 leading-tight">
                  I hereby certify that all information submitted is true, accurate, and supported by valid Philippine hospital and government records.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-rose-600 font-semibold pt-1">{errors.terms}</p>
              )}
            </div>
          </div>

          <DisclaimerCard />

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              disabled={isSubmitting}
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              onClick={handleSubmit}
              rightIcon={<CheckCircle2 className="w-5 h-5" />}
            >
              Submit Application Online
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Success & Reference ID Screen */}
      {step === 4 && (
        <div className="space-y-6 text-center animate-fade-in py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              Submission Successful
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Application Queued for Review
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto">
              Your assistance claim for <strong>{program.name}</strong> has been received by the intake desk.
            </p>
          </div>

          {/* Reference ID Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-elevated space-y-3 max-w-sm mx-auto">
            <span className="text-[11px] uppercase font-bold tracking-widest text-sage-300 block">
              Official Reference Tracking ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-white">
                {submittedAppRef}
              </span>
              <button
                type="button"
                onClick={handleCopyRef}
                aria-label="Copy tracking ID"
                className="touch-target p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
              >
                {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
              Save this reference number. You can track progress and status changes anytime in your Applications dashboard.
            </p>
          </div>

          {/* Next Steps Guidance */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-2 text-xs text-slate-700 max-w-sm mx-auto shadow-soft">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              What Happens Next?
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 leading-relaxed">
              <li>Medical social workers will review your attached clinical abstract and certificate.</li>
              <li>Expected review turnaround: <strong>1 to 3 business days</strong>.</li>
              <li>You will receive real-time notifications here if additional documents are needed.</li>
            </ul>
          </div>

          {/* Navigation Action Buttons */}
          <div className="space-y-2 max-w-sm mx-auto pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate(`/applications/${submittedAppRef}`)}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Open Application Status Tracker
            </Button>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => navigate('/')}
            >
              Return to Explore
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
