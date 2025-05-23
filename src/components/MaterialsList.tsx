import React, { useState } from 'react';
import { Material } from '../types';
import { SearchBar } from './SearchBar';
import { MaterialCard } from './MaterialCard';

export const MaterialsList: React.FC<{ materials: Material[] }> = ({ materials }) => {
  const [term, setTerm] = useState('');
  const filtered = materials.filter(m =>
    m.title.toLowerCase().includes(term.toLowerCase()) ||
    m.subject.toLowerCase().includes(term.toLowerCase()) ||
    m.topic.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <SearchBar value={term} onChange={setTerm} />
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Study Materials ({filtered.length})</h3>
        {filtered.length === 0
          ? <p className="text-gray-500 dark:text-gray-400">{term ? 'No matches.' : 'No materials yet.'}</p>
          : <div className="grid gap-4 md:grid-cols-2">{filtered.map(m => <MaterialCard key={m.material_id} material={m} />)}</div>
        }
      </div>
    </div>
  );
};
