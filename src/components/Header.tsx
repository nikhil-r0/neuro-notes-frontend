import React from 'react';
import { Upload, BookOpen, Users, Plus, FileText } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'materials', label: 'Materials', icon: FileText },
  { id: 'upload',    label: 'Upload',    icon: Upload },
  { id: 'add',       label: 'Add Link',  icon: Plus },
  { id: 'users',     label: 'Users',     icon: Users },
];

export const Header: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <header className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700">
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary-600" />
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">AI Study Assistant</h1>
        </div>
        <nav className="flex flex-wrap gap-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  </header>
);