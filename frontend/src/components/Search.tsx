import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <SearchIcon className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm font-medium rounded-xl border border-slate-200 bg-white pl-10 pr-9 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F4C8A] focus:border-[#0F4C8A]"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
