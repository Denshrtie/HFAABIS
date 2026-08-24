import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  RotateCcw, 
  Edit3, 
  Check, 
  FileText, 
  Info,
  HeartPulse,
  CreditCard
} from 'lucide-react';
import { formatPHP } from '../../utils';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, isStaffMode, toggleStaffMode, resetAllMockData } = useUserStore();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Edit form state
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);
  const [philhealth, setPhilhealth] = useState(profile.philhealthNumber);
  const [income, setIncome] = useState(profile.monthlyHouseholdIncome);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      email,
      address,
      city,
      philhealthNumber: philhealth,
      monthlyHouseholdIncome: Number(income),
    });
    setEditModalOpen(false);
  };

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Profile Header Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 text-white flex items-center justify-center font-extrabold text-lg shadow-inner">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {profile.name}
              </h2>
              <span className="text-xs text-sage-200 font-medium">
                {profile.city}, Philippines
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditModalOpen(true)}
            aria-label="Edit profile"
            className="touch-target p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* PhilHealth & Indigency Tag */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-600/70 text-xs">
          <div className="bg-brand-950/30 p-2.5 rounded-xl border border-brand-500/30">
            <span className="text-[10px] uppercase font-bold text-sage-300 block">
              PhilHealth PIN
            </span>
            <span className="font-mono font-bold text-white truncate block">
              {profile.philhealthNumber}
            </span>
          </div>

          <div className="bg-brand-950/30 p-2.5 rounded-xl border border-brand-500/30">
            <span className="text-[10px] uppercase font-bold text-sage-300 block">
              Classification
            </span>
            <span className="font-bold text-emerald-300 truncate block">
              {profile.isIndigentCertified ? 'Indigent / Class C3' : 'Standard Member'}
            </span>
          </div>
        </div>
      </div>

      {/* Patient Information Card */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Patient Profile Details
        </h3>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft space-y-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-brand-600 shrink-0" />
            <span className="font-semibold text-slate-800">{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-brand-600 shrink-0" />
            <span className="font-semibold text-slate-800">{profile.email}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <span className="font-semibold text-slate-800">{profile.address}, {profile.city}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-medium">Monthly Household Income</span>
            <span className="font-bold text-slate-900">{formatPHP(profile.monthlyHouseholdIncome)}</span>
          </div>
        </div>
      </section>

      {/* Mode Switcher: Patient View <-> Staff Mode */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Prototype Role Switcher
        </h3>

        <div className="p-4 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs">
              <h4 className="font-bold text-amber-950">
                Hospital Social Work & LGU Staff Portal
              </h4>
              <p className="text-amber-800">
                Switch to the Provider / LGU management console to add programs, edit quotas, and update availability status in real-time.
              </p>
            </div>
          </div>

          <Button
            variant="sage"
            size="md"
            fullWidth
            onClick={() => {
              toggleStaffMode();
              navigate('/portal/manage');
            }}
            rightIcon={<Building2 className="w-4 h-4" />}
          >
            {isStaffMode ? 'Open Staff Management Console' : 'Switch to Staff Mode'}
          </Button>
        </div>
      </section>

      {/* Privacy & Data Assurance */}
      <section className="space-y-2.5">
        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Frontend Prototype & Client Data Privacy</span>
          </div>
          <p className="leading-relaxed">
            All medical records, income amounts, and document uploads in this prototype are processed and stored strictly within your local browser's memory and localStorage. No personal data is transmitted to external servers.
          </p>
        </div>
      </section>

      {/* Reset Mock State Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setResetModalOpen(true)}
          className="touch-target w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All Mock Data to Default
        </button>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Patient Information"
        maxWidth="md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-800">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">PhilHealth PIN</label>
            <input
              type="text"
              value={philhealth}
              onChange={(e) => setPhilhealth(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Monthly Household Income (PHP)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Reset All Mock Data?"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs text-slate-700">
          <p>
            This will clear your local storage and restore all initial Philippine assistance programs, sample claims, bookmarks, and mock notifications to default settings.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setResetModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={resetAllMockData}
            >
              Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
