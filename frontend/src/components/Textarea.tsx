import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, rows = 4, ...props }, ref) => {
    const areaId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={areaId} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={areaId}
          ref={ref}
          rows={rows}
          className={`w-full text-sm font-medium rounded-xl border bg-white px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4C8A] ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-slate-200 focus:border-[#0F4C8A]'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
