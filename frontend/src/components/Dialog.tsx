import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete this record?',
  description = 'This action cannot be undone. All data associated with this item will be permanently removed.',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#0B1D2E]">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        <div className="flex items-center gap-3 w-full mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
