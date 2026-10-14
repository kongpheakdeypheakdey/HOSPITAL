import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full text-sm font-medium rounded-xl border bg-white px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4C8A] ${
              Icon ? 'pl-10' : ''
            } ${
              error ? 'border-red-500 focus:ring-red-400' : 'border-slate-200 focus:border-[#0F4C8A]'
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
