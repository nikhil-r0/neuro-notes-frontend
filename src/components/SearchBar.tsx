import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <div className="flex items-center mb-4">
    <label htmlFor="searchMaterials" className="sr-only">Search materials</label> {/* Visually hidden label */}
    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
    <input
      id="searchMaterials"
      type="text"
      placeholder="Search materials..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
    />
  </div>
);
