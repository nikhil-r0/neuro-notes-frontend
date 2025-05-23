import React from 'react';
import { Download } from 'lucide-react';
import { Material } from '../types';
import { API_BASE } from '../api/apiService';

export const MaterialCard: React.FC<{ material: Material }> = ({ material }) => {
  const urlLabel = material.url_or_path
    ? material.url_or_path.split('/').pop()
    : '';

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
        <h4 className="text-lg font-semibold text-secondary-900 dark:text-white">{material.title}</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
            {material.subject}
          </span>
          <span className="px-2.5 py-1 text-xs font-medium bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded-full">
            {material.topic}
          </span>
        </div>
      </div>

      {material.description && (
        <p className="text-secondary-600 dark:text-secondary-300 mb-4">{material.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-secondary-500 dark:text-secondary-400">
          Added on {new Date(material.date_added).toLocaleDateString()}
        </span>
        
        {material.url_or_path && (
          (() => {
            const parts = material.url_or_path.split('/');
            const filename = parts[parts.length - 1];
            return (
              <a
                href={`${API_BASE}/uploads/${filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-600 hover:text-accent-700 font-medium"
              >
                <Download className="h-4 w-4" />
                {filename || 'Download'}
              </a>
            );
          })()
        )}
      </div>
    </div>
  );
};