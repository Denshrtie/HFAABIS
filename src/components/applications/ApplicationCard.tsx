import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationSubmission } from '../../types';
import { ApplicationStatusBadge } from '../common/Badge';
import { formatDate } from '../../utils';
import { Clock, ChevronRight, FileText, Building2, User } from 'lucide-react';

interface ApplicationCardProps {
  application: ApplicationSubmission;
  highlighted?: boolean;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  highlighted = false,
}) => {
  const navigate = useNavigate();

  const getProgressPercentage = () => {
    switch (application.status) {
      case 'submitted': return 33;
      case 'under_review': return 66;
      case 'approved': return 100;
      case 'rejected': return 100;
    }
  };

  const getStepText = () => {
    switch (application.status) {
      case 'submitted': return 'Step 1 of 3: Submitted';
      case 'under_review': return 'Step 2 of 3: Social Work Review';
      case 'approved': return 'Step 3 of 3: Approved & Granted';
      case 'rejected': return 'Evaluation Complete';
    }
  };

  return (
    <div
      onClick={() => navigate(`/applications/${application.id}`)}
      className={`group rounded-3xl p-4 sm:p-5 border transition-all duration-200 cursor-pointer active:scale-[0.99] flex flex-col justify-between gap-3.5 ${
        highlighted
          ? 'bg-gradient-to-br from-brand-800 to-brand-900 text-white border-brand-700 shadow-card'
          : 'bg-white text-slate-800 border-slate-200/90 shadow-soft hover:shadow-card hover:border-brand-300'
      }`}
    >
      {/* Top row: Program + Status Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            highlighted ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-700'
          }`}>
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className={`text-sm font-bold truncate leading-tight ${
              highlighted ? 'text-white' : 'text-slate-900 group-hover:text-brand-700'
            }`}>
              {application.programName}
            </h4>
            <span className={`text-[11px] font-mono font-semibold ${
              highlighted ? 'text-sage-200' : 'text-slate-500'
            }`}>
              #{application.referenceNumber}
            </span>
          </div>
        </div>

        <ApplicationStatusBadge status={application.status} />
      </div>

      {/* Progress Bar for active applications */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className={`font-semibold ${highlighted ? 'text-sage-100' : 'text-slate-600'}`}>
            {getStepText()}
          </span>
          <span className={`font-bold ${highlighted ? 'text-white' : 'text-slate-800'}`}>
            {getProgressPercentage()}%
          </span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${
          highlighted ? 'bg-brand-950/40' : 'bg-slate-100'
        }`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              application.status === 'approved'
                ? 'bg-emerald-500'
                : application.status === 'rejected'
                ? 'bg-rose-500'
                : highlighted
                ? 'bg-sage-400'
                : 'bg-brand-600'
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Bottom info */}
      <div className={`flex items-center justify-between pt-2 border-t text-xs ${
        highlighted ? 'border-brand-700/60 text-sage-100' : 'border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center gap-1.5 truncate">
          <Clock className="w-3.5 h-3.5 shrink-0 opacity-80" />
          <span className="truncate">
            {application.estimatedResolutionDate || `Submitted ${formatDate(application.submissionDate)}`}
          </span>
        </div>

        <span className={`font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0 ${
          highlighted ? 'text-white' : 'text-brand-600'
        }`}>
          Tracker
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};
