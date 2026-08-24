import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgramStore } from '../../stores/useProgramStore';
import { ProgramCard } from '../../components/programs/ProgramCard';
import { Button } from '../../components/common/Button';
import { Bookmark, Sparkles, Compass } from 'lucide-react';

export const SavedProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const { programs, savedProgramIds } = useProgramStore();

  const bookmarkedPrograms = programs.filter((p) =>
    savedProgramIds.includes(p.id)
  );

  return (
    <div className="space-y-5 px-4 py-4 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
            Saved Programs
          </h2>
          <p className="text-xs text-slate-500">
            Bookmarked financial assistance and hospital benefits
          </p>
        </div>

        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
          {bookmarkedPrograms.length} Saved
        </span>
      </div>

      {/* Bookmarked Programs List */}
      {bookmarkedPrograms.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">No saved programs yet</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Tap the bookmark ribbon icon on any healthcare assistance card to save it here for fast access.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/')}
            leftIcon={<Compass className="w-4 h-4" />}
          >
            Explore Assistance Programs
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
};
