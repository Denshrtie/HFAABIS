import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgramStore } from '../../stores/useProgramStore';
import { useUserStore } from '../../stores/useUserStore';
import { EligibilityFormState, ExpenseCategory, ProgramMatchResult } from '../../types';
import { evaluateEligibility, formatPHP } from '../../utils';
import { Button } from '../../components/common/Button';
import { EligibilityBadge } from '../../components/common/EligibilityBadge';
import { DisclaimerCard } from '../../components/common/DisclaimerCard';
import { AvailabilityBadge } from '../../components/common/Badge';
import { 
  Users, 
  Wallet, 
  Stethoscope, 
  Shield, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Bookmark, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Info,
  Building2,
  FileCheck
} from 'lucide-react';

export const EligibilityWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const programs = useProgramStore((state) => state.programs);
  const { isBookmarked, toggleBookmark } = useProgramStore();
  const user = useUserStore((state) => state.profile);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<EligibilityFormState>({
    patientName: user.name || '',
    patientAge: 46,
    householdSize: 4,
    monthlyIncome: 14000,
    location: 'Metro Manila (NCR)',
    primaryCondition: 'General Surgery / Hospital Confinement',
    expenseCategories: ['hospital_bills', 'surgery'],
    estimatedExpenseRange: '50k_250k',
    estimatedExpenseAmount: 85000,
    insuranceStatus: 'philhealth',
    hasBarangayIndigency: true,
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.householdSize || formData.householdSize < 1) {
      newErrors.householdSize = 'Please enter a valid household size (minimum 1).';
    }
    if (formData.monthlyIncome === '' || Number(formData.monthlyIncome) < 0) {
      newErrors.monthlyIncome = 'Please provide a valid monthly household income.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.expenseCategories.length === 0) {
      newErrors.expenseCategories = 'Please select at least one expense category.';
    }
    if (!formData.insuranceStatus) {
      newErrors.insuranceStatus = 'Please select your insurance coverage status.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleReset = () => {
    setFormData({
      patientName: user.name || '',
      patientAge: 46,
      householdSize: 4,
      monthlyIncome: 14000,
      location: 'Metro Manila (NCR)',
      primaryCondition: '',
      expenseCategories: [],
      estimatedExpenseRange: '',
      estimatedExpenseAmount: 0,
      insuranceStatus: '',
      hasBarangayIndigency: false,
    });
    setStep(1);
    setErrors({});
  };

  const toggleCategory = (cat: ExpenseCategory) => {
    setFormData((prev) => {
      const exists = prev.expenseCategories.includes(cat);
      const updated = exists
        ? prev.expenseCategories.filter((c) => c !== cat)
        : [...prev.expenseCategories, cat];
      return { ...prev, expenseCategories: updated };
    });
  };

  // Evaluate matches
  const matchResults: ProgramMatchResult[] = evaluateEligibility(formData, programs);

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Header with Title & Step Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                Eligibility Matching
              </h2>
              <span className="text-[11px] font-semibold text-slate-500">
                Philippine Healthcare Aid Calculator
              </span>
            </div>
          </div>

          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
            Step {step} of 3 ({step === 1 ? '33%' : step === 2 ? '66%' : '100%'})
          </span>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Patient & Financial Profile */}
      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Let's check your eligibility
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We'll need a few details about your household and medical situation to match you with the right financial assistance programs.
            </p>
          </div>

          {/* Household Info Card */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-4">
            {/* Household Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-600" />
                Household Size (No. of dependents)
              </label>
              <select
                value={formData.householdSize}
                onChange={(e) =>
                  setFormData({ ...formData, householdSize: Number(e.target.value) })
                }
                className="w-full h-12 px-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person (Single)' : 'people (Family)'}
                  </option>
                ))}
              </select>
              {errors.householdSize && (
                <p className="text-xs text-rose-600 font-semibold">{errors.householdSize}</p>
              )}
            </div>

            {/* Monthly Household Income */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-brand-600" />
                Monthly Household Income (PHP ₱)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  ₱
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.monthlyIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyIncome: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  placeholder="e.g. 15000"
                  className="w-full h-12 pl-8 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Quick income presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[8000, 14000, 25000, 40000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFormData({ ...formData, monthlyIncome: amt })}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition active:scale-95"
                  >
                    ₱{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {errors.monthlyIncome && (
                <p className="text-xs text-rose-600 font-semibold">{errors.monthlyIncome}</p>
              )}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>This financial information is kept strictly confidential in your browser.</span>
              </div>
            </div>

            {/* Barangay Indigency Status */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.hasBarangayIndigency}
                  onChange={(e) =>
                    setFormData({ ...formData, hasBarangayIndigency: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">
                    I have or can obtain a Barangay Certificate of Indigency
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Required by government agencies (DSWD, Malasakit, PCSO, DOH MAIP) for full subsidies.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Continue to Step 2
          </Button>
        </div>
      )}

      {/* STEP 2: Medical Needs & Insurance */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Medical Needs & Insurance
            </h3>
            <p className="text-xs text-slate-600">
              Specify your diagnosis, required medical expenses, and insurance status.
            </p>
          </div>

          {/* Expense Categories (Multi-Select) */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Required Expense Category (Select all that apply)
            </label>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'hospital_bills', label: 'Hospital Confinement / Bills' },
                { id: 'surgery', label: 'Surgery & OR Supplies' },
                { id: 'dialysis', label: 'Dialysis Sessions' },
                { id: 'medicine', label: 'Chemo / Specialty Meds' },
                { id: 'laboratory', label: 'Diagnostic Scans / Labs' },
                { id: 'other', label: 'Other Treatment Aid' },
              ].map((cat) => {
                const isSelected = formData.expenseCategories.includes(cat.id as ExpenseCategory);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id as ExpenseCategory)}
                    className={`touch-target p-3 rounded-2xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
            {errors.expenseCategories && (
              <p className="text-xs text-rose-600 font-semibold">{errors.expenseCategories}</p>
            )}
          </div>

          {/* Estimated Medical Expenses Range */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Estimated Total Medical Cost
            </label>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'under_50k', label: 'Under ₱50k' },
                { id: '50k_250k', label: '₱50k - ₱250k' },
                { id: '250k_500k', label: '₱250k - ₱500k' },
                { id: 'over_500k', label: 'Over ₱500k' },
              ].map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, estimatedExpenseRange: range.id as any })
                  }
                  className={`touch-target p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                    formData.estimatedExpenseRange === range.id
                      ? 'bg-sage-100 border-sage-500 text-sage-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Insurance Status (matching reference image) */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Insurance Coverage Status
            </label>

            <div className="space-y-2">
              {[
                {
                  id: 'philhealth',
                  title: 'PhilHealth Member',
                  desc: 'I have active PhilHealth coverage or indigent membership.',
                },
                {
                  id: 'hmo',
                  title: 'HMO / Private Insurance',
                  desc: 'I have private health insurance or a corporate HMO card.',
                },
                {
                  id: 'uninsured',
                  title: 'Uninsured / Direct Pay',
                  desc: 'I currently do not have any health insurance coverage.',
                },
              ].map((ins) => (
                <label
                  key={ins.id}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.insuranceStatus === ins.id
                      ? 'bg-brand-50/80 border-brand-500 text-brand-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="insuranceStatus"
                    value={ins.id}
                    checked={formData.insuranceStatus === ins.id}
                    onChange={() => setFormData({ ...formData, insuranceStatus: ins.id as any })}
                    className="mt-1 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">{ins.title}</span>
                    <span className="text-[11px] text-slate-500">{ins.desc}</span>
                  </div>
                </label>
              ))}
            </div>
            {errors.insuranceStatus && (
              <p className="text-xs text-rose-600 font-semibold">{errors.insuranceStatus}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleNext}
              rightIcon={<Sparkles className="w-5 h-5" />}
            >
              Calculate Eligibility Matches
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Preliminary Results & Matches */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
              Your Preliminary Assistance Matches
            </h3>
            <p className="text-xs text-slate-600">
              Evaluated against your reported income (₱{Number(formData.monthlyIncome).toLocaleString()}/mo) and medical needs.
            </p>
          </div>

          {/* Mandatory Disclaimer */}
          <DisclaimerCard />

          {/* Matches List */}
          <div className="space-y-3.5">
            {matchResults.map((result) => {
              const prog = result.program;
              const bookmarked = isBookmarked(prog.id);

              return (
                <div
                  key={prog.id}
                  className={`p-5 rounded-3xl border transition-all space-y-3 ${
                    result.confidence === 'high'
                      ? 'bg-white border-emerald-300 shadow-card ring-1 ring-emerald-200'
                      : result.confidence === 'potential'
                      ? 'bg-white border-slate-200 shadow-soft'
                      : 'bg-slate-50/70 border-slate-200 opacity-75'
                  }`}
                >
                  {/* Top: Badges & Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <EligibilityBadge
                        confidence={result.confidence}
                        score={result.matchScore}
                      />
                      <AvailabilityBadge status={prog.availability} />
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(prog.id)}
                      className={`touch-target p-2 rounded-full transition ${
                        bookmarked ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-brand-600'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Provider */}
                  <div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {prog.name}
                    </h4>
                    <p className="text-xs font-semibold text-brand-700 mt-0.5">
                      {prog.providerName}
                    </p>
                  </div>

                  {/* Benefit coverage amount */}
                  <div className="p-3 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-brand-800">Coverage Limit:</span>
                    <span className="font-black text-brand-900 text-sm">
                      {formatPHP(prog.maxAmountCovered)}
                    </span>
                  </div>

                  {/* Match Explanations / Reasons */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                      Evaluation Breakdown:
                    </span>
                    {result.matchReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-emerald-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                    {result.unmetCriteria.map((unmet, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-amber-800 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{unmet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/programs/${prog.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => navigate(`/apply/${prog.id}`)}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Start Application
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset / Recalculate CTA */}
          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Re-take Eligibility Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
