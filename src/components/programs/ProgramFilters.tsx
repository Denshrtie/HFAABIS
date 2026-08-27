import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { ExpenseCategory, AssistanceType, ProviderType, AvailabilityStatus } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface FilterState {
  searchQuery: string;
  selectedCategory: ExpenseCategory | 'all';
  selectedAssistanceType: AssistanceType | 'all';
  selectedProviderType: ProviderType | 'all';
  selectedAvailability: AvailabilityStatus | 'all';
  selectedLocation: string;
}

interface ProgramFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

const CATEGORIES: { id: ExpenseCategory; label: string }[] = [
  { id: 'hospital_bills', label: 'Hospital Bills' },
  { id: 'surgery', label: 'Surgery' },
  { id: 'dialysis', label: 'Dialysis' },
  { id: 'medicine', label: 'Medicine' },
  { id: 'laboratory', label: 'Lab Tests' },
  { id: 'other', label: 'Other Care' },
];

export const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResultsCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategoryClick = (cat: ExpenseCategory | 'all') => {
    onFilterChange({
      ...filters,
      selectedCategory: filters.selectedCategory === cat ? 'all' : cat,
    });
  };

  const activeFilterCount =
    (filters.selectedCategory !== 'all' ? 1 : 0) +
    (filters.selectedAssistanceType !== 'all' ? 1 : 0) +
    (filters.selectedProviderType !== 'all' ? 1 : 0) +
    (filters.selectedAvailability !== 'all' ? 1 : 0) +
    (filters.selectedLocation !== '' ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0 || filters.searchQuery !== '';

  return (
    <div className="space-y-2.5">
      {/* Search Bar + Filters Toggle Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search programs, PhilHealth, surgery..."
            aria-label="Search assistance programs"
            className="w-full h-12 pl-10 pr-9 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-soft transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              aria-label="Clear search input"
              className="touch-target absolute right-1 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Hide category filters" : "Show category filters"}
          className={`touch-target h-12 px-3.5 rounded-2xl border font-bold text-xs flex items-center gap-1.5 transition-all shadow-soft active:scale-95 shrink-0 min-w-[44px] ${
            isExpanded || activeFilterCount > 0
              ? 'bg-brand-600 text-white border-brand-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-bold">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-black text-[10px] flex items-center justify-center -mr-0.5">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Expandable Category Filter Panel */}
      {isExpanded && (
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-brand-600" />
              Category Filters
            </span>
            {filters.selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => handleCategoryClick('all')}
                className="text-[11px] font-bold text-brand-600 hover:text-brand-800"
              >
                Reset category
              </button>
            )}
          </div>

          {/* Responsive Multi-line Wrapping Filter Chips Layout (3-4 per row on mobile 360px-390px) */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* All Programs (Reset Category Option) */}
            <button
              type="button"
              onClick={() => handleCategoryClick('all')}
              aria-pressed={filters.selectedCategory === 'all'}
              className={`min-h-[44px] px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 active:scale-95 flex items-center justify-center ${
                filters.selectedCategory === 'all'
                  ? 'bg-brand-600 text-white shadow-sm border border-brand-600'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/60'
              }`}
            >
              All Programs
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = filters.selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[44px] px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm border border-brand-600 font-bold'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick links to Advanced Filters (Assistance Type, Location, Provider) */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setShowAdvancedModal(true)}
              className="text-brand-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>More Filters (Type, Provider, Location)</span>
              {activeFilterCount > (filters.selectedCategory !== 'all' ? 1 : 0) && (
                <span className="w-2 h-2 rounded-full bg-brand-600 inline-block" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onReset}
                className="font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active Filter Indicators Bar (when collapsed but filters are applied) */}
      {!isExpanded && hasActiveFilters && (
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 animate-fadeIn">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-brand-700">
              {filters.selectedCategory !== 'all'
                ? CATEGORIES.find((c) => c.id === filters.selectedCategory)?.label
                : 'Filtered'}
            </span>
            <span>• {totalResultsCount} program{totalResultsCount === 1 ? '' : 's'}</span>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 p-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      )}

      {/* Advanced Filter Modal Drawer */}
      <Modal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
        title="More Assistance Filters"
        maxWidth="md"
      >
        <div className="space-y-5">
          {/* Assistance Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Assistance Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'financial_aid', label: 'Direct Financial Aid' },
                { id: 'subsidy', label: 'Government Subsidy' },
                { id: 'discount', label: 'Hospital Discount' },
                { id: 'insurance_benefit', label: 'PhilHealth / Insurance' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      selectedAssistanceType: item.id as AssistanceType | 'all',
                    })
                  }
                  className={`touch-target px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-all ${
                    filters.selectedAssistanceType === item.id
                      ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Provider Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Provider Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'All Providers' },
                { id: 'government_lgu', label: 'DOH / LGU / Gov’t' },
                { id: 'hospital', label: 'Hospital Charity Desk' },
                { id: 'charity', label: 'PCSO / Foundations' },
                { id: 'insurance', label: 'PhilHealth' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      selectedProviderType: item.id as ProviderType | 'all',
                    })
                  }
                  className={`touch-target px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-all ${
                    filters.selectedProviderType === item.id
                      ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Availability Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'Any Status' },
                { id: 'available', label: 'Available Only' },
                { id: 'limited', label: 'Limited Slots' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      selectedAvailability: item.id as AvailabilityStatus | 'all',
                    })
                  }
                  className={`touch-target px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-all ${
                    filters.selectedAvailability === item.id
                      ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Location / City Filter
            </label>
            <input
              type="text"
              value={filters.selectedLocation}
              onChange={(e) =>
                onFilterChange({ ...filters, selectedLocation: e.target.value })
              }
              placeholder="e.g. Manila, Quezon City, NCR"
              className="w-full h-11 px-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                onReset();
                setShowAdvancedModal(false);
              }}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowAdvancedModal(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
