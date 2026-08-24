import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { useProgramStore } from '../../stores/useProgramStore';
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
  Share2 
} from 'lucide-react';
import { formatPHP, formatDate } from '../../utils';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getApplicationById, attachDocumentToApplication } = useApplicationStore();
  const application = getApplicationById(id || '');
  const program = useProgramStore((state) =>
    application ? state.getProgramById(application.programId) : undefined
  );

  const [copied, setCopied] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  if (!application) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Application not found</h3>
        <Button variant="primary" onClick={() => navigate('/applications')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

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
  };

  const requiredDocList = program?.requiredDocuments || [
    "Clinical Abstract / Medical Certificate",
    "Hospital Statement of Account (SOA)",
    "Barangay Certificate of Indigency",
    "Valid Government ID"
  ];

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
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
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
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

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div>
              <span className="text-slate-500 font-medium block">Estimated Medical Bill</span>
              <span className="font-bold text-slate-900">{formatPHP(application.estimatedExpense)}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Assistance Granted</span>
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

      {/* Download / Print Confirmation Voucher */}
      <div className="space-y-2 pt-2">
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
        title="Official HFAABIS Acknowledgement Slip"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-800">
          <div className="border-2 border-dashed border-slate-300 p-5 rounded-2xl bg-slate-50 space-y-4">
            {/* Header */}
            <div className="text-center space-y-1 border-b border-slate-200 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Republic of the Philippines
              </span>
              <h3 className="text-base font-black text-slate-900">
                HEALTHCARE FINANCIAL AID ACKNOWLEDGEMENT
              </h3>
              <p className="text-[11px] text-slate-600">
                Presented to Hospital Billing & Social Work Division
              </p>
            </div>

            {/* Slip Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Reference ID:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {application.referenceNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Date Filed:</span>
                <span className="font-bold text-slate-900">
                  {formatDate(application.submissionDate)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Patient Name:</span>
                <span className="font-bold text-slate-900">{application.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assistance Program:</span>
                <span className="font-bold text-slate-900">{application.programName}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">Provider Agency:</span>
                <span className="font-bold text-slate-900">{application.providerName}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">Medical Condition:</span>
                <span className="font-bold text-slate-900">{application.medicalCondition}</span>
              </div>
            </div>

            {/* Barcode representation */}
            <div className="pt-3 border-t border-slate-200 text-center space-y-1">
              <div className="font-mono text-xl tracking-widest text-slate-800 font-bold">
                |||| | ||||| ||| |||||| |||| | ||
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {application.referenceNumber} • ELECTRONIC INTAKE RECEIPT
              </span>
            </div>
          </div>

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
        </div>
      </Modal>
    </div>
  );
};
