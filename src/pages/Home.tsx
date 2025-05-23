import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Home: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-50 dark:bg-secondary-900 px-4">
    <div className="w-full max-w-2xl text-center">
      <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-primary-100 dark:bg-primary-900/30">
        <BookOpen className="w-12 h-12 text-primary-600 dark:text-primary-400" />
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
        AI Study Assistant
      </h1>
      
      <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-lg mx-auto">
        Your intelligent companion for organized and efficient learning
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/login" className="btn-primary">
          Sign In
        </Link>
        <Link to="/register" className="btn-secondary">
          Create Account
        </Link>
      </div>
    </div>
  </div>
);

export default Home;