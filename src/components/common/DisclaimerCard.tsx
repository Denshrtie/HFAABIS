import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface DisclaimerCardProps {
  title?: string;
  className?: string;
  variant?: 'warning' | 'info';
  children?: React.ReactNode;
}

export const DisclaimerCard: React.FC<DisclaimerCardProps> = ({
  title = "Preliminary Evaluation Disclaimer",
  className = '',
  variant = 'warning',
  children,
}) => {
  const isWarning = variant === 'warning';

  return (
    <div
      role="note"
      aria-label={title}
      className={`rounded-2xl p-4 border transition-all ${
        isWarning
          ? 'bg-amber-50/90 border-amber-200/90 text-amber-900'
          : 'bg-brand-50/80 border-brand-200/80 text-brand-900'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
          isWarning ? 'bg-amber-100 text-amber-800' : 'bg-brand-100 text-brand-700'
        }`}>
          {isWarning ? <ShieldAlert className="w-5 h-5" /> : <Info className="w-5 h-5" />}
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold tracking-wide uppercase opacity-90">
            {title}
          </h4>
          <div className="text-xs leading-relaxed opacity-95">
            {children || (
              <p>
                This assessment is a preliminary guidance tool based on your self-reported data. 
                <strong> No eligibility is guaranteed.</strong> Final financial assistance amounts and approvals are subject to documentary verification and official classification by the attending Medical Social Worker and respective partner agency.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
