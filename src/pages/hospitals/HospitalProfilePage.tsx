import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHospitalStore } from '../../stores/useHospitalStore';
import { useProgramStore } from '../../stores/useProgramStore';
import { AvailabilityBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Navigation, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  Clock, 
  ArrowLeft,
  Share2,
  ShieldCheck,
  Percent,
  Pill,
  Activity,
  HeartPulse
} from 'lucide-react';
import { formatPHP } from '../../utils';

export const HospitalProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hospital = useHospitalStore((state) => state.getHospitalById(id || ''));
  const programs = useProgramStore((state) => state.programs);

  const [activeTab, setActiveTab] = useState<'programs' | 'discounts' | 'partners'>('programs');

  if (!hospital) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Hospital not found</h3>
        <Button variant="primary" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }

  // Related assistance programs for this hospital or universal government programs valid here
  const hospitalPrograms = programs.filter(
    (p) => p.hospitalId === hospital.id || p.providerType === 'government_lgu'
  );

  return (
    <div className="space-y-5 pb-8">
      {/* Top Banner Image with Overlay */}
      <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
        <img
          src={hospital.imageUrl}
          alt={hospital.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Back and Share buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="touch-target w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-slate-800 flex items-center justify-center shadow-md active:scale-95 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {hospital.isVerifiedPartner && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500 text-white backdrop-blur-md shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Partner
              </span>
            )}
          </div>
        </div>

        {/* Hospital Name & Address bottom overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
            {hospital.name}
          </h1>
          <p className="text-xs text-slate-200 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sage-400 shrink-0" />
            <span>{hospital.address}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons: Directions, Call, Website */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-2 bg-sage-50/80 p-2.5 rounded-3xl border border-sage-200">
          <a
            href={hospital.directionsUrl || `https://maps.google.com/?q=${encodeURIComponent(hospital.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target p-2.5 rounded-2xl bg-white text-slate-800 font-bold text-xs flex flex-col items-center gap-1 shadow-soft hover:bg-slate-50 transition active:scale-95 text-center"
          >
            <Navigation className="w-4 h-4 text-brand-600" />
            <span>Directions</span>
          </a>

          <a
            href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
            className="touch-target p-2.5 rounded-2xl bg-white text-slate-800 font-bold text-xs flex flex-col items-center gap-1 shadow-soft hover:bg-slate-50 transition active:scale-95 text-center"
          >
            <Phone className="w-4 h-4 text-brand-600" />
            <span>Call Desk</span>
          </a>

          <a
            href={hospital.website}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target p-2.5 rounded-2xl bg-white text-slate-800 font-bold text-xs flex flex-col items-center gap-1 shadow-soft hover:bg-slate-50 transition active:scale-95 text-center"
          >
            <Globe className="w-4 h-4 text-brand-600" />
            <span>Website</span>
          </a>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="px-4">
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('programs')}
            className={`touch-target flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'programs'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Assistance ({hospitalPrograms.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('discounts')}
            className={`touch-target flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'discounts'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Discounts ({hospital.discounts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('partners')}
            className={`touch-target flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'partners'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Partner NGOs ({hospital.partnerOrgs.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Assistance Programs */}
      {activeTab === 'programs' && (
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              On-Site Assistance Desks & Programs
            </h3>
            <span className="text-xs text-slate-500">
              {hospitalPrograms.length} active
            </span>
          </div>

          <div className="space-y-3">
            {hospitalPrograms.map((prog) => (
              <div
                key={prog.id}
                onClick={() => navigate(`/programs/${prog.id}`)}
                className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-card hover:border-brand-300 transition-all cursor-pointer space-y-2.5 active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {prog.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{prog.providerName}</p>
                    </div>
                  </div>
                  <AvailabilityBadge status={prog.availability} />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {prog.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="font-extrabold text-brand-700">
                    {formatPHP(prog.maxAmountCovered)}
                  </span>
                  <span className="font-bold text-brand-600 flex items-center gap-0.5">
                    Apply Online <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Hospital Benefits & Discounts Grid (matching reference image) */}
      {activeTab === 'discounts' && (
        <div className="px-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Internal Subsidies & Sliding Scales
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {hospital.discounts.map((discount) => (
              <div
                key={discount.id}
                className="p-4 rounded-3xl bg-sage-50/70 border border-sage-200 flex flex-col justify-between gap-2"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-700 text-white flex items-center justify-center mb-1">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    {discount.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight mt-0.5">
                    {discount.title}
                  </h4>
                </div>
                <div className="pt-2 border-t border-sage-200/80">
                  <span className="text-xs font-extrabold text-brand-800">
                    {discount.discountRate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Partner Organizations */}
      {activeTab === 'partners' && (
        <div className="px-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Accredited Partner Foundations & NGOs
          </h3>

          <div className="space-y-3">
            {hospital.partnerOrgs.map((org) => (
              <div
                key={org.id}
                className="p-4 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-1.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {org.logoText}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {org.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-sage-700">
                      {org.type}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {org.supportDetails}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="px-4 pt-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate('/eligibility')}
          leftIcon={<Sparkles className="w-5 h-5" />}
        >
          Check Eligibility for This Hospital
        </Button>
      </div>
    </div>
  );
};
