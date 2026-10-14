import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-[#0F4C8A] border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4">
          <div className="w-12 h-12 bg-slate-200 rounded-xl" />
          <div className="h-5 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-12 bg-slate-100 border-b border-slate-200" />
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-14 px-6 flex items-center justify-between gap-4">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-4 bg-slate-200 rounded w-1/6" />
            <div className="h-4 bg-slate-200 rounded w-1/6" />
          </div>
        ))}
      </div>
    </div>
  );
};
