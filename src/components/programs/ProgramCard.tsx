import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, MapPin, Building, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { AssistanceProgram } from '../../types';
import { AvailabilityBadge, AssistanceTypeBadge } from '../common/Badge';
import { formatPHP } from '../../utils';
import { useProgramStore } from '../../stores/useProgramStore';

interface ProgramCardProps {
  program: AssistanceProgram;
  compact?: boolean;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, compact = false }) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useProgramStore();
  const bookmarked = isBookmarked(program.id);

  const handleCardClick = () => {
    navigate(`/programs/${program.id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(program.id);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-slate-100/90 shadow-soft hover:shadow-card hover:border-brand-300 transition-all duration-200 cursor-pointer active:scale-[0.99] flex flex-col justify-between gap-3"
    >
      {/* Top row: Badges and Bookmark */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <AvailabilityBadge status={program.availability} />
          <AssistanceTypeBadge type={program.assistanceType} />
        </div>

        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label={bookmarked ? "Remove bookmark" : "Save program"}
          className={`touch-target p-2 -mr-1 -mt-1 rounded-full transition-all duration-200 ${
            bookmarked
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 scale-105'
              : 'text-slate-400 hover:text-brand-600 hover:bg-slate-100'
          }`}
        >
          <Bookmark
            className={`w-5 h-5 transition-transform ${bookmarked ? 'fill-rose-500 text-rose-500' : ''}`}
          />
        </button>
      </div>

      {/* Title & Provider */}
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors">
          {program.name}
        </h3>
        <p className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{program.providerName}</span>
        </p>
      </div>

      {/* Description / Summary */}
      {!compact && (
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {program.description}
        </p>
      )}

      {/* Benefit summary box */}
      <div className="bg-brand-50/70 rounded-2xl p-3 border border-brand-100/80 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-800 block">
            Coverage Limit
          </span>
          <span className="text-sm font-extrabold text-brand-900 truncate block">
            {formatPHP(program.maxAmountCovered)}
          </span>
        </div>

        {program.processingDays && (
          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              Turnaround
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {program.processingDays}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Location and Action */}
      <div className="flex items-center justify-between pt-1 text-xs text-slate-500 border-t border-slate-100">
        <span className="flex items-center gap-1 truncate max-w-[200px]">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{program.location}</span>
        </span>

        <span className="text-brand-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
          Details
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </article>
  );
};
