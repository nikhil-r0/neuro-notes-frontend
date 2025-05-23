import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div className="max-w-screen-xl mx-auto p-10 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-10"> {/* Added background, rounded, shadow and margin-top */}
    <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">AI Study Assistant</h1> {/* Ensured text color for heading */}
    <Link to="/dashboard">
      <button className="bg-primary text-text-primary-light hover:bg-blue-700 px-6 py-2 rounded-md shadow-sm transition-colors">Go to Dashboard</button>
    </Link>
  </div>
);

export default Home;
