import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items matching your criteria at this time.',
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-slate-100 my-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7" />
      </div>
      <h4 className="text-base font-bold text-[#0B1D2E]">{title}</h4>
      <p className="text-sm text-slate-500 max-w-sm mt-1">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
