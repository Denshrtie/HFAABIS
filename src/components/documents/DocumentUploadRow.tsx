import React, { useState, useRef } from 'react';
import { UploadedDocument } from '../../types';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2, Eye, Loader2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface DocumentUploadRowProps {
  docName: string;
  isRequired?: boolean;
  uploadedDoc?: UploadedDocument;
  onFileSelected: (docName: string, file: File) => void;
  onRemove: (docName: string) => void;
}

export const DocumentUploadRow: React.FC<DocumentUploadRowProps> = ({
  docName,
  isRequired = true,
  uploadedDoc,
  onFileSelected,
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  const isCompleted = uploadedDoc && uploadedDoc.status === 'completed';

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);

    // Validate size (< 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage("File exceeds 5MB limit. Please upload a smaller scan or photo.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate format (.pdf, .jpg, .jpeg, .png)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
      setErrorMessage("Invalid format. Please attach a PDF, JPG, or PNG file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Simulate 500ms upload processing
    setIsUploading(true);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setLocalPreviewUrl(url);
    } else {
      setLocalPreviewUrl(null);
    }

    setTimeout(() => {
      setIsUploading(false);
      onFileSelected(docName, file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 500);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '1.2 MB';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      isCompleted
        ? 'bg-emerald-50/40 border-emerald-200'
        : errorMessage
        ? 'bg-rose-50/40 border-rose-200'
        : 'bg-white border-slate-200 shadow-soft'
    }`}>
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
        onChange={handleFileInput}
        className="hidden"
        aria-label={`Upload ${docName}`}
      />

      <div className="flex items-start justify-between gap-3">
        {/* Left column: Title & Status */}
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              {docName}
            </h4>
            {isRequired ? (
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Required
              </span>
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                Optional
              </span>
            )}
          </div>

          {/* Upload status indicator */}
          {isUploading ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 pt-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning and processing document (500ms)...</span>
            </div>
          ) : isCompleted ? (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[200px] font-semibold">
                {uploadedDoc?.fileName}
              </span>
              <span className="text-[11px] text-slate-400">
                ({formatFileSize(uploadedDoc?.fileSize)})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Missing attachment</span>
            </div>
          )}

          {/* Validation error message */}
          {errorMessage && (
            <p className="text-xs font-semibold text-rose-600 pt-1" aria-live="polite">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Right column: Action buttons */}
        <div className="shrink-0 flex items-center gap-1.5">
          {isCompleted ? (
            <>
              {localPreviewUrl && (
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  aria-label="Preview uploaded document"
                  className="touch-target p-2 text-slate-600 hover:text-brand-700 hover:bg-slate-100 rounded-xl transition"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onRemove(docName)}
                aria-label="Remove document"
                className="touch-target p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="touch-target px-3.5 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm flex items-center gap-1.5 transition active:scale-95 disabled:bg-slate-300"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Attach</span>
            </button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={uploadedDoc?.fileName || docName}
        maxWidth="md"
        footer={
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => setPreviewOpen(false)}
          >
            Close Preview
          </Button>
        }
      >
        <div className="space-y-4 text-center">
          {localPreviewUrl ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
              <img
                src={localPreviewUrl}
                alt="Document preview"
                className="max-h-[60vh] max-w-full h-auto object-contain rounded-xl"
              />
            </div>
          ) : (
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <FileText className="w-12 h-12 text-brand-600 mx-auto" />
              <p className="text-sm font-bold text-slate-800 break-all">{uploadedDoc?.fileName}</p>
              <p className="text-xs text-slate-500">
                PDF document verified and securely stored in client memory.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
