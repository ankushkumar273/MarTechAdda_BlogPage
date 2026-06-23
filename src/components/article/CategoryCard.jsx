import React from 'react';

export default function CategoryCard({ category, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 ${
        active
          ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
          : 'bg-white border-brand-border text-brand-dark hover:border-brand-gray hover:text-brand-blue'
      }`}
    >
      {category}
    </button>
  );
}
