import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgramStore } from '../../stores/useProgramStore';
import { useHospitalStore } from '../../stores/useHospitalStore';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { useUserStore } from '../../stores/useUserStore';
import { ProgramCard } from '../../components/programs/ProgramCard';
import { HospitalCard } from '../../components/hospitals/HospitalCard';
import { ProgramFilters } from '../../components/programs/ProgramFilters';
import { ApplicationCard } from '../../components/applications/ApplicationCard';
import { ExpenseCategory, AssistanceType, ProviderType, AvailabilityStatus } from '../../types';
import { 
  Sparkles, 
  Building2, 
  FileText, 
  HeartHandshake, 
  ArrowRight, 
  HelpCircle, 
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const programs = useProgramStore((state) => state.programs);
  const hospitals = useHospitalStore((state) => state.hospitals);
  const applications = useApplicationStore((state) => state.applications);
  const user = useUserStore((state) => state.profile);

  // Filter State
  const [filters, setFilters] = useState<{
    searchQuery: string;
    selectedCategory: ExpenseCategory | 'all';
    selectedAssistanceType: AssistanceType | 'all';
    selectedProviderType: ProviderType | 'all';
    selectedAvailability: AvailabilityStatus | 'all';
    selectedLocation: string;
  }>({
    searchQuery: '',
    selectedCategory: 'all',
    selectedAssistanceType: 'all',
    selectedProviderType: 'all',
    selectedAvailability: 'all',
    selectedLocation: '',
  });

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: 'all',
      selectedAssistanceType: 'all',
      selectedProviderType: 'all',
      selectedAvailability: 'all',
      selectedLocation: '',
    });
  };

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      // Search text
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesProvider = p.providerName.toLowerCase().includes(q);
        const matchesLocation = p.location.toLowerCase().includes(q);
        const matchesTags = p.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesTreatments = p.eligibilityRules.coveredTreatments.some((t) =>
          t.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesProvider && !matchesLocation && !matchesTags && !matchesTreatments) {
          return false;
        }
      }

      // Category
      if (filters.selectedCategory !== 'all') {
        if (!p.category.includes(filters.selectedCategory)) return false;
      }

      // Assistance Type
      if (filters.selectedAssistanceType !== 'all') {
        if (p.assistanceType !== filters.selectedAssistanceType) return false;
      }

      // Provider Type
      if (filters.selectedProviderType !== 'all') {
        if (p.providerType !== filters.selectedProviderType) return false;
      }

      // Availability
      if (filters.selectedAvailability !== 'all') {
        if (p.availability !== filters.selectedAvailability) return false;
      }

      // Location
      if (filters.selectedLocation.trim()) {
        const loc = filters.selectedLocation.toLowerCase();
        if (!p.location.toLowerCase().includes(loc)) return false;
      }

      return true;
    });
  }, [programs, filters]);

  const activeApplication = applications.find(
    (a) => a.status === 'under_review' || a.status === 'submitted'
  ) || applications[0];

  return (
    <div className="space-y-6 px-4 py-4">
      {/* Greeting Card Header */}
      <section className="space-y-1 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-sage-600 uppercase tracking-wider">
            Republic of the Philippines
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sage-50 text-sage-700 border border-sage-200">
            DOH / LGU / PhilHealth
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          How can Alalay help you today?
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-500">
          Find healthcare assistance that may help you and check what you qualify for.
        </p>
      </section>

      {/* Search & Filter Component */}
      <section>
        <ProgramFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          totalResultsCount={filteredPrograms.length}
        />
      </section>

      {/* Quick Action Navigation Buttons */}
      <section className="grid grid-cols-4 gap-2 text-center">
        <button
          type="button"
          onClick={() => navigate('/eligibility')}
          className="touch-target p-3 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:border-brand-400 hover:shadow-card transition flex flex-col items-center gap-1.5 active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 leading-tight">
            Eligibility
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/applications')}
          className="touch-target p-3 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:border-brand-400 hover:shadow-card transition flex flex-col items-center gap-1.5 active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 leading-tight">
            Claims
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('hospitals-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="touch-target p-3 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:border-brand-400 hover:shadow-card transition flex flex-col items-center gap-1.5 active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 leading-tight">
            Hospitals
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/saved')}
          className="touch-target p-3 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:border-brand-400 hover:shadow-card transition flex flex-col items-center gap-1.5 active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 leading-tight">
            Saved Aid
          </span>
        </button>
      </section>

      {/* Active Application Card (matching reference screen) */}
      {activeApplication && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Active Application
            </h3>
            <button
              type="button"
              onClick={() => navigate('/applications')}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-0.5"
            >
              See All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <ApplicationCard application={activeApplication} highlighted={true} />
        </section>
      )}

      {/* Eligibility Match Banner Promo */}
      <section className="bg-gradient-to-br from-brand-600 to-sage-600 rounded-3xl p-5 text-white shadow-elevated relative overflow-hidden">
        <div className="relative z-10 space-y-2.5 max-w-[280px]">
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-white/20 rounded-full inline-block backdrop-blur-sm">
            Interactive Tool
          </span>
          <h3 className="text-lg font-extrabold leading-tight">
            Unsure which assistance program you qualify for?
          </h3>
          <p className="text-xs text-sage-50 leading-relaxed">
            Answer 4 quick questions about your income and hospital needs to get instant potential matches.
          </p>
          <Button
            variant="sage"
            size="sm"
            onClick={() => navigate('/eligibility')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="mt-1 shadow-md"
          >
            Check My Eligibility Now
          </Button>
        </div>

        {/* Decorative circle glow */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* Assistance Programs List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {filters.selectedCategory === 'all'
                ? 'Financial Assistance Programs'
                : `${filters.selectedCategory.replace('_', ' ')} Programs`}
            </h3>
            <p className="text-xs text-slate-500">
              Government subsidies, Malasakit Desks, and charity grants
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredPrograms.length} Available
          </span>
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-800">No programs match your search</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Try adjusting your search keyword or clearing your category filters.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Hospitals & Medical Centers */}
      <section id="hospitals-section" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Partner Hospitals & Centers
            </h3>
            <p className="text-xs text-slate-500">
              Hospitals with Malasakit Centers and social service desks
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </section>
    </div>
  );
};
