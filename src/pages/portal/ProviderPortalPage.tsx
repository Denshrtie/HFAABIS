import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgramStore } from '../../stores/useProgramStore';
import { useUserStore } from '../../stores/useUserStore';
import { AssistanceProgram, AvailabilityStatus, ExpenseCategory, ProviderType, AssistanceType } from '../../types';
import { AvailabilityBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft, 
  Eye, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  ShieldAlert,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { formatPHP } from '../../utils';

export const ProviderPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { programs, addProgram, updateProgram, updateAvailability } = useProgramStore();
  const { isStaffMode, toggleStaffMode } = useUserStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingProgram, setEditingProgram] = useState<AssistanceProgram | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State for Add / Edit
  const [name, setName] = useState('');
  const [providerName, setProviderName] = useState('');
  const [providerType, setProviderType] = useState<ProviderType>('government_lgu');
  const [category, setCategory] = useState<ExpenseCategory[]>(['hospital_bills']);
  const [assistanceType, setAssistanceType] = useState<AssistanceType>('subsidy');
  const [location, setLocation] = useState('Nationwide / NCR');
  const [availability, setAvailability] = useState<AvailabilityStatus>('available');
  const [description, setDescription] = useState('');
  const [benefitsSummary, setBenefitsSummary] = useState('');
  const [maxAmountCovered, setMaxAmountCovered] = useState<number | ''>(50000);
  const [maxMonthlyIncome, setMaxMonthlyIncome] = useState<number | ''>(30000);
  const [requiresIndigency, setRequiresIndigency] = useState(true);
  const [coveredTreatmentsStr, setCoveredTreatmentsStr] = useState('Inpatient Care, Surgery, Emergency Medicine');
  const [requiredDocsStr, setRequiredDocsStr] = useState('Clinical Abstract, Hospital SOA, Barangay Indigency, Valid ID');
  const [procedureStr, setProcedureStr] = useState('Submit requirements to hospital desk; Undergo social assessment; Receive billing credit');
  const [phone, setPhone] = useState('(02) 8000-0000');
  const [email, setEmail] = useState('assistance@agency.gov.ph');
  const [officeAddress, setOfficeAddress] = useState('Hospital Social Work Dept / LGU Desk');

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const openAddModal = () => {
    setName('');
    setProviderName('');
    setProviderType('government_lgu');
    setCategory(['hospital_bills']);
    setAssistanceType('subsidy');
    setLocation('Nationwide / NCR');
    setAvailability('available');
    setDescription('');
    setBenefitsSummary('');
    setMaxAmountCovered(50000);
    setMaxMonthlyIncome(30000);
    setRequiresIndigency(true);
    setCoveredTreatmentsStr('Inpatient Hospitalization, Surgery, Chemotherapy');
    setRequiredDocsStr('Clinical Abstract / Medical Certificate, Hospital Statement of Account (SOA), Barangay Certificate of Indigency, Valid Government ID');
    setProcedureStr('Submit requirements to hospital desk; Undergo social assessment; Receive billing credit');
    setPhone('(02) 8651-7800');
    setEmail('assistance@agency.gov.ph');
    setOfficeAddress('Ground Floor Social Work Center');
    setIsAddModalOpen(true);
  };

  const openEditModal = (prog: AssistanceProgram) => {
    setEditingProgram(prog);
    setName(prog.name);
    setProviderName(prog.providerName);
    setProviderType(prog.providerType);
    setCategory(prog.category);
    setAssistanceType(prog.assistanceType);
    setLocation(prog.location);
    setAvailability(prog.availability);
    setDescription(prog.description);
    setBenefitsSummary(prog.benefitsSummary);
    setMaxAmountCovered(prog.maxAmountCovered || '');
    setMaxMonthlyIncome(prog.eligibilityRules.maxMonthlyIncome);
    setRequiresIndigency(prog.eligibilityRules.requiresIndigency);
    setCoveredTreatmentsStr(prog.eligibilityRules.coveredTreatments.join(', '));
    setRequiredDocsStr(prog.requiredDocuments.join(', '));
    setProcedureStr(prog.applicationProcedure.join('; '));
    setPhone(prog.contactInfo.phone);
    setEmail(prog.contactInfo.email);
    setOfficeAddress(prog.contactInfo.officeAddress);
  };

  const handleQuickAvailabilityChange = (progId: string, newStatus: AvailabilityStatus) => {
    updateAvailability(progId, newStatus);
    showToast(`Updated availability to ${newStatus.replace('_', ' ')}!`);
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();

    const coveredTreatments = coveredTreatmentsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const requiredDocuments = requiredDocsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const applicationProcedure = procedureStr
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProgram) {
      // Update existing
      updateProgram(editingProgram.id, {
        name,
        providerName,
        providerType,
        category,
        assistanceType,
        location,
        availability,
        description,
        benefitsSummary,
        maxAmountCovered: maxAmountCovered === '' ? undefined : Number(maxAmountCovered),
        eligibilityRules: {
          maxMonthlyIncome: Number(maxMonthlyIncome) || 30000,
          requiresIndigency,
          coveredTreatments,
        },
        requiredDocuments,
        applicationProcedure,
        contactInfo: {
          phone,
          email,
          officeAddress,
        },
      });
      setEditingProgram(null);
      showToast(`Successfully updated "${name}"!`);
    } else {
      // Add new
      const created = addProgram({
        name,
        providerName,
        providerType,
        category,
        assistanceType,
        location,
        availability,
        description,
        benefitsSummary,
        maxAmountCovered: maxAmountCovered === '' ? undefined : Number(maxAmountCovered),
        eligibilityRules: {
          maxMonthlyIncome: Number(maxMonthlyIncome) || 30000,
          requiresIndigency,
          coveredTreatments,
        },
        requiredDocuments,
        applicationProcedure,
        contactInfo: {
          phone,
          email,
          officeAddress,
        },
        processingDays: '2 to 3 business days',
      });
      setIsAddModalOpen(false);
      showToast(`Successfully added new program: "${created.name}"!`);
    }
  };

  const filteredPrograms = programs.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.providerName.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Toast alert */}
      {successToast && (
        <div className="fixed top-16 left-4 right-4 z-50 p-3.5 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-elevated flex items-center justify-between animate-slide-up border border-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successToast}</span>
          </div>
        </div>
      )}

      {/* Header with Title & Add Action */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            LGU & Hospital Staff Console
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Staff Portal
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Assistance Program Catalog
          </h2>
          <Button
            variant="primary"
            size="sm"
            onClick={openAddModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Program
          </Button>
        </div>
        <p className="text-xs text-slate-500">
          Manage quotas, toggle real-time availability, and update program eligibility requirements.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter programs in catalog..."
          className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-soft"
        />
      </div>

      {/* Programs Management Cards */}
      <div className="space-y-3.5">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {prog.name}
                </h4>
                <p className="text-xs text-brand-700 font-semibold">{prog.providerName}</p>
                <span className="text-[11px] text-slate-500 block">{prog.location}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(`/programs/${prog.id}`)}
                  title="View as patient"
                  className="touch-target p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openEditModal(prog)}
                  title="Edit program details"
                  className="touch-target p-2 text-brand-600 hover:bg-brand-50 rounded-xl transition"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Availability Status Selector (Instant patient update) */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Live Intake Availability:</span>
                <AvailabilityBadge status={prog.availability} />
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(['available', 'limited', 'currently_unavailable'] as AvailabilityStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleQuickAvailabilityChange(prog.id, st)}
                      className={`touch-target py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        prog.availability === st
                          ? st === 'available'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : st === 'limited'
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'available' ? 'Available' : st === 'limited' ? 'Limited' : 'Paused'}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Rules Summary */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
              <span>Max Income: <strong>₱{prog.eligibilityRules.maxMonthlyIncome.toLocaleString()}</strong></span>
              <span>Benefit: <strong>{formatPHP(prog.maxAmountCovered)}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Program Modal */}
      <Modal
        isOpen={isAddModalOpen || editingProgram !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProgram(null);
        }}
        title={editingProgram ? `Edit Program: ${editingProgram.name}` : 'Add New Assistance Program'}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
          {/* Program Name */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800">Program Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. DOH Specialized Surgical Subsidy"
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Provider Name + Provider Type */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Provider Agency *</label>
              <input
                type="text"
                required
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                placeholder="e.g. DOH / Malasakit / PGH"
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Provider Type *</label>
              <select
                value={providerType}
                onChange={(e) => setProviderType(e.target.value as any)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500"
              >
                <option value="government_lgu">Government / LGU</option>
                <option value="hospital">Hospital Charity</option>
                <option value="insurance">PhilHealth</option>
                <option value="charity">Charity Foundation / PCSO</option>
              </select>
            </div>
          </div>

          {/* Assistance Type + Location */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Assistance Type *</label>
              <select
                value={assistanceType}
                onChange={(e) => setAssistanceType(e.target.value as any)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500"
              >
                <option value="subsidy">Government Subsidy</option>
                <option value="financial_aid">Direct Financial Aid</option>
                <option value="discount">Hospital Discount</option>
                <option value="insurance_benefit">PhilHealth Benefit</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Location / Scope *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Quezon City / NCR"
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Max Amount + Max Income */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Max Benefit Amount (₱)</label>
              <input
                type="number"
                value={maxAmountCovered}
                onChange={(e) =>
                  setMaxAmountCovered(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="e.g. 75000"
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Max Monthly Income Cap (₱)</label>
              <input
                type="number"
                value={maxMonthlyIncome}
                onChange={(e) =>
                  setMaxMonthlyIncome(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="e.g. 30000"
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Description & Benefits Summary */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800">Full Description *</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Program overview and patient criteria..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Benefits Summary *</label>
            <input
              type="text"
              required
              value={benefitsSummary}
              onChange={(e) => setBenefitsSummary(e.target.value)}
              placeholder="e.g. Up to 100% surgical subsidy and medication vouchers."
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Required Documents (Comma-separated) */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800">
              Required Documents (Comma-separated) *
            </label>
            <input
              type="text"
              required
              value={requiredDocsStr}
              onChange={(e) => setRequiredDocsStr(e.target.value)}
              placeholder="Clinical Abstract, Hospital SOA, Barangay Indigency, Valid ID"
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Covered Treatments (Comma-separated) */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800">
              Covered Treatments (Comma-separated)
            </label>
            <input
              type="text"
              value={coveredTreatmentsStr}
              onChange={(e) => setCoveredTreatmentsStr(e.target.value)}
              placeholder="General Surgery, Chemotherapy, Hemodialysis"
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Contact Info (Phone & Email) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Help Desk Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Indigency requirement checkbox */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={requiresIndigency}
                onChange={(e) => setRequiresIndigency(e.target.checked)}
                className="text-brand-600 rounded focus:ring-brand-500"
              />
              <span>Requires Barangay Certificate of Indigency</span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProgram(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
            >
              {editingProgram ? 'Save Changes' : 'Publish Program to Catalog'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
