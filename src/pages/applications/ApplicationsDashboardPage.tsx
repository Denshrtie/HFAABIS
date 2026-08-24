import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { ApplicationCard } from '../../components/applications/ApplicationCard';
import { Button } from '../../components/common/Button';
import { ClipboardList, PlusCircle, Search, Sparkles } from 'lucide-react';

export const ApplicationsDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = useApplicationStore((state) => state.applications);
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApplications = applications.filter((app) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesRef = app.referenceNumber.toLowerCase().includes(q);
      const matchesProg = app.programName.toLowerCase().includes(q);
      const matchesPatient = app.patientName.toLowerCase().includes(q);
      if (!matchesRef && !matchesProg && !matchesPatient) return false;
    }

    // Status Tab
    if (filterTab === 'active') {
      return app.status === 'submitted' || app.status === 'under_review';
    }
    if (filterTab === 'completed') {
      return app.status === 'approved' || app.status === 'rejected';
    }

    return true;
  });

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
            My Applications & Claims
          </h2>
          <p className="text-xs text-slate-500">
            Track status, timelines, and Guarantee Letters
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/eligibility')}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          New Claim
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by reference ID or program..."
          className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-soft"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          type="button"
          onClick={() => setFilterTab('all')}
          className={`touch-target flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            filterTab === 'all'
              ? 'bg-white text-brand-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All ({applications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterTab('active')}
          className={`touch-target flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            filterTab === 'active'
              ? 'bg-white text-brand-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          In Progress ({applications.filter((a) => a.status === 'submitted' || a.status === 'under_review').length})
        </button>
        <button
          type="button"
          onClick={() => setFilterTab('completed')}
          className={`touch-target flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            filterTab === 'completed'
              ? 'bg-white text-brand-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed ({applications.filter((a) => a.status === 'approved' || a.status === 'rejected').length})
        </button>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">No applications found</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You haven't submitted any assistance applications under this category yet.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/')}>
            Explore Assistance Programs
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};
