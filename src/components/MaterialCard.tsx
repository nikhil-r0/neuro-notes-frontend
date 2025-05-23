// src/components/MaterialCard.tsx
import React from 'react'
import { Download } from 'lucide-react'
import { Material } from '../types'
import { API_BASE } from '../api/apiService'

export const MaterialCard: React.FC<{ material: Material }> = ({ material }) => {
  // Derive a user‐friendly label from the URL/path
  const urlLabel = material.url_or_path
    ? material.url_or_path.split('/').pop()
    : ''

  return (
    <div className="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Title + Tags */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{material.title}</h4>
        <div className="flex space-x-2">
          <span className="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary px-2 py-1 rounded-full text-xs">
            {material.subject}
          </span>
          <span className="bg-accent/20 text-accent dark:bg-accent/30 dark:text-accent px-2 py-1 rounded-full text-xs">
            {material.topic}
          </span>
        </div>
      </div>

      {/* Description */}
      {material.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-3">{material.description}</p>
      )}

      {/* Date Added */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Added on {new Date(material.date_added).toLocaleDateString()}
      </div>

      {/* Download Link */}
      {material.url_or_path && (
    (() => {
      // extract just the filename from your saved path
      const parts = material.url_or_path.split('/');
     const filename = parts[parts.length - 1];
    return (
       <a
          href={`${API_BASE}/uploads/${filename}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-accent hover:text-accent/80 dark:text-accent dark:hover:text-accent/80"
        >
          <Download className="h-4 w-4 mr-1" />
          {filename || 'Download'}
        </a>
      )
   })()
      )}
    </div>
  )
}
