import React from 'react';
import { Upload, BookOpen, Users, Plus, FileText } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'materials', label: 'Materials', icon: FileText },
  { id: 'upload',     label: 'Upload',    icon: Upload },
  { id: 'add',        label: 'Add Link',  icon: Plus },
  { id: 'users',      label: 'Users',     icon: Users },
];

export const Header: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-8 w-8" />
        <h1 className="text-2xl font-bold">AI Study Assistant</h1>
      </div>
      <nav className="flex space-x-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-white text-blue-600'
                : 'hover:bg-blue-500'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  </header>
);
