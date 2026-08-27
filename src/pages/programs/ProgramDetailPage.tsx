import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgramStore } from '../../stores/useProgramStore';
import { useMessageStore } from '../../stores/useMessageStore';
import { AvailabilityBadge, AssistanceTypeBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { DisclaimerCard } from '../../components/common/DisclaimerCard';
import { 
  Bookmark, 
  MapPin, 
  Building2, 
  Clock, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Phone, 
  Mail, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldCheck,
  Check,
  Share2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { formatPHP, formatDate } from '../../utils';

export const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProgramById, isBookmarked, toggleBookmark } = useProgramStore();
  const getOrCreateConversation = useMessageStore((state) => state.getOrCreateConversation);

  const program = getProgramById(id || '');
  const [openProcedureIndex, setOpenProcedureIndex] = useState<number | null>(0);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!program) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Program not found</h3>
        <Button variant="primary" onClick={() => navigate('/')}>
          Browse All Programs
        </Button>
      </div>
    );
  }

  const bookmarked = isBookmarked(program.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: program.name,
        text: `Check out ${program.name} on Alalay`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Top action bar: Badges & Bookmark */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <AvailabilityBadge status={program.availability} />
          <AssistanceTypeBadge type={program.assistanceType} />
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share program"
            className="touch-target p-2 text-slate-500 hover:text-brand-700 hover:bg-slate-100 rounded-full transition"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => toggleBookmark(program.id)}
            aria-label={bookmarked ? "Remove bookmark" : "Save program"}
            className={`touch-target p-2 rounded-full transition-all ${
              bookmarked
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 scale-105'
                : 'text-slate-400 hover:text-brand-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark
              className={`w-5 h-5 ${bookmarked ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
        </div>
      </div>

      {copiedNotification && (
        <div className="p-2 rounded-xl bg-slate-900 text-white text-xs text-center animate-fade-in font-medium">
          Link copied to clipboard!
        </div>
      )}

      {/* Program Header */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
          {program.name}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-brand-600 shrink-0" />
          <span>{program.providerName}</span>
        </p>
        <p className="text-xs text-slate-500 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{program.location}</span>
        </p>
      </div>

      {/* Benefits Summary Box */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-card space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-sage-200 block">
              Maximum Subsidy / Benefit
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white block mt-0.5">
              {formatPHP(program.maxAmountCovered)}
            </span>
          </div>
          {program.processingDays && (
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sage-300 block">
                Processing Time
              </span>
              <span className="text-xs font-bold text-white">
                {program.processingDays}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-sage-100 leading-relaxed border-t border-brand-600/70 pt-3">
          {program.benefitsSummary}
        </p>
      </div>

      {/* Deadline Alert if specified */}
      {program.applicationDeadline && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold block uppercase tracking-wide text-amber-800">
              Cycle Deadline Approaching
            </span>
            <p>
              Applications for this cycle close on <strong>{formatDate(program.applicationDeadline)}</strong>. Please submit required documents early.
            </p>
          </div>
        </div>
      )}

      {/* Program Description */}
      <section className="space-y-2">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          About This Assistance Program
        </h3>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2 shadow-soft">
          <p>{program.description}</p>
        </div>
      </section>

      {/* Eligibility Rules Summary */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Eligibility Requirements
        </h3>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-soft text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="font-medium text-slate-500">Maximum Household Income</span>
            <span className="font-bold text-slate-900">
              ₱{program.eligibilityRules.maxMonthlyIncome.toLocaleString()} / month
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="font-medium text-slate-500">Barangay Indigency Certificate</span>
            <span className={`font-bold ${program.eligibilityRules.requiresIndigency ? 'text-amber-800' : 'text-slate-900'}`}>
              {program.eligibilityRules.requiresIndigency ? 'Strictly Required' : 'Optional / Universal'}
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="font-bold text-slate-800 block">Covered Treatments & Care:</span>
            <div className="flex flex-wrap gap-1.5">
              {program.eligibilityRules.coveredTreatments.map((treatment, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-sage-50 text-sage-800 border border-sage-200 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-sage-600" />
                  {treatment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents Checklist */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Required Documents Checklist
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            {program.requiredDocuments.length} files needed
          </span>
        </div>

        <div className="space-y-2">
          {program.requiredDocuments.map((docName, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-soft flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {docName}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Must be clearly scanned or photographed (PDF, PNG, JPG &lt; 5MB).
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Application Procedure */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          How to Apply
        </h3>

        <div className="space-y-2">
          {program.applicationProcedure.map((stepText, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sage-500 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-800">
                  Step {idx + 1}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                {stepText}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Provider Contact Card */}
      <section className="space-y-2">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Help Desk Contact & Location
        </h3>

        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-600 shrink-0" />
            <span className="font-semibold">{program.contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-600 shrink-0" />
            <span className="font-semibold">{program.contactInfo.email}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <span className="font-medium">{program.contactInfo.officeAddress}</span>
          </div>
          {program.contactInfo.operatingHours && (
            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/80 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{program.contactInfo.operatingHours}</span>
            </div>
          )}
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <DisclaimerCard />

      {/* Action Buttons at Bottom */}
      <div className="pt-4 flex flex-col gap-2.5">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => {
            const convId = getOrCreateConversation({
              providerId: program.hospitalId || `prov-${program.providerType}`,
              providerName: program.providerName,
              providerType: program.providerType,
              programId: program.id,
              programName: program.name,
            });
            navigate(`/messages/${convId}`);
          }}
          leftIcon={<MessageSquare className="w-5 h-5 text-brand-600" />}
          className="border-brand-300 text-brand-700 hover:bg-brand-50"
        >
          Contact Provider
        </Button>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate(`/apply/${program.id}`)}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Apply Online
        </Button>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => navigate('/eligibility')}
          leftIcon={<Sparkles className="w-4 h-4" />}
          className="text-slate-500 border-slate-200 mt-1"
        >
          Run Full Eligibility Pre-Check
        </Button>
      </div>
    </div>
  );
};
