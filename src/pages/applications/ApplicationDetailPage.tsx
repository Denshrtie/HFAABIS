import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { useProgramStore } from '../../stores/useProgramStore';
import { useMessageStore } from '../../stores/useMessageStore';
import { useUserStore } from '../../stores/useUserStore';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { ApplicationStatusBadge } from '../../components/common/Badge';
import { StatusTimeline } from '../../components/applications/StatusTimeline';
import { DocumentUploadRow } from '../../components/documents/DocumentUploadRow';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Clock, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Printer, 
  Share2,
  MessageSquare,
  ShieldCheck,
  Award,
  XCircle,
  FileCheck
} from 'lucide-react';
import { formatPHP, formatDate } from '../../utils';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getApplicationById, attachDocumentToApplication, updateApplicationStatus } = useApplicationStore();
  const getOrCreateConversation = useMessageStore((state) => state.getOrCreateConversation);
  const isStaffMode = useUserStore((state) => state.isStaffMode);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const application = getApplicationById(id || '');
  const program = useProgramStore((state) =>
    application ? state.getProgramById(application.programId) : undefined
  );

  const [copied, setCopied] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Approval Form State
  const [grantAmount, setGrantAmount] = useState<number>(
    application?.assistanceAmountGranted || application?.estimatedExpense || 45000
  );
  const [approvalNotes, setApprovalNotes] = useState(
    'Guarantee Letter issued and billing credit endorsed directly to hospital billing division.'
  );
  const [rejectReason, setRejectReason] = useState(
    'Incomplete documentation or income classification exceeded maximum quota.'
  );

  if (!application) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800">Application not found</h3>
          <p className="text-xs text-slate-500">
            No claim matching Reference ID &quot;{id}&quot; exists in local records.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/applications')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(application.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMissingDocUpload = (docName: string, file: File) => {
    attachDocumentToApplication(application.id, {
      docName,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      status: 'completed',
    });
    showToast(`Uploaded "${docName}" successfully!`);
  };

  const handleApproveGuaranteeLetter = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = Number(grantAmount) || 45000;
    
    updateApplicationStatus(
      application.id,
      'approved',
      approvalNotes,
      undefined,
      finalAmount
    );

    // Notify patient
    addNotification({
      title: `Guarantee Letter Approved! ${formatPHP(finalAmount)} Granted`,
      message: `Congratulations! Your assistance claim for ${application.programName} (#${application.referenceNumber}) has been approved and endorsed to billing.`,
      type: 'success',
      relatedApplicationId: application.referenceNumber,
      relatedProgramId: application.programId,
    });

    setShowApproveModal(false);
    showToast(`Guarantee Letter approved: ${formatPHP(finalAmount)} granted to patient!`);
  };

  const handleRejectClaim = (e: React.FormEvent) => {
    e.preventDefault();
    updateApplicationStatus(
      application.id,
      'rejected',
      `Application declined by reviewer: ${rejectReason}`
    );

    addNotification({
      title: `Application Update: #${application.referenceNumber}`,
      message: `Your assistance claim for ${application.programName} was declined: ${rejectReason}`,
      type: 'warning',
      relatedApplicationId: application.referenceNumber,
    });

    setShowRejectModal(false);
    showToast('Application marked as declined.');
  };

  const requiredDocList = program?.requiredDocuments || [
    "Clinical Abstract / Medical Certificate",
    "Hospital Statement of Account (SOA)",
    "Barangay Certificate of Indigency",
    "Valid Government ID"
  ];

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-16 left-4 right-4 z-50 p-3.5 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-elevated flex items-center gap-2 animate-slide-up border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1">{successToast}</span>
        </div>
      )}

      {/* Top Header Bar with Reference ID */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-elevated space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/applications')}
            className="text-xs font-bold text-sage-300 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Applications</span>
          </button>

          <ApplicationStatusBadge status={application.status} />
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
            Reference Tracking ID
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-white">
              {application.referenceNumber}
            </h1>
            <button
              type="button"
              onClick={handleCopyRef}
              aria-label="Copy reference ID"
              className="touch-target p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <span className="truncate max-w-[200px] font-semibold">{application.programName}</span>
          <span>Submitted {formatDate(application.submissionDate)}</span>
        </div>
      </div>

      {/* Staff Review & Approval Banner (Visible in Staff Mode) */}
      {isStaffMode && (
        <section className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-soft space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
              <Award className="w-4 h-4 text-amber-700" />
              <span>Hospital Social Work / LGU Reviewer Actions</span>
            </div>
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">
              Staff Controls
            </span>
          </div>

          <p className="text-xs text-amber-900">
            Current Status: <strong>{application.status.toUpperCase()}</strong>. Review the medical abstract, indigency credentials, and grant Guarantee Letter subsidy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowApproveModal(true)}
              leftIcon={<Award className="w-4 h-4" />}
              className="bg-emerald-600 hover:bg-emerald-700 font-bold"
            >
              Approve & Issue Guarantee Letter
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => setShowRejectModal(true)}
              leftIcon={<XCircle className="w-4 h-4 text-rose-600" />}
              className="border-rose-300 text-rose-700 hover:bg-rose-50 font-bold"
            >
              Decline / Ineligible
            </Button>
          </div>
        </section>
      )}

      {/* Vertical Status Timeline */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Application Progress Timeline
        </h3>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft">
          <StatusTimeline
            currentStatus={application.status}
            statusHistory={application.statusHistory}
            estimatedResolutionDate={application.estimatedResolutionDate}
          />
        </div>
      </section>

      {/* Patient & Hospital Details Card */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Patient & Medical Details
        </h3>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <div>
              <span className="text-slate-500 font-medium block">Patient Name</span>
              <span className="font-bold text-slate-900">{application.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Age & Contact</span>
              <span className="font-bold text-slate-900">{application.patientAge} yrs • {application.patientContact}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 font-medium block">Diagnosis / Procedure</span>
            <span className="font-bold text-slate-900 leading-snug">{application.medicalCondition}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div>
              <span className="text-slate-500 font-medium block">Estimated Medical Bill</span>
              <span className="font-bold text-slate-900">{formatPHP(application.estimatedExpense)}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Guarantee Letter / Aid Granted</span>
              <span className="font-bold text-emerald-700">
                {application.assistanceAmountGranted
                  ? formatPHP(application.assistanceAmountGranted)
                  : 'Pending MSW Assessment'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Attached Documents Section */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Verification Documents
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            {application.documentsUploaded.length} files attached
          </span>
        </div>

        <div className="space-y-2">
          {requiredDocList.map((docName) => {
            const uploaded = application.documentsUploaded.find((d) => d.docName === docName);
            return (
              <DocumentUploadRow
                key={docName}
                docName={docName}
                isRequired={true}
                uploadedDoc={uploaded}
                onFileSelected={handleMissingDocUpload}
                onRemove={() => {}}
              />
            );
          })}
        </div>
      </section>

      {/* Need Help / Contact Provider Support Card */}
      <section className="p-4 rounded-3xl bg-brand-50/70 border border-brand-200/80 shadow-soft space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 text-xs">
            <h4 className="font-bold text-brand-950">
              Need help with your application?
            </h4>
            <p className="text-brand-800">
              Have questions about your submitted documents, medical assessment, or approval status? Inquire with the assistance provider.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={() => {
            const convId = getOrCreateConversation({
              providerId: application.hospitalName || `prov-${application.providerName}`,
              providerName: application.providerName,
              programId: application.programId,
              programName: application.programName,
              applicationId: application.referenceNumber,
            });
            navigate(`/messages/${convId}`);
          }}
          leftIcon={<MessageSquare className="w-4 h-4 text-brand-600" />}
          className="bg-white border-brand-300 text-brand-700 hover:bg-brand-50 font-bold"
        >
          Contact Provider
        </Button>
      </section>

      {/* Download / Print Confirmation Voucher */}
      <div className="space-y-2 pt-1">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => setShowVoucherModal(true)}
          leftIcon={<Download className="w-5 h-5" />}
        >
          View / Print Official Confirmation Slip
        </Button>
      </div>

      {/* Voucher / Receipt Modal */}
      <Modal
        isOpen={showVoucherModal}
        onClose={() => setShowVoucherModal(false)}
        title="Official Alalay Acknowledgement Slip"
        maxWidth="lg"
        footer={
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => window.print()}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print / Save Slip
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowVoucherModal(false)}
            >
              Close
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs text-slate-800">
          <div className="border-2 border-dashed border-slate-300 p-4 sm:p-6 rounded-2xl bg-slate-50 space-y-4">
            {/* Header */}
            <div className="text-center space-y-1 border-b border-slate-200 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Republic of the Philippines
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                ALALAY HEALTHCARE FINANCIAL AID ACKNOWLEDGEMENT
              </h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Official Intake & Billing Credit Slip • Hospital Social Service Division
              </p>
            </div>

            {/* Slip Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Reference Tracking ID
                </span>
                <span className="font-mono font-extrabold text-slate-900 text-sm">
                  {application.referenceNumber}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Date Filed
                </span>
                <span className="font-bold text-slate-900">
                  {formatDate(application.submissionDate)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Patient Full Name
                </span>
                <span className="font-bold text-slate-900">{application.patientName}</span>
                <span className="text-[11px] text-slate-500 block">Age: {application.patientAge} yrs • {application.patientContact}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Current Status
                </span>
                <span className="font-bold text-emerald-700 uppercase">
                  {application.status.replace('_', ' ')}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 sm:col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Assistance Program & Provider
                </span>
                <span className="font-bold text-slate-900 text-sm block">{application.programName}</span>
                <span className="text-slate-600 font-medium">{application.providerName}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 sm:col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Medical Condition / Procedure
                </span>
                <span className="font-bold text-slate-900">{application.medicalCondition}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Estimated Hospital Bill
                </span>
                <span className="font-bold text-slate-900">{formatPHP(application.estimatedExpense)}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-800 block text-[10px] uppercase font-bold">
                  Guarantee Letter / Granted Aid
                </span>
                <span className="font-extrabold text-emerald-800 text-sm">
                  {application.assistanceAmountGranted
                    ? formatPHP(application.assistanceAmountGranted)
                    : 'Pending Assessment'}
                </span>
              </div>
            </div>

            {/* Barcode & Verification Note */}
            <div className="pt-3 border-t border-slate-200 text-center space-y-1">
              <div className="font-mono text-xl sm:text-2xl tracking-widest text-slate-800 font-bold select-none">
                |||| | ||||| ||| |||||| |||| | ||
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">
                {application.referenceNumber} • ELECTRONIC INTAKE RECEIPT • ALALAY PH
              </span>
              <p className="text-[10px] text-slate-400">
                Present this digital receipt or printed slip to the hospital social service / billing officer for invoice credit.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Staff Approval Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="Approve & Issue Guarantee Letter"
        maxWidth="md"
        footer={
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setShowApproveModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="approve-gl-form"
              variant="primary"
              size="md"
              fullWidth
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Confirm & Issue Guarantee Letter
            </Button>
          </div>
        }
      >
        <form
          id="approve-gl-form"
          onSubmit={handleApproveGuaranteeLetter}
          className="space-y-4 text-xs"
        >
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 space-y-1">
            <span className="font-bold block">Patient: {application.patientName}</span>
            <span className="block text-[11px]">Program: {application.programName}</span>
            <span className="block text-[11px]">Claim Ref: #{application.referenceNumber}</span>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Guarantee Letter Grant Amount (PHP) *</label>
            <input
              type="number"
              required
              min={1}
              value={grantAmount}
              onChange={(e) => setGrantAmount(Number(e.target.value))}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Endorsement Notes & Hospital Credit Instructions</label>
            <textarea
              rows={3}
              required
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </form>
      </Modal>

      {/* Staff Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Decline Assistance Claim"
        maxWidth="sm"
        footer={
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="reject-claim-form"
              variant="danger"
              size="md"
              fullWidth
            >
              Confirm Decline
            </Button>
          </div>
        }
      >
        <form
          id="reject-claim-form"
          onSubmit={handleRejectClaim}
          className="space-y-3.5 text-xs"
        >
          <p className="text-slate-600">
            Please provide a clear reason for declining this claim. The applicant will receive a notification explaining the requirement or classification issue.
          </p>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Reason for Decline *</label>
            <textarea
              rows={3}
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

