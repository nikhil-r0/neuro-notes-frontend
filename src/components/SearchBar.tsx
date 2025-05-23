import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <div className="flex items-center mb-4">
    <Search className="h-5 w-5 text-gray-400 mr-2" />
    <input
      type="text"
      placeholder="Search materials..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
