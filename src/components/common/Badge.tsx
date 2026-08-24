import React from 'react';
import { AvailabilityStatus, ApplicationStatus, AssistanceType, ExpenseCategory } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' | 'outline';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  }[size];

  const variantClasses = {
    primary: 'bg-brand-50 text-brand-700 border border-brand-200',
    secondary: 'bg-sage-50 text-sage-800 border border-sage-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    outline: 'bg-transparent text-slate-600 border border-slate-300',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-colors ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

export const AvailabilityBadge: React.FC<{ status: AvailabilityStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  switch (status) {
    case 'available':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.8 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Available
        </span>
      );
    case 'limited':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Limited Slots
        </span>
      );
    case 'currently_unavailable':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Currently Unavailable
        </span>
      );
    case 'not_offered':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-300 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Not Offered
        </span>
      );
    default:
      return null;
  }
};

export const ApplicationStatusBadge: React.FC<{ status: ApplicationStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  switch (status) {
    case 'submitted':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Submitted
        </span>
      );
    case 'under_review':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Under Review
        </span>
      );
    case 'approved':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Approved
        </span>
      );
    case 'rejected':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-300 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          Not Approved
        </span>
      );
    default:
      return null;
  }
};

export const AssistanceTypeBadge: React.FC<{ type: AssistanceType; className?: string }> = ({
  type,
  className = '',
}) => {
  const map: Record<AssistanceType, { label: string; bg: string }> = {
    financial_aid: { label: 'Direct Aid', bg: 'bg-teal-50 text-teal-800 border-teal-200' },
    subsidy: { label: 'Subsidy / Voucher', bg: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
    discount: { label: 'Hospital Discount', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    insurance_benefit: { label: 'PhilHealth / Insurance', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
  };

  const item = map[type] || { label: type, bg: 'bg-slate-50 text-slate-700 border-slate-200' };

  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md border ${item.bg} ${className}`}>
      {item.label}
    </span>
  );
};

export const ExpenseCategoryChip: React.FC<{ category: ExpenseCategory; active?: boolean; onClick?: () => void }> = ({
  category,
  active = false,
  onClick,
}) => {
  const formatName = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'hospital_bills': return 'Hospital Bills';
      case 'medicine': return 'Medicine';
      case 'surgery': return 'Surgery';
      case 'laboratory': return 'Lab Tests';
      case 'dialysis': return 'Dialysis';
      case 'other': return 'Other Care';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`touch-target px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
        active
          ? 'bg-brand-600 text-white shadow-sm border border-brand-600'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/50'
      }`}
    >
      {formatName(category)}
    </button>
  );
};
