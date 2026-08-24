import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, Building2, Tag, Stethoscope } from 'lucide-react';
import { ExpenseCategory, AssistanceType, ProviderType, AvailabilityStatus } from '../../types';
import { ExpenseCategoryChip } from '../common/Badge';
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

const CATEGORIES: ExpenseCategory[] = [
  'hospital_bills',
  'surgery',
  'dialysis',
  'medicine',
  'laboratory',
  'other',
];

export const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResultsCount,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategoryClick = (cat: ExpenseCategory | 'all') => {
    onFilterChange({
      ...filters,
      selectedCategory: filters.selectedCategory === cat ? 'all' : cat,
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedCategory !== 'all' ||
    filters.selectedAssistanceType !== 'all' ||
    filters.selectedProviderType !== 'all' ||
    filters.selectedAvailability !== 'all' ||
    filters.selectedLocation !== '';

  return (
    <div className="space-y-3">
      {/* Search Bar + Filter Trigger */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search programs, PhilHealth, surgery..."
            className="w-full h-12 pl-11 pr-10 bg-white rounded-2xl border border-slate-200 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-soft transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="touch-target absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter button */}
        <button
          type="button"
          onClick={() => setShowFilterModal(true)}
          aria-label="Open filter options"
          className={`touch-target h-12 px-3.5 rounded-2xl border font-bold text-xs flex items-center gap-2 transition-all shadow-soft active:scale-95 ${
            hasActiveFilters
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* Horizontally scrollable Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
        <button
          type="button"
          onClick={() => handleCategoryClick('all')}
          className={`touch-target px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
            filters.selectedCategory === 'all'
              ? 'bg-brand-600 text-white shadow-sm border border-brand-600'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300'
          }`}
        >
          All Programs
        </button>

        {CATEGORIES.map((cat) => (
          <ExpenseCategoryChip
            key={cat}
            category={cat}
            active={filters.selectedCategory === cat}
            onClick={() => handleCategoryClick(cat)}
          />
        ))}
      </div>

      {/* Active Filter Indicators / Reset Bar */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between px-1 text-xs text-slate-500">
          <span>Found {totalResultsCount} matching assistance program{totalResultsCount === 1 ? '' : 's'}</span>
          <button
            type="button"
            onClick={onReset}
            className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 p-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        </div>
      )}

      {/* Filter Modal Drawer */}
      <Modal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filter Assistance Programs"
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
                setShowFilterModal(false);
              }}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowFilterModal(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
