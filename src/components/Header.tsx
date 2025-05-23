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
  <header className="bg-primary text-text-primary-light shadow-lg">
    <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between"> {/* Added flex-wrap */}
      <div className="flex items-center space-x-2 mb-2 sm:mb-0"> {/* Added mb-2 sm:mb-0 for spacing when wrapped */}
        <BookOpen className="h-8 w-8" />
        <h1 className="text-2xl font-bold">AI Study Assistant</h1>
      </div>
      <nav className="flex flex-wrap space-x-2 sm:space-x-4"> {/* Added flex-wrap, adjusted spacing */}
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-accent text-text-primary-light' // Active state
                : 'hover:bg-accent hover:text-text-primary-light' // Inactive hover state
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span> {/* Hide label on xs screens */}
          </button>
        ))}
      </nav>
    </div>
  </header>
);
