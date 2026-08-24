import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hospital } from '../../types';
import { MapPin, Phone, CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import { Badge } from '../common/Badge';

interface HospitalCardProps {
  hospital: Hospital;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/hospitals/${hospital.id}`)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100/90 shadow-soft hover:shadow-card hover:border-brand-300 transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      {/* Image container with badges */}
      <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
        <img
          src={hospital.imageUrl}
          alt={hospital.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
          {hospital.isVerifiedPartner && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Partner
            </span>
          )}

          {hospital.malasakitCenter && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 shadow-sm ml-auto">
              Malasakit Desk
            </span>
          )}
        </div>

        {/* City tag bottom of image */}
        <div className="absolute bottom-2.5 left-3 text-white">
          <p className="text-xs font-semibold flex items-center gap-1 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-sage-300" />
            {hospital.city}, {hospital.region}
          </p>
        </div>
      </div>

      {/* Hospital Content */}
      <div className="p-4 space-y-2.5">
        <div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-tight">
            {hospital.name}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {hospital.address}
          </p>
        </div>

        {/* Discounts / Services highlight */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <Badge variant="secondary" size="sm">
            <Sparkles className="w-3 h-3 text-sage-600" />
            {hospital.discounts.length} Subsidy Packages
          </Badge>
          <Badge variant="neutral" size="sm">
            <Building2 className="w-3 h-3 text-slate-500" />
            {hospital.partnerOrgs.length} NGO Partners
          </Badge>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1 truncate">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {hospital.phone}
          </span>
          <span className="text-brand-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
            View Hub
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
