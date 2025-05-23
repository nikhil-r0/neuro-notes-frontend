import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div className="p-10 text-center">
    <h1 className="text-4xl font-bold mb-6">AI Study Assistant</h1>
    <Link to="/dashboard">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Go to Dashboard</button>
    </Link>
  </div>
);

export default Home;
