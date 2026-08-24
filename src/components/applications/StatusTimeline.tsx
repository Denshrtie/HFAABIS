import React from 'react';
import { ApplicationStatus, StatusHistoryEntry } from '../../types';
import { CheckCircle2, Clock, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { formatDate } from '../../utils';

interface StatusTimelineProps {
  currentStatus: ApplicationStatus;
  statusHistory: StatusHistoryEntry[];
  estimatedResolutionDate?: string;
  missingDocumentAlert?: string;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  currentStatus,
  statusHistory,
  estimatedResolutionDate,
  missingDocumentAlert,
}) => {
  const steps: { key: ApplicationStatus; label: string; description: string }[] = [
    {
      key: 'submitted',
      label: 'Application Submitted',
      description: 'Documents received and queued for intake verification.',
    },
    {
      key: 'under_review',
      label: 'Medical Social Work Assessment',
      description: 'Intake officer evaluating diagnostic abstract and indigency classification.',
    },
    {
      key: currentStatus === 'rejected' ? 'rejected' : 'approved',
      label: currentStatus === 'rejected' ? 'Application Rejected' : 'Final Approval & Guarantee Issuance',
      description: currentStatus === 'rejected' 
        ? 'Assistance criteria could not be verified for this request.'
        : 'Billing credit voucher or Guarantee Letter issued to hospital.',
    },
  ];

  const getStepState = (stepKey: ApplicationStatus) => {
    if (currentStatus === 'rejected') {
      if (stepKey === 'rejected') return 'error';
      return 'completed';
    }

    if (currentStatus === 'approved') {
      return 'completed';
    }

    if (currentStatus === 'under_review') {
      if (stepKey === 'submitted') return 'completed';
      if (stepKey === 'under_review') return 'current';
      return 'upcoming';
    }

    if (currentStatus === 'submitted') {
      if (stepKey === 'submitted') return 'current';
      return 'upcoming';
    }

    return 'upcoming';
  };

  return (
    <div className="space-y-6">
      {/* Missing Doc Alert if active */}
      {missingDocumentAlert && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 animate-pulse-subtle">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold block uppercase tracking-wide text-rose-800">
              Action Required
            </span>
            <p className="font-medium text-rose-700">{missingDocumentAlert}</p>
          </div>
        </div>
      )}

      {/* Vertical Stepper */}
      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {steps.map((step, idx) => {
          const state = getStepState(step.key);
          const historyItem = statusHistory.find((h) => h.status === step.key);

          return (
            <div key={step.key} className="relative group">
              {/* Step Icon Node */}
              <div className="absolute -left-6 top-0 flex items-center justify-center">
                {state === 'completed' && (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-emerald-50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
                {state === 'current' && (
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center ring-4 ring-amber-100 animate-pulse">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                )}
                {state === 'error' && (
                  <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center ring-4 ring-rose-50">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                )}
                {state === 'upcoming' && (
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 ring-4 ring-slate-50" />
                )}
              </div>

              {/* Step Content */}
              <div className={`p-4 rounded-2xl border transition-all ${
                state === 'current'
                  ? 'bg-amber-50/60 border-amber-200 shadow-sm'
                  : state === 'completed'
                  ? 'bg-white border-slate-200/90 shadow-soft'
                  : state === 'error'
                  ? 'bg-rose-50/60 border-rose-200'
                  : 'bg-slate-50/60 border-slate-200/50 opacity-60'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`text-xs sm:text-sm font-bold ${
                    state === 'current'
                      ? 'text-amber-900'
                      : state === 'completed'
                      ? 'text-slate-900'
                      : state === 'error'
                      ? 'text-rose-900'
                      : 'text-slate-500'
                  }`}>
                    {step.label}
                  </h4>

                  {historyItem && (
                    <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                      {formatDate(historyItem.timestamp)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {historyItem ? historyItem.notes : step.description}
                </p>

                {state === 'current' && estimatedResolutionDate && (
                  <div className="mt-2.5 pt-2 border-t border-amber-200/70 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target Resolution: {estimatedResolutionDate}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
