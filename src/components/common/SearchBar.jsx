import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search articles, insights, or categories..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-brand-gray" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-4 py-3 sm:py-4 border border-brand-border rounded-lg bg-white placeholder-brand-gray text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition shadow-sm text-sm sm:text-base"
      />
    </div>
  );
}
