import React from 'react';
import { MatchConfidence } from '../../types';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface EligibilityBadgeProps {
  confidence: MatchConfidence;
  score?: number;
  showIcon?: boolean;
  className?: string;
}

export const EligibilityBadge: React.FC<EligibilityBadgeProps> = ({
  confidence,
  score,
  showIcon = true,
  className = '',
}) => {
  switch (confidence) {
    case 'high':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm ${className}`}
        >
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
          High Match {score ? `(${score}%)` : ''}
        </span>
      );
    case 'potential':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm ${className}`}
        >
          {showIcon && <HelpCircle className="w-3.5 h-3.5 text-amber-700" />}
          Potential Match {score ? `(${score}%)` : ''}
        </span>
      );
    case 'not_met':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 ${className}`}
        >
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-slate-500" />}
          Criteria Not Met
        </span>
      );
    default:
      return null;
  }
};
